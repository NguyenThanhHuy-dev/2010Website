// Scoring thuần, data-driven. Không phụ thuộc DOM.
(function (root) {
  const DIMS = [['E', 'I'], ['S', 'N'], ['T', 'F'], ['J', 'P']];
  const LETTERS = DIMS.flat();

  // answers: { [questionId]: answerIndex }. Câu chưa trả lời bị bỏ qua.
  function computeScores(questions, answers) {
    const s = Object.fromEntries(LETTERS.map((l) => [l, 0]));
    for (const q of questions) {
      const a = q.answers[answers[q.id]];
      if (!a) continue;
      const w = q.weight || 1;
      for (const [k, v] of Object.entries(a.scores)) if (k in s) s[k] += v * w;
    }
    return s;
  }

  // Hòa: câu key của chiều đó quyết định; vẫn hòa thì lấy chữ thứ hai (I, N, F, P).
  function tieBreak(questions, answers, [a, b]) {
    for (const q of questions) {
      if (!q.key || q.dim !== a + b) continue;
      const pick = q.answers[answers[q.id]];
      if (!pick) continue;
      const sa = pick.scores[a] || 0, sb = pick.scores[b] || 0;
      if (sa !== sb) return sa > sb ? a : b;
    }
    return b;
  }

  function resolveType(questions, answers) {
    const scores = computeScores(questions, answers);
    const dims = DIMS.map(([a, b]) => {
      const total = scores[a] + scores[b];
      const pa = total ? Math.round((scores[a] / total) * 100) : 50;
      const pb = 100 - pa;
      const tied = Math.abs(scores[a] - scores[b]) < 1e-9;
      const winner = tied ? tieBreak(questions, answers, [a, b]) : scores[a] > scores[b] ? a : b;
      return { a, b, pa, pb, winner, tied, borderline: Math.abs(pa - pb) < 10 };
    });
    return { scores, dims, code: dims.map((d) => d.winner).join('') };
  }

  function shuffle(arr, rng = Math.random) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // Xen kẽ các chiều để người chơi không gặp 4 câu cùng kiểu liên tiếp.
  function interleave(questions) {
    const groups = {};
    questions.forEach((q) => (groups[q.dim] = groups[q.dim] || []).push(q));
    const lists = Object.values(groups), out = [];
    for (let i = 0; lists.some((l) => i < l.length); i++) lists.forEach((l) => l[i] && out.push(l[i]));
    return out;
  }

  const api = { DIMS, computeScores, resolveType, shuffle, interleave };
  root.Engine = api;
  if (typeof module !== 'undefined') module.exports = api;
})(globalThis);

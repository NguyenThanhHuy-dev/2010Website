// Scoring v2 thuần, data-driven, không phụ thuộc DOM.
// Mỗi câu đo đúng một cặp. Kết quả gồm % từng cặp, mức nghiêng (level) và độ chắc chắn (certainty).
(function (root) {
  const DIMS = [['E', 'I'], ['S', 'N'], ['T', 'F'], ['J', 'P']];
  const LETTERS = DIMS.flat();
  const EPS = 1e-9;

  // Chênh lệch % hai phía → mức nghiêng
  function levelOf(margin) {
    if (margin <= 8) return 'balanced';
    if (margin <= 20) return 'slight';
    if (margin <= 36) return 'clear';
    return 'strong';
  }

  // Tỉ lệ câu chọn A/B (không phải trung tính) → độ chắc chắn của dữ liệu
  function certaintyOf(rate) {
    if (rate >= 0.84) return 'high';
    if (rate >= 0.67) return 'medium';
    return 'low';
  }

  // Kiểm tra dữ liệu câu hỏi: mỗi câu một cặp, không chấm chéo, tổng điểm mỗi đáp án hợp lệ.
  function validateQuestions(questions) {
    const problems = [], seen = new Set();
    for (const q of questions) {
      if (seen.has(q.id)) problems.push(`${q.id}: trùng id`);
      seen.add(q.id);
      const pair = DIMS.find(([a, b]) => a + b === q.dimension);
      if (!pair) { problems.push(`${q.id}: dimension "${q.dimension}" không hợp lệ`); continue; }
      if (q.answers.length < 2) problems.push(`${q.id}: thiếu đáp án`);
      q.answers.forEach((a, i) => {
        const keys = Object.keys(a.scores);
        if (keys.some((k) => !pair.includes(k))) problems.push(`${q.id}[${i}]: chấm chéo sang cặp khác`);
        const [x, y] = [a.scores[pair[0]] || 0, a.scores[pair[1]] || 0];
        if (x + y !== 2) problems.push(`${q.id}[${i}]: tổng điểm cặp phải bằng 2`);
        if (a.neutral && x !== y) problems.push(`${q.id}[${i}]: đáp án neutral phải 1/1`);
      });
    }
    for (const [a, b] of DIMS) {
      const n = questions.filter((q) => q.dimension === a + b);
      if (n.length && !n.some((q) => q.anchor)) problems.push(`${a}${b}: chưa có câu anchor`);
    }
    return problems;
  }

  // answers: { [questionId]: answerIndex }. Câu chưa trả lời bị bỏ qua.
  function computeScores(questions, answers) {
    const s = Object.fromEntries(LETTERS.map((l) => [l, 0]));
    for (const q of questions) {
      const a = q.answers[answers[q.id]];
      if (!a) continue;
      for (const [k, v] of Object.entries(a.scores)) if (k in s) s[k] += v;
    }
    return s;
  }

  // Chữ của câu anchor nếu người chơi chọn nghiêng một phía; trung tính/chưa trả lời thì null.
  function anchorLetter(questions, answers, [a, b]) {
    const q = questions.find((x) => x.anchor && x.dimension === a + b);
    const ans = q && q.answers[answers[q.id]];
    if (!ans) return null;
    const sa = ans.scores[a] || 0, sb = ans.scores[b] || 0;
    return sa === sb ? null : sa > sb ? a : b;
  }

  function resolveType(questions, answers) {
    const scores = computeScores(questions, answers);
    const dims = DIMS.map((pair) => {
      const [a, b] = pair, pairKey = a + b;
      const qs = questions.filter((q) => q.dimension === pairKey);
      let answered = 0, directional = 0;
      for (const q of qs) {
        const ans = q.answers[answers[q.id]];
        if (!ans) continue;
        answered++;
        if ((ans.scores[a] || 0) !== (ans.scores[b] || 0)) directional++;
      }
      const total = scores[a] + scores[b];
      const pa = total ? Math.round((scores[a] / total) * 100) : 50, pb = 100 - pa;
      const margin = Math.abs(pa - pb);
      const tied = Math.abs(scores[a] - scores[b]) < EPS;
      const winner = tied ? 'X' : scores[a] > scores[b] ? a : b;
      const rate = answered ? directional / answered : 0;
      return {
        pair: pairKey, a, b, pa, pb, left: pa, right: pb, margin, level: levelOf(margin), certainty: certaintyOf(rate),
        rate, answered, tied, winner, resolved: tied ? anchorLetter(questions, answers, pair) : winner
      };
    });
    const code = dims.map((d) => d.winner).join('');
    const resolved = dims.map((d) => d.resolved);
    return {
      scores, dims, dimensions: Object.fromEntries(dims.map((d) => [d.pair, d])), code,
      nearestType: resolved.every(Boolean) ? resolved.join('') : null,
      balancedCount: dims.filter((d) => d.level === 'balanced').length
    };
  }

  function shuffle(arr, rng = Math.random) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // Xen kẽ các cặp để người chơi không gặp nhiều câu cùng kiểu liên tiếp.
  function interleave(questions) {
    const groups = {};
    questions.forEach((q) => (groups[q.dimension] = groups[q.dimension] || []).push(q));
    const lists = Object.values(groups), out = [];
    for (let i = 0; lists.some((l) => i < l.length); i++) lists.forEach((l) => l[i] && out.push(l[i]));
    return out;
  }

  const api = { DIMS, levelOf, certaintyOf, validateQuestions, computeScores, resolveType, shuffle, interleave };
  root.Engine = api;
  if (typeof module !== 'undefined') module.exports = api;
})(globalThis);

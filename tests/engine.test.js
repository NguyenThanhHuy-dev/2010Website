// node tests/engine.test.js
const assert = require('assert');
const path = require('path');
const r = (f) => require(path.join(__dirname, '..', f));
['data/questions.js', 'data/personalities.js', 'data/tarot.js', 'data/messages.js'].forEach(r);
const E = r('js/engine.js');
const Compose = r('js/compose.js');
const Q = globalThis.QUIZ_QUESTIONS;
const run = (name, fn) => { fn(); console.log('ok -', name); };

// chọn đáp án: prefs = tập chữ cái ưu tiên; neutral = chọn đáp án trung tính
const pickBy = (prefs) => Object.fromEntries(Q.map((q) => [q.id, Math.max(0, q.answers.findIndex((a) => !a.neutral && prefs.includes(Object.keys(a.scores).find((k) => a.scores[k] === 2))))]));
const allNeutral = () => Object.fromEntries(Q.map((q) => [q.id, q.answers.findIndex((a) => a.neutral)]));
const mulberry = (a) => () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };

// ---- 8.1 chấm điểm cơ bản
run('dữ liệu câu hỏi hợp lệ (24 câu, 6/cặp, không chấm chéo)', () => {
  assert.deepStrictEqual(E.validateQuestions(Q), []);
  assert.strictEqual(Q.length, 24);
  for (const d of ['EI', 'SN', 'TF', 'JP']) assert.strictEqual(Q.filter((q) => q.dimension === d).length, 6);
  Q.forEach((q) => assert.strictEqual(q.answers.filter((a) => a.neutral).length, 1, q.id));
  Q.forEach((q) => assert.ok(q.answers[q.answers.length - 1].neutral, q.id + ' C phải ở cuối'));
});
run('toàn bộ nghiêng E/S/T/J → ESTJ', () => assert.strictEqual(E.resolveType(Q, pickBy('ESTJ')).nearestType, 'ESTJ'));
run('toàn bộ nghiêng I/N/F/P → INFP', () => assert.strictEqual(E.resolveType(Q, pickBy('INFP')).nearestType, 'INFP'));
run('toàn bộ C → XXXX, 50/50, nearestType null', () => {
  const t = E.resolveType(Q, allNeutral());
  assert.strictEqual(t.code, 'XXXX'); assert.strictEqual(t.nearestType, null);
  t.dims.forEach((d) => { assert.strictEqual(d.pa, 50); assert.strictEqual(d.level, 'balanced'); assert.strictEqual(d.certainty, 'low'); });
});
run('cả 16 kiểu đạt được', () => {
  const seen = new Set();
  for (let m = 0; m < 16; m++) seen.add(E.resolveType(Q, pickBy([['E', 'I'][m & 1], ['S', 'N'][(m >> 1) & 1], ['T', 'F'][(m >> 2) & 1], ['J', 'P'][(m >> 3) & 1]])).nearestType);
  assert.strictEqual(seen.size, 16);
});
run('một câu chỉ đổi điểm đúng một cặp (cách ly cặp)', () => {
  for (const q of Q) {
    const base = pickBy('ESTJ'); const before = E.computeScores(Q, base);
    q.answers.forEach((_, i) => {
      const s = E.computeScores(Q, { ...base, [q.id]: i });
      for (const l of 'EISNTFJP') if (!q.dimension.includes(l)) assert.strictEqual(s[l], before[l], `${q.id} làm đổi ${l}`);
    });
  }
});
run('tie: hòa tuyệt đối dùng anchor, anchor trung tính thì giữ X', () => {
  const qs = ['q1', 'q2'].map((id, i) => ({ id, dimension: 'EI', anchor: i === 0, answers: [{ scores: { E: 2, I: 0 } }, { scores: { E: 0, I: 2 } }, { scores: { E: 1, I: 1 }, neutral: true }] }));
  const t = E.resolveType(qs, { q1: 0, q2: 1 }).dims[0];
  assert.ok(t.tied && t.winner === 'X' && t.resolved === 'E' && t.level === 'balanced');
  assert.strictEqual(E.resolveType(qs, { q1: 2, q2: 1 }).dims[0].resolved, 'I'); // hòa 1+... không: E1 I3
  const t2 = E.resolveType(qs, { q1: 2, q2: 2 });
  assert.strictEqual(t2.dims[0].resolved, null); assert.strictEqual(t2.nearestType, null);
});
run('đổi đáp án và trả lời một phần không lỗi', () => {
  const a = pickBy('ESTJ'); const before = E.computeScores(Q, a).E;
  a.q1 = Q[0].answers.findIndex((x) => x.scores.I === 2); assert.ok(E.computeScores(Q, a).E < before);
  assert.strictEqual(E.resolveType(Q, { q1: 0 }).code.length, 4);
});

// ---- 8.2 bias vị trí đáp án
run('đảo A/B cho cùng kết quả khi điểm đi cùng nội dung', () => {
  const rng = mulberry(7);
  const Q2 = Q.map((q) => ({ ...q, answers: [q.answers[1], q.answers[0], q.answers[2]] }));
  for (let n = 0; n < 200; n++) {
    const a1 = {}, a2 = {};
    Q.forEach((q) => { const i = Math.floor(rng() * 3); a1[q.id] = i; a2[q.id] = i === 0 ? 1 : i === 1 ? 0 : 2; });
    assert.deepStrictEqual(E.resolveType(Q, a1).dims.map((d) => [d.pa, d.level]), E.resolveType(Q2, a2).dims.map((d) => [d.pa, d.level]));
  }
});
run('A/B được trộn: mỗi cặp có cả hai chữ ở vị trí A', () => {
  for (const d of ['EI', 'SN', 'TF', 'JP']) {
    const firstLetters = new Set(Q.filter((q) => q.dimension === d).map((q) => Object.keys(q.answers[0].scores).find((k) => q.answers[0].scores[k] === 2)));
    assert.strictEqual(firstLetters.size, 2, d);
  }
});

// ---- 8.3 biên
run('level theo margin', () => {
  assert.strictEqual(E.levelOf(8), 'balanced'); assert.strictEqual(E.levelOf(0), 'balanced');
  assert.strictEqual(E.levelOf(16), 'slight'); assert.strictEqual(E.levelOf(20), 'slight');
  assert.strictEqual(E.levelOf(34), 'clear'); assert.strictEqual(E.levelOf(36), 'clear');
  assert.strictEqual(E.levelOf(50), 'strong');
});
run('certainty: 4/6 câu C không được báo high', () => {
  const a = pickBy('ESTJ'); const eiIds = Q.filter((q) => q.dimension === 'EI').map((q) => q.id);
  const neutral = (id) => Q.find((q) => q.id === id).answers.findIndex((x) => x.neutral);
  eiIds.slice(0, 4).forEach((id) => (a[id] = neutral(id)));
  assert.notStrictEqual(E.resolveType(Q, a).dimensions.EI.certainty, 'high');
  assert.strictEqual(E.resolveType(Q, a).dimensions.EI.certainty, 'low');
  assert.strictEqual(E.resolveType(Q, pickBy('ESTJ')).dimensions.EI.certainty, 'high');
  eiIds.slice(0, 1).forEach((id) => (a[id] = neutral(id)));
  const b = pickBy('ESTJ'); b[eiIds[0]] = neutral(eiIds[0]);
  assert.strictEqual(E.resolveType(Q, b).dimensions.EI.certainty, 'medium'); // 5/6
});

// ---- 8.4 phân bố mô phỏng
run('mô phỏng 20000 lượt: hai chữ trong cùng cặp thắng gần như ngang nhau, 16 kiểu không lệch', () => {
  const rng = mulberry(2026), N = 20000, wins = {}, types = {};
  for (const l of 'EISNTFJP') wins[l] = 0;
  for (let n = 0; n < N; n++) {
    const a = {}; Q.forEach((q) => (a[q.id] = Math.floor(rng() * 3)));
    const t = E.resolveType(Q, a);
    t.dims.forEach((d) => { if (!d.tied) wins[d.winner]++; });
    types[t.nearestType] = (types[t.nearestType] || 0) + 1;
  }
  for (const [x, y] of E.DIMS) assert.ok(Math.abs(wins[x] - wins[y]) / (wins[x] + wins[y]) < 0.03, `${x}/${y} lệch: ${wins[x]} vs ${wins[y]}`);
  const nn = Object.entries(types).filter(([k]) => k !== 'null');
  assert.strictEqual(nn.length, 16);
  const tot = nn.reduce((s, [, v]) => s + v, 0), exp = tot / 16;
  nn.forEach(([k, v]) => assert.ok(v > exp * 0.6 && v < exp * 1.5, `${k} lệch: ${v} vs kỳ vọng ${Math.round(exp)}`));
  console.log('   null (không có kiểu gần nhất):', ((types.null || 0) / N * 100).toFixed(1) + '%');
});
run('mô phỏng chỉ A/B (không C): 16 kiểu phân bố đều', () => {
  const rng = mulberry(11), N = 20000, types = {};
  for (let n = 0; n < N; n++) { const a = {}; Q.forEach((q) => (a[q.id] = Math.floor(rng() * 2))); const t = E.resolveType(Q, a).nearestType; types[t] = (types[t] || 0) + 1; }
  Object.values(types).forEach((v) => assert.ok(v > (N / 16) * 0.7 && v < (N / 16) * 1.3));
  assert.strictEqual(Object.keys(types).length, 16);
});

// ---- 8.5 ổn định
run('đổi một câu chỉ làm đổi đúng một cặp', () => {
  const rng = mulberry(5);
  for (let n = 0; n < 300; n++) {
    const a = {}; Q.forEach((q) => (a[q.id] = Math.floor(rng() * 3)));
    const q = Q[Math.floor(rng() * Q.length)]; const b = { ...a, [q.id]: (a[q.id] + 1) % 3 };
    const s1 = E.resolveType(Q, a), s2 = E.resolveType(Q, b);
    s1.dims.forEach((d, i) => { if (d.pair !== q.dimension) assert.deepStrictEqual([d.pa, d.winner, d.level], [s2.dims[i].pa, s2.dims[i].winner, s2.dims[i].level]); });
  }
});
run('interleave giữ đủ câu, xen kẽ 4 cặp', () => {
  const o = E.interleave(Q); assert.strictEqual(o.length, Q.length);
  for (let i = 0; i + 3 < o.length; i += 4) assert.strictEqual(new Set(o.slice(i, i + 4).map((q) => q.dimension)).size, 4);
});

// ---- Nội dung
const BAD = /chắc chắn|nhất định|số phận|hoàn toàn là|\bbạn sẽ\b|bệnh|tử vong|\bchết|tai nạn|mất tiền|chia tay|thất nghiệp|lo lắng|quá nhạy cảm|thiếu kế hoạch|cứng nhắc|lạnh lùng/i;
const strings = (o) => (typeof o === 'string' ? [o] : Object.values(o || {}).flatMap(strings));
run('16 personalities đủ nội dung', () => {
  const need = ['title', 'en', 'subtitle', 'strengths', 'description', 'socialStyle', 'workStyle', 'loveStyle', 'hiddenStrength', 'encouragement'];
  assert.strictEqual(Object.keys(PERSONALITIES).length, 16);
  for (const [k, p] of Object.entries(PERSONALITIES)) { assert.strictEqual(p.code, k); need.forEach((f) => assert.ok(p[f] && p[f].length, k + '.' + f)); assert.strictEqual(p.strengths.length, 3); }
});
run('tarot đủ nội dung', () => {
  const need = ['id', 'name', 'vietnameseName', 'keywords', 'personalityMessage', 'futureGeneral', 'loveMessage', 'careerMessage', 'moneyMessage', 'selfGrowthMessage', 'happinessMessage', 'encouragement', 'art', 'weights'];
  assert.ok(TAROT_DECK.length >= 16); assert.strictEqual(new Set(TAROT_DECK.map((c) => c.id)).size, TAROT_DECK.length);
  TAROT_DECK.forEach((c) => need.forEach((f) => assert.ok(c[f] && c[f].length !== 0, c.id + '.' + f)));
});
run('không có từ tiêu cực / khẳng định tuyệt đối (câu hỏi, kết quả, messages)', () => {
  [PERSONALITIES, TAROT_DECK, MESSAGES, Q.map((q) => ({ t: q.text, a: q.answers.map((a) => a.text) }))].forEach((src) => strings(src).forEach((s) => assert.ok(!BAD.test(s), 'bad wording: ' + s)));
});
run('câu mức nghiêng đủ cho 8 chữ x 3 mức, trục cân bằng có từ khóa bắt buộc', () => {
  for (const l of 'EISNTFJP') ['slight', 'clear', 'strong'].forEach((lv) => assert.ok(MESSAGES.levels[l][lv].length > 20, l + lv));
  Object.values(MESSAGES.balanced).forEach((s) => assert.ok(/cân bằng|tùy|không nghiêng rõ/.test(s), s));
});
run('headline: is / nearest / profile', () => {
  const p = Compose.getPersonality('INFP');
  assert.strictEqual(Compose.headline({ nearestType: 'INFP', balancedCount: 0 }, p, 'Lan').mode, 'is');
  assert.strictEqual(Compose.headline({ nearestType: 'INFP', balancedCount: 1 }, p, 'Lan').mode, 'nearest');
  assert.ok(!/bạn là/.test(Compose.headline({ nearestType: 'INFP', balancedCount: 1 }, p, 'Lan').lead));
  assert.strictEqual(Compose.headline({ nearestType: 'INFP', balancedCount: 2 }, p).mode, 'profile');
  const none = Compose.headline({ nearestType: null, balancedCount: 4 }, Compose.getPersonality(null), '');
  assert.strictEqual(none.mode, 'profile'); assert.ok(none.title.length > 5);
});
run('describeBlend: trục cân bằng dùng câu cân bằng, trục rõ dùng câu mức nghiêng', () => {
  const t = E.resolveType(Q, { ...pickBy('ESTJ') });
  const txt = Compose.describeBlend(t.dims);
  assert.ok(txt.includes(MESSAGES.levels.E.strong)); assert.ok(!/undefined/.test(txt));
  assert.ok(Compose.describeBlend(E.resolveType(Q, allNeutral()).dims).includes(MESSAGES.balanced.EI));
});
run('compose: 16 kiểu x lá bài x mọi chế độ, không còn placeholder, ổn định', () => {
  const profiles = [{ nearestType: 'ENFP', balancedCount: 0 }, { nearestType: 'ENFP', balancedCount: 1 }, { nearestType: null, balancedCount: 4 }];
  for (const p of Object.values(PERSONALITIES).concat([Compose.getPersonality(null)])) for (const c of TAROT_DECK) for (const pr of profiles) {
    const f = Compose.buildFinalResult(p, c, pr);
    strings({ ...f, extra: f.extra.text }).forEach((s) => assert.ok(s.length > 10 && !/[{}]|undefined/.test(s) && !BAD.test(s), p.code + c.id + ': ' + s));
    assert.deepStrictEqual(f, Compose.buildFinalResult(p, c, pr));
  }
});
run('thiếu personality → hồ sơ cân bằng', () => { assert.ok(Compose.getPersonality('XXXX').title); assert.ok(Compose.getPersonality(null).title); });

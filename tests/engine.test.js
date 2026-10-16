// node tests/engine.test.js
const assert = require('assert');
const path = require('path');
const r = (f) => require(path.join(__dirname, '..', f));
['data/questions.js', 'data/personalities.js', 'data/tarot.js', 'data/messages.js'].forEach(r);
const { resolveType, computeScores, interleave, shuffle } = r('js/engine.js');
const Compose = r('js/compose.js');
const Q = globalThis.QUIZ_QUESTIONS;

// chọn đáp án theo letter ưu tiên cho từng câu
const pickBy = (prefs) => Object.fromEntries(Q.map((q) => {
  const i = q.answers.findIndex((a) => Object.keys(a.scores).some((k) => prefs.includes(k) && a.scores[k] >= 1));
  return [q.id, i < 0 ? 0 : i];
}));
const run = (name, fn) => { fn(); console.log('ok -', name); };

run('strong E/N/F/P', () => assert.strictEqual(resolveType(Q, pickBy('ENFP')).code, 'ENFP'));
run('strong I/S/T/J', () => assert.strictEqual(resolveType(Q, pickBy('ISTJ')).code, 'ISTJ'));
run('all 16 types reachable', () => {
  const seen = new Set();
  for (let m = 0; m < 16; m++) seen.add(resolveType(Q, pickBy(['EI'[m & 1], 'SN'[(m >> 1) & 1], 'TF'[(m >> 2) & 1], 'JP'[(m >> 3) & 1]].join(''))).code);
  assert.strictEqual(seen.size, 16);
});
run('balanced E/I is borderline, key question decides', () => {
  const a = pickBy('ENFP');
  const ei = Q.filter((q) => q.dim === 'EI');
  // 2 E-answer + 2 I-answer: q1,q2 -> E ; q3(key) -> I ; q4 -> I  (q4 A scores I)
  ei.forEach((q, i) => { a[q.id] = q.answers.findIndex((x) => (i < 2 ? x.scores.E : x.scores.I)); });
  const d = resolveType(Q, a).dims[0];
  assert.ok(d.borderline || Math.abs(d.pa - d.pb) < 30);
});
run('exact tie uses key question then default second letter', () => {
  const qs = [
    { id: 'a', dim: 'EI', key: true, answers: [{ scores: { E: 1 } }, { scores: { I: 1 } }] },
    { id: 'b', dim: 'EI', answers: [{ scores: { E: 1 } }, { scores: { I: 1 } }] }
  ];
  const t = resolveType(qs, { a: 0, b: 1 }).dims[0];
  assert.ok(t.tied && t.borderline && t.winner === 'E');
  assert.strictEqual(resolveType(qs, {}).dims[0].winner, 'I'); // all ties -> I
});
run('balanced T/F', () => {
  const qs = Q.filter((q) => q.dim === 'TF');
  const a = {}; qs.forEach((q, i) => { a[q.id] = q.answers.findIndex((x) => (i % 2 ? x.scores.T : x.scores.F)); });
  const d = resolveType(Q, a).dims[2];
  assert.strictEqual(d.pa, 50); assert.ok(d.borderline);
});
run('answer change recomputes', () => {
  const a = pickBy('ENFP'); const before = computeScores(Q, a).E;
  a.q1 = Q[0].answers.findIndex((x) => x.scores.I); assert.ok(computeScores(Q, a).E < before);
});
run('partial answers (back/next) do not crash', () => assert.ok(resolveType(Q, { q1: 0 }).code.length === 4));
run('interleave keeps all questions', () => assert.strictEqual(interleave(Q).length, Q.length));
run('shuffle keeps members', () => assert.strictEqual(shuffle([1, 2, 3, 4]).sort().join(), '1,2,3,4'));

// Content QA
const BAD = /chắc chắn|nhất định|số phận|\bbạn sẽ\b|bệnh|tử vong|\bchết|tai nạn|mất tiền|chia tay|thất nghiệp|lo lắng|quá nhạy cảm|thiếu kế hoạch|cứng nhắc|lạnh lùng/i;
const strings = (o) => typeof o === 'string' ? [o] : Object.values(o || {}).flatMap(strings);
run('16 personalities fully filled', () => {
  const need = ['title', 'en', 'subtitle', 'strengths', 'description', 'socialStyle', 'workStyle', 'loveStyle', 'hiddenStrength', 'encouragement'];
  assert.strictEqual(Object.keys(PERSONALITIES).length, 16);
  for (const [k, p] of Object.entries(PERSONALITIES)) { assert.strictEqual(p.code, k); need.forEach((f) => assert.ok(p[f] && p[f].length, k + '.' + f)); assert.strictEqual(p.strengths.length, 3); }
});
run('tarot fully filled', () => {
  const need = ['id', 'name', 'vietnameseName', 'keywords', 'personalityMessage', 'futureGeneral', 'loveMessage', 'careerMessage', 'moneyMessage', 'selfGrowthMessage', 'happinessMessage', 'encouragement', 'art', 'weights'];
  assert.ok(TAROT_DECK.length >= 16);
  assert.strictEqual(new Set(TAROT_DECK.map((c) => c.id)).size, TAROT_DECK.length);
  TAROT_DECK.forEach((c) => need.forEach((f) => assert.ok(c[f] && c[f].length !== 0, c.id + '.' + f)));
});
run('no negative / absolute wording', () => {
  [PERSONALITIES, TAROT_DECK, MESSAGES, Q].forEach((src) => strings(src).forEach((s) => assert.ok(!BAD.test(s), 'bad wording: ' + s)));
});
run('compose never yields unfilled placeholders, for all 16 x tarot', () => {
  for (const p of Object.values(PERSONALITIES)) for (const c of TAROT_DECK) {
    const f = Compose.buildFinalResult(p, c);
    strings({ ...f, extra: f.extra.text }).forEach((s) => assert.ok(s.length > 10 && !/[{}]|undefined/.test(s), p.code + c.id + ': ' + s));
    assert.deepStrictEqual(f, Compose.buildFinalResult(p, c)); // deterministic
  }
});
run('missing personality falls back', () => assert.ok(Compose.getPersonality('XXXX').title));

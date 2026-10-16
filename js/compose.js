// Ghép personality + tarot thành kết quả. Không đụng DOM.
(function (root) {
  const hash = (s) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
  const pick = (arr, seed) => arr[hash(seed) % arr.length];
  const lc = (s) => s.charAt(0).toLowerCase() + s.slice(1);
  const fill = (t, v) => t.replace(/\{(\w+)\}/g, (_, k) => v[k]);

  // Thiếu content một type thì vẫn render được.
  function getPersonality(code) {
    const p = root.PERSONALITIES[code];
    if (p) return p;
    return {
      code, title: 'Người Độc Đáo', en: 'The Original', subtitle: 'Một sự kết hợp riêng của bạn.',
      strengths: ['Độc đáo', 'Chân thật', 'Giàu tiềm năng'],
      description: 'Bạn có sự kết hợp riêng mà không khuôn mẫu nào gói gọn hết.',
      socialStyle: 'Bạn có cách kết nối riêng với mọi người.', workStyle: 'Bạn làm việc theo cách phù hợp nhất với mình.',
      loveStyle: 'Bạn yêu theo cách chân thành của riêng bạn.', hiddenStrength: 'Khả năng là chính mình.',
      encouragement: 'Bạn là một phiên bản không thể thay thế.'
    };
  }

  // Mô tả blend: dimension rõ thì nêu nghiêng về đâu, sát 50/50 thì dùng wording cân bằng.
  function describeBlend(dims, code) {
    const M = root.MESSAGES, clear = dims.filter((d) => !d.borderline), parts = [];
    if (clear.length) {
      const lean = clear.map((d) => M.lean[d.winner]).join('; ');
      parts.push(`Bạn nghiêng về ${code}, với xu hướng ${lean}.`);
      const mixed = clear.filter((d) => Math.min(d.pa, d.pb) >= 30).map((d) => (d.winner === d.a ? d.b : d.a));
      if (mixed.length) parts.push(`Bạn vẫn có khá nhiều đặc điểm của ${mixed.join(' và ')}.`);
    }
    dims.filter((d) => d.borderline).forEach((d) => parts.push(M.balanced[d.a + d.b]));
    return parts.join(' ');
  }

  function buildFinalResult(personality, tarot) {
    const M = root.MESSAGES, seed = personality.code + tarot.id;
    const bridge = fill(pick(M.bridges, seed), {
      title: personality.title, strength: lc(personality.strengths[0]), kw: lc(tarot.keywords[0])
    });
    const extraKeys = ['money', 'growth', 'happiness'];
    const w = tarot.weights || [1, 1, 1, 1, 1];
    const extraW = { money: w[2], growth: w[3], happiness: w[4] };
    const extra = extraKeys.reduce((best, k) => (extraW[k] > extraW[best] ? k : best), 'growth');
    const extraText = { money: tarot.moneyMessage, growth: tarot.selfGrowthMessage, happiness: tarot.happinessMessage }[extra];
    return {
      message: [personality.description, tarot.personalityMessage, bridge].join(' '),
      future: tarot.futureGeneral,
      love: `${personality.loveStyle} ${tarot.loveMessage}`,
      career: `${personality.workStyle} ${tarot.careerMessage}`,
      extra: { key: extra, label: M.groupLabels[extra], text: extraText },
      note: [personality.encouragement, tarot.encouragement, pick(M.closings, seed + 'c')].join(' ')
    };
  }

  const api = { getPersonality, describeBlend, buildFinalResult };
  root.Compose = api;
  if (typeof module !== 'undefined') module.exports = api;
})(globalThis);

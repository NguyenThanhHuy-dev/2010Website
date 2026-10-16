// Ghép personality + tarot thành kết quả. Không đụng DOM.
(function (root) {
  const hash = (s) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
  const pick = (arr, seed) => arr[hash(seed) % arr.length];
  const lc = (s) => s.charAt(0).toLowerCase() + s.slice(1);
  const fill = (t, v) => t.replace(/\{(\w+)\}/g, (_, k) => v[k]);

  // Không có kiểu gần nhất (nhiều trục hòa) hoặc thiếu content: dùng hồ sơ cân bằng.
  function getPersonality(code) {
    const p = code && root.PERSONALITIES[code];
    if (p) return p;
    return {
      code: code || 'XXXX', title: 'Người Cân Bằng', en: 'The Balanced', subtitle: 'Linh hoạt giữa nhiều xu hướng, tùy từng hoàn cảnh.',
      strengths: ['Linh hoạt', 'Nhìn được nhiều phía', 'Thích ứng tốt'],
      description: 'Bạn có xu hướng cân bằng giữa nhiều cách nhìn và cách hành động, nên thường thích ứng linh hoạt theo từng hoàn cảnh.',
      socialStyle: 'Bạn dễ điều chỉnh cách kết nối tùy người và tùy không khí.',
      workStyle: 'Bạn làm việc tốt khi được linh hoạt chọn cách tiếp cận phù hợp với từng nhiệm vụ.',
      loveStyle: 'Bạn thường yêu theo cách thích nghi và thấu hiểu nhiều phía.',
      hiddenStrength: 'Khả năng nhìn nhiều phía của cùng một vấn đề.',
      encouragement: 'Sự cân bằng của bạn không phải là thiếu rõ ràng. Đó là sự linh hoạt đáng quý.'
    };
  }

  // Chế độ hiển thị nhãn: 'is' (rõ), 'nearest' (1 trục cân bằng), 'profile' (từ 2 trục cân bằng hoặc không có kiểu gần nhất).
  function mode(profile) {
    if (!profile || !profile.nearestType) return 'profile';
    if (profile.balancedCount >= 2) return 'profile';
    return profile.balancedCount === 1 ? 'nearest' : 'is';
  }

  // lead: dòng nhỏ phía trên, title: dòng lớn. Không dùng "bạn là" khi chưa chắc.
  function headline(profile, personality, name) {
    const who = name ? `${name}, ` : '';
    const m = mode(profile);
    if (m === 'is') return { mode: m, lead: `${who}bạn là`, title: personality.title };
    if (m === 'nearest') return { mode: m, lead: `${who}kiểu gần nhất với bạn:`, title: personality.title };
    if (profile && profile.nearestType) return { mode: m, lead: `${who}hồ sơ của bạn khá cân bằng. Kiểu gần nhất:`, title: personality.title };
    return { mode: m, lead: who ? `${who}hồ sơ của bạn` : 'Hồ sơ của bạn', title: 'cân bằng giữa nhiều xu hướng' };
  }

  // Mô tả từng trục theo mức nghiêng thật; trục cân bằng dùng câu "tùy tình huống".
  function describeBlend(dims) {
    const M = root.MESSAGES;
    return dims.map((d) => {
      if (d.level === 'balanced') return M.balanced[d.pair];
      const s = M.levels[d.winner][d.level];
      return d.certainty === 'low' ? `${s} ${M.lowCertainty}` : s;
    }).join(' ');
  }

  function buildFinalResult(personality, tarot, profile) {
    const M = root.MESSAGES, seed = personality.code + tarot.id;
    const bridge = fill(pick(M.bridges, seed), {
      title: personality.title, strength: lc(personality.strengths[0]), kw: lc(tarot.keywords[0])
    });
    const m = mode(profile);
    const intro = !profile || m === 'is' ? [] : [profile.nearestType
      ? `Câu trả lời của bạn gần nhất với kiểu ${personality.title}, nên hãy xem đây là bức tranh gần đúng chứ không phải một nhãn cố định.`
      : 'Câu trả lời của bạn khá cân bằng giữa nhiều xu hướng, nên hãy xem đây là một gợi ý linh hoạt.'];
    const w = tarot.weights || [1, 1, 1, 1, 1];
    const extraW = { money: w[2], growth: w[3], happiness: w[4] };
    const extra = ['money', 'growth', 'happiness'].reduce((best, k) => (extraW[k] > extraW[best] ? k : best), 'growth');
    const extraText = { money: tarot.moneyMessage, growth: tarot.selfGrowthMessage, happiness: tarot.happinessMessage }[extra];
    return {
      message: [...intro, personality.description, tarot.personalityMessage, bridge].join(' '),
      future: tarot.futureGeneral,
      love: `${personality.loveStyle} ${tarot.loveMessage}`,
      career: `${personality.workStyle} ${tarot.careerMessage}`,
      extra: { key: extra, label: M.groupLabels[extra], text: extraText },
      note: [personality.encouragement, tarot.encouragement, pick(M.closings, seed + 'c')].join(' ')
    };
  }

  const api = { getPersonality, mode, headline, describeBlend, buildFinalResult };
  root.Compose = api;
  if (typeof module !== 'undefined') module.exports = api;
})(globalThis);

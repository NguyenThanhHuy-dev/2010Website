// Line-art SVG cho lá bài, vẽ bằng code nên không phụ thuộc file ảnh.
(function (root) {
  const G = 'stroke="#e6c880" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"';
  const rad = (d) => (d * Math.PI) / 180;
  const pt = (r, d, cx = 100, cy = 130) => `${(cx + r * Math.sin(rad(d))).toFixed(1)},${(cy - r * Math.cos(rad(d))).toFixed(1)}`;
  const range = (n) => Array.from({ length: n }, (_, i) => i);
  const ray = (r1, r2, d) => { const [x1, y1] = pt(r1, d).split(','); const [x2, y2] = pt(r2, d).split(','); return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" ${G}/>`; };

  const symbols = {
    sun: () => `<circle cx="100" cy="130" r="22" ${G}/>` + range(12).map((i) => ray(30, 48, i * 30)).join(''),
    star: () => `<polygon points="${range(16).map((i) => pt(i % 2 ? 16 : 48, i * 22.5)).join(' ')}" ${G}/><circle cx="100" cy="130" r="58" ${G} stroke-dasharray="2 6"/>`,
    moon: () => `<path d="M122 86 A46 46 0 1 0 122 174 A36 36 0 1 1 122 86Z" ${G}/><circle cx="140" cy="100" r="3" fill="#e6c880"/><circle cx="150" cy="140" r="2" fill="#e6c880"/>`,
    flower: () => range(6).map((i) => `<ellipse cx="100" cy="100" rx="11" ry="26" transform="rotate(${i * 60} 100 130)" ${G}/>`).join('') + `<circle cx="100" cy="130" r="8" ${G}/>`,
    lotus: () => [-60, -30, 0, 30, 60].map((a) => `<ellipse cx="100" cy="112" rx="12" ry="30" transform="rotate(${a} 100 150)" ${G}/>`).join('') + `<path d="M60 160 Q100 180 140 160" ${G}/>`,
    cup: () => `<path d="M70 95 H130 C130 135 115 152 100 152 C85 152 70 135 70 95Z M100 152 V182 M80 182 H120" ${G}/><path d="M80 112 H120" ${G}/>`,
    coin: () => `<circle cx="100" cy="130" r="44" ${G}/><circle cx="100" cy="130" r="34" ${G}/><polygon points="${range(5).map((i) => pt(22, i * 144)).join(' ')}" ${G}/>`,
    wand: () => `<path d="M72 190 L128 70" ${G}/>` + [[84, 164], [96, 138], [108, 112], [120, 86]].map(([x, y], i) => `<ellipse cx="${x + (i % 2 ? 9 : -9)}" cy="${y}" rx="4" ry="9" transform="rotate(${i % 2 ? 40 : -40} ${x + (i % 2 ? 9 : -9)} ${y})" ${G}/>`).join(''),
    heart: () => `<path d="M100 175 C40 135 55 85 100 115 C145 85 160 135 100 175Z" ${G}/>`,
    wheel: () => `<circle cx="100" cy="130" r="42" ${G}/><circle cx="100" cy="130" r="8" ${G}/>` + range(8).map((i) => ray(8, 42, i * 45)).join(''),
    ring: () => `<ellipse cx="100" cy="130" rx="38" ry="52" ${G}/>` + range(16).map((i) => ray(54, 62, i * 22.5)).join('') + `<circle cx="100" cy="130" r="6" ${G}/>`,
    arrow: () => `<path d="M100 80 L135 130 H112 V180 H88 V130 H65 Z" ${G}/>`,
    drops: () => `<path d="M80 88 C66 112 64 130 80 134 C96 130 94 112 80 88Z M122 126 C108 150 106 168 122 172 C138 168 136 150 122 126Z" ${G}/>`,
    rainbow: () => [52, 38, 24].map((r) => `<path d="M${100 - r} 170 A${r} ${r} 0 0 1 ${100 + r} 170" ${G}/>`).join(''),
    crown: () => `<path d="M60 170 L65 100 L85 135 L100 95 L115 135 L135 100 L140 170Z" ${G}/><circle cx="100" cy="88" r="3" fill="#e6c880"/>`,
    infinity: () => `<path d="M100 130 C120 90 160 90 160 130 C160 170 120 170 100 130 C80 90 40 90 40 130 C40 170 80 170 100 130Z" ${G}/>`
  };

  function spark(x, y, r) {
    return `<path d="M${x} ${y - r} L${x + r / 3} ${y - r / 3} L${x + r} ${y} L${x + r / 3} ${y + r / 3} L${x} ${y + r} L${x - r / 3} ${y + r / 3} L${x - r} ${y} L${x - r / 3} ${y - r / 3}Z" fill="#e6c880"/>`;
  }

  function symbol(name) {
    try { return (symbols[name] || symbols.star)(); } catch (e) { return symbols.star(); }
  }

  // alt text nằm ở thẻ cha; svg chỉ trang trí.
  function cardArt(card) {
    return `<svg viewBox="0 0 200 300" aria-hidden="true" focusable="false">
      <rect x="6" y="6" width="188" height="288" rx="14" fill="none" stroke="#e6c880" stroke-width="1.5"/>
      <rect x="14" y="14" width="172" height="272" rx="10" fill="none" stroke="#e6c880" stroke-opacity=".4"/>
      <text x="100" y="46" text-anchor="middle" fill="#e6c880" font-size="16" font-family="Georgia,serif" letter-spacing="3">${card.num || ''}</text>
      ${symbol(card.art)}${spark(40, 70, 7)}${spark(160, 210, 7)}${spark(150, 60, 4)}${spark(48, 220, 4)}
    </svg>`;
  }

  function cardBack() {
    return `<svg viewBox="0 0 200 300" aria-hidden="true" focusable="false">
      <rect x="6" y="6" width="188" height="288" rx="14" fill="none" stroke="#e6c880" stroke-width="1.5"/>
      <circle cx="100" cy="150" r="52" fill="none" stroke="#e6c880" stroke-opacity=".6"/>
      <polygon points="${range(16).map((i) => pt(i % 2 ? 14 : 40, i * 22.5, 100, 150)).join(' ')}" fill="none" stroke="#e6c880" stroke-width="1.5"/>
      ${spark(100, 50, 8)}${spark(100, 250, 8)}${spark(36, 150, 5)}${spark(164, 150, 5)}
    </svg>`;
  }

  root.Art = { cardArt, cardBack, symbol };
})(globalThis);

// UI + state machine: landing → quiz → personality-result → tarot-selection → tarot-reveal → final-result → share
(function () {
  const { QUIZ_QUESTIONS, TAROT_DECK, MESSAGES: M, SITE } = globalThis;
  const { Engine, Compose, Art, LOVE } = globalThis;
  const offerCount = () => (window.innerWidth >= 820 ? 9 : 7);
  const $app = document.getElementById('app');

  let playerName = '';
  try { playerName = localStorage.getItem('player2010') || ''; } catch (e) { /* private mode */ }
  const fresh = () => ({ screen: 'landing', order: [], current: 0, answers: {}, type: null, personality: null, drawn: [], offered: [], selected: null, final: null, shareUrl: null });
  let state = fresh();

  // ---------- phiên bản tình yêu: ảnh nhập tay + thư + popup ----------
  // Ảnh chỉ sống trong phiên (sessionStorage): đóng tab là mất, lần vào sau không còn ảnh cũ.
  let lovePhoto = '';
  try { localStorage.removeItem(LOVE.storageKey); lovePhoto = sessionStorage.getItem(LOVE.storageKey) || ''; } catch (e) { /* private mode */ }
  const toast = (msg) => {
    const t = document.getElementById('love-toast'); if (!t) return;
    t.textContent = msg; t.classList.add('show');
    clearTimeout(toast.id); toast.id = setTimeout(() => t.classList.remove('show'), 2200);
  };
  // Thu nhỏ ảnh trước khi lưu để vừa localStorage và tải nhanh.
  function shrinkPhoto(file) {
    return new Promise((res, rej) => {
      const url = URL.createObjectURL(file), img = new Image();
      img.onload = () => {
        const k = Math.min(1, LOVE.photoMaxSize / Math.max(img.width, img.height));
        const cv = document.createElement('canvas'); cv.width = Math.round(img.width * k); cv.height = Math.round(img.height * k);
        cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height);
        URL.revokeObjectURL(url); res(cv.toDataURL('image/jpeg', 0.85));
      };
      img.onerror = () => { URL.revokeObjectURL(url); rej(new Error('bad image')); };
      img.src = url;
    });
  }
  document.getElementById('love-pick').addEventListener('click', () => document.getElementById('love-file').click());
  document.getElementById('love-file').addEventListener('change', async (e) => {
    const f = e.target.files && e.target.files[0]; e.target.value = '';
    if (!f) return;
    try {
      lovePhoto = await shrinkPhoto(f);
      try { sessionStorage.setItem(LOVE.storageKey, lovePhoto); } catch (err) { /* vẫn dùng được trong phiên này */ }
      toast('Đã thêm ảnh ♥');
      if (state.screen === 'final-result') render();
    } catch (err) { toast('Không đọc được ảnh này'); }
  });

  let modalOpener = null;
  function openLoveModal(opener) {
    modalOpener = opener;
    const m = document.createElement('div');
    m.className = 'love-modal'; m.setAttribute('role', 'dialog'); m.setAttribute('aria-modal', 'true'); m.setAttribute('aria-label', 'Lời nhắn bất ngờ');
    m.innerHTML = `<div class="love-modal-box"><button type="button" class="love-close" aria-label="Đóng">×</button>
      <img src="${esc(LOVE.popupImage)}" alt="${esc(LOVE.popupAlt)}" onerror="this.remove()">
      <div class="hearts" aria-hidden="true">${[...'💖💕💗💞💓💖💕'].map((h, i) => `<span style="--i:${i}">${h}</span>`).join('')}</div></div>`;
    document.body.appendChild(m);
    const close = () => { m.remove(); document.removeEventListener('keydown', onKey); if (modalOpener && modalOpener.isConnected) modalOpener.focus(); };
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    m.addEventListener('click', (e) => { if (e.target === m || e.target.closest('.love-close')) close(); });
    m.querySelector('.love-close').focus();
  }

  const BOW = `<svg class="bow" viewBox="0 0 120 72" aria-hidden="true"><defs><linearGradient id="rb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f1b9c4"/><stop offset="1" stop-color="#d98ca0"/></linearGradient></defs>
    <path d="M56 38C50 52 44 60 36 68l14-4 6 6c2-12 4-22 4-30z" fill="url(#rb)" stroke="#c9788a" stroke-width=".8"/><path d="M64 38c6 14 12 22 20 30l-14-4-6 6c-2-12-4-22-4-30z" fill="url(#rb)" stroke="#c9788a" stroke-width=".8"/>
    <path d="M60 32C40 6 6 8 12 32c4 16 32 10 48 0z" fill="url(#rb)" stroke="#c9788a" stroke-width=".8"/><path d="M60 32c20-26 54-24 48 0-4 16-32 10-48 0z" fill="url(#rb)" stroke="#c9788a" stroke-width=".8"/>
    <ellipse cx="60" cy="33" rx="8" ry="7" fill="#e49bad" stroke="#c9788a" stroke-width=".8"/></svg>`;
  const SPRIG = `<svg class="sprig" viewBox="0 0 90 100" aria-hidden="true"><g fill="none" stroke="#8aa07a" stroke-width="1.4" stroke-linecap="round"><path d="M14 96C22 70 40 44 74 14"/><path d="M26 74c-8-2-12-8-12-14M38 58c-8 0-14-5-15-12M50 44c-6 0-12-4-13-10M30 70c8-2 12-8 12-14M44 54c8 0 13-5 14-11"/></g>
    <g fill="#fff" stroke="#e7a3b1" stroke-width="1"><circle cx="76" cy="12" r="5"/><circle cx="62" cy="24" r="4.5"/><circle cx="52" cy="38" r="4"/><circle cx="68" cy="30" r="3.5"/><circle cx="44" cy="52" r="3.5"/></g><g fill="#f0b8c2"><circle cx="76" cy="12" r="1.6"/><circle cx="62" cy="24" r="1.5"/><circle cx="52" cy="38" r="1.4"/></g></svg>`;

  function loveSection() {
    return `
      <section class="love-scene" aria-label="Lá thư dành cho bạn">
        <div class="sheet-back sheet-pink" aria-hidden="true"></div><div class="sheet-back sheet-gingham" aria-hidden="true"></div>
        <article class="sheet">
          ${BOW}
          ${lovePhoto ? `<figure class="polaroid"><img src="${lovePhoto}" alt="${esc(LOVE.photoAlt)}"></figure>` : ''}
          <div class="letter">${LOVE.letter.map((p, i) => `<p style="--n:${i}">${esc(p)}</p>`).join('')}</div>
          ${SPRIG}
          <span class="seal" aria-hidden="true">♥</span>
        </article>
        <div class="btn-row"><button class="btn" data-act="love-ok">${esc(LOVE.button)}</button></div>
      </section>`;
  }

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const chips = (arr, cls = '') => `<ul class="chips">${arr.map((x) => `<li class="chip ${cls}">${esc(x)}</li>`).join('')}</ul>`;
  const cardAlt = (c) => `Lá bài ${c.vietnameseName} (${c.name}): ${c.keywords.join(', ')}`;
  const head = () => Compose.headline(state.type, state.personality, playerName);
  const headText = () => { const h = head(); return esc(`${h.lead} ${h.title}`); };

  const ICONS = {
    explore: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
    cards: '<rect x="7" y="3" width="11" height="17" rx="2"/><path d="M4 7v12a2 2 0 0 0 2 2"/><path d="M12.5 9l.8 1.7 1.7.2-1.3 1.2.4 1.7-1.6-.9-1.6.9.4-1.7-1.3-1.2 1.7-.2z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    love: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.600-7 10-7 10z"/>',
    career: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 13h18"/>',
    money: '<circle cx="12" cy="12" r="9"/><path d="M14.500 9a2.500 2 0 0 0-2.500-1.500c-1.400 0-2.500.8-2.500 2s1.100 1.700 2.500 2 2.500.8 2.500 2-1.100 2-2.500 2A2.500 2 0 0 1 9.500 15M12 6v1.500M12 16.500V18"/>',
    growth: '<path d="M12 21v-9"/><path d="M12 12c0-4 3-6 7-6 0 4-3 6-7 6z"/><path d="M12 15c0-3-2-5-6-5 0 3 2 5 6 5z"/>',
    happiness: '<circle cx="12" cy="12" r="9"/><path d="M8.500 14.500a4.500 4.500 0 0 0 7 0M9 9.500h.01M15 9.500h.01"/>',
    spark: '<path d="M12 3l1.800 5.200L19 10l-5.200 1.800L12 17l-1.800-5.200L5 10l5.200-1.800z"/>',
    download: '<path d="M12 4v11M7 11l5 5 5-5M5 20h14"/>',
    share: '<circle cx="6" cy="12" r="2.500"/><circle cx="18" cy="6" r="2.500"/><circle cx="18" cy="18" r="2.500"/><path d="M8.200 11l7.600-4M8.200 13l7.600 4"/>',
    refresh: '<path d="M20 11a8 8 0 1 0-2.300 5.700M20 5v6h-6"/>'
  };
  const icon = (n) => `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">${ICONS[n]}</svg>`;

  // ---------- tải trước ảnh ----------
  const imgCache = new Map();
  function loadImg(src) {
    if (!src) return Promise.resolve();
    if (!imgCache.has(src)) {
      imgCache.set(src, new Promise((res) => {
        const i = new Image();
        i.onload = () => (i.decode ? i.decode() : Promise.resolve()).catch(() => {}).then(res);
        i.onerror = res; // thiếu ảnh thì thôi, không chặn người chơi
        i.src = src;
      }));
    }
    return imgCache.get(src);
  }
  const withTimeout = (p, ms) => Promise.race([p, new Promise((r) => setTimeout(r, ms))]);
  const WAIT_MS = 4000; // mạng quá yếu thì vẫn cho đi tiếp
  const quizImgs = (q) => (q && SITE && SITE.quizImages ? q.answers.flatMap((a, i) => (a.neutral ? [] : [`images/quiz/${q.id}-${i}.jpg`])) : []);
  const preloadQuestion = (i) => quizImgs(state.order[i]).forEach(loadImg);
  const setBusy = (btn, on) => {
    state.busy = on;
    if (!btn || !btn.isConnected) return;
    if (on) { btn.dataset.label = btn.textContent; btn.textContent = 'Đang tải…'; btn.disabled = true; }
    else { btn.textContent = btn.dataset.label || btn.textContent; btn.disabled = false; }
  };

  // Chỉ chuyển câu khi ảnh của câu đó đã tải và giải mã xong (hoặc quá thời gian chờ).
  async function goQuiz(target, btn) {
    if (state.busy) return;
    setBusy(btn, true);
    await withTimeout(Promise.all(quizImgs(state.order[target]).map(loadImg)), WAIT_MS);
    state.busy = false;
    state.current = target;
    go('quiz');
    preloadQuestion(target + 1);
  }

  function go(screen) {
    state.busy = false;
    state.screen = screen;
    document.body.dataset.theme = screen.startsWith('tarot') ? 'dark' : 'light';
    render();
    window.scrollTo({ top: 0, behavior: 'auto' });
    focusHeading();
    if (screen === 'tarot-selection') startFan();
  }

  // Xáo bài (xếp chồng → trượt qua lại) rồi xòe quạt; chỉ cho chọn khi xòe xong.
  function startFan() {
    const fan = $app.querySelector('.fan'), status = $app.querySelector('#fan-status');
    if (!fan) return;
    const alive = () => state.screen === 'tarot-selection' && fan.isConnected;
    const ready = () => {
      if (!alive()) return;
      fan.classList.remove('is-shuffle', 'is-stacked'); fan.classList.add('is-fanned');
      setTimeout(() => { if (alive()) { fan.classList.add('is-ready'); status.textContent = 'Chạm vào lá bài khiến bạn muốn chọn'; } }, 900);
    };
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { ready(); return; }
    setTimeout(() => alive() && fan.classList.add('is-shuffle'), 350);
    setTimeout(ready, 1900);
  }
  function focusHeading() { const h = $app.querySelector('[data-focus]'); if (h) h.focus({ preventScroll: true }); }

  // ---------- views ----------
  const views = {
    landing: () => `
      <section class="screen">
        <div class="hero">
          <div>
            <h1 tabindex="-1" data-focus>20/10 này, vũ trụ muốn nhắn gì với bạn?</h1>
            <p class="lead">Một trải nghiệm vui lấy cảm hứng từ các nhóm tính cách và Tarot. Kết quả mang tính giải trí và truyền cảm hứng. Khoảng 3–5 phút.</p>
            <form class="name-form" autocomplete="off">
              <label for="pname">Tên của bạn</label>
              <input id="pname" name="pname" maxlength="24" placeholder="Nhập tên của bạn" value="${esc(playerName)}" enterkeyhint="go">
              <button class="btn" type="submit" ${playerName.trim() ? '' : 'disabled'}>Bắt đầu khám phá →</button>
            </form>
          </div>
          <div class="hero-img">
            <div class="fallback"><svg viewBox="0 0 200 200" aria-hidden="true"><g fill="none" stroke="#fff" stroke-width="2.500" stroke-linecap="round">
              <path d="M120 40 A62 62 0 1 0 120 160 A48 48 0 1 1 120 40Z"/>${Art.symbol('flower').replace(/#e6c880/g, '#fff')}</g></svg></div>
            <img src="images/hero.jpg" alt="Hình minh họa: người phụ nữ giữa hoa và ánh trăng" onerror="this.remove()">
            <div class="hero-script">Happy Vietnamese Women's Day<b>20.10</b></div>
          </div>
        </div>
        <div class="features">
          <div><span class="ico">${icon('explore')}</span>Khám phá<br>tính cách của bạn</div>
          <div><span class="ico">${icon('cards')}</span>Rút lá bài<br>Tarot</div>
          <div><span class="ico">${icon('mail')}</span>Nhận lời nhắn<br>từ vũ trụ</div>
        </div>
        <p class="quote">Mỗi phiên bản của bạn đều là một điều tuyệt vời.</p>
      </section>`,

    quiz: () => {
      const q = state.order[state.current], total = state.order.length, sel = state.answers[q.id];
      const imgs = SITE && SITE.quizImages;
      return `
      <section class="screen card narrow" aria-labelledby="qtext">
        <div class="q-count">Câu ${state.current + 1}/${total}</div>
        <div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${state.current + 1}"><span style="width:${((state.current + 1) / total) * 100}%"></span></div>
        <h2 class="q-text" id="qtext" tabindex="-1" data-focus>${esc(q.text)}</h2>
        <ul class="options ${imgs ? 'imgs' : ''}">${q.answers.map((a, i) => `
          <li><button class="option${a.neutral ? ' neutral' : ''}" data-act="answer" data-i="${i}" aria-pressed="${sel === i}">
            ${imgs && !a.neutral ? `<img class="opt-img" src="images/quiz/${esc(q.id)}-${i}.jpg" alt="" onerror="this.remove()">` : ''}
            <span class="opt-body"><span class="mark" aria-hidden="true">${sel === i ? '✓' : 'ABCD'[i]}</span><span>${esc(a.text)}</span></span></button></li>`).join('')}</ul>
        <div class="nav">
          <button class="btn ghost" data-act="back" ${state.current === 0 ? 'disabled' : ''}>← Quay lại</button>
          <button class="btn" data-act="next" ${sel === undefined ? 'disabled' : ''}>${state.current === total - 1 ? 'Xem kết quả' : 'Tiếp theo →'}</button>
        </div>
        <p class="quote">Không có đáp án đúng hay sai, chỉ có những mảnh ghép tạo nên bạn.</p>
      </section>`;
    },

    'personality-result': () => {
      const p = state.personality, t = state.type, h = head();
      const portrait = t.nearestType ? `<figure class="portrait"><img src="images/personality/${esc(p.code)}.jpg" alt="Hình minh họa ${esc(p.title)}" onerror="this.closest('figure').remove()"></figure>` : '';
      return `
      <section class="screen">
        <div class="center">
          <span class="tagchip">${h.mode === 'profile' ? 'Hồ sơ tính cách' : 'Kết quả tính cách'}</span>
          <p class="fine" style="margin:0">${esc(h.lead)}</p>
          <h2 class="big-title" tabindex="-1" data-focus>${esc(h.title)}</h2>
          <p class="code">${t.nearestType ? `(${esc(p.code)}) · ${esc(p.en)}` : esc(p.en)}</p>
          <p>${esc(p.subtitle)}</p>
        </div>
        <div class="pr-body">
          ${portrait}
          <div class="pr-text">
            ${h.mode === 'profile' ? '' : `<p>${esc(p.description)}</p>${chips(p.strengths)}`}
            <div class="bars">${t.dims.map(barRow).join('')}</div>
            <p>${esc(Compose.describeBlend(t.dims))}</p>
            ${h.mode === 'profile' ? `${chips(p.strengths)}<p>${esc(p.description)}</p>` : ''}
            <p><strong>Khi kết nối:</strong> ${esc(p.socialStyle)}</p>
            <p><strong>Điều ít ai thấy:</strong> ${esc(p.hiddenStrength)}</p>
            <p class="fine">Tỉ lệ là điểm trong bài test vui này, không phải xác suất hay kết quả MBTI chính thức.</p>
          </div>
        </div>
        <p class="note">${esc(p.encouragement)}</p>
        <div class="btn-row"><button class="btn" data-act="to-tarot">Tiếp tục rút lá bài Tarot →</button></div>
      </section>`;
    },

    tarot: () => {
      const revealed = state.screen === 'tarot-reveal', sel = state.selected;
      if (revealed && state.revealed) {
        return `
        <section class="screen center dark">
          <p class="eyebrow-t" style="margin:8px 0">Lá bài của bạn là...</p>
          <div class="big-card glowing">${tarotCard(sel, 0, sel, true)}</div>
          <h2 class="name-big" tabindex="-1" data-focus>${esc(sel.name)}</h2>
          <p style="font-size:1.1rem;margin-bottom:.4em">${esc(sel.vietnameseName)}</p>
          ${chips(sel.keywords, 'gold')}
          <div class="btn-row"><button class="btn light" data-act="to-final">Xem thông điệp của bạn →</button></div>
        </section>`;
      }
      return `
      <section class="screen center dark">
        <h2 tabindex="-1" data-focus style="margin-top:12px">Chọn một lá bài</h2>
        <p>Hãy lắng nghe trực giác của bạn. Lá bài bạn chọn sẽ mang đến lời nhắn đặc biệt từ vũ trụ.</p>
        <p class="fan-status" id="fan-status" aria-live="polite">Đang xáo bài…</p>
        <div class="fan is-stacked" style="--n:${state.offered.length}" role="group" aria-label="Các lá bài úp, chọn một lá">
          ${state.offered.map((c, i) => tarotCard(c, i, sel)).join('')}
        </div>
        <p class="quote">Không có lựa chọn nào là ngẫu nhiên, tất cả đều đến vào đúng thời điểm.</p>
      </section>`;
    },

    'final-result': () => {
      const p = state.personality, c = state.selected, f = state.final, ex = f.extra;
      return `
      <section class="screen final-box">
        <div class="center">
          <span class="tagchip">Kết quả hoàn chỉnh</span>
          <h2 tabindex="-1" data-focus>${headText()}<br>và lá bài của bạn là ${esc(c.name)}</h2>
          <p>${esc(p.subtitle)}</p>
          <div class="thumbs">
            ${state.type.nearestType ? `<div class="thumb"><figure class="portrait mini"><img src="images/personality/${esc(p.code)}.jpg" alt="" onerror="this.closest('.thumb').remove()"></figure>${esc(p.title)}</div>` : ''}
            <div class="thumb">${tarotCard(c, 0, c, true)}${esc(c.vietnameseName)}</div>
          </div>
        </div>
        <div class="card" style="margin-top:14px">
          <div class="msg"><span class="ico">${icon('spark')}</span><div><h3>Thông điệp dành cho bạn</h3><p>${esc(f.message)}</p></div></div>
          <div class="msg"><span class="ico">${icon('mail')}</span><div><h3>Điều tốt đẹp đang đến gần</h3><p>${esc(f.future)}</p></div></div>
          <div class="tiles">
            <div class="tile"><h3>${icon('love')} Tình yêu</h3><p>${esc(f.love)}</p></div>
            <div class="tile"><h3>${icon('career')} Công việc</h3><p>${esc(f.career)}</p></div>
            <div class="tile"><h3>${icon(ex.key)} ${esc(ex.label)}</h3><p>${esc(ex.text)}</p></div>
          </div>
          <p class="note" style="margin-top:18px">${esc(f.note)}</p>
          <div class="congrats"><h3>Chúc mừng 20/10!</h3><p>Bạn xứng đáng với tất cả những điều tuyệt vời nhất.</p></div>
        </div>
        ${loveSection()}
        <div class="btn-row">
          <button class="btn" data-act="share">${icon('share')} Chia sẻ kết quả</button>
          <button class="btn ghost" data-act="again">Rút thêm một lá</button>
          <button class="btn ghost" data-act="restart">Chơi lại</button>
        </div>
        <p class="fine disclaimer">${esc(M.disclaimer)}</p>
      </section>`;
    },

    share: () => `
      <section class="screen center">
        <h2 tabindex="-1" data-focus>Chia sẻ kết quả của bạn</h2>
        <p>Lan tỏa năng lượng tích cực đến những người phụ nữ tuyệt vời xung quanh bạn nhé!</p>
        ${state.shareUrl ? `<img class="share-img" src="${state.shareUrl}" alt="Ảnh kết quả: ${esc(state.personality.title)}, lá bài ${esc(state.selected.name)}">` : '<div class="share-img" aria-busy="true"></div>'}
        <div class="btn-row">
          <button class="btn" data-act="download" ${state.shareUrl ? '' : 'disabled'}>${icon('download')} Tải ảnh</button>
          <a class="btn ghost" href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(location.href.split('#')[0])}" target="_blank" rel="noopener">${icon('share')} Chia sẻ Facebook</a>
          <button class="btn ghost" data-act="back-final">← Xem lại kết quả</button>
          <button class="btn ghost" data-act="restart">${icon('refresh')} Chơi lại</button>
        </div>
        <p class="fine disclaimer">${esc(M.disclaimer)}</p>
      </section>`
  };

  function barRow(d) {
    const L = M.dimLabels, lvl = M.levelLabels[d.level];
    const tag = d.level === 'balanced' ? `${lvl}, tùy bối cảnh` : `${lvl} ${L[d.winner]}`;
    return `<div class="bar-row"><div class="labels"><span>${L[d.a]} ${d.pa}%</span><span>${L[d.b]} ${d.pb}%</span></div>
      <div class="bar" role="img" aria-label="${L[d.a]} ${d.pa}%, ${L[d.b]} ${d.pb}%"><i style="width:${d.pa}%"></i><span class="mid"></span></div>
      <div class="lvl">${esc(tag)}</div></div>`;
  }

  function tarotCard(c, i, sel, forceFlip) {
    const isSel = !forceFlip && sel && sel.id === c.id;
    const flipped = forceFlip || (state.screen === 'tarot-reveal' && isSel);
    const cls = ['tarot', flipped ? 'flipped' : '', isSel ? 'chosen glow' : '', sel && !forceFlip && !isSel ? 'dim' : ''].join(' ');
    const label = flipped ? cardAlt(c) : `Lá bài úp số ${i + 1}`;
    return `<button class="${cls}" style="--i:${i}" data-act="pick" data-id="${esc(c.id)}" aria-label="${esc(label)}" ${sel ? 'disabled' : ''}>
      <span class="inner"><span class="face back">${Art.cardBack()}</span>
      <span class="face front">${Art.cardArt(c)}${c.image ? `<img class="art-img" src="${esc(c.image)}" alt="" onerror="this.remove()">` : ''}<span class="cap">${esc(c.vietnameseName)}</span></span></span></button>`;
  }

  // ---------- actions ----------
  function startQuiz() {
    const name = ($app.querySelector('#pname') || {}).value || '';
    if (!name.trim()) return;
    playerName = name.trim().replace(/\s+/g, ' ').slice(0, 24);
    try { localStorage.setItem('player2010', playerName); } catch (e) { /* ignore */ }
    state = fresh();
    state.order = Engine.interleave(QUIZ_QUESTIONS);
    trackEvent('quiz_started');
    goQuiz(0, $app.querySelector('.name-form .btn'));
  }

  async function finishQuiz(btn) {
    if (state.busy) return;
    state.type = Engine.resolveType(QUIZ_QUESTIONS, state.answers);
    state.personality = Compose.getPersonality(state.type.nearestType);
    trackEvent('quiz_completed', { code: state.type.code, nearest: state.type.nearestType, scores: state.type.scores });
    setBusy(btn, true);
    if (state.type.nearestType) await withTimeout(loadImg(`images/personality/${state.personality.code}.jpg`), WAIT_MS);
    go('personality-result');
  }

  function dealTarot() {
    let pool = TAROT_DECK.filter((c) => !state.drawn.includes(c.id));
    if (pool.length < offerCount()) { state.drawn = state.selected ? [state.selected.id] : []; pool = TAROT_DECK.filter((c) => !state.drawn.includes(c.id)); }
    state.offered = Engine.shuffle(pool).slice(0, offerCount());
    state.selected = null; state.revealed = false;
    go('tarot-selection');
  }

  function pickCard(id) {
    if (state.selected) return; // chặn double click
    const fan = $app.querySelector('.fan');
    if (fan && !fan.classList.contains('is-ready')) return; // chưa xòe xong
    const card = state.offered.find((c) => c.id === id);
    if (!card) return;
    state.selected = card;
    state.drawn.push(card.id);
    trackEvent('tarot_selected', { id: card.id });
    state.screen = 'tarot-reveal';
    // Đổi class tại chỗ để chạy animation lật; sau đó dựng màn lá bài lớn.
    $app.querySelector('#fan-status').textContent = 'Lá bài của bạn đang lật…';
    $app.querySelectorAll('.tarot').forEach((el) => {
      el.disabled = true;
      const chosen = el.dataset.id === id;
      el.classList.toggle('chosen', chosen); el.classList.toggle('glow', chosen); el.classList.toggle('dim', !chosen);
      if (chosen) setTimeout(() => el.classList.add('flipped'), 350);
    });
    const imgReady = withTimeout(loadImg(card.image), WAIT_MS);
    setTimeout(async () => {
      await imgReady; // lá bài lớn chỉ hiện khi ảnh đã sẵn sàng
      if (state.screen === 'tarot-reveal' && state.selected === card) { state.revealed = true; render(); focusHeading(); }
    }, 1700);
  }

  function showFinal() {
    state.final = Compose.buildFinalResult(state.personality, state.selected, state.type);
    trackEvent('result_viewed', { code: state.personality.code, tarot: state.selected.id });
    go('final-result');
  }

  // ---------- share card ----------
  function wrap(ctx, text, x, y, maxW, lh) {
    let line = '';
    for (const w of text.split(' ')) {
      const t = line ? `${line} ${w}` : w;
      if (ctx.measureText(t).width > maxW && line) { ctx.fillText(line, x, y); line = w; y += lh; } else line = t;
    }
    if (line) { ctx.fillText(line, x, y); y += lh; }
    return y;
  }

  function loadPhoto(src) {
    return new Promise((res) => {
      if (!src) return res(null);
      const img = new Image();
      img.onload = () => res(img); img.onerror = () => res(null);
      img.src = src;
    });
  }

  function loadSvg(svg) {
    return new Promise((res) => {
      const img = new Image();
      img.onload = () => res(img); img.onerror = () => res(null);
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="600" '));
    });
  }

  async function buildShareBlob() {
    const S = 1080, cv = document.createElement('canvas'); cv.width = cv.height = S;
    const ctx = cv.getContext('2d'), p = state.personality, c = state.selected;
    const g = ctx.createLinearGradient(0, 0, S, S); g.addColorStop(0, '#fdeaea'); g.addColorStop(1, '#f1b9c4');
    ctx.fillStyle = g; ctx.fillRect(0, 0, S, S);
    ctx.strokeStyle = '#b88a3e'; ctx.lineWidth = 3; ctx.strokeRect(36, 36, S - 72, S - 72);
    ctx.textAlign = 'left'; ctx.fillStyle = '#b88a3e'; ctx.font = '700 64px Georgia, serif'; ctx.fillText('20.10', 90, 150);
    ctx.fillStyle = '#7a2a43'; ctx.font = '500 28px sans-serif';
    if (playerName) { ctx.textAlign = 'right'; ctx.fillText(playerName, S - 90, 150); ctx.textAlign = 'left'; }
    ctx.fillText(Compose.mode(state.type) === 'is' ? 'TÔI LÀ' : 'KIỂU GẦN NHẤT CỦA TÔI', 90, 270);
    ctx.font = '700 62px Georgia, serif';
    let y = wrap(ctx, p.title.toUpperCase() + ' ✨', 90, 340, 520, 74);
    ctx.fillStyle = '#a8465f'; ctx.font = '500 28px sans-serif'; ctx.fillText(p.en, 90, y + 4);
    ctx.fillStyle = '#7a2a43'; ctx.fillText('LÁ BÀI CỦA TÔI', 90, y + 90);
    ctx.font = '700 48px Georgia, serif'; y = wrap(ctx, c.name.toUpperCase(), 90, y + 150, 520, 58);
    ctx.fillStyle = '#8a5a6b'; ctx.font = 'italic 32px Georgia, serif';
    wrap(ctx, `“${c.encouragement}”`, 90, Math.max(y + 40, 800), 520, 44);
    ctx.fillStyle = '#6a2340'; ctx.fillRect(660, 170, 330, 495);
    const photo = await loadPhoto(c.image);
    if (photo) {
      // cover: cắt giữa cho vừa khung 2:3, bo góc
      const W = 330, H = 495, k = Math.max(W / photo.width, H / photo.height), sw = W / k, sh = H / k;
      ctx.save(); ctx.beginPath(); ctx.roundRect ? ctx.roundRect(660, 170, W, H, 18) : ctx.rect(660, 170, W, H); ctx.clip();
      ctx.drawImage(photo, (photo.width - sw) / 2, (photo.height - sh) / 2, sw, sh, 660, 170, W, H); ctx.restore();
    } else {
      const art = await loadSvg(Art.cardArt(c)); // dự phòng khi thiếu ảnh
      if (art) ctx.drawImage(art, 660, 170, 330, 495);
    }
    return new Promise((res) => cv.toBlob(res, 'image/png'));
  }

  async function openShare() {
    trackEvent('share_clicked', { code: state.personality.code, tarot: state.selected.id });
    if (state.shareUrl) URL.revokeObjectURL(state.shareUrl);
    state.shareUrl = null; state.shareBlob = null;
    go('share');
    try {
      state.shareBlob = await buildShareBlob();
      if (!state.shareBlob) throw new Error('no blob');
      state.shareUrl = URL.createObjectURL(state.shareBlob);
      if (state.screen === 'share') render();
    } catch (e) { alert('Chưa tạo được ảnh chia sẻ. Bạn có thể chụp màn hình kết quả nhé.'); }
  }

  function download() {
    const a = document.createElement('a'); a.href = state.shareUrl; a.download = '20-10-ket-qua.png'; a.click();
  }

  // ---------- events ----------
  $app.addEventListener('click', (e) => {
    const el = e.target.closest('[data-act]');
    if (!el || el.disabled) return;
    const act = el.dataset.act;
    if (act === 'answer') {
      if (state.busy) return;
      const q = state.order[state.current];
      state.answers[q.id] = +el.dataset.i;
      trackEvent('question_answered', { id: q.id, answer: +el.dataset.i });
      // Cập nhật tại chỗ, không dựng lại màn hình (tránh chạy lại animation và tải lại ảnh).
      $app.querySelectorAll('.option').forEach((o) => {
        const on = o === el;
        o.setAttribute('aria-pressed', on);
        o.querySelector('.mark').textContent = on ? '✓' : 'ABCD'[+o.dataset.i];
      });
      const next = $app.querySelector('[data-act="next"]');
      if (next) { next.disabled = false; next.focus({ preventScroll: true }); }
    }
    else if (act === 'next') {
      if (state.busy || state.answers[state.order[state.current].id] === undefined) return;
      state.current + 1 < state.order.length ? goQuiz(state.current + 1, el) : finishQuiz(el);
    }
    else if (act === 'back') { if (!state.busy && state.current > 0) goQuiz(state.current - 1, el); }
    else if (act === 'to-tarot' || act === 'again') dealTarot();
    else if (act === 'pick') pickCard(el.dataset.id);
    else if (act === 'to-final') showFinal();
    else if (act === 'love-ok') openLoveModal(el);
    else if (act === 'share') openShare();
    else if (act === 'download') download();
    else if (act === 'back-final') go('final-result');
    else if (act === 'restart') { trackEvent('restart_clicked'); state = fresh(); go('landing'); }
  });
  $app.addEventListener('submit', (e) => { e.preventDefault(); startQuiz(); });
  $app.addEventListener('input', (e) => {
    if (e.target.id !== 'pname') return;
    const b = $app.querySelector('.name-form .btn'); if (b) b.disabled = !e.target.value.trim();
  });

  function render() {
    const key = state.screen.startsWith('tarot') ? 'tarot' : state.screen;
    try { $app.innerHTML = views[key](); }
    catch (err) { console.error(err); $app.innerHTML = '<section class="screen card narrow center"><h2>Có chút trục trặc nhỏ</h2><p>Bạn thử tải lại trang nhé.</p><button class="btn" onclick="location.reload()">Tải lại</button></section>'; }
  }

  render();
  new Image().src = LOVE.popupImage;
  // Tải sẵn 2 câu đầu lúc người chơi còn đang nhập tên.
  Engine.interleave(QUIZ_QUESTIONS).slice(0, 2).forEach((q) => quizImgs(q).forEach(loadImg));
})();

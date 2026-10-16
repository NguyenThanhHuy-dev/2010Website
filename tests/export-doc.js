// node tests/export-doc.js  -> docs/personality-logic.md (tài liệu đọc, sinh từ data thật)
const fs = require('fs'), path = require('path');
const r = (f) => require(path.join(__dirname, '..', f));
['data/questions.js', 'data/personalities.js', 'data/tarot.js', 'data/messages.js'].forEach(r);
const Q = globalThis.QUIZ_QUESTIONS, P = globalThis.PERSONALITIES, M = globalThis.MESSAGES;
const DIMN = { EI: 'E (Kết nối) / I (Nội tâm)', SN: 'S (Thực tế) / N (Trực giác)', TF: 'T (Lý trí) / F (Cảm xúc)', JP: 'J (Định hướng) / P (Linh hoạt)' };
const sc = (s) => Object.entries(s).map(([k, v]) => `${k}+${v}`).join(', ');
let o = `# Logic tính cách 20/10 v2: câu hỏi, điểm, độ chắc chắn và kết quả\n\nFile này sinh tự động từ code (\`node tests/export-doc.js\`). **Sửa nội dung ở file nguồn**, không sửa file này.\n\n| Nội dung | Sửa ở đâu |\n|---|---|\n| Câu hỏi, đáp án, điểm | \`data/questions.js\` |\n| Thuật toán, % hai phía, mức nghiêng, độ chắc chắn | \`js/engine.js\` |\n| 16 kiểu tính cách | \`data/personalities.js\` |\n| Câu theo mức nghiêng, câu cân bằng, câu nối, lời chúc | \`data/messages.js\` |\n| Ghép tính cách + lá bài, cách hiển thị nhãn | \`js/compose.js\` |\n| Nội dung 20 lá Tarot | \`data/tarot.js\` |\n| Kiểm thử | \`tests/engine.test.js\` |\n\n## 1. Thuật toán v2\n\n1. Mỗi câu đo **đúng một cặp** (\`dimension\`). Đáp án nghiêng một phía: +2 phía đó, +0 phía kia. Đáp án **C trung tính**: +1 cho cả hai. Không chấm chéo.\n2. Mỗi cặp có ${Q.filter((q) => q.dimension === 'EI').length} câu. % = điểm chữ này / tổng điểm cặp. \`margin\` = |% trái - % phải|.\n3. **Mức nghiêng** theo margin: ≤8 Cân bằng; ≤20 Hơi nghiêng; ≤36 Khá rõ; >36 Rõ.\n4. **Độ chắc chắn** theo tỉ lệ câu chọn A/B (không phải C) trong cặp: ≥0.84 high; 0.67–0.83 medium; <0.67 low. Chỉ ảnh hưởng độ mạnh của câu mô tả, không đổi chữ thắng.\n5. **Hòa tuyệt đối**: chữ của cặp là \`X\`. Dùng câu **anchor** của cặp để tìm kiểu gần nhất; nếu anchor chọn C thì giữ X. Còn X thì \`nearestType = null\` và giao diện hiển thị hồ sơ 4 trục thay vì ép vào một kiểu. Không có chữ nào được ưu tiên mặc định.\n6. Tarot **không** cộng điểm và không đổi kết quả tính cách.\n7. Câu xếp xen kẽ 4 cặp; đáp án A/B được đảo trong dữ liệu để tránh thói quen bấm cùng vị trí. Đáp án C luôn ở cuối.\n\n### Cách hiển thị nhãn\n\n- 0 trục cân bằng: "Bạn là {tên kiểu}".\n- 1 trục cân bằng: "Kiểu gần nhất với bạn: {tên kiểu}" và nhắc rõ trục cân bằng.\n- 2+ trục cân bằng, hoặc không có kiểu gần nhất: ưu tiên 4 thanh tỉ lệ và đoạn mô tả theo trục.\n\n## 2. Câu hỏi và điểm\n\nSố câu mỗi cặp: ${['EI', 'SN', 'TF', 'JP'].map((d) => d + ' ' + Q.filter((q) => q.dimension === d).length).join(', ')}. Câu ghi **(anchor)** là câu hòa giải khi một cặp hòa tuyệt đối. Ảnh minh họa chỉ có cho đáp án nghiêng một phía (scene xem \`docs/image-prompts-quiz-v2.md\`).\n\n`;
for (const d of ['EI', 'SN', 'TF', 'JP']) {
  o += `### ${DIMN[d]}\n\n`;
  for (const q of Q.filter((x) => x.dimension === d)) {
    o += `**${q.id}**${q.anchor ? ' (anchor)' : ''}: ${q.text}\n\n`;
    q.answers.forEach((a, i) => { o += `- ${'ABC'[i]}. ${a.text}  →  \`${sc(a.scores)}\`\n`; });
    o += '\n';
  }
}
o += `## 3. Câu mô tả theo mức nghiêng\n\nMỗi chữ có ba mức (\`MESSAGES.levels\`, sinh từ \`MESSAGES.phrases\`):\n\n`;
for (const [k, v] of Object.entries(M.levels)) o += `- **${k}** (${M.dimLabels[k]})\n  - Hơi nghiêng: ${v.slight}\n  - Khá rõ: ${v.clear}\n  - Rõ: ${v.strong}\n`;
o += `\nCâu thêm khi nhiều lựa chọn trung tính: ${M.lowCertainty}\n\nCâu khi trục cân bằng (\`MESSAGES.balanced\`):\n\n`;
for (const [k, v] of Object.entries(M.balanced)) o += `- **${k}**: ${v}\n`;
o += `\n## 4. 16 kiểu tính cách\n\n`;
for (const p of Object.values(P)) {
  o += `### ${p.code}: ${p.title} (${p.en})\n\n- **Phụ đề:** ${p.subtitle}\n- **Điểm mạnh:** ${p.strengths.join('; ')}\n- **Mô tả:** ${p.description}\n- **Giao tiếp:** ${p.socialStyle}\n- **Công việc:** ${p.workStyle}\n- **Tình yêu:** ${p.loveStyle}\n- **Điểm mạnh ẩn:** ${p.hiddenStrength}\n- **Lời động viên:** ${p.encouragement}\n\n`;
}
o += `## 5. Cách ghép kết quả cuối\n\nKết quả cuối = tính cách + lá bài, ghép từ các mảnh (\`buildFinalResult\` trong \`js/compose.js\`), không viết sẵn 320 bài:\n\n- **Thông điệp:** mô tả tính cách + câu của lá bài (\`personalityMessage\`) + một câu nối.\n- **Điều tốt đẹp đang đến:** \`futureGeneral\` của lá bài.\n- **Tình yêu:** \`loveStyle\` của tính cách + \`loveMessage\` của lá bài.\n- **Công việc:** \`workStyle\` của tính cách + \`careerMessage\` của lá bài.\n- **Mục thứ ba:** một trong tài chính / phát triển bản thân / hạnh phúc, chọn theo trọng số của lá bài (\`weights\`).\n- **Lời nhắn 20/10:** lời động viên của tính cách + của lá bài + một lời chúc.\n- Câu nối và lời chúc chọn cố định theo (tính cách + lá bài), nên cùng cặp luôn ra cùng kết quả.\n\nCâu nối (\`{title}\`=tên tính cách, \`{strength}\`=điểm mạnh đầu, \`{kw}\`=từ khóa đầu của lá bài):\n\n`;
M.bridges.forEach((b) => (o += `- ${b}\n`));
o += `\nLời chúc cuối:\n\n`;
M.closings.forEach((b) => (o += `- ${b}\n`));
o += `\n## 6. Quy tắc viết (để sửa cho đúng giọng)\n\n- Dùng: "Bạn có xu hướng...", "Bạn thường...", "Có thể bạn sẽ nhận ra...", "Giai đoạn tới có thể mang tới...".\n- Tránh: "Bạn chắc chắn...", "Bạn sẽ...", "Số phận của bạn...". Test \`tests/engine.test.js\` sẽ báo lỗi nếu có các từ này.\n- Không có nội dung tiêu cực: bệnh tật, tai nạn, mất tiền, chia tay, thất nghiệp.\n- Hai phía đối lập (E/I, T/F...) đều viết theo hướng thế mạnh khác nhau.\n`;
fs.writeFileSync(path.join(__dirname, '..', 'docs', 'personality-logic.md'), o);
console.log('ok', o.length);

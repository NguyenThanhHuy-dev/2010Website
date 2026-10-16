// Mảnh ghép để compose kết quả + chuỗi UI dùng chung.
globalThis.MESSAGES = {
  disclaimer: 'Trải nghiệm này được tạo cho mục đích giải trí và truyền cảm hứng nhân dịp 20/10. Kết quả không phải đánh giá tâm lý hay dự đoán tương lai chính thức.',
  // Câu nối. {title} {strength} {kw}
  bridges: [
    'Khi {title} gặp lá bài này, điều nổi bật là sự kết hợp giữa {strength} và tinh thần {kw}.',
    'Có thể bạn nhận ra {strength} của mình đang cùng nhịp với thông điệp về {kw}.',
    'Với {strength} vốn có, bạn có thể thấy năng lượng {kw} của lá bài này khá gần với giai đoạn hiện tại.',
    'Sự gặp gỡ giữa {title} và {kw} gợi ra một góc nhìn đáng để bạn thử quan sát thêm.'
  ],
  closings: [
    'Nhân dịp 20/10, chúc bạn luôn được là phiên bản thoải mái nhất của chính mình.',
    'Hôm nay hãy tự tặng mình một lời khen thật lòng. Bạn xứng đáng với điều đó.',
    'Chúc bạn một ngày 20/10 đủ đầy, với những người và điều khiến bạn mỉm cười.',
    'Bạn không cần phải thay đổi để trở thành một phiên bản đáng yêu hơn. Hãy tiếp tục phát triển theo nhịp riêng của mình.'
  ],
  // Cụm mô tả từng chữ cái: n = dùng sau "nghiêng về", s = chủ ngữ cho câu mức "rõ".
  phrases: {
    E: { n: 'việc kết nối và trao đổi cùng mọi người', s: 'Xu hướng kết nối và trao đổi cùng mọi người' },
    I: { n: 'khoảng thời gian dành cho thế giới nội tâm', s: 'Xu hướng dành thời gian cho thế giới nội tâm' },
    S: { n: 'những điều cụ thể và thực tế', s: 'Xu hướng chú ý những điều cụ thể và thực tế' },
    N: { n: 'toàn cảnh và các khả năng phía trước', s: 'Xu hướng nhìn toàn cảnh và các khả năng phía trước' },
    T: { n: 'cách phân tích rõ ràng, mạch lạc', s: 'Xu hướng phân tích rõ ràng, mạch lạc' },
    F: { n: 'sự thấu cảm và những giá trị riêng', s: 'Xu hướng đặt sự thấu cảm và giá trị riêng lên trước' },
    J: { n: 'sự định hướng rõ ràng', s: 'Xu hướng thích có định hướng rõ ràng' },
    P: { n: 'sự linh hoạt và đón nhận điều bất ngờ', s: 'Xu hướng linh hoạt và đón nhận điều bất ngờ' }
  },
  // Câu theo mức nghiêng của từng trục (sinh từ phrases, ở cuối file).
  levels: {},
  levelLabels: { balanced: 'Cân bằng', slight: 'Hơi nghiêng', clear: 'Khá rõ', strong: 'Rõ' },
  // Thêm vào khi trục có nhiều lựa chọn "tùy tình huống" (certainty thấp).
  lowCertainty: 'Câu trả lời ở trục này có khá nhiều lựa chọn trung tính, nên hãy xem đây là xu hướng nhẹ.',
  // Dùng khi hai phía lệch tối đa 8%
  balanced: {
    EI: 'Bạn khá cân bằng giữa việc kết nối với mọi người và khoảng thời gian dành cho riêng mình, tùy tình huống.',
    SN: 'Bạn không nghiêng rõ về một phía giữa chi tiết thực tế và các khả năng phía trước, tùy từng hoàn cảnh.',
    TF: 'Bạn cân bằng giữa phân tích rõ ràng và lắng nghe cảm xúc, tùy vào điều mỗi hoàn cảnh cần.',
    JP: 'Bạn linh hoạt giữa việc có định hướng và để dành chỗ cho bất ngờ, không nghiêng rõ về một phía.'
  },
  // Nhãn hiển thị thanh dimension (không dùng thuật ngữ MBTI)
  dimLabels: {
    E: 'Kết nối', I: 'Nội tâm', S: 'Thực tế', N: 'Trực giác',
    T: 'Lý trí', F: 'Cảm xúc', J: 'Định hướng', P: 'Linh hoạt'
  },
  groupLabels: { love: 'Tình yêu', career: 'Công việc', money: 'Tài chính', growth: 'Phát triển bản thân', happiness: 'Hạnh phúc' }
};

// Bật true khi đã có ảnh minh họa đáp án trong images/quiz/<qid>-<index>.jpg (xem docs/image-prompts-quiz-v2.md).
globalThis.SITE = { brand: 'HerJourney', quizImages: true };

// Sinh câu theo mức nghiêng từ phrases: slight / clear / strong cho từng chữ cái.
Object.entries(globalThis.MESSAGES.phrases).forEach(([k, p]) => {
  globalThis.MESSAGES.levels[k] = {
    slight: `Bạn có xu hướng hơi nghiêng về ${p.n}.`,
    clear: `Bạn thường nghiêng về ${p.n}.`,
    strong: `${p.s} thể hiện khá rõ trong câu trả lời của bạn.`
  };
});

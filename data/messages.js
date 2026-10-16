// Mảnh ghép để compose kết quả + chuỗi UI dùng chung.
globalThis.MESSAGES = {
  disclaimer: 'Trải nghiệm này được tạo cho mục đích giải trí và truyền cảm hứng nhân dịp 20/10. Kết quả không phải đánh giá tâm lý hay dự đoán tương lai chính thức.',
  // Câu nối. {title} {strength} {kw}
  bridges: [
    'Khi {title} gặp lá bài này, điều nổi bật là sự kết hợp giữa {strength} và tinh thần {kw}.',
    'Có thể bạn nhận ra {strength} của mình đang cùng nhịp với thông điệp về {kw}.',
    'Với {strength} vốn có, bạn rất phù hợp để đón nhận năng lượng {kw} mà lá bài mang tới.',
    'Sự gặp gỡ giữa {title} và {kw} gợi ý rằng bạn đã sẵn sàng cho một bước đi nhẹ nhàng mà đầy ý nghĩa.'
  ],
  closings: [
    'Nhân dịp 20/10, chúc bạn luôn được là phiên bản thoải mái nhất của chính mình.',
    'Hôm nay hãy tự tặng mình một lời khen thật lòng. Bạn xứng đáng với điều đó.',
    'Chúc bạn một ngày 20/10 đủ đầy, với những người và điều khiến bạn mỉm cười.',
    'Bạn không cần phải thay đổi để trở thành một phiên bản đáng yêu hơn. Hãy tiếp tục phát triển theo nhịp riêng của mình.'
  ],
  // Cụm tích cực cho mỗi chữ cái
  lean: {
    E: 'kết nối và trao đổi cùng mọi người', I: 'dành thời gian cho thế giới nội tâm',
    S: 'chú ý những điều cụ thể, thực tế', N: 'nhìn toàn cảnh và các khả năng',
    T: 'phân tích rõ ràng, mạch lạc', F: 'thấu cảm và sống theo giá trị riêng',
    J: 'cảm thấy thoải mái khi có định hướng rõ ràng', P: 'linh hoạt, đón nhận điều bất ngờ'
  },
  // Dùng khi hai phía chênh dưới 10%
  balanced: {
    EI: 'Bạn khá cân bằng giữa việc kết nối với mọi người và khoảng thời gian dành cho riêng mình.',
    SN: 'Bạn có cả hai xu hướng: chú ý chi tiết thực tế và nhìn về các khả năng phía trước, tùy tình huống.',
    TF: 'Bạn cân bằng giữa phân tích rõ ràng và lắng nghe cảm xúc, tùy vào điều mỗi hoàn cảnh cần.',
    JP: 'Bạn linh hoạt giữa việc có định hướng và để dành chỗ cho bất ngờ, tùy theo từng lúc.'
  },
  // Nhãn hiển thị thanh dimension (không dùng thuật ngữ MBTI)
  dimLabels: {
    E: 'Kết nối', I: 'Nội tâm', S: 'Thực tế', N: 'Trực giác',
    T: 'Lý trí', F: 'Cảm xúc', J: 'Định hướng', P: 'Linh hoạt'
  },
  groupLabels: { love: 'Tình yêu', career: 'Công việc', money: 'Tài chính', growth: 'Phát triển bản thân', happiness: 'Hạnh phúc' }
};

// Bật true khi đã có ảnh minh họa đáp án trong images/quiz/<qid>-<index>.jpg (xem docs/image-prompts.md).
globalThis.SITE = { brand: 'HerJourney', quizImages: true };

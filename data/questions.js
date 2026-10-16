// Nội dung câu hỏi. Mỗi đáp án: scores = điểm cho một hay nhiều chiều (E/I, S/N, T/F, J/P).
// weight: trọng số câu hỏi (mặc định 1). key: câu quyết định khi hai phía hòa điểm.
globalThis.QUIZ_QUESTIONS = [
  // E / I
  { id: 'q1', dim: 'EI', text: 'Sau một tuần bận rộn, bạn muốn:', answers: [
    { text: 'Đi đâu đó cùng bạn bè.', scores: { E: 1 } },
    { text: 'Ở một nơi yên tĩnh, dành thời gian cho bản thân.', scores: { I: 1 } } ] },
  { id: 'q2', dim: 'EI', text: 'Trong một buổi tiệc có nhiều người lạ:', answers: [
    { text: 'Bạn quan sát trước và trò chuyện với vài người hợp vibe.', scores: { I: 1 } },
    { text: 'Bạn thường chủ động bắt chuyện.', scores: { E: 1 } } ] },
  { id: 'q3', dim: 'EI', key: true, text: 'Khi có một ý tưởng mới:', answers: [
    { text: 'Bạn thích nói ra để cùng người khác phát triển nó.', scores: { E: 1 } },
    { text: 'Bạn thích nghĩ kỹ trong đầu trước.', scores: { I: 1 } } ] },
  { id: 'q4', dim: 'EI', text: 'Cách nạp lại năng lượng của bạn là:', answers: [
    { text: 'Một cuộc trò chuyện dài, sâu với một người thân thiết.', scores: { I: 1, F: 0.5 } },
    { text: 'Một chuyến đi chơi rộn ràng cùng cả nhóm.', scores: { E: 1, P: 0.5 } } ] },
  // S / N
  { id: 'q5', dim: 'SN', text: 'Khi bắt đầu một công việc mới:', answers: [
    { text: 'Tôi muốn biết chính xác phải làm gì trước.', scores: { S: 1 } },
    { text: 'Tôi thường nghĩ tới toàn cảnh và các khả năng có thể xảy ra.', scores: { N: 1 } } ] },
  { id: 'q6', dim: 'SN', text: 'Bạn dễ nhớ nhất:', answers: [
    { text: 'Cảm giác, ý nghĩa và điều bạn liên tưởng từ một khoảnh khắc.', scores: { N: 1 } },
    { text: 'Những chi tiết đã thực sự xảy ra.', scores: { S: 1 } } ] },
  { id: 'q7', dim: 'SN', key: true, text: 'Khi học một điều mới, bạn thích:', answers: [
    { text: 'Thử làm theo một ví dụ cụ thể.', scores: { S: 1, J: 0.5 } },
    { text: 'Hiểu ý tưởng đằng sau nó trước.', scores: { N: 1 } } ] },
  { id: 'q8', dim: 'SN', text: 'Một bộ phim bạn dễ yêu thích là:', answers: [
    { text: 'Câu chuyện gần gũi, chân thực như đời thường.', scores: { S: 1 } },
    { text: 'Thế giới giàu biểu tượng, nhiều tầng ý nghĩa.', scores: { N: 1, P: 0.5 } } ] },
  // T / F
  { id: 'q9', dim: 'TF', text: 'Khi bạn bè gặp vấn đề:', answers: [
    { text: 'Trước tiên bạn quan tâm họ đang cảm thấy thế nào.', scores: { F: 1 } },
    { text: 'Bạn giúp họ phân tích cách giải quyết.', scores: { T: 1 } } ] },
  { id: 'q10', dim: 'TF', text: 'Khi đưa ra một quyết định quan trọng:', answers: [
    { text: 'Bạn cân nhắc ưu và nhược điểm một cách rõ ràng.', scores: { T: 1 } },
    { text: 'Bạn lắng nghe điều gì đúng với giá trị của mình.', scores: { F: 1 } } ] },
  { id: 'q11', dim: 'TF', key: true, text: 'Khi góp ý cho ai đó, bạn thường:', answers: [
    { text: 'Nói thẳng và rõ ràng để họ tiến bộ nhanh hơn.', scores: { T: 1 } },
    { text: 'Chọn cách nói nhẹ nhàng để họ thấy mình được ủng hộ.', scores: { F: 1 } } ] },
  { id: 'q12', dim: 'TF', text: 'Điều khiến bạn tự hào hơn:', answers: [
    { text: 'Khiến ai đó cảm thấy được thấu hiểu.', scores: { F: 1 } },
    { text: 'Giải quyết gọn gàng một vấn đề khó.', scores: { T: 1 } } ] },
  // J / P
  { id: 'q13', dim: 'JP', text: 'Khi đi du lịch:', answers: [
    { text: 'Tôi thích biết trước lịch trình cơ bản.', scores: { J: 1 } },
    { text: 'Tôi thích để dành không gian cho những điều bất ngờ.', scores: { P: 1 } } ] },
  { id: 'q14', dim: 'JP', text: 'Một ngày cuối tuần lý tưởng:', answers: [
    { text: 'Xem tâm trạng rồi quyết định làm gì.', scores: { P: 1 } },
    { text: 'Có vài việc đã dự định sẵn để cảm thấy trọn vẹn.', scores: { J: 1 } } ] },
  { id: 'q15', dim: 'JP', key: true, text: 'Khi có một hạn chót đang đến gần:', answers: [
    { text: 'Làm từng bước đều đặn để thấy yên tâm.', scores: { J: 1 } },
    { text: 'Dồn năng lượng vào lúc cảm hứng bùng lên.', scores: { P: 1, N: 0.5 } } ] },
  { id: 'q16', dim: 'JP', text: 'Khi kế hoạch thay đổi đột ngột:', answers: [
    { text: 'Bạn thấy thú vị và xem thử điều gì đang mở ra.', scores: { P: 1 } },
    { text: 'Bạn sắp xếp lại nhanh để giữ nhịp cho mọi người.', scores: { J: 1 } } ] }
];

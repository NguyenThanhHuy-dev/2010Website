// Bộ câu hỏi v2. Sinh bởi tests/tools/gen-questions.py (hoặc sửa tay trực tiếp file này).
// Mỗi câu đo ĐÚNG MỘT cặp (dimension). Đáp án nghiêng 1 phía: +2 phía đó, +0 phía kia. Đáp án trung tính (neutral): +1 cho cả hai.
// anchor: true = câu dùng để hòa giải khi một trục hòa tuyệt đối. scene = prompt ảnh minh họa (docs/image-prompts-quiz-v2.md).
// Thứ tự đáp án trong mảng = thứ tự hiển thị; điểm đi cùng nội dung đáp án nên đảo A/B thoải mái. Đáp án neutral luôn đặt cuối.
globalThis.QUIZ_QUESTIONS = [
  { id: 'q1', dimension: 'EI', anchor: true, text: "Sau một tuần bận rộn, cách nào giúp bạn hồi lại năng lượng tự nhiên hơn?", answers: [
      { text: "Gặp gỡ hoặc làm gì đó cùng người khác.", scores: { E: 2, I: 0 }, scene: "friends gathered at a candle-lit dinner table under string lights, laughing" },
      { text: "Có khoảng thời gian riêng, ít tương tác.", scores: { I: 2, E: 0 }, scene: "woman reading alone by a sunny window with a cup of tea" },
      { text: "Tùy tuần; hai cách gần như ngang nhau.", scores: { E: 1, I: 1 }, neutral: true } ] },
  { id: 'q2', dimension: 'EI', text: "Khi bước vào một nhóm mà bạn chưa quen nhiều người:", answers: [
      { text: "Tôi thường quan sát trước, rồi mới tham gia khi thấy phù hợp.", scores: { I: 2, E: 0 }, scene: "woman quietly observing a party from a corner, chatting with just two friends" },
      { text: "Tôi khá tự nhiên trong việc mở lời và tạo cuộc trò chuyện.", scores: { E: 2, I: 0 }, scene: "woman confidently greeting new people at a lively party with a glass in hand" },
      { text: "Tùy nhóm và hoàn cảnh.", scores: { E: 1, I: 1 }, neutral: true } ] },
  { id: 'q3', dimension: 'EI', text: "Khi một ý tưởng mới vừa xuất hiện:", answers: [
      { text: "Nói ra với ai đó thường giúp tôi nghĩ rõ hơn.", scores: { E: 2, I: 0 }, scene: "woman sharing an idea excitedly with friends around a cafe table, sticky notes" },
      { text: "Tôi muốn tự sắp xếp suy nghĩ trước rồi mới chia sẻ.", scores: { I: 2, E: 0 }, scene: "woman thinking quietly with a notebook by a window" },
      { text: "Tôi dùng cả hai cách gần như ngang nhau.", scores: { E: 1, I: 1 }, neutral: true } ] },
  { id: 'q4', dimension: 'EI', text: "Nếu có vài giờ hoàn toàn rảnh và không có nghĩa vụ gì:", answers: [
      { text: "Tôi thường tận hưởng hoạt động một mình trước.", scores: { I: 2, E: 0 }, scene: "woman enjoying a solo hobby, painting or walking alone in a quiet park" },
      { text: "Tôi dễ muốn tìm ai đó để cùng đi đâu hoặc làm gì.", scores: { E: 2, I: 0 }, scene: "woman texting friends on her phone, smiling, planning an outing together" },
      { text: "Tôi không nghiêng rõ về bên nào.", scores: { E: 1, I: 1 }, neutral: true } ] },
  { id: 'q5', dimension: 'EI', text: "Sau một buổi tương tác xã hội kéo dài:", answers: [
      { text: "Tôi thường vẫn thấy có năng lượng và muốn tiếp tục kết nối.", scores: { E: 2, I: 0 }, scene: "woman still glowing and chatting happily with friends at the end of a party night" },
      { text: "Tôi thường cần một khoảng yên tĩnh để hồi lại năng lượng.", scores: { I: 2, E: 0 }, scene: "woman alone on a quiet balcony at night with tea, calm and relaxed" },
      { text: "Tùy người và không khí của buổi gặp.", scores: { E: 1, I: 1 }, neutral: true } ] },
  { id: 'q6', dimension: 'EI', text: "Khi gặp một vấn đề khó và chưa biết bắt đầu từ đâu:", answers: [
      { text: "Tôi thường suy nghĩ một mình trước rồi mới hỏi ý kiến.", scores: { I: 2, E: 0 }, scene: "woman thinking alone at a desk with a notebook, focused on a tricky problem" },
      { text: "Tôi thường trao đổi với người khác để hình thành suy nghĩ.", scores: { E: 2, I: 0 }, scene: "woman discussing a problem with colleagues around a whiteboard" },
      { text: "Hai cách đều tự nhiên với tôi.", scores: { E: 1, I: 1 }, neutral: true } ] },
  { id: 'q7', dimension: 'SN', anchor: true, text: "Khi học một thứ hoàn toàn mới, điều gì giúp bạn bắt nhịp nhanh hơn?", answers: [
      { text: "Ví dụ cụ thể và hướng dẫn từng bước.", scores: { S: 2, N: 0 }, scene: "woman following a recipe step by step in a bright kitchen" },
      { text: "Hiểu nguyên lý, mô hình hoặc ý tưởng đằng sau.", scores: { N: 2, S: 0 }, scene: "woman sketching a concept diagram on paper, thoughtful" },
      { text: "Tôi cần cả hai gần như ngang nhau.", scores: { S: 1, N: 1 }, neutral: true } ] },
  { id: 'q8', dimension: 'SN', text: "Khi nhớ lại một sự việc đã xảy ra:", answers: [
      { text: "Tôi thường nhớ ý nghĩa, ấn tượng hoặc điều mình liên tưởng từ nó.", scores: { N: 2, S: 0 }, scene: "woman smiling softly, remembering a feeling, dreamy golden light and floating petals" },
      { text: "Tôi thường nhớ khá rõ chi tiết, diễn biến hoặc điều đã được nói.", scores: { S: 2, N: 0 }, scene: "woman flipping through a detailed photo album with dates and notes" },
      { text: "Hai kiểu nhớ xuất hiện tương đương.", scores: { S: 1, N: 1 }, neutral: true } ] },
  { id: 'q9', dimension: 'SN', text: "Khi bắt đầu một dự án:", answers: [
      { text: "Tôi muốn biết các điều kiện thực tế và việc nào làm được ngay.", scores: { S: 2, N: 0 }, scene: "woman reviewing a clear checklist on a tidy desk" },
      { text: "Tôi dễ nghĩ đến các khả năng mới và hướng có thể phát triển.", scores: { N: 2, S: 0 }, scene: "woman looking at a big mind map wall full of ideas" },
      { text: "Tôi thường cân nhắc hai phía cùng lúc.", scores: { S: 1, N: 1 }, neutral: true } ] },
  { id: 'q10', dimension: 'SN', text: "Cuộc trò chuyện nào thường giữ sự chú ý của bạn lâu hơn?", answers: [
      { text: "Những ý tưởng, giả thuyết, biểu tượng hoặc câu hỏi “nếu như…”.", scores: { N: 2, S: 0 }, scene: "friends in an animated discussion of big what-if ideas, with sketches and glowing symbols" },
      { text: "Những trải nghiệm cụ thể, điều đang xảy ra hoặc cách làm thực tế.", scores: { S: 2, N: 0 }, scene: "woman sharing hands-on practical experience with friends, demonstrating a craft at a table" },
      { text: "Tôi thích cả hai gần như ngang nhau.", scores: { S: 1, N: 1 }, neutral: true } ] },
  { id: 'q11', dimension: 'SN', text: "Khi quan sát một nơi mới:", answers: [
      { text: "Tôi dễ để ý các chi tiết cụ thể: bố cục, vật dụng, âm thanh, màu sắc.", scores: { S: 2, N: 0 }, scene: "woman noticing small details in a new cafe: cups, colors, decorations" },
      { text: "Tôi dễ để ý cảm giác tổng thể, ý nghĩa hoặc những liên hệ gợi ra.", scores: { N: 2, S: 0 }, scene: "woman standing in a new place absorbing the overall atmosphere, dreamy mood" },
      { text: "Tôi nhận thấy cả hai kiểu thông tin tương đương.", scores: { S: 1, N: 1 }, neutral: true } ] },
  { id: 'q12', dimension: 'SN', text: "Khi cần nghĩ cách cải thiện một việc quen thuộc:", answers: [
      { text: "Tôi thường hình dung một cách làm khác hẳn hoặc một khả năng mới.", scores: { N: 2, S: 0 }, scene: "woman imagining a completely new layout, sketching a bold redesign on a big sheet" },
      { text: "Tôi thường bắt đầu từ những gì đang hoạt động và chỉnh từng điểm cụ thể.", scores: { S: 2, N: 0 }, scene: "woman fine-tuning one small detail on a tidy working setup, adjusting items on a shelf" },
      { text: "Tôi dùng cả hai cách tùy bài toán.", scores: { S: 1, N: 1 }, neutral: true } ] },
  { id: 'q13', dimension: 'TF', anchor: true, text: "Khi phải đưa ra một quyết định khó ảnh hưởng đến nhiều người, bạn ưu tiên điều gì trước?", answers: [
      { text: "Tiêu chí nhất quán, hợp lý và có thể giải thích rõ.", scores: { T: 2, F: 0 }, scene: "woman writing a pros and cons list on paper" },
      { text: "Tác động lên từng người và điều phù hợp với các giá trị quan trọng.", scores: { F: 2, T: 0 }, scene: "woman with a hand on her heart, eyes closed, calm at sunset" },
      { text: "Tôi cân nhắc hai phía gần như ngang nhau.", scores: { T: 1, F: 1 }, neutral: true } ] },
  { id: 'q14', dimension: 'TF', text: "Khi một người thân kể về vấn đề của họ:", answers: [
      { text: "Phản xạ đầu tiên của tôi thường là hiểu cảm xúc và điều họ đang cần.", scores: { F: 2, T: 0 }, scene: "woman hugging a friend and listening warmly" },
      { text: "Phản xạ đầu tiên của tôi thường là tìm cách phân tích nguyên nhân hoặc giải pháp.", scores: { T: 2, F: 0 }, scene: "woman sketching a plan with a friend on paper, solving a problem together" },
      { text: "Tôi thường làm cả hai gần như cùng lúc.", scores: { T: 1, F: 1 }, neutral: true } ] },
  { id: 'q15', dimension: 'TF', text: "Khi góp ý một lỗi có thể ảnh hưởng đến kết quả chung:", answers: [
      { text: "Tôi ưu tiên nói rõ vấn đề và điều cần sửa, dù cách nói có thể hơi thẳng.", scores: { T: 2, F: 0 }, scene: "woman giving direct, clear feedback in a meeting, friendly but straightforward" },
      { text: "Tôi ưu tiên cách nói để người nghe vẫn cảm thấy được tôn trọng và có động lực sửa.", scores: { F: 2, T: 0 }, scene: "woman encouraging a colleague with a gentle smile" },
      { text: "Tôi cân bằng hai ưu tiên này khá ngang nhau.", scores: { T: 1, F: 1 }, neutral: true } ] },
  { id: 'q16', dimension: 'TF', text: "Khi hai phương án đều có ưu điểm:", answers: [
      { text: "Tôi dễ nghiêng về phương án phù hợp hơn với con người và giá trị mà tôi coi trọng.", scores: { F: 2, T: 0 }, scene: "woman choosing the option that fits people best, discussing warmly with her team" },
      { text: "Tôi dễ nghiêng về phương án có logic, tiêu chí và hiệu quả thuyết phục hơn.", scores: { T: 2, F: 0 }, scene: "woman comparing two options with charts on a laptop, analytical" },
      { text: "Tôi thường cần cả hai đạt mức chấp nhận được.", scores: { T: 1, F: 1 }, neutral: true } ] },
  { id: 'q17', dimension: 'TF', text: "Trong một cuộc tranh luận, điều nào khiến bạn dễ đổi ý hơn?", answers: [
      { text: "Một lập luận chặt chẽ hoặc bằng chứng tốt hơn.", scores: { T: 2, F: 0 }, scene: "woman reviewing evidence and nodding at a clear argument in a meeting" },
      { text: "Một góc nhìn giúp tôi hiểu sâu hơn trải nghiệm và giá trị của người liên quan.", scores: { F: 2, T: 0 }, scene: "woman listening empathetically to someone sharing a personal story" },
      { text: "Tùy chủ đề; hai loại lý do đều có sức nặng.", scores: { T: 1, F: 1 }, neutral: true } ] },
  { id: 'q18', dimension: 'TF', text: "Khi đánh giá một ý tưởng, câu hỏi nào thường đến trước hơn?", answers: [
      { text: "“Nó có phù hợp với con người và điều mình coi trọng không?”", scores: { F: 2, T: 0 }, scene: "woman looking at an idea with a caring, thoughtful expression, people in the background" },
      { text: "“Nó có hợp lý và hoạt động tốt không?”", scores: { T: 2, F: 0 }, scene: "woman testing a prototype on a desk, checking whether it works" },
      { text: "Hai câu hỏi thường xuất hiện gần như cùng lúc.", scores: { T: 1, F: 1 }, neutral: true } ] },
  { id: 'q19', dimension: 'JP', anchor: true, text: "Khi đi du lịch, kiểu chuẩn bị nào khiến bạn thoải mái hơn?", answers: [
      { text: "Có lịch trình và các mốc chính được chốt trước.", scores: { J: 2, P: 0 }, scene: "woman planning a trip with a printed itinerary and a map" },
      { text: "Chỉ chốt phần cần thiết, còn lại quyết định theo tình hình.", scores: { P: 2, J: 0 }, scene: "woman wandering a charming street with a backpack, no fixed plan" },
      { text: "Tôi thích mức chuẩn bị ở giữa hai cách này.", scores: { J: 1, P: 1 }, neutral: true } ] },
  { id: 'q20', dimension: 'JP', text: "Với một hạn chót còn khá xa:", answers: [
      { text: "Tôi thường để không gian linh hoạt rồi tăng tốc khi gần hạn hoặc có cảm hứng.", scores: { P: 2, J: 0 }, scene: "woman in a burst of inspired creative work at night, lamp light" },
      { text: "Tôi thường muốn bắt đầu sớm và chia việc thành các bước.", scores: { J: 2, P: 0 }, scene: "woman working steadily with a calendar and checkmarks" },
      { text: "Tùy loại việc; không nghiêng rõ về bên nào.", scores: { J: 1, P: 1 }, neutral: true } ] },
  { id: 'q21', dimension: 'JP', text: "Khi kế hoạch trong ngày thay đổi bất ngờ:", answers: [
      { text: "Tôi thường nhanh chóng sắp xếp lại một kế hoạch mới để giữ nhịp.", scores: { J: 2, P: 0 }, scene: "woman quickly reorganizing a schedule on a tablet, calm" },
      { text: "Tôi thường ứng biến theo tình hình và xem điều gì thuận tiện nhất lúc đó.", scores: { P: 2, J: 0 }, scene: "woman curious and smiling as plans change, looking at a new path" },
      { text: "Cả hai cách đều khá tự nhiên với tôi.", scores: { J: 1, P: 1 }, neutral: true } ] },
  { id: 'q22', dimension: 'JP', text: "Khi có nhiều việc đang mở cùng lúc:", answers: [
      { text: "Tôi thấy tự nhiên khi giữ nhiều lựa chọn mở và chuyển qua lại giữa chúng.", scores: { P: 2, J: 0 }, scene: "woman switching between several open projects with notes and multiple screens" },
      { text: "Tôi thấy dễ chịu hơn khi lần lượt chốt xong từng việc.", scores: { J: 2, P: 0 }, scene: "woman ticking off one finished task on a list at a tidy clear desk" },
      { text: "Tôi ở khoảng giữa hai cách này.", scores: { J: 1, P: 1 }, neutral: true } ] },
  { id: 'q23', dimension: 'JP', text: "Một ngày cuối tuần lý tưởng với bạn thường là:", answers: [
      { text: "Có vài việc hoặc mốc đã định trước để ngày trôi có nhịp.", scores: { J: 2, P: 0 }, scene: "woman with a weekend planner and a few planned activities" },
      { text: "Để phần lớn thời gian mở rồi xem lúc đó muốn làm gì.", scores: { P: 2, J: 0 }, scene: "woman lounging at home, relaxed and undecided, sunlight" },
      { text: "Có một chút kế hoạch và một chút ngẫu hứng.", scores: { J: 1, P: 1 }, neutral: true } ] },
  { id: 'q24', dimension: 'JP', text: "Khi đứng trước một quyết định chưa cần chốt ngay:", answers: [
      { text: "Tôi thường thích giữ thêm lựa chọn mở cho đến khi có thêm thông tin.", scores: { P: 2, J: 0 }, scene: "woman browsing many options and comparing swatches, relaxed and curious" },
      { text: "Tôi thường thấy nhẹ đầu hơn khi sớm thu hẹp lựa chọn và quyết định.", scores: { J: 2, P: 0 }, scene: "woman confidently circling one option and closing her laptop, relieved" },
      { text: "Tùy mức quan trọng của quyết định.", scores: { J: 1, P: 1 }, neutral: true } ] }
];

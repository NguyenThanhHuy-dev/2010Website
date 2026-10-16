# Logic tính cách 20/10 v2: câu hỏi, điểm, độ chắc chắn và kết quả

File này sinh tự động từ code (`node tests/export-doc.js`). **Sửa nội dung ở file nguồn**, không sửa file này.

| Nội dung | Sửa ở đâu |
|---|---|
| Câu hỏi, đáp án, điểm | `data/questions.js` |
| Thuật toán, % hai phía, mức nghiêng, độ chắc chắn | `js/engine.js` |
| 16 kiểu tính cách | `data/personalities.js` |
| Câu theo mức nghiêng, câu cân bằng, câu nối, lời chúc | `data/messages.js` |
| Ghép tính cách + lá bài, cách hiển thị nhãn | `js/compose.js` |
| Nội dung 20 lá Tarot | `data/tarot.js` |
| Kiểm thử | `tests/engine.test.js` |

## 1. Thuật toán v2

1. Mỗi câu đo **đúng một cặp** (`dimension`). Đáp án nghiêng một phía: +2 phía đó, +0 phía kia. Đáp án **C trung tính**: +1 cho cả hai. Không chấm chéo.
2. Mỗi cặp có 6 câu. % = điểm chữ này / tổng điểm cặp. `margin` = |% trái - % phải|.
3. **Mức nghiêng** theo margin: ≤8 Cân bằng; ≤20 Hơi nghiêng; ≤36 Khá rõ; >36 Rõ.
4. **Độ chắc chắn** theo tỉ lệ câu chọn A/B (không phải C) trong cặp: ≥0.84 high; 0.67–0.83 medium; <0.67 low. Chỉ ảnh hưởng độ mạnh của câu mô tả, không đổi chữ thắng.
5. **Hòa tuyệt đối**: chữ của cặp là `X`. Dùng câu **anchor** của cặp để tìm kiểu gần nhất; nếu anchor chọn C thì giữ X. Còn X thì `nearestType = null` và giao diện hiển thị hồ sơ 4 trục thay vì ép vào một kiểu. Không có chữ nào được ưu tiên mặc định.
6. Tarot **không** cộng điểm và không đổi kết quả tính cách.
7. Câu xếp xen kẽ 4 cặp; đáp án A/B được đảo trong dữ liệu để tránh thói quen bấm cùng vị trí. Đáp án C luôn ở cuối.

### Cách hiển thị nhãn

- 0 trục cân bằng: "Bạn là {tên kiểu}".
- 1 trục cân bằng: "Kiểu gần nhất với bạn: {tên kiểu}" và nhắc rõ trục cân bằng.
- 2+ trục cân bằng, hoặc không có kiểu gần nhất: ưu tiên 4 thanh tỉ lệ và đoạn mô tả theo trục.

## 2. Câu hỏi và điểm

Số câu mỗi cặp: EI 6, SN 6, TF 6, JP 6. Câu ghi **(anchor)** là câu hòa giải khi một cặp hòa tuyệt đối. Ảnh minh họa chỉ có cho đáp án nghiêng một phía (scene xem `docs/image-prompts-quiz-v2.md`).

### E (Kết nối) / I (Nội tâm)

**q1** (anchor): Sau một tuần bận rộn, cách nào giúp bạn hồi lại năng lượng tự nhiên hơn?

- A. Gặp gỡ hoặc làm gì đó cùng người khác.  →  `E+2, I+0`
- B. Có khoảng thời gian riêng, ít tương tác.  →  `I+2, E+0`
- C. Tùy tuần; hai cách gần như ngang nhau.  →  `E+1, I+1`

**q2**: Khi bước vào một nhóm mà bạn chưa quen nhiều người:

- A. Tôi thường quan sát trước, rồi mới tham gia khi thấy phù hợp.  →  `I+2, E+0`
- B. Tôi khá tự nhiên trong việc mở lời và tạo cuộc trò chuyện.  →  `E+2, I+0`
- C. Tùy nhóm và hoàn cảnh.  →  `E+1, I+1`

**q3**: Khi một ý tưởng mới vừa xuất hiện:

- A. Nói ra với ai đó thường giúp tôi nghĩ rõ hơn.  →  `E+2, I+0`
- B. Tôi muốn tự sắp xếp suy nghĩ trước rồi mới chia sẻ.  →  `I+2, E+0`
- C. Tôi dùng cả hai cách gần như ngang nhau.  →  `E+1, I+1`

**q4**: Nếu có vài giờ hoàn toàn rảnh và không có nghĩa vụ gì:

- A. Tôi thường tận hưởng hoạt động một mình trước.  →  `I+2, E+0`
- B. Tôi dễ muốn tìm ai đó để cùng đi đâu hoặc làm gì.  →  `E+2, I+0`
- C. Tôi không nghiêng rõ về bên nào.  →  `E+1, I+1`

**q5**: Sau một buổi tương tác xã hội kéo dài:

- A. Tôi thường vẫn thấy có năng lượng và muốn tiếp tục kết nối.  →  `E+2, I+0`
- B. Tôi thường cần một khoảng yên tĩnh để hồi lại năng lượng.  →  `I+2, E+0`
- C. Tùy người và không khí của buổi gặp.  →  `E+1, I+1`

**q6**: Khi gặp một vấn đề khó và chưa biết bắt đầu từ đâu:

- A. Tôi thường suy nghĩ một mình trước rồi mới hỏi ý kiến.  →  `I+2, E+0`
- B. Tôi thường trao đổi với người khác để hình thành suy nghĩ.  →  `E+2, I+0`
- C. Hai cách đều tự nhiên với tôi.  →  `E+1, I+1`

### S (Thực tế) / N (Trực giác)

**q7** (anchor): Khi học một thứ hoàn toàn mới, điều gì giúp bạn bắt nhịp nhanh hơn?

- A. Ví dụ cụ thể và hướng dẫn từng bước.  →  `S+2, N+0`
- B. Hiểu nguyên lý, mô hình hoặc ý tưởng đằng sau.  →  `N+2, S+0`
- C. Tôi cần cả hai gần như ngang nhau.  →  `S+1, N+1`

**q8**: Khi nhớ lại một sự việc đã xảy ra:

- A. Tôi thường nhớ ý nghĩa, ấn tượng hoặc điều mình liên tưởng từ nó.  →  `N+2, S+0`
- B. Tôi thường nhớ khá rõ chi tiết, diễn biến hoặc điều đã được nói.  →  `S+2, N+0`
- C. Hai kiểu nhớ xuất hiện tương đương.  →  `S+1, N+1`

**q9**: Khi bắt đầu một dự án:

- A. Tôi muốn biết các điều kiện thực tế và việc nào làm được ngay.  →  `S+2, N+0`
- B. Tôi dễ nghĩ đến các khả năng mới và hướng có thể phát triển.  →  `N+2, S+0`
- C. Tôi thường cân nhắc hai phía cùng lúc.  →  `S+1, N+1`

**q10**: Cuộc trò chuyện nào thường giữ sự chú ý của bạn lâu hơn?

- A. Những ý tưởng, giả thuyết, biểu tượng hoặc câu hỏi “nếu như…”.  →  `N+2, S+0`
- B. Những trải nghiệm cụ thể, điều đang xảy ra hoặc cách làm thực tế.  →  `S+2, N+0`
- C. Tôi thích cả hai gần như ngang nhau.  →  `S+1, N+1`

**q11**: Khi quan sát một nơi mới:

- A. Tôi dễ để ý các chi tiết cụ thể: bố cục, vật dụng, âm thanh, màu sắc.  →  `S+2, N+0`
- B. Tôi dễ để ý cảm giác tổng thể, ý nghĩa hoặc những liên hệ gợi ra.  →  `N+2, S+0`
- C. Tôi nhận thấy cả hai kiểu thông tin tương đương.  →  `S+1, N+1`

**q12**: Khi cần nghĩ cách cải thiện một việc quen thuộc:

- A. Tôi thường hình dung một cách làm khác hẳn hoặc một khả năng mới.  →  `N+2, S+0`
- B. Tôi thường bắt đầu từ những gì đang hoạt động và chỉnh từng điểm cụ thể.  →  `S+2, N+0`
- C. Tôi dùng cả hai cách tùy bài toán.  →  `S+1, N+1`

### T (Lý trí) / F (Cảm xúc)

**q13** (anchor): Khi phải đưa ra một quyết định khó ảnh hưởng đến nhiều người, bạn ưu tiên điều gì trước?

- A. Tiêu chí nhất quán, hợp lý và có thể giải thích rõ.  →  `T+2, F+0`
- B. Tác động lên từng người và điều phù hợp với các giá trị quan trọng.  →  `F+2, T+0`
- C. Tôi cân nhắc hai phía gần như ngang nhau.  →  `T+1, F+1`

**q14**: Khi một người thân kể về vấn đề của họ:

- A. Phản xạ đầu tiên của tôi thường là hiểu cảm xúc và điều họ đang cần.  →  `F+2, T+0`
- B. Phản xạ đầu tiên của tôi thường là tìm cách phân tích nguyên nhân hoặc giải pháp.  →  `T+2, F+0`
- C. Tôi thường làm cả hai gần như cùng lúc.  →  `T+1, F+1`

**q15**: Khi góp ý một lỗi có thể ảnh hưởng đến kết quả chung:

- A. Tôi ưu tiên nói rõ vấn đề và điều cần sửa, dù cách nói có thể hơi thẳng.  →  `T+2, F+0`
- B. Tôi ưu tiên cách nói để người nghe vẫn cảm thấy được tôn trọng và có động lực sửa.  →  `F+2, T+0`
- C. Tôi cân bằng hai ưu tiên này khá ngang nhau.  →  `T+1, F+1`

**q16**: Khi hai phương án đều có ưu điểm:

- A. Tôi dễ nghiêng về phương án phù hợp hơn với con người và giá trị mà tôi coi trọng.  →  `F+2, T+0`
- B. Tôi dễ nghiêng về phương án có logic, tiêu chí và hiệu quả thuyết phục hơn.  →  `T+2, F+0`
- C. Tôi thường cần cả hai đạt mức chấp nhận được.  →  `T+1, F+1`

**q17**: Trong một cuộc tranh luận, điều nào khiến bạn dễ đổi ý hơn?

- A. Một lập luận chặt chẽ hoặc bằng chứng tốt hơn.  →  `T+2, F+0`
- B. Một góc nhìn giúp tôi hiểu sâu hơn trải nghiệm và giá trị của người liên quan.  →  `F+2, T+0`
- C. Tùy chủ đề; hai loại lý do đều có sức nặng.  →  `T+1, F+1`

**q18**: Khi đánh giá một ý tưởng, câu hỏi nào thường đến trước hơn?

- A. “Nó có phù hợp với con người và điều mình coi trọng không?”  →  `F+2, T+0`
- B. “Nó có hợp lý và hoạt động tốt không?”  →  `T+2, F+0`
- C. Hai câu hỏi thường xuất hiện gần như cùng lúc.  →  `T+1, F+1`

### J (Định hướng) / P (Linh hoạt)

**q19** (anchor): Khi đi du lịch, kiểu chuẩn bị nào khiến bạn thoải mái hơn?

- A. Có lịch trình và các mốc chính được chốt trước.  →  `J+2, P+0`
- B. Chỉ chốt phần cần thiết, còn lại quyết định theo tình hình.  →  `P+2, J+0`
- C. Tôi thích mức chuẩn bị ở giữa hai cách này.  →  `J+1, P+1`

**q20**: Với một hạn chót còn khá xa:

- A. Tôi thường để không gian linh hoạt rồi tăng tốc khi gần hạn hoặc có cảm hứng.  →  `P+2, J+0`
- B. Tôi thường muốn bắt đầu sớm và chia việc thành các bước.  →  `J+2, P+0`
- C. Tùy loại việc; không nghiêng rõ về bên nào.  →  `J+1, P+1`

**q21**: Khi kế hoạch trong ngày thay đổi bất ngờ:

- A. Tôi thường nhanh chóng sắp xếp lại một kế hoạch mới để giữ nhịp.  →  `J+2, P+0`
- B. Tôi thường ứng biến theo tình hình và xem điều gì thuận tiện nhất lúc đó.  →  `P+2, J+0`
- C. Cả hai cách đều khá tự nhiên với tôi.  →  `J+1, P+1`

**q22**: Khi có nhiều việc đang mở cùng lúc:

- A. Tôi thấy tự nhiên khi giữ nhiều lựa chọn mở và chuyển qua lại giữa chúng.  →  `P+2, J+0`
- B. Tôi thấy dễ chịu hơn khi lần lượt chốt xong từng việc.  →  `J+2, P+0`
- C. Tôi ở khoảng giữa hai cách này.  →  `J+1, P+1`

**q23**: Một ngày cuối tuần lý tưởng với bạn thường là:

- A. Có vài việc hoặc mốc đã định trước để ngày trôi có nhịp.  →  `J+2, P+0`
- B. Để phần lớn thời gian mở rồi xem lúc đó muốn làm gì.  →  `P+2, J+0`
- C. Có một chút kế hoạch và một chút ngẫu hứng.  →  `J+1, P+1`

**q24**: Khi đứng trước một quyết định chưa cần chốt ngay:

- A. Tôi thường thích giữ thêm lựa chọn mở cho đến khi có thêm thông tin.  →  `P+2, J+0`
- B. Tôi thường thấy nhẹ đầu hơn khi sớm thu hẹp lựa chọn và quyết định.  →  `J+2, P+0`
- C. Tùy mức quan trọng của quyết định.  →  `J+1, P+1`

## 3. Câu mô tả theo mức nghiêng

Mỗi chữ có ba mức (`MESSAGES.levels`, sinh từ `MESSAGES.phrases`):

- **E** (Kết nối)
  - Hơi nghiêng: Bạn có xu hướng hơi nghiêng về việc kết nối và trao đổi cùng mọi người.
  - Khá rõ: Bạn thường nghiêng về việc kết nối và trao đổi cùng mọi người.
  - Rõ: Xu hướng kết nối và trao đổi cùng mọi người thể hiện khá rõ trong câu trả lời của bạn.
- **I** (Nội tâm)
  - Hơi nghiêng: Bạn có xu hướng hơi nghiêng về khoảng thời gian dành cho thế giới nội tâm.
  - Khá rõ: Bạn thường nghiêng về khoảng thời gian dành cho thế giới nội tâm.
  - Rõ: Xu hướng dành thời gian cho thế giới nội tâm thể hiện khá rõ trong câu trả lời của bạn.
- **S** (Thực tế)
  - Hơi nghiêng: Bạn có xu hướng hơi nghiêng về những điều cụ thể và thực tế.
  - Khá rõ: Bạn thường nghiêng về những điều cụ thể và thực tế.
  - Rõ: Xu hướng chú ý những điều cụ thể và thực tế thể hiện khá rõ trong câu trả lời của bạn.
- **N** (Trực giác)
  - Hơi nghiêng: Bạn có xu hướng hơi nghiêng về toàn cảnh và các khả năng phía trước.
  - Khá rõ: Bạn thường nghiêng về toàn cảnh và các khả năng phía trước.
  - Rõ: Xu hướng nhìn toàn cảnh và các khả năng phía trước thể hiện khá rõ trong câu trả lời của bạn.
- **T** (Lý trí)
  - Hơi nghiêng: Bạn có xu hướng hơi nghiêng về cách phân tích rõ ràng, mạch lạc.
  - Khá rõ: Bạn thường nghiêng về cách phân tích rõ ràng, mạch lạc.
  - Rõ: Xu hướng phân tích rõ ràng, mạch lạc thể hiện khá rõ trong câu trả lời của bạn.
- **F** (Cảm xúc)
  - Hơi nghiêng: Bạn có xu hướng hơi nghiêng về sự thấu cảm và những giá trị riêng.
  - Khá rõ: Bạn thường nghiêng về sự thấu cảm và những giá trị riêng.
  - Rõ: Xu hướng đặt sự thấu cảm và giá trị riêng lên trước thể hiện khá rõ trong câu trả lời của bạn.
- **J** (Định hướng)
  - Hơi nghiêng: Bạn có xu hướng hơi nghiêng về sự định hướng rõ ràng.
  - Khá rõ: Bạn thường nghiêng về sự định hướng rõ ràng.
  - Rõ: Xu hướng thích có định hướng rõ ràng thể hiện khá rõ trong câu trả lời của bạn.
- **P** (Linh hoạt)
  - Hơi nghiêng: Bạn có xu hướng hơi nghiêng về sự linh hoạt và đón nhận điều bất ngờ.
  - Khá rõ: Bạn thường nghiêng về sự linh hoạt và đón nhận điều bất ngờ.
  - Rõ: Xu hướng linh hoạt và đón nhận điều bất ngờ thể hiện khá rõ trong câu trả lời của bạn.

Câu thêm khi nhiều lựa chọn trung tính: Câu trả lời ở trục này có khá nhiều lựa chọn trung tính, nên hãy xem đây là xu hướng nhẹ.

Câu khi trục cân bằng (`MESSAGES.balanced`):

- **EI**: Bạn khá cân bằng giữa việc kết nối với mọi người và khoảng thời gian dành cho riêng mình, tùy tình huống.
- **SN**: Bạn không nghiêng rõ về một phía giữa chi tiết thực tế và các khả năng phía trước, tùy từng hoàn cảnh.
- **TF**: Bạn cân bằng giữa phân tích rõ ràng và lắng nghe cảm xúc, tùy vào điều mỗi hoàn cảnh cần.
- **JP**: Bạn linh hoạt giữa việc có định hướng và để dành chỗ cho bất ngờ, không nghiêng rõ về một phía.

## 4. 16 kiểu tính cách

### ENFP: Người Truyền Cảm Hứng (The Spark)

- **Phụ đề:** Tia sáng khiến mọi thứ xung quanh thêm màu.
- **Điểm mạnh:** Nhiệt huyết lan tỏa; Trí tưởng tượng phong phú; Dễ kết nối
- **Mô tả:** Bạn có xu hướng nhìn thấy khả năng ở mọi nơi và truyền năng lượng ấy cho người xung quanh. Ý tưởng của bạn thường khiến người khác muốn cùng thử.
- **Giao tiếp:** Bạn thường bắt chuyện tự nhiên và khiến người đối diện thấy mình được chào đón.
- **Công việc:** Bạn tỏa sáng khi được thử điều mới và biến ý tưởng thành thứ có thể chạm tới.
- **Tình yêu:** Bạn thường yêu bằng sự chân thành, tò mò và những khoảnh khắc bất ngờ đáng nhớ.
- **Điểm mạnh ẩn:** Khả năng khiến người khác tin rằng điều họ mong muốn có thể bắt đầu từ hôm nay.
- **Lời động viên:** Sự háo hức của bạn không hề quá nhiều. Đó là món quà giúp người khác dám mơ.

### INFJ: Người Dẫn Đường (The Visionary)

- **Phụ đề:** Nhìn xa, cảm sâu và lặng lẽ soi đường.
- **Điểm mạnh:** Trực giác tinh tế; Tầm nhìn dài hạn; Thấu cảm sâu sắc
- **Mô tả:** Bạn cảm nhận tinh tế những thay đổi mà nhiều người dễ bỏ qua. Bạn thường nhìn xa hơn những gì đang diễn ra trước mắt.
- **Giao tiếp:** Bạn thường xây dựng những mối quan hệ ít nhưng sâu sắc và bền lâu.
- **Công việc:** Bạn làm tốt nhất khi công việc gắn với ý nghĩa và có thể giúp ích cho người khác.
- **Tình yêu:** Bạn thường lắng nghe bằng cả trái tim và trân trọng sự gắn kết chân thành.
- **Điểm mạnh ẩn:** Khả năng hiểu điều người khác chưa nói thành lời.
- **Lời động viên:** Sự tinh tế của bạn là ngọn đèn nhỏ nhưng bền. Hãy tin vào hướng đi bạn cảm nhận được.

### INFP: Người Mộng Mơ (The Dreamer)

- **Phụ đề:** Giữ cho thế giới một chút dịu dàng và thơ.
- **Điểm mạnh:** Giá trị sống rõ ràng; Sáng tạo giàu cảm xúc; Chân thành
- **Mô tả:** Bạn có thế giới nội tâm phong phú và luôn tìm ý nghĩa trong những điều giản dị. Sự chân thật của bạn khiến người khác thấy an toàn khi ở cạnh.
- **Giao tiếp:** Bạn thường dịu dàng, biết lắng nghe và dễ kết nối với những người cùng tần số.
- **Công việc:** Bạn thường tỏa sáng với việc sáng tạo, viết lách hoặc điều gì chạm đến giá trị của bạn.
- **Tình yêu:** Bạn thường yêu một cách lãng mạn, tinh tế và đầy sự trân trọng.
- **Điểm mạnh ẩn:** Khả năng tìm thấy vẻ đẹp ở nơi người khác đi qua mà không để ý.
- **Lời động viên:** Giấc mơ của bạn không viển vông. Chúng là la bàn cho những điều bạn muốn xây.

### ENFJ: Người Chữa Lành (The Healer)

- **Phụ đề:** Nơi mọi người cảm thấy được nâng đỡ.
- **Điểm mạnh:** Khích lệ người khác; Giao tiếp ấm áp; Tinh thần dẫn dắt
- **Mô tả:** Bạn có xu hướng nhận ra tiềm năng của người khác và giúp họ tin vào chính mình. Sự quan tâm của bạn thường tạo cảm giác như một vòng tay.
- **Giao tiếp:** Bạn thường là người kết nối mọi người và làm không khí nhóm ấm hơn.
- **Công việc:** Bạn làm tốt khi được dẫn dắt, hỗ trợ đồng đội và tạo ra sự đồng lòng.
- **Tình yêu:** Bạn thường yêu bằng sự quan tâm chu đáo và những lời động viên đúng lúc.
- **Điểm mạnh ẩn:** Khả năng khiến người khác thấy mình đáng giá hơn họ tưởng.
- **Lời động viên:** Bạn cũng xứng đáng nhận được sự chăm sóc mà bạn dành cho người khác.

### INTJ: Người Kiến Tạo (The Architect)

- **Phụ đề:** Biến tầm nhìn thành kế hoạch có hình hài.
- **Điểm mạnh:** Tư duy chiến lược; Quyết tâm bền bỉ; Độc lập
- **Mô tả:** Bạn thường nhìn mọi thứ như một bức tranh lớn và tìm cách ghép từng mảnh cho chặt chẽ. Bạn thoải mái khi mọi việc có định hướng rõ ràng.
- **Giao tiếp:** Bạn thường chọn lọc trong các mối quan hệ và dành sự chân thành cho người thân.
- **Công việc:** Bạn làm tốt khi được tự chủ, có mục tiêu dài hạn và thời gian để tập trung sâu.
- **Tình yêu:** Bạn thường yêu một cách kiên định, trung thành và có chiều sâu.
- **Điểm mạnh ẩn:** Khả năng giữ vững hướng đi khi người khác còn đang phân vân.
- **Lời động viên:** Sự điềm tĩnh của bạn là điểm tựa. Đừng quên để mình nghỉ ngơi và tận hưởng thành quả.

### INTP: Người Quan Sát (The Observer)

- **Phụ đề:** Tò mò, tinh ý và luôn đặt câu hỏi hay.
- **Điểm mạnh:** Tư duy phân tích; Óc tò mò; Sáng tạo độc đáo
- **Mô tả:** Bạn có xu hướng quan sát kỹ và tìm hiểu cách mọi thứ vận hành. Những câu hỏi của bạn thường mở ra góc nhìn mới cho cả nhóm.
- **Giao tiếp:** Bạn thường thoải mái với những cuộc trò chuyện sâu về điều mình quan tâm.
- **Công việc:** Bạn làm tốt khi được tự do khám phá, thử nghiệm và giải những bài toán thú vị.
- **Tình yêu:** Bạn thường yêu bằng sự chân thành, hài hước và không gian để cả hai là chính mình.
- **Điểm mạnh ẩn:** Khả năng nhìn ra mô hình mà người khác chưa thấy.
- **Lời động viên:** Cách nghĩ khác biệt của bạn là tài sản. Hãy chia sẻ nó nhiều hơn một chút.

### ENTJ: Người Tiên Phong (The Leader)

- **Phụ đề:** Mở đường và rủ mọi người cùng đi tới.
- **Điểm mạnh:** Quyết đoán; Tổ chức tốt; Truyền động lực
- **Mô tả:** Bạn có xu hướng biến mục tiêu thành hành động và giúp cả nhóm đi đúng nhịp. Sự tự tin của bạn khiến người khác thấy yên tâm khi cùng làm việc.
- **Giao tiếp:** Bạn thường thẳng thắn, năng động và thích những cuộc trò chuyện có định hướng.
- **Công việc:** Bạn tỏa sáng khi được dẫn dắt dự án, đặt mục tiêu lớn và nhìn thấy kết quả.
- **Tình yêu:** Bạn thường yêu bằng sự tận tâm và mong cùng người ấy lớn lên.
- **Điểm mạnh ẩn:** Khả năng nhìn ra tiềm năng và biến nó thành kế hoạch cụ thể.
- **Lời động viên:** Bạn không cần phải mạnh mẽ mọi lúc. Những khoảng nghỉ cũng là một phần của hành trình.

### ENTP: Người Khám Phá (The Explorer)

- **Phụ đề:** Luôn có thêm một cách nhìn thú vị.
- **Điểm mạnh:** Nhanh nhạy; Dám thử cái mới; Hài hước
- **Mô tả:** Bạn thường thích khám phá ý tưởng và tìm ra những lối đi mà người khác chưa nghĩ tới. Sự linh hoạt giúp bạn thích ứng tốt với thay đổi.
- **Giao tiếp:** Bạn thường hoạt ngôn, vui vẻ và tạo ra những cuộc trò chuyện đầy cảm hứng.
- **Công việc:** Bạn làm tốt khi được thử nghiệm, tìm giải pháp mới và không bị gò bó.
- **Tình yêu:** Bạn thường yêu bằng sự thú vị, những cuộc trò chuyện dài và niềm vui chung.
- **Điểm mạnh ẩn:** Khả năng biến tình huống bế tắc thành cơ hội để thử điều mới.
- **Lời động viên:** Sự tò mò của bạn là động cơ. Hãy tin rằng không ai cần bạn phải đi theo lối cũ.

### ISTJ: Người Gìn Giữ (The Guardian)

- **Phụ đề:** Vững vàng, đáng tin và rất có trách nhiệm.
- **Điểm mạnh:** Đáng tin cậy; Kiên trì; Cẩn thận chi tiết
- **Mô tả:** Bạn cảm thấy thoải mái khi mọi việc có nền tảng rõ ràng và được làm đến nơi đến chốn. Người xung quanh thường biết họ có thể dựa vào bạn.
- **Giao tiếp:** Bạn thường ít nói nhưng vững vàng trong cách đồng hành với người thân.
- **Công việc:** Bạn làm tốt khi có quy trình rõ ràng và được hoàn thành công việc một cách chỉn chu.
- **Tình yêu:** Bạn thường yêu bằng hành động bền bỉ và sự trung thành.
- **Điểm mạnh ẩn:** Khả năng giữ mọi thứ vận hành ổn định ngay cả khi xung quanh bận rộn.
- **Lời động viên:** Sự đều đặn của bạn là nền móng của rất nhiều điều tốt đẹp. Hãy tự hào về nó.

### ISFJ: Người Che Chở (The Protector)

- **Phụ đề:** Âm thầm chăm sóc, ấm áp theo cách riêng.
- **Điểm mạnh:** Chu đáo; Trung thành; Nhớ điều nhỏ
- **Mô tả:** Bạn thường để ý những nhu cầu nhỏ của người khác và chăm sóc họ một cách tinh tế. Sự ổn định của bạn khiến nhiều người thấy an toàn.
- **Giao tiếp:** Bạn thường ân cần, kiên nhẫn và là người ở lại khi người khác cần.
- **Công việc:** Bạn làm tốt khi được hỗ trợ đội nhóm và làm những việc có ích thực tế.
- **Tình yêu:** Bạn thường yêu bằng những cử chỉ nhỏ, đều đặn và đầy tâm ý.
- **Điểm mạnh ẩn:** Khả năng nhớ điều quan trọng với từng người và làm họ thấy được trân trọng.
- **Lời động viên:** Những điều bạn làm lặng lẽ vẫn luôn có giá trị. Hôm nay hãy để ai đó chăm sóc bạn.

### ESTJ: Người Tổ Chức (The Organizer)

- **Phụ đề:** Biến sự rối rắm thành một nhịp rõ ràng.
- **Điểm mạnh:** Sắp xếp giỏi; Thực tế; Có trách nhiệm
- **Mô tả:** Bạn có xu hướng tạo ra trật tự và giúp mọi người biết mình cần làm gì. Bạn thoải mái khi mọi việc có định hướng rõ ràng.
- **Giao tiếp:** Bạn thường thẳng thắn, đáng tin và hay là người tổ chức các buổi gặp gỡ.
- **Công việc:** Bạn tỏa sáng khi quản lý công việc, đặt tiêu chuẩn và hoàn thành đúng hẹn.
- **Tình yêu:** Bạn thường yêu bằng sự vững vàng trong hành động và mong xây dựng điều bền vững.
- **Điểm mạnh ẩn:** Khả năng giữ cả nhóm đi đúng hướng mà vẫn hoàn thành mục tiêu.
- **Lời động viên:** Sự đáng tin của bạn khiến nhiều người nhẹ lòng. Bạn cũng được phép chậm lại.

### ESTP: Người Bứt Phá (The Trailblazer)

- **Phụ đề:** Hành động nhanh, sống trọn từng khoảnh khắc.
- **Điểm mạnh:** Linh hoạt; Dám hành động; Biết xoay xở
- **Mô tả:** Bạn thường nhanh nhạy với những gì đang diễn ra và sẵn sàng thử ngay. Sự linh hoạt giúp bạn thích ứng tốt với những thay đổi bất ngờ.
- **Giao tiếp:** Bạn thường vui vẻ, thoải mái và mang năng lượng sôi nổi vào đám đông.
- **Công việc:** Bạn làm tốt trong môi trường năng động, cần phản ứng nhanh và giải quyết tại chỗ.
- **Tình yêu:** Bạn thường yêu bằng sự nhiệt tình, những trải nghiệm chung và niềm vui hiện tại.
- **Điểm mạnh ẩn:** Khả năng giữ bình tĩnh và hành động đúng lúc khi mọi người còn đang cân nhắc.
- **Lời động viên:** Sự dũng cảm của bạn truyền cảm hứng. Hãy tiếp tục sống theo nhịp của mình.

### ISTP: Người Khéo Tay (The Maker)

- **Phụ đề:** Bình tĩnh, khéo léo và biết tự xoay sở.
- **Điểm mạnh:** Bình tĩnh; Giải quyết thực tế; Độc lập
- **Mô tả:** Bạn thường quan sát rồi hành động chính xác, và thích hiểu mọi thứ bằng cách tự tay thử. Sự điềm tĩnh của bạn là điểm tựa khi có tình huống bất ngờ.
- **Giao tiếp:** Bạn thường kiệm lời nhưng đáng tin và dễ chịu khi ở cạnh.
- **Công việc:** Bạn làm tốt với những vấn đề cụ thể, cần sự khéo léo và tự do thử nghiệm.
- **Tình yêu:** Bạn thường yêu bằng hành động, sự chân thật và không gian thoải mái cho nhau.
- **Điểm mạnh ẩn:** Khả năng giữ đầu óc rõ ràng ngay giữa những lúc rối.
- **Lời động viên:** Cách bạn lặng lẽ làm mọi thứ ổn lên rất đáng quý. Hãy cho phép mình được ghi nhận.

### ISFP: Người Nghệ Sĩ (The Artist)

- **Phụ đề:** Cảm nhận bằng giác quan, sống bằng trái tim.
- **Điểm mạnh:** Thẩm mỹ tinh tế; Dịu dàng; Chân thật
- **Mô tả:** Bạn thường cảm nhận cái đẹp trong từng chi tiết và sống đúng với giá trị riêng. Bạn linh hoạt và thích ứng tốt với những thay đổi bất ngờ.
- **Giao tiếp:** Bạn thường nhẹ nhàng, biết tôn trọng và khiến người khác thấy thoải mái là chính mình.
- **Công việc:** Bạn tỏa sáng với công việc cho phép sáng tạo, trải nghiệm và tự do thể hiện.
- **Tình yêu:** Bạn thường yêu bằng sự dịu dàng, chân thật và những khoảnh khắc đẹp.
- **Điểm mạnh ẩn:** Khả năng biến điều bình thường thành điều đáng nhớ.
- **Lời động viên:** Bạn không cần phải thay đổi để trở nên đáng yêu hơn. Hãy tiếp tục theo nhịp riêng của mình.

### ESFP: Người Tỏa Sáng (The Radiant)

- **Phụ đề:** Mang niềm vui đến bất cứ nơi nào bạn bước vào.
- **Điểm mạnh:** Vui vẻ lan tỏa; Hòa đồng; Sống hết mình
- **Mô tả:** Bạn có xu hướng tận hưởng khoảnh khắc và khiến người khác cảm thấy thoải mái để vui cùng. Bạn linh hoạt và thích ứng tốt với những điều bất ngờ.
- **Giao tiếp:** Bạn thường ấm áp, hài hước và là người làm bữa gặp gỡ thêm sôi động.
- **Công việc:** Bạn làm tốt khi được tương tác với con người và mang lại trải nghiệm tích cực.
- **Tình yêu:** Bạn thường yêu bằng sự nhiệt tình, rộng rãi và những kỷ niệm vui.
- **Điểm mạnh ẩn:** Khả năng làm dịu không khí và giúp người khác thấy nhẹ nhõm hơn.
- **Lời động viên:** Niềm vui của bạn là món quà thật. Hãy tiếp tục tỏa sáng bằng cách của riêng bạn.

### ESFJ: Người Kết Nối (The Connector)

- **Phụ đề:** Gắn mọi người lại bằng sự quan tâm thật lòng.
- **Điểm mạnh:** Quan tâm chu đáo; Hòa hợp; Biết lắng nghe
- **Mô tả:** Bạn có xu hướng để ý đến cảm xúc của mọi người và tạo nên cảm giác thuộc về. Sự ấm áp của bạn khiến các mối quan hệ gắn bó hơn.
- **Giao tiếp:** Bạn thường là người nhớ sinh nhật, tổ chức gặp gỡ và giữ mọi người gần nhau.
- **Công việc:** Bạn làm tốt khi phối hợp nhóm, hỗ trợ và tạo môi trường làm việc dễ chịu.
- **Tình yêu:** Bạn thường yêu bằng sự chăm sóc, chia sẻ và những truyền thống nhỏ của hai người.
- **Điểm mạnh ẩn:** Khả năng khiến một tập thể trở nên giống một gia đình.
- **Lời động viên:** Sự quan tâm của bạn tạo nên những điều lớn lao. Hôm nay hãy nhận lại một chút yêu thương.

## 5. Cách ghép kết quả cuối

Kết quả cuối = tính cách + lá bài, ghép từ các mảnh (`buildFinalResult` trong `js/compose.js`), không viết sẵn 320 bài:

- **Thông điệp:** mô tả tính cách + câu của lá bài (`personalityMessage`) + một câu nối.
- **Điều tốt đẹp đang đến:** `futureGeneral` của lá bài.
- **Tình yêu:** `loveStyle` của tính cách + `loveMessage` của lá bài.
- **Công việc:** `workStyle` của tính cách + `careerMessage` của lá bài.
- **Mục thứ ba:** một trong tài chính / phát triển bản thân / hạnh phúc, chọn theo trọng số của lá bài (`weights`).
- **Lời nhắn 20/10:** lời động viên của tính cách + của lá bài + một lời chúc.
- Câu nối và lời chúc chọn cố định theo (tính cách + lá bài), nên cùng cặp luôn ra cùng kết quả.

Câu nối (`{title}`=tên tính cách, `{strength}`=điểm mạnh đầu, `{kw}`=từ khóa đầu của lá bài):

- Khi {title} gặp lá bài này, điều nổi bật là sự kết hợp giữa {strength} và tinh thần {kw}.
- Có thể bạn nhận ra {strength} của mình đang cùng nhịp với thông điệp về {kw}.
- Với {strength} vốn có, bạn rất phù hợp để đón nhận năng lượng {kw} mà lá bài mang tới.
- Sự gặp gỡ giữa {title} và {kw} gợi ý rằng bạn đã sẵn sàng cho một bước đi nhẹ nhàng mà đầy ý nghĩa.

Lời chúc cuối:

- Nhân dịp 20/10, chúc bạn luôn được là phiên bản thoải mái nhất của chính mình.
- Hôm nay hãy tự tặng mình một lời khen thật lòng. Bạn xứng đáng với điều đó.
- Chúc bạn một ngày 20/10 đủ đầy, với những người và điều khiến bạn mỉm cười.
- Bạn không cần phải thay đổi để trở thành một phiên bản đáng yêu hơn. Hãy tiếp tục phát triển theo nhịp riêng của mình.

## 6. Quy tắc viết (để sửa cho đúng giọng)

- Dùng: "Bạn có xu hướng...", "Bạn thường...", "Có thể bạn sẽ nhận ra...", "Giai đoạn tới có thể mang tới...".
- Tránh: "Bạn chắc chắn...", "Bạn sẽ...", "Số phận của bạn...". Test `tests/engine.test.js` sẽ báo lỗi nếu có các từ này.
- Không có nội dung tiêu cực: bệnh tật, tai nạn, mất tiền, chia tay, thất nghiệp.
- Hai phía đối lập (E/I, T/F...) đều viết theo hướng thế mạnh khác nhau.

# Prompt ảnh cho TẤT CẢ câu hỏi quiz (24 câu, 48 ảnh)

Mỗi câu có 2 ảnh cho 2 đáp án nghiêng một phía. Đáp án C "tùy tình huống" không có ảnh. Lưu thành `images/quiz/<id câu>-<0|1>.jpg`; `0` là đáp án hiển thị đầu tiên, `1` là đáp án thứ hai (đúng thứ tự trong `data/questions.js`, đã được đảo A/B ở một số câu). Tỉ lệ **4:3 ngang**, tối thiểu 1200x900 (khuyến nghị 1600x1200 trở lên). Chép đè lên file cũ cùng tên là web dùng ngay.

## Cách dùng

Mỗi prompt = **Cảnh** (bảng dưới) + **Style chung** (dán ở cuối). Giữ cùng một nhân vật nữ xuyên suốt cả bộ bằng cách dùng cùng một mô tả nhân vật (đã có trong style chung), hoặc dùng tính năng character/face reference của tool nếu có.

### Style chung

```
warm cinematic lifestyle photograph, young Vietnamese woman with long dark wavy hair (same woman across the whole set), natural candid moment, golden hour soft light, shallow depth of field, soft pink dusty rose and warm ivory color palette, feminine and modern editorial mood, high detail, sharp focus, 4:3 landscape, no text, no letters, no logo, no watermark
```

### Negative prompt (nếu tool hỗ trợ)

```
text, letters, watermark, logo, extra fingers, deformed hands, distorted face, blurry, oversaturated, harsh shadows, cluttered background, duplicated people, low quality
```

### Gợi ý nhất quán

- Hai ảnh của cùng một câu nên có cùng ánh sáng và tông màu, chỉ khác bối cảnh, để người chơi so sánh dễ.
- Ảnh nên đọc được ý nghĩa ngay trong 1 giây ở kích thước nhỏ (khoảng 170 px trên điện thoại), nên chủ thể rõ, ít chi tiết thừa.
- Tránh có chữ trong ảnh (bảng, màn hình, sổ). Nếu có, để mờ hoặc trống.

## Danh sách 48 ảnh


### Cặp Kết nối / Nội tâm

**q1** — Sau một tuần bận rộn, cách nào giúp bạn hồi lại năng lượng tự nhiên hơn?

| File | Cảnh (đặt TRƯỚC style chung) | Đáp án |
|---|---|---|
| `q1-0.jpg` | friends gathered at a candle-lit dinner table under string lights, laughing | E |
| `q1-1.jpg` | woman reading alone by a sunny window with a cup of tea | I |

**q2** — Khi bước vào một nhóm mà bạn chưa quen nhiều người:

| File | Cảnh (đặt TRƯỚC style chung) | Đáp án |
|---|---|---|
| `q2-0.jpg` | woman quietly observing a party from a corner, chatting with just two friends | I |
| `q2-1.jpg` | woman confidently greeting new people at a lively party with a glass in hand | E |

**q3** — Khi một ý tưởng mới vừa xuất hiện:

| File | Cảnh (đặt TRƯỚC style chung) | Đáp án |
|---|---|---|
| `q3-0.jpg` | woman sharing an idea excitedly with friends around a cafe table, sticky notes | E |
| `q3-1.jpg` | woman thinking quietly with a notebook by a window | I |

**q4** — Nếu có vài giờ hoàn toàn rảnh và không có nghĩa vụ gì:

| File | Cảnh (đặt TRƯỚC style chung) | Đáp án |
|---|---|---|
| `q4-0.jpg` | woman enjoying a solo hobby, painting or walking alone in a quiet park | I |
| `q4-1.jpg` | woman texting friends on her phone, smiling, planning an outing together | E |

**q5** — Sau một buổi tương tác xã hội kéo dài:

| File | Cảnh (đặt TRƯỚC style chung) | Đáp án |
|---|---|---|
| `q5-0.jpg` | woman still glowing and chatting happily with friends at the end of a party night | E |
| `q5-1.jpg` | woman alone on a quiet balcony at night with tea, calm and relaxed | I |

**q6** — Khi gặp một vấn đề khó và chưa biết bắt đầu từ đâu:

| File | Cảnh (đặt TRƯỚC style chung) | Đáp án |
|---|---|---|
| `q6-0.jpg` | woman thinking alone at a desk with a notebook, focused on a tricky problem | I |
| `q6-1.jpg` | woman discussing a problem with colleagues around a whiteboard | E |


### Cặp Thực tế / Trực giác

**q7** — Khi học một thứ hoàn toàn mới, điều gì giúp bạn bắt nhịp nhanh hơn?

| File | Cảnh (đặt TRƯỚC style chung) | Đáp án |
|---|---|---|
| `q7-0.jpg` | woman following a recipe step by step in a bright kitchen | S |
| `q7-1.jpg` | woman sketching a concept diagram on paper, thoughtful | N |

**q8** — Khi nhớ lại một sự việc đã xảy ra:

| File | Cảnh (đặt TRƯỚC style chung) | Đáp án |
|---|---|---|
| `q8-0.jpg` | woman smiling softly, remembering a feeling, dreamy golden light and floating petals | N |
| `q8-1.jpg` | woman flipping through a detailed photo album with dates and notes | S |

**q9** — Khi bắt đầu một dự án:

| File | Cảnh (đặt TRƯỚC style chung) | Đáp án |
|---|---|---|
| `q9-0.jpg` | woman reviewing a clear checklist on a tidy desk | S |
| `q9-1.jpg` | woman looking at a big mind map wall full of ideas | N |

**q10** — Cuộc trò chuyện nào thường giữ sự chú ý của bạn lâu hơn?

| File | Cảnh (đặt TRƯỚC style chung) | Đáp án |
|---|---|---|
| `q10-0.jpg` | friends in an animated discussion of big what-if ideas, with sketches and glowing symbols | N |
| `q10-1.jpg` | woman sharing hands-on practical experience with friends, demonstrating a craft at a table | S |

**q11** — Khi quan sát một nơi mới:

| File | Cảnh (đặt TRƯỚC style chung) | Đáp án |
|---|---|---|
| `q11-0.jpg` | woman noticing small details in a new cafe: cups, colors, decorations | S |
| `q11-1.jpg` | woman standing in a new place absorbing the overall atmosphere, dreamy mood | N |

**q12** — Khi cần nghĩ cách cải thiện một việc quen thuộc:

| File | Cảnh (đặt TRƯỚC style chung) | Đáp án |
|---|---|---|
| `q12-0.jpg` | woman imagining a completely new layout, sketching a bold redesign on a big sheet | N |
| `q12-1.jpg` | woman fine-tuning one small detail on a tidy working setup, adjusting items on a shelf | S |


### Cặp Lý trí / Cảm xúc

**q13** — Khi phải đưa ra một quyết định khó ảnh hưởng đến nhiều người, bạn ưu tiên điều gì trước?

| File | Cảnh (đặt TRƯỚC style chung) | Đáp án |
|---|---|---|
| `q13-0.jpg` | woman writing a pros and cons list on paper | T |
| `q13-1.jpg` | woman with a hand on her heart, eyes closed, calm at sunset | F |

**q14** — Khi một người thân kể về vấn đề của họ:

| File | Cảnh (đặt TRƯỚC style chung) | Đáp án |
|---|---|---|
| `q14-0.jpg` | woman hugging a friend and listening warmly | F |
| `q14-1.jpg` | woman sketching a plan with a friend on paper, solving a problem together | T |

**q15** — Khi góp ý một lỗi có thể ảnh hưởng đến kết quả chung:

| File | Cảnh (đặt TRƯỚC style chung) | Đáp án |
|---|---|---|
| `q15-0.jpg` | woman giving direct, clear feedback in a meeting, friendly but straightforward | T |
| `q15-1.jpg` | woman encouraging a colleague with a gentle smile | F |

**q16** — Khi hai phương án đều có ưu điểm:

| File | Cảnh (đặt TRƯỚC style chung) | Đáp án |
|---|---|---|
| `q16-0.jpg` | woman choosing the option that fits people best, discussing warmly with her team | F |
| `q16-1.jpg` | woman comparing two options with charts on a laptop, analytical | T |

**q17** — Trong một cuộc tranh luận, điều nào khiến bạn dễ đổi ý hơn?

| File | Cảnh (đặt TRƯỚC style chung) | Đáp án |
|---|---|---|
| `q17-0.jpg` | woman reviewing evidence and nodding at a clear argument in a meeting | T |
| `q17-1.jpg` | woman listening empathetically to someone sharing a personal story | F |

**q18** — Khi đánh giá một ý tưởng, câu hỏi nào thường đến trước hơn?

| File | Cảnh (đặt TRƯỚC style chung) | Đáp án |
|---|---|---|
| `q18-0.jpg` | woman looking at an idea with a caring, thoughtful expression, people in the background | F |
| `q18-1.jpg` | woman testing a prototype on a desk, checking whether it works | T |


### Cặp Định hướng / Linh hoạt

**q19** — Khi đi du lịch, kiểu chuẩn bị nào khiến bạn thoải mái hơn?

| File | Cảnh (đặt TRƯỚC style chung) | Đáp án |
|---|---|---|
| `q19-0.jpg` | woman planning a trip with a printed itinerary and a map | J |
| `q19-1.jpg` | woman wandering a charming street with a backpack, no fixed plan | P |

**q20** — Với một hạn chót còn khá xa:

| File | Cảnh (đặt TRƯỚC style chung) | Đáp án |
|---|---|---|
| `q20-0.jpg` | woman in a burst of inspired creative work at night, lamp light | P |
| `q20-1.jpg` | woman working steadily with a calendar and checkmarks | J |

**q21** — Khi kế hoạch trong ngày thay đổi bất ngờ:

| File | Cảnh (đặt TRƯỚC style chung) | Đáp án |
|---|---|---|
| `q21-0.jpg` | woman quickly reorganizing a schedule on a tablet, calm | J |
| `q21-1.jpg` | woman curious and smiling as plans change, looking at a new path | P |

**q22** — Khi có nhiều việc đang mở cùng lúc:

| File | Cảnh (đặt TRƯỚC style chung) | Đáp án |
|---|---|---|
| `q22-0.jpg` | woman switching between several open projects with notes and multiple screens | P |
| `q22-1.jpg` | woman ticking off one finished task on a list at a tidy clear desk | J |

**q23** — Một ngày cuối tuần lý tưởng với bạn thường là:

| File | Cảnh (đặt TRƯỚC style chung) | Đáp án |
|---|---|---|
| `q23-0.jpg` | woman with a weekend planner and a few planned activities | J |
| `q23-1.jpg` | woman lounging at home, relaxed and undecided, sunlight | P |

**q24** — Khi đứng trước một quyết định chưa cần chốt ngay:

| File | Cảnh (đặt TRƯỚC style chung) | Đáp án |
|---|---|---|
| `q24-0.jpg` | woman browsing many options and comparing swatches, relaxed and curious | P |
| `q24-1.jpg` | woman confidently circling one option and closing her laptop, relieved | J |

# Prompt ảnh AI cho giao diện theo mockup

Thiếu ảnh nào web tự dùng bản dự phòng (không lỗi). Lá Tarot xem `docs/tarot-prompts.md`.

## Style chung (dán cuối mọi prompt bên dưới)

```
Style: soft pastel digital illustration, feminine and modern, dusty pink and rose tones with warm ivory, delicate pink flowers (peony, cherry blossom), gentle golden sparkles, soft moonlight glow, dreamy and premium editorial mood, clean background, no text, no letters, no watermark.
```

## 1. Hero landing → `images/hero.jpg` (4:4.4 dọc, ví dụ 1200x1320)
```
Serene young Vietnamese woman in profile with eyes closed, long dark flowing hair with pink flowers tucked in, large soft full moon behind her, pink blossoms framing the bottom corners, leave bottom-left area calm for script text.
```

## 2. Chân dung personality → `images/personality/<CODE>.jpg` (3:4 dọc, ví dụ 900x1200)
Cắt dạng vòm trên (chủ thể ở giữa, đầu chừa lề). Mẫu: `Portrait of a woman, <MOOD>, upper body, head-and-shoulders, centered, surrounded by pink flowers.`

| File | MOOD |
|---|---|
| `ENFP.jpg` | radiant joyful smile, hair blown by wind, sparkles around her |
| `INFJ.jpg` | calm gaze toward the horizon, a soft glowing lantern, moonlit |
| `INFP.jpg` | dreamy eyes half closed, floating petals, a book of poems |
| `ENFJ.jpg` | warm welcoming smile, hands open, soft golden light |
| `INTJ.jpg` | composed confident look, a star map behind her |
| `INTP.jpg` | curious thoughtful look, floating geometric light lines |
| `ENTJ.jpg` | confident upright pose, bright sunrise behind her |
| `ENTP.jpg` | playful smirk, swirling colorful ideas and sparks |
| `ISTJ.jpg` | steady reliable expression, tidy elegant blossoms and a calm lake |
| `ISFJ.jpg` | gentle caring smile, holding a small bouquet, cozy warm light |
| `ESTJ.jpg` | poised and organized look, structured crisp floral arch |
| `ESTP.jpg` | bold energetic look, dynamic motion, wind and petals |
| `ISTP.jpg` | cool calm look, hands crafting a small clay flower |
| `ISFP.jpg` | artistic soft smile, holding a paintbrush, watercolor splashes |
| `ESFP.jpg` | glowing laughter, confetti petals, stage-light sparkle |
| `ESFJ.jpg` | friendly warm smile, linked hands of friends in the background |

## 3. Ảnh đáp án quiz → `images/quiz/<qid>-<0|1>.jpg` (4:3 ngang, ví dụ 1200x900)
Sau khi có ảnh, đặt `quizImages: true` trong `data/messages.js` (cuối file) để bật layout 2 cột như mockup. Phong cách ảnh quiz nên là **ảnh đời thực ấm áp** như mockup: `warm cinematic lifestyle photo, golden hour, shallow depth of field, no text` thay cho style chung ở trên.

Chỉ số `0|1` là thứ tự đáp án trong `data/questions.js` (đáp án đầu tiên = 0).

| File | Cảnh |
|---|---|
| `q1-0` | friends gathered at a candle-lit dinner table under string lights |
| `q1-1` | woman reading alone by a sunny window with tea |
| `q2-0` | woman quietly observing a party from a corner, chatting with two friends |
| `q2-1` | woman confidently greeting new people at a lively party |
| `q3-0` | woman sharing an idea excitedly with friends at a table, sticky notes |
| `q3-1` | woman thinking quietly with a notebook by a window |
| `q4-0` | two close friends talking deeply over coffee |
| `q4-1` | big group of friends laughing on a road trip |
| `q5-0` | woman reviewing a clear checklist on a tidy desk |
| `q5-1` | woman looking at a big mind map wall with many ideas |
| `q6-0` | woman smiling softly remembering a feeling, dreamy light |
| `q6-1` | woman flipping through detailed photo album with dates |
| `q7-0` | woman following a recipe step by step in a kitchen |
| `q7-1` | woman sketching a concept diagram, thoughtful |
| `q8-0` | cozy living room, couple watching a down-to-earth family movie |
| `q8-1` | woman watching a fantasy film full of symbols, glowing screen |
| `q9-0` | woman hugging a friend and listening |
| `q9-1` | woman sketching a plan with a friend on paper |
| `q10-0` | woman writing pros and cons list on paper |
| `q10-1` | woman with hand on her heart, eyes closed, calm sunset |
| `q11-0` | woman giving direct clear feedback in a meeting, friendly |
| `q11-1` | woman encouraging a colleague with a gentle smile |
| `q12-0` | woman comforting someone, a tender moment |
| `q12-1` | woman solving a puzzle successfully, proud smile |
| `q13-0` | woman planning a trip with a printed itinerary and map |
| `q13-1` | woman wandering a charming street with a backpack, no plan |
| `q14-0` | woman lounging at home, undecided, sunlight |
| `q14-1` | woman with a weekend planner and a few planned activities |
| `q15-0` | woman working steadily with a calendar and checkmarks |
| `q15-1` | woman in a burst of inspired creative work at night, lamp light |
| `q16-0` | woman curious and smiling as plans change, looking at a new path |
| `q16-1` | woman quickly reorganizing a schedule on a tablet, calm |

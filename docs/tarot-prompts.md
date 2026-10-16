# Prompt tạo ảnh AI cho 20 lá Tarot

Lưu mỗi ảnh thành `images/tarot/<id>.jpg` (đúng tên id bên dưới). Tỉ lệ **2:3 dọc** (vd 1024x1536). Web tự cắt vừa khung bằng `object-fit: cover`, nên giữ chủ thể ở giữa, chừa ~12% đáy trống (tên lá đè lên). Thiếu ảnh thì web dùng line-art mặc định.

## Style chung (dán vào cuối MỖI prompt để các lá đồng bộ)

```
Style: elegant editorial tarot card illustration, feminine and modern, soft mystical mood (not dark, not occult), fine gold line-art ornaments over a rich deep burgundy and dusty rose watercolor gradient, ivory and warm white highlights, soft gold foil details, delicate flowers, moon and stars motifs, abstract female silhouette, thin gold double border frame, flat centered symmetrical composition, vertical 2:3 portrait, high detail, clean, premium. No text, no letters, no numerals, no watermark, no logo.
```

## Negative prompt (nếu tool hỗ trợ)

```
text, letters, numbers, watermark, signature, skull, blood, horror, creepy, dark occult, gore, extra fingers, deformed hands, cluttered background, photo-realistic face
```

## Prompt từng lá

| id | Prompt chủ thể (đặt TRƯỚC style chung) |
|---|---|
| `the-sun` | A radiant golden sun with soft rays at the center, a graceful woman silhouette with open arms below it, sunflowers and warm peach-pink sky, joyful and glowing |
| `the-star` | A serene woman silhouette kneeling by a calm pond pouring light from two vessels, one large eight-pointed golden star above surrounded by seven small stars, deep rose night sky, hopeful and healing |
| `the-world` | A woman silhouette dancing gracefully inside a large golden laurel wreath, four small floral symbols in the corners, soft pink and ivory clouds, complete and harmonious |
| `the-empress` | A gentle empress silhouette seated in a blooming garden, crown of stars, flowing dress of roses and wheat, a heart-shaped shield, lush pink flowers, nurturing and abundant |
| `strength` | A calm woman silhouette softly resting her hands on a gentle golden lioness, infinity symbol of light above her head, lotus flowers, soft rose background, quiet courage |
| `the-lovers` | Two graceful silhouettes facing each other beneath a large glowing sun and angelic light, intertwined flowering vines, a golden heart motif, tender and harmonious |
| `the-chariot` | A determined woman silhouette riding a celestial chariot drawn by two softly glowing swans (one ivory, one rose), crescent moons on the chariot, star-canopy above, forward motion |
| `wheel-of-fortune` | A large ornate golden wheel with zodiac-like moon and star symbols floating in a pink-burgundy sky, small clouds and flowers around it, gentle sense of movement and good timing |
| `the-magician` | A confident woman silhouette raising a golden wand with one hand, infinity symbol glowing above, a table with a cup, a coin, a wand and a blade of light, roses and lilies around, creative energy |
| `temperance` | A winged woman silhouette gently pouring glowing water between two golden cups, one foot on land one in water, iris flowers, soft sunrise on the horizon, balanced and calm |
| `the-high-priestess` | A serene priestess silhouette between a pale pillar and a dusky pillar, glowing crescent moon crown, a veil decorated with pomegranates and stars, soft blue-rose moonlight, intuitive and still |
| `ace-of-cups` | A gentle hand emerging from a cloud holding a golden chalice overflowing with water and rose petals, a white dove above, lotus flowers on calm water, open-hearted |
| `ace-of-pentacles` | A gentle hand emerging from a cloud holding a large golden coin engraved with a star, a blooming garden path and arch of flowers below, soft green-gold and rose tones, a fresh beginning |
| `six-of-wands` | A victorious woman silhouette on a white horse wearing a laurel wreath, a wand tied with a laurel crown, five wands raised by a cheering crowd of soft silhouettes, confetti petals, proud and celebrated |
| `nine-of-cups` | A content woman silhouette seated in front of an arc of nine golden cups on a shelf, warm velvet curtain, soft candlelight, tea-rose petals, satisfied and cozy |
| `ten-of-cups` | A joyful family and friends silhouettes embracing beneath a rainbow of ten golden cups, a cottage in a blooming meadow, warm sunset in rose and gold, togetherness |
| `queen-of-cups` | A dreamy queen silhouette seated on a shell-shaped throne by the sea, holding an ornate golden cup, waves and soft foam, pearls and moonlight, empathetic and gentle |
| `queen-of-pentacles` | A warm queen silhouette seated on a throne wrapped in flowers and fruit in a lush garden, holding a golden coin like a precious gift, a small rabbit nearby, cozy and grounded |
| `page-of-wands` | A cheerful young woman silhouette in a desert-rose landscape holding a sprouting golden wand and looking up at it with curiosity, small flames of light and flowers, adventurous and fresh |
| `three-of-cups` | Three women silhouettes in flowing gowns raising golden cups in a toast, garlands of flowers and fruit, soft petals in the air, joyful friendship and celebration |

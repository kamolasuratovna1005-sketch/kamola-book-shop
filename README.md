# Kamolaning Kutubxonasi — Django versiyasi

Shaxsiy, bitta foydalanuvchilik onlayn kutubxona. **Login yoki parol talab qilinmaydi** —
sayt ochilgan zahoti kitob qo'shish, tekshirish va boshqarish mumkin. Ma'lumotlar
ma'lumotlar bazasida saqlanadi (lokalda `db.sqlite3`, hostingda Postgres) va hech
qanday tozalash/reset ishlatilmaguncha o'chib ketmaydi.

## Ishga tushirish

```powershell
cd "C:\Users\ISHONCH\Desktop\book shop"
.\venv\Scripts\Activate.ps1
python manage.py runserver
```

Brauzerda oching: http://127.0.0.1:8000/ — hech qanday kirish talab qilinmaydi.

## Admin panel (ixtiyoriy)

`/admin/` sahifasi Django'ning o'z, alohida hisob tizimidan foydalanadi (bu saytga
kirish uchun emas, faqat kitoblar bazasini jadval ko'rinishida ko'rish/tahrirlash
uchun qulaylik). Kerak bo'lsa:

```powershell
python manage.py createsuperuser
```

so'ng http://127.0.0.1:8000/admin/ orqali kiring.

## Loyihaning tuzilishi

- `library/` — kitob modeli (nomi, muallifi, janri, holati: rejada/o'qilmoqda/o'qilgan,
  muqova rasmi, har bir kitobga avtomatik rang beriladigan "spine"), CRUD
- `core/` — 5 tilli tarjima tizimi (`core/translations.py`), til/tema almashtirish
- `templates/`, `static/` — HTML shablonlar, CSS/JS va fon rasmi (`static/images/library-bg.jpg`)
- `legacy-static-site/` — eng avvalgi statik (Firebase asosidagi) versiya, endi ishlatilmaydi

## Tillar va rejim

Yuqori panelda til (o'zbek, rus, turk, arab, ingliz) va kunduzgi/kechki rejimni
almashtirish mumkin. Arab tili tanlanganda sahifa avtomatik o'ngdan-chapga (RTL) formatga o'tadi.

## Internetga joylashtirish (Render.com, bepul)

Loyiha allaqachon production uchun tayyor: `Procfile`, `render.yaml`, WhiteNoise
(statik fayllar uchun) va Postgres (`DATABASE_URL` orqali) qo'llab-quvvatlanadi.

**Muhim**: login yo'qligi sababli, sayt manzilini (linkni) kimga bersangiz, o'sha
kishi kitob qo'sha/o'chira oladi. Linkni faqat ishonchli odamlarga bering.

1. **GitHub**: yangi, bo'sh repository yarating (README/gitignore qo'shmasdan).
   `C:\Users\ISHONCH\Desktop\kamola-kutubxona-github` papkasi ichidagi barcha
   fayl/papkalarni (papkaning o'zini emas, ichidagilarni) GitHub'ning
   "uploading an existing file" oynasiga sudrab tashlang va commit qiling.
2. **Render.com**: GitHub orqali ro'yxatdan o'ting → Dashboard → **New +** →
   **Blueprint** → yangi repongizni tanlang. Render `render.yaml`ni o'qib,
   Postgres bazasi va web-xizmatni avtomatik yaratadi.
3. Deploy tugagach (bir necha daqiqa), Render sizga `https://kamola-kutubxona-xxxx.onrender.com`
   kabi doimiy link beradi — shu link telefon, planshet yoki istalgan qurilmadan ochiladi.
4. **Admin kerak bo'lsa**: Render'dagi xizmat sahifasida **Shell** bo'limini oching va:
   ```
   python manage.py createsuperuser
   ```

**Bepul reja cheklovlari**: web-xizmat 15 daqiqa faolsiz qolsa "uxlab qoladi"
va keyingi so'rovda ~30-60 soniya uyg'onadi; kitoblar ma'lumoti (Postgres) doimiy
saqlanadi, lekin yuklangan **muqova rasmlari** diskning vaqtinchaligi sababli qayta
deploy/restart'da yo'qolishi mumkin — agar bu muhim bo'lsa, keyinroq tashqi rasm
xotirasi (masalan Cloudinary) ulashni so'rang.

## Lokal ishlatish uchun eslatma

Lokal ishga tushirishda (`DEBUG=True`, sqlite) hech narsa o'zgarmaydi — yuqoridagi
"Ishga tushirish" bo'limi kabi davom eting.

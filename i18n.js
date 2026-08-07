const TRANSLATIONS = {
  uz: {
    eyebrow: "Shaxsiy to'plam",
    title: "Kamolaning Kutubxonasi",
    subtitle: "Kitob xarid qilishdan oldin — avval shu yerda tekshiring",
    checkTitle: "Kitobni tekshirish",
    checkPlaceholder: "Kitob nomini kiriting...",
    checkButton: "Tekshirish",
    addTitle: "Yangi kitob qo'shish",
    namePlaceholder: "Kitob nomi",
    authorPlaceholder: "Muallifi (ixtiyoriy)",
    coverPick: "📷 Muqova rasmi (ixtiyoriy)",
    addButton: "Qo'shish",
    shelfTitle: "To'plamim",
    statusUnread: "O'qilmagan",
    statusReading: "O'qilmoqda",
    statusDone: "O'qilgan",
    startedLabel: d => `Boshlandi: ${d}`,
    finishedLabel: d => `Tugatildi: ${d}`,
    loadingText: "Yuklanmoqda...",
    emptyShelf: "Hozircha kitob qo'shilmagan. Yuqoridan birinchi kitobingizni qo'shing.",
    foundText: "Bu kitob sizda bor!",
    foundSub: (name, author) => `"${name}"${author ? ' — ' + author : ''} to'plamingizda mavjud.`,
    missingText: "Bu kitob sizda yo'q.",
    missingSub: "Xarid qilishingiz mumkin — keyin shu yerga qo'shib qo'ying.",
    count: n => `${n} ta`,
    themeToLight: "Kunduzgi rejimga o'tish",
    themeToDark: "Kechki rejimga o'tish"
  },
  ru: {
    eyebrow: "Личная коллекция",
    title: "Библиотека Камолы",
    subtitle: "Прежде чем купить книгу — сначала проверьте здесь",
    checkTitle: "Проверить книгу",
    checkPlaceholder: "Введите название книги...",
    checkButton: "Проверить",
    addTitle: "Добавить новую книгу",
    namePlaceholder: "Название книги",
    authorPlaceholder: "Автор (необязательно)",
    coverPick: "📷 Обложка (необязательно)",
    addButton: "Добавить",
    shelfTitle: "Моя коллекция",
    statusUnread: "Не прочитано",
    statusReading: "Читаю",
    statusDone: "Прочитано",
    startedLabel: d => `Начато: ${d}`,
    finishedLabel: d => `Закончено: ${d}`,
    loadingText: "Загрузка...",
    emptyShelf: "Пока нет добавленных книг. Добавьте первую книгу выше.",
    foundText: "Эта книга у вас уже есть!",
    foundSub: (name, author) => `«${name}»${author ? ' — ' + author : ''} есть в вашей коллекции.`,
    missingText: "У вас нет этой книги.",
    missingSub: "Можете купить её — потом добавьте сюда.",
    count: n => `Книг: ${n}`,
    themeToLight: "Включить дневной режим",
    themeToDark: "Включить ночной режим"
  },
  tr: {
    eyebrow: "Özel koleksiyon",
    title: "Kamola'nın Kütüphanesi",
    subtitle: "Bir kitap satın almadan önce — önce burada kontrol edin",
    checkTitle: "Kitabı kontrol et",
    checkPlaceholder: "Kitap adını girin...",
    checkButton: "Kontrol et",
    addTitle: "Yeni kitap ekle",
    namePlaceholder: "Kitap adı",
    authorPlaceholder: "Yazar (isteğe bağlı)",
    coverPick: "📷 Kapak resmi (isteğe bağlı)",
    addButton: "Ekle",
    shelfTitle: "Koleksiyonum",
    statusUnread: "Okunmadı",
    statusReading: "Okunuyor",
    statusDone: "Okundu",
    startedLabel: d => `Başlangıç: ${d}`,
    finishedLabel: d => `Bitiş: ${d}`,
    loadingText: "Yükleniyor...",
    emptyShelf: "Henüz kitap eklenmedi. Yukarıdan ilk kitabınızı ekleyin.",
    foundText: "Bu kitap zaten sizde var!",
    foundSub: (name, author) => `"${name}"${author ? ' — ' + author : ''} koleksiyonunuzda mevcut.`,
    missingText: "Bu kitap sizde yok.",
    missingSub: "Satın alabilirsiniz — sonra buraya ekleyin.",
    count: n => `${n} kitap`,
    themeToLight: "Gündüz moduna geç",
    themeToDark: "Gece moduna geç"
  },
  ar: {
    eyebrow: "مجموعة شخصية",
    title: "مكتبة كامولا",
    subtitle: "قبل شراء كتاب — تحقق هنا أولاً",
    checkTitle: "تحقق من كتاب",
    checkPlaceholder: "أدخل اسم الكتاب...",
    checkButton: "تحقق",
    addTitle: "إضافة كتاب جديد",
    namePlaceholder: "اسم الكتاب",
    authorPlaceholder: "المؤلف (اختياري)",
    coverPick: "📷 صورة الغلاف (اختياري)",
    addButton: "إضافة",
    shelfTitle: "مجموعتي",
    statusUnread: "لم تُقرأ",
    statusReading: "قيد القراءة",
    statusDone: "تمت القراءة",
    startedLabel: d => `بدأت: ${d}`,
    finishedLabel: d => `انتهت: ${d}`,
    loadingText: "جارٍ التحميل...",
    emptyShelf: "لم تتم إضافة أي كتاب بعد. أضف كتابك الأول أعلاه.",
    foundText: "هذا الكتاب موجود لديك بالفعل!",
    foundSub: (name, author) => `"${name}"${author ? ' — ' + author : ''} موجود في مجموعتك.`,
    missingText: "هذا الكتاب غير موجود لديك.",
    missingSub: "يمكنك شراؤه — ثم أضفه هنا.",
    count: n => `${n} كتاب`,
    themeToLight: "التبديل إلى الوضع النهاري",
    themeToDark: "التبديل إلى الوضع الليلي"
  },
  en: {
    eyebrow: "Personal collection",
    title: "Kamola's Library",
    subtitle: "Before buying a book — check here first",
    checkTitle: "Check a book",
    checkPlaceholder: "Enter a book title...",
    checkButton: "Check",
    addTitle: "Add a new book",
    namePlaceholder: "Book title",
    authorPlaceholder: "Author (optional)",
    coverPick: "📷 Cover image (optional)",
    addButton: "Add",
    shelfTitle: "My collection",
    statusUnread: "Unread",
    statusReading: "Reading",
    statusDone: "Read",
    startedLabel: d => `Started: ${d}`,
    finishedLabel: d => `Finished: ${d}`,
    loadingText: "Loading...",
    emptyShelf: "No books added yet. Add your first book above.",
    foundText: "You already have this book!",
    foundSub: (name, author) => `"${name}"${author ? ' — ' + author : ''} is already in your collection.`,
    missingText: "You don't have this book.",
    missingSub: "You can buy it — then add it here.",
    count: n => `${n} books`,
    themeToLight: "Switch to day mode",
    themeToDark: "Switch to night mode"
  }
};

const RTL_LANGS = ['ar'];
let currentLang = localStorage.getItem('kk_lang') || 'uz';

function t(key, ...args){
  const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.uz;
  const entry = dict[key] ?? TRANSLATIONS.uz[key];
  return typeof entry === 'function' ? entry(...args) : entry;
}

function applyLanguage(lang){
  currentLang = TRANSLATIONS[lang] ? lang : 'uz';
  localStorage.setItem('kk_lang', currentLang);

  document.documentElement.lang = currentLang;
  document.documentElement.dir = RTL_LANGS.includes(currentLang) ? 'rtl' : 'ltr';

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.placeholder = t(key);
  });
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    el.title = t(key);
  });

  const langSelect = document.getElementById('langSelect');
  if(langSelect) langSelect.value = currentLang;

  if(typeof onLanguageChanged === 'function') onLanguageChanged();
}

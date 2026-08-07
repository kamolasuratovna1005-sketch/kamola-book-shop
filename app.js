const SPINE_COLORS = ['#6B1F2A','#C9A35C','#3F6B4A','#4A6B8A','#8A5A3F','#7A4A6B'];
const STORAGE_KEY = 'kk_books';

let books = loadBooks();
let pendingCover = null;

function spineColor(idx){
  return SPINE_COLORS[idx % SPINE_COLORS.length];
}

function normalize(s){
  return s.trim().toLowerCase();
}

const UZ_LETTER_ORDER = "abdefghijklmnopqrstuvxyz";

function uzTokenize(str){
  const s = str.toLowerCase().replace(/[ʻʼ`´]/g, "'");
  const tokens = [];
  let i = 0;
  while(i < s.length){
    const two = s.slice(i, i + 2);
    if(two === 'sh' || two === 'ch'){
      tokens.push(two); i += 2; continue;
    }
    if((s[i] === 'o' || s[i] === 'g') && s[i + 1] === "'"){
      tokens.push(s[i] + "'"); i += 2; continue;
    }
    tokens.push(s[i]); i += 1;
  }
  return tokens;
}

function uzRank(token){
  if(token === "o'") return 25;
  if(token === "g'") return 26;
  if(token === 'sh') return 27;
  if(token === 'ch') return 28;
  if(token === "'") return 29;
  const idx = UZ_LETTER_ORDER.indexOf(token);
  return idx >= 0 ? idx : 30 + (token.codePointAt(0) || 0);
}

function uzCompare(a, b){
  const ta = uzTokenize(a || '');
  const tb = uzTokenize(b || '');
  const len = Math.max(ta.length, tb.length);
  for(let i = 0; i < len; i++){
    if(i >= ta.length) return -1;
    if(i >= tb.length) return 1;
    const diff = uzRank(ta[i]) - uzRank(tb[i]);
    if(diff !== 0) return diff;
  }
  return 0;
}

function todayISO(){
  return new Date().toISOString().slice(0, 10);
}

function formatDate(iso){
  if(!iso) return '';
  const [y, m, d] = iso.split('-');
  return `${d}.${m}.${y}`;
}

function escapeHtml(str){
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function loadBooks(){
  try{
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  }catch(e){
    return [];
  }
}

function saveBooks(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

function render(){
  const area = document.getElementById('shelfArea');
  const countTag = document.getElementById('countTag');
  countTag.textContent = t('count', books.length);

  if(books.length === 0){
    area.innerHTML = `<div class="empty">${escapeHtml(t('emptyShelf'))}</div>`;
    return;
  }

  const sorted = [...books].sort((a,b)=> uzCompare(a.name, b.name));
  area.innerHTML = '<div class="shelf">' + sorted.map((b,i)=>{
    const status = b.status || 'unread';
    const dateBits = [];
    if(b.startDate) dateBits.push(t('startedLabel', formatDate(b.startDate)));
    if(b.endDate) dateBits.push(t('finishedLabel', formatDate(b.endDate)));
    return `
    <div class="book-item">
      ${b.cover
        ? `<img class="book-cover" src="${b.cover}" alt="">`
        : `<div class="spine" style="background:${spineColor(i)}"></div>`}
      <div class="book-info">
        <div class="book-name">${escapeHtml(b.name)}</div>
        ${b.author ? `<div class="book-author">${escapeHtml(b.author)}</div>` : ''}
        ${dateBits.length ? `<div class="book-dates">${dateBits.map(escapeHtml).join(' · ')}</div>` : ''}
      </div>
      <select class="status-select status-${status}" data-id="${b.id}">
        <option value="unread" ${status==='unread'?'selected':''}>${escapeHtml(t('statusUnread'))}</option>
        <option value="reading" ${status==='reading'?'selected':''}>${escapeHtml(t('statusReading'))}</option>
        <option value="done" ${status==='done'?'selected':''}>${escapeHtml(t('statusDone'))}</option>
      </select>
      <button class="btn-del" data-id="${b.id}" title="✕">✕</button>
    </div>
  `;
  }).join('') + '</div>';

  area.querySelectorAll('.btn-del').forEach(btn=>{
    btn.addEventListener('click', ()=> deleteBook(btn.dataset.id));
  });

  area.querySelectorAll('.status-select').forEach(sel=>{
    sel.addEventListener('change', ()=> updateStatus(sel.dataset.id, sel.value));
  });

  area.querySelectorAll('.book-cover').forEach((img,i)=>{
    img.addEventListener('error', ()=>{
      const spine = document.createElement('div');
      spine.className = 'spine';
      spine.style.background = spineColor(i);
      img.replaceWith(spine);
    }, { once:true });
  });
}

function updateStatus(id, status){
  const book = books.find(b => b.id === id);
  if(!book) return;
  book.status = status;
  if(status === 'unread'){
    book.startDate = null;
    book.endDate = null;
  }else if(status === 'reading'){
    if(!book.startDate) book.startDate = todayISO();
    book.endDate = null;
  }else if(status === 'done'){
    if(!book.startDate) book.startDate = todayISO();
    if(!book.endDate) book.endDate = todayISO();
  }
  render();
  saveBooks();
}

function readCoverFile(file){
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const maxW = 120;
        const scale = Math.min(1, maxW / img.width);
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        canvas.getContext('2d').drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', 0.75));
      };
      img.onerror = reject;
      img.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function clearCoverPicker(){
  pendingCover = null;
  document.getElementById('coverInput').value = '';
  document.getElementById('coverPreview').style.display = 'none';
  document.getElementById('coverPickerText').style.display = '';
  document.getElementById('coverClearBtn').style.display = 'none';
}

async function fetchBookCover(name, author){
  try{
    let q = `intitle:${name}`;
    if(author) q += `+inauthor:${author}`;
    const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(q)}&maxResults=1`);
    if(!res.ok) return null;
    const data = await res.json();
    const links = data.items && data.items[0] && data.items[0].volumeInfo && data.items[0].volumeInfo.imageLinks;
    const url = links && (links.thumbnail || links.smallThumbnail);
    return url ? url.replace('http://', 'https://') : null;
  }catch(e){
    console.error('Kitob rasmini qidirishda xatolik:', e);
    return null;
  }
}

async function addBook(){
  const nameInput = document.getElementById('nameInput');
  const authorInput = document.getElementById('authorInput');
  const name = nameInput.value.trim();
  const author = authorInput.value.trim();
  if(!name) { nameInput.focus(); return; }

  const manualCover = pendingCover;
  const book = { id: Date.now().toString(), name, author, cover: manualCover, status: 'unread', startDate: null, endDate: null };
  books.push(book);
  nameInput.value = '';
  authorInput.value = '';
  clearCoverPicker();
  nameInput.focus();
  render();
  saveBooks();

  if(!manualCover){
    const found = await fetchBookCover(name, author);
    if(found && !book.cover){
      book.cover = found;
      render();
      saveBooks();
    }
  }
}

function deleteBook(id){
  books = books.filter(b => b.id !== id);
  render();
  saveBooks();
}

function checkBook(){
  const input = document.getElementById('checkInput');
  const query = normalize(input.value);
  const box = document.getElementById('resultBox');

  if(!query){
    input.focus();
    return;
  }

  const match = books.find(b => {
    const n = normalize(b.name);
    return n === query || n.includes(query) || query.includes(n);
  });

  box.className = 'result show ' + (match ? 'found' : 'missing');
  if(match){
    box.innerHTML = `<span class="icon">✅</span><span>${escapeHtml(t('foundText'))}<span class="sub">${escapeHtml(t('foundSub', match.name, match.author))}</span></span>`;
  }else{
    box.innerHTML = `<span class="icon">🛒</span><span>${escapeHtml(t('missingText'))}<span class="sub">${escapeHtml(t('missingSub'))}</span></span>`;
  }
}

function onLanguageChanged(){
  render();
  const box = document.getElementById('resultBox');
  if(box) box.className = 'result';
}

function applyTheme(theme){
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('kk_theme', theme);
  const btn = document.getElementById('themeToggle');
  btn.textContent = theme === 'dark' ? '☀️' : '🌙';
  btn.title = theme === 'dark' ? t('themeToLight') : t('themeToDark');
}

document.getElementById('addBtn').addEventListener('click', addBook);
document.getElementById('checkBtn').addEventListener('click', checkBook);
document.getElementById('nameInput').addEventListener('keydown', e=>{ if(e.key==='Enter') addBook(); });
document.getElementById('authorInput').addEventListener('keydown', e=>{ if(e.key==='Enter') addBook(); });
document.getElementById('checkInput').addEventListener('keydown', e=>{ if(e.key==='Enter') checkBook(); });

document.getElementById('coverInput').addEventListener('change', async e => {
  const file = e.target.files[0];
  if(!file) return;
  try{
    pendingCover = await readCoverFile(file);
    const preview = document.getElementById('coverPreview');
    preview.src = pendingCover;
    preview.style.display = '';
    document.getElementById('coverPickerText').style.display = 'none';
    document.getElementById('coverClearBtn').style.display = '';
  }catch(err){
    console.error("Rasmni o'qishda xatolik:", err);
  }
});

document.getElementById('coverClearBtn').addEventListener('click', clearCoverPicker);

document.getElementById('langSelect').addEventListener('change', e => applyLanguage(e.target.value));

document.getElementById('themeToggle').addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

applyLanguage(currentLang);
applyTheme(localStorage.getItem('kk_theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
render();

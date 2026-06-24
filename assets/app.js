/* C & C Distribuidora - v79
   Script limpo: remove camadas antigas, estabiliza menu, loja, imagens, carrinho e Firebase.
*/
'use strict';

let CEC_WHATSAPP = '556730424796';
let CEC_PIX_KEY = '37492135000121';
let CEC_PIX_KEY_DISPLAY = '37.492.135/0001-21';
let CEC_PIX_MERCHANT_NAME = 'C&C DISTRIBUIDORA';
let CEC_PIX_MERCHANT_CITY = 'CAMPO GRANDE';

// Admin v82 usa Firebase Authentication. A senha não fica mais fixa no app.js.
const FB_COLLECTION = 'cec_ecommerce_online';

const CEC_DEFAULT_PRODUCTS = [
  {id:1, name:'Toner Compatível Samsung D204 MLT-D204U', category:'Toner', price:105, tag:'Destaque', stock:12, desc:'Toner compatível para alta produtividade em impressoras Samsung.', image:'assets/img/prod-toner.svg'},
  {id:2, name:'Cartucho HP 954XL Amarelo Compatível', category:'Cartucho', price:100, tag:'HP 954XL', stock:8, desc:'Cartucho de tinta amarelo compatível com HP 954XL.', image:'assets/img/prod-cartucho.svg'},
  {id:3, name:'Cartucho HP 954XL Ciano Compatível', category:'Cartucho', price:100, tag:'HP 954XL', stock:8, desc:'Cartucho de tinta ciano compatível com HP 954XL.', image:'assets/img/prod-cartucho.svg'},
  {id:4, name:'Cartucho HP 954XL Preto Compatível', category:'Cartucho', price:120, tag:'HP 954XL', stock:10, desc:'Cartucho de tinta preto compatível com HP 954XL.', image:'assets/img/prod-cartucho.svg'},
  {id:5, name:'Cartucho HP 954XL Magenta Compatível', category:'Cartucho', price:120, tag:'HP 954XL', stock:8, desc:'Cartucho de tinta magenta compatível com HP 954XL.', image:'assets/img/prod-cartucho.svg'},
  {id:6, name:'Cartucho HP 664XL Colorido Compatível', category:'Cartucho', price:120, tag:'Colorido', stock:6, desc:'Cartucho colorido compatível HP 664XL.', image:'assets/img/prod-cartucho.svg'},
  {id:7, name:'Cartucho HP 664XL Preto Compatível', category:'Cartucho', price:110, tag:'Preto', stock:7, desc:'Cartucho preto compatível HP 664XL.', image:'assets/img/prod-cartucho.svg'},
  {id:8, name:'Cartucho HP 662XL Preto Compatível', category:'Cartucho', price:100, tag:'Preto', stock:5, desc:'Cartucho preto compatível HP 662XL.', image:'assets/img/prod-cartucho.svg'},
  {id:9, name:'Cartucho HP 662XL Colorido Compatível', category:'Cartucho', price:100, tag:'Colorido', stock:5, desc:'Cartucho colorido compatível HP 662XL.', image:'assets/img/prod-cartucho.svg'},
  {id:10, name:'Cartucho HP 122XL Colorido 13ml', category:'Cartucho', price:120, tag:'13ml', stock:4, desc:'Cartucho colorido compatível HP 122XL 13ml.', image:'assets/img/prod-cartucho.svg'},
  {id:11, name:'Cartucho HP 122XL Preto 12ml', category:'Cartucho', price:120, tag:'12ml', stock:4, desc:'Cartucho preto compatível HP 122XL 12ml.', image:'assets/img/prod-cartucho.svg'},
  {id:12, name:'Toner Brother TN-B021', category:'Toner', price:41, tag:'Brother', stock:14, desc:'Toner compatível Brother TN-B021.', image:'assets/img/prod-toner.svg'},
  {id:13, name:'Fotocondutor Compatível para Impressora', category:'Fotocondutor', price:89, tag:'Reposição', stock:3, desc:'Fotocondutor compatível. Consulte o modelo correto antes de finalizar o pedido.', image:'assets/img/prod-fotocondutor.svg'}
];

const CEC_DEFAULT_SITE_CONFIG = {
  companyName: 'C & C Distribuidora',
  slogan: 'Materiais de alta qualidade para atender às suas necessidades.',
  institutionalText: 'Escrevemos em nome da empresa C&C Distribuidora de toners e cartuchos, com a excelência em atendimento e serviços, que só poderia ser possível com a dedicação de sua equipe, vem ampliando consideravelmente sua carteira de clientes, pois atende todas as necessidades dos que em nós depositam confiança. Qualidade, empenho, seriedade e segurança, fazem desta empresa consolidada no mercado, formando forte parceria junto aos seus clientes.',
  shortDescription: 'Encontre cartuchos, toners, fotocondutores e suprimentos de impressão com atendimento especializado em Campo Grande/MS.',
  emailSales: 'vendas@cecvendas.com',
  emailWarranty: 'garantia@cecvendas.com',
  whatsappMain: '556730424796',
  whatsappMainDisplay: '67 3042 - 4796',
  whatsappSupport: '5567981626428',
  whatsappSupportDisplay: '67 98162 - 6428',
  addressLine1: 'Rua Eudes Costa, N° 85',
  addressLine2: 'Jardim Morenão - CEP 79.070-094',
  cityStateCountry: 'Campo Grande - Mato Grosso do Sul - Brasil',
  cnpj: '37.492.135/0001-21',
  hoursWeek: 'Seg - Sex: 8:00 - 17:00',
  hoursSaturday: 'Sábado: Fechado',
  hoursSunday: 'Domingo: Fechado',
  pixKey: '37492135000121',
  pixKeyDisplay: '37.492.135/0001-21',
  pixMerchantName: 'C&C DISTRIBUIDORA',
  pixMerchantCity: 'CAMPO GRANDE',
  seoTitle: 'C & C Distribuidora | Toners, Cartuchos e Suprimentos de Impressão em Campo Grande/MS',
  seoDescription: 'C & C Distribuidora em Campo Grande/MS: venda de cartuchos, toners, fotocondutores e suprimentos de impressão para empresas e clientes finais.',
  seoKeywords: 'toner Campo Grande, cartucho Campo Grande, cartucho HP, toner Brother, toner Samsung, fotocondutor, suprimentos de impressão Campo Grande MS, C&C Distribuidora',
  deliveryPolicy: 'Realizamos nossas entregas por transportadoras contratadas ou pelos Correios, dependendo do local de entrega. Entregamos para todo o território nacional, todos os produtos disponíveis para venda em nosso site. Não é possível fazer agendamento de data e horário para entregas. O recebimento da mercadoria poderá ser realizado por terceiros, como porteiros de condomínios e familiares, desde que assinem o comprovante de recebimento da mercadoria. O prazo de entrega varia para cada região do país, sendo informado no ato da compra.',
  returnPolicy: 'Oferecemos aos nossos clientes produtos de qualidade, buscando parcerias com os melhores fornecedores nas diversas categorias que comercializamos. Para garantir a satisfação e manter a transparência e respeito com nossos clientes, criamos nossa política de troca e devolução tendo como base o Código de Defesa do Consumidor. As ocorrências que envolvam troca ou devolução devem ser comunicadas à Central de Atendimento ao Cliente através do e-mail de garantia.'
};

const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));
const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
const fmt = v => Number(v || 0).toLocaleString('pt-BR', {style:'currency', currency:'BRL'});
const parseMoney = value => Number(String(value ?? '').replace(/\./g,'').replace(',','.').replace(/[^0-9.\-]/g,'')) || 0;
const digitsOnly = value => String(value || '').replace(/\D/g,'');
const nowText = () => new Date().toLocaleString('pt-BR');
const clone = value => JSON.parse(JSON.stringify(value ?? null));
const docId = id => String(id ?? '');

function readJson(key, fallback){
  try{
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) ?? fallback) : fallback;
  }catch(e){ return fallback; }
}
function writeJson(key, value){
  try{ localStorage.setItem(key, JSON.stringify(value)); }catch(e){ console.warn('localStorage:', key, e); }
}
function toast(message){
  const el = $('#toast');
  if(!el) return;
  el.textContent = message;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2200);
}

let PRODUCTS = readJson('cec_products', CEC_DEFAULT_PRODUCTS);
let ORDERS = readJson('cec_orders', []);
let SITE_CONFIG = {...CEC_DEFAULT_SITE_CONFIG, ...readJson('cec_site_config', {})};
let SHOP_RENDER_KEY = '';
let CATEGORY_RENDER_KEY = '';
let ACTIVE_CATEGORY = 'Todos';
const SHOP_PAGE_SIZE = 15;
let SHOP_PAGE = 1;

let SHOP_FIRST_STABLE_RENDER = false;
let SHOP_WAITING_STABLE = false;

function setShopLoadingState(active){
  const grid = $('#productGrid');
  if(!grid) return;
  if(active){
    grid.classList.add('shop-grid-loading-v83');
    if(!grid.innerHTML.trim()){
      grid.innerHTML = '<div class="shop-loading-v83"><strong>Carregando produtos...</strong><span>Aguarde um instante.</span></div>';
    }
  }else{
    grid.classList.remove('shop-grid-loading-v83');
    grid.classList.add('shop-grid-ready-v83');
  }
}

function waitImagesStable(container, timeout=2200){
  const imgs = Array.from(container.querySelectorAll('img'));
  if(!imgs.length) return Promise.resolve();

  const promises = imgs.map(img => new Promise(resolve => {
    if(img.complete && img.naturalWidth > 0) return resolve();
    let done = false;
    const finish = () => {
      if(done) return;
      done = true;
      resolve();
    };
    img.addEventListener('load', finish, {once:true});
    img.addEventListener('error', finish, {once:true});
    setTimeout(finish, timeout);
  }));

  return Promise.all(promises);
}

function revealShopWhenStable(){
  const grid = $('#productGrid');
  if(!grid || SHOP_WAITING_STABLE) return;
  SHOP_WAITING_STABLE = true;

  waitImagesStable(grid).then(() => {
    SHOP_FIRST_STABLE_RENDER = true;
    SHOP_WAITING_STABLE = false;
    setShopLoadingState(false);
  });
}

function db(){
  return window.CEC_DB || null;
}
function fbDoc(name){
  return db()?.collection(FB_COLLECTION).doc(name);
}
function serverTimestamp(){
  try{ return firebase.firestore.FieldValue.serverTimestamp(); }catch(e){ return new Date().toISOString(); }
}
async function saveDoc(name, payload){
  const ref = fbDoc(name);
  if(!ref) return false;
  try{
    await ref.set({...payload, updatedAt: serverTimestamp(), updatedAtMs: Date.now()}, {merge:true});
    return true;
  }catch(e){
    console.error('Firebase:', e);
    toast('Não consegui salvar online. Confira o Firebase.');
    return false;
  }
}

function loadProducts(){ return Array.isArray(PRODUCTS) ? PRODUCTS : []; }
function saveProducts(products){
  PRODUCTS = Array.isArray(products) ? products : [];
  writeJson('cec_products', PRODUCTS);
  saveDoc('produtos', {items: PRODUCTS});
  renderAllProducts();
  return PRODUCTS;
}
function loadOrders(){ return Array.isArray(ORDERS) ? ORDERS : []; }
function saveOrders(orders){
  ORDERS = Array.isArray(orders) ? orders : [];
  writeJson('cec_orders', ORDERS);
  const index = {};
  ORDERS.forEach(o => { if(o?.code) index[o.code] = o; });
  writeJson('cec_orders_index', index);
  saveDoc('pedidos', {items: ORDERS});
  renderAdminOrders();
  return ORDERS;
}
function loadSiteConfig(){ return {...CEC_DEFAULT_SITE_CONFIG, ...SITE_CONFIG}; }
function saveSiteConfig(config){
  SITE_CONFIG = {...loadSiteConfig(), ...(config || {})};
  writeJson('cec_site_config', SITE_CONFIG);
  saveDoc('configuracoes', {config: SITE_CONFIG});
  applySiteConfig();
  return SITE_CONFIG;
}
function loadCart(){ return readJson('cec_cart', []); }
function saveCart(cart){ writeJson('cec_cart', Array.isArray(cart) ? cart : []); }

function subscribeFirebase(){
  if(!db()) return;

  fbDoc('produtos')?.onSnapshot(snap => {
    if(!snap.exists){
      saveDoc('produtos', {items: loadProducts()});
      return;
    }
    const data = snap.data() || {};
    const items = Array.isArray(data.items) ? data.items : [];
    if(JSON.stringify(items) === JSON.stringify(PRODUCTS)) return;
    PRODUCTS = items;
    writeJson('cec_products', PRODUCTS);
    preloadProductImages();
    SHOP_RENDER_KEY = '';
    renderAllProducts();
  }, err => console.error('Produtos Firebase:', err));

  fbDoc('pedidos')?.onSnapshot(snap => {
    if(!snap.exists){
      saveDoc('pedidos', {items: loadOrders()});
      return;
    }
    const data = snap.data() || {};
    const items = Array.isArray(data.items) ? data.items : [];
    if(JSON.stringify(items) === JSON.stringify(ORDERS)) return;
    ORDERS = items;
    writeJson('cec_orders', ORDERS);
    renderAdminOrders();
    renderTrackFromQuery();
  }, err => console.error('Pedidos Firebase:', err));

  fbDoc('configuracoes')?.onSnapshot(snap => {
    if(!snap.exists){
      saveDoc('configuracoes', {config: loadSiteConfig()});
      return;
    }
    const data = snap.data() || {};
    const config = data.config || {};
    const next = {...CEC_DEFAULT_SITE_CONFIG, ...config};
    if(JSON.stringify(next) === JSON.stringify(SITE_CONFIG)) return;
    SITE_CONFIG = next;
    writeJson('cec_site_config', SITE_CONFIG);
    applySiteConfig();
    fillSiteConfigForm();
  }, err => console.error('Config Firebase:', err));
}

function waUrl(number){
  const n = digitsOnly(number).replace(/^55/,'');
  return 'https://wa.me/55' + n;
}
function mailCompose(email){
  return 'https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(email || '');
}
function applySiteConfig(){
  const cfg = loadSiteConfig();
  CEC_WHATSAPP = cfg.whatsappMain;
  CEC_PIX_KEY = cfg.pixKey;
  CEC_PIX_KEY_DISPLAY = cfg.pixKeyDisplay;
  CEC_PIX_MERCHANT_NAME = cfg.pixMerchantName;
  CEC_PIX_MERCHANT_CITY = cfg.pixMerchantCity;

  $$('[data-config]').forEach(el => {
    const key = el.dataset.config;
    const val = cfg[key] ?? '';
    if(el.tagName === 'A' && key && key.toLowerCase().includes('email')){
      el.href = mailCompose(val);
      el.textContent = val;
    }else{
      el.innerHTML = esc(val).replace(/\n/g, '<br>');
    }
  });

  $$('[data-config-text]').forEach(el => {
    const key = el.dataset.configText;
    el.textContent = cfg[key] ?? '';
  });

  $$('[data-wa-main]').forEach(a => a.href = waUrl(cfg.whatsappMain));
  $$('[data-wa-support]').forEach(a => a.href = waUrl(cfg.whatsappSupport));
  $$('[data-email-sales]').forEach(a => { a.href = mailCompose(cfg.emailSales); a.textContent = cfg.emailSales; });
  $$('[data-email-warranty]').forEach(a => { a.href = mailCompose(cfg.emailWarranty); a.textContent = cfg.emailWarranty; });

  const title = $('title');
  if(title && cfg.seoTitle && !location.pathname.includes('admin')) title.textContent = cfg.seoTitle;
  const desc = document.querySelector('meta[name="description"]');
  if(desc && cfg.seoDescription) desc.setAttribute('content', cfg.seoDescription);
  const keywords = document.querySelector('meta[name="keywords"]');
  if(keywords && cfg.seoKeywords) keywords.setAttribute('content', cfg.seoKeywords);
}

function setupMenu(){
  const btn = $('#mobileToggle');
  const menu = $('#mainMenu');
  if(btn && menu){
    btn.addEventListener('click', () => menu.classList.toggle('open'));
  }
  // Menu principal fixo. Nenhuma categoria dinâmica entra no menu.
  $$('.nav-dropdown, .dropdown-menu').forEach(el => el.remove());
}

function productIcon(category){
  const c = String(category || '').toLowerCase();
  if(c.includes('toner')) return '▰';
  if(c.includes('fotocondutor')) return '◎';
  return '◧';
}
function defaultImageForCategory(category){
  const c = String(category || '').toLowerCase();
  if(c.includes('toner')) return 'assets/img/prod-toner.svg';
  if(c.includes('fotocondutor')) return 'assets/img/prod-fotocondutor.svg';
  return 'assets/img/prod-cartucho.svg';
}
function productImage(product){
  if(!product) return defaultImageForCategory('');
  if(product.imageData && String(product.imageData).startsWith('data:image/')) return product.imageData;
  if(product.image && String(product.image).startsWith('data:image/')) return product.image;
  if(product.image && String(product.image).trim()) return product.image;
  return defaultImageForCategory(product.category);
}

const PRELOADED_IMAGES = new Set();
const IMAGE_OPTIMIZE_STATE = {running:false, done:false};

function preloadProductImages(){
  loadProducts().forEach(product => {
    const src = productImage(product);
    if(!src || PRELOADED_IMAGES.has(src)) return;
    PRELOADED_IMAGES.add(src);
    const img = new Image();
    img.decoding = 'async';
    img.src = src;
  });
}

function compressDataUrlForStore(dataUrl, max=420, quality=0.66){
  return new Promise(resolve => {
    if(!dataUrl || !String(dataUrl).startsWith('data:image/')) return resolve(dataUrl);
    const img = new Image();
    img.onload = () => {
      try{
        let width = img.width || max;
        let height = img.height || max;
        if(width > max || height > max){
          const ratio = Math.min(max / width, max / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      }catch(e){
        resolve(dataUrl);
      }
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}

async function optimizeLargeProductImages(){
  if(IMAGE_OPTIMIZE_STATE.running || IMAGE_OPTIMIZE_STATE.done) return;
  const products = loadProducts();
  const big = products.filter(p => p && p.imageData && String(p.imageData).length > 180000);
  if(!big.length){
    IMAGE_OPTIMIZE_STATE.done = true;
    return;
  }

  IMAGE_OPTIMIZE_STATE.running = true;
  let changed = false;
  for(const product of products){
    if(product.imageData && String(product.imageData).length > 180000){
      const compressed = await compressDataUrlForStore(product.imageData);
      if(compressed && compressed.length < String(product.imageData).length){
        product.imageData = compressed;
        changed = true;
      }
    }
  }
  IMAGE_OPTIMIZE_STATE.running = false;
  IMAGE_OPTIMIZE_STATE.done = true;

  if(changed){
    PRODUCTS = products;
    writeJson('cec_products', PRODUCTS);
    saveDoc('produtos', {items: PRODUCTS});
    SHOP_RENDER_KEY = '';
    renderShopProducts();
    preloadProductImages();
  }
}
function normalizeCategory(value){
  return String(value || '').trim() || 'Outros';
}
function findProduct(id){
  return loadProducts().find(p => docId(p.id) === docId(id)) || null;
}

function renderCategories(){
  const box = $('#categoryFilters');
  if(!box) return;

  const cats = ['Todos', ...Array.from(new Set(loadProducts().map(p => normalizeCategory(p.category))))];
  const key = cats.join('|') + '::' + ACTIVE_CATEGORY;
  if(CATEGORY_RENDER_KEY === key) return;
  CATEGORY_RENDER_KEY = key;

  box.innerHTML = cats.map(cat => `<button class="${cat === ACTIVE_CATEGORY ? 'active' : ''}" type="button" data-shop-category="${esc(cat)}">${esc(cat)}</button>`).join('');
}
function filteredProducts(){
  const search = String($('#searchProduct')?.value || '').trim().toLowerCase();
  const sort = $('#sortProduct')?.value || 'featured';
  let list = loadProducts().filter(p => {
    const text = [p.name,p.category,p.tag,p.desc,p.brand,p.sku,p.color,p.compatiblePrinters,p.notes,p.type].filter(Boolean).join(' ').toLowerCase();
    return (!search || text.includes(search)) && (ACTIVE_CATEGORY === 'Todos' || normalizeCategory(p.category) === ACTIVE_CATEGORY);
  });

  if(sort === 'name') list.sort((a,b) => String(a.name||'').localeCompare(String(b.name||''), 'pt-BR'));
  if(sort === 'priceAsc') list.sort((a,b) => Number(a.price||0) - Number(b.price||0));
  if(sort === 'priceDesc') list.sort((a,b) => Number(b.price||0) - Number(a.price||0));

  return list;
}

function ensureShopPagination(){
  const grid = $('#productGrid');
  if(!grid) return null;

  let box = $('#shopPagination');
  if(!box){
    box = document.createElement('div');
    box.id = 'shopPagination';
    box.className = 'shop-pagination-v89';
    grid.insertAdjacentElement('afterend', box);
  }
  return box;
}

function renderShopPagination(total, page, pageCount){
  const box = ensureShopPagination();
  if(!box) return;

  if(total <= SHOP_PAGE_SIZE || pageCount <= 1){
    box.innerHTML = '';
    box.classList.add('hidden');
    return;
  }

  box.classList.remove('hidden');

  const from = ((page - 1) * SHOP_PAGE_SIZE) + 1;
  const to = Math.min(page * SHOP_PAGE_SIZE, total);

  const buttons = [];
  buttons.push(`<button type="button" class="shop-page-btn-v89" data-shop-page="${Math.max(1, page - 1)}" ${page === 1 ? 'disabled' : ''}>Anterior</button>`);

  for(let i = 1; i <= pageCount; i++){
    buttons.push(`<button type="button" class="shop-page-btn-v89 ${i === page ? 'active' : ''}" data-shop-page="${i}" aria-label="Página ${i}">${i}</button>`);
  }

  buttons.push(`<button type="button" class="shop-page-btn-v89" data-shop-page="${Math.min(pageCount, page + 1)}" ${page === pageCount ? 'disabled' : ''}>Próxima</button>`);

  box.innerHTML = `
    <div class="shop-page-info-v89">Mostrando ${from}-${to} de ${total} produtos • Página ${page} de ${pageCount}</div>
    <div class="shop-page-buttons-v89">${buttons.join('')}</div>
  `;
}

function shopCard(product){
  const src = productImage(product);
  const fallback = defaultImageForCategory(product.category);
  return `
    <article class="product-card card-clean-v67 card-clean-v73 card-clean-v79">
      <div class="card-image-v67 card-image-v73">
        <div class="product-art product-art-img product-art-v79">
          <span class="badge">${esc(product.tag || product.category || 'Produto')}</span>
          <img src="${esc(src)}" alt="${esc(product.name || 'Produto')}" loading="eager" decoding="async" fetchpriority="high"
               onerror="if(!this.dataset.fallback){this.dataset.fallback='1';this.src='${esc(fallback)}';}else{this.style.display='none';this.nextElementSibling.style.display='grid';}">
          <span class="fallback-icon">${productIcon(product.category)}</span>
        </div>
      </div>
      <div class="card-info-v67 card-info-v73">
        <h3 class="card-title-v67 card-title-v73" title="${esc(product.name || '')}">${esc(product.name || '')}</h3>
        <strong class="card-price-v67 card-price-v73">${fmt(product.price)}</strong>
        <div class="card-actions-v67 card-actions-v73">
          <div class="card-actions-top-v67 card-actions-top-v73">
            <input class="card-qty-v67 card-qty-v73" type="number" min="1" value="1" data-card-qty="${esc(product.id)}" aria-label="Quantidade">
            <button class="btn btn-outline" type="button" data-view-product="${esc(product.id)}">Ver</button>
          </div>
          <button class="btn btn-primary card-add-v67 card-add-v73" type="button" data-add-product="${esc(product.id)}">Adicionar</button>
        </div>
      </div>
    </article>`;
}
function renderShopProducts(){
  const grid = $('#productGrid');
  if(!grid) return;

  if(!SHOP_FIRST_STABLE_RENDER) setShopLoadingState(true);

  renderCategories();
  const list = filteredProducts();
  const total = list.length;
  const pageCount = Math.max(1, Math.ceil(total / SHOP_PAGE_SIZE));

  if(SHOP_PAGE > pageCount) SHOP_PAGE = pageCount;
  if(SHOP_PAGE < 1) SHOP_PAGE = 1;

  const start = (SHOP_PAGE - 1) * SHOP_PAGE_SIZE;
  const pageList = list.slice(start, start + SHOP_PAGE_SIZE);

  const resultLabel = pageCount > 1
    ? `${total} produto(s) • Página ${SHOP_PAGE} de ${pageCount}`
    : `${total} produto(s)`;
  $('#resultCount') && ($('#resultCount').textContent = resultLabel);

  const key = JSON.stringify({
    search: $('#searchProduct')?.value || '',
    sort: $('#sortProduct')?.value || '',
    category: ACTIVE_CATEGORY,
    page: SHOP_PAGE,
    pageSize: SHOP_PAGE_SIZE,
    products: list.map(p => ({id:p.id,name:p.name,cat:p.category,price:p.price,tag:p.tag,stock:p.stock,img:productImage(p)}))
  });
  if(SHOP_RENDER_KEY === key){
    renderShopPagination(total, SHOP_PAGE, pageCount);
    revealShopWhenStable();
    return;
  }
  SHOP_RENDER_KEY = key;

  grid.innerHTML = pageList.length
    ? pageList.map(shopCard).join('')
    : '<div class="muted-box">Nenhum produto encontrado. Limpe a busca ou escolha outra categoria.</div>';

  renderShopPagination(total, SHOP_PAGE, pageCount);
  preloadProductImages();
  revealShopWhenStable();
}
function renderAllProducts(){
  renderShopProducts();
  renderAdminProducts();
}
function setupShop(){
  if(!$('#productGrid')) return;

  $('#searchProduct')?.addEventListener('input', () => {
    SHOP_PAGE = 1;
    SHOP_RENDER_KEY = '';
    renderShopProducts();
  });

  $('#sortProduct')?.addEventListener('change', () => {
    SHOP_PAGE = 1;
    SHOP_RENDER_KEY = '';
    renderShopProducts();
  });

  $('#categoryFilters')?.addEventListener('click', e => {
    const btn = e.target.closest('[data-shop-category]');
    if(!btn) return;
    ACTIVE_CATEGORY = btn.dataset.shopCategory || 'Todos';
    SHOP_PAGE = 1;
    CATEGORY_RENDER_KEY = '';
    SHOP_RENDER_KEY = '';
    renderShopProducts();
  });

  document.addEventListener('click', e => {
    const pageBtn = e.target.closest('[data-shop-page]');
    if(!pageBtn) return;

    const nextPage = Number(pageBtn.dataset.shopPage || 1);
    if(!Number.isFinite(nextPage) || nextPage === SHOP_PAGE) return;

    SHOP_PAGE = nextPage;
    SHOP_RENDER_KEY = '';
    renderShopProducts();

    const grid = $('#productGrid');
    if(grid) grid.scrollIntoView({behavior:'smooth', block:'start'});
  });

  renderShopProducts();
}


function openModal(id){
  const modal = $(id);
  if(modal){
    modal.classList.add('open');
    document.body.classList.add('lock');
  }
}
function closeModal(modal){
  if(modal){
    modal.classList.remove('open');
    document.body.classList.remove('lock');
  }
}
function setupModals(){
  document.addEventListener('click', e => {
    const close = e.target.closest('[data-close-modal]');
    if(close){
      closeModal(close.closest('.modal'));
      return;
    }
    if(e.target.classList?.contains('modal')) closeModal(e.target);
  });
}
function openProductModal(id){
  const p = findProduct(id);
  if(!p) return;
  $('#productModalTitle') && ($('#productModalTitle').textContent = p.name || 'Produto');
  const body = $('#productModalBody');
  if(body){
    body.innerHTML = `
      <div class="modal-product-grid-v79">
        <div class="product-art product-art-img modal-product-art"><img src="${esc(productImage(p))}" alt="${esc(p.name || '')}"><span class="fallback-icon">${productIcon(p.category)}</span></div>
        <div>
          <p>${esc(p.desc || '')}</p>
          ${p.brand ? `<p><strong>Marca:</strong> ${esc(p.brand)}</p>` : ''}
          ${p.sku ? `<p><strong>Código/SKU:</strong> ${esc(p.sku)}</p>` : ''}
          ${p.color ? `<p><strong>Cor:</strong> ${esc(p.color)}</p>` : ''}
          ${p.yield ? `<p><strong>Rendimento:</strong> ${esc(p.yield)}</p>` : ''}
          ${p.compatiblePrinters ? `<p><strong>Compatível com:</strong><br>${esc(p.compatiblePrinters).replace(/\n/g,'<br>')}</p>` : ''}
          ${p.notes ? `<p><strong>Observações:</strong><br>${esc(p.notes).replace(/\n/g,'<br>')}</p>` : ''}
          <div class="price">${fmt(p.price)}</div>
          <br>
          <button class="btn btn-primary" type="button" data-add-product="${esc(p.id)}">Adicionar ao carrinho</button>
        </div>
      </div>`;
  }
  openModal('#productModal');
}

function cartProducts(){
  return loadCart().map(item => {
    const p = findProduct(item.id);
    const base = p ? {...p} : {...item};
    return {...base, id:item.id ?? base.id, qty:Math.max(1, Number(item.qty || 1)), name:base.name || 'Produto', price:Number(base.price || 0)};
  });
}
function cartTotal(items=cartProducts()){
  return items.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.qty || 1), 0);
}
function updateCartCount(){
  const totalQty = loadCart().reduce((sum,item) => sum + Number(item.qty || 0), 0);
  $$('#cartCount, .cartCount, .cart-count, [data-cart-count]').forEach(el => el.textContent = String(totalQty));
}
function renderCart(){
  const body = $('#cartItems');
  const totalEl = $('#cartTotal');
  if(!body) return;

  const items = cartProducts();
  if(!items.length){
    body.innerHTML = `
      <div class="cart-empty-v79">
        <strong>Carrinho vazio</strong>
        <p>Adicione produtos na loja para finalizar seu pedido.</p>
        <button class="btn btn-primary" type="button" data-close-cart>Adicionar produtos</button>
      </div>`;
    totalEl && (totalEl.textContent = fmt(0));
    updateCartCount();
    return;
  }

  body.innerHTML = items.map(item => `
    <div class="cart-line-v71 cart-line-v79">
      <div class="cart-item-info-v79">
        <strong>${esc(item.name)}</strong>
        <small>${fmt(item.price)} cada</small>
      </div>
      <div class="cart-line-actions-v71">
        <button class="btn btn-outline" type="button" data-cart-minus="${esc(item.id)}">-</button>
        <input type="number" min="1" value="${item.qty}" data-cart-qty="${esc(item.id)}">
        <button class="btn btn-outline" type="button" data-cart-plus="${esc(item.id)}">+</button>
        <button class="btn btn-danger" type="button" data-cart-remove="${esc(item.id)}">Remover</button>
      </div>
      <strong>${fmt(item.price * item.qty)}</strong>
    </div>`).join('');
  totalEl && (totalEl.textContent = fmt(cartTotal(items)));
  updateCartCount();
}
function openCart(){
  const drawer = $('#cartDrawer');
  if(drawer){
    drawer.classList.add('open');
    document.body.classList.add('lock');
  }
  renderCart();
}
function closeCart(){
  const drawer = $('#cartDrawer');
  if(drawer){
    drawer.classList.remove('open');
    document.body.classList.remove('lock');
  }
}
function addProductToCart(id, qty=1){
  const p = findProduct(id);
  if(!p){
    toast('Produto não encontrado.');
    return;
  }
  const cart = loadCart();
  const found = cart.find(item => docId(item.id) === docId(id));
  if(found) found.qty = Number(found.qty || 0) + Math.max(1, Number(qty || 1));
  else cart.push({id:p.id, qty:Math.max(1, Number(qty || 1)), name:p.name, price:Number(p.price || 0)});
  saveCart(cart);
  renderCart();
  toast('Produto adicionado ao carrinho');
}
function changeCartQty(id, qty){
  const cart = loadCart();
  const item = cart.find(i => docId(i.id) === docId(id));
  if(item) item.qty = Math.max(1, Number(qty || 1));
  saveCart(cart);
  renderCart();
}
function removeCartItem(id){
  saveCart(loadCart().filter(i => docId(i.id) !== docId(id)));
  renderCart();
}
function setupCart(){
  updateCartCount();
  renderCart();

  document.addEventListener('click', e => {
    const view = e.target.closest('[data-view-product]');
    if(view){ openProductModal(view.dataset.viewProduct); return; }

    const add = e.target.closest('[data-add-product]');
    if(add){
      const id = add.dataset.addProduct;
      const qty = Number(document.querySelector(`[data-card-qty="${CSS.escape(String(id))}"]`)?.value || $('#modalQtyV55')?.value || 1);
      addProductToCart(id, qty);
      closeModal(add.closest('.modal'));
  notifyCartAddedV110 && notifyCartAddedV110();
      return;
    }

    const open = e.target.closest('[data-open-cart], #openCart, .cart-button, .cart-pill');
    if(open){ e.preventDefault(); openCart(); return; }

    const close = e.target.closest('[data-close-cart], #closeCart, #cartBackdrop');
    if(close){ e.preventDefault(); closeCart(); return; }

    const minus = e.target.closest('[data-cart-minus]');
    if(minus){
      const item = loadCart().find(i => docId(i.id) === docId(minus.dataset.cartMinus));
      changeCartQty(minus.dataset.cartMinus, Math.max(1, Number(item?.qty || 1) - 1));
      return;
    }

    const plus = e.target.closest('[data-cart-plus]');
    if(plus){
      const item = loadCart().find(i => docId(i.id) === docId(plus.dataset.cartPlus));
      changeCartQty(plus.dataset.cartPlus, Number(item?.qty || 1) + 1);
      return;
    }

    const remove = e.target.closest('[data-cart-remove]');
    if(remove){ removeCartItem(remove.dataset.cartRemove); return; }

    const checkout = e.target.closest('#checkoutBtn');
    if(checkout){ e.preventDefault(); openCheckout(); }
  });

  document.addEventListener('change', e => {
    const qty = e.target.closest('[data-cart-qty]');
    if(qty) changeCartQty(qty.dataset.cartQty, qty.value);
  });
}

function normalizePixText(value, max=99){
  return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^A-Za-z0-9 \-.\&\*]/g,'').toUpperCase().slice(0,max);
}
function tlv(id, value){ value = String(value ?? ''); return id + String(value.length).padStart(2,'0') + value; }
function crc16(str){
  let crc = 0xFFFF;
  for(let i=0;i<str.length;i++){
    crc ^= str.charCodeAt(i) << 8;
    for(let j=0;j<8;j++) crc = (crc & 0x8000) ? ((crc << 1) ^ 0x1021) : (crc << 1);
    crc &= 0xFFFF;
  }
  return crc.toString(16).toUpperCase().padStart(4,'0');
}
function buildPixPayload(amount, txid='***'){
  const merchant = tlv('26', tlv('00','br.gov.bcb.pix') + tlv('01', CEC_PIX_KEY));
  const value = Number(amount || 0).toFixed(2);
  const name = normalizePixText(CEC_PIX_MERCHANT_NAME, 25) || 'CEC DISTRIBUIDORA';
  const city = normalizePixText(CEC_PIX_MERCHANT_CITY, 15) || 'CAMPO GRANDE';
  const tx = normalizePixText(String(txid || '***').replace(/[^A-Za-z0-9]/g,''), 25) || '***';
  let payload = '';
  payload += tlv('00','01');
  payload += tlv('01','12');
  payload += merchant;
  payload += tlv('52','0000');
  payload += tlv('53','986');
  payload += tlv('54', value);
  payload += tlv('58','BR');
  payload += tlv('59', name);
  payload += tlv('60', city);
  payload += tlv('62', tlv('05', tx));
  payload += '6304';
  payload += crc16(payload);
  return payload;
}
function pixQrUrl(payload){ return `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(payload)}`; }
function renderPixBlock({amount, txid, qrId, amountId, payloadId, keyId}){
  const payload = buildPixPayload(amount, txid);
  const qr = $(qrId); if(qr) qr.src = pixQrUrl(payload);
  const amountEl = $(amountId); if(amountEl) amountEl.textContent = fmt(amount);
  const payloadEl = $(payloadId); if(payloadEl.value !== undefined) payloadEl.value = payload;
  const keyEl = $(keyId); if(keyEl) keyEl.textContent = CEC_PIX_KEY_DISPLAY;
  return payload;
}
async function copyTextValue(text, label='Copiado'){
  try{ await navigator.clipboard.writeText(text); toast(label); }catch(e){ toast('Não foi possível copiar.'); }
}
function nextOrderNumber(){
  const maxFromOrders = loadOrders().reduce((max, order) => {
    const match = String(order.code || '').match(/CEC-(\d+)/);
    return match ? Math.max(max, Number(match[1])) : max;
  }, 0);
  const stored = Number(localStorage.getItem('cec_order_seq') || 0);
  const next = Math.max(stored, maxFromOrders) + 1;
  localStorage.setItem('cec_order_seq', String(next));
  return next;
}
function makeCode(){ return 'CEC-' + String(nextOrderNumber()).padStart(6,'0'); }
function openCheckout(){
  const items = cartProducts();
  if(!items.length){
    openCart();
    toast('Carrinho vazio. Adicione produtos antes de finalizar.');
    return;
  }

  const total = cartTotal(items);
  const summary = $('#orderSummary');
  if(summary){
    summary.innerHTML = items.map(i => `<div class="order-line"><span>${esc(i.name)} x ${i.qty}</span><strong>${fmt(i.price * i.qty)}</strong></div>`).join('') +
      `<div class="order-line"><strong>Total</strong><strong>${fmt(total)}</strong></div>`;
  }

  const pix = ($('#orderPayment')?.value || 'Pix') === 'Pix';
  $('#pixCheckoutBox') && ($('#pixCheckoutBox').style.display = pix ? 'block' : 'none');
  if(pix) renderPixBlock({amount:total, txid:'PEDIDO', qrId:'#pixQrPreview', amountId:'#pixAmountPreview', payloadId:'#pixPayloadPreview', keyId:'#pixKeyText'});

  closeCart();
  openModal('#orderModal');
}
function whatsappOrderMessage(order){
  const lines = [
    `Olá, fiz um pedido no site da C & C Distribuidora.`,
    `Código: ${order.code}`,
    `Cliente: ${order.customer}`,
    `WhatsApp: ${order.phone}`,
    `Pagamento: ${order.payment}`,
    `Entrega: ${order.deliveryType}`,
    order.city ? `Cidade: ${order.city}` : '',
    order.cep ? `CEP: ${order.cep}` : '',
    order.address ? `Endereço: ${order.address}` : '',
    '',
    'Itens:',
    ...order.items.map(i => `- ${i.name} x ${i.qty} = ${fmt(i.price * i.qty)}`),
    '',
    `Total: ${fmt(order.total)}`,
    order.note ? `Observação: ${order.note}` : ''
  ].filter(Boolean);
  return lines.join('\n');
}
function setupCheckout(){
  $('#orderPayment')?.addEventListener('change', () => openCheckout());

  $('#orderForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const items = cartProducts();
    if(!items.length){
      closeModal($('#orderModal'));
      openCart();
      return;
    }

    const total = cartTotal(items);
    const order = {
      code: makeCode(),
      createdAt: new Date().toISOString(),
      createdAtLabel: nowText(),
      customer: $('#orderName')?.value.trim() || '',
      phone: $('#orderPhone')?.value.trim() || '',
      deliveryType: $('#orderDeliveryType')?.value || 'Entrega',
      city: $('#orderCity')?.value.trim() || '',
      cep: $('#orderCep')?.value.trim() || '',
      address: $('#orderAddress')?.value.trim() || '',
      payment: $('#orderPayment')?.value || 'Pix',
      note: $('#orderNote')?.value.trim() || '',
      items: items.map(i => ({id:i.id, name:i.name, qty:i.qty, price:Number(i.price || 0)})),
      total,
      status: ($('#orderPayment')?.value || 'Pix') === 'Pix' ? 'Aguardando pagamento' : 'Aguardando confirmação'
    };

    saveOrders([order, ...loadOrders()]);
    saveCart([]);
    renderCart();
    closeModal($('#orderModal'));

    $('#orderDoneCode') && ($('#orderDoneCode').textContent = order.code);
    if(order.payment === 'Pix'){
      $('#orderDonePix') && ($('#orderDonePix').innerHTML = `<strong>Pagamento Pix:</strong> envie o comprovante pelo WhatsApp para confirmar o pedido.`);
      renderPixBlock({amount:order.total, txid:order.code, qrId:'#pixQrDone', amountId:'#pixAmountDone', payloadId:'#pixPayloadDone', keyId:'#pixKeyDone'});
    }else{
      $('#orderDonePix') && ($('#orderDonePix').textContent = 'Pagamento a combinar com a loja.');
    }
    openModal('#orderDoneModal');

    const msg = encodeURIComponent(whatsappOrderMessage(order));
    window.open(waUrl(CEC_WHATSAPP) + '?text=' + msg, '_blank', 'noopener');
  });

  $('#copyPixPayloadBtn')?.addEventListener('click', () => copyTextValue($('#pixPayloadPreview')?.value || '', 'Pix copiado'));
  $('#copyPixKeyBtn')?.addEventListener('click', () => copyTextValue(CEC_PIX_KEY_DISPLAY, 'Chave Pix copiada'));
  $('#copyPixDoneBtn')?.addEventListener('click', () => copyTextValue($('#pixPayloadDone')?.value || '', 'Pix copiado'));
  $('#copyPixKeyDoneBtn')?.addEventListener('click', () => copyTextValue(CEC_PIX_KEY_DISPLAY, 'Chave Pix copiada'));

  const cep = $('#orderCep');
  if(cep){
    cep.addEventListener('input', () => {
      let value = cep.value.replace(/\D/g,'').slice(0,8);
      if(value.length > 5) value = value.slice(0,5) + '-' + value.slice(5);
      cep.value = value;
    });
  }
}


function adminAuth(){
  if(window.CEC_AUTH) return window.CEC_AUTH;
  try{
    if(typeof firebase !== 'undefined' && firebase.auth) return firebase.auth();
  }catch(e){}
  return null;
}
function authMessage(error){
  const code = error && error.code ? String(error.code) : '';
  if(code.includes('user-not-found')) return 'Usuário não encontrado no Firebase.';
  if(code.includes('wrong-password') || code.includes('invalid-credential')) return 'E-mail ou senha incorretos. O acesso não foi liberado.';
  if(code.includes('invalid-email')) return 'E-mail inválido.';
  if(code.includes('too-many-requests')) return 'Muitas tentativas. Aguarde um pouco e tente novamente.';
  if(code.includes('network')) return 'Falha de internet. Tente novamente.';
  if(code.includes('requires-recent-login')) return 'Por segurança, saia e entre novamente antes de alterar a senha.';
  if(code.includes('weak-password')) return 'A nova senha precisa ter pelo menos 6 caracteres.';
  return error && error.message ? error.message : 'Não foi possível concluir a operação.';
}
function showAdminPanel(user){
  $('#adminLogin')?.classList.add('hidden');
  $('#adminPanel')?.classList.remove('hidden');
  const errorEl = $('#adminLoginError');
  if(errorEl){
    errorEl.textContent = '';
    errorEl.style.display = 'none';
  }
  const emailEl = $('#adminLoggedEmail');
  if(emailEl) emailEl.textContent = user && user.email ? 'Logado como: ' + user.email : '';
  renderAdminProducts();
  renderAdminOrders();
  fillSiteConfigForm();
}
function showAdminLogin(){
  $('#adminPanel')?.classList.add('hidden');
  $('#adminLogin')?.classList.remove('hidden');
}
function setupAdmin(){
  if(!$('#adminLoginForm')) return;

  const auth = adminAuth();
  const errorEl = $('#adminLoginError');

  function setLoginError(message){
    if(errorEl){
      errorEl.textContent = message || '';
      errorEl.style.display = message ? 'block' : 'none';
    }
  }

  if(!auth){
    showAdminLogin();
    setLoginError('Firebase Authentication não carregou. Confira se o arquivo assets/firebase-config.js subiu e se o script firebase-auth-compat.js está no admin.html.');
  }else{
    auth.onAuthStateChanged(user => {
      const errorVisible = $('#adminLoginError')?.style.display === 'block';
      if(user && !errorVisible) showAdminPanel(user);
      else if(!user) showAdminLogin();
    });
  }

  $('#adminLoginForm')?.addEventListener('submit', async e => {
    e.preventDefault();
    setLoginError('');
    const email = ($('#adminEmail')?.value || '').trim().toLowerCase();
    const pass = $('#adminPassword')?.value || '';

    if(!auth){
      setLoginError('Firebase Authentication não está disponível.');
      showAdminLogin();
      return;
    }

    try{
      // Garante login limpo. Se existia uma sessão antiga no navegador,
      // ela não pode liberar o painel quando a nova senha estiver errada.
      if(auth.currentUser){
        await auth.signOut();
      }

      const cred = await auth.signInWithEmailAndPassword(email, pass);
      if(!cred || !cred.user){
        throw new Error('Login não confirmado.');
      }

      $('#adminPassword') && ($('#adminPassword').value = '');
      setLoginError('');
      showAdminPanel(cred.user);
      toast('Login realizado.');
    }catch(err){
      try{ await auth.signOut(); }catch(e){}
      showAdminLogin();
      setLoginError(authMessage(err));
    }
  });


  $('#clearAdminSessionBtn')?.addEventListener('click', async () => {
    try{ await auth?.signOut(); }catch(e){}
    try{ sessionStorage.removeItem('cec_admin_logged'); localStorage.removeItem('cec_admin_logged'); }catch(e){}
    $('#adminPassword') && ($('#adminPassword').value = '');
    setLoginError('Acesso salvo limpo. Digite e-mail e senha novamente.');
    showAdminLogin();
  });

  $('#resetAdminPasswordBtn')?.addEventListener('click', async () => {
    setLoginError('');
    const email = $('#adminEmail')?.value.trim() || '';
    if(!email){
      setLoginError('Digite seu e-mail para receber o link de redefinição.');
      return;
    }
    if(!auth){
      setLoginError('Firebase Authentication não está disponível.');
      return;
    }
    try{
      await auth.sendPasswordResetEmail(email);
      setLoginError('Enviamos um link de redefinição para o e-mail informado.');
    }catch(err){
      setLoginError(authMessage(err));
    }
  });

  $('#logoutBtn')?.addEventListener('click', async () => {
    try{
      await auth?.signOut();
      sessionStorage.removeItem('cec_admin_logged');
      showAdminLogin();
    }catch(e){
      showAdminLogin();
    }
  });

  $('#changeAdminPasswordForm')?.addEventListener('submit', async e => {
    e.preventDefault();
    const msg = $('#changeAdminPasswordMsg');
    const current = $('#currentAdminPassword')?.value || '';
    const next = $('#newAdminPassword')?.value || '';
    const confirm = $('#confirmAdminPassword')?.value || '';
    if(msg){
      msg.textContent = '';
      msg.className = 'admin-auth-msg-v82';
    }

    if(!auth?.currentUser){
      if(msg) msg.textContent = 'Você precisa estar logado.';
      return;
    }
    if(next !== confirm){
      if(msg) msg.textContent = 'A confirmação da nova senha não confere.';
      return;
    }

    try{
      const user = auth.currentUser;
      const credential = firebase.auth.EmailAuthProvider.credential(user.email, current);
      await user.reauthenticateWithCredential(credential);
      await user.updatePassword(next);
      $('#currentAdminPassword') && ($('#currentAdminPassword').value = '');
      $('#newAdminPassword') && ($('#newAdminPassword').value = '');
      $('#confirmAdminPassword') && ($('#confirmAdminPassword').value = '');
      if(msg){
        msg.textContent = 'Senha alterada com sucesso.';
        msg.classList.add('ok');
      }
      toast('Senha alterada.');
    }catch(err){
      if(msg) msg.textContent = authMessage(err);
    }
  });

  $$('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      $$('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      $$('.admin-section').forEach(sec => sec.classList.add('hidden'));
      $('#' + tab.dataset.tab)?.classList.remove('hidden');
    });
  });

  setupProductForm();
  setupOrdersAdmin();
  setupSiteConfigAdmin();
  setupBackupAdmin();
}

function productFromForm(){
  const id = $('#prodId')?.value || Date.now();
  return {
    id,
    name: $('#prodName')?.value.trim() || '',
    category: $('#prodCat')?.value.trim() || '',
    type: $('#prodType')?.value || '',
    brand: $('#prodBrand')?.value.trim() || '',
    sku: $('#prodSku')?.value.trim() || '',
    color: $('#prodColor')?.value.trim() || '',
    price: parseMoney($('#prodPrice')?.value),
    stock: Number($('#prodStock')?.value || 0),
    tag: $('#prodTag')?.value.trim() || '',
    yield: $('#prodYield')?.value.trim() || '',
    image: $('#prodImage')?.value.trim() || '',
    imageData: $('#prodImageData')?.value || '',
    desc: $('#prodDesc')?.value.trim() || '',
    compatiblePrinters: $('#prodPrinters')?.value.trim() || '',
    notes: $('#prodNotes')?.value.trim() || ''
  };
}
function setProductForm(product={}){
  $('#prodId') && ($('#prodId').value = product.id || '');
  $('#prodName') && ($('#prodName').value = product.name || '');
  $('#prodCat') && ($('#prodCat').value = product.category || '');
  $('#prodType') && ($('#prodType').value = product.type || 'Compatível');
  $('#prodBrand') && ($('#prodBrand').value = product.brand || '');
  $('#prodSku') && ($('#prodSku').value = product.sku || '');
  $('#prodColor') && ($('#prodColor').value = product.color || '');
  $('#prodPrice') && ($('#prodPrice').value = product.price ? String(product.price).replace('.', ',') : '');
  $('#prodStock') && ($('#prodStock').value = product.stock ?? '');
  $('#prodTag') && ($('#prodTag').value = product.tag || '');
  $('#prodYield') && ($('#prodYield').value = product.yield || '');
  $('#prodImage') && ($('#prodImage').value = product.image || '');
  $('#prodImageData') && ($('#prodImageData').value = product.imageData || '');
  $('#prodDesc') && ($('#prodDesc').value = product.desc || '');
  $('#prodPrinters') && ($('#prodPrinters').value = product.compatiblePrinters || '');
  $('#prodNotes') && ($('#prodNotes').value = product.notes || '');
  $('#productFormTitle') && ($('#productFormTitle').textContent = product.id ? 'Editar produto' : 'Cadastrar produto');
  showProductPreview(productImage(product));
}
function clearProductForm(){
  $('#productForm')?.reset();
  setProductForm({});
  $('#prodImageFile') && ($('#prodImageFile').value = '');
}
function showProductPreview(src){
  const box = $('#prodImagePreviewBox');
  const img = $('#prodImagePreview');
  const label = $('#prodImagePreviewPath');
  if(src && img && box){
    img.src = src;
    box.style.display = 'block';
    label && (label.textContent = String(src).startsWith('data:image/') ? 'Imagem anexada no cadastro' : src);
  }else if(box){
    box.style.display = 'none';
  }
}
async function resizeImageFile(file){
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const max = 420;
        let {width, height} = img;
        if(width > max || height > max){
          const ratio = Math.min(max / width, max / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }
        const canvas = document.createElement('canvas');
        canvas.width = width; canvas.height = height;
        canvas.getContext('2d').drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.66));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}
async function handleProductImageFile(file){
  if(!file) return;
  try{
    const data = await resizeImageFile(file);
    $('#prodImageData') && ($('#prodImageData').value = data);
    $('#prodImage') && ($('#prodImage').value = '');
    showProductPreview(data);
  }catch(e){
    toast('Não foi possível carregar a imagem.');
  }
}
function setupProductForm(){
  $('#clearProductForm')?.addEventListener('click', clearProductForm);
  $('#prodImageFile')?.addEventListener('change', e => handleProductImageFile(e.target.files?.[0]));
  $('#chooseProductImageBtn')?.addEventListener('click', () => $('#prodImageFile')?.click());
  $('#clearProductImageBtn')?.addEventListener('click', () => {
    $('#prodImage') && ($('#prodImage').value = '');
    $('#prodImageData') && ($('#prodImageData').value = '');
    $('#prodImageFile') && ($('#prodImageFile').value = '');
    showProductPreview('');
  });
  $('#previewProductImageBtn')?.addEventListener('click', () => showProductPreview($('#prodImageData')?.value || $('#prodImage')?.value || ''));
  $('#firebaseSyncRefreshV74')?.addEventListener('click', () => { renderAllProducts(); renderAdminOrders(); toast('Tela atualizada.'); });

  document.addEventListener('click', e => {
    const edit = e.target.closest('[data-edit-product-clean]');
    if(edit){
      const p = findProduct(edit.dataset.editProductClean);
      if(p){
        setProductForm(p);
        window.scrollTo({top:0, behavior:'smooth'});
      }
      return;
    }
    const del = e.target.closest('[data-delete-product-clean]');
    if(del){
      const p = findProduct(del.dataset.deleteProductClean);
      if(p && confirm('Excluir o produto "' + p.name + '"?')){
        saveProducts(loadProducts().filter(item => docId(item.id) !== docId(p.id)));
      }
    }
  });
}
function saveProductFormV40(event){
  if(event) event.preventDefault();
  const product = productFromForm();
  if(!product.name || !product.category || !product.price){
    toast('Preencha nome, categoria e preço.');
    return false;
  }
  const list = loadProducts();
  const idx = list.findIndex(p => docId(p.id) === docId(product.id));
  if(idx >= 0) list[idx] = product;
  else list.unshift(product);
  saveProducts(list);
  clearProductForm();
  $('#productSaveStatusV40') && ($('#productSaveStatusV40').style.display = 'none');
  toast('Produto salvo.');
  return false;
}
function renderAdminProducts(){
  const body = $('#productsBody');
  if(!body) return;
  const products = loadProducts();
  body.innerHTML = products.map(p => `
    <tr>
      <td>
        <div class="admin-product-row-v79">
          <img src="${esc(productImage(p))}" alt="">
          <div><strong>${esc(p.name)}</strong><small>${esc([p.brand,p.sku].filter(Boolean).join(' • '))}</small></div>
        </div>
      </td>
      <td>${esc(p.category || '')}</td>
      <td>${esc(p.compatiblePrinters || p.notes || '').slice(0,120)}</td>
      <td>${fmt(p.price)}</td>
      <td>${Number(p.stock || 0)}</td>
      <td>
        <button class="btn btn-outline" type="button" data-edit-product-clean="${esc(p.id)}">Editar</button>
        <button class="btn btn-danger" type="button" data-delete-product-clean="${esc(p.id)}">Excluir</button>
      </td>
    </tr>`).join('');
}

function statusClass(status){
  if(['Entregue','Enviado'].includes(status)) return 'ok';
  if(['Cancelado'].includes(status)) return 'danger';
  if(['Em separação','Aguardando pagamento'].includes(status)) return 'warn';
  return '';
}
function renderAdminOrders(){
  const body = $('#ordersBody');
  if(!body) return;
  const orders = loadOrders();
  body.innerHTML = orders.length ? orders.map(o => `
    <tr>
      <td><strong>${esc(o.code)}</strong><br><small>${esc(o.createdAtLabel || '')}</small></td>
      <td>${esc(o.customer || '')}<br><small>${esc(o.phone || '')}</small></td>
      <td>${(o.items || []).map(i => `${esc(i.name)} x ${i.qty}`).join('<br>')}</td>
      <td>${fmt(o.total)}</td>
      <td>${esc(o.payment || '')}</td>
      <td>
        <select data-order-status-clean="${esc(o.code)}">
          ${['Aguardando pagamento','Aguardando confirmação','Em separação','Enviado','Entregue','Cancelado'].map(s => `<option value="${esc(s)}" ${o.status===s?'selected':''}>${esc(s)}</option>`).join('')}
        </select>
      </td>
      <td><button class="btn btn-danger" type="button" data-order-delete-clean="${esc(o.code)}">Excluir</button></td>
    </tr>`).join('') : '<tr><td colspan="7">Nenhum pedido ainda.</td></tr>';
}
function setupOrdersAdmin(){
  $('#refreshOrdersBtnV43')?.addEventListener('click', renderAdminOrders);

  $('#manualOrderForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const order = {
      code: makeCode(),
      createdAt: new Date().toISOString(),
      createdAtLabel: nowText(),
      customer: $('#manualName')?.value.trim() || '',
      phone: $('#manualPhone')?.value.trim() || '',
      items: [{name: $('#manualNote')?.value.trim() || 'Pedido manual', qty:1, price:parseMoney($('#manualTotal')?.value)}],
      total: parseMoney($('#manualTotal')?.value),
      payment: 'Combinar com a loja',
      status: 'Aguardando confirmação',
      note: $('#manualNote')?.value.trim() || ''
    };
    saveOrders([order, ...loadOrders()]);
    e.target.reset();
    toast('Pedido manual criado.');
  });

  document.addEventListener('change', e => {
    const select = e.target.closest('[data-order-status-clean]');
    if(!select) return;
    const orders = loadOrders();
    const order = orders.find(o => o.code === select.dataset.orderStatusClean);
    if(order){
      order.status = select.value;
      order.updatedAt = new Date().toISOString();
      saveOrders(orders);
      toast('Status atualizado.');
    }
  });

  document.addEventListener('click', e => {
    const del = e.target.closest('[data-order-delete-clean]');
    if(!del) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    if(confirm('Excluir o pedido ' + del.dataset.orderDeleteClean + '?')){
      saveOrders(loadOrders().filter(o => o.code !== del.dataset.orderDeleteClean));
    }
  }, true);
}

function fillSiteConfigForm(){
  const form = $('#siteConfigForm');
  if(!form) return;
  const cfg = loadSiteConfig();
  $$('[name]', form).forEach(input => {
    input.value = cfg[input.name] ?? '';
  });
}
function renderAdminConfig(){ fillSiteConfigForm(); }
function setupSiteConfigAdmin(){
  fillSiteConfigForm();

  $('#siteConfigForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const config = {};
    $$('[name]', e.target).forEach(input => config[input.name] = input.value);
    saveSiteConfig(config);
    toast('Configurações salvas.');
  });

  $('#resetSiteConfigBtn')?.addEventListener('click', () => {
    if(confirm('Restaurar configurações padrão?')){
      SITE_CONFIG = {...CEC_DEFAULT_SITE_CONFIG};
      saveSiteConfig(SITE_CONFIG);
      fillSiteConfigForm();
    }
  });

  $('#exportSiteConfigBtn')?.addEventListener('click', () => downloadJson('configuracoes-cec.json', loadSiteConfig()));
  $('#importSiteConfigBtn')?.addEventListener('click', () => $('#importSiteConfigInput')?.click());
  $('#importSiteConfigInput')?.addEventListener('change', e => {
    const file = e.target.files?.[0];
    if(file) readJsonFile(file).then(data => { saveSiteConfig(data); fillSiteConfigForm(); });
  });
}
function downloadJson(filename, data){
  const blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click();
  setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 300);
}
function readJsonFile(file){
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      try{ resolve(JSON.parse(reader.result)); }catch(e){ reject(e); }
    };
    reader.readAsText(file, 'utf-8');
  });
}
function setupBackupAdmin(){
  $('#exportDataBtn')?.addEventListener('click', e => {
    e.preventDefault();
    e.stopImmediatePropagation();
    downloadJson('backup-cec-distribuidora.json', {
      products: loadProducts(),
      orders: loadOrders(),
      siteConfig: loadSiteConfig(),
      exportedAt: new Date().toISOString()
    });
  }, true);

  $('#importDataBtnV37')?.addEventListener('click', e => {
    e.preventDefault();
    e.stopImmediatePropagation();
    $('#importDataInput')?.click();
  }, true);

  $('#importDataInput')?.addEventListener('change', e => {
    const file = e.target.files?.[0];
    if(!file) return;
    $('#importDataFileName') && ($('#importDataFileName').textContent = file.name);
    readJsonFile(file).then(data => {
      if(Array.isArray(data.products)) saveProducts(data.products);
      if(Array.isArray(data.orders)) saveOrders(data.orders);
      if(data.siteConfig) saveSiteConfig(data.siteConfig);
      toast('Backup restaurado.');
    }).catch(() => toast('Backup inválido.'));
  });

  $('#resetProductsBtn')?.addEventListener('click', e => {
    e.preventDefault();
    e.stopImmediatePropagation();
    if(confirm('Restaurar produtos iniciais?')){
      saveProducts(clone(CEC_DEFAULT_PRODUCTS));
      toast('Produtos restaurados.');
    }
  }, true);
}

function normalizeCode(code){
  const text = String(code || '').trim().toUpperCase();
  const digits = text.replace(/\D/g,'');
  if(digits) return 'CEC-' + digits.padStart(6,'0');
  return text;
}
function findOrderByCode(code){
  const normalized = normalizeCode(code);
  return loadOrders().find(o => normalizeCode(o.code) === normalized || String(o.code || '').toUpperCase() === String(code || '').toUpperCase()) || null;
}
function renderTrack(order){
  const box = $('#trackResult');
  if(!box) return;
  if(!order){
    box.innerHTML = '<div class="card"><strong>Pedido não encontrado.</strong><p>Confira o código digitado ou fale com a loja pelo WhatsApp.</p></div>';
    return;
  }
  box.innerHTML = `
    <div class="card">
      <h2>${esc(order.code)}</h2>
      <p><strong>Status:</strong> <span class="status ${statusClass(order.status)}">${esc(order.status || 'Aguardando confirmação')}</span></p>
      <p><strong>Cliente:</strong> ${esc(order.customer || '')}</p>
      <p><strong>Total:</strong> ${fmt(order.total)}</p>
      <p><strong>Data:</strong> ${esc(order.createdAtLabel || '')}</p>
      <h3>Itens</h3>
      <ul>${(order.items || []).map(i => `<li>${esc(i.name)} x ${i.qty} — ${fmt(Number(i.price||0) * Number(i.qty||1))}</li>`).join('')}</ul>
    </div>`;
}
function renderTrackFromQuery(){
  const code = $('#trackCode')?.value;
  if(code) renderTrack(findOrderByCode(code));
}
function setupTracking(){
  $('#trackForm')?.addEventListener('submit', e => {
    e.preventDefault();
    renderTrack(findOrderByCode($('#trackCode')?.value));
  });
}

function setupDeliveryPage(){
  $('#copyGarantiaEmailBtn')?.addEventListener('click', () => copyTextValue(loadSiteConfig().emailWarranty, 'E-mail copiado'));
}
function setupCookies(){
  const notice = $('#cookieNoticeV31');
  if(notice && localStorage.getItem('cec_cookie_ok') === '1') notice.classList.add('hidden');
}
function setupCopyButtons(){
  $('#copyPixKeyBtn')?.addEventListener('click', () => copyTextValue(CEC_PIX_KEY_DISPLAY, 'Chave Pix copiada'));
}

function boot(){
  applySiteConfig();
  setupMenu();
  setupModals();
  if($('#productGrid')) setShopLoadingState(true);
  setupShop();
  preloadProductImages();
  setupCart();
  setupCheckout();
  setupAdmin();
  setupTracking();
  setupDeliveryPage();
  setupCopyButtons();
  setupCookies();
  subscribeFirebase();
}

document.addEventListener('DOMContentLoaded', boot);

window.CEC_DEFAULT_PRODUCTS = CEC_DEFAULT_PRODUCTS;
window.CEC_DEFAULT_SITE_CONFIG = CEC_DEFAULT_SITE_CONFIG;
window.loadProducts = loadProducts;
window.saveProducts = saveProducts;
window.loadOrders = loadOrders;
window.saveOrders = saveOrders;
window.renderAdminProducts = renderAdminProducts;
window.renderAdminOrders = renderAdminOrders;
window.renderAdminConfig = renderAdminConfig;
window.fillSiteConfigForm = fillSiteConfigForm;
window.applySiteConfig = applySiteConfig;
window.saveProductFormV40 = saveProductFormV40;
window.renderPixBlock = renderPixBlock;
window.openCheckout = openCheckout;
window.fmt = fmt;
window.esc = esc;
window.toast = toast;

/* V110 - Carrinho não abre automaticamente ao adicionar produto */
function notifyCartAddedV110(){
  try{
    let toast = document.getElementById('cartToastV110');
    if(!toast){
      toast = document.createElement('div');
      toast.id = 'cartToastV110';
      toast.className = 'cart-toast-v110';
      toast.textContent = 'Produto adicionado ao carrinho';
      document.body.appendChild(toast);
    }
    toast.classList.add('show');
    clearTimeout(window.__cartToastV110Timer);
    window.__cartToastV110Timer = setTimeout(() => toast.classList.remove('show'), 1600);
  }catch(e){}
}

/* Proteção extra: produto adicionado pelo atendimento não deve abrir o carrinho */
(function(){
  if(window.__CEC_CART_NO_AUTO_OPEN_V110__) return;
  window.__CEC_CART_NO_AUTO_OPEN_V110__ = true;

  const originalOpen = window.openCart;
  let suppressUntil = 0;

  window.cecSuppressNextCartOpenV110 = function(){
    suppressUntil = Date.now() + 900;
  };

  if(typeof originalOpen === 'function'){
    window.openCart = function(){
      if(Date.now() < suppressUntil){
        notifyCartAddedV110();
        return;
      }
      return originalOpen.apply(this, arguments);
    };
  }

  document.addEventListener('click', function(e){
    const addBtn = e.target && e.target.closest ? e.target.closest('[data-add-cart], [data-add-to-cart], [data-cec-ai-add]') : null;
    if(addBtn){
      window.cecSuppressNextCartOpenV110();
    }
  }, true);
})();

/* V122 - Atendimento C&C: limpar chat, pedidos, entrega e produto sem orçamento automático */
(function(){
  if(window.__CEC_VENDAS_IA_V122__) return;
  window.__CEC_VENDAS_IA_V122__ = true;

  const ROOT_ID = 'cecSalesAiV122';
  const WHATSAPP = '556730424796';

  let lastMessage = '';
  let lastTime = 0;

  let pendingProducts = [];
  let pendingQty = 0;
  let pendingProduct = null;
  let pendingMode = 'product';
  let pendingTopic = '';

  function clean(v){
    return String(v || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s\-./]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function esc(v){
    return String(v ?? '').replace(/[&<>"']/g, c => ({
      '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'
    }[c]));
  }

  function money(v){
    try{ if(typeof fmt === 'function') return fmt(v); }catch(e){}
    return Number(v || 0).toLocaleString('pt-BR', {style:'currency', currency:'BRL'});
  }

  function getProducts(){
    try{ if(typeof loadProducts === 'function') return loadProducts() || []; }catch(e){}
    return [];
  }

  function wantsQuote(text){
    const q = clean(text);
    return /\b(orcamento|orçamento|cotacao|cotação|cotar|quote)\b/.test(q);
  }

  function isClear(text){
    const q = clean(text);
    return /^(limpar|limpa|apagar|apaga|zerar|zera|novo atendimento|reiniciar|recomeçar|recomecar|começar de novo|comecar de novo)$/.test(q);
  }

  function isTracking(text){
    const q = clean(text);
    return /\b(acompanhar|rastrear|rastreamento|status|codigo do pedido|código do pedido|meu pedido|pedido)\b/.test(q) && !/\b(orcamento|orçamento|comprar|compra|quero|preciso)\b/.test(q);
  }

  function isDelivery(text){
    const q = clean(text);
    return /\b(entrega|frete|prazo|envio|receber|retirada|transportadora)\b/.test(q);
  }

  function isPayment(text){
    const q = clean(text);
    return /\b(pix|pagamento|pagar|boleto|cartao|cartão|dinheiro)\b/.test(q);
  }

  function isExchange(text){
    const q = clean(text);
    return /\b(troca|trocar|devolucao|devolução|devolver|garantia|defeito|problema)\b/.test(q);
  }

  function isHuman(text){
    const q = clean(text);
    return /\b(humano|atendente|vendedor|pessoa|whats|whatsapp|zap|telefone|contato)\b/.test(q);
  }

  function isCep(text){
    const digits = String(text || '').replace(/\D/g, '');
    return digits.length === 8 ? digits : '';
  }

  function qtyFrom(text){
    const q = clean(text);

    let m = q.match(/\b(\d{1,4})\s*(unidades|unidade|unids?|unid|unds?|und|un|pecas|peças|peca|peça|pcs|cx|caixas|caixa)\b/);
    if(m) return Number(m[1]);

    m = q.match(/\b(\d{1,4})\b(?:\s+\w+){0,3}\s+(do|da|de)\s+[a-z0-9\-]{2,}\b/);
    if(m) return Number(m[1]);

    m = q.match(/\b(\d{1,4})\s+(?=(?:tn|dr|cf|ce|q|mlt|d)?[- ]?\d{3,5}[a-z0-9]*\b)/);
    if(m) return Number(m[1]);

    m = q.match(/\b(qtd|quantidade)\s*(\d{1,4})\b/);
    if(m) return Number(m[2]);

    if(/^\d{1,4}$/.test(q) && pendingProduct) return Number(q);

    return 0;
  }

  function extractCodes(text){
    const q = clean(text);
    const qty = qtyFrom(text);
    const stop = new Set([
      'pedido','pedi','pedir','quero','preciso','orcamento','orçamento','cotacao','cotação','comprar','valor','preco','preço',
      'unidade','unidades','unids','unid','unds','und','un','pecas','peças','pcs','cx','caixa','caixas',
      'do','da','de','para','pra','pro','com','sem','modelo','impressora','produto','toner','cartucho'
    ]);

    const parts = q.split(/\s+/);
    const codes = [];

    parts.forEach((w, i) => {
      if(stop.has(w)) return;
      if(qty && String(qty) === w) return;

      if(/^(tn|dr|cf|ce|q|mlt|d)$/.test(w) && parts[i+1] && /^\d{2,5}[a-z0-9]*$/.test(parts[i+1])){
        const combined = w + parts[i+1];
        if(!codes.includes(combined)) codes.push(combined);
        return;
      }

      const isCode = (
        /^\d{3,5}[a-z]{0,3}$/.test(w) ||
        /^[a-z]{1,8}[-]?\d{2,5}[a-z0-9]{0,5}$/.test(w) ||
        /^(tn|dr|cf|ce|q|mlt|d)\d+[a-z0-9]*$/.test(w)
      );

      if(isCode && !codes.includes(w)) codes.push(w);
    });

    return codes;
  }

  function field(p){
    return clean([p.name,p.category,p.brand,p.sku,p.tag,p.type,p.color,p.desc,p.description,p.compatiblePrinters,p.notes,p.yield].filter(Boolean).join(' '));
  }

  function nameSku(p){
    return clean([p.name, p.sku, p.category, p.brand].filter(Boolean).join(' '));
  }

  function productColor(p){
    const t = field(p);
    if(/\b(preto|black|bk)\b/.test(t)) return 'preto';
    if(/\b(ciano|cyan|azul)\b/.test(t)) return 'ciano';
    if(/\b(magenta|vermelho)\b/.test(t)) return 'magenta';
    if(/\b(amarelo|yellow)\b/.test(t)) return 'amarelo';
    if(/\b(colorido|color|tricolor)\b/.test(t)) return 'colorido';
    if(/\b(kit|combo|jogo|conjunto)\b/.test(t)) return 'kit';
    return '';
  }

  function requestedVariant(text){
    const q = clean(text);
    if(/\b(preto|black|bk)\b/.test(q)) return 'preto';
    if(/\b(ciano|cyan|azul)\b/.test(q)) return 'ciano';
    if(/\b(magenta|vermelho)\b/.test(q)) return 'magenta';
    if(/\b(amarelo|yellow)\b/.test(q)) return 'amarelo';
    if(/\b(colorido|color|tricolor)\b/.test(q)) return 'colorido';
    if(/\b(kit|combo|jogo|conjunto)\b/.test(q)) return 'kit';
    return '';
  }

  function kindFromText(text){
    const q = clean(text);
    if(/cartucho|cartuchos|tinta|hp\s*954|hp954|\b954\b|\b664\b|\b662\b|\b122\b/.test(q)) return 'cartucho';
    if(/fotocondutor|cilindro|drum|unidade de imagem|\bdr[- ]?\d+/.test(q)) return 'fotocondutor';
    if(/toner|toners|\btn[- ]?\d+|mlt|d204|cf|ce|q2612/.test(q)) return 'toner';
    return '';
  }

  function kindProduct(p){
    const t = field(p);
    if(/cartucho|tinta|ink|hp\s*954|hp954|\b954\b|\b664\b|\b662\b|\b122\b/.test(t)) return 'cartucho';
    if(/fotocondutor|cilindro|drum|unidade de imagem|\bdr[- ]?\d+/.test(t)) return 'fotocondutor';
    if(/toner|toners|\btn[- ]?\d+|mlt|d204|cf|ce|q2612/.test(t)) return 'toner';
    return '';
  }

  function isPrefixCode(code){
    return /^(tn|dr|cf|ce|q|mlt|d)[-]?\d+/i.test(String(code || ''));
  }

  function codeNumber(code){
    const m = clean(code).match(/\d{2,5}/);
    return m ? m[0] : '';
  }

  function codeExactInProduct(p, code){
    const c = clean(code).replace(/\s+/g, '');
    const target = nameSku(p).replace(/\s+/g, ' ');
    const compactTarget = target.replace(/[-\s]/g, '');

    if(isPrefixCode(c)){
      const compactCode = c.replace(/[-\s]/g, '');
      if(compactTarget.includes(compactCode)) return true;

      const prefix = compactCode.match(/^[a-z]+/)[0];
      const number = codeNumber(compactCode);
      if(!number) return false;

      const rx = new RegExp('(^|[^a-z0-9])' + prefix + '[- ]?' + number + '([a-z0-9]*)([^a-z0-9]|$)', 'i');
      return rx.test(target);
    }

    if(/^\d{2,5}[a-z]*$/.test(c)){
      const number = c.match(/\d{2,5}/)[0];
      const standalone = new RegExp('(^|[^a-z0-9])' + number + '([a-z]{0,3})([^a-z0-9]|$)', 'i');
      const prefixed = new RegExp('(^|[^a-z0-9])(tn|dr|cf|ce|q|mlt|d)[- ]?' + number + '([a-z0-9]*)([^a-z0-9]|$)', 'i');
      return standalone.test(target) || prefixed.test(target);
    }

    const safe = c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\\-/g, '[- ]?');
    const rx = new RegExp('(^|[^a-z0-9])' + safe + '([^a-z0-9]|$)', 'i');
    return rx.test(target) || compactTarget.includes(c);
  }

  function searchByCodes(text){
    const codes = extractCodes(text);
    if(!codes.length) return [];

    const desiredKind = kindFromText(text);
    const hasPrefixedInput = codes.some(isPrefixCode);

    return getProducts().map(p => {
      let score = 0;

      codes.forEach(code => {
        if(codeExactInProduct(p, code)){
          score += isPrefixCode(code) ? 130 : 100;
        }
      });

      const pk = kindProduct(p);
      const codeText = clean(codes.join(' '));

      if(/\btn[- ]?\d+/.test(codeText) && pk === 'toner') score += 35;
      if(/\bdr[- ]?\d+/.test(codeText) && pk === 'fotocondutor') score += 35;
      if(/\btn[- ]?\d+/.test(codeText) && pk && pk !== 'toner') score -= 120;
      if(/\bdr[- ]?\d+/.test(codeText) && pk && pk !== 'fotocondutor') score -= 120;

      if(desiredKind && pk && desiredKind !== pk && !hasPrefixedInput) score -= 200;
      if(desiredKind && pk === desiredKind) score += 15;

      return {p, score};
    })
    .filter(x => x.score >= 100)
    .sort((a,b) => b.score - a.score)
    .slice(0, 8)
    .map(x => x.p);
  }

  function searchGeneral(text){
    const q = clean(text);
    const stop = new Set([
      'ola','bom','boa','dia','tarde','noite','voce','voces','tem','tenho','queria',
      'quero','preciso','saber','qual','quais','produto','produtos','serve','servem',
      'impressora','modelo','para','pra','pro','uma','umas','uns','com','sem','valor',
      'preco','preço','orcamento','orçamento','cotacao','cotação','comprar','compra',
      'compatível','compativel','toner','cartucho','cilindro','fotocondutor','tinta',
      'pedido','pedi','unidades','unidade','und','un','entrega','frete','prazo','cep'
    ]);
    const words = q.split(' ').filter(w => w.length >= 3 && !stop.has(w) && !/^\d+$/.test(w));
    if(!words.length) return [];

    const desiredKind = kindFromText(text);

    return getProducts().map(p => {
      const all = field(p);
      let score = 0;
      words.forEach(w => {
        if(all.includes(w)) score += 1;
        if(clean(p.name).includes(w)) score += 4;
        if(clean(p.sku).includes(w)) score += 6;
        if(clean(p.brand).includes(w)) score += 2;
      });

      const pk = kindProduct(p);
      if(desiredKind && pk && desiredKind !== pk) score -= 20;
      if(desiredKind && pk === desiredKind) score += 5;

      return {p, score};
    })
    .filter(x => x.score > 0)
    .sort((a,b) => b.score - a.score)
    .slice(0, 5)
    .map(x => x.p);
  }

  function searchCatalog(text){
    const byCode = searchByCodes(text);
    if(byCode.length) return byCode;
    return searchGeneral(text);
  }

  function filterByVariant(list, text){
    const variant = requestedVariant(text);
    if(!variant) return list;
    return list.filter(p => productColor(p) === variant);
  }

  function addText(text, who){
    const body = document.getElementById('cecSalesAiBody122');
    if(!body || !text) return;
    const div = document.createElement('div');
    div.className = 'cec-sales-msg ' + who;
    div.textContent = text;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
  }

  function clearChat(){
    const body = document.getElementById('cecSalesAiBody122');
    if(body) body.innerHTML = '';
    clearPending();
    pendingTopic = '';
    addText('Atendimento limpo. Pode digitar uma nova pergunta.', 'bot');
  }

  function showChoices(list, originalText, mode){
    const body = document.getElementById('cecSalesAiBody122');
    if(!body || !list.length) return;

    const qty = qtyFrom(originalText);
    const codes = extractCodes(originalText);
    const isQuote = mode === 'quote';

    const intro = isQuote && qty
      ? `Para montar o orçamento de ${qty} unidade${qty > 1 ? 's' : ''}${codes.length ? ' do código ' + codes.join(', ').toUpperCase() : ''}, preciso saber qual opção você quer:`
      : `Encontrei opções para ${codes.length ? 'o código ' + codes.join(', ').toUpperCase() : 'sua busca'}. Qual delas você deseja?`;

    const wrap = document.createElement('div');
    wrap.className = 'cec-sales-results';
    wrap.innerHTML = `
      <div class="cec-sales-msg bot">${esc(intro)}</div>
      ${list.map((p, i) => `
        <article class="cec-sales-choice">
          <strong>${i + 1}. ${esc(p.name)}</strong>
          <small>${esc([kindProduct(p), productColor(p), p.sku ? 'Cód.: '+p.sku : '', money(p.price)].filter(Boolean).join(' • '))}</small>
        </article>
      `).join('')}
      <div class="cec-sales-msg bot">Responda pelo número da opção ou pelo modelo/cor. Exemplo: “1”, “2”, “preto”, “colorido”, “TN1060” ou “DR1060”.</div>
    `;
    body.appendChild(wrap);
    body.scrollTop = body.scrollHeight;
  }

  function showProduct(product){
    pendingProduct = product;
    const body = document.getElementById('cecSalesAiBody122');
    if(!body) return;

    const stock = Number(product.stock || 0);

    const wrap = document.createElement('div');
    wrap.className = 'cec-sales-results';
    wrap.innerHTML = `
      <div class="cec-sales-msg bot">Encontrei este produto:</div>
      <article class="cec-sales-product">
        <strong>${esc(product.name)}</strong>
        <small>${esc([product.category, product.sku ? 'Cód.: '+product.sku : '', product.brand].filter(Boolean).join(' • '))}</small>
        <div><b>Valor:</b><span>${money(product.price)}</span></div>
        <div><b>Estoque:</b><span>${stock > 0 ? esc(stock) : 'sob consulta'}</span></div>
        <button type="button" data-cec-ai-add="${esc(product.id)}" data-cec-ai-qty="1">Adicionar 1 ao carrinho</button>
      </article>
      <div class="cec-sales-msg bot">Para orçamento, informe a quantidade. Exemplo: “10 unidades”.</div>
    `;

    body.appendChild(wrap);
    body.scrollTop = body.scrollHeight;
  }

  function showQuote(product, qty){
    const body = document.getElementById('cecSalesAiBody122');
    if(!body || !product || !qty) return;

    const total = Number(product.price || 0) * qty;
    const stock = Number(product.stock || 0);

    const wrap = document.createElement('div');
    wrap.className = 'cec-sales-results';
    wrap.innerHTML = `
      <div class="cec-sales-msg bot">Orçamento estimado:</div>
      <article class="cec-sales-product">
        <strong>${esc(product.name)}</strong>
        <small>${esc([product.category, product.sku ? 'Cód.: '+product.sku : '', product.brand].filter(Boolean).join(' • '))}</small>
        <div><b>Quantidade:</b><span>${qty} unidade${qty > 1 ? 's' : ''}</span></div>
        <div><b>Valor unitário:</b><span>${money(product.price)}</span></div>
        <div><b>Total:</b><span>${money(total)}</span></div>
        <div><b>Estoque:</b><span>${stock > 0 ? esc(stock) : 'sob consulta'}</span></div>
        <button type="button" data-cec-ai-add="${esc(product.id)}" data-cec-ai-qty="${esc(qty)}">Adicionar ${qty} ao carrinho</button>
      </article>
      <div class="cec-sales-msg bot">Você pode adicionar ao carrinho ou chamar a C&C no WhatsApp para confirmar disponibilidade.</div>
    `;

    body.appendChild(wrap);
    body.scrollTop = body.scrollHeight;
  }

  function clearPending(){
    pendingProducts = [];
    pendingQty = 0;
    pendingProduct = null;
    pendingMode = 'product';
  }

  function answerService(text){
    const cep = isCep(text);

    if(isClear(text)){
      clearChat();
      return true;
    }

    if(pendingTopic === 'delivery' && cep){
      addText(`Recebi o CEP ${cep.replace(/(\d{5})(\d{3})/, '$1-$2')}. Para confirmar prazo e frete, informe também os produtos desejados ou chame a C&C no WhatsApp.`, 'bot');
      return true;
    }

    if(isTracking(text)){
      addText('Para acompanhar seu pedido, acesse “Acompanhar pedido” no menu e informe o código recebido na finalização. Também posso encaminhar para o WhatsApp da C&C.', 'bot');
      pendingTopic = '';
      return true;
    }

    if(isDelivery(text)){
      addText('Para entrega/frete, informe cidade, bairro ou CEP. A C&C confirma prazo conforme região, produto e disponibilidade.', 'bot');
      pendingTopic = 'delivery';
      return true;
    }

    if(isPayment(text)){
      addText('O pagamento principal pelo site é via PIX. Após finalizar o pedido, o site mostra as informações para pagamento e acompanhamento.', 'bot');
      pendingTopic = '';
      return true;
    }

    if(isExchange(text)){
      addText('Para troca, devolução ou garantia, envie número do pedido, produto, motivo e telefone para retorno. Também pode chamar a C&C no WhatsApp.', 'bot');
      pendingTopic = '';
      return true;
    }

    if(isHuman(text)){
      addText('Clique em “Chamar no WhatsApp” para falar com a C&C pelo (67) 3042-4796.', 'bot');
      pendingTopic = '';
      return true;
    }

    return false;
  }

  function send(text){
    const msg = String(text || '').trim();
    if(!msg) return;

    const now = Date.now();
    if(msg === lastMessage && now - lastTime < 1200) return;
    lastMessage = msg;
    lastTime = now;

    addText(msg, 'user');

    setTimeout(() => {
      if(answerService(msg)) return;

      const q = clean(msg);

      // Responder pelo número da opção.
      if(pendingProducts.length && /^\d{1,2}$/.test(q)){
        const idx = Number(q) - 1;
        if(idx >= 0 && idx < pendingProducts.length){
          const selected = pendingProducts[idx];
          const qtySaved = pendingQty || 0;
          const modeSaved = pendingMode;
          clearPending();

          if(qtySaved && modeSaved === 'quote') showQuote(selected, qtySaved);
          else showProduct(selected);
          return;
        }
      }

      const qty = qtyFrom(msg);
      const codes = extractCodes(msg);
      const variant = requestedVariant(msg);

      // Responder só cor/modelo depois de uma lista.
      if(pendingProducts.length && variant && !codes.length){
        const selected = filterByVariant(pendingProducts, msg);
        if(selected.length === 1){
          const qtySaved = pendingQty || 0;
          const modeSaved = pendingMode;
          clearPending();
          if(qtySaved && modeSaved === 'quote') showQuote(selected[0], qtySaved);
          else showProduct(selected[0]);
          return;
        }
      }

      // Responder só tipo depois de uma lista.
      if(pendingProducts.length && !codes.length){
        let selected = [];
        if(/\btoner\b/.test(q)) selected = pendingProducts.filter(p => kindProduct(p) === 'toner');
        if(/\bfotocondutor\b|\bcilindro\b/.test(q)) selected = pendingProducts.filter(p => kindProduct(p) === 'fotocondutor');
        if(selected.length === 1){
          const qtySaved = pendingQty || 0;
          const modeSaved = pendingMode;
          clearPending();
          if(qtySaved && modeSaved === 'quote') showQuote(selected[0], qtySaved);
          else showProduct(selected[0]);
          return;
        }
      }

      // Responder TN1060/DR1060 depois de lista.
      if(pendingProducts.length && codes.length){
        let selected = searchCatalog(msg);
        if(selected.length === 1){
          const qtySaved = pendingQty || qty || 0;
          const modeSaved = pendingMode;
          clearPending();
          if(qtySaved && modeSaved === 'quote') showQuote(selected[0], qtySaved);
          else showProduct(selected[0]);
          return;
        }
      }

      // Responder só quantidade depois de produto único.
      if(pendingProduct && qty && !codes.length && !variant){
        const selected = pendingProduct;
        pendingProduct = null;
        showQuote(selected, qty);
        return;
      }

      let found = searchCatalog(msg);

      if(found.length && variant){
        const filtered = filterByVariant(found, msg);
        if(filtered.length) found = filtered;
      }

      const quoteMode = wantsQuote(msg) || qty > 0;

      if(found.length > 1 && codes.length && !variant){
        pendingProducts = found;
        pendingQty = qty || 0;
        pendingProduct = null;
        pendingMode = quoteMode ? 'quote' : 'product';
        showChoices(found, msg, pendingMode);
        return;
      }

      if(found.length === 1){
        if(quoteMode && qty) showQuote(found[0], qty);
        else showProduct(found[0]);
        return;
      }

      if(found.length > 1){
        pendingProducts = found;
        pendingQty = qty || 0;
        pendingMode = quoteMode ? 'quote' : 'product';
        showChoices(found, msg, pendingMode);
        return;
      }

      if(wantsQuote(msg)){
        addText('Claro. Para montar o orçamento, me informe modelo/código do produto e quantidade. Exemplo: “10 unidades do 954 preto”, “10 954” ou “2 TN1060”.', 'bot');
      }else{
        addText('Digite o código/modelo do produto. Para orçamento, envie também a quantidade. Exemplo: “954 preto”, “10 954” ou “2 TN1060”.', 'bot');
      }
    }, 150);
  }

  function openWhatsapp(){
    const body = document.getElementById('cecSalesAiBody122');
    const history = body ? Array.from(body.querySelectorAll('.cec-sales-msg')).slice(-10).map(el => {
      return (el.classList.contains('user') ? 'Cliente: ' : 'C&C: ') + el.textContent;
    }).join('\n') : '';

    window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent('Olá, vim pelo site da C&C Distribuidora e preciso de atendimento.\n\n' + history), '_blank', 'noopener');
  }

  function removeOldBots(){
    ['cecChatWidget','cecSmartBotV106','cecBotV106','cecAssistV107','cecAssistantV108','cecSalesAiV109','cecSalesAiV111','cecSalesAiV112','cecSalesAiV113','cecSalesAiV114','cecSalesAiV115','cecSalesAiV118','cecSalesAiV120','cecSalesAiV121','cecSalesAiV122'].forEach(id => {
      const el = document.getElementById(id);
      if(el) el.remove();
    });
    document.querySelectorAll('.cec-chat-widget,.cec-smartbot,.cec-bot,.cec-assist,.cec-assistant,.cec-sales-ai').forEach(el => el.remove());
  }

  function init(){
    if(location.pathname.includes('admin.html')) return;
    removeOldBots();

    const root = document.createElement('div');
    root.id = ROOT_ID;
    root.className = 'cec-sales-ai';
    root.innerHTML = `
      <button class="cec-sales-open" id="cecSalesAiOpen122" type="button" aria-label="Fale com a C&C">
        <span>💬</span>
        <strong>Fale com a C&C</strong>
      </button>

      <section class="cec-sales-panel hidden" id="cecSalesAiPanel122">
        <header>
          <div>
            <strong>Fale com a C&C</strong>
          </div>
          <button type="button" id="cecSalesAiClose122" aria-label="Fechar">×</button>
        </header>

        <main id="cecSalesAiBody122" class="cec-sales-body"></main>

        <form id="cecSalesAiForm122" class="cec-sales-form">
          <input id="cecSalesAiInput122" placeholder="Ex.: 954 preto, entrega, acompanhar pedido..." autocomplete="off">
          <button type="submit">Enviar</button>
        </form>

        <button class="cec-sales-wpp" id="cecSalesAiWpp122" type="button">Chamar no WhatsApp</button>
      </section>
    `;

    document.body.appendChild(root);

    const open = document.getElementById('cecSalesAiOpen122');
    const panel = document.getElementById('cecSalesAiPanel122');

    open.addEventListener('click', () => {
      panel.classList.remove('hidden');
      open.classList.add('hidden');
      const body = document.getElementById('cecSalesAiBody122');
      if(!body.dataset.started){
        body.dataset.started = '1';
        addText('Olá! Posso ajudar com produtos, orçamento, entrega, pagamento, trocas/devoluções ou acompanhar pedido.', 'bot');
      }
      setTimeout(() => document.getElementById('cecSalesAiInput122')?.focus(), 80);
    });

    document.getElementById('cecSalesAiClose122').addEventListener('click', () => {
      panel.classList.add('hidden');
      open.classList.remove('hidden');
    });

    document.getElementById('cecSalesAiForm122').addEventListener('submit', e => {
      e.preventDefault();
      e.stopPropagation();
      const input = document.getElementById('cecSalesAiInput122');
      send(input.value);
      input.value = '';
    });

    root.addEventListener('click', e => {
      const btn = e.target.closest('[data-cec-ai-add]');
      if(!btn) return;
      e.preventDefault();
      e.stopPropagation();

      const id = btn.dataset.cecAiAdd;
      const qty = Math.max(1, Number(btn.dataset.cecAiQty || 1));

      if(window.cecSuppressNextCartOpenV110) window.cecSuppressNextCartOpenV110();

      if(typeof addProductToCart === 'function'){
        addProductToCart(id, qty);
        addText(`${qty} unidade${qty > 1 ? 's' : ''} adicionada${qty > 1 ? 's' : ''} ao carrinho. Continue escolhendo produtos ou abra o carrinho quando terminar.`, 'bot');
      }else{
        addText('Não consegui adicionar automaticamente. Abra o produto na loja ou chame a C&C no WhatsApp.', 'bot');
      }
    });

    document.getElementById('cecSalesAiWpp122').addEventListener('click', openWhatsapp);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init, {once:true});
  }else{
    init();
  }
})();

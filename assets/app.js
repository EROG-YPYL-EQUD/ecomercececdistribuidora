let CEC_WHATSAPP = '556730424796';
let CEC_PIX_KEY = '37492135000121';
let CEC_PIX_KEY_DISPLAY = '37.492.135/0001-21';
let CEC_PIX_MERCHANT_NAME = 'C&C DISTRIBUIDORA';
let CEC_PIX_MERCHANT_CITY = 'CAMPO GRANDE';
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

const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));
const fmt = v => Number(v || 0).toLocaleString('pt-BR', {style:'currency', currency:'BRL'});
const esc = v => String(v ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const parseMoney = value => Number(String(value ?? '').replace(/\./g,'').replace(',','.').replace(/[^0-9.\-]/g,'')) || 0;
const loadJson = (key, fallback) => { try { const v = JSON.parse(localStorage.getItem(key)); return v || fallback; } catch(e){ return fallback; } };
const saveJson = (key, value) => localStorage.setItem(key, JSON.stringify(value));
function loadProducts(){ return normalizeProductImagesV41(loadJson('cec_products', CEC_DEFAULT_PRODUCTS)); }
function saveProducts(products){ saveJson('cec_products', products); }
function loadOrders(){ return loadJson('cec_orders', []); }
function saveOrders(orders){ saveJson('cec_orders', orders); }
function loadCart(){ return loadJson('cec_cart', []); }
function saveCart(cart){ saveJson('cec_cart', cart); }
function nextOrderNumber(){
  const orders = loadOrders();
  const maxFromOrders = orders.reduce((max, order) => {
    const match = String(order.code || '').match(/CEC-(\d+)/);
    return match ? Math.max(max, Number(match[1])) : max;
  }, 0);
  const stored = Number(localStorage.getItem('cec_order_seq') || 0);
  const next = Math.max(stored, maxFromOrders) + 1;
  localStorage.setItem('cec_order_seq', String(next));
  return next;
}
function makeCode(){ return 'CEC-' + String(nextOrderNumber()).padStart(6,'0'); }
function todayBR(){ return new Date().toLocaleString('pt-BR'); }
function statusClass(status){
 if(['Entregue','Enviado'].includes(status)) return 'ok';
 if(['Cancelado'].includes(status)) return 'danger';
 if(['Em separação','Aguardando pagamento'].includes(status)) return 'warn';
 return '';
}
function toast(message){ const el=$('#toast'); if(!el) return; el.textContent=message; el.classList.add('show'); setTimeout(()=>el.classList.remove('show'),2200); }

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

function loadSiteConfig(){
  const saved = loadJson('cec_site_config', {});
  return {...CEC_DEFAULT_SITE_CONFIG, ...saved};
}
function saveSiteConfig(config){ saveJson('cec_site_config', {...loadSiteConfig(), ...config}); }
function digitsOnly(value){ return String(value || '').replace(/\D/g,''); }
function waUrl(number){ return 'https://wa.me/55' + digitsOnly(number).replace(/^55/,''); }
function applySiteConfig(){
  const cfg = loadSiteConfig();
  CEC_WHATSAPP = cfg.whatsappMain;
  CEC_PIX_KEY = cfg.pixKey;
  CEC_PIX_KEY_DISPLAY = cfg.pixKeyDisplay;
  CEC_PIX_MERCHANT_NAME = cfg.pixMerchantName;
  CEC_PIX_MERCHANT_CITY = cfg.pixMerchantCity;
  document.documentElement.style.setProperty('--company-name', `"${cfg.companyName}"`);
  $$('[data-config]').forEach(el => {
    const key = el.dataset.config;
    const val = cfg[key] ?? '';
    if(el.tagName === 'A' && el.dataset.hrefType === 'whatsapp') el.href = waUrl(val);
    else if(el.tagName === 'A' && el.dataset.hrefType === 'email') el.href = 'mailto:' + val;
    else el.innerHTML = esc(val).replace(/\n/g,'<br>');
  });
  $$('[data-config-text]').forEach(el => {
    const key = el.dataset.configText;
    el.textContent = cfg[key] ?? '';
  });
  $$('[data-wa-main]').forEach(a => a.href = waUrl(cfg.whatsappMain));
  $$('[data-wa-support]').forEach(a => a.href = waUrl(cfg.whatsappSupport));
  $$('[data-email-sales]').forEach(a => { a.href = 'mailto:' + cfg.emailSales; a.textContent = cfg.emailSales; });
  $$('[data-email-warranty]').forEach(a => { a.href = 'mailto:' + cfg.emailWarranty; a.textContent = cfg.emailWarranty; });
  const title = $('title'); if(title && cfg.seoTitle) title.textContent = cfg.seoTitle;
  const desc = document.querySelector('meta[name="description"]'); if(desc && cfg.seoDescription) desc.setAttribute('content', cfg.seoDescription);
  const keywords = document.querySelector('meta[name="keywords"]'); if(keywords && cfg.seoKeywords) keywords.setAttribute('content', cfg.seoKeywords);
}

function normalizePixText(value, max=99){
 return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^A-Za-z0-9 \-\.\&\*]/g,'').toUpperCase().slice(0,max);
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
async function copyTextValue(text, label='Texto copiado'){ try{ await navigator.clipboard.writeText(text); toast(label); }catch(e){ toast('Não foi possível copiar automaticamente'); } }
function renderPixBlock({amount, txid, qrId, amountId, payloadId, keyId}){
 const payload = buildPixPayload(amount, txid);
 const qr = $(qrId); if(qr) qr.src = pixQrUrl(payload);
 const amountEl = $(amountId); if(amountEl) amountEl.textContent = fmt(amount);
 const payloadEl = $(payloadId); if(payloadEl) payloadEl.value = payload;
 const keyEl = $(keyId); if(keyEl) keyEl.textContent = CEC_PIX_KEY_DISPLAY;
 return payload;
}

function setupCepMask(){
  const cep = $('#orderCep');
  if(!cep) return;
  cep.addEventListener('input', () => {
    let value = cep.value.replace(/\D/g,'').slice(0,8);
    if(value.length > 5) value = value.slice(0,5) + '-' + value.slice(5);
    cep.value = value;
  });
}

function setupMenu(){
 const btn = $('#mobileToggle'); const menu = $('#mainMenu');
 if(btn && menu) btn.addEventListener('click',()=>menu.classList.toggle('open'));
}
function productIcon(category){ return category === 'Toner' ? '▰' : category === 'Fotocondutor' ? '◎' : '◧'; }
function defaultImageForCategory(category){
 const c = String(category || '').toLowerCase();
 if(c.includes('toner')) return 'assets/img/prod-toner.svg';
 if(c.includes('fotocondutor')) return 'assets/img/prod-fotocondutor.svg';
 return 'assets/img/prod-cartucho.svg';
}
function productImage(p){ return p?.imageData || (String(p?.image || '').startsWith('data:image/') ? p.image : (p?.image || defaultImageForCategory(p?.category))); }

function productImageLabelV41(p){
  const path = p?.image || '';
  const hasData = !!p?.imageData || String(path).startsWith('data:image/');
  if(hasData){
    const cleanPath = String(path).startsWith('data:image/') ? '' : path;
    return cleanPath || 'Imagem anexada no cadastro';
  }
  return path || defaultImageForCategory(p?.category);
}
function hideBase64TextV41(value){
  const txt = String(value || '');
  return txt.startsWith('data:image/') ? 'Imagem anexada no cadastro' : txt;
}

function productArt(p, extra=''){
 const src = productImage(p);
 return `<div class="product-art product-art-img ${extra}"><span class="badge">${esc(p.tag || p.category)}</span><img src="${esc(src)}" alt="${esc(p.name)}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='grid';"><span class="fallback-icon">${productIcon(p.category)}</span></div>`;
}
function productCard(p){
 const compat = p.compatiblePrinters ? `<p class="product-compat-v30"><strong>Compatível com:</strong> ${esc(p.compatiblePrinters).slice(0,140)}${String(p.compatiblePrinters).length>140?'...':''}</p>` : '';
 const skuLine = [p.brand, p.sku, p.color].filter(Boolean).join(' • ');
 return `<article class="card product">
  ${productArt(p)}
  <div class="product-body">
   <div class="tag">${esc(p.tag || p.type || p.category)}</div>
   <h3>${esc(p.name)}</h3>
   ${skuLine ? `<p class="product-code-v30">${esc(skuLine)}</p>` : ''}
   <p>${esc(p.desc || '')}</p>
   ${compat}
   <p><strong>Categoria:</strong> ${esc(p.category)} ${Number(p.stock ?? 0) > 0 ? `• Estoque: ${Number(p.stock)}` : '• Sob consulta'}</p>
   <div class="price">${fmt(p.price)}</div>
   <div class="product-actions">
    <button class="btn btn-outline" type="button" data-view="${p.id}">Detalhes</button>
    <button class="btn btn-primary" type="button" data-add="${p.id}">Adicionar</button>
   </div>
  </div>
 </article>`;
}
function openProductModal(p){
 $('#productModalTitle').textContent = p.name;
 const details = [
  p.type ? `<p><strong>Tipo:</strong> ${esc(p.type)}</p>` : '',
  p.brand ? `<p><strong>Marca:</strong> ${esc(p.brand)}</p>` : '',
  p.sku ? `<p><strong>Código/SKU:</strong> ${esc(p.sku)}</p>` : '',
  p.color ? `<p><strong>Cor:</strong> ${esc(p.color)}</p>` : '',
  p.yield ? `<p><strong>Rendimento:</strong> ${esc(p.yield)}</p>` : '',
  p.compatiblePrinters ? `<p><strong>Impressoras compatíveis:</strong><br>${esc(p.compatiblePrinters).replace(/\n/g,'<br>')}</p>` : '',
  p.notes ? `<p><strong>Observações:</strong><br>${esc(p.notes).replace(/\n/g,'<br>')}</p>` : ''
 ].join('');
 $('#productModalBody').innerHTML = `${productArt(p, 'modal-product-art')}
  <p>${esc(p.desc || '')}</p>${details}<p><strong>Categoria:</strong> ${esc(p.category)}</p><p><strong>Estoque:</strong> ${Number(p.stock ?? 0) || 'Sob consulta'}</p><div class="price">${fmt(p.price)}</div><br><button class="btn btn-primary" data-add-modal="${p.id}">Adicionar ao carrinho</button>`;
 $('#productModal').classList.add('open'); document.body.classList.add('lock');
}
function setupModals(){
 $$('.modal').forEach(m => m.addEventListener('click', e => { if(e.target === m){ m.classList.remove('open'); document.body.classList.remove('lock'); } }));
 $$('[data-close-modal]').forEach(btn => btn.addEventListener('click', () => { btn.closest('.modal')?.classList.remove('open'); document.body.classList.remove('lock'); }));
 $('#productModal')?.addEventListener('click', e => {
  const btn=e.target.closest('[data-add-modal]'); if(!btn) return;
  let cart=loadCart(); const id=Number(btn.dataset.addModal); const item=cart.find(i=>i.id===id); if(item) item.qty++; else cart.push({id,qty:1}); saveCart(cart); updateCartCount(cart); renderCart(); toast('Produto adicionado ao carrinho'); $('#productModal').classList.remove('open'); document.body.classList.remove('lock');
 });
}
function openCheckout(){
 const items=cartProducts();
 const total = cartTotal(items);
 $('#orderSummary').innerHTML = items.map(i=>`<div class="order-line"><span>${esc(i.name)} x ${i.qty}</span><strong>${fmt(i.price*i.qty)}</strong></div>`).join('') + `<div class="order-line"><strong>Total</strong><strong>${fmt(total)}</strong></div>`;
 const isPix = ($('#orderPayment')?.value || 'Pix') === 'Pix';
 $('#pixCheckoutBox') && ($('#pixCheckoutBox').style.display = isPix ? 'block' : 'none');
 if(isPix) renderPixBlock({ amount: total, txid: 'PEDIDO', qrId:'#pixQrPreview', amountId:'#pixAmountPreview', payloadId:'#pixPayloadPreview', keyId:'#pixKeyText' });
 $('#orderModal').classList.add('open'); document.body.classList.add('lock');
}
function setupCheckout(){
 $('#orderPayment')?.addEventListener('change', () => {
  const isPix = ($('#orderPayment')?.value || 'Pix') === 'Pix';
  $('#pixCheckoutBox') && ($('#pixCheckoutBox').style.display = isPix ? 'block' : 'none');
  if(isPix){
   renderPixBlock({ amount: cartTotal(cartProducts()), txid: 'PEDIDO', qrId:'#pixQrPreview', amountId:'#pixAmountPreview', payloadId:'#pixPayloadPreview', keyId:'#pixKeyText' });
  }
 });
 $('#copyPixKeyBtn')?.addEventListener('click', () => copyTextValue(CEC_PIX_KEY, 'Chave Pix copiada'));
 $('#copyPixPayloadBtn')?.addEventListener('click', () => copyTextValue($('#pixPayloadPreview')?.value || '', 'Pix Copia e Cola copiado'));
 $('#copyPixKeyDoneBtn')?.addEventListener('click', () => copyTextValue(CEC_PIX_KEY, 'Chave Pix copiada'));
 $('#copyPixDoneBtn')?.addEventListener('click', () => copyTextValue($('#pixPayloadDone')?.value || '', 'Pix Copia e Cola copiado'));
 $('#orderForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const items = cartProducts(); if(!items.length) return toast('Carrinho vazio');
  const payment = $('#orderPayment')?.value || 'Pix';
  const code = makeCode();
  const total = cartTotal(items);
  const pixPayload = payment === 'Pix' ? buildPixPayload(total, code) : '';
  const order = {
   code, createdAt: todayBR(), status: payment === 'Pix' ? 'Aguardando pagamento' : 'Novo pedido',
   payment, pixKey: payment === 'Pix' ? CEC_PIX_KEY : '', pixPayload,
   customer: $('#orderName').value.trim(),
      phone: $('#orderPhone').value.trim(),
      deliveryType: $('#orderDeliveryType')?.value || 'Entrega',
      city: $('#orderCity')?.value.trim() || '',
      cep: $('#orderCep')?.value.trim() || '',
      address: $('#orderAddress')?.value.trim() || '',
      note: $('#orderNote').value.trim(),
   items: items.map(i=>({id:i.id,name:i.name,price:i.price,qty:i.qty})), total
  };
  const orders = loadOrders(); orders.unshift(order); saveOrders(orders);
  saveCart([]); updateCartCount([]); renderCart();

  const paymentLines = payment === 'Pix'
   ? ['Forma de pagamento: Pix', `Chave Pix CNPJ: ${CEC_PIX_KEY_DISPLAY}`, `Pix Copia e Cola: ${pixPayload}`, 'Enviei/enviarei o comprovante por aqui.']
   : [`Forma de pagamento: ${payment}`];

  const lines = [
   `Pedido ${order.code}`,
   `Cliente: ${order.customer}`,
   `WhatsApp: ${order.phone}`,
   `Atendimento: ${order.deliveryType || 'Entrega'}`,
   order.city?`Cidade/UF: ${order.city}`:'',
   order.cep?`CEP: ${order.cep}`:'',
   order.address?`Endereço: ${order.address}`:'',
   '',
   ...order.items.map(i=>`- ${i.qty}x ${i.name} = ${fmt(i.price*i.qty)}`),
   '',
   `Total: ${fmt(order.total)}`,
   ...paymentLines,
   order.note?`Obs: ${order.note}`:''
  ].filter(Boolean);

  window.open(`https://wa.me/${CEC_WHATSAPP}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank');

  $('#orderModal').classList.remove('open'); document.body.classList.remove('lock');
  $('#orderDoneCode') && ($('#orderDoneCode').textContent = order.code);
  if($('#orderDonePix')){
   $('#orderDonePix').innerHTML = payment === 'Pix'
    ? `<strong>Pagamento por Pix</strong><br>Valor: <strong>${fmt(order.total)}</strong><br>Chave Pix CNPJ: <strong>${CEC_PIX_KEY_DISPLAY}</strong><br><small>Escaneie o QR Code ou use o Pix Copia e Cola abaixo. Depois envie o comprovante pelo WhatsApp.</small>`
    : `<strong>Pagamento:</strong> ${esc(payment)}<br><small>A loja confirmará as condições pelo WhatsApp.</small>`;
  }
  if(payment === 'Pix'){
   renderPixBlock({ amount: order.total, txid: order.code, qrId:'#pixQrDone', amountId:'#pixAmountDone', payloadId:'#pixPayloadDone', keyId:'#pixKeyDone' });
  }else{
   $('#pixQrDone') && ($('#pixQrDone').removeAttribute('src'));
   $('#pixAmountDone') && ($('#pixAmountDone').textContent = fmt(order.total));
   $('#pixPayloadDone') && ($('#pixPayloadDone').value = '');
   $('#pixKeyDone') && ($('#pixKeyDone').textContent = '—');
  }
  const donePanel = $('.pix-panel-done'); if(donePanel) donePanel.style.display = payment === 'Pix' ? 'grid' : 'none';
  $('#orderDoneModal')?.classList.add('open'); document.body.classList.add('lock');
  $('#orderForm').reset();
  $('#orderPayment') && ($('#orderPayment').value = 'Pix');
 });
}
function setupTracking(){
 const form=$('#trackForm'); if(!form) return;
 form.addEventListener('submit', e => {
  e.preventDefault();
  const code = $('#trackCode').value.trim().toUpperCase();
  const order = loadOrders().find(o => String(o.code).toUpperCase() === code);
  const result = $('#trackResult');
  if(!order){ result.innerHTML = '<div class="muted-box">Pedido não encontrado neste navegador. Em site estático, a consulta só funciona se o pedido foi salvo neste mesmo navegador. Para consulta real online precisa ligar ao Firebase/Supabase.</div>'; return; }
  result.innerHTML = `<div class="card"><h3>Pedido ${esc(order.code)}</h3><p>Cliente: ${esc(order.customer)}</p><p>Data: ${esc(order.createdAt)}</p><p>Pagamento: ${esc(order.payment || 'Não informado')}</p><p>Atendimento: ${esc(order.deliveryType || 'Entrega')}</p>${order.city ? `<p>Cidade/UF: ${esc(order.city)}</p>` : ''}${order.cep ? `<p>CEP: ${esc(order.cep)}</p>` : ''}${order.address ? `<p>Endereço: ${esc(order.address)}</p>` : ''}<p>Status: <span class="status ${statusClass(order.status)}">${esc(order.status)}</span></p>${(order.payment === 'Pix') ? `<div class="pix-panel track-pix-panel" style="margin-top:12px"><div class="pix-qr-wrap"><img id="trackPixQr" alt="QR Code Pix do pedido" /></div><div class="pix-panel-body"><div class="muted-box"><strong>Valor do pedido</strong><br><span id="trackPixAmount"></span></div><div class="muted-box"><strong>Chave Pix CNPJ</strong><br><span id="trackPixKey"></span><div class="actions" style="margin-top:12px"><button class="btn btn-soft" id="trackCopyPixKeyBtn" type="button">Copiar chave Pix</button></div></div><div class="field full"><label>Pix Copia e Cola</label><textarea id="trackPixPayload" rows="4" readonly></textarea></div><div class="actions"><button class="btn btn-primary" id="trackCopyPixPayloadBtn" type="button">Copiar Pix Copia e Cola</button></div><small>${order.status === 'Aguardando pagamento' ? 'Escaneie o QR Code ou use o Pix Copia e Cola e envie o comprovante para a loja.' : 'Pagamento Pix cadastrado para este pedido.'}</small></div></div>` : ''}<div class="muted-box" style="margin-top:12px">${order.items.map(i=>`<div class="order-line"><span>${esc(i.name)} x ${i.qty}</span><strong>${fmt(i.price*i.qty)}</strong></div>`).join('')}<div class="order-line"><strong>Total</strong><strong>${fmt(order.total)}</strong></div></div></div>`;
  if(order.payment === 'Pix'){
   const payload = order.pixPayload || buildPixPayload(order.total, order.code);
   $('#trackPixQr') && ($('#trackPixQr').src = pixQrUrl(payload));
   $('#trackPixAmount') && ($('#trackPixAmount').textContent = fmt(order.total));
   $('#trackPixKey') && ($('#trackPixKey').textContent = CEC_PIX_KEY_DISPLAY);
   $('#trackPixPayload') && ($('#trackPixPayload').value = payload);
   $('#trackCopyPixKeyBtn')?.addEventListener('click', () => copyTextValue(CEC_PIX_KEY, 'Chave Pix copiada'));
   $('#trackCopyPixPayloadBtn')?.addEventListener('click', () => copyTextValue(payload, 'Pix Copia e Cola copiado'));
  }
 });
}


function slugFileNameV39(name){
  const parts = String(name || 'produto.jpg').split('.');
  const ext = parts.length > 1 ? parts.pop().toLowerCase().replace(/[^a-z0-9]/g,'') : 'jpg';
  const base = parts.join('.')
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g,'-')
    .replace(/^-+|-+$/g,'') || 'produto';
  return `${base}.${ext || 'jpg'}`;
}

function updateProductImagePreviewV39(){
  const pathInput = $('#prodImage');
  const dataInput = $('#prodImageData');
  const box = $('#prodImagePreviewBox');
  const img = $('#prodImagePreview');
  const label = $('#prodImagePreviewPath');
  if(!pathInput || !box || !img) return;

  const imageData = dataInput?.value || '';
  const path = pathInput.value.trim();
  const src = imageData || path;

  if(!src){
    box.style.display = 'none';
    if(img) img.removeAttribute('src');
    return;
  }

  img.src = src;
  label && (label.textContent = '');
  box.style.display = 'flex';
}

function setupProductImagePathV39(){
  const file = $('#prodImageFile');
  const pathInput = $('#prodImage');
  const dataInput = $('#prodImageData');

  if(file && pathInput && !file.dataset.v39Bound){
    file.dataset.v39Bound = '1';
    file.addEventListener('change', () => {
      const selected = file.files && file.files[0];
      if(!selected) return;

      if(!selected.type || !selected.type.startsWith('image/')){
        alert('Escolha um arquivo de imagem.');
        file.value = '';
        return;
      }

      const safeName = slugFileNameV39(selected.name);
      pathInput.value = `assets/img/produtos/${safeName}`;

      const reader = new FileReader();
      reader.onload = () => {
        if(dataInput) dataInput.value = String(reader.result || '');
        updateProductImagePreviewV39();
        toast('Imagem anexada e pré-visualizada');
      };
      reader.readAsDataURL(selected);
    });
  }

  $('#previewProductImageBtn')?.addEventListener('click', updateProductImagePreviewV39);

  $('#clearProductImageBtn')?.addEventListener('click', () => {
    if(pathInput) pathInput.value = '';
    if(dataInput) dataInput.value = '';
    if(file) file.value = '';
    updateProductImagePreviewV39();
    toast('Imagem removida do formulário');
  });

  pathInput?.addEventListener('input', () => {
    if(dataInput) dataInput.value = '';
    updateProductImagePreviewV39();
  });
}

/* Compatibilidade com versões anteriores */
function updateProductImagePreviewV36(){ updateProductImagePreviewV39(); }
function setupProductImagePathV36(){ setupProductImagePathV39(); }

function setupAdmin(){
 if(!document.body.classList.contains('admin-page')) return;

 const ADMIN_PASSWORD = 'admin123';
 const login = $('#adminLogin');
 const panel = $('#adminPanel');

 if(!login || !panel){
  console.error('Admin: elementos de login não encontrados');
  return;
 }

 function showPanel(){
  if(window.adminShowPanel){ window.adminShowPanel(); return; }
  login.classList.add('hidden');
  panel.classList.remove('hidden');
  try{ if(typeof renderAdminProducts === 'function') renderAdminProducts(); }catch(e){ console.error(e); }
  try{ if(typeof renderAdminOrders === 'function') renderAdminOrders(); }catch(e){ console.error(e); }
  try{ if(typeof renderAdminConfig === 'function') renderAdminConfig(); }catch(e){ console.error(e); }
 }

 function showLogin(){
  if(window.adminShowLogin){ window.adminShowLogin(); return; }
  panel.classList.add('hidden');
  login.classList.remove('hidden');
 }

 if(sessionStorage.getItem('cec_admin_logged') === '1'){
  showPanel();
 }else{
  showLogin();
 }

 const form = $('#adminLoginForm');
 if(form){
  form.addEventListener('submit', e => {
   e.preventDefault();
   const pass = ($('#adminPassword')?.value || '').trim();
   if(pass === ADMIN_PASSWORD){
    sessionStorage.setItem('cec_admin_logged','1');
    showPanel();
    if(typeof toast === 'function') toast('Login realizado');
   }else{
    if(typeof toast === 'function') toast('Senha incorreta');
    else alert('Senha incorreta');
   }
  });
 }

 $('#logoutBtn')?.addEventListener('click',()=>{
  sessionStorage.removeItem('cec_admin_logged');
  showLogin();
 });

 $$('.tab').forEach(tab => tab.addEventListener('click',()=>{
  $$('.tab').forEach(t=>t.classList.remove('active'));
  tab.classList.add('active');
  $$('.admin-section').forEach(s=>s.classList.add('hidden'));
  const target = $('#'+tab.dataset.tab);
  if(target) target.classList.remove('hidden');
 }));

 $('#productForm')?.addEventListener('submit', e => {
  e.preventDefault();
  let products=loadProducts();
  const idVal=$('#prodId').value;
  const product={
   id:idVal?Number(idVal):Date.now(),
   name:$('#prodName').value.trim(),
   category:$('#prodCat').value.trim()||'Outros',
   type:$('#prodType')?.value || '',
   brand:$('#prodBrand')?.value.trim() || '',
   sku:$('#prodSku')?.value.trim() || '',
   color:$('#prodColor')?.value.trim() || '',
   price:parseMoney($('#prodPrice').value),
   tag:$('#prodTag').value.trim(),
   stock:Number($('#prodStock').value||0),
   yield:$('#prodYield')?.value.trim() || '',
   compatiblePrinters:$('#prodPrinters')?.value.trim() || '',
   notes:$('#prodNotes')?.value.trim() || '',
   image:$('#prodImage')?.value.trim() || defaultImageForCategory($('#prodCat').value.trim()),
   imageData:$('#prodImageData')?.value || '',
   desc:$('#prodDesc').value.trim()
  };
  if(idVal) products=products.map(p=>p.id===product.id?product:p); else products.unshift(product);
  saveProducts(products);
  e.target.reset();
  const imgData=$('#prodImageData'); if(imgData) imgData.value='';
  const imgFile=$('#prodImageFile'); if(imgFile) imgFile.value='';
  $('#prodId').value='';
  $('#productFormTitle').textContent='Cadastrar produto';
  renderAdminProducts();
  toast('Produto salvo');
 });

 $('#clearProductForm')?.addEventListener('click',()=>{
  $('#productForm')?.reset();
  $('#prodId').value='';
  $('#productFormTitle').textContent='Cadastrar produto';
  const box=$('#prodImagePreviewBox'); if(box) box.style.display='none'; const imgData=$('#prodImageData'); if(imgData) imgData.value=''; const imgFile=$('#prodImageFile'); if(imgFile) imgFile.value='';
 });

 $('#resetProductsBtn')?.addEventListener('click',()=>{
  if(confirm('Restaurar produtos iniciais?')){
   saveProducts(CEC_DEFAULT_PRODUCTS);
   renderAdminProducts();
   toast('Produtos restaurados');
  }
 });

 $('#exportDataBtn')?.addEventListener('click',()=>{
  const data={products:loadProducts(),orders:loadOrders(),siteConfig:loadSiteConfig ? loadSiteConfig() : {},exportedAt:new Date().toISOString()};
  const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
  const a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download='backup-cec-site.json';
  a.click();
  URL.revokeObjectURL(a.href);
 });

 $('#importDataInput')?.addEventListener('change', e => {
  const file=e.target.files[0]; if(!file) return;
  const reader=new FileReader();
  reader.onload=()=>{
   try{
    const data=JSON.parse(reader.result);
    if(Array.isArray(data.products)) saveProducts(data.products);
    if(Array.isArray(data.orders)) saveOrders(data.orders);
    if(data.siteConfig && typeof saveSiteConfig === 'function') saveSiteConfig(data.siteConfig);
    renderAdminProducts();
    renderAdminOrders();
    if(typeof renderAdminConfig === 'function') renderAdminConfig();
    toast('Backup importado');
   }catch(err){ toast('Arquivo inválido'); }
  };
  reader.readAsText(file);
 });

 $('#manualOrderForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const order={
   code:makeCode(),
   createdAt:todayBR(),
   customer:$('#manualName').value.trim(),
   phone:$('#manualPhone').value.trim(),
   total:parseMoney($('#manualTotal').value),
   note:$('#manualNote').value.trim(),
   payment:'Manual',
   status:'Novo pedido',
   items:[{name:'Pedido manual', qty:1, price:parseMoney($('#manualTotal').value)}]
  };
  const orders=loadOrders(); orders.unshift(order); saveOrders(orders);
  e.target.reset();
  renderAdminOrders();
  toast('Pedido salvo');
 });
}

function renderAdminConfig(){
  const form = $('#siteConfigForm'); if(!form) return;
  const cfg = loadSiteConfig();
  Object.entries(cfg).forEach(([key,val]) => {
    const el = form.querySelector(`[name="${key}"]`);
    if(el) el.value = val ?? '';
  });
}
function setupAdminConfig(){
  const form = $('#siteConfigForm'); if(!form) return;
  renderAdminConfig();
  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = {};
    new FormData(form).forEach((value, key) => data[key] = value);
    saveSiteConfig(data);
    applySiteConfig();
    toast('Configurações salvas');
  });
  $('#resetSiteConfigBtn')?.addEventListener('click', () => {
    if(confirm('Restaurar configurações padrão do site?')){
      localStorage.removeItem('cec_site_config');
      renderAdminConfig();
      applySiteConfig();
      toast('Configurações restauradas');
    }
  });
  $('#exportSiteConfigBtn')?.addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(loadSiteConfig(), null, 2)], {type:'application/json'});
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'configuracoes-site-cec.json'; a.click(); URL.revokeObjectURL(a.href);
  });
  $('#importSiteConfigInput')?.addEventListener('change', e => {
    const file=e.target.files[0]; if(!file) return;
    const reader=new FileReader();
    reader.onload=()=>{ try{ saveSiteConfig(JSON.parse(reader.result)); renderAdminConfig(); applySiteConfig(); toast('Configurações importadas'); }catch(err){ toast('Arquivo inválido'); } };
    reader.readAsText(file);
  });
}

function renderAdminProducts(){
 const body=$('#productsBody');
 if(!body) return;
 const products=normalizeProductImagesV41(loadProducts());

 body.innerHTML = products.map(p=>`
  <tr>
   <td>
    <div class="admin-product-cell admin-product-cell-v42">
     <img class="admin-product-img-v42" src="${esc(productImage(p))}" alt="${esc(p.name||'Produto')}" onerror="this.style.display='none'">
     <div>
      <strong>${esc(p.name)}</strong><br>
      <small>${[p.brand,p.sku,p.color].filter(Boolean).map(esc).join(' • ')}</small><br>
      <small>${esc(p.desc||'')}</small>
     </div>
    </div>
   </td>
   <td>${esc(p.category)}<br><small>${esc(p.type||'')}</small></td>
   <td><small>${esc(p.compatiblePrinters||'')}</small></td>
   <td>${fmt(p.price)}</td>
   <td>${Number(p.stock||0)}</td>
   <td>
    <button class="btn btn-soft" type="button" data-edit-product="${p.id}">Editar</button>
    <button class="btn btn-danger" type="button" data-delete-product="${p.id}">Excluir</button>
   </td>
  </tr>
 `).join('');

 body.onclick = e => {
  const edit=e.target.closest('[data-edit-product]');
  const del=e.target.closest('[data-delete-product]');
  let products=loadProducts();

  if(edit){
   const p=products.find(x=>x.id===Number(edit.dataset.editProduct));
   if(!p) return;

   $('#prodId').value=p.id;
   $('#prodName').value=p.name||'';
   $('#prodCat').value=p.category||'';
   $('#prodType') && ($('#prodType').value=p.type||'Compatível');
   $('#prodBrand') && ($('#prodBrand').value=p.brand||'');
   $('#prodSku') && ($('#prodSku').value=p.sku||'');
   $('#prodColor') && ($('#prodColor').value=p.color||'');
   $('#prodPrice').value=String(p.price||0).replace('.',',');
   $('#prodTag').value=p.tag||'';
   $('#prodStock').value=p.stock||0;
   $('#prodYield') && ($('#prodYield').value=p.yield||'');
   $('#prodPrinters') && ($('#prodPrinters').value=p.compatiblePrinters||'');
   $('#prodNotes') && ($('#prodNotes').value=p.notes||'');

   if($('#prodImage')) $('#prodImage').value=(String(p.image||'').startsWith('data:image/') ? '' : (p.image||''));
   $('#prodImageData') && ($('#prodImageData').value=p.imageData|| (String(p.image||'').startsWith('data:image/') ? p.image : ''));

   $('#prodDesc').value=p.desc||'';
   $('#productFormTitle').textContent='Editar produto';
   if(typeof updateProductImagePreviewV39 === 'function') updateProductImagePreviewV39();
   if(typeof updateProductImagePreviewV36 === 'function') updateProductImagePreviewV36();
   window.scrollTo({top:0,behavior:'smooth'});
  }

  if(del && confirm('Excluir produto?')){
   products=products.filter(x=>x.id!==Number(del.dataset.deleteProduct));
   saveProducts(products);
   renderAdminProducts();
   toast('Produto excluído');
  }
 };
}
function renderAdminOrders(){
 const body=$('#ordersBody');
 if(!body) return;

 const orders=loadOrders();

 body.innerHTML = orders.length ? orders.map(o=>`
  <tr>
   <td>
    <strong>${esc(o.code || '')}</strong><br>
    <small>${esc(o.createdAt || '')}</small>
   </td>
   <td>
    ${esc(o.customer || '')}<br>
    <small>${esc(o.phone||'')}</small><br>
    <small>${esc(o.deliveryType || 'Entrega')}${o.city ? ' • ' + esc(o.city) : ''}${o.cep ? ' • CEP ' + esc(o.cep) : ''}</small>
   </td>
   <td>
    ${(o.items||[]).map(i=>`${esc(i.name)} x ${i.qty}`).join('<br>')}
    ${o.note ? `<br><small>Obs: ${esc(o.note)}</small>` : ''}
   </td>
   <td>${fmt(o.total || 0)}</td>
   <td>
    ${esc(o.payment || 'Não informado')}
    ${o.payment==='Pix'?`<br><small>Pix: ${CEC_PIX_KEY_DISPLAY}</small>`:''}
   </td>
   <td>
    <select data-status-order="${esc(o.code || '')}">
     <option ${o.status==='Novo pedido'?'selected':''}>Novo pedido</option>
     <option ${o.status==='Em separação'?'selected':''}>Em separação</option>
     <option ${o.status==='Aguardando pagamento'?'selected':''}>Aguardando pagamento</option>
     <option ${o.status==='Enviado'?'selected':''}>Enviado</option>
     <option ${o.status==='Entregue'?'selected':''}>Entregue</option>
     <option ${o.status==='Cancelado'?'selected':''}>Cancelado</option>
    </select>
   </td>
   <td class="admin-order-actions-v35">
    <button class="btn btn-soft" type="button" data-view-order="${esc(o.code || '')}">Ver</button>
    <button class="btn btn-outline" type="button" data-copy-order="${esc(o.code || '')}">Copiar</button>
    <button class="btn btn-danger" type="button" data-delete-order="${esc(o.code || '')}">Excluir</button>
   </td>
  </tr>
 `).join('') : '<tr><td colspan="7">Nenhum pedido cadastrado.</td></tr>';

 body.onchange = e => {
  const status = e.target.closest('[data-status-order]');
  if(!status) return;
  const code = status.dataset.statusOrder;
  const orders = loadOrders().map(o => o.code === code ? {...o, status: status.value} : o);
  saveOrders(orders);
  toast('Status atualizado');
  renderAdminOrders();
 };

 body.onclick = async e => {
  const view = e.target.closest('[data-view-order]');
  const copy = e.target.closest('[data-copy-order]');
  const del = e.target.closest('[data-delete-order]');

  if(view){
   e.preventDefault();
   const code = view.dataset.viewOrder;
   const order = loadOrders().find(o => o.code === code);
   if(order) alert(orderTextForAdmin(order));
   return;
  }

  if(copy){
   e.preventDefault();
   const code = copy.dataset.copyOrder;
   const order = loadOrders().find(o => o.code === code);
   if(order){
    await copyTextValue(orderTextForAdmin(order), 'Pedido copiado');
   }
   return;
  }

  if(del){
   e.preventDefault();
   const code = del.dataset.deleteOrder;
   const order = loadOrders().find(o => o.code === code);
   const cliente = order?.customer ? ` de ${order.customer}` : '';
   if(confirm(`Excluir o pedido ${code}${cliente}?`)){
    const updated = loadOrders().filter(o => o.code !== code);
    saveOrders(updated);
    renderAdminOrders();
    toast('Pedido excluído');
   }
  }
 };
}

function orderTextForAdmin(order){
 const items = (order.items || []).map(i => `- ${i.qty || 1}x ${i.name || 'Item'} = ${fmt((i.price || 0) * (i.qty || 1))}`).join('\n');
 return [
  `Pedido: ${order.code || ''}`,
  `Data: ${order.createdAt || ''}`,
  `Cliente: ${order.customer || ''}`,
  `Telefone: ${order.phone || ''}`,
  `Atendimento: ${order.deliveryType || 'Entrega'}`,
  order.city ? `Cidade/UF: ${order.city}` : '',
  order.cep ? `CEP: ${order.cep}` : '',
  order.address ? `Endereço: ${order.address}` : '',
  '',
  'Itens:',
  items,
  '',
  `Total: ${fmt(order.total || 0)}`,
  `Pagamento: ${order.payment || 'Não informado'}`,
  `Status: ${order.status || 'Novo pedido'}`,
  order.note ? `Observação: ${order.note}` : ''
 ].filter(Boolean).join('\n');
}

document.addEventListener('DOMContentLoaded', () => { setupMenu(); setupCepMask(); setupShop(); setupModals(); setupCheckout(); setupTracking(); setupAdmin(); setupProductImagePathV36(); if(typeof setupAdminConfig === 'function') setupAdminConfig(); updateCartCount(loadCart()); });





function hideCookieNoticeV32(){
  const notice = document.getElementById('cookieNoticeV31');
  if(notice) notice.classList.add('hidden');
}
function setupCookieNoticeV32(){
  const notice = document.getElementById('cookieNoticeV31');
  if(!notice) return;
  if(localStorage.getItem('cec_cookie_ok') === '1'){
    hideCookieNoticeV32();
  }
}
document.addEventListener('click', function(e){
  const btn = e.target.closest('#acceptCookieV31');
  if(!btn) return;
  e.preventDefault();
  localStorage.setItem('cec_cookie_ok','1');
  hideCookieNoticeV32();
});
if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', setupCookieNoticeV32);
}else{
  setupCookieNoticeV32();
}


/* Versão 33: aviso de privacidade seguro */
function hideCookieNoticeV33(){
  const notice = document.getElementById('cookieNoticeV31');
  if(notice) notice.classList.add('hidden');
}
function setupCookieNoticeV33(){
  const notice = document.getElementById('cookieNoticeV31');
  if(!notice) return;
  if(localStorage.getItem('cec_cookie_ok') === '1'){
    hideCookieNoticeV33();
  }
}
document.addEventListener('click', function(e){
  const btn = e.target.closest('#acceptCookieV31');
  if(!btn) return;
  e.preventDefault();
  localStorage.setItem('cec_cookie_ok','1');
  hideCookieNoticeV33();
});
if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', setupCookieNoticeV33);
}else{
  setupCookieNoticeV33();
}


/* Versão 37: Backup, importação e restaurar produtos corrigidos */
function adminDownloadJsonV37(filename, data){
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], {type:'application/json;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    URL.revokeObjectURL(url);
    a.remove();
  }, 500);
}

function adminExportBackupV37(){
  const data = {
    products: typeof loadProducts === 'function' ? loadProducts() : JSON.parse(localStorage.getItem('cec_products') || '[]'),
    orders: typeof loadOrders === 'function' ? loadOrders() : JSON.parse(localStorage.getItem('cec_orders') || '[]'),
    siteConfig: typeof loadSiteConfig === 'function' ? loadSiteConfig() : JSON.parse(localStorage.getItem('cec_site_config') || '{}'),
    exportedAt: new Date().toISOString(),
    system: 'C & C Distribuidora'
  };
  adminDownloadJsonV37('backup-cec-distribuidora.json', data);
  if(typeof toast === 'function') toast('Backup baixado');
}

function adminRestoreInitialProductsV37(){
  if(!confirm('Restaurar produtos iniciais? Isso substitui a lista atual de produtos.')) return;
  if(typeof CEC_DEFAULT_PRODUCTS === 'undefined'){
    alert('Produtos iniciais não encontrados no sistema.');
    return;
  }
  localStorage.setItem('cec_products', JSON.stringify(CEC_DEFAULT_PRODUCTS));
  if(typeof renderAdminProducts === 'function') renderAdminProducts();
  if(typeof setupShop === 'function') setupShop();
  if(typeof toast === 'function') toast('Produtos restaurados');
  else alert('Produtos restaurados');
}

function adminImportBackupFileV37(file){
  if(!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try{
      const data = JSON.parse(reader.result);
      if(Array.isArray(data.products)){
        localStorage.setItem('cec_products', JSON.stringify(data.products));
      }
      if(Array.isArray(data.orders)){
        localStorage.setItem('cec_orders', JSON.stringify(data.orders));
      }
      if(data.siteConfig && typeof data.siteConfig === 'object'){
        localStorage.setItem('cec_site_config', JSON.stringify(data.siteConfig));
      }
      if(typeof renderAdminProducts === 'function') renderAdminProducts();
      if(typeof renderAdminOrders === 'function') renderAdminOrders();
      if(typeof renderAdminConfig === 'function') renderAdminConfig();
      if(typeof applySiteConfig === 'function') applySiteConfig();
      if(typeof toast === 'function') toast('Backup importado');
      else alert('Backup importado');
    }catch(err){
      console.error(err);
      alert('Arquivo de backup inválido.');
    }
  };
  reader.readAsText(file, 'utf-8');
}

function setupAdminBackupV37(){
  const exportBtn = document.getElementById('exportDataBtn');
  if(exportBtn && !exportBtn.dataset.v37Bound){
    exportBtn.dataset.v37Bound = '1';
    exportBtn.addEventListener('click', function(e){
      e.preventDefault();
      adminExportBackupV37();
    });
  }

  const resetBtn = document.getElementById('resetProductsBtn');
  if(resetBtn && !resetBtn.dataset.v37Bound){
    resetBtn.dataset.v37Bound = '1';
    resetBtn.addEventListener('click', function(e){
      e.preventDefault();
      adminRestoreInitialProductsV37();
    });
  }

  const importInput = document.getElementById('importDataInput');
  const importBtn = document.getElementById('importDataBtnV37');
  if(importBtn && importInput && !importBtn.dataset.v37Bound){
    importBtn.dataset.v37Bound = '1';
    importBtn.addEventListener('click', function(e){
      e.preventDefault();
      importInput.click();
    });
  }
  if(importInput && !importInput.dataset.v37Bound){
    importInput.dataset.v37Bound = '1';
    importInput.addEventListener('change', function(e){
      const file = e.target.files && e.target.files[0];
      adminImportBackupFileV37(file);
      e.target.value = '';
    });
  }
}

document.addEventListener('click', function(e){
  const exportBtn = e.target.closest('#exportDataBtn');
  const resetBtn = e.target.closest('#resetProductsBtn');

  if(exportBtn){
    e.preventDefault();
    adminExportBackupV37();
    return;
  }

  if(resetBtn){
    e.preventDefault();
    adminRestoreInitialProductsV37();
    return;
  }
}, true);

if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', setupAdminBackupV37);
}else{
  setupAdminBackupV37();
}


/* Versão 38: visual melhorado do importar backup */
function setupBackupFileNameV38(){
  const input = document.getElementById('importDataInput');
  const label = document.getElementById('importDataFileName');
  if(!input || !label || input.dataset.v38Bound) return;
  input.dataset.v38Bound = '1';
  input.addEventListener('change', function(e){
    const file = e.target.files && e.target.files[0];
    label.textContent = file ? file.name : 'Nenhum arquivo selecionado';
  });
}
if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', setupBackupFileNameV38);
}else{
  setupBackupFileNameV38();
}


/* Versão 40: salvar produto e limpar corrigidos */
function productStatusV40(type, message){
  const box = document.getElementById('productSaveStatusV40');
  if(box){
    box.style.display = 'block';
    box.className = 'product-save-status-v40 ' + (type === 'error' ? 'error' : 'ok');
    box.textContent = message;
  }else if(type === 'error'){
    alert(message);
  }
}

function moneyToNumberV40(value){
  if(typeof parseMoney === 'function') return parseMoney(value);
  return Number(String(value || '').replace(/\./g,'').replace(',','.').replace(/[^0-9.\-]/g,'')) || 0;
}

function safeValueV40(id){
  return (document.getElementById(id)?.value || '').trim();
}

function defaultImageV40(category){
  if(typeof defaultImageForCategory === 'function') return defaultImageForCategory(category || 'Outros');
  return 'assets/img/prod-toner.svg';
}

function loadProductsV40(){
  try{
    if(typeof loadProducts === 'function'){
      const list = loadProducts();
      return Array.isArray(list) ? list : [];
    }
    return JSON.parse(localStorage.getItem('cec_products') || '[]') || [];
  }catch(e){
    return [];
  }
}

function saveProductsV40(products){
  try{
    localStorage.setItem('cec_products', JSON.stringify(products));
    if(typeof saveProducts === 'function') saveProducts(products);
    return true;
  }catch(err){
    console.error(err);
    if(String(err && err.name).includes('Quota') || String(err && err.message).toLowerCase().includes('quota')){
      throw new Error('A imagem ficou pesada demais para salvar neste navegador. Use uma imagem menor ou salve apenas o caminho da imagem.');
    }
    throw new Error('Erro ao salvar produto. O formulário foi mantido para você não perder os dados.');
  }
}

function currentEditingProductV40(products, id){
  return products.find(p => Number(p.id) === Number(id));
}

function buildProductV40(){
  const products = loadProductsV40();
  const idText = safeValueV40('prodId');
  const existing = idText ? currentEditingProductV40(products, idText) : null;

  const name = safeValueV40('prodName');
  const category = safeValueV40('prodCat') || 'Outros';
  const priceText = safeValueV40('prodPrice');

  if(!name) throw new Error('Preencha o nome do produto.');
  if(!priceText) throw new Error('Preencha o preço do produto.');

  let imagePath = safeValueV40('prodImage') || defaultImageV40(category);
  let imageData = document.getElementById('prodImageData')?.value || '';
  if(String(imagePath).startsWith('data:image/')){
    imageData = imageData || imagePath;
    imagePath = '';
  }

  if(!imageData && existing && existing.image === imagePath && existing.imageData){
    imageData = existing.imageData;
  }

  return {
    id: idText ? Number(idText) : Date.now(),
    name,
    category,
    type: document.getElementById('prodType')?.value || '',
    brand: safeValueV40('prodBrand'),
    sku: safeValueV40('prodSku'),
    color: safeValueV40('prodColor'),
    price: moneyToNumberV40(priceText),
    tag: safeValueV40('prodTag'),
    stock: Number(safeValueV40('prodStock') || 0),
    yield: safeValueV40('prodYield'),
    compatiblePrinters: safeValueV40('prodPrinters'),
    notes: safeValueV40('prodNotes'),
    image: imagePath,
    imageData: imageData,
    desc: safeValueV40('prodDesc')
  };
}

function saveProductFormV40(event){
  if(event){
    event.preventDefault();
    event.stopPropagation();
    if(event.stopImmediatePropagation) event.stopImmediatePropagation();
  }

  try{
    const product = buildProductV40();
    let products = loadProductsV40();

    if(products.some(p => Number(p.id) === Number(product.id))){
      products = products.map(p => Number(p.id) === Number(product.id) ? product : p);
    }else{
      products.unshift(product);
    }

    saveProductsV40(products);

    if(typeof renderAdminProducts === 'function') renderAdminProducts();

    clearProductFormV40(false);
    productStatusV40('ok', 'Produto salvo com sucesso.');
    if(typeof toast === 'function') toast('Produto salvo');

    return false;
  }catch(err){
    console.error('Erro ao salvar produto:', err);
    productStatusV40('error', err.message || 'Erro ao salvar. Nada foi apagado.');
    return false;
  }
}

function clearProductFormV40(showMessage = true){
  const form = document.getElementById('productForm');
  if(form) form.reset();

  const fields = ['prodId','prodImageData'];
  fields.forEach(id => {
    const el = document.getElementById(id);
    if(el) el.value = '';
  });

  const file = document.getElementById('prodImageFile');
  if(file) file.value = '';

  const preview = document.getElementById('prodImagePreviewBox');
  if(preview) preview.style.display = 'none';

  const img = document.getElementById('prodImagePreview');
  if(img) img.removeAttribute('src');

  const title = document.getElementById('productFormTitle');
  if(title) title.textContent = 'Cadastrar produto';

  if(showMessage) productStatusV40('ok', 'Formulário limpo.');
  return false;
}

function resizeImageFileV40(file, callback){
  const reader = new FileReader();
  reader.onload = () => {
    const raw = String(reader.result || '');
    const img = new Image();
    img.onload = () => {
      const max = 900;
      let w = img.width;
      let h = img.height;

      if(w > max || h > max){
        if(w > h){
          h = Math.round(h * (max / w));
          w = max;
        }else{
          w = Math.round(w * (max / h));
          h = max;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, w, h);

      let data = canvas.toDataURL('image/jpeg', 0.72);

      if(data.length > 900000){
        data = canvas.toDataURL('image/jpeg', 0.58);
      }

      callback(data);
    };
    img.onerror = () => callback(raw);
    img.src = raw;
  };
  reader.readAsDataURL(file);
}

function setupProductImageV40(){
  const file = document.getElementById('prodImageFile');
  const path = document.getElementById('prodImage');
  const data = document.getElementById('prodImageData');
  const preview = document.getElementById('prodImagePreview');
  const previewBox = document.getElementById('prodImagePreviewBox');
  const previewPath = document.getElementById('prodImagePreviewPath');

  function showPreview(){
    const src = data?.value || path?.value || '';
    if(!previewBox || !preview) return;
    if(!src){
      previewBox.style.display = 'none';
      preview.removeAttribute('src');
      return;
    }
    preview.src = src;
    if(previewPath) previewPath.textContent = '';
    previewBox.style.display = 'flex';
  }

  if(file && !file.dataset.v40Bound){
    file.dataset.v40Bound = '1';
    file.addEventListener('change', () => {
      const selected = file.files && file.files[0];
      if(!selected) return;

      if(!selected.type || !selected.type.startsWith('image/')){
        productStatusV40('error', 'Escolha um arquivo de imagem.');
        file.value = '';
        return;
      }

      const safeName = String(selected.name || 'produto.jpg')
        .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
        .toLowerCase()
        .replace(/[^a-z0-9.]+/g,'-')
        .replace(/^-+|-+$/g,'');

      if(path) path.value = 'assets/img/produtos/' + safeName;

      resizeImageFileV40(selected, (imageData) => {
        if(data) data.value = imageData;
        showPreview();
        productStatusV40('ok', 'Imagem anexada e pré-visualizada.');
      });
    });
  }

  const previewBtn = document.getElementById('previewProductImageBtn');
  if(previewBtn && !previewBtn.dataset.v40Bound){
    previewBtn.dataset.v40Bound = '1';
    previewBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showPreview();
    });
  }

  const clearImage = document.getElementById('clearProductImageBtn');
  if(clearImage && !clearImage.dataset.v40Bound){
    clearImage.dataset.v40Bound = '1';
    clearImage.addEventListener('click', (e) => {
      e.preventDefault();
      if(path) path.value = '';
      if(data) data.value = '';
      if(file) file.value = '';
      showPreview();
      productStatusV40('ok', 'Imagem removida do formulário.');
    });
  }

  if(path && !path.dataset.v40Bound){
    path.dataset.v40Bound = '1';
    path.addEventListener('input', () => {
      if(data) data.value = '';
      showPreview();
    });
  }
}

function setupProductFormV40(){
  const form = document.getElementById('productForm');
  if(form && !form.dataset.v40Bound){
    form.dataset.v40Bound = '1';
    form.addEventListener('submit', saveProductFormV40, true);
  }

  const saveBtn = document.getElementById('saveProductBtnV40');
  if(saveBtn && !saveBtn.dataset.v40Bound){
    saveBtn.dataset.v40Bound = '1';
    saveBtn.addEventListener('click', saveProductFormV40, true);
  }

  const clearBtn = document.getElementById('clearProductForm');
  if(clearBtn && !clearBtn.dataset.v40Bound){
    clearBtn.dataset.v40Bound = '1';
    clearBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if(e.stopImmediatePropagation) e.stopImmediatePropagation();
      clearProductFormV40(true);
    }, true);
  }

  setupProductImageV40();
}

/* Funções usadas pelo HTML */
window.saveProductFormV40 = saveProductFormV40;
window.clearProductFormV40 = clearProductFormV40;

/* Captura global para impedir reload caso outro script falhe */
document.addEventListener('submit', function(e){
  if(e.target && e.target.id === 'productForm'){
    saveProductFormV40(e);
  }
}, true);

document.addEventListener('click', function(e){
  const save = e.target.closest('#saveProductBtnV40');
  const clear = e.target.closest('#clearProductForm');
  if(save){
    saveProductFormV40(e);
  }
  if(clear){
    e.preventDefault();
    e.stopPropagation();
    if(e.stopImmediatePropagation) e.stopImmediatePropagation();
    clearProductFormV40(true);
  }
}, true);

if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', setupProductFormV40);
}else{
  setupProductFormV40();
}


function normalizeProductImagesV41(products){
  if(!Array.isArray(products)) return [];
  let changed = false;
  const list = products.map(p => {
    if(p && String(p.image || '').startsWith('data:image/')){
      changed = true;
      return {
        ...p,
        imageData: p.imageData || p.image,
        image: ''
      };
    }
    return p;
  });
  if(changed){
    try{ localStorage.setItem('cec_products', JSON.stringify(list)); }catch(e){}
  }
  return list;
}



/* Versão 43: pedidos e status sincronizados no mesmo navegador */
function normalizeOrderCodeV43(value){
  let code = String(value || '').trim().toUpperCase();
  code = code.replace(/\s+/g, '');
  if(!code) return '';
  code = code.replace(/^CEC/, 'CEC');
  const digits = code.replace(/\D/g, '');
  if(digits && (!code.includes('-') || code === digits || code.startsWith('CEC'))){
    return 'CEC-' + digits.padStart(6, '0').slice(-6);
  }
  return code;
}

function orderNumberFromCodeV43(code){
  const m = String(code || '').match(/(\d+)/);
  return m ? Number(m[1]) : 0;
}

function normalizeOrderObjectV43(order){
  const code = normalizeOrderCodeV43(order?.code);
  return {
    ...order,
    code,
    status: order?.status || 'Novo pedido',
    createdAt: order?.createdAt || todayBR(),
    createdAtMs: order?.createdAtMs || Date.now(),
    items: Array.isArray(order?.items) ? order.items : [],
    total: Number(order?.total || 0)
  };
}

function mergeOrdersV43(...lists){
  const map = new Map();
  lists.flat().filter(Boolean).forEach(raw => {
    const o = normalizeOrderObjectV43(raw);
    if(!o.code) return;
    const old = map.get(o.code);
    if(!old || Number(o.updatedAtMs || o.createdAtMs || 0) >= Number(old.updatedAtMs || old.createdAtMs || 0)){
      map.set(o.code, o);
    }
  });
  return Array.from(map.values()).sort((a,b) => {
    const n = orderNumberFromCodeV43(b.code) - orderNumberFromCodeV43(a.code);
    if(n) return n;
    return Number(b.createdAtMs || 0) - Number(a.createdAtMs || 0);
  });
}

function readJsonV43(key, fallback){
  try{
    const raw = localStorage.getItem(key);
    if(!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed || fallback;
  }catch(e){
    return fallback;
  }
}

function writeJsonV43(key, value){
  localStorage.setItem(key, JSON.stringify(value));
}

function loadOrders(){
  const arr = readJsonV43('cec_orders', []);
  const indexObj = readJsonV43('cec_orders_index', {});
  const byCode = indexObj && typeof indexObj === 'object' ? Object.values(indexObj) : [];
  const backup = readJsonV43('cec_orders_backup_v43', []);
  return mergeOrdersV43(arr, byCode, backup);
}

function saveOrders(orders){
  const clean = mergeOrdersV43(Array.isArray(orders) ? orders : []);
  const index = {};
  clean.forEach(o => { index[o.code] = o; });

  try{
    writeJsonV43('cec_orders', clean);
    writeJsonV43('cec_orders_index', index);
    writeJsonV43('cec_orders_backup_v43', clean);
    localStorage.setItem('cec_orders_updated_at', String(Date.now()));
    window.dispatchEvent(new CustomEvent('cec-orders-updated', {detail:{orders:clean}}));
    return clean;
  }catch(err){
    console.error('Erro ao salvar pedidos:', err);
    alert('Não consegui salvar o pedido/status. O navegador pode estar sem espaço por imagens grandes. Exporte backup e limpe produtos antigos/imagens muito pesadas.');
    return clean;
  }
}

function findOrderV43(code){
  const normalized = normalizeOrderCodeV43(code);
  return loadOrders().find(o => normalizeOrderCodeV43(o.code) === normalized);
}

function saveSingleOrderV43(order){
  const normalized = normalizeOrderObjectV43(order);
  const orders = loadOrders();
  const exists = orders.some(o => normalizeOrderCodeV43(o.code) === normalized.code);
  const updated = exists
    ? orders.map(o => normalizeOrderCodeV43(o.code) === normalized.code ? normalized : o)
    : [normalized, ...orders];
  return saveOrders(updated);
}

function updateOrderStatusV43(code, status){
  const normalized = normalizeOrderCodeV43(code);
  const orders = loadOrders();
  let found = false;
  const updated = orders.map(o => {
    if(normalizeOrderCodeV43(o.code) !== normalized) return o;
    found = true;
    return {...o, code: normalized, status, updatedAt: todayBR(), updatedAtMs: Date.now()};
  });
  if(!found) return false;
  saveOrders(updated);
  return true;
}

function renderAdminOrders(){
 const body=$('#ordersBody');
 if(!body) return;

 const orders=loadOrders();

 body.innerHTML = orders.length ? orders.map(o=>`
  <tr>
   <td>
    <strong>${esc(o.code || '')}</strong><br>
    <small>${esc(o.createdAt || '')}</small>
   </td>
   <td>
    ${esc(o.customer || '')}<br>
    <small>${esc(o.phone||'')}</small><br>
    <small>${esc(o.deliveryType || 'Entrega')}${o.city ? ' • ' + esc(o.city) : ''}${o.cep ? ' • CEP ' + esc(o.cep) : ''}</small>
   </td>
   <td>
    ${(o.items||[]).map(i=>`${esc(i.name)} x ${i.qty}`).join('<br>')}
    ${o.note ? `<br><small>Obs: ${esc(o.note)}</small>` : ''}
   </td>
   <td>${fmt(o.total || 0)}</td>
   <td>
    ${esc(o.payment || 'Não informado')}
    ${o.payment==='Pix'?`<br><small>Pix: ${CEC_PIX_KEY_DISPLAY}</small>`:''}
   </td>
   <td>
    <select data-status-order="${esc(o.code || '')}">
     <option ${o.status==='Novo pedido'?'selected':''}>Novo pedido</option>
     <option ${o.status==='Em separação'?'selected':''}>Em separação</option>
     <option ${o.status==='Aguardando pagamento'?'selected':''}>Aguardando pagamento</option>
     <option ${o.status==='Enviado'?'selected':''}>Enviado</option>
     <option ${o.status==='Entregue'?'selected':''}>Entregue</option>
     <option ${o.status==='Cancelado'?'selected':''}>Cancelado</option>
    </select>
   </td>
   <td class="admin-order-actions-v35">
    <button class="btn btn-soft" type="button" data-view-order="${esc(o.code || '')}">Ver</button>
    <button class="btn btn-outline" type="button" data-copy-order="${esc(o.code || '')}">Copiar</button>
    <button class="btn btn-danger" type="button" data-delete-order="${esc(o.code || '')}">Excluir</button>
   </td>
  </tr>
 `).join('') : '<tr><td colspan="7">Nenhum pedido cadastrado neste navegador.</td></tr>';

 body.onchange = e => {
  const status = e.target.closest('[data-status-order]');
  if(!status) return;
  const code = status.dataset.statusOrder;
  const ok = updateOrderStatusV43(code, status.value);
  if(ok){
    toast('Status atualizado');
    renderAdminOrders();
  }else{
    alert('Pedido não encontrado para atualizar status.');
  }
 };

 body.onclick = async e => {
  const view = e.target.closest('[data-view-order]');
  const copy = e.target.closest('[data-copy-order]');
  const del = e.target.closest('[data-delete-order]');

  if(view){
   e.preventDefault();
   const order = findOrderV43(view.dataset.viewOrder);
   if(order) alert(orderTextForAdmin(order));
   return;
  }

  if(copy){
   e.preventDefault();
   const order = findOrderV43(copy.dataset.copyOrder);
   if(order){
    await copyTextValue(orderTextForAdmin(order), 'Pedido copiado');
   }
   return;
  }

  if(del){
   e.preventDefault();
   const code = normalizeOrderCodeV43(del.dataset.deleteOrder);
   const order = findOrderV43(code);
   const cliente = order?.customer ? ` de ${order.customer}` : '';
   if(confirm(`Excluir o pedido ${code}${cliente}?`)){
    const updated = loadOrders().filter(o => normalizeOrderCodeV43(o.code) !== code);
    saveOrders(updated);
    renderAdminOrders();
    toast('Pedido excluído');
   }
  }
 };
}

function setupCheckout(){
 $('#orderPayment')?.addEventListener('change', () => {
  const isPix = ($('#orderPayment')?.value || 'Pix') === 'Pix';
  $('#pixCheckoutBox') && ($('#pixCheckoutBox').style.display = isPix ? 'block' : 'none');
  if(isPix){
   renderPixBlock({ amount: cartTotal(cartProducts()), txid: 'PEDIDO', qrId:'#pixQrPreview', amountId:'#pixAmountPreview', payloadId:'#pixPayloadPreview', keyId:'#pixKeyText' });
  }
 });
 $('#copyPixKeyBtn')?.addEventListener('click', () => copyTextValue(CEC_PIX_KEY, 'Chave Pix copiada'));
 $('#copyPixPayloadBtn')?.addEventListener('click', () => copyTextValue($('#pixPayloadPreview')?.value || '', 'Pix Copia e Cola copiado'));
 $('#copyPixKeyDoneBtn')?.addEventListener('click', () => copyTextValue(CEC_PIX_KEY, 'Chave Pix copiada'));
 $('#copyPixDoneBtn')?.addEventListener('click', () => copyTextValue($('#pixPayloadDone')?.value || '', 'Pix Copia e Cola copiado'));

 $('#orderForm')?.addEventListener('submit', e => {
  e.preventDefault();

  const items = cartProducts();
  if(!items.length) return toast('Carrinho vazio');

  const payment = $('#orderPayment')?.value || 'Pix';
  const code = makeCode();
  const total = cartTotal(items);
  const pixPayload = payment === 'Pix' ? buildPixPayload(total, code) : '';

  const order = normalizeOrderObjectV43({
   code,
   createdAt: todayBR(),
   createdAtMs: Date.now(),
   updatedAt: todayBR(),
   updatedAtMs: Date.now(),
   status: payment === 'Pix' ? 'Aguardando pagamento' : 'Novo pedido',
   payment,
   pixKey: payment === 'Pix' ? CEC_PIX_KEY : '',
   pixPayload,
   customer: $('#orderName').value.trim(),
   phone: $('#orderPhone').value.trim(),
   deliveryType: $('#orderDeliveryType')?.value || 'Entrega',
   city: $('#orderCity')?.value.trim() || '',
   cep: $('#orderCep')?.value.trim() || '',
   address: $('#orderAddress')?.value.trim() || '',
   note: $('#orderNote').value.trim(),
   items: items.map(i=>({id:i.id,name:i.name,price:i.price,qty:i.qty})),
   total
  });

  saveSingleOrderV43(order);
  localStorage.setItem('cec_last_order_code', order.code);
  localStorage.setItem('cec_last_track_code', order.code);

  saveCart([]);
  updateCartCount([]);
  renderCart();

  const paymentLines = payment === 'Pix'
   ? ['Forma de pagamento: Pix', `Chave Pix CNPJ: ${CEC_PIX_KEY_DISPLAY}`, `Pix Copia e Cola: ${pixPayload}`, 'Enviei/enviarei o comprovante por aqui.']
   : [`Forma de pagamento: ${payment}`];

  const lines = [
   `Pedido ${order.code}`,
   `Cliente: ${order.customer}`,
   `WhatsApp: ${order.phone}`,
   `Atendimento: ${order.deliveryType || 'Entrega'}`,
   order.city?`Cidade/UF: ${order.city}`:'',
   order.cep?`CEP: ${order.cep}`:'',
   order.address?`Endereço: ${order.address}`:'',
   '',
   ...order.items.map(i=>`- ${i.qty}x ${i.name} = ${fmt(i.price*i.qty)}`),
   '',
   `Total: ${fmt(order.total)}`,
   ...paymentLines,
   order.note?`Obs: ${order.note}`:''
  ].filter(Boolean);

  window.open(`https://wa.me/${CEC_WHATSAPP}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank');

  $('#orderModal')?.classList.remove('open');
  document.body.classList.remove('lock');

  $('#orderDoneCode') && ($('#orderDoneCode').textContent = order.code);
  if($('#orderDonePix')){
   $('#orderDonePix').innerHTML = payment === 'Pix'
    ? `<strong>Pagamento por Pix</strong><br>Valor: <strong>${fmt(order.total)}</strong><br>Chave Pix CNPJ: <strong>${CEC_PIX_KEY_DISPLAY}</strong><br><small>Escaneie o QR Code ou use o Pix Copia e Cola abaixo. Depois envie o comprovante pelo WhatsApp.</small>`
    : `<strong>Pagamento:</strong> ${esc(payment)}<br><small>A loja confirmará as condições pelo WhatsApp.</small>`;
  }
  if(payment === 'Pix'){
   renderPixBlock({ amount: order.total, txid: order.code, qrId:'#pixQrDone', amountId:'#pixAmountDone', payloadId:'#pixPayloadDone', keyId:'#pixKeyDone' });
  }else{
   $('#pixQrDone') && ($('#pixQrDone').removeAttribute('src'));
   $('#pixAmountDone') && ($('#pixAmountDone').textContent = fmt(order.total));
   $('#pixPayloadDone') && ($('#pixPayloadDone').value = '');
   $('#pixKeyDone') && ($('#pixKeyDone').textContent = '—');
  }
  const donePanel = $('.pix-panel-done');
  if(donePanel) donePanel.style.display = payment === 'Pix' ? 'grid' : 'none';

  $('#orderDoneModal')?.classList.add('open');
  document.body.classList.add('lock');
  $('#orderForm')?.reset();
  $('#orderPayment') && ($('#orderPayment').value = 'Pix');
 });
}

function renderTrackedOrderV43(code){
  const result = $('#trackResult');
  if(!result) return;

  const normalized = normalizeOrderCodeV43(code);
  if(!normalized){
    result.innerHTML = '<div class="muted-box">Digite o código do pedido.</div>';
    return;
  }

  const order = findOrderV43(normalized);
  if(!order){
    const existing = loadOrders().map(o => o.code).filter(Boolean).slice(0,6).join(', ');
    result.innerHTML = `<div class="muted-box">Pedido <strong>${esc(normalized)}</strong> não encontrado neste navegador.${existing ? `<br><br><small>Pedidos salvos aqui: ${esc(existing)}</small>` : ''}</div>`;
    return;
  }

  localStorage.setItem('cec_last_track_code', order.code);

  result.innerHTML = `<div class="card track-card-v43">
   <div class="track-head-v43">
    <div>
     <h3>Pedido ${esc(order.code)}</h3>
     <p>Cliente: ${esc(order.customer || '')}</p>
     <p>Data: ${esc(order.createdAt || '')}</p>
    </div>
    <span class="status ${statusClass(order.status)}">${esc(order.status || 'Novo pedido')}</span>
   </div>
   <p>Pagamento: ${esc(order.payment || 'Não informado')}</p>
   <p>Atendimento: ${esc(order.deliveryType || 'Entrega')}</p>
   ${order.city ? `<p>Cidade/UF: ${esc(order.city)}</p>` : ''}
   ${order.cep ? `<p>CEP: ${esc(order.cep)}</p>` : ''}
   ${order.address ? `<p>Endereço: ${esc(order.address)}</p>` : ''}
   ${order.updatedAt ? `<p><small>Última atualização: ${esc(order.updatedAt)}</small></p>` : ''}
   ${(order.payment === 'Pix') ? `<div class="pix-panel track-pix-panel" style="margin-top:12px"><div class="pix-qr-wrap"><img id="trackPixQr" alt="QR Code Pix do pedido" /></div><div class="pix-panel-body"><div class="muted-box"><strong>Valor do pedido</strong><br><span id="trackPixAmount"></span></div><div class="muted-box"><strong>Chave Pix CNPJ</strong><br><span id="trackPixKey"></span><div class="actions" style="margin-top:12px"><button class="btn btn-soft" id="trackCopyPixKeyBtn" type="button">Copiar chave Pix</button></div></div><div class="field full"><label>Pix Copia e Cola</label><textarea id="trackPixPayload" rows="4" readonly></textarea></div><div class="actions"><button class="btn btn-primary" id="trackCopyPixPayloadBtn" type="button">Copiar Pix Copia e Cola</button></div><small>${order.status === 'Aguardando pagamento' ? 'Escaneie o QR Code ou use o Pix Copia e Cola e envie o comprovante para a loja.' : 'Pagamento Pix cadastrado para este pedido.'}</small></div></div>` : ''}
   <div class="muted-box" style="margin-top:12px">
    ${(order.items||[]).map(i=>`<div class="order-line"><span>${esc(i.name)} x ${i.qty}</span><strong>${fmt((i.price||0)*(i.qty||1))}</strong></div>`).join('')}
    <div class="order-line"><strong>Total</strong><strong>${fmt(order.total || 0)}</strong></div>
   </div>
  </div>`;

  if(order.payment === 'Pix'){
   const payload = order.pixPayload || buildPixPayload(order.total, order.code);
   $('#trackPixAmount') && ($('#trackPixAmount').textContent = fmt(order.total || 0));
   $('#trackPixKey') && ($('#trackPixKey').textContent = CEC_PIX_KEY_DISPLAY);
   $('#trackPixPayload') && ($('#trackPixPayload').value = payload);
   $('#trackPixQr') && ($('#trackPixQr').src = pixQrUrl(payload));
   $('#trackCopyPixKeyBtn')?.addEventListener('click', () => copyTextValue(CEC_PIX_KEY, 'Chave Pix copiada'));
   $('#trackCopyPixPayloadBtn')?.addEventListener('click', () => copyTextValue(payload, 'Pix Copia e Cola copiado'));
  }
}

function setupTracking(){
 const form=$('#trackForm');
 if(!form) return;

 const input = $('#trackCode');
 const last = localStorage.getItem('cec_last_track_code') || localStorage.getItem('cec_last_order_code') || '';
 if(input && last && !input.value) input.value = last;

 form.addEventListener('submit', e => {
  e.preventDefault();
  renderTrackedOrderV43(input?.value || '');
 });

 if(input && input.value){
  renderTrackedOrderV43(input.value);
 }

 window.addEventListener('storage', () => {
  const code = input?.value || localStorage.getItem('cec_last_track_code') || '';
  if(code) renderTrackedOrderV43(code);
 });

 window.addEventListener('cec-orders-updated', () => {
  const code = input?.value || localStorage.getItem('cec_last_track_code') || '';
  if(code) renderTrackedOrderV43(code);
 });

 setInterval(() => {
  const code = input?.value || localStorage.getItem('cec_last_track_code') || '';
  if(code && document.getElementById('trackResult')){
    renderTrackedOrderV43(code);
  }
 }, 2500);
}

function setupOrdersRefreshV43(){
  document.getElementById('refreshOrdersBtnV43')?.addEventListener('click', () => {
    renderAdminOrders();
    toast('Pedidos atualizados');
  });
}

if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', setupOrdersRefreshV43);
}else{
  setupOrdersRefreshV43();
}



/* Versão 44: produto salva offline com imagem por caminho, sem base64 pesado */
function cleanImagePathV44(path){
  const txt = String(path || '').trim();
  if(!txt || txt.startsWith('data:image/')) return '';
  return txt;
}

function cleanProductsBase64V44(products){
  if(!Array.isArray(products)) return [];
  let changed = false;
  const list = products.map(p => {
    if(!p) return p;
    const cleaned = {...p};
    if(String(cleaned.image || '').startsWith('data:image/')){
      cleaned.image = '';
      changed = true;
    }
    if(cleaned.imageData){
      delete cleaned.imageData;
      changed = true;
    }
    return cleaned;
  });
  if(changed){
    try{ localStorage.setItem('cec_products', JSON.stringify(list)); }catch(e){}
  }
  return list;
}

function loadProducts(){
  return cleanProductsBase64V44(loadJson('cec_products', CEC_DEFAULT_PRODUCTS));
}

function saveProducts(products){
  const clean = cleanProductsBase64V44(products);
  saveJson('cec_products', clean);
}

function productImage(p){
  const path = cleanImagePathV44(p?.image);
  return path || defaultImageForCategory(p?.category);
}

function shortTextV44(value, max=120){
  const txt = String(value || '').replace(/\s+/g,' ').trim();
  return txt.length > max ? txt.slice(0, max).trim() + '...' : txt;
}

function safeFileNameV44(name){
  const parts = String(name || 'produto.jpg').split('.');
  const ext = parts.length > 1 ? parts.pop().toLowerCase().replace(/[^a-z0-9]/g,'') : 'jpg';
  const base = parts.join('.')
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g,'-')
    .replace(/^-+|-+$/g,'') || 'produto';
  return `${base}.${ext || 'jpg'}`;
}

function productStatusV44(type, message){
  const box = document.getElementById('productSaveStatusV40');
  if(box){
    box.style.display='block';
    box.className='product-save-status-v40 ' + (type === 'error' ? 'error' : 'ok');
    box.textContent=message;
  }else if(type === 'error'){
    alert(message);
  }
}

function valueV44(id){
  return (document.getElementById(id)?.value || '').trim();
}

function moneyV44(value){
  if(typeof parseMoney === 'function') return parseMoney(value);
  return Number(String(value || '').replace(/\./g,'').replace(',','.').replace(/[^0-9.\-]/g,'')) || 0;
}

function buildProductV44(){
  const idText = valueV44('prodId');
  const name = valueV44('prodName');
  const category = valueV44('prodCat') || 'Outros';
  const priceText = valueV44('prodPrice');
  if(!name) throw new Error('Preencha o nome do produto.');
  if(!priceText) throw new Error('Preencha o preço do produto.');

  return {
    id: idText ? Number(idText) : Date.now(),
    name,
    category,
    type: document.getElementById('prodType')?.value || 'Compatível',
    brand: valueV44('prodBrand'),
    sku: valueV44('prodSku'),
    color: valueV44('prodColor'),
    price: moneyV44(priceText),
    tag: valueV44('prodTag'),
    stock: Number(valueV44('prodStock') || 0),
    yield: valueV44('prodYield'),
    compatiblePrinters: valueV44('prodPrinters'),
    notes: valueV44('prodNotes'),
    image: cleanImagePathV44(valueV44('prodImage')) || defaultImageForCategory(category),
    desc: valueV44('prodDesc')
  };
}

function saveProductFormV44(event){
  if(event){
    event.preventDefault();
    event.stopPropagation();
    if(event.stopImmediatePropagation) event.stopImmediatePropagation();
  }
  try{
    const product = buildProductV44();
    let products = loadProducts();
    if(products.some(p => Number(p.id) === Number(product.id))){
      products = products.map(p => Number(p.id) === Number(product.id) ? product : p);
    }else{
      products.unshift(product);
    }
    saveProducts(products);
    renderAdminProducts();
    clearProductFormV44(false);
    productStatusV44('ok', 'Produto salvo com sucesso.');
    if(typeof toast === 'function') toast('Produto salvo');
    return false;
  }catch(err){
    console.error(err);
    productStatusV44('error', err.message || 'Erro ao salvar produto. Nada foi apagado.');
    return false;
  }
}

function clearProductFormV44(showMessage=true){
  const form = document.getElementById('productForm');
  if(form) form.reset();
  ['prodId','prodImageData'].forEach(id => {
    const el = document.getElementById(id);
    if(el) el.value = '';
  });
  const file = document.getElementById('prodImageFile');
  if(file) file.value = '';
  const box = document.getElementById('prodImagePreviewBox');
  if(box) box.style.display = 'none';
  const img = document.getElementById('prodImagePreview');
  if(img) img.removeAttribute('src');
  const label = document.getElementById('prodImagePreviewPath');
  if(label) label.textContent = '';
  const title = document.getElementById('productFormTitle');
  if(title) title.textContent = 'Cadastrar produto';
  if(showMessage) productStatusV44('ok', 'Formulário limpo.');
  return false;
}

function previewProductImageV44(tempUrl=''){
  const path = cleanImagePathV44(valueV44('prodImage'));
  const src = tempUrl || path;
  const box = document.getElementById('prodImagePreviewBox');
  const img = document.getElementById('prodImagePreview');
  const label = document.getElementById('prodImagePreviewPath');
  if(!box || !img) return;
  if(!src){
    box.style.display='none';
    img.removeAttribute('src');
    if(label) label.textContent='';
    return;
  }
  img.src = src;
  box.style.display='flex';
  if(label) label.textContent = '';
}

function setupProductImageV44(){
  const file = document.getElementById('prodImageFile');
  const path = document.getElementById('prodImage');

  if(file && !file.dataset.v44Bound){
    file.dataset.v44Bound='1';
    file.addEventListener('change', () => {
      const selected = file.files && file.files[0];
      if(!selected) return;
      if(!selected.type || !selected.type.startsWith('image/')){
        productStatusV44('error','Escolha um arquivo de imagem.');
        return;
      }
      const name = safeFileNameV44(selected.name);
      if(path) path.value = 'assets/img/produtos/' + name;

      const url = URL.createObjectURL(selected);
      previewProductImageV44(url);

      productStatusV44('ok', 'Caminho preenchido. Para aparecer depois de salvar, coloque a imagem na pasta assets/img/produtos/.');
    });
  }

  const previewBtn = document.getElementById('previewProductImageBtn');
  if(previewBtn && !previewBtn.dataset.v44Bound){
    previewBtn.dataset.v44Bound='1';
    previewBtn.addEventListener('click', e => {
      e.preventDefault();
      previewProductImageV44();
    });
  }

  const clearImg = document.getElementById('clearProductImageBtn');
  if(clearImg && !clearImg.dataset.v44Bound){
    clearImg.dataset.v44Bound='1';
    clearImg.addEventListener('click', e => {
      e.preventDefault();
      if(path) path.value='';
      const data = document.getElementById('prodImageData');
      if(data) data.value='';
      if(file) file.value='';
      previewProductImageV44();
      productStatusV44('ok','Imagem removida do formulário.');
    });
  }
}

function renderAdminProducts(){
 const body=$('#productsBody');
 if(!body) return;
 const products=loadProducts();

 body.innerHTML = products.map(p=>`
  <tr class="admin-product-row-v44">
   <td>
    <div class="admin-product-cell admin-product-cell-v42 admin-product-cell-v44">
     <img class="admin-product-img-v42 admin-product-img-v44" src="${esc(productImage(p))}" alt="${esc(p.name||'Produto')}" onerror="this.style.display='none'">
     <div class="admin-product-info-v44">
      <strong>${esc(shortTextV44(p.name, 56))}</strong>
      <span>${[p.brand,p.sku,p.color].filter(Boolean).map(x=>esc(shortTextV44(x,30))).join(' • ')}</span>
      <small>${esc(shortTextV44(p.desc, 90))}</small>
     </div>
    </div>
   </td>
   <td>${esc(p.category)}<br><small>${esc(p.type||'')}</small></td>
   <td><small class="compat-compact-v44">${esc(shortTextV44(p.compatiblePrinters, 130))}</small></td>
   <td>${fmt(p.price)}</td>
   <td>${Number(p.stock||0)}</td>
   <td class="actions-compact-v44">
    <button class="btn btn-soft" type="button" data-edit-product="${p.id}">Editar</button>
    <button class="btn btn-danger" type="button" data-delete-product="${p.id}">Excluir</button>
   </td>
  </tr>
 `).join('');

 body.onclick = e => {
  const edit=e.target.closest('[data-edit-product]');
  const del=e.target.closest('[data-delete-product]');
  let products=loadProducts();

  if(edit){
   const p=products.find(x=>Number(x.id)===Number(edit.dataset.editProduct));
   if(!p) return;

   $('#prodId').value=p.id;
   $('#prodName').value=p.name||'';
   $('#prodCat').value=p.category||'';
   $('#prodType') && ($('#prodType').value=p.type||'Compatível');
   $('#prodBrand') && ($('#prodBrand').value=p.brand||'');
   $('#prodSku') && ($('#prodSku').value=p.sku||'');
   $('#prodColor') && ($('#prodColor').value=p.color||'');
   $('#prodPrice').value=String(p.price||0).replace('.',',');
   $('#prodTag').value=p.tag||'';
   $('#prodStock').value=p.stock||0;
   $('#prodYield') && ($('#prodYield').value=p.yield||'');
   $('#prodPrinters') && ($('#prodPrinters').value=p.compatiblePrinters||'');
   $('#prodNotes') && ($('#prodNotes').value=p.notes||'');
   $('#prodImage') && ($('#prodImage').value=cleanImagePathV44(p.image));
   $('#prodImageData') && ($('#prodImageData').value='');
   $('#prodDesc').value=p.desc||'';
   $('#productFormTitle').textContent='Editar produto';
   previewProductImageV44();
   window.scrollTo({top:0,behavior:'smooth'});
  }

  if(del && confirm('Excluir produto?')){
   products=products.filter(x=>Number(x.id)!==Number(del.dataset.deleteProduct));
   saveProducts(products);
   renderAdminProducts();
   toast('Produto excluído');
  }
 };
}

function setupProductFormV44(){
  const form = document.getElementById('productForm');
  if(form && !form.dataset.v44Bound){
    form.dataset.v44Bound='1';
    form.setAttribute('onsubmit','return saveProductFormV44(event)');
    form.addEventListener('submit', saveProductFormV44, true);
  }
  const save = document.getElementById('saveProductBtnV40') || document.querySelector('#productForm button[type="submit"]');
  if(save && !save.dataset.v44Bound){
    save.dataset.v44Bound='1';
    save.addEventListener('click', saveProductFormV44, true);
  }
  const clear = document.getElementById('clearProductForm');
  if(clear && !clear.dataset.v44Bound){
    clear.dataset.v44Bound='1';
    clear.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      if(e.stopImmediatePropagation) e.stopImmediatePropagation();
      clearProductFormV44(true);
    }, true);
  }
  setupProductImageV44();
  cleanProductsBase64V44(loadProducts());
  try{ renderAdminProducts(); }catch(e){}
}

window.saveProductFormV44 = saveProductFormV44;
window.clearProductFormV44 = clearProductFormV44;

document.addEventListener('submit', function(e){
  if(e.target && e.target.id === 'productForm'){
    saveProductFormV44(e);
  }
}, true);

document.addEventListener('click', function(e){
  const save = e.target.closest('#saveProductBtnV40, #productForm button[type="submit"]');
  const clear = e.target.closest('#clearProductForm');
  if(save){
    saveProductFormV44(e);
  }
  if(clear){
    e.preventDefault();
    e.stopPropagation();
    if(e.stopImmediatePropagation) e.stopImmediatePropagation();
    clearProductFormV44(true);
  }
}, true);

if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', setupProductFormV44);
}else{
  setupProductFormV44();
}



/* Versão 45: imagem sempre visível no Admin */
function productThumbHtmlV45(p){
  const src = productImage(p);
  const fallback = defaultImageForCategory(p?.category || 'Outros');
  return `
    <div class="product-thumb-frame-v45">
      <img class="admin-product-img-v45"
        src="${esc(src)}"
        alt="${esc(p?.name || 'Produto')}"
        onerror="this.onerror=null; this.src='${esc(fallback)}'; this.classList.add('fallback-loaded-v45');">
    </div>
  `;
}

function renderAdminProducts(){
 const body=$('#productsBody');
 if(!body) return;
 const products=loadProducts();

 body.innerHTML = products.map(p=>`
  <tr class="admin-product-row-v45">
   <td>
    <div class="admin-product-cell-v45">
     ${productThumbHtmlV45(p)}
     <div class="admin-product-info-v45">
      <strong>${esc(shortTextV44(p.name, 58))}</strong>
      <span>${[p.brand,p.sku,p.color].filter(Boolean).map(x=>esc(shortTextV44(x,32))).join(' • ')}</span>
      <small>${esc(shortTextV44(p.desc, 92))}</small>
     </div>
    </div>
   </td>
   <td>${esc(p.category)}<br><small>${esc(p.type||'')}</small></td>
   <td><small class="compat-compact-v45">${esc(shortTextV44(p.compatiblePrinters, 120))}</small></td>
   <td>${fmt(p.price)}</td>
   <td>${Number(p.stock||0)}</td>
   <td class="actions-compact-v45">
    <button class="btn btn-soft" type="button" data-edit-product="${p.id}">Editar</button>
    <button class="btn btn-danger" type="button" data-delete-product="${p.id}">Excluir</button>
   </td>
  </tr>
 `).join('');

 body.onclick = e => {
  const edit=e.target.closest('[data-edit-product]');
  const del=e.target.closest('[data-delete-product]');
  let products=loadProducts();

  if(edit){
   const p=products.find(x=>Number(x.id)===Number(edit.dataset.editProduct));
   if(!p) return;

   $('#prodId').value=p.id;
   $('#prodName').value=p.name||'';
   $('#prodCat').value=p.category||'';
   $('#prodType') && ($('#prodType').value=p.type||'Compatível');
   $('#prodBrand') && ($('#prodBrand').value=p.brand||'');
   $('#prodSku') && ($('#prodSku').value=p.sku||'');
   $('#prodColor') && ($('#prodColor').value=p.color||'');
   $('#prodPrice').value=String(p.price||0).replace('.',',');
   $('#prodTag').value=p.tag||'';
   $('#prodStock').value=p.stock||0;
   $('#prodYield') && ($('#prodYield').value=p.yield||'');
   $('#prodPrinters') && ($('#prodPrinters').value=p.compatiblePrinters||'');
   $('#prodNotes') && ($('#prodNotes').value=p.notes||'');
   $('#prodImage') && ($('#prodImage').value=cleanImagePathV44(p.image));
   $('#prodImageData') && ($('#prodImageData').value='');
   $('#prodDesc').value=p.desc||'';
   $('#productFormTitle').textContent='Editar produto';
   previewProductImageV44();
   window.scrollTo({top:0,behavior:'smooth'});
  }

  if(del && confirm('Excluir produto?')){
   products=products.filter(x=>Number(x.id)!==Number(del.dataset.deleteProduct));
   saveProducts(products);
   renderAdminProducts();
   toast('Produto excluído');
  }
 };
}

function previewProductImageV44(tempUrl=''){
  const path = cleanImagePathV44(valueV44('prodImage'));
  const src = tempUrl || path || defaultImageForCategory(valueV44('prodCat') || 'Outros');
  const box = document.getElementById('prodImagePreviewBox');
  const img = document.getElementById('prodImagePreview');
  const label = document.getElementById('prodImagePreviewPath');
  if(!box || !img) return;

  img.onerror = function(){
    this.onerror = null;
    this.src = defaultImageForCategory(valueV44('prodCat') || 'Outros');
  };
  img.src = src;
  box.style.display='flex';
  if(label) label.textContent = '';
}



/* Versão 48: Admin alimenta Loja por link, mesmo em teste offline/VS */
function utf8ToBase64V48(str){
  return btoa(unescape(encodeURIComponent(str)));
}
function base64ToUtf8V48(str){
  return decodeURIComponent(escape(atob(str)));
}
function productsPayloadV48(){
  const products = typeof loadProducts === 'function' ? loadProducts() : [];
  return utf8ToBase64V48(JSON.stringify({products, exportedAt: Date.now(), source:'admin-v48'}));
}
function shopUrlWithProductsV48(){
  const base = new URL('loja.html', window.location.href);
  return base.href.split('#')[0] + '#produtos=' + productsPayloadV48();
}
function setupAdminShopSyncV48(){
  const openBtn = document.getElementById('openShopWithProductsV48');
  const copyBtn = document.getElementById('copyShopProductsLinkV48');

  if(openBtn && !openBtn.dataset.v48Bound){
    openBtn.dataset.v48Bound='1';
    openBtn.addEventListener('click', () => {
      const products = typeof loadProducts === 'function' ? loadProducts() : [];
      if(!products.length){
        alert('Não há produtos no Admin para enviar para a Loja.');
        return;
      }
      window.open(shopUrlWithProductsV48(), '_blank');
    });
  }

  if(copyBtn && !copyBtn.dataset.v48Bound){
    copyBtn.dataset.v48Bound='1';
    copyBtn.addEventListener('click', async () => {
      const products = typeof loadProducts === 'function' ? loadProducts() : [];
      if(!products.length){
        alert('Não há produtos no Admin para copiar.');
        return;
      }
      const url = shopUrlWithProductsV48();
      if(typeof copyTextValue === 'function'){
        await copyTextValue(url, 'Link da Loja copiado com produtos');
      }else{
        await navigator.clipboard.writeText(url);
        alert('Link copiado');
      }
    });
  }
}

function importProductsFromHashV48(){
  if(!location.hash || !location.hash.includes('produtos=')) return false;

  const box = document.getElementById('shopImportStatusV48');

  try{
    const params = new URLSearchParams(location.hash.replace(/^#/, ''));
    const payload = params.get('produtos');
    if(!payload) return false;

    const data = JSON.parse(base64ToUtf8V48(payload));
    const products = Array.isArray(data.products) ? data.products : [];

    if(!products.length){
      if(box){
        box.style.display='block';
        box.textContent='Nenhum produto recebido do Admin.';
      }
      return false;
    }

    localStorage.setItem('cec_products', JSON.stringify(products));
    localStorage.setItem('cec_products_imported_v48_at', String(Date.now()));

    if(box){
      box.style.display='block';
      box.innerHTML=`<strong>${products.length} produto(s) importado(s) do Admin.</strong> A Loja foi alimentada com os produtos cadastrados.`;
    }

    history.replaceState(null, '', location.pathname + location.search);

    setTimeout(() => {
      try{
        if(typeof setupShop === 'function') setupShop();
      }catch(e){}
    }, 100);

    return true;
  }catch(err){
    console.error(err);
    if(box){
      box.style.display='block';
      box.innerHTML='<strong>Erro ao importar produtos do Admin.</strong> Gere o link novamente no Admin.';
    }
    return false;
  }
}

if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', () => {
    setupAdminShopSyncV48();
    importProductsFromHashV48();
  });
}else{
  setupAdminShopSyncV48();
  importProductsFromHashV48();
}



/* Versão 50: Loja renderiza produtos importados do Admin */
function forceShopProductsV50(products){
  const clean = Array.isArray(products) ? products : [];
  try{
    localStorage.setItem('cec_products', JSON.stringify(clean));
  }catch(e){
    console.error('Erro ao salvar produtos importados:', e);
  }

  try{
    if(typeof window !== 'undefined'){
      window.CEC_IMPORTED_PRODUCTS_V50 = clean;
    }
  }catch(e){}

  try{
    if(typeof renderProducts === 'function'){
      renderProducts();
      return;
    }
  }catch(e){
    console.warn('renderProducts falhou, usando render próprio v50', e);
  }

  renderShopProductsV50(clean);
}

function productMatchesCurrentFiltersV50(p){
  const search = (document.getElementById('searchInput')?.value || '').trim().toLowerCase();
  const category = document.querySelector('[data-category].active')?.dataset.category || 'Todos';
  const text = [
    p.name, p.category, p.tag, p.desc, p.brand, p.sku, p.color,
    p.yield, p.compatiblePrinters, p.notes
  ].filter(Boolean).join(' ').toLowerCase();

  const okSearch = !search || text.includes(search);
  const okCat = category === 'Todos' || !category || p.category === category;
  return okSearch && okCat;
}

function renderShopProductsV50(products){
  const grid = document.getElementById('productGrid');
  const count = document.getElementById('productCount');
  const catBox = document.getElementById('categoryFilters');
  if(!grid) return;

  let list = Array.isArray(products) ? [...products] : [];

  // Recria categorias se o container existir
  if(catBox){
    const cats = ['Todos', ...Array.from(new Set(list.map(p => p.category).filter(Boolean)))];
    const current = catBox.querySelector('[data-category].active')?.dataset.category || 'Todos';
    catBox.innerHTML = cats.map(cat => `<button class="${cat === current ? 'active' : ''}" type="button" data-category="${esc(cat)}">${esc(cat)}</button>`).join('');
    catBox.querySelectorAll('[data-category]').forEach(btn => {
      btn.addEventListener('click', () => {
        catBox.querySelectorAll('[data-category]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderShopProductsV50(list);
      });
    });
  }

  list = list.filter(productMatchesCurrentFiltersV50);

  const sort = document.getElementById('sortSelect')?.value || 'featured';
  if(sort === 'price-asc') list.sort((a,b) => Number(a.price||0) - Number(b.price||0));
  if(sort === 'price-desc') list.sort((a,b) => Number(b.price||0) - Number(a.price||0));
  if(sort === 'name') list.sort((a,b) => String(a.name||'').localeCompare(String(b.name||''), 'pt-BR'));

  if(count){
    count.textContent = `${list.length} produto(s)`;
  }

  if(!list.length){
    grid.innerHTML = '<div class="muted-box">Nenhum produto encontrado. Limpe a busca ou selecione outra categoria.</div>';
    return;
  }

  grid.innerHTML = list.map(p => `
    <article class="product-card">
      ${typeof productArt === 'function' ? productArt(p) : `<div class="product-art"><img src="${esc(productImage(p))}" alt="${esc(p.name||'Produto')}" onerror="this.style.display='none'"></div>`}
      <div class="product-body">
        <span class="product-meta">${esc(p.category || '')}${p.type ? ' • ' + esc(p.type) : ''}</span>
        <h3>${esc(p.name || '')}</h3>
        <p>${esc(p.desc || '')}</p>
        ${p.compatiblePrinters ? `<small class="compat-line-v50">Compatível: ${esc(p.compatiblePrinters)}</small>` : ''}
        <div class="product-footer">
          <strong>${fmt(Number(p.price || 0))}</strong>
          <button class="btn btn-primary" type="button" data-add-cart="${p.id}">Adicionar</button>
        </div>
      </div>
    </article>
  `).join('');

  grid.querySelectorAll('[data-add-cart]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.addCart);
      if(typeof addToCart === 'function'){
        addToCart(id);
      }else{
        const prod = products.find(p => Number(p.id) === id);
        if(!prod) return;
        const cart = typeof loadCart === 'function' ? loadCart() : [];
        const existing = cart.find(i => Number(i.id) === id);
        if(existing) existing.qty = Number(existing.qty || 1) + 1;
        else cart.push({id: prod.id, qty: 1});
        if(typeof saveCart === 'function') saveCart(cart);
        if(typeof updateCartCount === 'function') updateCartCount(cart);
      }
    });
  });
}

function importProductsFromHashV50(){
  if(!location.hash || !location.hash.includes('produtos=')) return false;

  const box = document.getElementById('shopImportStatusV48');
  try{
    const params = new URLSearchParams(location.hash.replace(/^#/, ''));
    const payload = params.get('produtos');
    if(!payload) return false;

    let json = '';
    try{
      json = decodeURIComponent(escape(atob(payload)));
    }catch(e){
      json = new TextDecoder().decode(Uint8Array.from(atob(payload), c => c.charCodeAt(0)));
    }

    const data = JSON.parse(json);
    const products = Array.isArray(data.products) ? data.products : [];

    if(!products.length){
      if(box){
        box.style.display = 'block';
        box.textContent = 'Nenhum produto recebido do Admin.';
      }
      return false;
    }

    localStorage.setItem('cec_products', JSON.stringify(products));
    localStorage.setItem('cec_products_imported_v50_at', String(Date.now()));

    if(box){
      box.style.display = 'block';
      box.innerHTML = `<strong>${products.length} produto(s) importado(s) do Admin.</strong> A Loja foi alimentada e renderizada.`;
    }

    // Remove o hash para não reimportar infinitamente, mas depois de salvar.
    history.replaceState(null, '', location.pathname + location.search);

    setTimeout(() => {
      forceShopProductsV50(products);
      const count = document.getElementById('productCount');
      if(count) count.textContent = `${products.length} produto(s)`;
    }, 80);

    setTimeout(() => forceShopProductsV50(products), 300);

    return true;
  }catch(err){
    console.error(err);
    if(box){
      box.style.display = 'block';
      box.innerHTML = '<strong>Erro ao importar produtos do Admin.</strong> Gere o link novamente no Admin.';
    }
    return false;
  }
}

function setupShopRenderAfterImportV50(){
  // Se já existem produtos no localStorage, força render depois do carregamento normal.
  if(document.getElementById('productGrid')){
    setTimeout(() => {
      const products = typeof loadProducts === 'function' ? loadProducts() : [];
      if(Array.isArray(products) && products.length){
        forceShopProductsV50(products);
      }
    }, 500);
  }

  importProductsFromHashV50();

  const search = document.getElementById('searchInput');
  if(search && !search.dataset.v50Bound){
    search.dataset.v50Bound = '1';
    search.addEventListener('input', () => {
      const products = typeof loadProducts === 'function' ? loadProducts() : [];
      renderShopProductsV50(products);
    });
  }

  const sort = document.getElementById('sortSelect');
  if(sort && !sort.dataset.v50Bound){
    sort.dataset.v50Bound = '1';
    sort.addEventListener('change', () => {
      const products = typeof loadProducts === 'function' ? loadProducts() : [];
      renderShopProductsV50(products);
    });
  }
}

if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', setupShopRenderAfterImportV50);
}else{
  setupShopRenderAfterImportV50();
}



/* Versão 54: card da loja mais limpo + visualização rápida + fallback de imagem */
function productArtV54(p, extra=''){
  const src = productImage(p);
  const fallback = defaultImageForCategory(p?.category);
  return `<div class="product-art product-art-img product-art-v54 ${extra}">
    <span class="badge">${esc(p.tag || p.category || 'Produto')}</span>
    <img src="${esc(src)}" alt="${esc(p.name || 'Produto')}" loading="lazy"
      onerror="if(!this.dataset.fallbackApplied){this.dataset.fallbackApplied='1';this.src='${esc(fallback)}';return;} this.style.display='none'; this.nextElementSibling.style.display='grid';">
    <span class="fallback-icon">${productIcon(p.category)}</span>
  </div>`;
}

function openQuickViewV54(productId){
  const products = typeof loadProducts === 'function' ? loadProducts() : [];
  const item = products.find(p => Number(p.id) === Number(productId));
  if(item && typeof openProductModal === 'function'){
    openProductModal(item);
  }
}

function renderShopProductsV54(products){
  const grid = document.getElementById('productGrid');
  const count = document.getElementById('productCount');
  const catBox = document.getElementById('categoryFilters');
  if(!grid) return;

  let list = Array.isArray(products) ? [...products] : [];

  if(catBox){
    const cats = ['Todos', ...Array.from(new Set(list.map(p => p.category).filter(Boolean)))];
    const current = catBox.querySelector('[data-category].active')?.dataset.category || 'Todos';
    catBox.innerHTML = cats.map(cat => `<button class="${cat === current ? 'active' : ''}" type="button" data-category="${esc(cat)}">${esc(cat)}</button>`).join('');
    catBox.querySelectorAll('[data-category]').forEach(btn => {
      btn.addEventListener('click', () => {
        catBox.querySelectorAll('[data-category]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderShopProductsV54(typeof loadProducts === 'function' ? loadProducts() : list);
      });
    });
  }

  list = list.filter(productMatchesCurrentFiltersV50);

  const sort = document.getElementById('sortSelect')?.value || 'featured';
  if(sort === 'price-asc') list.sort((a,b) => Number(a.price||0) - Number(b.price||0));
  if(sort === 'price-desc') list.sort((a,b) => Number(b.price||0) - Number(a.price||0));
  if(sort === 'name') list.sort((a,b) => String(a.name||'').localeCompare(String(b.name||''), 'pt-BR'));

  if(count) count.textContent = `${list.length} produto(s)`;

  const resultCount = document.getElementById('resultCount');
  if(resultCount) resultCount.textContent = `${list.length} produto(s)`;

  if(!list.length){
    grid.innerHTML = '<div class="muted-box">Nenhum produto encontrado. Limpe a busca ou selecione outra categoria.</div>';
    return;
  }

  grid.innerHTML = list.map(p => `
    <article class="product-card product-card-v54">
      ${productArtV54(p)}
      <div class="product-body product-body-v54">
        <span class="product-meta">${esc(p.category || '')}${p.type ? ' • ' + esc(p.type) : ''}</span>
        <h3 class="product-title-v54">${esc(p.name || '')}</h3>
        <div class="product-footer product-footer-v54">
          <strong>${fmt(Number(p.price || 0))}</strong>
          <div class="product-actions-v54">
            <button class="btn btn-outline" type="button" data-quick-view="${p.id}">Ver</button>
            <button class="btn btn-primary" type="button" data-add-cart="${p.id}">Adicionar</button>
          </div>
        </div>
      </div>
    </article>
  `).join('');

  grid.querySelectorAll('[data-quick-view]').forEach(btn => {
    btn.addEventListener('click', () => openQuickViewV54(btn.dataset.quickView));
  });

  grid.querySelectorAll('[data-add-cart]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.addCart);
      if(typeof addToCart === 'function'){
        addToCart(id);
      }else{
        const prod = products.find(p => Number(p.id) === id);
        if(!prod) return;
        const cart = typeof loadCart === 'function' ? loadCart() : [];
        const existing = cart.find(i => Number(i.id) === id);
        if(existing) existing.qty = Number(existing.qty || 1) + 1;
        else cart.push({id: prod.id, qty: 1});
        if(typeof saveCart === 'function') saveCart(cart);
        if(typeof updateCartCount === 'function') updateCartCount(cart);
      }
    });
  });
}

/* Sobrescreve a função de render da versão anterior */
function renderShopProductsV50(products){
  return renderShopProductsV54(products);
}
function forceShopProductsV50(products){
  const clean = Array.isArray(products) ? products : [];
  try{ localStorage.setItem('cec_products', JSON.stringify(clean)); }catch(e){ console.error(e); }
  try{
    renderShopProductsV54(clean);
  }catch(e){
    console.error('Erro ao renderizar loja v54:', e);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if(document.getElementById('productGrid')){
    setTimeout(() => {
      const products = typeof loadProducts === 'function' ? loadProducts() : [];
      if(Array.isArray(products) && products.length){
        renderShopProductsV54(products);
      }
    }, 120);
  }
});



/* Versão 55: modal X, imagem, quantidade e adicionar carrinho corrigidos */
function closeModalV55(modal){
  if(!modal) return;
  modal.classList.remove('open');
  document.body.classList.remove('lock');
}

function findProductV55(id){
  const products = typeof loadProducts === 'function' ? loadProducts() : [];
  return products.find(p => Number(p.id) === Number(id));
}

function addToCartQtyV55(productId, qty=1){
  const id = Number(productId);
  const quantity = Math.max(1, Number(qty || 1));
  const product = findProductV55(id);
  if(!product){
    if(typeof toast === 'function') toast('Produto não encontrado');
    return;
  }

  let cart = typeof loadCart === 'function' ? loadCart() : [];
  if(!Array.isArray(cart)) cart = [];

  const item = cart.find(i => Number(i.id) === id);
  if(item) item.qty = Number(item.qty || 0) + quantity;
  else cart.push({id, qty: quantity});

  if(typeof saveCart === 'function') saveCart(cart);
  else localStorage.setItem('cec_cart', JSON.stringify(cart));

  if(typeof updateCartCount === 'function') updateCartCount(cart);
  if(typeof renderCart === 'function') renderCart();

  if(typeof toast === 'function'){
    toast(quantity > 1 ? `${quantity} unidades adicionadas ao carrinho` : 'Produto adicionado ao carrinho');
  }
}

function productArtV55(p, extra=''){
  const fallback = typeof defaultImageForCategory === 'function' ? defaultImageForCategory(p?.category) : 'assets/img/prod-cartucho.svg';
  const src = (typeof productImage === 'function' ? productImage(p) : '') || fallback;
  return `<div class="product-art product-art-img product-art-v55 ${extra}">
    <span class="badge">${esc(p?.tag || p?.category || 'Produto')}</span>
    <img src="${esc(src)}" alt="${esc(p?.name || 'Produto')}" loading="lazy"
      onerror="if(!this.dataset.fallbackApplied){this.dataset.fallbackApplied='1';this.src='${esc(fallback)}';return;} this.style.display='none'; this.nextElementSibling.style.display='grid';">
    <span class="fallback-icon">${typeof productIcon === 'function' ? productIcon(p?.category) : '◧'}</span>
  </div>`;
}

function openProductModalV55(productId){
  const p = findProductV55(productId);
  if(!p) return;

  const title = document.getElementById('productModalTitle');
  const body = document.getElementById('productModalBody');
  const modal = document.getElementById('productModal');
  if(!body || !modal) return;

  if(title) title.textContent = p.name || 'Produto';

  const details = [
    p.desc ? `<p>${esc(p.desc || '')}</p>` : '',
    p.type ? `<p><strong>Tipo:</strong> ${esc(p.type)}</p>` : '',
    p.brand ? `<p><strong>Marca:</strong> ${esc(p.brand)}</p>` : '',
    p.sku ? `<p><strong>Código/SKU:</strong> ${esc(p.sku)}</p>` : '',
    p.color ? `<p><strong>Cor:</strong> ${esc(p.color)}</p>` : '',
    p.yield ? `<p><strong>Rendimento:</strong> ${esc(p.yield)}</p>` : '',
    p.compatiblePrinters ? `<p><strong>Impressoras compatíveis:</strong><br>${esc(p.compatiblePrinters).replace(/\n/g,'<br>')}</p>` : '',
    p.notes ? `<p><strong>Observações:</strong><br>${esc(p.notes).replace(/\n/g,'<br>')}</p>` : '',
    `<p><strong>Categoria:</strong> ${esc(p.category || '')}</p>`,
    `<p><strong>Estoque:</strong> ${Number(p.stock ?? 0) || 'Sob consulta'}</p>`
  ].filter(Boolean).join('');

  body.innerHTML = `
    ${productArtV55(p, 'modal-product-art modal-product-art-v55')}
    <div class="quick-info-v55">${details}</div>
    <div class="modal-buy-row-v55">
      <div class="price">${fmt(Number(p.price || 0))}</div>
      <div class="modal-qty-v55">
        <label for="modalQtyV55">Quantidade</label>
        <input id="modalQtyV55" type="number" min="1" value="1">
      </div>
      <button class="btn btn-primary" type="button" data-add-modal-v55="${p.id}">Adicionar ao carrinho</button>
    </div>
  `;

  modal.classList.add('open');
  document.body.classList.add('lock');
}

function renderShopProductsV55(products){
  const grid = document.getElementById('productGrid');
  const count = document.getElementById('productCount');
  const resultCount = document.getElementById('resultCount');
  const catBox = document.getElementById('categoryFilters');
  if(!grid) return;

  let all = Array.isArray(products) ? [...products] : [];
  let list = [...all];

  if(catBox){
    const cats = ['Todos', ...Array.from(new Set(all.map(p => p.category).filter(Boolean)))];
    const current = catBox.querySelector('[data-category].active')?.dataset.category || 'Todos';
    catBox.innerHTML = cats.map(cat => `<button class="${cat === current ? 'active' : ''}" type="button" data-category="${esc(cat)}">${esc(cat)}</button>`).join('');
    catBox.querySelectorAll('[data-category]').forEach(btn => {
      btn.addEventListener('click', () => {
        catBox.querySelectorAll('[data-category]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderShopProductsV55(typeof loadProducts === 'function' ? loadProducts() : all);
      });
    });
  }

  if(typeof productMatchesCurrentFiltersV50 === 'function'){
    list = list.filter(productMatchesCurrentFiltersV50);
  }

  const sort = document.getElementById('sortSelect')?.value || 'featured';
  if(sort === 'price-asc') list.sort((a,b) => Number(a.price||0) - Number(b.price||0));
  if(sort === 'price-desc') list.sort((a,b) => Number(b.price||0) - Number(a.price||0));
  if(sort === 'name') list.sort((a,b) => String(a.name||'').localeCompare(String(b.name||''), 'pt-BR'));

  if(count) count.textContent = `${list.length} produto(s)`;
  if(resultCount) resultCount.textContent = `${list.length} produto(s)`;

  if(!list.length){
    grid.innerHTML = '<div class="muted-box">Nenhum produto encontrado. Limpe a busca ou selecione outra categoria.</div>';
    return;
  }

  grid.innerHTML = list.map(p => `
    <article class="product-card product-card-v54 product-card-v55">
      ${productArtV55(p)}
      <div class="product-body product-body-v54 product-body-v55">
        <span class="product-meta">${esc(p.category || '')}${p.type ? ' • ' + esc(p.type) : ''}</span>
        <h3 class="product-title-v54">${esc(p.name || '')}</h3>
        <div class="product-footer product-footer-v54">
          <strong>${fmt(Number(p.price || 0))}</strong>
          <div class="qty-add-v55">
            <input class="qty-input-v55" type="number" min="1" value="1" data-card-qty="${p.id}" aria-label="Quantidade">
            <button class="btn btn-outline" type="button" data-quick-view="${p.id}">Ver</button>
            <button class="btn btn-primary" type="button" data-add-cart-v55="${p.id}">Adicionar</button>
          </div>
        </div>
      </div>
    </article>
  `).join('');
}

/* Sobrescreve renderizações antigas */
function renderShopProductsV50(products){ return renderShopProductsV55(products); }
function forceShopProductsV50(products){
  const clean = Array.isArray(products) ? products : [];
  try{ localStorage.setItem('cec_products', JSON.stringify(clean)); }catch(e){ console.error(e); }
  renderShopProductsV55(clean);
}

function setupModalAndCartV55(){
  document.addEventListener('click', function(e){
    const closeBtn = e.target.closest('[data-close-modal], .modal-close, .close-modal, .btn-close, .x-close');
    if(closeBtn){
      e.preventDefault();
      e.stopPropagation();
      closeModalV55(closeBtn.closest('.modal'));
      return;
    }

    if(e.target && e.target.classList && e.target.classList.contains('modal')){
      e.preventDefault();
      closeModalV55(e.target);
      return;
    }

    const quick = e.target.closest('[data-quick-view], [data-view]');
    if(quick){
      e.preventDefault();
      openProductModalV55(quick.dataset.quickView || quick.dataset.view);
      return;
    }

    const addCard = e.target.closest('[data-add-cart-v55], [data-add-cart], [data-add]');
    if(addCard){
      e.preventDefault();
      const id = Number(addCard.dataset.addCartV55 || addCard.dataset.addCart || addCard.dataset.add);
      const qty = Number(document.querySelector(`[data-card-qty="${id}"]`)?.value || 1);
      addToCartQtyV55(id, qty);
      return;
    }

    const addModal = e.target.closest('[data-add-modal-v55], [data-add-modal]');
    if(addModal){
      e.preventDefault();
      const id = Number(addModal.dataset.addModalV55 || addModal.dataset.addModal);
      const qty = Number(document.getElementById('modalQtyV55')?.value || 1);
      addToCartQtyV55(id, qty);
      closeModalV55(addModal.closest('.modal'));
      return;
    }
  }, true);

  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape'){
      document.querySelectorAll('.modal.open').forEach(closeModalV55);
    }
  });
}

function bootShopV55(){
  setupModalAndCartV55();

  if(document.getElementById('productGrid')){
    setTimeout(() => {
      const products = typeof loadProducts === 'function' ? loadProducts() : [];
      if(Array.isArray(products) && products.length){
        renderShopProductsV55(products);
      }
    }, 120);

    const search = document.getElementById('searchInput');
    if(search && !search.dataset.v55Bound){
      search.dataset.v55Bound='1';
      search.addEventListener('input', () => renderShopProductsV55(typeof loadProducts === 'function' ? loadProducts() : []));
    }

    const sort = document.getElementById('sortSelect');
    if(sort && !sort.dataset.v55Bound){
      sort.dataset.v55Bound='1';
      sort.addEventListener('change', () => renderShopProductsV55(typeof loadProducts === 'function' ? loadProducts() : []));
    }
  }
}

if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', bootShopV55);
}else{
  bootShopV55();
}



/* Versão 57: imagem salva no cadastro, card e modal */
function productMsgV57(type,msg){
  const box=document.getElementById('productSaveStatusV40');
  if(box){ box.style.display='block'; box.className='product-save-status-v40 '+(type==='error'?'error':'ok'); box.textContent=msg; }
  else if(type==='error') alert(msg);
}
function fileNameV57(name){
  const parts=String(name||'produto.jpg').split('.');
  const ext=(parts.length>1?parts.pop():'jpg').toLowerCase().replace(/[^a-z0-9]/g,'')||'jpg';
  const base=(parts.join('.')||'produto').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'')||'produto';
  return base+'.'+ext;
}
function resizeImageV57(file, cb){
  const reader=new FileReader();
  reader.onload=()=>{
    const img=new Image();
    img.onload=()=>{
      const max=620;
      let w=img.width||max, h=img.height||max;
      if(w>max||h>max){
        if(w>=h){ h=Math.round(h*(max/w)); w=max; }
        else { w=Math.round(w*(max/h)); h=max; }
      }
      const canvas=document.createElement('canvas');
      canvas.width=w; canvas.height=h;
      const ctx=canvas.getContext('2d');
      ctx.fillStyle='#fff'; ctx.fillRect(0,0,w,h); ctx.drawImage(img,0,0,w,h);
      let data=canvas.toDataURL('image/jpeg',0.70);
      if(data.length>550000) data=canvas.toDataURL('image/jpeg',0.55);
      if(data.length>720000) data=canvas.toDataURL('image/jpeg',0.42);
      if(data.length>850000){ productMsgV57('error','Imagem muito pesada. Use uma imagem menor.'); cb(''); return; }
      cb(data);
    };
    img.onerror=()=>{ productMsgV57('error','Não consegui ler essa imagem. Tente outra.'); cb(''); };
    img.src=String(reader.result||'');
  };
  reader.readAsDataURL(file);
}
function loadProducts(){ 
  try{ const p=JSON.parse(localStorage.getItem('cec_products')||'null'); return Array.isArray(p)?p:CEC_DEFAULT_PRODUCTS; }catch(e){ return CEC_DEFAULT_PRODUCTS; }
}
function saveProducts(products){ localStorage.setItem('cec_products', JSON.stringify(Array.isArray(products)?products:[])); }
function productImage(p){
  if(p && p.imageData && String(p.imageData).startsWith('data:image/')) return p.imageData;
  if(p && p.image && String(p.image).startsWith('data:image/')) return p.image;
  return (p && p.image) || defaultImageForCategory(p && p.category);
}
function setupProductImageV57(){
  const file=document.getElementById('prodImageFile');
  const path=document.getElementById('prodImage');
  const data=document.getElementById('prodImageData');
  const preview=document.getElementById('prodImagePreview');
  const box=document.getElementById('prodImagePreviewBox');
  function show(src){
    if(!preview||!box) return;
    preview.onerror=function(){ this.onerror=null; this.src=defaultImageForCategory(document.getElementById('prodCat')?.value||'Outros'); };
    preview.src=src || data?.value || path?.value || defaultImageForCategory(document.getElementById('prodCat')?.value||'Outros');
    box.style.display='flex';
  }
  if(file && !file.dataset.v57Bound){
    file.dataset.v57Bound='1';
    file.addEventListener('change',()=>{
      const f=file.files&&file.files[0];
      if(!f) return;
      if(!f.type || !f.type.startsWith('image/')){ productMsgV57('error','Escolha um arquivo de imagem.'); return; }
      if(path) path.value='assets/img/produtos/'+fileNameV57(f.name);
      resizeImageV57(f,(imgData)=>{
        if(!imgData) return;
        if(data) data.value=imgData;
        show(imgData);
        productMsgV57('ok','Imagem carregada e pronta para salvar no cadastro.');
      });
    });
  }
  document.getElementById('previewProductImageBtn')?.addEventListener('click',e=>{ e.preventDefault(); show(); });
  document.getElementById('clearProductImageBtn')?.addEventListener('click',e=>{
    e.preventDefault();
    if(path) path.value='';
    if(data) data.value='';
    if(file) file.value='';
    if(box) box.style.display='none';
    productMsgV57('ok','Imagem removida do formulário.');
  });
}
function buildProductV57(){
  const id=(document.getElementById('prodId')?.value||'').trim();
  const existing=id ? loadProducts().find(p=>Number(p.id)===Number(id)) : null;
  const name=(document.getElementById('prodName')?.value||'').trim();
  const category=(document.getElementById('prodCat')?.value||'').trim()||'Outros';
  const priceText=(document.getElementById('prodPrice')?.value||'').trim();
  if(!name) throw new Error('Preencha o nome do produto.');
  if(!priceText) throw new Error('Preencha o preço do produto.');
  const imgData=document.getElementById('prodImageData')?.value || existing?.imageData || '';
  const imgPath=(document.getElementById('prodImage')?.value||'').trim() || existing?.image || defaultImageForCategory(category);
  return {
    id:id?Number(id):Date.now(),
    name, category,
    type:document.getElementById('prodType')?.value||'Compatível',
    brand:(document.getElementById('prodBrand')?.value||'').trim(),
    sku:(document.getElementById('prodSku')?.value||'').trim(),
    color:(document.getElementById('prodColor')?.value||'').trim(),
    price:typeof parseMoney==='function'?parseMoney(priceText):Number(String(priceText).replace(/\./g,'').replace(',','.').replace(/[^0-9.\-]/g,''))||0,
    tag:(document.getElementById('prodTag')?.value||'').trim(),
    stock:Number((document.getElementById('prodStock')?.value||'').trim()||0),
    yield:(document.getElementById('prodYield')?.value||'').trim(),
    compatiblePrinters:(document.getElementById('prodPrinters')?.value||'').trim(),
    notes:(document.getElementById('prodNotes')?.value||'').trim(),
    image:imgPath,
    imageData:imgData,
    desc:(document.getElementById('prodDesc')?.value||'').trim()
  };
}
function saveProductFormV57(e){
  if(e){ e.preventDefault(); e.stopPropagation(); if(e.stopImmediatePropagation) e.stopImmediatePropagation(); }
  try{
    const prod=buildProductV57();
    let products=loadProducts();
    products=products.some(p=>Number(p.id)===Number(prod.id)) ? products.map(p=>Number(p.id)===Number(prod.id)?prod:p) : [prod,...products];
    saveProducts(products);
    if(typeof renderAdminProducts==='function') renderAdminProducts();
    document.getElementById('productForm')?.reset();
    const id=document.getElementById('prodId'); if(id) id.value='';
    const data=document.getElementById('prodImageData'); if(data) data.value='';
    const file=document.getElementById('prodImageFile'); if(file) file.value='';
    const box=document.getElementById('prodImagePreviewBox'); if(box) box.style.display='none';
    const title=document.getElementById('productFormTitle'); if(title) title.textContent='Cadastrar produto';
    productMsgV57('ok','Produto salvo com imagem no cadastro.');
    if(typeof toast==='function') toast('Produto salvo');
    return false;
  }catch(err){ console.error(err); productMsgV57('error',err.message||'Erro ao salvar produto.'); return false; }
}
function productArtV55(p, extra=''){
  const fallback=typeof defaultImageForCategory==='function'?defaultImageForCategory(p?.category):'assets/img/prod-cartucho.svg';
  const src=productImage(p)||fallback;
  return `<div class="product-art product-art-img product-art-v55 ${extra}">
    <span class="badge">${esc(p?.tag||p?.category||'Produto')}</span>
    <img src="${esc(src)}" alt="${esc(p?.name||'Produto')}" loading="lazy" onerror="if(!this.dataset.fallbackApplied){this.dataset.fallbackApplied='1';this.src='${esc(fallback)}';return;} this.style.display='none'; this.nextElementSibling.style.display='grid';">
    <span class="fallback-icon">${typeof productIcon==='function'?productIcon(p?.category):'◧'}</span>
  </div>`;
}
function saveProductFormV40(e){ return saveProductFormV57(e); }
function saveProductFormV44(e){ return saveProductFormV57(e); }
function setupImageSaveBootV57(){
  setupProductImageV57();
  const form=document.getElementById('productForm');
  if(form && !form.dataset.v57Bound){
    form.dataset.v57Bound='1';
    form.setAttribute('onsubmit','return saveProductFormV57(event)');
    form.addEventListener('submit',saveProductFormV57,true);
  }
  const save=document.getElementById('saveProductBtnV40')||document.querySelector('#productForm button[type="submit"]');
  if(save && !save.dataset.v57Bound){
    save.dataset.v57Bound='1';
    save.addEventListener('click',saveProductFormV57,true);
  }
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',setupImageSaveBootV57);
else setupImageSaveBootV57();



/* Versão 58: modal com imagem controlada e informações visíveis */
function openProductModalV55(productId){
  const products = typeof loadProducts === 'function' ? loadProducts() : [];
  const p = products.find(x => Number(x.id) === Number(productId));
  if(!p) return;

  const title = document.getElementById('productModalTitle');
  const body = document.getElementById('productModalBody');
  const modal = document.getElementById('productModal');
  if(!body || !modal) return;

  if(title) title.textContent = p.name || 'Produto';

  const details = [
    p.desc ? `<p>${esc(p.desc || '')}</p>` : '',
    p.type ? `<p><strong>Tipo:</strong> ${esc(p.type)}</p>` : '',
    p.brand ? `<p><strong>Marca:</strong> ${esc(p.brand)}</p>` : '',
    p.sku ? `<p><strong>Código/SKU:</strong> ${esc(p.sku)}</p>` : '',
    p.color ? `<p><strong>Cor:</strong> ${esc(p.color)}</p>` : '',
    p.yield ? `<p><strong>Rendimento:</strong> ${esc(p.yield)}</p>` : '',
    p.compatiblePrinters ? `<p><strong>Impressoras compatíveis:</strong><br>${esc(p.compatiblePrinters).replace(/\n/g,'<br>')}</p>` : '',
    p.notes ? `<p><strong>Observações:</strong><br>${esc(p.notes).replace(/\n/g,'<br>')}</p>` : '',
    `<p><strong>Categoria:</strong> ${esc(p.category || '')}</p>`,
    `<p><strong>Estoque:</strong> ${Number(p.stock ?? 0) || 'Sob consulta'}</p>`
  ].filter(Boolean).join('');

  body.innerHTML = `
    <div class="modal-product-layout-v58">
      <div class="modal-image-col-v58">
        ${productArtV55(p, 'modal-product-art modal-product-art-v55 modal-product-art-v58')}
      </div>

      <div class="modal-info-col-v58">
        <div class="quick-info-v55 quick-info-v58">${details}</div>

        <div class="modal-buy-row-v55 modal-buy-row-v58">
          <div class="price">${fmt(Number(p.price || 0))}</div>
          <div class="modal-qty-v55">
            <label for="modalQtyV55">Quantidade</label>
            <input id="modalQtyV55" type="number" min="1" value="1">
          </div>
          <button class="btn btn-primary" type="button" data-add-modal-v55="${p.id}">Adicionar ao carrinho</button>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('open');
  document.body.classList.add('lock');
}



/* Versão 60: imagem da vitrine corrigida */
function productImageV60(p){
  if(p && p.imageData && String(p.imageData).startsWith('data:image/')) return p.imageData;
  if(p && p.image && String(p.image).startsWith('data:image/')) return p.image;
  if(p && p.image && !String(p.image).startsWith('assets/img/produtos/')) return p.image;
  if(p && p.image && String(p.image).startsWith('http')) return p.image;
  if(p && p.image && String(p.image).trim()) return p.image;
  return defaultImageForCategory(p && p.category);
}

/* Sobrescreve a imagem padrão usada no site */
function productImage(p){
  return productImageV60(p);
}

function productArtV60(p, extra=''){
  const fallback = defaultImageForCategory(p?.category);
  const src = productImageV60(p) || fallback;
  return `<div class="product-art product-art-img product-art-v55 product-art-v60 ${extra}">
    <span class="badge">${esc(p?.tag || p?.category || 'Produto')}</span>
    <img src="${esc(src)}" alt="${esc(p?.name || 'Produto')}" loading="lazy"
      onerror="if(!this.dataset.fallbackApplied){this.dataset.fallbackApplied='1';this.src='${esc(fallback)}';return;} this.style.display='none'; this.nextElementSibling.style.display='grid';">
    <span class="fallback-icon">${typeof productIcon === 'function' ? productIcon(p?.category) : '◧'}</span>
  </div>`;
}

/* Mantém compatibilidade com as versões anteriores */
function productArtV55(p, extra=''){
  return productArtV60(p, extra);
}

function renderShopProductsV60(products){
  const grid = document.getElementById('productGrid');
  const count = document.getElementById('productCount');
  const resultCount = document.getElementById('resultCount');
  const catBox = document.getElementById('categoryFilters');
  if(!grid) return;

  let all = Array.isArray(products) ? [...products] : [];
  let list = [...all];

  if(catBox){
    const cats = ['Todos', ...Array.from(new Set(all.map(p => p.category).filter(Boolean)))];
    const current = catBox.querySelector('[data-category].active')?.dataset.category || 'Todos';
    catBox.innerHTML = cats.map(cat => `<button class="${cat === current ? 'active' : ''}" type="button" data-category="${esc(cat)}">${esc(cat)}</button>`).join('');
    catBox.querySelectorAll('[data-category]').forEach(btn => {
      btn.addEventListener('click', () => {
        catBox.querySelectorAll('[data-category]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderShopProductsV60(typeof loadProducts === 'function' ? loadProducts() : all);
      });
    });
  }

  if(typeof productMatchesCurrentFiltersV50 === 'function'){
    list = list.filter(productMatchesCurrentFiltersV50);
  }

  const sort = document.getElementById('sortSelect')?.value || 'featured';
  if(sort === 'price-asc') list.sort((a,b) => Number(a.price||0) - Number(b.price||0));
  if(sort === 'price-desc') list.sort((a,b) => Number(b.price||0) - Number(a.price||0));
  if(sort === 'name') list.sort((a,b) => String(a.name||'').localeCompare(String(b.name||''), 'pt-BR'));

  if(count) count.textContent = `${list.length} produto(s)`;
  if(resultCount) resultCount.textContent = `${list.length} produto(s)`;

  if(!list.length){
    grid.innerHTML = '<div class="muted-box">Nenhum produto encontrado. Limpe a busca ou selecione outra categoria.</div>';
    return;
  }

  grid.innerHTML = list.map(p => `
    <article class="product-card product-card-v54 product-card-v55 product-card-v60">
      ${productArtV60(p)}
      <div class="product-body product-body-v54 product-body-v55">
        <span class="product-meta">${esc(p.category || '')}${p.type ? ' • ' + esc(p.type) : ''}</span>
        <h3 class="product-title-v54">${esc(p.name || '')}</h3>
        <div class="product-footer product-footer-v54">
          <strong>${fmt(Number(p.price || 0))}</strong>
          <div class="qty-add-v55">
            <input class="qty-input-v55" type="number" min="1" value="1" data-card-qty="${p.id}" aria-label="Quantidade">
            <button class="btn btn-outline" type="button" data-quick-view="${p.id}">Ver</button>
            <button class="btn btn-primary" type="button" data-add-cart-v55="${p.id}">Adicionar</button>
          </div>
        </div>
      </div>
    </article>
  `).join('');
}

/* Sobrescreve render antigo da loja */
function renderShopProductsV50(products){ return renderShopProductsV60(products); }
function renderShopProductsV55(products){ return renderShopProductsV60(products); }
function forceShopProductsV50(products){
  const clean = Array.isArray(products) ? products : [];
  try{ localStorage.setItem('cec_products', JSON.stringify(clean)); }catch(e){ console.error(e); }
  renderShopProductsV60(clean);
}

/* Corrige abrir loja com produtos: salva uma cópia local antes de abrir */
function shopUrlWithProductsV48(){
  const products = typeof loadProducts === 'function' ? loadProducts() : [];
  try{
    sessionStorage.setItem('cec_shop_transfer_products_v60', JSON.stringify(products));
    localStorage.setItem('cec_shop_transfer_products_v60', JSON.stringify(products));
  }catch(e){}
  const base = new URL('loja.html', window.location.href);
  return base.href.split('#')[0] + '#usarProdutosAdmin=1';
}

function importProductsFromTransferV60(){
  if(!document.getElementById('productGrid')) return false;

  const hasFlag = location.hash && location.hash.includes('usarProdutosAdmin=1');
  let raw = '';

  try{
    raw = sessionStorage.getItem('cec_shop_transfer_products_v60') || localStorage.getItem('cec_shop_transfer_products_v60') || '';
  }catch(e){}

  if(!hasFlag && !raw) return false;

  try{
    const products = raw ? JSON.parse(raw) : (typeof loadProducts === 'function' ? loadProducts() : []);
    if(Array.isArray(products) && products.length){
      localStorage.setItem('cec_products', JSON.stringify(products));

      const box = document.getElementById('shopImportStatusV48');
      if(box){
        box.style.display = 'block';
        box.innerHTML = `<strong>${products.length} produto(s) carregado(s) do Admin.</strong> A vitrine foi atualizada com as imagens cadastradas.`;
      }

      history.replaceState(null, '', location.pathname + location.search);
      setTimeout(() => renderShopProductsV60(products), 80);
      setTimeout(() => renderShopProductsV60(products), 350);
      return true;
    }
  }catch(err){
    console.error(err);
  }
  return false;
}

function bootVitrineImageV60(){
  if(document.getElementById('productGrid')){
    importProductsFromTransferV60();

    setTimeout(() => {
      const products = typeof loadProducts === 'function' ? loadProducts() : [];
      if(Array.isArray(products) && products.length) renderShopProductsV60(products);
    }, 450);
  }
}

if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', bootVitrineImageV60);
}else{
  bootVitrineImageV60();
}



/* Versão 61: imagem definitiva na vitrine e modal */
function productImageStoreV61(){
  try{
    return JSON.parse(localStorage.getItem('cec_product_images_v61') || '{}') || {};
  }catch(e){
    return {};
  }
}

function saveProductImageV61(productId, imageData){
  if(!productId || !imageData || !String(imageData).startsWith('data:image/')) return;
  const store = productImageStoreV61();
  store[String(productId)] = imageData;
  try{
    localStorage.setItem('cec_product_images_v61', JSON.stringify(store));
  }catch(e){
    console.warn('Imagem grande demais para salvar no mapa separado', e);
  }
}

function getProductImageV61(p){
  if(!p) return '';
  const id = String(p.id || '');
  const store = productImageStoreV61();

  if(p.imageData && String(p.imageData).startsWith('data:image/')) return p.imageData;
  if(id && store[id] && String(store[id]).startsWith('data:image/')) return store[id];
  if(p.image && String(p.image).startsWith('data:image/')) return p.image;

  const img = String(p.image || '').trim();
  if(img && !img.startsWith('assets/img/produtos/')) return img;
  if(img && img.startsWith('assets/img/produtos/')) return img;

  return defaultImageForCategory(p.category);
}

function productImage(p){
  return getProductImageV61(p);
}

function resizeImageForProductV61(file, callback){
  const reader = new FileReader();

  reader.onload = () => {
    const img = new Image();

    img.onload = () => {
      const max = 700;
      let w = img.width || max;
      let h = img.height || max;

      if(w > max || h > max){
        if(w >= h){
          h = Math.round(h * (max / w));
          w = max;
        }else{
          w = Math.round(w * (max / h));
          h = max;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;

      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h);

      let data = canvas.toDataURL('image/jpeg', 0.72);
      if(data.length > 650000) data = canvas.toDataURL('image/jpeg', 0.55);
      if(data.length > 850000) data = canvas.toDataURL('image/jpeg', 0.42);

      if(data.length > 950000){
        callback('');
        const box = document.getElementById('productSaveStatusV40');
        if(box){
          box.style.display = 'block';
          box.className = 'product-save-status-v40 error';
          box.textContent = 'Imagem muito pesada. Use uma imagem menor.';
        }else{
          alert('Imagem muito pesada. Use uma imagem menor.');
        }
        return;
      }

      callback(data);
    };

    img.onerror = () => {
      callback('');
      alert('Não consegui ler essa imagem. Tente outra imagem.');
    };

    img.src = String(reader.result || '');
  };

  reader.readAsDataURL(file);
}

function fileNameProductV61(name){
  const parts = String(name || 'produto.jpg').split('.');
  const ext = parts.length > 1 ? parts.pop().toLowerCase().replace(/[^a-z0-9]/g,'') : 'jpg';
  const base = parts.join('.')
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g,'-')
    .replace(/^-+|-+$/g,'') || 'produto';
  return `${base}.${ext || 'jpg'}`;
}

function setupProductImageV61(){
  const file = document.getElementById('prodImageFile');
  const path = document.getElementById('prodImage');
  const data = document.getElementById('prodImageData');
  const preview = document.getElementById('prodImagePreview');
  const box = document.getElementById('prodImagePreviewBox');

  function setMsg(type, msg){
    const status = document.getElementById('productSaveStatusV40');
    if(status){
      status.style.display = 'block';
      status.className = 'product-save-status-v40 ' + (type === 'error' ? 'error' : 'ok');
      status.textContent = msg;
    }
  }

  function showPreview(src){
    if(!preview || !box) return;
    preview.onerror = function(){
      this.onerror = null;
      this.src = defaultImageForCategory(document.getElementById('prodCat')?.value || 'Outros');
    };
    preview.src = src || data?.value || path?.value || defaultImageForCategory(document.getElementById('prodCat')?.value || 'Outros');
    box.style.display = 'flex';
  }

  if(file && !file.dataset.v61Bound){
    file.dataset.v61Bound = '1';
    file.addEventListener('change', () => {
      const selected = file.files && file.files[0];
      if(!selected) return;

      if(!selected.type || !selected.type.startsWith('image/')){
        setMsg('error', 'Escolha um arquivo de imagem.');
        return;
      }

      if(path) path.value = 'assets/img/produtos/' + fileNameProductV61(selected.name);

      resizeImageForProductV61(selected, (imageData) => {
        if(!imageData) return;
        if(data) data.value = imageData;
        showPreview(imageData);
        setMsg('ok', 'Imagem carregada. Agora clique em Salvar produto.');
      });
    });
  }

  const previewBtn = document.getElementById('previewProductImageBtn');
  if(previewBtn && !previewBtn.dataset.v61Bound){
    previewBtn.dataset.v61Bound = '1';
    previewBtn.addEventListener('click', e => {
      e.preventDefault();
      showPreview();
    });
  }
}

function buildProductV61(){
  const idText = (document.getElementById('prodId')?.value || '').trim();
  const existing = idText ? loadProducts().find(p => Number(p.id) === Number(idText)) : null;

  const name = (document.getElementById('prodName')?.value || '').trim();
  const category = (document.getElementById('prodCat')?.value || '').trim() || 'Outros';
  const priceText = (document.getElementById('prodPrice')?.value || '').trim();

  if(!name) throw new Error('Preencha o nome do produto.');
  if(!priceText) throw new Error('Preencha o preço do produto.');

  const imageData = document.getElementById('prodImageData')?.value || existing?.imageData || '';
  const imagePath = (document.getElementById('prodImage')?.value || '').trim() || existing?.image || defaultImageForCategory(category);

  return {
    id: idText ? Number(idText) : Date.now(),
    name,
    category,
    type: document.getElementById('prodType')?.value || 'Compatível',
    brand: (document.getElementById('prodBrand')?.value || '').trim(),
    sku: (document.getElementById('prodSku')?.value || '').trim(),
    color: (document.getElementById('prodColor')?.value || '').trim(),
    price: typeof parseMoney === 'function' ? parseMoney(priceText) : Number(String(priceText).replace(/\./g,'').replace(',','.').replace(/[^0-9.\-]/g,'')) || 0,
    tag: (document.getElementById('prodTag')?.value || '').trim(),
    stock: Number((document.getElementById('prodStock')?.value || '').trim() || 0),
    yield: (document.getElementById('prodYield')?.value || '').trim(),
    compatiblePrinters: (document.getElementById('prodPrinters')?.value || '').trim(),
    notes: (document.getElementById('prodNotes')?.value || '').trim(),
    image: imagePath,
    imageData,
    desc: (document.getElementById('prodDesc')?.value || '').trim()
  };
}

function saveProductFormV61(event){
  if(event){
    event.preventDefault();
    event.stopPropagation();
    if(event.stopImmediatePropagation) event.stopImmediatePropagation();
  }

  try{
    const product = buildProductV61();

    if(product.imageData){
      saveProductImageV61(product.id, product.imageData);
    }

    let products = loadProducts();

    if(products.some(p => Number(p.id) === Number(product.id))){
      products = products.map(p => Number(p.id) === Number(product.id) ? product : p);
    }else{
      products.unshift(product);
    }

    saveProducts(products);

    if(typeof renderAdminProducts === 'function') renderAdminProducts();

    const form = document.getElementById('productForm');
    if(form) form.reset();

    const id = document.getElementById('prodId');
    if(id) id.value = '';

    const imageData = document.getElementById('prodImageData');
    if(imageData) imageData.value = '';

    const file = document.getElementById('prodImageFile');
    if(file) file.value = '';

    const previewBox = document.getElementById('prodImagePreviewBox');
    if(previewBox) previewBox.style.display = 'none';

    const title = document.getElementById('productFormTitle');
    if(title) title.textContent = 'Cadastrar produto';

    const status = document.getElementById('productSaveStatusV40');
    if(status){
      status.style.display = 'block';
      status.className = 'product-save-status-v40 ok';
      status.textContent = 'Produto salvo com imagem na vitrine.';
    }

    if(typeof toast === 'function') toast('Produto salvo');
    return false;
  }catch(err){
    console.error(err);
    const status = document.getElementById('productSaveStatusV40');
    if(status){
      status.style.display = 'block';
      status.className = 'product-save-status-v40 error';
      status.textContent = err.message || 'Erro ao salvar produto.';
    }else{
      alert(err.message || 'Erro ao salvar produto.');
    }
    return false;
  }
}

/* Admin: ao editar, carrega a imagem salva no preview */
function fillEditProductImageV61(p){
  const imgData = getProductImageV61(p);
  const data = document.getElementById('prodImageData');
  const preview = document.getElementById('prodImagePreview');
  const box = document.getElementById('prodImagePreviewBox');

  if(data && imgData && String(imgData).startsWith('data:image/')) data.value = imgData;
  if(preview && box){
    preview.src = imgData || defaultImageForCategory(p.category);
    box.style.display = 'flex';
  }
}

/* Vitrine */
function productArtV60(p, extra=''){
  const fallback = defaultImageForCategory(p?.category);
  const src = getProductImageV61(p) || fallback;
  return `<div class="product-art product-art-img product-art-v55 product-art-v60 ${extra}">
    <span class="badge">${esc(p?.tag || p?.category || 'Produto')}</span>
    <img src="${esc(src)}" alt="${esc(p?.name || 'Produto')}" loading="lazy"
      onerror="if(!this.dataset.fallbackApplied){this.dataset.fallbackApplied='1';this.src='${esc(fallback)}';return;} this.style.display='none'; this.nextElementSibling.style.display='grid';">
    <span class="fallback-icon">${typeof productIcon === 'function' ? productIcon(p?.category) : '◧'}</span>
  </div>`;
}
function productArtV55(p, extra=''){ return productArtV60(p, extra); }

function shopUrlWithProductsV48(){
  const products = typeof loadProducts === 'function' ? loadProducts() : [];
  const images = productImageStoreV61();
  try{
    sessionStorage.setItem('cec_shop_transfer_products_v60', JSON.stringify(products));
    localStorage.setItem('cec_shop_transfer_products_v60', JSON.stringify(products));
    sessionStorage.setItem('cec_product_images_v61_transfer', JSON.stringify(images));
    localStorage.setItem('cec_product_images_v61_transfer', JSON.stringify(images));
  }catch(e){}
  const base = new URL('loja.html', window.location.href);
  return base.href.split('#')[0] + '#usarProdutosAdmin=1';
}

function importImagesTransferV61(){
  try{
    const raw = sessionStorage.getItem('cec_product_images_v61_transfer') || localStorage.getItem('cec_product_images_v61_transfer') || '';
    if(raw){
      localStorage.setItem('cec_product_images_v61', raw);
    }
  }catch(e){}
}

function bootImageFixV61(){
  setupProductImageV61();

  const form = document.getElementById('productForm');
  if(form && !form.dataset.v61Bound){
    form.dataset.v61Bound = '1';
    form.setAttribute('onsubmit', 'return saveProductFormV61(event)');
    form.addEventListener('submit', saveProductFormV61, true);
  }

  const saveBtn = document.getElementById('saveProductBtnV40') || document.querySelector('#productForm button[type="submit"]');
  if(saveBtn && !saveBtn.dataset.v61Bound){
    saveBtn.dataset.v61Bound = '1';
    saveBtn.addEventListener('click', saveProductFormV61, true);
  }

  importImagesTransferV61();

  if(document.getElementById('productGrid')){
    setTimeout(() => {
      const products = typeof loadProducts === 'function' ? loadProducts() : [];
      if(Array.isArray(products) && products.length && typeof renderShopProductsV60 === 'function'){
        renderShopProductsV60(products);
      }
    }, 250);
  }
}

function saveProductFormV40(e){ return saveProductFormV61(e); }
function saveProductFormV44(e){ return saveProductFormV61(e); }
function saveProductFormV57(e){ return saveProductFormV61(e); }

if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', bootImageFixV61);
}else{
  bootImageFixV61();
}



/* Versão 62: nome do produto visível na vitrine */
function renderShopProductsV62(products){
  const grid = document.getElementById('productGrid');
  const count = document.getElementById('productCount');
  const resultCount = document.getElementById('resultCount');
  const catBox = document.getElementById('categoryFilters');
  if(!grid) return;

  let all = Array.isArray(products) ? [...products] : [];
  let list = [...all];

  if(catBox){
    const cats = ['Todos', ...Array.from(new Set(all.map(p => p.category).filter(Boolean)))];
    const current = catBox.querySelector('[data-category].active')?.dataset.category || 'Todos';
    catBox.innerHTML = cats.map(cat => `<button class="${cat === current ? 'active' : ''}" type="button" data-category="${esc(cat)}">${esc(cat)}</button>`).join('');
    catBox.querySelectorAll('[data-category]').forEach(btn => {
      btn.addEventListener('click', () => {
        catBox.querySelectorAll('[data-category]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderShopProductsV62(typeof loadProducts === 'function' ? loadProducts() : all);
      });
    });
  }

  if(typeof productMatchesCurrentFiltersV50 === 'function'){
    list = list.filter(productMatchesCurrentFiltersV50);
  }

  const sort = document.getElementById('sortSelect')?.value || 'featured';
  if(sort === 'price-asc') list.sort((a,b) => Number(a.price||0) - Number(b.price||0));
  if(sort === 'price-desc') list.sort((a,b) => Number(b.price||0) - Number(a.price||0));
  if(sort === 'name') list.sort((a,b) => String(a.name||'').localeCompare(String(b.name||''), 'pt-BR'));

  if(count) count.textContent = `${list.length} produto(s)`;
  if(resultCount) resultCount.textContent = `${list.length} produto(s)`;

  if(!list.length){
    grid.innerHTML = '<div class="muted-box">Nenhum produto encontrado. Limpe a busca ou selecione outra categoria.</div>';
    return;
  }

  grid.innerHTML = list.map(p => `
    <article class="product-card product-card-v54 product-card-v55 product-card-v60 product-card-v62">
      ${typeof productArtV60 === 'function' ? productArtV60(p) : productArtV55(p)}
      <div class="product-body product-body-v54 product-body-v55 product-body-v62">
        <div class="product-meta product-meta-v62">${esc(p.category || 'Produto')}${p.type ? ' • ' + esc(p.type) : ''}</div>
        <h3 class="product-title-v54 product-title-v62" title="${esc(p.name || '')}">${esc(p.name || '')}</h3>

        <div class="product-footer product-footer-v54 product-footer-v62">
          <strong class="product-price-v62">${fmt(Number(p.price || 0))}</strong>

          <div class="qty-add-v55 qty-add-v62">
            <input class="qty-input-v55 qty-input-v62" type="number" min="1" value="1" data-card-qty="${p.id}" aria-label="Quantidade">
            <button class="btn btn-outline" type="button" data-quick-view="${p.id}">Ver</button>
            <button class="btn btn-primary" type="button" data-add-cart-v55="${p.id}">Adicionar</button>
          </div>
        </div>
      </div>
    </article>
  `).join('');
}

/* Sobrescreve renderizações antigas para manter nome visível */
function renderShopProductsV50(products){ return renderShopProductsV62(products); }
function renderShopProductsV55(products){ return renderShopProductsV62(products); }
function renderShopProductsV60(products){ return renderShopProductsV62(products); }

function forceShopProductsV50(products){
  const clean = Array.isArray(products) ? products : [];
  try{ localStorage.setItem('cec_products', JSON.stringify(clean)); }catch(e){ console.error(e); }
  renderShopProductsV62(clean);
}

function bootVitrineNomeV62(){
  if(document.getElementById('productGrid')){
    setTimeout(() => {
      const products = typeof loadProducts === 'function' ? loadProducts() : [];
      if(Array.isArray(products) && products.length){
        renderShopProductsV62(products);
      }
    }, 250);

    setTimeout(() => {
      const products = typeof loadProducts === 'function' ? loadProducts() : [];
      if(Array.isArray(products) && products.length){
        renderShopProductsV62(products);
      }
    }, 700);
  }
}

if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', bootVitrineNomeV62);
}else{
  bootVitrineNomeV62();
}


/* Versão 64: mantém visual original do card, só folga título e ações */
function renderShopProductsV64(products){
  const grid = document.getElementById('productGrid');
  const count = document.getElementById('productCount');
  const resultCount = document.getElementById('resultCount');
  const catBox = document.getElementById('categoryFilters');
  if(!grid) return;

  let all = Array.isArray(products) ? [...products] : [];
  let list = [...all];

  if(catBox){
    const cats = ['Todos', ...Array.from(new Set(all.map(p => p.category).filter(Boolean)))];
    const current = catBox.querySelector('[data-category].active')?.dataset.category || 'Todos';
    catBox.innerHTML = cats.map(cat => `<button class="${cat === current ? 'active' : ''}" type="button" data-category="${esc(cat)}">${esc(cat)}</button>`).join('');
    catBox.querySelectorAll('[data-category]').forEach(btn => {
      btn.addEventListener('click', () => {
        catBox.querySelectorAll('[data-category]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderShopProductsV64(typeof loadProducts === 'function' ? loadProducts() : all);
      });
    });
  }

  if(typeof productMatchesCurrentFiltersV50 === 'function'){
    list = list.filter(productMatchesCurrentFiltersV50);
  }

  const sort = document.getElementById('sortSelect')?.value || 'featured';
  if(sort === 'price-asc') list.sort((a,b) => Number(a.price||0) - Number(b.price||0));
  if(sort === 'price-desc') list.sort((a,b) => Number(b.price||0) - Number(a.price||0));
  if(sort === 'name') list.sort((a,b) => String(a.name||'').localeCompare(String(b.name||''), 'pt-BR'));

  if(count) count.textContent = `${list.length} produto(s)`;
  if(resultCount) resultCount.textContent = `${list.length} produto(s)`;

  if(!list.length){
    grid.innerHTML = '<div class="muted-box">Nenhum produto encontrado. Limpe a busca ou selecione outra categoria.</div>';
    return;
  }

  grid.innerHTML = list.map(p => `
    <article class="product-card product-card-v54 product-card-v55 product-card-v60 product-card-v62 product-card-v64">
      ${typeof productArtV60 === 'function' ? productArtV60(p) : productArtV55(p)}
      <div class="product-body product-body-v54 product-body-v55 product-body-v62 product-body-v64">
        <div class="product-meta product-meta-v62 product-meta-v64">${esc(p.category || 'Produto')}${p.type ? ' • ' + esc(p.type) : ''}</div>
        <h3 class="product-title-v54 product-title-v62 product-title-v64" title="${esc(p.name || '')}">${esc(p.name || '')}</h3>
        <strong class="product-price-v62 product-price-v64">${fmt(Number(p.price || 0))}</strong>
        <div class="product-actions-v64">
          <div class="product-actions-row-v64">
            <input class="qty-input-v55 qty-input-v62 qty-input-v64" type="number" min="1" value="1" data-card-qty="${p.id}" aria-label="Quantidade">
            <button class="btn btn-outline btn-view-v64" type="button" data-quick-view="${p.id}">Ver</button>
          </div>
          <button class="btn btn-primary btn-add-v64" type="button" data-add-cart-v55="${p.id}">Adicionar</button>
        </div>
      </div>
    </article>
  `).join('');
}

function renderShopProductsV50(products){ return renderShopProductsV64(products); }
function renderShopProductsV55(products){ return renderShopProductsV64(products); }
function renderShopProductsV60(products){ return renderShopProductsV64(products); }
function renderShopProductsV62(products){ return renderShopProductsV64(products); }

function forceShopProductsV50(products){
  const clean = Array.isArray(products) ? products : [];
  try{ localStorage.setItem('cec_products', JSON.stringify(clean)); }catch(e){ console.error(e); }
  renderShopProductsV64(clean);
}

function bootVitrineV64(){
  if(document.getElementById('productGrid')){
    setTimeout(() => {
      const products = typeof loadProducts === 'function' ? loadProducts() : [];
      if(Array.isArray(products) && products.length) renderShopProductsV64(products);
    }, 250);
    setTimeout(() => {
      const products = typeof loadProducts === 'function' ? loadProducts() : [];
      if(Array.isArray(products) && products.length) renderShopProductsV64(products);
    }, 700);
  }
}
if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bootVitrineV64); else bootVitrineV64();



/* Versão 67: grid original bonito, card compacto e título visível */
function renderShopProductsV67(products){
  const grid = document.getElementById('productGrid');
  const count = document.getElementById('productCount');
  const resultCount = document.getElementById('resultCount');
  const catBox = document.getElementById('categoryFilters');
  if(!grid) return;

  let all = Array.isArray(products) ? [...products] : [];
  let list = [...all];

  if(catBox){
    const cats = ['Todos', ...Array.from(new Set(all.map(p => p.category).filter(Boolean)))];
    const current = catBox.querySelector('[data-category].active')?.dataset.category || 'Todos';
    catBox.innerHTML = cats.map(cat => `<button class="${cat === current ? 'active' : ''}" type="button" data-category="${esc(cat)}">${esc(cat)}</button>`).join('');
    catBox.querySelectorAll('[data-category]').forEach(btn => {
      btn.addEventListener('click', () => {
        catBox.querySelectorAll('[data-category]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderShopProductsV67(typeof loadProducts === 'function' ? loadProducts() : all);
      });
    });
  }

  if(typeof productMatchesCurrentFiltersV50 === 'function'){
    list = list.filter(productMatchesCurrentFiltersV50);
  }

  const sort = document.getElementById('sortSelect')?.value || 'featured';
  if(sort === 'price-asc') list.sort((a,b) => Number(a.price||0) - Number(b.price||0));
  if(sort === 'price-desc') list.sort((a,b) => Number(b.price||0) - Number(a.price||0));
  if(sort === 'name') list.sort((a,b) => String(a.name||'').localeCompare(String(b.name||''), 'pt-BR'));

  if(count) count.textContent = `${list.length} produto(s)`;
  if(resultCount) resultCount.textContent = `${list.length} produto(s)`;

  if(!list.length){
    grid.innerHTML = '<div class="muted-box">Nenhum produto encontrado. Limpe a busca ou selecione outra categoria.</div>';
    return;
  }

  grid.innerHTML = list.map(p => `
    <article class="product-card card-clean-v67">
      <div class="card-image-v67">
        ${typeof productArtV60 === 'function' ? productArtV60(p) : productArtV55(p)}
      </div>

      <div class="card-info-v67">
        <h3 class="card-title-v67" title="${esc(p.name || '')}">
          ${esc(p.name || '')}
        </h3>

        <strong class="card-price-v67">${fmt(Number(p.price || 0))}</strong>

        <div class="card-actions-v67">
          <div class="card-actions-top-v67">
            <input class="card-qty-v67" type="number" min="1" value="1" data-card-qty="${p.id}" aria-label="Quantidade">
            <button class="btn btn-outline" type="button" data-quick-view="${p.id}">Ver</button>
          </div>
          <button class="btn btn-primary card-add-v67" type="button" data-add-cart-v55="${p.id}">Adicionar</button>
        </div>
      </div>
    </article>
  `).join('');
}

/* Sobrescreve renderizações antigas sem mexer no restante */
function renderShopProductsV50(products){ return renderShopProductsV67(products); }
function renderShopProductsV55(products){ return renderShopProductsV67(products); }
function renderShopProductsV60(products){ return renderShopProductsV67(products); }
function renderShopProductsV62(products){ return renderShopProductsV67(products); }
function renderShopProductsV64(products){ return renderShopProductsV67(products); }

function forceShopProductsV50(products){
  const clean = Array.isArray(products) ? products : [];
  try{ localStorage.setItem('cec_products', JSON.stringify(clean)); }catch(e){ console.error(e); }
  renderShopProductsV67(clean);
}

function bootVitrineV67(){
  if(document.getElementById('productGrid')){
    setTimeout(() => {
      const products = typeof loadProducts === 'function' ? loadProducts() : [];
      if(Array.isArray(products) && products.length) renderShopProductsV67(products);
    }, 180);

    setTimeout(() => {
      const products = typeof loadProducts === 'function' ? loadProducts() : [];
      if(Array.isArray(products) && products.length) renderShopProductsV67(products);
    }, 650);
  }
}

if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', bootVitrineV67);
}else{
  bootVitrineV67();
}



/* Versão 69: categorias dinâmicas e filtro funcionando */
let CEC_ACTIVE_CATEGORY_V69 = 'Todos';

function normalizeCatV69(value){
  return String(value || '').trim() || 'Outros';
}

function allCategoriesV69(products){
  const cats = Array.from(new Set(
    (Array.isArray(products) ? products : [])
      .map(p => normalizeCatV69(p.category))
      .filter(Boolean)
  ));
  return ['Todos', ...cats.sort((a,b) => a.localeCompare(b, 'pt-BR'))];
}

function productMatchesFiltersV69(p){
  const search = (document.getElementById('searchInput')?.value || '').trim().toLowerCase();
  const active = CEC_ACTIVE_CATEGORY_V69 || 'Todos';

  const text = [
    p.name, p.category, p.tag, p.desc, p.brand, p.sku, p.color,
    p.yield, p.compatiblePrinters, p.notes, p.type
  ].filter(Boolean).join(' ').toLowerCase();

  const okSearch = !search || text.includes(search);
  const okCat = active === 'Todos' || normalizeCatV69(p.category) === active;

  return okSearch && okCat;
}

function renderCategoryFiltersV69(products){
  const catBox = document.getElementById('categoryFilters');
  if(!catBox) return;

  const cats = allCategoriesV69(products);

  if(!cats.includes(CEC_ACTIVE_CATEGORY_V69)){
    CEC_ACTIVE_CATEGORY_V69 = 'Todos';
  }

  catBox.innerHTML = cats.map(cat => `
    <button class="category-chip-v69 ${cat === CEC_ACTIVE_CATEGORY_V69 ? 'active' : ''}"
      type="button"
      data-category-v69="${esc(cat)}">
      ${esc(cat)}
    </button>
  `).join('');

  catBox.querySelectorAll('[data-category-v69]').forEach(btn => {
    btn.addEventListener('click', () => {
      CEC_ACTIVE_CATEGORY_V69 = btn.dataset.categoryV69 || 'Todos';
      renderShopProductsV69(typeof loadProducts === 'function' ? loadProducts() : products);
    });
  });
}

function renderMenuCategoriesV69(products){
  const menus = document.querySelectorAll('.dropdown-menu');
  if(!menus.length) return;

  const cats = allCategoriesV69(products).filter(c => c !== 'Todos');

  menus.forEach(menu => {
    const lojaLinks = Array.from(menu.querySelectorAll('a[href*="loja"]'));
    if(!lojaLinks.length) return;

    menu.innerHTML = cats.map(cat => {
      const url = `loja.html#categoria=${encodeURIComponent(cat)}`;
      return `<a href="${url}" data-menu-category-v69="${esc(cat)}">${esc(cat)}</a>`;
    }).join('');
  });
}

function readCategoryFromHashV69(){
  if(!location.hash) return;
  const match = location.hash.match(/categoria=([^&]+)/);
  if(match){
    CEC_ACTIVE_CATEGORY_V69 = decodeURIComponent(match[1]);
    history.replaceState(null, '', location.pathname + location.search);
  }
}

function renderShopProductsV69(products){
  const grid = document.getElementById('productGrid');
  const count = document.getElementById('productCount');
  const resultCount = document.getElementById('resultCount');
  if(!grid) return;

  let all = Array.isArray(products) ? [...products] : [];
  let list = [...all];

  renderCategoryFiltersV69(all);
  renderMenuCategoriesV69(all);

  list = list.filter(productMatchesFiltersV69);

  const sort = document.getElementById('sortSelect')?.value || 'featured';
  if(sort === 'price-asc') list.sort((a,b) => Number(a.price||0) - Number(b.price||0));
  if(sort === 'price-desc') list.sort((a,b) => Number(b.price||0) - Number(a.price||0));
  if(sort === 'name') list.sort((a,b) => String(a.name||'').localeCompare(String(b.name||''), 'pt-BR'));

  const textCount = `${list.length} produto(s)`;
  if(count) count.textContent = textCount;
  if(resultCount) resultCount.textContent = textCount;

  if(!list.length){
    grid.innerHTML = `<div class="muted-box">Nenhum produto encontrado em <strong>${esc(CEC_ACTIVE_CATEGORY_V69)}</strong>. Limpe a busca ou selecione outra categoria.</div>`;
    return;
  }

  grid.innerHTML = list.map(p => `
    <article class="product-card card-clean-v67">
      <div class="card-image-v67">
        ${typeof productArtV60 === 'function' ? productArtV60(p) : productArtV55(p)}
      </div>

      <div class="card-info-v67">
        <h3 class="card-title-v67" title="${esc(p.name || '')}">
          ${esc(p.name || '')}
        </h3>

        <strong class="card-price-v67">${fmt(Number(p.price || 0))}</strong>

        <div class="card-actions-v67">
          <div class="card-actions-top-v67">
            <input class="card-qty-v67" type="number" min="1" value="1" data-card-qty="${p.id}" aria-label="Quantidade">
            <button class="btn btn-outline" type="button" data-quick-view="${p.id}">Ver</button>
          </div>
          <button class="btn btn-primary card-add-v67" type="button" data-add-cart-v55="${p.id}">Adicionar</button>
        </div>
      </div>
    </article>
  `).join('');
}

/* Sobrescreve renderizações antigas */
function renderShopProductsV50(products){ return renderShopProductsV69(products); }
function renderShopProductsV55(products){ return renderShopProductsV69(products); }
function renderShopProductsV60(products){ return renderShopProductsV69(products); }
function renderShopProductsV62(products){ return renderShopProductsV69(products); }
function renderShopProductsV64(products){ return renderShopProductsV69(products); }
function renderShopProductsV67(products){ return renderShopProductsV69(products); }

function forceShopProductsV50(products){
  const clean = Array.isArray(products) ? products : [];
  try{ localStorage.setItem('cec_products', JSON.stringify(clean)); }catch(e){ console.error(e); }
  renderShopProductsV69(clean);
}

function bootCategoriesV69(){
  const products = typeof loadProducts === 'function' ? loadProducts() : [];

  if(document.getElementById('productGrid')){
    readCategoryFromHashV69();
    renderShopProductsV69(products);

    const search = document.getElementById('searchInput');
    if(search && !search.dataset.v69Bound){
      search.dataset.v69Bound = '1';
      search.addEventListener('input', () => renderShopProductsV69(typeof loadProducts === 'function' ? loadProducts() : []));
    }

    const sort = document.getElementById('sortSelect');
    if(sort && !sort.dataset.v69Bound){
      sort.dataset.v69Bound = '1';
      sort.addEventListener('change', () => renderShopProductsV69(typeof loadProducts === 'function' ? loadProducts() : []));
    }

    setTimeout(() => renderShopProductsV69(typeof loadProducts === 'function' ? loadProducts() : []), 400);
  }else{
    renderMenuCategoriesV69(products);
  }
}

if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', bootCategoriesV69);
}else{
  bootCategoriesV69();
}



/* Versão 70: menu Loja estável e sem mensagem verde de importação */
function hideShopImportMessageV70(){
  const box = document.getElementById('shopImportStatusV48');
  if(box){
    box.style.display = 'none';
    box.innerHTML = '';
  }
}

/* Não mostra mais mensagem verde quando a loja recebe produtos do Admin */
function importProductsFromTransferV60(){
  if(!document.getElementById('productGrid')) return false;

  const hasFlag = location.hash && location.hash.includes('usarProdutosAdmin=1');
  let raw = '';

  try{
    raw = sessionStorage.getItem('cec_shop_transfer_products_v60') || localStorage.getItem('cec_shop_transfer_products_v60') || '';
  }catch(e){}

  if(!hasFlag && !raw) return false;

  try{
    const products = raw ? JSON.parse(raw) : (typeof loadProducts === 'function' ? loadProducts() : []);
    if(Array.isArray(products) && products.length){
      localStorage.setItem('cec_products', JSON.stringify(products));
      history.replaceState(null, '', location.pathname + location.search);
      hideShopImportMessageV70();

      setTimeout(() => {
        if(typeof renderShopProductsV69 === 'function') renderShopProductsV69(products);
      }, 80);

      return true;
    }
  }catch(err){
    console.error(err);
  }

  hideShopImportMessageV70();
  return false;
}

/* Evita o menu/dropdown ficar sendo reescrito várias vezes e piscando */
function renderMenuCategoriesV69(products){
  const menus = document.querySelectorAll('.dropdown-menu');
  if(!menus.length) return;

  const cats = allCategoriesV69(products).filter(c => c !== 'Todos');
  const signature = cats.join('|');

  menus.forEach(menu => {
    const lojaLinks = Array.from(menu.querySelectorAll('a[href*="loja"], [data-menu-category-v69]'));
    const belongsToShopMenu = lojaLinks.length || menu.closest('.nav-dropdown')?.textContent?.toLowerCase().includes('loja');
    if(!belongsToShopMenu) return;

    if(menu.dataset.v70Cats === signature) return;

    menu.dataset.v70Cats = signature;
    menu.classList.add('menu-ready-v70');

    menu.innerHTML = cats.map(cat => {
      const url = `loja.html#categoria=${encodeURIComponent(cat)}`;
      return `<a href="${url}" data-menu-category-v69="${esc(cat)}">${esc(cat)}</a>`;
    }).join('');
  });
}

/* Categorias do filtro: só reescreve quando realmente mudar */
function renderCategoryFiltersV69(products){
  const catBox = document.getElementById('categoryFilters');
  if(!catBox) return;

  const cats = allCategoriesV69(products);

  if(!cats.includes(CEC_ACTIVE_CATEGORY_V69)){
    CEC_ACTIVE_CATEGORY_V69 = 'Todos';
  }

  const signature = cats.join('|') + '::' + CEC_ACTIVE_CATEGORY_V69;
  if(catBox.dataset.v70Cats === signature) return;
  catBox.dataset.v70Cats = signature;

  catBox.innerHTML = cats.map(cat => `
    <button class="category-chip-v69 ${cat === CEC_ACTIVE_CATEGORY_V69 ? 'active' : ''}"
      type="button"
      data-category-v69="${esc(cat)}">
      ${esc(cat)}
    </button>
  `).join('');

  catBox.querySelectorAll('[data-category-v69]').forEach(btn => {
    btn.addEventListener('click', () => {
      CEC_ACTIVE_CATEGORY_V69 = btn.dataset.categoryV69 || 'Todos';
      catBox.dataset.v70Cats = '';
      renderShopProductsV69(typeof loadProducts === 'function' ? loadProducts() : products);
    });
  });
}

/* Se algum código antigo mostrar a mensagem, apaga de novo */
function bootMenuEstavelV70(){
  hideShopImportMessageV70();

  const products = typeof loadProducts === 'function' ? loadProducts() : [];
  if(Array.isArray(products) && products.length){
    renderMenuCategoriesV69(products);
  }

  setTimeout(hideShopImportMessageV70, 80);
  setTimeout(hideShopImportMessageV70, 350);
  setTimeout(hideShopImportMessageV70, 900);
}

if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', bootMenuEstavelV70);
}else{
  bootMenuEstavelV70();
}



/* Versão 71: carrinho corrigido */
function loadCartV71(){
  try{
    const cart = JSON.parse(localStorage.getItem('cec_cart') || '[]');
    return Array.isArray(cart) ? cart : [];
  }catch(e){
    return [];
  }
}

function saveCartV71(cart){
  localStorage.setItem('cec_cart', JSON.stringify(Array.isArray(cart) ? cart : []));
}

function openCartV71(){
  const drawer = document.getElementById('cartDrawer');
  if(drawer){
    drawer.classList.add('open');
    document.body.classList.add('lock');
  }
  if(typeof renderCart === 'function'){
    renderCart();
  }else{
    renderCartV71();
  }
}

function closeCartV71(){
  const drawer = document.getElementById('cartDrawer');
  if(drawer){
    drawer.classList.remove('open');
    document.body.classList.remove('lock');
  }
}

function cartProductsV71(){
  const products = typeof loadProducts === 'function' ? loadProducts() : [];
  const cart = loadCartV71();
  return cart.map(item => {
    const product = products.find(p => Number(p.id) === Number(item.id));
    return product ? {...product, qty:Number(item.qty || 1)} : null;
  }).filter(Boolean);
}

function updateCartCountV71(){
  const total = loadCartV71().reduce((sum,item) => sum + Number(item.qty || 0), 0);
  document.querySelectorAll('#cartCount, [data-cart-count], .cart-count').forEach(el => {
    el.textContent = String(total);
  });

  document.querySelectorAll('[data-open-cart], #openCartBtn, #cartButton, .cart-button').forEach(btn => {
    const text = btn.textContent || '';
    if(text.includes('Ver carrinho')){
      btn.innerHTML = `Ver carrinho ( <span id="cartCount">${total}</span> )`;
    }
  });
}

function renderCartV71(){
  const items = cartProductsV71();
  const body = document.getElementById('cartItems') || document.getElementById('cartBody') || document.querySelector('[data-cart-items]');
  const totalEl = document.getElementById('cartTotal') || document.querySelector('[data-cart-total]');

  if(!body) return;

  if(!items.length){
    body.innerHTML = '<div class="muted-box">Carrinho vazio.</div>';
    if(totalEl) totalEl.textContent = fmt(0);
    updateCartCountV71();
    return;
  }

  body.innerHTML = items.map(item => `
    <div class="cart-line-v71">
      <div>
        <strong>${esc(item.name || '')}</strong>
        <small>${fmt(Number(item.price || 0))} cada</small>
      </div>
      <div class="cart-line-actions-v71">
        <button class="btn btn-outline" type="button" data-cart-minus-v71="${item.id}">-</button>
        <input type="number" min="1" value="${Number(item.qty || 1)}" data-cart-qty-v71="${item.id}">
        <button class="btn btn-outline" type="button" data-cart-plus-v71="${item.id}">+</button>
        <button class="btn btn-danger" type="button" data-cart-remove-v71="${item.id}">Remover</button>
      </div>
      <strong>${fmt(Number(item.price || 0) * Number(item.qty || 1))}</strong>
    </div>
  `).join('');

  const total = items.reduce((sum,item) => sum + Number(item.price || 0) * Number(item.qty || 1), 0);
  if(totalEl) totalEl.textContent = fmt(total);

  updateCartCountV71();
}

function addToCartQtyV71(productId, qty=1){
  const id = Number(productId);
  const quantity = Math.max(1, Number(qty || 1));

  const products = typeof loadProducts === 'function' ? loadProducts() : [];
  const product = products.find(p => Number(p.id) === id);

  if(!product){
    if(typeof toast === 'function') toast('Produto não encontrado');
    return;
  }

  const cart = loadCartV71();
  const found = cart.find(item => Number(item.id) === id);
  if(found){
    found.qty = Number(found.qty || 0) + quantity;
  }else{
    cart.push({id, qty:quantity});
  }

  saveCartV71(cart);
  updateCartCountV71();
  renderCartV71();

  if(typeof toast === 'function'){
    toast(quantity > 1 ? `${quantity} unidades adicionadas ao carrinho` : 'Produto adicionado ao carrinho');
  }
}

function changeCartQtyV71(productId, qty){
  const id = Number(productId);
  let cart = loadCartV71();
  const item = cart.find(i => Number(i.id) === id);
  if(item){
    item.qty = Math.max(1, Number(qty || 1));
  }
  saveCartV71(cart);
  renderCartV71();
}

function removeCartItemV71(productId){
  const id = Number(productId);
  const cart = loadCartV71().filter(item => Number(item.id) !== id);
  saveCartV71(cart);
  renderCartV71();
}

function setupCartV71(){
  updateCartCountV71();
  renderCartV71();

  document.addEventListener('click', function(e){
    const open = e.target.closest('[data-open-cart], #openCartBtn, #cartButton, .cart-button, .open-cart, a[href="#cart"]');
    if(open){
      e.preventDefault();
      openCartV71();
      return;
    }

    const close = e.target.closest('[data-close-cart], #closeCartBtn, .close-cart');
    if(close){
      e.preventDefault();
      closeCartV71();
      return;
    }

    const add = e.target.closest('[data-add-cart-v55], [data-add-cart], [data-add]');
    if(add){
      e.preventDefault();
      const id = Number(add.dataset.addCartV55 || add.dataset.addCart || add.dataset.add);
      const qty = Number(document.querySelector(`[data-card-qty="${id}"]`)?.value || 1);
      addToCartQtyV71(id, qty);
      return;
    }

    const addModal = e.target.closest('[data-add-modal-v55], [data-add-modal]');
    if(addModal){
      e.preventDefault();
      const id = Number(addModal.dataset.addModalV55 || addModal.dataset.addModal);
      const qty = Number(document.getElementById('modalQtyV55')?.value || 1);
      addToCartQtyV71(id, qty);

      const modal = addModal.closest('.modal');
      if(modal){
        modal.classList.remove('open');
        document.body.classList.remove('lock');
      }
      openCartV71();
      return;
    }

    const minus = e.target.closest('[data-cart-minus-v71]');
    if(minus){
      e.preventDefault();
      const id = Number(minus.dataset.cartMinusV71);
      const item = loadCartV71().find(i => Number(i.id) === id);
      changeCartQtyV71(id, Math.max(1, Number(item?.qty || 1) - 1));
      return;
    }

    const plus = e.target.closest('[data-cart-plus-v71]');
    if(plus){
      e.preventDefault();
      const id = Number(plus.dataset.cartPlusV71);
      const item = loadCartV71().find(i => Number(i.id) === id);
      changeCartQtyV71(id, Number(item?.qty || 1) + 1);
      return;
    }

    const remove = e.target.closest('[data-cart-remove-v71]');
    if(remove){
      e.preventDefault();
      removeCartItemV71(remove.dataset.cartRemoveV71);
      return;
    }
  }, true);

  document.addEventListener('change', function(e){
    const qty = e.target.closest('[data-cart-qty-v71]');
    if(qty){
      changeCartQtyV71(qty.dataset.cartQtyV71, qty.value);
    }
  }, true);
}

/* Compatibilidade com funções antigas */
function loadCart(){ return loadCartV71(); }
function saveCart(cart){ return saveCartV71(cart); }
function updateCartCount(){ return updateCartCountV71(); }
function renderCart(){ return renderCartV71(); }
function addToCart(id){ return addToCartQtyV71(id, 1); }

if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', setupCartV71);
}else{
  setupCartV71();
}



/* Versão 72: categorias da Loja sem quebrar a vitrine */
let CEC_ACTIVE_CATEGORY_V72 = 'Todos';

function normalizeCategoryV72(value){
  return String(value || '').trim() || 'Outros';
}

function getActiveCategoryFromHashV72(){
  const hash = String(location.hash || '');
  const match = hash.match(/categoria=([^&]+)/);
  if(match){
    return decodeURIComponent(match[1]);
  }
  return CEC_ACTIVE_CATEGORY_V72 || 'Todos';
}

function getCategoriesV72(products){
  const cats = Array.from(new Set(
    (Array.isArray(products) ? products : [])
      .map(p => normalizeCategoryV72(p.category))
      .filter(Boolean)
  )).sort((a,b) => a.localeCompare(b, 'pt-BR'));

  return ['Todos', ...cats];
}

function renderCategoryFiltersV72(products){
  const box = document.getElementById('categoryFilters');
  if(!box) return;

  const cats = getCategoriesV72(products);
  if(!cats.includes(CEC_ACTIVE_CATEGORY_V72)){
    CEC_ACTIVE_CATEGORY_V72 = 'Todos';
  }

  const signature = cats.join('|') + '::' + CEC_ACTIVE_CATEGORY_V72;
  if(box.dataset.v72Signature === signature) return;
  box.dataset.v72Signature = signature;

  box.innerHTML = cats.map(cat => `
    <button class="category-chip-v72 ${cat === CEC_ACTIVE_CATEGORY_V72 ? 'active' : ''}"
      type="button"
      data-category-v72="${esc(cat)}">
      ${esc(cat)}
    </button>
  `).join('');
}

function renderMenuCategoriesV72(products){
  const cats = getCategoriesV72(products).filter(c => c !== 'Todos');
  const signature = cats.join('|');

  document.querySelectorAll('.dropdown-menu').forEach(menu => {
    const parentText = String(menu.closest('.nav-dropdown')?.textContent || '').toLowerCase();
    const looksShop = parentText.includes('loja') || Array.from(menu.querySelectorAll('a')).some(a => String(a.href || '').includes('loja'));
    if(!looksShop) return;
    if(menu.dataset.v72Signature === signature) return;

    menu.dataset.v72Signature = signature;
    menu.innerHTML = cats.map(cat => `
      <a href="loja.html#categoria=${encodeURIComponent(cat)}" data-menu-category-v72="${esc(cat)}">${esc(cat)}</a>
    `).join('');
  });
}

function productMatchesFiltersV72(p){
  const search = (document.getElementById('searchInput')?.value || '').trim().toLowerCase();
  const active = CEC_ACTIVE_CATEGORY_V72 || 'Todos';

  const text = [
    p.name, p.category, p.tag, p.desc, p.brand, p.sku, p.color,
    p.yield, p.compatiblePrinters, p.notes, p.type
  ].filter(Boolean).join(' ').toLowerCase();

  const okSearch = !search || text.includes(search);
  const okCat = active === 'Todos' || normalizeCategoryV72(p.category) === active;

  return okSearch && okCat;
}

function renderShopProductsV72(products){
  const grid = document.getElementById('productGrid');
  const count = document.getElementById('productCount');
  const resultCount = document.getElementById('resultCount');
  if(!grid) return;

  let all = Array.isArray(products) ? [...products] : [];
  let list = [...all];

  renderMenuCategoriesV72(all);
  renderCategoryFiltersV72(all);

  list = list.filter(productMatchesFiltersV72);

  const sort = document.getElementById('sortSelect')?.value || 'featured';
  if(sort === 'price-asc') list.sort((a,b) => Number(a.price||0) - Number(b.price||0));
  if(sort === 'price-desc') list.sort((a,b) => Number(b.price||0) - Number(a.price||0));
  if(sort === 'name') list.sort((a,b) => String(a.name||'').localeCompare(String(b.name||''), 'pt-BR'));

  const label = `${list.length} produto(s)`;
  if(count) count.textContent = label;
  if(resultCount) resultCount.textContent = label;

  if(!list.length){
    grid.innerHTML = `<div class="muted-box">Nenhum produto encontrado em <strong>${esc(CEC_ACTIVE_CATEGORY_V72)}</strong>. Limpe a busca ou escolha outra categoria.</div>`;
    return;
  }

  grid.innerHTML = list.map(p => `
    <article class="product-card card-clean-v67">
      <div class="card-image-v67">
        ${typeof productArtV60 === 'function' ? productArtV60(p) : productArtV55(p)}
      </div>

      <div class="card-info-v67">
        <h3 class="card-title-v67" title="${esc(p.name || '')}">
          ${esc(p.name || '')}
        </h3>

        <strong class="card-price-v67">${fmt(Number(p.price || 0))}</strong>

        <div class="card-actions-v67">
          <div class="card-actions-top-v67">
            <input class="card-qty-v67" type="number" min="1" value="1" data-card-qty="${p.id}" aria-label="Quantidade">
            <button class="btn btn-outline" type="button" data-quick-view="${p.id}">Ver</button>
          </div>
          <button class="btn btn-primary card-add-v67" type="button" data-add-cart-v55="${p.id}">Adicionar</button>
        </div>
      </div>
    </article>
  `).join('');
}

function applyCategoryV72(category, updateHash=false){
  CEC_ACTIVE_CATEGORY_V72 = category || 'Todos';

  const products = typeof loadProducts === 'function' ? loadProducts() : [];

  if(updateHash){
    if(CEC_ACTIVE_CATEGORY_V72 === 'Todos'){
      history.replaceState(null, '', location.pathname + location.search);
    }else{
      history.replaceState(null, '', location.pathname + location.search + '#categoria=' + encodeURIComponent(CEC_ACTIVE_CATEGORY_V72));
    }
  }

  const catBox = document.getElementById('categoryFilters');
  if(catBox) catBox.dataset.v72Signature = '';

  renderShopProductsV72(products);
}

/* Sobrescreve todas as renderizações antigas da Loja, para a categoria não trocar o modelo do card */
function renderShopProductsV50(products){ return renderShopProductsV72(products); }
function renderShopProductsV55(products){ return renderShopProductsV72(products); }
function renderShopProductsV60(products){ return renderShopProductsV72(products); }
function renderShopProductsV62(products){ return renderShopProductsV72(products); }
function renderShopProductsV64(products){ return renderShopProductsV72(products); }
function renderShopProductsV67(products){ return renderShopProductsV72(products); }
function renderShopProductsV69(products){ return renderShopProductsV72(products); }

function forceShopProductsV50(products){
  const clean = Array.isArray(products) ? products : [];
  try{ localStorage.setItem('cec_products', JSON.stringify(clean)); }catch(e){ console.error(e); }
  renderShopProductsV72(clean);
}

function bootCategoriesStableV72(){
  const products = typeof loadProducts === 'function' ? loadProducts() : [];

  CEC_ACTIVE_CATEGORY_V72 = getActiveCategoryFromHashV72();

  renderMenuCategoriesV72(products);

  if(document.getElementById('productGrid')){
    renderShopProductsV72(products);

    const search = document.getElementById('searchInput');
    if(search && !search.dataset.v72Bound){
      search.dataset.v72Bound = '1';
      search.addEventListener('input', () => renderShopProductsV72(typeof loadProducts === 'function' ? loadProducts() : []));
    }

    const sort = document.getElementById('sortSelect');
    if(sort && !sort.dataset.v72Bound){
      sort.dataset.v72Bound = '1';
      sort.addEventListener('change', () => renderShopProductsV72(typeof loadProducts === 'function' ? loadProducts() : []));
    }

    const catBox = document.getElementById('categoryFilters');
    if(catBox && !catBox.dataset.v72ClickBound){
      catBox.dataset.v72ClickBound = '1';
      catBox.addEventListener('click', e => {
        const btn = e.target.closest('[data-category-v72]');
        if(!btn) return;
        e.preventDefault();
        applyCategoryV72(btn.dataset.categoryV72 || 'Todos', true);
      });
    }
  }
}

/* Clique em categoria no menu, estando dentro da loja, não recarrega nem quebra o card */
document.addEventListener('click', function(e){
  const menuCat = e.target.closest('[data-menu-category-v72]');
  if(!menuCat) return;

  const isLojaPage = !!document.getElementById('productGrid');
  if(isLojaPage){
    e.preventDefault();
    applyCategoryV72(menuCat.dataset.menuCategoryV72 || 'Todos', true);
  }
}, true);

window.addEventListener('hashchange', () => {
  if(document.getElementById('productGrid')){
    CEC_ACTIVE_CATEGORY_V72 = getActiveCategoryFromHashV72();
    renderShopProductsV72(typeof loadProducts === 'function' ? loadProducts() : []);
  }
});

if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', bootCategoriesStableV72);
}else{
  bootCategoriesStableV72();
}



/* Versão 73: Todos usa o mesmo card estável das categorias */
let CEC_ACTIVE_CATEGORY_V73 = 'Todos';

function normalizeCategoryV73(value){
  return String(value || '').trim() || 'Outros';
}

function getCategoriesV73(products){
  const cats = Array.from(new Set(
    (Array.isArray(products) ? products : [])
      .map(p => normalizeCategoryV73(p.category))
      .filter(Boolean)
  )).sort((a,b) => a.localeCompare(b, 'pt-BR'));

  return ['Todos', ...cats];
}

function currentCategoryV73(){
  const hash = String(location.hash || '');
  const match = hash.match(/categoria=([^&]+)/);
  if(match) return decodeURIComponent(match[1]);
  return CEC_ACTIVE_CATEGORY_V73 || 'Todos';
}

function renderCategoryFiltersV73(products){
  const box = document.getElementById('categoryFilters');
  if(!box) return;

  const cats = getCategoriesV73(products);
  if(!cats.includes(CEC_ACTIVE_CATEGORY_V73)) CEC_ACTIVE_CATEGORY_V73 = 'Todos';

  box.innerHTML = cats.map(cat => `
    <button class="category-chip-v72 category-chip-v73 ${cat === CEC_ACTIVE_CATEGORY_V73 ? 'active' : ''}"
      type="button"
      data-category-v73="${esc(cat)}">
      ${esc(cat)}
    </button>
  `).join('');
}

function renderMenuCategoriesV73(products){
  const cats = getCategoriesV73(products).filter(c => c !== 'Todos');

  document.querySelectorAll('.dropdown-menu').forEach(menu => {
    const parentText = String(menu.closest('.nav-dropdown')?.textContent || '').toLowerCase();
    const isShop = parentText.includes('loja') || Array.from(menu.querySelectorAll('a')).some(a => String(a.href || '').includes('loja'));
    if(!isShop) return;

    const signature = cats.join('|');
    if(menu.dataset.v73Signature === signature) return;
    menu.dataset.v73Signature = signature;

    menu.innerHTML = cats.map(cat => `
      <a href="loja.html#categoria=${encodeURIComponent(cat)}" data-menu-category-v73="${esc(cat)}">${esc(cat)}</a>
    `).join('');
  });
}

function productMatchesV73(p){
  const search = (document.getElementById('searchInput')?.value || '').trim().toLowerCase();
  const active = CEC_ACTIVE_CATEGORY_V73 || 'Todos';

  const text = [
    p.name, p.category, p.tag, p.desc, p.brand, p.sku, p.color,
    p.yield, p.compatiblePrinters, p.notes, p.type
  ].filter(Boolean).join(' ').toLowerCase();

  const okSearch = !search || text.includes(search);
  const okCat = active === 'Todos' || normalizeCategoryV73(p.category) === active;

  return okSearch && okCat;
}

function renderShopProductsV73(products){
  const grid = document.getElementById('productGrid');
  const count = document.getElementById('productCount');
  const resultCount = document.getElementById('resultCount');
  if(!grid) return;

  const all = Array.isArray(products) ? [...products] : [];

  renderMenuCategoriesV73(all);
  renderCategoryFiltersV73(all);

  let list = all.filter(productMatchesV73);

  const sort = document.getElementById('sortSelect')?.value || 'featured';
  if(sort === 'price-asc') list.sort((a,b) => Number(a.price||0) - Number(b.price||0));
  if(sort === 'price-desc') list.sort((a,b) => Number(b.price||0) - Number(a.price||0));
  if(sort === 'name') list.sort((a,b) => String(a.name||'').localeCompare(String(b.name||''), 'pt-BR'));

  const label = `${list.length} produto(s)`;
  if(count) count.textContent = label;
  if(resultCount) resultCount.textContent = label;

  if(!list.length){
    grid.innerHTML = `<div class="muted-box">Nenhum produto encontrado em <strong>${esc(CEC_ACTIVE_CATEGORY_V73)}</strong>. Limpe a busca ou escolha outra categoria.</div>`;
    return;
  }

  grid.innerHTML = list.map(p => `
    <article class="product-card card-clean-v67 card-clean-v73">
      <div class="card-image-v67 card-image-v73">
        ${typeof productArtV60 === 'function' ? productArtV60(p) : productArtV55(p)}
      </div>

      <div class="card-info-v67 card-info-v73">
        <h3 class="card-title-v67 card-title-v73" title="${esc(p.name || '')}">
          ${esc(p.name || '')}
        </h3>

        <strong class="card-price-v67 card-price-v73">${fmt(Number(p.price || 0))}</strong>

        <div class="card-actions-v67 card-actions-v73">
          <div class="card-actions-top-v67 card-actions-top-v73">
            <input class="card-qty-v67 card-qty-v73" type="number" min="1" value="1" data-card-qty="${p.id}" aria-label="Quantidade">
            <button class="btn btn-outline" type="button" data-quick-view="${p.id}">Ver</button>
          </div>
          <button class="btn btn-primary card-add-v67 card-add-v73" type="button" data-add-cart-v55="${p.id}">Adicionar</button>
        </div>
      </div>
    </article>
  `).join('');
}

function applyCategoryV73(category, updateHash=false){
  CEC_ACTIVE_CATEGORY_V73 = category || 'Todos';

  if(updateHash){
    if(CEC_ACTIVE_CATEGORY_V73 === 'Todos'){
      history.replaceState(null, '', location.pathname + location.search);
    }else{
      history.replaceState(null, '', location.pathname + location.search + '#categoria=' + encodeURIComponent(CEC_ACTIVE_CATEGORY_V73));
    }
  }

  renderShopProductsV73(typeof loadProducts === 'function' ? loadProducts() : []);
}

/* Força qualquer chamada antiga a usar este card único */
function renderShopProductsV50(products){ return renderShopProductsV73(products); }
function renderShopProductsV55(products){ return renderShopProductsV73(products); }
function renderShopProductsV60(products){ return renderShopProductsV73(products); }
function renderShopProductsV62(products){ return renderShopProductsV73(products); }
function renderShopProductsV64(products){ return renderShopProductsV73(products); }
function renderShopProductsV67(products){ return renderShopProductsV73(products); }
function renderShopProductsV69(products){ return renderShopProductsV73(products); }
function renderShopProductsV72(products){ return renderShopProductsV73(products); }

function forceShopProductsV50(products){
  const clean = Array.isArray(products) ? products : [];
  try{ localStorage.setItem('cec_products', JSON.stringify(clean)); }catch(e){ console.error(e); }
  renderShopProductsV73(clean);
}

function bootVitrineV73(){
  const products = typeof loadProducts === 'function' ? loadProducts() : [];
  CEC_ACTIVE_CATEGORY_V73 = currentCategoryV73();

  renderMenuCategoriesV73(products);

  if(document.getElementById('productGrid')){
    renderShopProductsV73(products);

    const catBox = document.getElementById('categoryFilters');
    if(catBox && !catBox.dataset.v73Bound){
      catBox.dataset.v73Bound = '1';
      catBox.addEventListener('click', e => {
        const btn = e.target.closest('[data-category-v73]');
        if(!btn) return;
        e.preventDefault();
        applyCategoryV73(btn.dataset.categoryV73 || 'Todos', true);
      });
    }

    const search = document.getElementById('searchInput');
    if(search && !search.dataset.v73Bound){
      search.dataset.v73Bound = '1';
      search.addEventListener('input', () => renderShopProductsV73(typeof loadProducts === 'function' ? loadProducts() : []));
    }

    const sort = document.getElementById('sortSelect');
    if(sort && !sort.dataset.v73Bound){
      sort.dataset.v73Bound = '1';
      sort.addEventListener('change', () => renderShopProductsV73(typeof loadProducts === 'function' ? loadProducts() : []));
    }

    setTimeout(() => renderShopProductsV73(typeof loadProducts === 'function' ? loadProducts() : []), 350);
  }
}

document.addEventListener('click', function(e){
  const menuCat = e.target.closest('[data-menu-category-v73], [data-menu-category-v72], [data-menu-category-v69]');
  if(!menuCat) return;

  const category = menuCat.dataset.menuCategoryV73 || menuCat.dataset.menuCategoryV72 || menuCat.dataset.menuCategoryV69;
  const isLojaPage = !!document.getElementById('productGrid');

  if(isLojaPage){
    e.preventDefault();
    applyCategoryV73(category || 'Todos', true);
  }
}, true);

if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', bootVitrineV73);
}else{
  bootVitrineV73();
}

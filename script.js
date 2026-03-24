// ══════════════════════════
// DATA
// ══════════════════════════
const products = [
  {id:1,category:'sleep',tag:'Bestseller',name:'Cloud 9 Foam Mattress',desc:'High-density orthopedic foam with breathable air channels for restful sleep.',price:8499,oldPrice:11999,icon:'mattress-foam',swatches:['#F0E8D8','#D4C5B0','#8C6E5A','#4A3828'],sizes:['Single','Double','Queen','King']},
  {id:2,category:'sleep',name:'Pure Cotton Mattress',desc:'Traditional hand-tufted cotton mattress, naturally breathable and eco-friendly.',price:6299,oldPrice:8500,icon:'mattress-cotton',swatches:['#E8DCC8','#D4C4A8','#C0AA88'],sizes:['Single','Double','Queen','King']},
  {id:3,category:'sleep',tag:'New',name:'Luxury Silk Pillows',desc:'Set of 2 — premium microfiber fill with silky-smooth cotton covers.',price:1299,oldPrice:1800,icon:'pillow',swatches:['#FDFAF5','#E8DCC8','#B5614A','#5C3D2E'],sizes:['Standard','King']},
  {id:4,category:'sleep',name:'Egyptian Bedsheet Set',desc:'400 thread count pure cotton — fitted sheet, flat sheet & 2 pillowcases.',price:2999,oldPrice:4200,icon:'bedsheet',swatches:['#C8D4C4','#E8DCC8','#D4C4A8','#A8B89C'],sizes:['Single','Double','King']},
  {id:5,category:'sofa',tag:'Custom',name:'Artisan Sofa Making',desc:'Handcrafted to order — choose your size, foam density, leg finish & fabric.',price:28000,oldPrice:38000,icon:'sofa',swatches:['#C4A882','#5C3D2E','#7A8C6E','#4A6580'],sizes:['1 Seater','2 Seater','3 Seater']},
  {id:6,category:'sofa',name:'Premium Sofa Cloth',desc:'Durable woven fabric in 40+ colours — sold by metre, ideal for re-upholstery.',price:380,oldPrice:550,icon:'sofa-cloth',swatches:['#B5A090','#C4A882','#7A8C6E','#4A6580'],sizes:['Per Metre']},
  {id:7,category:'decor',tag:'Sale',name:'Velvet Blackout Curtain',desc:'100% room-darkening velvet with thermal lining. Pair of 2 panels.',price:3200,oldPrice:4800,icon:'curtain',swatches:['#6E5A50','#8C7A6E','#4A6580','#5C3D2E'],sizes:['7ft','8ft','9ft','Custom']},
  {id:8,category:'decor',name:'Linen Curtain Cloth',desc:'Breathable natural linen fabric — sold by metre. Multiple textures available.',price:280,oldPrice:420,icon:'curtain-cloth',swatches:['#C8B89C','#D8C8A8','#B0A080','#8A7060'],sizes:['Per Metre']}
];

const faqs = [
  {q:'How long does a custom sofa order take?',a:'Custom sofas are crafted within 10–14 working days. Rush orders (7 days) are available for a small surcharge. We keep you updated at every stage via WhatsApp.'},
  {q:'Do you deliver outside Surat?',a:'Yes! We deliver across South Gujarat including Navsari, Bharuch, Valsad, Anand, and Vadodara. Delivery charges may apply for locations beyond 50 km from Surat.'},
  {q:'What is your return/exchange policy?',a:'We offer a 7-day hassle-free return on all standard products. Custom-made items (sofas, cut fabric) are non-returnable unless there is a manufacturing defect, which is covered under warranty.'},
  {q:'Can I see fabric swatches before ordering?',a:'Absolutely! Book a free Home Visit and our expert brings 100+ fabric swatches. You can also visit our showroom in Surat to see and feel fabrics in person.'},
  {q:'What foam quality do you use in mattresses?',a:'We use ISI-certified high-resilience foam (HR-40 and above) in all our mattresses. Our premium range uses memory foam and latex layers for orthopaedic support.'},
  {q:'Do you offer EMI options?',a:'Yes — we offer 0% EMI for 6 months on orders above ₹10,000 via HDFC, ICICI, Axis Bank, and Bajaj Finserv. No-cost EMI is available at checkout.'},
  {q:'Is the 5-year warranty valid for all products?',a:'The 5-year structural warranty applies to all sofas and custom furniture. Mattresses carry a 5-year comfort warranty. Fabric products (bedsheets, curtains) carry a 1-year warranty against manufacturing defects.'},
];

const testimonials = [
  {stars:5,text:'The foam mattress transformed my sleep completely. Delivery was prompt and the team was incredibly professional.',name:'Priya Sharma',city:'Surat, Gujarat',initial:'P'},
  {stars:5,text:'Got a custom sofa made for my living room. The craftsmanship is remarkable — exactly as I envisioned.',name:'Rajesh Mehta',city:'Surat, Gujarat',initial:'R'},
  {stars:5,text:'The home visit was so helpful! They brought fabric samples and measured everything perfectly. Love my new curtains.',name:'Anita Patel',city:'Navsari, Gujarat',initial:'A'},
];

// ══════════════════════════
// CART STATE
// ══════════════════════════
let cart = [];
function fmt(n){return '₹'+n.toLocaleString('en-IN')}

function openCart(){
  document.getElementById('cartOverlay').classList.add('open');
  document.getElementById('cartDrawer').classList.add('open');
  renderCart();
}
function closeCart(){
  document.getElementById('cartOverlay').classList.remove('open');
  document.getElementById('cartDrawer').classList.remove('open');
}
function renderCart(){
  const el = document.getElementById('cartItems');
  const footer = document.getElementById('cartFooter');
  if(cart.length===0){
    el.innerHTML=`<div class="cart-empty"><div class="cart-empty-icon">🛒</div><p>Your cart is empty.<br>Add some beautiful furnishings!</p></div>`;
    footer.style.display='none';return;
  }
  footer.style.display='block';
  el.innerHTML=cart.map((item,i)=>`
    <div class="cart-item">
      <div class="cart-item-img">${getSmallSVG(item.icon,item.swatch)}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${fmt(item.price*item.qty)}</div>
        <div class="cart-item-controls">
          <button class="qty-btn" onclick="changeQty(${i},-1)">−</button>
          <span class="qty-val">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${i},1)">+</button>
          <button class="cart-item-del" onclick="removeItem(${i})">Remove</button>
        </div>
      </div>
    </div>`).join('');
  const total = cart.reduce((s,i)=>s+i.price*i.qty,0);
  document.getElementById('cartTotal').textContent=fmt(total);
  updateCartCount();
}
function changeQty(i,d){
  cart[i].qty+=d;
  if(cart[i].qty<1)cart.splice(i,1);
  renderCart();updateCartCount();
}
function removeItem(i){cart.splice(i,1);renderCart();updateCartCount();}
function updateCartCount(){
  const total=cart.reduce((s,i)=>s+i.qty,0);
  const el=document.getElementById('cartCount');
  el.textContent=total;
  el.classList.toggle('show',total>0);
}
function addToCart(id,e){
  const p=products.find(x=>x.id===id);
  const btn=e.target.closest('.add-cart');
  const existing=cart.find(x=>x.id===id);
  if(existing){existing.qty++;}
  else{cart.push({...p,qty:1,swatch:p.swatches[0]});}
  btn.style.background='#5C3D2E';
  btn.querySelector('span').textContent='✓ Added';
  setTimeout(()=>{btn.style.background='';btn.querySelector('span').textContent='Add to Cart';},1500);
  updateCartCount();
  showToast('🛒',''+p.name+' added to cart!');
}
function checkout(){
  showToast('🎉','Order placed! We\'ll call you within 2 hours.');
  setTimeout(()=>{cart=[];renderCart();closeCart();},400);
}

// ══════════════════════════
// QUICK VIEW MODAL
// ══════════════════════════
let activeModal=null;
function openModal(id){
  const p=products.find(x=>x.id===id);
  activeModal=p;
  const imgUrl = getPhotoUrl(p.icon, 800, 700);
  const imgLabel = (photoMap[p.icon]||photoMap['mattress-foam']).label;
  document.getElementById('modalImg').innerHTML=`
    <button class="modal-close" onclick="closeModalBtn()">✕</button>
    <img src="${imgUrl}" alt="${imgLabel}" style="width:100%;height:100%;object-fit:cover;display:block;" loading="eager"/>`;
  document.getElementById('modalContent').innerHTML=`
    <div class="modal-category">${p.category==='sleep'?'Sleep Collection':p.category==='sofa'?'Sofa & Upholstery':'Home Décor'}</div>
    <div class="modal-name">${p.name}</div>
    <div class="modal-price">${fmt(p.price)}<span>${fmt(p.oldPrice)}</span></div>
    <div class="modal-desc">${p.desc} Made with premium materials and crafted for lasting comfort.</div>
    ${p.swatches?`<span class="modal-label">Colour</span><div class="modal-swatches">${p.swatches.map((c,i)=>`<div class="modal-swatch${i===0?' active':''}" style="background:${c}" onclick="selectModalSwatch(this)"></div>`).join('')}</div>`:''}
    ${p.sizes?`<span class="modal-label" style="margin-top:0.5rem">Size</span><div class="modal-sizes">${p.sizes.map((s,i)=>`<button class="size-btn${i===0?' active':''}" onclick="selectSize(this)">${s}</button>`).join('')}</div>`:''}
    <div class="modal-actions">
      <button class="btn-primary" onclick="addToCartModal(${p.id})">Add to Cart</button>
      <button class="btn-outline" onclick="closeModalBtn()">Close</button>
    </div>`;
  document.getElementById('modalOverlay').classList.add('open');
}
function closeModal(e){if(e.target===document.getElementById('modalOverlay'))closeModalBtn();}
function closeModalBtn(){document.getElementById('modalOverlay').classList.remove('open');}
function selectModalSwatch(el){el.parentElement.querySelectorAll('.modal-swatch').forEach(s=>s.classList.remove('active'));el.classList.add('active');}
function selectSize(el){el.parentElement.querySelectorAll('.size-btn').forEach(b=>b.classList.remove('active'));el.classList.add('active');}
function addToCartModal(id){
  const p=products.find(x=>x.id===id);
  const existing=cart.find(x=>x.id===id);
  if(existing){existing.qty++;}else{cart.push({...p,qty:1,swatch:p.swatches[0]});}
  updateCartCount();showToast('🛒',p.name+' added!');closeModalBtn();
}

// ══════════════════════════
// SVG HELPERS
// ══════════════════════════
// Precise product-matched Unsplash photo IDs
const photoMap = {
  'mattress-foam':   { url:'https://images.unsplash.com/photo-1631049307264-da0ec9d70304', label:'Foam Mattress' },
  'mattress-cotton': { url:'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85', label:'Cotton Mattress' },
  'pillow':          { url:'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2', label:'Luxury Pillows' },
  'bedsheet':        { url:'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af', label:'Bedsheet Set' },
  'sofa':            { url:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc', label:'Artisan Sofa' },
  'sofa-cloth':      { url:'https://images.unsplash.com/photo-1558769132-cb1aea458c5e', label:'Sofa Cloth' },
  'curtain':         { url:'https://images.unsplash.com/photo-1586023492125-27b2c045efd7', label:'Velvet Curtain' },
  'curtain-cloth':   { url:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64', label:'Curtain Cloth' },
};

function getPhotoUrl(icon, w=600, h=400){
  const base = (photoMap[icon]||photoMap['mattress-foam']).url;
  return `${base}?w=${w}&h=${h}&fit=crop&q=85&auto=format`;
}

function getFullSVG(icon){
  const url = getPhotoUrl(icon, 600, 420);
  const label = (photoMap[icon]||photoMap['mattress-foam']).label;
  return `<img src="${url}" alt="${label}" style="width:100%;height:100%;object-fit:cover;display:block;transition:transform 0.5s ease;" loading="lazy"/>`;
}

function getSmallSVG(icon, swatch='#C4A882'){
  const url = getPhotoUrl(icon, 140, 140);
  const label = (photoMap[icon]||photoMap['mattress-foam']).label;
  return `<img src="${url}" alt="${label}" style="width:70px;height:70px;object-fit:cover;border-radius:3px;display:block;" loading="lazy"/>`;
}

function getSVG(icon){ return getFullSVG(icon); }

// ══════════════════════════
// PRODUCTS RENDER
// ══════════════════════════
function renderProducts(filter='all'){
  const grid=document.getElementById('productsGrid');
  const filtered=filter==='all'?products:products.filter(p=>p.category===filter);
  grid.innerHTML='';
  filtered.forEach((p,i)=>{
    const card=document.createElement('div');
    card.className='product-card';
    card.style.transitionDelay=`${i*0.07}s`;
    const swatchHtml=p.swatches?`<div class="swatch-row">${p.swatches.map((c,j)=>`<div class="swatch${j===0?' active':''}" style="background:${c}" onclick="selectSwatch(this,event)"></div>`).join('')}</div>`:'';
    card.innerHTML=`
      <div class="product-img">
        ${p.tag?`<div class="product-badge">${p.tag}</div>`:''}
        <div class="product-actions">
          <button class="p-action-btn" onclick="toggleWish(this,event)" aria-label="Wishlist">♡</button>
          <button class="p-action-btn" onclick="openModal(${p.id})" aria-label="Quick view">👁</button>
        </div>
        <div class="product-photo-wrap">${getFullSVG(p.icon)}</div>
      </div>
      ${swatchHtml}
      <div class="product-info">
        <div class="product-category">${p.category==='sleep'?'Sleep Collection':p.category==='sofa'?'Sofa & Upholstery':'Home Décor'}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-desc">${p.desc}</div>
        <div class="product-footer">
          <div class="product-price">${fmt(p.price)}<span>${fmt(p.oldPrice)}</span></div>
          <button class="add-cart" onclick="addToCart(${p.id},event)"><span>Add to Cart</span></button>
        </div>
      </div>`;
    grid.appendChild(card);
    setTimeout(()=>card.classList.add('visible'),50+i*70);
  });
}

function selectSwatch(el,e){e.stopPropagation();el.closest('.swatch-row').querySelectorAll('.swatch').forEach(s=>s.classList.remove('active'));el.classList.add('active');}
function toggleWish(btn,e){e.stopPropagation();btn.classList.toggle('active');btn.textContent=btn.classList.contains('active')?'♥':'♡';showToast(btn.classList.contains('active')?'❤️':'💔',btn.classList.contains('active')?'Added to wishlist!':'Removed from wishlist');}

// ══════════════════════════
// SOFA CONFIGURATOR
// ══════════════════════════
const cfgState={seater:{val:'1-seater',price:12000,label:'1 Seater'},arm:{val:'rounded',price:0,label:'Rounded'},foam:{val:'standard',price:0,label:'Standard'},leg:{val:'walnut',price:0,label:'Walnut Wood'},fabric:{color:'#C4A882',price:0,label:'Camel'}};

function setupConfigGroup(id,stateKey){
  document.getElementById(id).querySelectorAll('.cfg-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.getElementById(id).querySelectorAll('.cfg-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      cfgState[stateKey]={val:btn.dataset.val,price:parseInt(btn.dataset.price),label:btn.textContent.trim()};
      updateConfigurator();
    });
  });
}
function setupFabricSwatches(){
  document.getElementById('cfgFabric').querySelectorAll('.cfg-swatch').forEach(sw=>{
    sw.addEventListener('click',()=>{
      document.getElementById('cfgFabric').querySelectorAll('.cfg-swatch').forEach(s=>s.classList.remove('active'));
      sw.classList.add('active');
      cfgState.fabric={color:sw.style.background,price:parseInt(sw.dataset.price),label:sw.dataset.name};
      updateConfigurator();
    });
  });
}
function updateConfigurator(){
  const total=Object.values(cfgState).reduce((s,v)=>s+(v.price||0),0);
  document.getElementById('cs-size').textContent=cfgState.seater.label;
  document.getElementById('cs-arm').textContent=cfgState.arm.label;
  document.getElementById('cs-foam').textContent=cfgState.foam.label;
  document.getElementById('cs-leg').textContent=cfgState.leg.label;
  document.getElementById('cs-fabric').textContent=cfgState.fabric.label;
  document.getElementById('cs-total').textContent=fmt(total);
  document.getElementById('cfgPriceBtn').textContent=fmt(total);
  // Update sofa SVG colors
  const fc=cfgState.fabric.color;
  document.getElementById('sp-body').style.fill=fc;
  document.getElementById('sp-back').style.fill=adjustColor(fc,-20);
  document.getElementById('sp-arm-l').style.fill=adjustColor(fc,-20);
  document.getElementById('sp-arm-r').style.fill=adjustColor(fc,-20);
  // Leg color
  const legColors={walnut:'#8B6914',steel:'#A8B0B8',black:'#2A2A2A',gold:'#C8A850'};
  const lc=legColors[cfgState.leg.val]||'#8B6914';
  document.getElementById('sp-leg-l').style.fill=lc;
  document.getElementById('sp-leg-r').style.fill=lc;
  // Arm style
  const noArm=cfgState.arm.val==='no-arm';
  document.getElementById('sp-arm-l').style.opacity=noArm?'0':'1';
  document.getElementById('sp-arm-r').style.opacity=noArm?'0':'1';
}
function adjustColor(hex,amt){try{let r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);r=Math.min(255,Math.max(0,r+amt));g=Math.min(255,Math.max(0,g+amt));b=Math.min(255,Math.max(0,b+amt));return `rgb(${r},${g},${b})`;}catch(e){return hex;}}
function orderSofa(){
  const total=Object.values(cfgState).reduce((s,v)=>s+(v.price||0),0);
  showToast('🛋️',`Custom sofa order placed! Total: ${fmt(total)}`);
  document.getElementById('visit').scrollIntoView({behavior:'smooth'});
}

// ══════════════════════════
// FAQ
// ══════════════════════════
function renderFAQ(){
  const list=document.getElementById('faqList');
  list.innerHTML=faqs.map((f,i)=>`
    <div class="faq-item" id="faq${i}">
      <button class="faq-q" onclick="toggleFAQ(${i})">${f.q}<div class="faq-arrow">+</div></button>
      <div class="faq-a"><div class="faq-a-inner">${f.a}</div></div>
    </div>`).join('');
}
function toggleFAQ(i){
  const item=document.getElementById('faq'+i);
  const wasOpen=item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(el=>el.classList.remove('open'));
  if(!wasOpen)item.classList.add('open');
}

// ══════════════════════════
// TESTIMONIALS
// ══════════════════════════
function renderTestimonials(){
  const grid=document.getElementById('testimonialsGrid');
  testimonials.forEach((t,i)=>{
    const card=document.createElement('div');
    card.className='testimonial-card';
    card.style.transitionDelay=`${i*0.15}s`;
    card.innerHTML=`
      <div class="testimonial-stars">${'★'.repeat(t.stars)}</div>
      <div class="testimonial-text">"${t.text}"</div>
      <div class="testimonial-author">
        <div class="author-avatar">${t.initial}</div>
        <div><div class="author-name">${t.name}</div><div class="author-city">${t.city}</div></div>
      </div>`;
    grid.appendChild(card);
  });
}

// ══════════════════════════
// MARQUEE
// ══════════════════════════
const marqueeItems=['Foam Mattress','Cotton Mattress','Silk Pillows','Bedsheets','Sofa Making','Sofa Cloth','Curtains','Curtain Cloth','Custom Orders','Free Delivery'];
const track=document.getElementById('marqueeTrack');
[...marqueeItems,...marqueeItems].forEach(item=>{
  const el=document.createElement('div');el.className='marquee-item';
  el.innerHTML=`<span class="marquee-dot"></span>${item}`;track.appendChild(el);
});

// ══════════════════════════
// FORMS
// ══════════════════════════
function submitVisit(){
  const name=document.getElementById('vName').value.trim();
  const phone=document.getElementById('vPhone').value.trim();
  const date=document.getElementById('vDate').value;
  const time=document.getElementById('vTime').value;
  if(!name||!phone||!date||!time){showToast('⚠️','Please fill all required fields.');return;}
  showToast('🏠','Home visit booked! We\'ll confirm within 2 hours.');
  ['vName','vPhone','vDate','vArea','vNotes'].forEach(id=>document.getElementById(id).value='');
  document.getElementById('vTime').value='';
  document.getElementById('vProduct').value='';
}
function submitForm(){
  const val=document.getElementById('phoneInput').value.trim();
  if(!val){document.getElementById('phoneInput').focus();return;}
  showToast('📞','Thank you! We\'ll call you shortly.');
  document.getElementById('phoneInput').value='';
}

// ══════════════════════════
// TOAST
// ══════════════════════════
let toastT;
function showToast(icon,msg){
  document.getElementById('toastIcon').textContent=icon;
  document.getElementById('toastMsg').textContent=msg;
  document.getElementById('toast').classList.add('show');
  clearTimeout(toastT);
  toastT=setTimeout(()=>document.getElementById('toast').classList.remove('show'),2800);
}

// ══════════════════════════
// DARK MODE
// ══════════════════════════
const themeToggle=document.getElementById('themeToggle');
const themeThumb=document.getElementById('themeThumb');
themeToggle.addEventListener('click',()=>{
  const isDark=document.documentElement.dataset.theme==='dark';
  document.documentElement.dataset.theme=isDark?'light':'dark';
  themeThumb.textContent=isDark?'☀️':'🌙';
});

// ══════════════════════════
// NAV / BURGER
// ══════════════════════════
window.addEventListener('scroll',()=>document.getElementById('navbar').classList.toggle('scrolled',scrollY>30));
const burger=document.getElementById('burger');
const mobileMenu=document.getElementById('mobileMenu');
burger.addEventListener('click',()=>{burger.classList.toggle('active');mobileMenu.classList.toggle('open');});
function closeMobile(){burger.classList.remove('active');mobileMenu.classList.remove('open');}

// ══════════════════════════
// FILTER TABS
// ══════════════════════════
document.querySelectorAll('.filter-tab').forEach(tab=>{
  tab.addEventListener('click',()=>{
    document.querySelectorAll('.filter-tab').forEach(t=>t.classList.remove('active'));
    tab.classList.add('active');renderProducts(tab.dataset.filter);
  });
});

// ══════════════════════════
// INTERSECTION OBSERVER
// ══════════════════════════
const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');});
},{threshold:0.1});
function observeAll(){
  document.querySelectorAll('.testimonial-card,.reveal').forEach(el=>observer.observe(el));
}

// ══════════════════════════
// NAV offset for fixed banner
// ══════════════════════════
function setNavTop(){
  const banner=document.getElementById('festiveBanner');
  if(banner&&banner.style.display!=='none'){
    document.getElementById('navbar').style.top=banner.offsetHeight+'px';
    document.querySelector('.mobile-menu').style.top=(68+banner.offsetHeight)+'px';
  } else {
    document.getElementById('navbar').style.top='0';
  }
}
setNavTop();
document.getElementById('festiveBanner').querySelector('.festive-close').addEventListener('click',()=>setTimeout(setNavTop,50));

// ══════════════════════════
// INIT
// ══════════════════════════
renderProducts();
renderFAQ();
renderTestimonials();
setupConfigGroup('cfgSeater','seater');
setupConfigGroup('cfgArm','arm');
setupConfigGroup('cfgFoam','foam');
setupConfigGroup('cfgLeg','leg');
setupFabricSwatches();
observeAll();


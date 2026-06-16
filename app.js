/* =================================================================
   APP.JS — cursor · i18n · reveal · modal · tilt
================================================================= */
(function(){
'use strict';

/* ---------- CUSTOM CURSOR (clave de sol) ---------- */
const clef  = document.getElementById('cur-clef');
const label = document.getElementById('cur-label');
let mx=window.innerWidth/2, my=window.innerHeight/2, cxp=mx, cyp=my;
const fine = window.matchMedia('(pointer:fine)').matches;

if(fine){
  window.addEventListener('mousemove', e=>{ mx=e.clientX; my=e.clientY; });
  (function loop(){
    cxp += (mx-cxp)*0.22; cyp += (my-cyp)*0.22;
    clef.style.left = cxp+'px'; clef.style.top = cyp+'px';
    requestAnimationFrame(loop);
  })();
  window.addEventListener('mousedown', ()=>document.body.classList.add('cur-press'));
  window.addEventListener('mouseup', ()=>document.body.classList.remove('cur-press'));

  function bindHover(){
    document.querySelectorAll('[data-cursor]').forEach(el=>{
      if(el.__cb) return; el.__cb=true;
      el.addEventListener('mouseenter', ()=>{
        document.body.classList.add('cur-hover');
        label.textContent = el.getAttribute('data-cursor') || '';
      });
      el.addEventListener('mouseleave', ()=>document.body.classList.remove('cur-hover'));
    });
  }
  bindHover();
  window.__bindHover = bindHover;
} else {
  document.body.setAttribute('data-cursor-on','0');
}

/* ---------- LANGUAGE TOGGLE ---------- */
const I18N = {
  en:{
    'eb-1':'About me',
    'eb-2':'Tech sheet',
    'eb-3':'Projects',
    'eb-4':'Testimonials',
    'eb-5':'Contact',
    'fh-edu':'Education','fh-sw':'Software','fh-exp':'Experience','fh-int':'Interests',
    'sub-edu':'where I learned','sub-sw':'daily','sub-exp':'my journey',
    'kicker':'María Constanza Masi Pino · Designer',
    'hero-sub':'open a folder or scroll',
    's1-title':'ABOUT M<span class="o">E</span>',
    's1-tail':'Graphic &amp; digital designer<br>Mendoza, Argentina',
    's1-p1':'<strong>Hi! I\u2019m María Constanza Masi Pino</strong>, a graphic and digital designer in training, based in Mendoza, Argentina. My work lives at the intersection of visual creativity, digital content and strategic design, driven by a mix of real agency experience, personal projects and a constant pursuit of growth.',
    's1-p2':'I worked remotely for digital marketing agencies like <strong>La Ofitcina</strong> and <strong>Viralclip.io</strong>, and independently for clients across very different industries: real estate, athletes, coaches and more. Agencies taught me to work at pace and meet deadlines without sacrificing quality; freelancing taught me to listen to the client and translate their vision into concrete pieces. Together they gave me something no classroom can replace: the ability to adapt, solve and create under real pressure. I also bring AI tools into my creative process to optimize time and expand possibilities.',
    's1-p3':'I\u2019m currently studying a <strong>Bachelor\u2019s in Graphic &amp; Digital Design</strong> at Universidad Champagnat, adding theory to what I built in practice over three years. When I\u2019m not designing, I explore visual trends, travel to discover new expressions of creativity, sing old songs on stage and watch the musicals I love.',
    's1-p4':'My portfolio balances creative experimentation with brand-driven design. I move comfortably between branding and visual identity, digital content and motion, adapting each piece to its format, channel and the essence of every project. I also bring AI tools into my creative process to optimize time and expand possibilities.',
    's1-p5':'I\u2019m currently studying a <strong>Bachelor\u2019s in Graphic &amp; Digital Design</strong> at Universidad Champagnat, adding theory to what I built in practice over three years. When I\u2019m not designing, I explore visual trends, travel to discover new expressions of creativity, sing old songs on stage and watch the musicals I love.',
    's2-title':'TECH SH<span class="o">E</span>ET',
    's2-tail':'Education · software<br>interests · experience',
    's2-edu-sub':'— where I learned','s2-edu-1-t':'Economics, Admin &amp; HR','s2-edu-1-p':'Colegio Las Candelas',
    's2-edu-2-t':'BA Graphic &amp; Digital Design','s2-edu-2-p':'Universidad Champagnat',
    's2-sw-sub':'— daily','s2-sw-pop':'✦ I\u2019m always learning new tools. I adapt easily to any software :)',
    's2-int-sub':'— hover ✦',
    'int-1':'Packaging','int-2':'Interactive design','int-3':'Musicals','int-4':'Music','int-5':'US pop culture','int-6':'Crafts','int-7':'Books','int-8':'Guitar &amp; singing','int-9':'Dance','int-10':'Editorial design','int-11':'Branding','int-12':'English B2','int-13':'UX/UI Design',
    's2-exp-sub':'— my journey',
    'exp-loc-remote':'remote · worldwide','exp-loc-andorra':'Andorra · remote','exp-loc-andorra2':'Andorra · remote','exp-loc-miami':'USA · remote',
    'exp-1-p':'I serve clients from Argentina, the US, Spain, Australia, South Africa and other countries. I design social content, branding and visual identity, and documents tailored to each client\u2019s brand. With 45+ completed projects, I learned to listen to what each client needs and translate it into designs that don\u2019t just look good, but communicate and connect.',
    'exp-2-p':'A digital marketing agency specialized in fitness-world creators. It\u2019s where I truly trained as a designer in a demanding professional setting. I managed up to 10 simultaneous projects, built visual identities from scratch and designed social content with monthly planning. I learned to work with real deadlines, organize with Notion and Slack, and understand that in a 20-person team everyone\u2019s work impacts the rest.',
    'exp-3-p':'An ads agency from Andorra. It placed me in a pioneering role: I was the team\u2019s first graphic designer. I drove aesthetic alignments for ad design based on the brand identity of AI companies, going viral with ads and boosting their clients\u2019 subscriptions.',
    'exp-4-p':'I work side by side with the marketing department designing promotional pieces for their activities, flyers and supporting graphic resources for every occasion.',
    'playlist-note':'if my creative process were a playlist, it\u2019d sound like this…','playlist-title':'Creative Flow ★','playlist-sub':'▶ coming soon · spotify embed',
    's3-title':'PR<span class="o">O</span>JECTS','s3-tail':'Click a card<br>to open the case ↗',
    'proj-1-meta':'2024–2025 · ANDORRA · ADS AGENCY','proj-1-desc':'First graphic designer on the team. I drove aesthetic alignments and went viral with ads for AI companies.',
    'proj-2-meta':'2024–2025 · ANDORRA · DIGITAL MKT','proj-2-desc':'Social content and branding. Up to 10 simultaneous projects for fitness creators.',
    'proj-3-meta':'2026 — PRESENT · USA · LEGAL','proj-3-desc':'Promotional pieces, flyers and graphic resources for the marketing department.',
    'proj-4-meta':'2024 · SPAIN · FITNESS','proj-4-desc':'Brand identity and content for a dietitian and her Empodérate Comiendo program. Carousels, reels and presentations that surpassed 1M views.',
    's4-title':'TESTIM<span class="o">O</span>NIALS','s4-tail':'What people say<br>about working with me',
    't-1':'Constanza is a beast at social media design. She got our content to go viral with super attractive, well-executed pieces.','t-1-who':'La Ofitcina',
    't-2':'She solves with creativity and efficiency. Her pieces have their own identity and the attention to detail shows in every delivery.','t-2-name':'Viralclip Team',
    't-3':'Coming soon — real testimonials from my clients will go here.','t-3-name':'Your testimonial','t-soon':'coming soon ✦',
    't-4':'Coming soon — real testimonials from my clients will go here.','t-4-name':'Your testimonial','t-soon2':'coming soon ✦',
    's5-title':'LET\u2019S T<span class="o">A</span>LK','s5-tail':'Available<br>for projects',
    's5-intro':'Got a project? Want to work with me? Or just say hi? I\u2019m available here:',
    'm-overview':'Overview','m-deliv':'Deliverables','m-hint':'static grid · replace with your screenshots',
    'footer':'portfolio 2026 · chacras de coria · argentina',
    'hero-portfolio':'Portfolio','hero-name':'María Constanza Masi Pino',
    'notif-t':'Portfolio 2026 · available','notif-s':'Tap here to see my work →',
    'contact-btn':'Contact me',
    'shot-1':'image 1 — replace','shot-2':'image 2 — replace','shot-3':'image 3 — replace','shot-4':'image 4 — replace','shot-5':'image 5 — replace','shot-6':'image 6 — replace',
    'loc-us':'United States','loc-au':'Australia','loc-be':'Belgium',
    't1':'Maria’s work on our templates was nothing short of amazing. She brings a level of creativity and professionalism that’s truly top-tier. Her designs are not only visually stunning but also perfectly tailored to our brand’s identity and needs. We’re thrilled with the results and highly recommend her for anyone seeking exceptional design work.',
    't2':'Amazing! We love working with this designer. The company that printed our designs commented on how awesome they were! We look forward to working with you next time. Thanks so much!',
    't3':'Maria over-delivered with the work I wanted. She understood what I wanted and returned it in a project that not only aligned with my brand but also was creative and entertaining to the eye. I will definitely recommend her and will work with her again.',
    't4':'It’s great how Maria works, from communication with the client to the very final work! The reactivity and quality of work is top. I absolutely recommend! Thank you so much.',
    't5':'She did an amazing job very quickly! Order is exactly as expected and I loved the fonts and formats she chose for my Instagram templates. She understood my description perfectly. Would be happy to work with her again for future orders!',
    't6':'Great work as always. Hits the point every time and I look forward to working with you again!',
    't7':'Always amazing to do business with Maria. Highly recommend.',
    'foot-copy':'© 2026 María Constanza Masi Pino — All rights reserved',
    'foot-back':'↑ back to top',
    'notif-s':'Tap here to see my work ↓',
    'book-note':'This month’s read','book-title':'How to Use Graphic Design','book-author':'by Michael Bierut',
    'logos-label':'— brands &amp; clients who trusted me —',
    'foot-tag':'Let’s design something that connects<br>with the people you want to reach.',
    'proj-5-t':'AcademIA Fixer','proj-5-meta':'2025 · ANDORRA · AI','proj-5-desc':'Visual identity for the first Spanish-speaking academy in AI process optimization and automation. A futuristic style built to stand out from international competitors.',
    'proj-6-t':'Project 06','proj-6-meta':'COMING SOON','proj-6-desc':'Send me the title, description and photos of this project and I’ll complete it.',
    'proj-7-t':'Project 07','proj-7-meta':'COMING SOON','proj-7-desc':'Send me the title, description and photos of this project and I’ll complete it.',
    'proj-8-t':'Project 08','proj-8-meta':'COMING SOON','proj-8-desc':'Send me the title, description and photos of this project and I’ll complete it.',
    'proj-silvia-meta':'2025 · ANDORRA · MARKETING','proj-silvia-desc':'Reel covers, posts and carousels for Silvia, CEO of La Ofitcina. A clean yet eye-catching feed to win clients — and my first approach to using AI to generate clones of the client.',
    'proj-teresa-meta':'2024–2025 · SPAIN · PSYCHOLOGY','proj-teresa-desc':'AI-generated animated avatars for the psychologist and author of <strong>Mente Umami</strong>. Characters that illustrate situations and make her carousels more engaging.',
    'proj-alex-meta':'2024–2025 · SPAIN · FITNESS','proj-alex-desc':'Reel covers and carousels for the personal trainer. His content jumped from 1K to 100K+ views, with pieces reaching 144K.',
    'proj-david-meta':'2024–2025 · SPAIN · NUTRITION','proj-david-desc':'Rebranding and full graphics for the integrative women\u2019s nutritionist and his Rompe Los Moldes program, with 100+ success stories. Static posts, carousels and reel covers.'
  }
};
// snapshot Spanish defaults from DOM
const ES = {};
document.querySelectorAll('[data-i18n]').forEach(el=>{ ES[el.getAttribute('data-i18n')] = el.innerHTML; });
let lang='es';
function setLang(l){
  lang=l;
  const dict = l==='en' ? I18N.en : ES;
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const k=el.getAttribute('data-i18n');
    const v = l==='en' ? (I18N.en[k] ?? ES[k]) : ES[k];
    if(v!=null) el.innerHTML=v;
  });
  document.documentElement.lang=l;
  document.querySelectorAll('#lang button').forEach(b=>b.classList.toggle('active', b.dataset.lang===l));
  localStorage.setItem('mc_lang', l);
}
document.getElementById('lang').addEventListener('click', e=>{
  const b=e.target.closest('button'); if(!b) return; setLang(b.dataset.lang);
});
setLang(localStorage.getItem('mc_lang')||'es');

/* ---------- REVEAL + POP-OUT (staggered) ---------- */
const io = new IntersectionObserver((ents)=>{
  ents.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
},{threshold:.12, rootMargin:'0px 0px -8% 0px'});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// pop individual items in, staggered by their position within their group
const POP_SEL = '.edu, .sw, .chip, .exp-row, .testim, .contact, .fblock-int, .fblock-play, .about-card, .playlist';
const popEls = [...document.querySelectorAll(POP_SEL)];
popEls.forEach(el=>el.classList.add('pop'));
const popIO = new IntersectionObserver((ents)=>{
  ents.forEach(en=>{
    if(!en.isIntersecting) return;
    const el = en.target;
    // stagger relative to siblings sharing the same parent that are also popping in now
    const group = [...el.parentElement.querySelectorAll(':scope > .pop')];
    const idx = Math.max(0, group.indexOf(el));
    el.style.setProperty('--pop-d', Math.min(idx*55, 440) + 'ms');
    el.classList.add('in');
    popIO.unobserve(el);
  });
},{threshold:.12, rootMargin:'0px 0px -6% 0px'});
popEls.forEach(el=>popIO.observe(el));

/* ---------- PROJECT MODAL ---------- */
const PROJ = {
  viralclip:{file:'viralclip.html',client:'AGENCIA · ANDORRA',name:'Viralclip.io',
    desc_es:'Me sumé como la primera diseñadora gráfica del equipo. Construí alineamientos estéticos para el diseño de anuncios partiendo de la identidad de marca de empresas desarrolladoras de IA, logrando viralizar ads y aumentar las suscripciones de sus clientes.',
    desc_en:'I joined as the team\u2019s first graphic designer. I built aesthetic alignments for ad design starting from the brand identity of AI companies, going viral with ads and boosting their clients\u2019 subscriptions.',
    deliv_es:['Identidad visual para ads','Diseño de anuncios para redes','Alineamientos estéticos de marca','Contenido viral de performance'],
    deliv_en:['Visual identity for ads','Ad design for social','Brand aesthetic alignments','Viral performance content'],
    gallery:{empresas:[
      {name:'Vocable', images:['assets/projects/viralclip/vocable-1.jpg','assets/projects/viralclip/vocable-2.jpg','assets/projects/viralclip/vocable-3.jpg','assets/projects/viralclip/vocable-4.jpg']},
      {name:'aiApply', images:['assets/projects/viralclip/aiapply-1.jpg','assets/projects/viralclip/aiapply-2.jpg','assets/projects/viralclip/aiapply-3.jpg','assets/projects/viralclip/aiapply-4.jpg','assets/projects/viralclip/aiapply-5.jpg','assets/projects/viralclip/aiapply-6.jpg']},
      {name:'A-Leads', images:['assets/projects/viralclip/aleads-1.jpg','assets/projects/viralclip/aleads-2.jpg','assets/projects/viralclip/aleads-3.jpg']},
      {name:'RealEstateContent.ai', images:['assets/projects/viralclip/realestate-1.jpg','assets/projects/viralclip/realestate-2.jpg','assets/projects/viralclip/realestate-3.jpg']},
      {name:'Revid.ai', images:['assets/projects/viralclip/revid-1.jpg','assets/projects/viralclip/revid-2.jpg','assets/projects/viralclip/revid-3.jpg','assets/projects/viralclip/revid-4.jpg']},
      {name:'Odin', images:['assets/projects/viralclip/odin-1.jpg','assets/projects/viralclip/odin-2.jpg','assets/projects/viralclip/odin-3.jpg']},
      {name:'Outrank', images:['assets/projects/viralclip/outrank-1.jpg','assets/projects/viralclip/outrank-2.jpg']},
      {name:'AnswerThis', images:['assets/projects/viralclip/answerthis-1.jpg','assets/projects/viralclip/answerthis-2.jpg','assets/projects/viralclip/answerthis-3.jpg']}
    ]}},
  silvia:{file:'soy-silvia-ruiz.html',client:'MARKETING · ANDORRA',name:'Soy Silvia Ruiz',
    desc_es:'Diseño de portadas, posts y carruseles para <strong>Silvia</strong>, CEO de <strong>La Ofitcina</strong>. Buscaba un feed limpio pero llamativo para conseguir clientes a través de sus redes, transmitir sus conocimientos de social media y cerrar proyectos con nuevos clientes. Trabajé en conjunto con un editor y la project manager de la agencia. Fue mi <strong>primer approach al uso de la IA</strong> para generar clones, así mi clienta no perdía tiempo en la captura de contenidos.',
    desc_en:'Reel covers, posts and carousels for <strong>Silvia</strong>, CEO of <strong>La Ofitcina</strong>. She wanted a clean yet eye-catching feed to win clients through her social media, share her social-media expertise and close projects with new clients. I worked alongside an editor and the agency\u2019s project manager. It was my <strong>first approach to using AI</strong> to generate clones, so my client wouldn\u2019t lose time shooting content.',
    deliv_es:['Posts','Carruseles','Portadas de reels'],
    deliv_en:['Posts','Carousels','Reel covers'],
    gallery:{
      carruseles:[
        {label_es:'¿Qué hacer después de publicar un Reel?', label_en:'What to do after posting a Reel?', slides:['assets/projects/silvia/c1-1.jpg','assets/projects/silvia/c1-2.jpg','assets/projects/silvia/c1-3.jpg','assets/projects/silvia/c1-v1.mp4','assets/projects/silvia/c1-v2.mp4','assets/projects/silvia/c1-v3.mp4','assets/projects/silvia/c1-4.jpg','assets/projects/silvia/c1-5.jpg']},
        {label_es:'Ópal · Estrategia viral +1M', label_en:'Ópal · Viral strategy +1M', slides:['assets/projects/silvia/c2-1.jpg','assets/projects/silvia/c2-2.jpg','assets/projects/silvia/c2-3.jpg','assets/projects/silvia/c2-4.jpg','assets/projects/silvia/c2-5.jpg','assets/projects/silvia/c2-6.jpg','assets/projects/silvia/c2-7.jpg','assets/projects/silvia/c2-8.jpg','assets/projects/silvia/c2-9.jpg']},
        {label_es:'Novedades de Instagram · Abril 2025', label_en:'Instagram updates · April 2025', slides:['assets/projects/silvia/c3-1.jpg','assets/projects/silvia/c3-2.jpg','assets/projects/silvia/c3-3.jpg','assets/projects/silvia/c3-4.jpg','assets/projects/silvia/c3-5.jpg','assets/projects/silvia/c3-6.jpg','assets/projects/silvia/c3-7.jpg']},
        {label_es:'Salón 66 · Estrategia viral 2,4M', label_en:'Salón 66 · Viral strategy 2.4M', slides:['assets/projects/silvia/c4-1.jpg','assets/projects/silvia/c4-v1.mp4','assets/projects/silvia/c4-2.jpg','assets/projects/silvia/c4-3.jpg','assets/projects/silvia/c4-4.jpg','assets/projects/silvia/c4-5.jpg','assets/projects/silvia/c4-6.jpg','assets/projects/silvia/c4-7.jpg','assets/projects/silvia/c4-8.jpg']}
      ],
      portadas:[
        {thumb:'assets/projects/silvia/portada-reel-1.jpg'},
        {thumb:'assets/projects/silvia/portada-reel-2.jpg'},
        {thumb:'assets/projects/silvia/portada-reel-3.jpg'},
        {thumb:'assets/projects/silvia/portada-reel-4.jpg'}
      ]
    }},
  mariadelluc:{file:'maria-de-lluc.html',client:'FITNESS · ESPAÑA',name:'María de Lluc',
    desc_es:'Manejo y creación de contenido para María de Lluc, dietista y creadora del programa <strong>Empodérate Comiendo</strong>, con el que ya ayudó a más de <strong>1000 mujeres</strong> a mejorar su relación con la comida. Trabajé sus piezas de contenido —posts, stories, carruseles y reels— llegando a superar <strong>1M de visualizaciones</strong>, y también desarrollé su identidad de marca y las presentaciones para sus webinars.',
    desc_en:'Content management and creation for María de Lluc, a dietitian and creator of the <strong>Empodérate Comiendo</strong> program, which has already helped over <strong>1,000 women</strong> improve their relationship with food. I produced her content pieces —posts, stories, carousels and reels— surpassing <strong>1M views</strong>, and also developed her brand identity and the presentations for her webinars.',
    deliv_es:['Logotipo','Posts','Carruseles','Reels','Stories','Presentaciones'],
    deliv_en:['Logo','Posts','Carousels','Reels','Stories','Presentations'],
    gallery:{
      carruseles:[
        {label_es:'Un día conmigo', label_en:'A day with me', slides:['assets/projects/maria-de-lluc/dia-1.jpg','assets/projects/maria-de-lluc/dia-2.jpg','assets/projects/maria-de-lluc/dia-3.jpg','assets/projects/maria-de-lluc/dia-4.jpg','assets/projects/maria-de-lluc/dia-5.jpg','assets/projects/maria-de-lluc/dia-6.jpg','assets/projects/maria-de-lluc/dia-7.jpg','assets/projects/maria-de-lluc/dia-8.jpg','assets/projects/maria-de-lluc/dia-9.jpg']},
        {label_es:'Acciones del programa', label_en:'Program actions', slides:['assets/projects/maria-de-lluc/car2-1.jpg','assets/projects/maria-de-lluc/car2-2.jpg','assets/projects/maria-de-lluc/car2-3.jpg','assets/projects/maria-de-lluc/car2-4.jpg','assets/projects/maria-de-lluc/car2-5.jpg']}
      ],
      presentaciones:[
        {label_es:'Webinar · Clase N°1', label_en:'Webinar · Class 1', slides:['assets/projects/maria-de-lluc/pres1-1.jpg','assets/projects/maria-de-lluc/pres1-2.jpg','assets/projects/maria-de-lluc/pres1-3.jpg','assets/projects/maria-de-lluc/pres1-4.jpg','assets/projects/maria-de-lluc/pres1-5.jpg']},
        {label_es:'Webinar · Clase N°3', label_en:'Webinar · Class 3', slides:['assets/projects/maria-de-lluc/pres2-1.jpg','assets/projects/maria-de-lluc/pres2-2.jpg','assets/projects/maria-de-lluc/pres2-3.jpg','assets/projects/maria-de-lluc/pres2-4.jpg','assets/projects/maria-de-lluc/pres2-5.jpg']}
      ],
      portadas:[
        {thumb:'assets/projects/maria-de-lluc/reel-1.jpg'},
        {thumb:'assets/projects/maria-de-lluc/reel-2.jpg'},
        {thumb:'assets/projects/maria-de-lluc/reel-3.jpg'}
      ],
      reels:[
        {video:'assets/projects/maria-de-lluc/reel-1.mp4'},
        {video:'assets/projects/maria-de-lluc/reel-2.mp4'},
        {video:'assets/projects/maria-de-lluc/reel-3.mp4'}
      ]
    }},
  teresa:{file:'teresa-terol.html',client:'PSICOLOGÍA · ESPAÑA',name:'Teresa Terol',
    desc_es:'Teresa Terol es psicóloga especializada en la relación con la comida y autora del libro <strong>Mente Umami</strong>. Durante mi paso por <strong>La Ofitcina</strong> trabajé su estética en redes y, sobre todo, creé <strong>avatares animados con IA</strong>: personajes que la representan y que ilustran cada situación que cuenta. Así sus carruseles se volvieron más atractivos, claros y fáciles de recordar, manteniendo la coherencia visual de su marca en cada publicación.',
    desc_en:'Teresa Terol is a psychologist specialized in our relationship with food and author of the book <strong>Mente Umami</strong>. During my time at <strong>La Ofitcina</strong> I worked on her social-media aesthetic and, above all, created <strong>AI-generated animated avatars</strong>: characters that represent her and illustrate each situation she shares. Her carousels became more engaging, clearer and easier to remember, keeping her brand visually consistent across every post.',
    deliv_es:['Avatares animados con IA','Carruseles ilustrados','Diseño para redes sociales','Coherencia visual de marca'],
    deliv_en:['AI-generated animated avatars','Illustrated carousels','Social media design','Brand visual consistency'],
    gallery:{
      carruseles:[
        {label_es:'5 señales de que eres una persona mentalmente fuerte', label_en:'5 signs you\u2019re a mentally strong person', slides:['assets/projects/teresa-terol/mente-fuerte-1.jpg','assets/projects/teresa-terol/mente-fuerte-2.jpg','assets/projects/teresa-terol/mente-fuerte-3.jpg','assets/projects/teresa-terol/mente-fuerte-4.jpg','assets/projects/teresa-terol/mente-fuerte-5.jpg','assets/projects/teresa-terol/mente-fuerte-6.jpg','assets/projects/teresa-terol/mente-fuerte-7.jpg']},
        {label_es:'Un atracón no es comer demasiado', label_en:'A binge isn\u2019t just eating too much', slides:['assets/projects/teresa-terol/atracon-1.jpg','assets/projects/teresa-terol/atracon-2.jpg','assets/projects/teresa-terol/atracon-3.jpg','assets/projects/teresa-terol/atracon-4.jpg','assets/projects/teresa-terol/atracon-5.jpg','assets/projects/teresa-terol/atracon-6.jpg']},
        {label_es:'Tu perspectiva cambia lo que sientes', label_en:'Your perspective changes how you feel', slides:['assets/projects/teresa-terol/perspectiva-1.jpg','assets/projects/teresa-terol/perspectiva-2.jpg','assets/projects/teresa-terol/perspectiva-3.jpg','assets/projects/teresa-terol/perspectiva-4.jpg','assets/projects/teresa-terol/perspectiva-5.jpg']},
        {label_es:'7 cosas que debes dejar de hacer según los estoicos', label_en:'7 things to stop doing according to the Stoics', slides:['assets/projects/teresa-terol/estoicos-1.jpg','assets/projects/teresa-terol/estoicos-2.jpg','assets/projects/teresa-terol/estoicos-3.jpg','assets/projects/teresa-terol/estoicos-4.jpg','assets/projects/teresa-terol/estoicos-5.jpg','assets/projects/teresa-terol/estoicos-6.jpg','assets/projects/teresa-terol/estoicos-7.jpg','assets/projects/teresa-terol/estoicos-8.jpg','assets/projects/teresa-terol/estoicos-9.jpg']},
        {label_es:'Ejercicio para aumentar la autoestima', label_en:'An exercise to boost your self-esteem', slides:['assets/projects/teresa-terol/autoestima-1.jpg','assets/projects/teresa-terol/autoestima-2.jpg','assets/projects/teresa-terol/autoestima-3.jpg','assets/projects/teresa-terol/autoestima-4.jpg','assets/projects/teresa-terol/autoestima-5.jpg','assets/projects/teresa-terol/autoestima-6.jpg']}
      ]
    }},
  alex:{file:'alex-celada.html',client:'FITNESS · ESPAÑA',name:'Alex Celada',
    desc_es:'Alex Celada es entrenador personal y coach de nutrición. Cuando empezamos, sus publicaciones rondaban las <strong>1.000 visualizaciones</strong>; trabajando su estética en redes —carruseles y portadas de reels— pasó a superar las <strong>100.000 visualizaciones</strong> de forma recurrente, con piezas que llegaron a <strong>144 mil</strong>.',
    desc_en:'Alex Celada is a personal trainer and nutrition coach. When we started, his posts hovered around <strong>1,000 views</strong>; by reworking his social-media aesthetic —carousels and reel covers— he began consistently passing <strong>100,000 views</strong>, with pieces reaching <strong>144K</strong>.',
    deliv_es:['Portadas de reels','Carruseles de casos de éxito','Sistema visual de ganchos','Coherencia de marca'],
    deliv_en:['Reel covers','Success-case carousels','Visual hook system','Brand consistency'],
    gallery:{
      portadas:[
        {thumb:'assets/projects/alex-celada/azucar.png', label_es:'¿El cuerpo te pide azúcar? Haz esta dieta', label_en:'Is your body craving sugar? Try this diet', views:'144 mil'},
        {thumb:'assets/projects/alex-celada/comopoco.png', label_es:'Como poco y no pierdo peso', label_en:'I eat little and don\u2019t lose weight', views:'80,6 mil'},
        {thumb:'assets/projects/alex-celada/fallado.webp', label_es:'Me he fallado a mí mismo', label_en:'I\u2019ve failed myself', views:'78,4 mil'},
        {thumb:'assets/projects/alex-celada/estatus.png', label_es:'Un físico fuerte es símbolo de estatus', label_en:'A strong physique is a status symbol', views:'41,3 mil'},
        {thumb:'assets/projects/alex-celada/snack.png', label_es:'Snack para la ansiedad por el dulce', label_en:'A snack for sweet cravings', views:'26,4 mil'},
        {thumb:'assets/projects/alex-celada/engorda.png', label_es:'¿Cuál engorda más?', label_en:'Which one is more fattening?', views:'26 mil'},
        {thumb:'assets/projects/alex-celada/entrenar.png', label_es:'Cómo entrenar para perder peso', label_en:'How to train to lose weight', views:'23,1 mil'},
        {thumb:'assets/projects/alex-celada/mesymedio.png', label_es:'-5kg en mes y medio', label_en:'-5kg in a month and a half', views:'18,6 mil'},
        {thumb:'assets/projects/alex-celada/pringles.png', label_es:'Bajar de peso comiendo Pringles y Oreos', label_en:'Losing weight eating Pringles and Oreos', views:'10 mil'},
        {thumb:'assets/projects/alex-celada/rosa.png', label_es:'Carrusel · Caso Rosa: perdió 5kg sin dietas', label_en:'Carousel · Rosa\u2019s case: lost 5kg without dieting'}
      ]
    }},
  academia:{file:'academia-fixer.html',client:'IA · ANDORRA',name:'AcademIA Fixer',
    desc_es:'AcademIA Fixer es la primera academia de habla hispana en capacitar personas para optimizar y automatizar procesos con IA. El reto: aunque eran los primeros en español, ya competían con academias internacionales del mismo rubro, por lo que la elección de color y estilo era esencial para destacarse y diferenciarse. A pedido de sus dueños, la identidad debía demostrar la innovación con la que surgió el proyecto y orientarse a un estilo futurista.',
    desc_en:'AcademIA Fixer is the first Spanish-speaking academy training people to optimize and automate processes with AI. The challenge: even as the first in Spanish, they already competed with international academies in the same field, so color and style were key to standing out and setting them apart. At the owners\u2019 request, the identity had to convey the innovation behind the project and lean into a futuristic style.',
    deliv_es:['Isologotipo','Logotipo','Isotipo','Manual de marca','Patrón'],
    deliv_en:['Isologo','Logotype','Isotype','Brand guidelines','Pattern'],
    images:['assets/projects/academia/academia-01.jpg','assets/projects/academia/academia-08.jpg','assets/projects/academia/academia-10.jpg','assets/projects/academia/academia-13.jpg','assets/projects/academia/academia-15.jpg','assets/projects/academia/academia-10a.jpg','assets/projects/academia/academia-10b.jpg','assets/projects/academia/academia-02.jpg']},
  david:{file:'david-gracia.html',client:'NUTRICIÓN · ESPAÑA',name:'David Gracia',
    desc_es:'David Gracia es nutricionista integral especializado en mujeres y creador del programa <strong>Rompe Los Moldes</strong>, con el que acumula más de <strong>100 casos de éxito</strong> de mujeres que aprendieron a comer y perdieron peso para siempre, sin dietas restrictivas. Para él me encargué de toda su gráfica de principio a fin: arranqué con un <strong>rebranding</strong> completo —nueva identidad, paleta azul y naranja y un sistema de plantillas coherente— y a partir de ahí produje sus <strong>estáticos, carruseles y portadas de reel</strong>. El reto era traducir un método educativo (no una dieta más) en piezas que enganchen: titulares con jerarquía clara, destacados en color para guiar la lectura, casos reales de antes y después que generan prueba social, y llamadas a la acción que invitan a comentar y a entrar al programa. Todo pensado para sostener una línea visual reconocible en cada publicación y convertir seguidoras en clientas.',
    desc_en:'David Gracia is an integrative nutritionist specialized in women and creator of the <strong>Rompe Los Moldes</strong> program, with over <strong>100 success stories</strong> of women who learned to eat and lost weight for good, without restrictive diets. I handled his entire graphics output end to end: I started with a full <strong>rebranding</strong> —new identity, a blue-and-orange palette and a consistent template system— and from there produced his <strong>static posts, carousels and reel covers</strong>. The challenge was translating an educational method (not just another diet) into pieces that hook: headlines with clear hierarchy, color highlights guiding the read, real before-and-after cases that build social proof, and calls to action that invite comments and program sign-ups. All designed to hold a recognizable visual line across every post and turn followers into clients.',
    deliv_es:['Rebranding e identidad','Estáticos','Carruseles','Portadas de reel','Sistema de plantillas'],
    deliv_en:['Rebranding & identity','Static posts','Carousels','Reel covers','Template system'],
    gallery:{
      carruseles:[
        {label_es:'No pierdes peso porque no sabes lo que haces', label_en:'You don\u2019t lose weight because you don\u2019t know what you\u2019re doing', slides:['assets/projects/david-gracia/noidea-1.jpg','assets/projects/david-gracia/noidea-2.jpg','assets/projects/david-gracia/noidea-3.jpg','assets/projects/david-gracia/noidea-4.jpg','assets/projects/david-gracia/noidea-5.jpg','assets/projects/david-gracia/noidea-6.jpg','assets/projects/david-gracia/noidea-7.jpg','assets/projects/david-gracia/noidea-8.jpg']},
        {label_es:'3 motivos por los que debes aprender a comer', label_en:'3 reasons you should learn to eat', slides:['assets/projects/david-gracia/motivos-1.jpg','assets/projects/david-gracia/motivos-2.jpg','assets/projects/david-gracia/motivos-3.jpg','assets/projects/david-gracia/motivos-4.jpg','assets/projects/david-gracia/motivos-5.jpg','assets/projects/david-gracia/motivos-6.jpg','assets/projects/david-gracia/motivos-7.jpg','assets/projects/david-gracia/motivos-8.jpg']},
        {label_es:'Guía para perder peso en septiembre y no recuperarlo en octubre', label_en:'Guide to lose weight in September and not regain it in October', slides:['assets/projects/david-gracia/guia-1.jpg','assets/projects/david-gracia/guia-2.jpg','assets/projects/david-gracia/guia-3.jpg','assets/projects/david-gracia/guia-4.jpg','assets/projects/david-gracia/guia-5.jpg','assets/projects/david-gracia/guia-6.jpg','assets/projects/david-gracia/guia-7.jpg','assets/projects/david-gracia/guia-8.jpg','assets/projects/david-gracia/guia-9.jpg','assets/projects/david-gracia/guia-10.jpg']},
        {label_es:'"Yo como sano y no hay manera de perder": la solución', label_en:'"I eat healthy and there\u2019s no way to lose weight": the solution', slides:['assets/projects/david-gracia/comosano-1.jpg','assets/projects/david-gracia/comosano-2.jpg','assets/projects/david-gracia/comosano-3.jpg','assets/projects/david-gracia/comosano-4.jpg','assets/projects/david-gracia/comosano-5.jpg','assets/projects/david-gracia/comosano-6.jpg','assets/projects/david-gracia/comosano-7.jpg','assets/projects/david-gracia/comosano-8.jpg','assets/projects/david-gracia/comosano-9.jpg','assets/projects/david-gracia/comosano-10.jpg']}
      ],
      estaticos:[
        {thumb:'assets/projects/david-gracia/estatico-1.jpg', label_es:'Clase gratis · Cómo perder peso para siempre', label_en:'Free class · How to lose weight for good'}
      ],
      portadas:[
        {thumb:'assets/projects/david-gracia/reel-1.jpg', label_es:'Las 3 opciones para perder peso y no recuperarlo', label_en:'The 3 options to lose weight and not regain it'},
        {thumb:'assets/projects/david-gracia/reel-2.jpg', label_es:'¿Por qué tú también lo puedes conseguir?', label_en:'Why you can also achieve it'},
        {thumb:'assets/projects/david-gracia/reel-3.jpg', label_es:'Cómo comer para perder peso para siempre', label_en:'How to eat to lose weight for good'}
      ]
    }}
};
const overlay=document.getElementById('overlay');
const shotsEl=document.getElementById('m-shots');
const shotsPlaceholder=shotsEl?shotsEl.innerHTML:'';
const carouselHint=document.querySelector('.carousel-hint');
function mlStack(g, ar){
  const s=g.slides;
  const lbl = lang==='en'? (g.label_en||g.label_es) : g.label_es;
  const word = lang==='en'?'slides':'diapositivas';
  const isVid=x=>/\.mp4(\?|#|$)/i.test(x);
  const imgsOnly=s.filter(x=>!isVid(x));
  const cover=isVid(s[0])?(imgsOnly[0]||s[0]):s[0];
  const peek3 = imgsOnly[2]?'<span class="peek p3" style="--pk:url(\''+imgsOnly[2]+'\')"></span>':'';
  const peek2 = imgsOnly[1]?'<span class="peek p2" style="--pk:url(\''+imgsOnly[1]+'\')"></span>':'';
  return '<div class="ml-item">'
    + '<div class="ml-stack" data-slides=\''+JSON.stringify(s)+'\' data-cursor="ABRIR" style="--ar:'+ar+'">'
    + peek3 + peek2
    + '<div class="cover"><img src="'+cover+'" alt="" loading="lazy"></div>'
    + '<span class="ml-count">▦ '+s.length+'</span>'
    + '</div>'
    + '<div class="ml-lbl">'+lbl+'<span>'+s.length+' '+word+'</span></div>'
    + '</div>';
}
function renderGallery(G){
  let h='<div class="ml-gallery">';
  if(G.carruseles && G.carruseles.length){
    h+='<div class="ml-group"><h4>'+(lang==='en'?'Carousels':'Carruseles')+'</h4><div class="ml-row cols-2">';
    h+=G.carruseles.map(g=>mlStack(g,'4/5')).join('');
    h+='</div></div>';
  }
  if(G.estaticos && G.estaticos.length){
    h+='<div class="ml-group"><h4>'+(lang==='en'?'Static posts':'Estáticos')+'</h4><div class="ml-row cols-2">';
    h+=G.estaticos.map(r=>{
      const lbl = r.label_es ? (lang==='en'?(r.label_en||r.label_es):r.label_es) : '';
      return '<div class="ml-item"><div class="est-shot" data-cursor="AMPLIAR"><img src="'+r.thumb+'" alt="" loading="lazy"></div>'+(lbl?'<div class="ml-lbl">'+lbl+'</div>':'')+'</div>';
    }).join('');
    h+='</div></div>';
  }
  if(G.presentaciones && G.presentaciones.length){
    h+='<div class="ml-group"><h4>'+(lang==='en'?'Presentations':'Presentaciones')+'</h4><div class="ml-row cols-1">';
    h+=G.presentaciones.map(g=>mlStack(g,'16/9')).join('');
    h+='</div></div>';
  }
  if(G.portadas && G.portadas.length){
    h+='<div class="ml-group"><h4>'+(lang==='en'?'Reel covers':'Portadas')+'</h4><div class="ml-row reels">';
    h+=G.portadas.map(r=>{
      const reel='<div class="ml-reel is-portada ml-portada" data-cursor="AMPLIAR"><img src="'+r.thumb+'" alt="" loading="lazy"><span class="ml-kind">'+(lang==='en'?'cover':'portada')+'</span></div>';
      const lbl = r.label_es ? (lang==='en'?(r.label_en||r.label_es):r.label_es) : '';
      if(!lbl && !r.views) return reel;
      return '<div class="ml-item">'+reel+'<div class="ml-lbl">'+lbl+(r.views?'<span>▶ '+r.views+'</span>':'')+'</div></div>';
    }).join('');
    h+='</div></div>';
  }
  if(G.reels && G.reels.length){
    h+='<div class="ml-group"><h4>'+(lang==='en'?'Videos':'Reels')+'</h4><div class="ml-row reels">';
    h+=G.reels.map(r=>'<div class="ml-reel has-video" data-video=\''+r.video+'\' data-cursor="VER"><video src="'+r.video+'#t=0.1" muted playsinline preload="metadata"></video><span class="ml-kind">reel</span><span class="ml-play"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="rgba(0,0,0,.45)"/><path d="M10 8l6 4-6 4z" fill="#fff"/></svg></span></div>').join('');
    h+='</div></div>';
  }
  if(G.empresas && G.empresas.length){
    G.empresas.forEach(emp=>{
      const logo = emp.logo ? '<span class="ml-emp-logo" style="background-image:url(\''+emp.logo+'\')"></span>' : '';
      h+='<div class="ml-group ml-group-emp"><h4>'+logo+emp.name+'</h4><div class="ml-empresa">';
      h+=emp.images.map(s=>'<div class="adshot" data-cursor="AMPLIAR"><img src="'+s+'" alt="" loading="lazy"></div>').join('');
      h+='</div></div>';
    });
  }
  h+='</div>';
  return h;
}
function openProj(key){
  const p=PROJ[key]; if(!p) return;
  document.getElementById('m-file').textContent=p.file;
  document.getElementById('m-client').textContent=p.client;
  document.getElementById('m-name').textContent=p.name;
  document.getElementById('m-desc').innerHTML = lang==='en'?p.desc_en:p.desc_es;
  const list=document.getElementById('m-list'); list.innerHTML='';
  (lang==='en'?p.deliv_en:p.deliv_es).forEach(d=>{ const li=document.createElement('li'); li.innerHTML=d; list.appendChild(li); });
  if(shotsEl){
    if(p.gallery){
      shotsEl.style.display='block';
      shotsEl.innerHTML = renderGallery(p.gallery);
      if(window.__bindHover) window.__bindHover();
      if(carouselHint) carouselHint.style.display='none';
    }else if(p.images && p.images.length){
      shotsEl.style.display='';
      shotsEl.innerHTML = p.images.map(s=>'<div class="shot shot-photo" data-cursor="AMPLIAR"><img src="'+s+'" alt="" loading="lazy"></div>').join('');
      if(window.__bindHover) window.__bindHover();
      if(carouselHint) carouselHint.style.display='none';
    }else{
      shotsEl.style.display='';
      shotsEl.innerHTML = shotsPlaceholder;
      if(carouselHint) carouselHint.style.display='';
    }
  }
  overlay.classList.add('active');
  document.body.style.overflow='hidden';
}
function closeProj(){
  overlay.classList.remove('active'); document.body.style.overflow='';
}
document.addEventListener('click', e=>{
  const card = e.target.closest('[data-project]');
  if(card) openProj(card.getAttribute('data-project'));
});
document.getElementById('m-close').addEventListener('click', closeProj);
overlay.addEventListener('click', e=>{ if(e.target===overlay) closeProj(); });
window.addEventListener('keydown', e=>{ if(e.key==='Escape' && !document.getElementById('lightbox').classList.contains('active') && !document.getElementById('vlb').classList.contains('active')) closeProj(); });

/* ---------- LIGHTBOX · imágenes del proyecto a tamaño completo ---------- */
const lb=document.getElementById('lightbox');
const lbImg=document.getElementById('lb-img');
const lbCount=document.getElementById('lb-count');
const lbStrip=document.getElementById('lb-strip');
let lbList=[], lbIdx=0;
const lbVideo=document.getElementById('lb-video');
function lbIsVid(x){ return /\.mp4(\?|#|$)/i.test(x); }
function openLb(i){
  if(!lbList.length) return;
  lbIdx=(i+lbList.length)%lbList.length;
  const src=lbList[lbIdx];
  if(lbIsVid(src)){
    lbImg.style.display='none'; lbImg.removeAttribute('src');
    if(lbVideo){ lbVideo.style.display=''; lbVideo.src=src; const pp=lbVideo.play(); if(pp&&pp.catch) pp.catch(()=>{}); }
  }else{
    if(lbVideo){ lbVideo.pause(); lbVideo.style.display='none'; lbVideo.removeAttribute('src'); }
    lbImg.style.display=''; lbImg.src=src;
  }
  lb.classList.add('active'); lb.setAttribute('aria-hidden','false');
  const multi=lbList.length>1;
  if(lbCount){ lbCount.style.display=multi?'block':'none'; lbCount.textContent=(lbIdx+1)+' / '+lbList.length; }
  document.querySelectorAll('.lb-nav').forEach(b=>{ b.style.display=multi?'':'none'; });
  if(lbStrip){
    lbStrip.style.display=multi?'flex':'none';
    if(multi){
      if(lbStrip.__first!==lbList[0] || lbStrip.children.length!==lbList.length){
        lbStrip.innerHTML=lbList.map((s,k)=> lbIsVid(s)
          ? '<video src="'+s+'#t=0.1" data-i="'+k+'" muted playsinline preload="metadata"></video>'
          : '<img src="'+s+'" data-i="'+k+'" alt="">').join('');
        lbStrip.__first=lbList[0];
      }
      [...lbStrip.children].forEach((c,k)=>c.classList.toggle('on',k===lbIdx));
      const act=lbStrip.children[lbIdx];
      if(act) lbStrip.scrollLeft=act.offsetLeft-lbStrip.clientWidth/2+act.clientWidth/2;
    }
  }
}
function closeLb(){ lb.classList.remove('active'); lb.setAttribute('aria-hidden','true'); lbImg.removeAttribute('src'); if(lbVideo){ lbVideo.pause(); lbVideo.removeAttribute('src'); lbVideo.style.display='none'; } }

/* ---------- VIDEO LIGHTBOX · reels en reproducción ---------- */
const vlb=document.getElementById('vlb');
const vlbVideo=document.getElementById('vlb-video');
function openVlb(src){
  if(!vlb||!vlbVideo||!src) return;
  vlbVideo.src=src;
  vlb.classList.add('active'); vlb.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
  const p=vlbVideo.play(); if(p&&p.catch) p.catch(()=>{});
}
function closeVlb(){
  if(!vlb||!vlbVideo) return;
  vlbVideo.pause(); vlbVideo.removeAttribute('src'); vlbVideo.load();
  vlb.classList.remove('active'); vlb.setAttribute('aria-hidden','true');
  if(!overlay.classList.contains('active')) document.body.style.overflow='';
}
if(vlb){
  document.getElementById('vlb-x').addEventListener('click', closeVlb);
  vlb.addEventListener('click', e=>{ if(e.target===vlb) closeVlb(); });
  window.addEventListener('keydown', e=>{ if(e.key==='Escape' && vlb.classList.contains('active')){ e.stopPropagation(); closeVlb(); } });
}
if(shotsEl){
  shotsEl.addEventListener('click', e=>{
    const reel=e.target.closest('[data-video]');
    if(reel){ openVlb(reel.getAttribute('data-video')); return; }
    const port=e.target.closest('.ml-portada');
    if(port){
      const imgs=[...shotsEl.querySelectorAll('.ml-portada img')];
      lbList=imgs.map(n=>n.getAttribute('src'));
      openLb(imgs.indexOf(port.querySelector('img')));
      return;
    }
    const est=e.target.closest('.est-shot');
    if(est){
      const imgs=[...shotsEl.querySelectorAll('.est-shot img')];
      lbList=imgs.map(n=>n.getAttribute('src'));
      openLb(imgs.indexOf(est.querySelector('img')));
      return;
    }
    const ad=e.target.closest('.adshot');
    if(ad){
      const imgs=[...shotsEl.querySelectorAll('.adshot img')];
      lbList=imgs.map(n=>n.getAttribute('src'));
      openLb(imgs.indexOf(ad.querySelector('img')));
      return;
    }
    const stack=e.target.closest('[data-slides]');
    if(stack){
      try{ lbList=JSON.parse(stack.getAttribute('data-slides')); }catch(_){ lbList=[]; }
      if(lbList.length) openLb(0);
      return;
    }
    const img=e.target.closest('.shot-photo img'); if(!img) return;
    const imgs=[...shotsEl.querySelectorAll('.shot-photo img')];
    lbList=imgs.map(n=>n.getAttribute('src'));
    openLb(imgs.indexOf(img));
  });
}
document.querySelectorAll('.testim-shots').forEach(g=>{
  g.addEventListener('click', e=>{
    const img=e.target.closest('img'); if(!img) return;
    const imgs=[...g.querySelectorAll('img')];
    lbList=imgs.map(n=>n.getAttribute('src'));
    openLb(imgs.indexOf(img));
  });
});
document.getElementById('lb-x').addEventListener('click', closeLb);
document.getElementById('lb-prev').addEventListener('click', ()=>openLb(lbIdx-1));
document.getElementById('lb-next').addEventListener('click', ()=>openLb(lbIdx+1));
if(lbStrip){ lbStrip.addEventListener('click', e=>{ const t=e.target.closest('[data-i]'); if(t) openLb(+t.getAttribute('data-i')); }); }
lb.addEventListener('click', e=>{ if(e.target===lb) closeLb(); });
window.addEventListener('keydown', e=>{
  if(!lb.classList.contains('active')) return;
  if(e.key==='Escape'){ e.stopPropagation(); closeLb(); }
  if(e.key==='ArrowLeft') openLb(lbIdx-1);
  if(e.key==='ArrowRight') openLb(lbIdx+1);
});

/* ---------- FOLDER TILT (subtle parallax in hero) ---------- */
const hero=document.querySelector('.hero');
if(fine && hero){
  hero.addEventListener('mousemove', e=>{
    const cx=(e.clientX/window.innerWidth-.5);
    const cy=(e.clientY/window.innerHeight-.5);
    document.querySelectorAll('.hero .folder').forEach((f,i)=>{
      const d=(i%3+1)*4;
      f.style.setProperty('--px', (cx*d).toFixed(1)+'px');
      f.style.setProperty('--py', (cy*d).toFixed(1)+'px');
    });
  });
}

/* ---------- HERO FOLDERS · 2 derecha + 2 izquierda, sin quedar cortadas ---------- */
(function(){
  const wrap=document.querySelector('.hero[data-portada="centrada"] .hero-folders');
  if(!wrap) return;
  const folders=[...wrap.querySelectorAll('.folder')];
  // dos slots a la derecha y dos a la izquierda, siempre lejos del corte inferior
  const right=[
    {x:'8%',  top:'17%', rot:-5},
    {x:'14%', top:'54%', rot:5}
  ];
  const left=[
    {x:'7%',  top:'42%', rot:-6},
    {x:'15%', top:'68%', rot:6}
  ];
  const shuffle=a=>{ for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; };
  shuffle(right); shuffle(left);
  // intercalamos para repartir 2 y 2 sin importar el orden de las carpetas
  const slots=[{side:'right',...right[0]},{side:'left',...left[0]},{side:'right',...right[1]},{side:'left',...left[1]}];
  folders.forEach((f,i)=>{
    const s=slots[i%slots.length];
    if(s.side==='left'){ f.style.left=s.x; f.style.right='auto'; }
    else { f.style.right=s.x; f.style.left='auto'; }
    f.style.top=s.top;
    f.style.setProperty('--frot', (s.rot + (Math.random()*4-2)).toFixed(1)+'deg');
  });
})();

/* ---------- PROYECTOS · carrusel en movimiento + arrastrable ----------
   Los proyectos se desplazan en bucle continuo; al posar el cursor se
   frena, y manteniendo el clic se puede arrastrar hasta el proyecto
   que la persona quiera (drag-to-scroll). */
(function(){
  const carousel=document.querySelector('.proj-carousel');
  const track=document.getElementById('proj-track');
  if(!carousel || !track) return;
  const originals=[...track.children];
  if(originals.length>1){
    // duplicamos el set para un loop perfecto
    originals.forEach(card=>{
      const c=card.cloneNode(true);
      c.setAttribute('aria-hidden','true');
      c.removeAttribute('data-comment-anchor');
      c.querySelectorAll('[data-comment-anchor]').forEach(n=>n.removeAttribute('data-comment-anchor'));
      track.appendChild(c);
    });
  }

  let half=0;
  const measure=()=>{ half=track.scrollWidth/2; };
  measure();
  window.addEventListener('resize', measure);
  if(window.ResizeObserver){ new ResizeObserver(measure).observe(track); }

  const SPEED=0.5;           // px por frame del autoavance
  const DRAG_THRESHOLD=6;    // px para considerar que hubo arrastre
  let pressing=false, dragging=false, moved=0;
  let startX=0, startScroll=0, pointerId=null;
  // acumulador float propio: scrollLeft redondea incrementos sub-pixel (0.5px)
  // y dejaba el carrusel congelado. Llevamos la posición real aparte.
  let pos = carousel.scrollLeft;

  const norm=v=>{ if(half<=0) return v; v%=half; if(v<0) v+=half; return v; };

  function tick(){
    // se frena solo si el cursor está sobre una tarjeta o si se mantiene apretado
    if(!pressing && !carousel.querySelector('.proj:hover')){
      pos = norm(pos + SPEED);
      carousel.scrollLeft = pos;
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  // mantener apretado frena el carrusel; arrastrar lo desplaza
  carousel.addEventListener('pointerdown', e=>{
    if(e.button!==undefined && e.button!==0) return;
    pressing=true; dragging=false; moved=0;
    pos=carousel.scrollLeft; startX=e.clientX; startScroll=pos;
    pointerId=e.pointerId;
    document.body.classList.add('cur-grab');
  });
  carousel.addEventListener('pointermove', e=>{
    if(!pressing) return;
    const dx=e.clientX-startX;
    if(Math.abs(dx)>moved) moved=Math.abs(dx);
    // solo se considera arrastre tras superar el umbral (un clic no captura el puntero)
    if(!dragging && moved>DRAG_THRESHOLD){
      dragging=true;
      try{ carousel.setPointerCapture(pointerId); }catch(_){}
      carousel.classList.add('dragging');
    }
    if(!dragging) return;
    pos = norm(startScroll - dx);
    carousel.scrollLeft = pos;
    // re-anclar para permitir arrastres largos sin tope tras el wrap
    if(pos<=1 || pos>=half-1){ startX=e.clientX; startScroll=pos; }
  });
  function endDrag(){
    if(!pressing) return;
    pressing=false;
    if(dragging){
      dragging=false;
      carousel.classList.remove('dragging');
      try{ carousel.releasePointerCapture(pointerId); }catch(_){}
    }
    document.body.classList.remove('cur-grab');
  }
  carousel.addEventListener('pointerup', endDrag);
  carousel.addEventListener('pointercancel', endDrag);
  // por si se suelta fuera del carrusel (evita que quede congelado)
  window.addEventListener('pointerup', endDrag);
  window.addEventListener('pointercancel', endDrag);

  // si fue un arrastre, no abrir el proyecto
  carousel.addEventListener('click', e=>{
    if(moved>DRAG_THRESHOLD){ e.stopPropagation(); e.preventDefault(); moved=0; }
  }, true);

  // que el cursor creativo muestre su etiqueta también en los clones
  if(window.__bindHover) window.__bindHover();
})();


/* ---------- MARQUEE de logos · loop sin fin ---------- */
(function(){
  ['logo-track','hero-logo-track'].forEach(id=>{
    const track=document.getElementById(id);
    if(!track) return;
    [...track.children].forEach(s=>{ const c=s.cloneNode(true); c.setAttribute('aria-hidden','true'); track.appendChild(c); });
  });
})();

/* ---------- INTERESES · se desordenan al pasar el cursor, se reordenan al salir ---------- */
(function(){
  const box=document.querySelector('.interests');
  if(!box) return;
  const chips=[...box.querySelectorAll('.chip')];
  box.addEventListener('mouseenter',()=>{
    chips.forEach(ch=>{
      ch.style.setProperty('--sx',(Math.random()*44-22).toFixed(1)+'px');
      ch.style.setProperty('--sy',(Math.random()*40-20).toFixed(1)+'px');
      ch.style.setProperty('--sr',(Math.random()*32-16).toFixed(1)+'deg');
      ch.style.setProperty('--ss',(0.9+Math.random()*0.18).toFixed(2));
    });
    box.classList.add('scatter');
  });
  box.addEventListener('mouseleave',()=>box.classList.remove('scatter'));
})();

})();

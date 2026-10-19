(function(){
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s));};
  // Boutons
  $('a[style*="background:"], button[type="submit"]').forEach(function(a){ if(!a.closest('footer')) a.classList.add('btn'); });
  // Barre de progression + en-tête
  var bar=document.createElement('div'); bar.id='scroll-progress'; document.body.appendChild(bar);
  var header=document.querySelector('header');
  var navLinks=$('header nav a[href^="#"]:not(.btn)');
  var sections=navLinks.map(function(a){return document.querySelector(a.getAttribute('href'));});
  function onScroll(){
    var h=document.documentElement, max=h.scrollHeight-h.clientHeight;
    bar.style.transform='scaleX('+(max>0?h.scrollTop/max:0)+')';
    if(header) header.classList.toggle('is-scrolled', h.scrollTop>20);
    var y=h.scrollTop+140, cur=-1;
    sections.forEach(function(s,i){ if(s&&s.offsetTop<=y) cur=i; });
    navLinks.forEach(function(a,i){ a.classList.toggle('is-active', i===cur); });
  }
  window.addEventListener('scroll',onScroll,{passive:true}); onScroll();
  // Cartes au survol
  $('#expertises [style*="border-radius: 16px"], #references [style*="border-radius: 12px; padding: 36px"], figure, #qui [style*="padding: 32px 28px"]').forEach(function(c){c.classList.add('card-hover');});
  if(reduce) return;
  document.documentElement.classList.add('js');
  // Haut de page : entrée en cascade
  var hero=document.querySelector('#accueil');
  if(hero){ $('p, h1, a, span', hero).filter(function(el){return el.parentElement.closest('#accueil')===hero && !el.closest('h1');}).forEach(function(el,i){ el.classList.add('hero-in'); el.style.animationDelay=(0.1+i*0.08)+'s'; }); }
  // Apparition au défilement
  var targets=[];
  $('section').forEach(function(sec){
    if(sec===hero) return;
    var i=0;
    $('h2, p, ul, blockquote, figure, details, form, [style*="display: grid"] > *, #expertises [style*="border-radius: 16px"], #dirigeant > div > div', sec).forEach(function(el){
      if(el.parentElement.closest('.reveal')||el.closest('summary')) return;
      el.classList.add('reveal');
      if(el.matches('#expertises [style*="border-radius: 16px"]')) el.classList.add(i%2?'reveal-right':'reveal-left');
      el.style.setProperty('--d', Math.min(i,6)*0.08+'s'); i++;
      targets.push(el);
    });
  });
  if(!('IntersectionObserver' in window)){ targets.forEach(function(t){t.classList.add('is-visible');}); return; }
  var io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target);} }); },{threshold:0.12,rootMargin:'0px 0px -40px 0px'});
  targets.forEach(function(t){io.observe(t);});
  // Compteurs animés
  $('#qui [style*="font-size: 44px"]').forEach(function(el){
    var m=el.textContent.match(/^(\d+)(.*)$/); if(!m) return;
    var end=+m[1], suf=m[2]; el.textContent='0'+suf;
    var cio=new IntersectionObserver(function(es){ if(!es[0].isIntersecting) return; cio.disconnect();
      var t0=performance.now(), dur=1400;
      (function tick(t){ var p=Math.min(1,(t-t0)/dur), v=Math.round(end*(1-Math.pow(1-p,3))); el.textContent=v+suf; if(p<1) requestAnimationFrame(tick); })(t0);
    },{threshold:0.6}); cio.observe(el);
  });
})();

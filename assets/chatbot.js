(function(){
  var MAIL='aam@amn-conseil.fr', TEL='+33 7 82 54 30 86', TEL_LINK='tel:+33782543086',
      LI='https://www.linkedin.com/in/abdenouramroun1/';
  var RDV={label:'Prendre rendez-vous',go:'rdv'}, MENU={label:'Autre question',go:'menu'};

  // Base de réponses : texte (HTML autorisé, contenu maîtrisé) + boutons de suite
  var N={
    welcome:{t:["Bonjour 👋 Je suis <b>Izem</b>, l'assistant d'AMN CONSEIL.","Comment puis-je vous aider ?"],q:'menu'},
    menu:{t:["Que souhaitez-vous savoir ?"],q:[
      {label:'Nos expertises',go:'expertises'},{label:'Facturation électronique',go:'einvoice'},
      {label:'Qui est derrière AMN ?',go:'founder'},{label:'Comment se passe une mission ?',go:'mission'},
      {label:'Tarifs',go:'price'},{label:'Contact',go:'contact'}]},
    expertises:{t:["AMN CONSEIL intervient sur 4 expertises Ivalua :","• <b>Implémentation & paramétrage</b> : fournisseurs, sourcing, contrats, achats, factures<br>• <b>Workflows & scripting</b> : circuits de validation, SQL Server, règles métier<br>• <b>Intégrations & API</b> : ERP, référentiels externes, flux<br>• <b>Facturation électronique</b> : Chorus Pro, CII, UBL, plateformes agréées"],
      q:[{label:'Reprise de projet existant',go:'audit'},{label:'Facturation électronique',go:'einvoice'},RDV,MENU]},
    einvoice:{t:["La réforme de la facturation électronique est en cours :","• Depuis le <b>1er septembre 2026</b> : toutes les entreprises doivent pouvoir recevoir des factures électroniques, et les grandes entreprises et ETI doivent les émettre.<br>• Au <b>1er septembre 2027</b> : l'émission devient obligatoire pour les PME et micro-entreprises.","AMN CONSEIL met Ivalua en conformité : formats CII/UBL, Chorus Pro, échanges avec votre plateforme agréée."],
      q:[RDV,{label:'Nos expertises',go:'expertises'},MENU]},
    founder:{t:["AMN CONSEIL a été fondé par <b>Abdenour AMROUN</b>, ingénieur en intelligence artificielle de formation.","• 9 ans d'expérience, dont 7 sur Ivalua<br>• Titulaire de toutes les certifications Ivalua<br>• Top 1 mondial des consultants certifiés Ivalua<br>• Accompagne des groupes du CAC 40 et internationaux","<a href=\""+LI+"\" target=\"_blank\" rel=\"noopener\">Voir son profil LinkedIn</a>"],
      q:[{label:'Comment se passe une mission ?',go:'mission'},RDV,MENU]},
    mission:{t:["Nous intervenons de bout en bout :","1. <b>Analyser</b> vos processus et contraintes<br>2. <b>Concevoir</b> des spécifications claires<br>3. <b>Construire</b> par itérations testées<br>4. <b>Transmettre</b> : documentation et support","En direct pour votre entreprise, ou en renfort de votre intégrateur ou ESN. De quelques jours d'expertise à un accompagnement pluriannuel."],
      q:[{label:'Tarifs',go:'price'},RDV,MENU]},
    audit:{t:["Oui, nous reprenons régulièrement des projets Ivalua existants.","Nous commençons par un audit du paramétrage et des interfaces, puis proposons un plan d'action priorisé."],q:[RDV,MENU]},
    price:{t:["Chaque projet Ivalua est différent : nos interventions sont chiffrées sur devis, selon le périmètre et la durée.","Le plus simple est d'en parler 30 minutes : c'est sans engagement."],q:[RDV,{label:'Contact',go:'contact'},MENU]},
    contact:{t:["Vous pouvez nous joindre directement :","📧 <a href=\"mailto:"+MAIL+"\">"+MAIL+"</a><br>📞 <a href=\""+TEL_LINK+"\">"+TEL+"</a><br>💼 <a href=\""+LI+"\" target=\"_blank\" rel=\"noopener\">LinkedIn</a>","Réponse sous 48 heures ouvrées."],q:[RDV,MENU]},
    rdv:{t:["Parfait ! Je vous emmène vers le formulaire de contact. Indiquez votre besoin en quelques lignes, nous revenons vers vous sous 48 heures ouvrées."],action:'rdv',q:[MENU]},
    unknown:{t:["Je suis un petit robot et je n'ai pas encore réponse à tout 🤖","Pour une question précise, le mieux est d'écrire directement à Abdenour : <a href=\"mailto:"+MAIL+"\">"+MAIL+"</a>"],q:'menu'}
  };
  // Mots-clés pour la saisie libre
  var K=[
    ['einvoice',/factur|e-?invoic|chorus|\bcii\b|\bubl\b|\bpdp\b|plateforme agr|r[ée]forme|2026|2027/],
    ['price',/prix|tarif|co[uû]t|combien|budget|\btjm\b|devis/],
    ['rdv',/rdv|rendez|r[ée]union|appel|call|meeting|[ée]changer|discuter/],
    ['contact',/contact|mail|t[ée]l[ée]phone|num[ée]ro|joindre|linkedin|adresse/],
    ['founder',/\bqui\b|fondateur|abdenour|amroun|dirigeant|certif|exp[ée]rience|\bcv\b|profil/],
    ['audit',/reprise|reprendre|existant|audit|probl[eè]me|bloqu/],
    ['mission',/mission|m[ée]thode|d[ée]roul|dur[ée]e|sous-?traitan|\besn\b|int[ée]grateur|freelance|r[ée]gie/],
    ['expertises',/ivalua|expertise|service|offre|param[ée]trage|workflow|\bsql\b|\bapi\b|int[ée]gration|\berp\b|sourcing|contrat|fournisseur|achat|\bs2p\b|\bp2p\b/],
    ['welcome',/^(bonjour|salut|hello|bonsoir|coucou|hey)\b/]
  ];

  // Mascotte Izem (SVG original)
  function izem(extra){ return '<svg class="izem '+(extra||'')+'" viewBox="0 0 120 142" role="img" aria-label="Izem, le robot d\'AMN CONSEIL">'+
    '<line x1="60" y1="10" x2="60" y2="26" stroke="#2B2D31" stroke-width="3.5" stroke-linecap="round"/>'+
    '<circle class="izem-bulb" cx="60" cy="9" r="6.5" fill="#3AA6EC"/>'+
    '<rect x="11" y="44" width="13" height="22" rx="5" fill="#2B2D31"/><rect x="96" y="44" width="13" height="22" rx="5" fill="#2B2D31"/>'+
    '<rect x="21" y="25" width="78" height="58" rx="23" fill="#0A6BB8"/>'+
    '<rect x="31" y="37" width="58" height="34" rx="15" fill="#1F2125"/>'+
    '<g class="izem-eyes"><ellipse cx="48" cy="52" rx="6" ry="7" fill="#6CE0FF"/><ellipse cx="72" cy="52" rx="6" ry="7" fill="#6CE0FF"/></g>'+
    '<rect class="izem-mouth" x="53" y="62" width="14" height="3" rx="1.5" fill="#6CE0FF"/>'+
    '<rect x="52" y="82" width="16" height="8" fill="#2B2D31"/>'+
    '<g class="izem-arm-l"><rect x="9" y="94" width="14" height="32" rx="7" fill="#2B2D31"/><circle cx="16" cy="128" r="6" fill="#3AA6EC"/></g>'+
    '<g class="izem-arm-r"><rect x="97" y="94" width="14" height="32" rx="7" fill="#2B2D31"/><circle cx="104" cy="128" r="6" fill="#3AA6EC"/></g>'+
    '<rect x="24" y="88" width="72" height="50" rx="16" fill="#0A6BB8"/>'+
    '<rect x="32" y="96" width="56" height="33" rx="8" fill="#FFFFFF"/>'+
    '<text x="60" y="114" text-anchor="middle" font-family="Sora, sans-serif" font-weight="700" font-size="15" fill="#0A6BB8">AMN</text>'+
    '<text x="60" y="124" text-anchor="middle" font-family="Sora, sans-serif" font-weight="600" font-size="7.6" letter-spacing=".6" fill="#2B2D31">CONSEIL</text>'+
    '</svg>'; }
  function wave(el){ if(!el) return; el.classList.remove('wave'); void el.getBoundingClientRect(); el.classList.add('wave'); }

  var css=document.createElement('link'); css.rel='stylesheet'; css.href='assets/chatbot.css'; document.head.appendChild(css);
  var wrap=document.createElement('div');
  wrap.innerHTML=
   '<button class="amn-chat-toggle" type="button" aria-label="Discuter avec Izem, l\'assistant AMN CONSEIL" aria-expanded="false" aria-controls="amn-chat">'+
     izem('izem-toggle')+'<span class="amn-dot" aria-hidden="true"></span></button>'+
   '<div class="amn-chat-teaser" aria-hidden="true">Bonjour, je suis Izem 👋 Une question sur Ivalua ?</div>'+
   '<div class="amn-chat" id="amn-chat" role="dialog" aria-modal="false" aria-label="Izem, assistant AMN CONSEIL">'+
     '<div class="amn-chat-head"><div class="amn-chat-avatar" aria-hidden="true">'+izem('izem-head')+'</div><div><div class="amn-chat-title">Izem</div><div class="amn-chat-sub">Assistant AMN CONSEIL · en ligne</div></div>'+
     '<button class="amn-chat-close" type="button" aria-label="Fermer l\'assistant"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"></path></svg></button></div>'+
     '<div class="amn-chat-body" aria-live="polite"></div>'+
     '<form class="amn-chat-form"><label for="amn-chat-input" style="position:absolute;left:-9999px">Votre question</label><input id="amn-chat-input" type="text" autocomplete="off" placeholder="Posez votre question…" maxlength="300">'+
     '<button type="submit" aria-label="Envoyer"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 2L11 13"></path><path d="M22 2l-7 20-4-9-9-4 20-7z"></path></svg></button></form>'+
     '<div class="amn-chat-foot">Izem est un assistant automatique · aucune donnée enregistrée</div>'+
   '</div>';
  document.body.appendChild(wrap);
  var toggle=wrap.querySelector('.amn-chat-toggle'), panel=wrap.querySelector('.amn-chat'), body=wrap.querySelector('.amn-chat-body'),
      form=wrap.querySelector('.amn-chat-form'), input=wrap.querySelector('input'), teaser=wrap.querySelector('.amn-chat-teaser'), started=false;
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  var head=wrap.querySelector('.izem-head'), tIzem=wrap.querySelector('.izem-toggle');

  function scroll(){ body.scrollTop=body.scrollHeight; }
  function bubble(html,who){ var d=document.createElement('div'); d.className='amn-msg '+(who==='user'?'amn-user':'amn-bot'); if(who==='user') d.textContent=html; else d.innerHTML=html; body.appendChild(d); scroll(); return d; }
  function clearQuick(){ Array.prototype.forEach.call(body.querySelectorAll('.amn-quick'),function(q){q.remove();}); }
  function quick(list){ if(list==='menu') list=N.menu.q; var box=document.createElement('div'); box.className='amn-quick';
    list.forEach(function(o){ var b=document.createElement('button'); b.type='button'; b.textContent=o.label; b.onclick=function(){ clearQuick(); bubble(o.label,'user'); show(o.go); }; box.appendChild(b); });
    body.appendChild(box); scroll(); }
  function show(key){
    var n=N[key]||N.unknown, i=0;
    (function next(){
      if(i>=n.t.length){ if(n.action==='rdv') setTimeout(goRdv,600); if(n.q) quick(n.q); return; }
      head.classList.add('talking');
      var typing=bubble('<div class="amn-typing" aria-label="L\'assistant écrit"><span></span><span></span><span></span></div>','bot');
      typing.style.padding='0';
      setTimeout(function(){ typing.remove(); head.classList.remove('talking'); bubble(n.t[i++],'bot'); next(); }, reduce?0:Math.min(1100,350+n.t[i].length*6));
    })();
  }
  function goRdv(){ close(); var c=document.getElementById('contact'); if(c){ c.scrollIntoView({behavior:reduce?'auto':'smooth'}); var f=c.querySelector('input'); if(f) setTimeout(function(){f.focus({preventScroll:true});},700);} }
  function match(txt){ var s=txt.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
    var s2=txt.toLowerCase(); for(var i=0;i<K.length;i++){ if(K[i][1].test(s2)||K[i][1].test(s)) return K[i][0]; } return 'unknown'; }
  function open(){ panel.classList.add('open'); toggle.setAttribute('aria-expanded','true'); teaser.classList.remove('show'); toggle.querySelector('.amn-dot').style.display='none';
    if(!started){ started=true; var intro=document.createElement('div'); intro.className='amn-intro'; intro.innerHTML=izem('izem-big')+'<div class="amn-intro-name">Izem</div><div class="amn-intro-sub">Votre guide AMN CONSEIL</div>'; body.appendChild(intro); setTimeout(function(){wave(intro.querySelector('.izem'));},350); show('welcome'); } else { wave(head); } setTimeout(function(){input.focus();},300); }
  function close(){ panel.classList.remove('open'); toggle.setAttribute('aria-expanded','false'); }
  toggle.onmouseenter=function(){ wave(tIzem); };
  toggle.onclick=function(){ panel.classList.contains('open')?close():open(); };
  wrap.querySelector('.amn-chat-close').onclick=function(){ close(); toggle.focus(); };
  document.addEventListener('keydown',function(e){ if(e.key==='Escape'&&panel.classList.contains('open')){ close(); toggle.focus(); } });
  form.onsubmit=function(e){ e.preventDefault(); var v=input.value.trim(); if(!v) return; input.value=''; clearQuick(); bubble(v,'user'); show(match(v)); };
  setTimeout(function(){ if(!started) { teaser.classList.add('show'); wave(tIzem); setTimeout(function(){teaser.classList.remove('show');},6000);} },5000);
})();

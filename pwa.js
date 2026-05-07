// Yanteks Pro - PWA İyileştirmeleri
(function(){

  // 1. Global stiller
  const st=document.createElement('style');
  st.textContent=[
    '@keyframes _pgOut{to{opacity:0;transform:translateY(5px)}}',
    '._page-exit{animation:_pgOut .14s ease forwards!important;pointer-events:none!important}',
    'body{overscroll-behavior-y:none}',
    '.bnav-item{transition:opacity .1s,color .18s cubic-bezier(.4,0,.2,1)}',
    '.bnav-item:active{opacity:.6}',
    'button:active,.chip:active,.kpi:active,.ft:active{transform:scale(.97)}',
    // Kurulum banner animasyonu
    '@keyframes _bnIn{from{transform:translateY(100%)}to{transform:translateY(0)}}',
    '#_inst-bar{animation:_bnIn .3s cubic-bezier(.32,.72,0,1)}',
  ].join('\n');
  document.head.appendChild(st);

  // 2. Haptic
  window.haptic=function(t){
    if(!navigator.vibrate)return;
    const p={light:8,medium:22,success:[8,50,8],error:[20,60,20]};
    navigator.vibrate(p[t]||8);
  };

  // 3. Standalone mod tespiti
  var isStandalone=window.navigator.standalone===true||
    window.matchMedia('(display-mode:standalone)').matches||
    window.matchMedia('(display-mode:fullscreen)').matches;

  // 4. Kurulum rehberi (standalone değilse)
  function showInstallBanner(){
    if(isStandalone)return;
    if(sessionStorage.getItem('_inst_ok'))return;
    var isIOS=/iphone|ipad|ipod/i.test(navigator.userAgent);
    var isAndroid=/android/i.test(navigator.userAgent);
    if(!isIOS&&!isAndroid)return; // masaüstünde gösterme

    var bar=document.createElement('div');
    bar.id='_inst-bar';
    bar.style.cssText=[
      'position:fixed','bottom:0','left:0','right:0','z-index:99990',
      'background:linear-gradient(135deg,#0A1520,#1E2D3D)',
      'border-top:2px solid rgba(8,145,178,.6)',
      'padding:14px 16px calc(14px + env(safe-area-inset-bottom))',
      'font-family:Inter,sans-serif','color:#fff',
      'box-shadow:0 -4px 30px rgba(0,0,0,.4)',
    ].join(';');

    var content='';
    if(isIOS){
      content='<div style="display:flex;align-items:flex-start;gap:12px">'
        +'<div style="font-size:28px;flex-shrink:0;margin-top:2px">📲</div>'
        +'<div style="flex:1">'
        +'<div style="font-weight:800;font-size:14px;margin-bottom:4px">Tam ekran için ana ekrana ekle</div>'
        +'<div style="font-size:12px;opacity:.75;line-height:1.5">'
        +'Safari altındaki <strong style="color:#38BDF8">⬆️ Paylaş</strong> butonuna bas → '
        +'<strong style="color:#38BDF8">Ana Ekrana Ekle</strong> seç → '
        +'Ana ekrandaki ikona dokun</div>'
        +'</div>'
        +'<button id="_inst-x" style="background:rgba(255,255,255,.12);border:none;color:#fff;'
        +'border-radius:8px;padding:8px 12px;font-size:11px;font-weight:700;cursor:pointer;'
        +'font-family:inherit;flex-shrink:0;margin-top:2px">Tamam</button>'
        +'</div>';
    } else if(isAndroid){
      content='<div style="display:flex;align-items:flex-start;gap:12px">'
        +'<div style="font-size:28px;flex-shrink:0;margin-top:2px">📲</div>'
        +'<div style="flex:1">'
        +'<div style="font-weight:800;font-size:14px;margin-bottom:4px">Tam ekran için uygulamayı yükle</div>'
        +'<div style="font-size:12px;opacity:.75;line-height:1.5">'
        +'Chrome menüsünden <strong style="color:#38BDF8">Ana ekrana ekle</strong> ya da '
        +'<strong style="color:#38BDF8">Uygulamayı yükle</strong> seç</div>'
        +'</div>'
        +'<button id="_inst-x" style="background:rgba(255,255,255,.12);border:none;color:#fff;'
        +'border-radius:8px;padding:8px 12px;font-size:11px;font-weight:700;cursor:pointer;'
        +'font-family:inherit;flex-shrink:0;margin-top:2px">Tamam</button>'
        +'</div>';
    }

    bar.innerHTML=content;
    document.body.appendChild(bar);
    document.getElementById('_inst-x').addEventListener('click',function(){
      sessionStorage.setItem('_inst_ok','1');
      bar.style.animation='_pgOut .2s forwards';
      setTimeout(function(){bar.remove();},200);
    });
  }

  // 5. Android install prompt yakala
  var _deferredPrompt=null;
  window.addEventListener('beforeinstallprompt',function(e){
    e.preventDefault();
    _deferredPrompt=e;
    // Varsa banner'ı kaldır, yerleşik Chrome prompt'unu göster
    var bar=document.getElementById('_inst-bar');
    if(bar){
      var btn=document.getElementById('_inst-x');
      if(btn)btn.textContent='Yükle';
      btn&&btn.addEventListener('click',function(){
        if(_deferredPrompt){_deferredPrompt.prompt();_deferredPrompt=null;}
      },true);
    }
  });
  window.addEventListener('appinstalled',function(){
    var bar=document.getElementById('_inst-bar');
    if(bar)bar.remove();
    isStandalone=true;
  });

  // 6. Nav geçiş animasyonu
  document.addEventListener('DOMContentLoaded',function(){
    // Kurulum banner'ı göster
    setTimeout(showInstallBanner,1200);

    // Nav link geçişleri
    document.querySelectorAll('.bnav-item[href]').forEach(function(a){
      const href=a.getAttribute('href');
      if(!href||href==="#"||href.startsWith('http'))return;
      a.removeAttribute('onclick');
      a.addEventListener('click',function(e){
        e.preventDefault();
        e.stopPropagation();
        haptic('light');
        document.body.classList.add('_page-exit');
        setTimeout(function(){window.location.href=href;},140);
      });
    });
  });

  // 7. Klavye açılınca input'u görünür yap
  var _scrollTimer;
  document.addEventListener('focusin',function(e){
    var el=e.target;
    if(!el.matches('input:not([type=checkbox]):not([type=radio]):not([type=file]),textarea,select'))return;
    clearTimeout(_scrollTimer);
    _scrollTimer=setTimeout(function(){
      el.scrollIntoView({behavior:'smooth',block:'center'});
    },380);
  });

  // 8. iOS uzun basış resim menüsü engelle
  document.addEventListener('contextmenu',function(e){
    if(e.target.tagName==='IMG')e.preventDefault();
  });

  // 9. Çift dokunma zoom engelle
  var _lastTap=0;
  document.addEventListener('touchend',function(e){
    var now=Date.now();
    if(now-_lastTap<300&&e.target.tagName!=='INPUT'&&e.target.tagName!=='TEXTAREA'){
      e.preventDefault();
    }
    _lastTap=now;
  },{passive:false});

})();

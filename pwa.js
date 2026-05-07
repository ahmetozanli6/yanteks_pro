// Yanteks Pro - PWA İyileştirmeleri
(function(){

  // 1. Global stiller
  const st=document.createElement('style');
  st.textContent=[
    // Sayfa çıkış animasyonu
    '@keyframes _pgOut{to{opacity:0;transform:translateY(5px)}}',
    '._page-exit{animation:_pgOut .14s ease forwards!important;pointer-events:none!important}',
    // Overscroll bounce önleme
    'body{overscroll-behavior-y:none}',
    // Nav dokunma geri bildirimi
    '.bnav-item{transition:opacity .1s,color .18s cubic-bezier(.4,0,.2,1)}',
    '.bnav-item:active{opacity:.6}',
    // Tüm tıklanabilir elemanlar için daha iyi aktif hali
    'button:active,.chip:active,.kpi:active,.ft:active{transform:scale(.97)}',
  ].join('\n');
  document.head.appendChild(st);

  // 2. Haptic yardımcı (Android + iOS 13+)
  window.haptic=function(t){
    if(!navigator.vibrate)return;
    const p={light:8,medium:22,success:[8,50,8],error:[20,60,20]};
    navigator.vibrate(p[t]||8);
  };

  // 3. Nav çubuğu geçiş animasyonu
  document.addEventListener('DOMContentLoaded',function(){
    document.querySelectorAll('.bnav-item[href]').forEach(function(a){
      const href=a.getAttribute('href');
      if(!href||href==="#"||href.startsWith('http'))return;
      // Inline onclick'i kaldır, kendi listener'ımızı ekle
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

  // 4. Klavye açıldığında input'u görünür alana kaydır (iOS)
  var _scrollTimer;
  document.addEventListener('focusin',function(e){
    var el=e.target;
    if(!el.matches('input:not([type=checkbox]):not([type=radio]):not([type=file]),textarea,select'))return;
    clearTimeout(_scrollTimer);
    _scrollTimer=setTimeout(function(){
      el.scrollIntoView({behavior:'smooth',block:'center'});
    },380);
  });

  // 5. iOS uzun basmada resim kaydetme menüsünü engelle
  document.addEventListener('contextmenu',function(e){
    if(e.target.tagName==='IMG')e.preventDefault();
  });

  // 6. Çift dokunmada zoom engelle (meta viewport ile birlikte çalışır)
  var _lastTap=0;
  document.addEventListener('touchend',function(e){
    var now=Date.now();
    if(now-_lastTap<300&&e.target.tagName!=='INPUT'&&e.target.tagName!=='TEXTAREA'){
      e.preventDefault();
    }
    _lastTap=now;
  },{passive:false});

})();

// Yanteks Pro - Çevrimdışı Yazma Kuyruğu
(function(w){
  const KEY='yanteks_q';
  const SU='https://zmlbdpjcergcvcurihuy.supabase.co';
  const SK='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InptbGJkcGpjZXJnY3ZjdXJpaHV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1MTA2MzIsImV4cCI6MjA5MTA4NjYzMn0.Jh4e_UXSL7CH7EzLBhhXtQYM0-iQwrFU3GHnoe-njBM';

  function getQ(){try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch{return[]}}
  function setQ(q){localStorage.setItem(KEY,JSON.stringify(q))}

  function enqueue(op){
    op.qid=Date.now()+'_'+Math.random().toString(36).slice(2,6);
    op.queuedAt=new Date().toISOString();
    const q=getQ();q.push(op);setQ(q);
    refresh();
    return op.qid;
  }

  async function flush(){
    if(!navigator.onLine)return 0;
    const q=getQ();
    if(!q.length)return 0;
    // Wait for supabase to be available (loaded via CDN)
    if(typeof supabase==='undefined')return 0;
    const db=supabase.createClient(SU,SK);
    const done=[];
    for(const op of q){
      try{
        let req;
        if(op.type==='insert')      req=db.from(op.table).insert(op.payload);
        else if(op.type==='update') req=db.from(op.table).update(op.payload).eq(op.eq[0],op.eq[1]);
        else if(op.type==='delete') req=db.from(op.table).delete().eq(op.eq[0],op.eq[1]);
        if(req){const{error}=await req;if(!error)done.push(op.qid);}
      }catch(e){/* network error, try next time */}
    }
    if(done.length)setQ(q.filter(o=>!done.includes(o.qid)));
    refresh();
    return done.length;
  }

  function refresh(){
    const q=getQ(),online=navigator.onLine;
    let bar=document.getElementById('_offbar');
    if(!online||q.length>0){
      if(!bar){
        bar=document.createElement('div');
        bar.id='_offbar';
        bar.style.cssText=[
          'position:fixed','bottom:calc(56px + env(safe-area-inset-bottom) + 6px)',
          'left:12px','right:12px','z-index:299',
          'padding:8px 16px','border-radius:10px',
          'font-size:11px','font-weight:700','color:#fff',
          'text-align:center','box-shadow:0 4px 16px rgba(0,0,0,.25)',
          'transition:opacity .3s','pointer-events:none'
        ].join(';');
        document.body.appendChild(bar);
      }
      if(!online){
        bar.style.background='#7F1D1D';
        bar.textContent=q.length>0?`📵 Çevrimdışı — ${q.length} işlem sırada`:'📵 Çevrimdışı';
      }else{
        bar.style.background='#0672A0';
        bar.textContent=`⏳ ${q.length} işlem senkronize ediliyor...`;
      }
    }else{
      if(bar)bar.remove();
    }
  }

  w.addEventListener('online',async()=>{
    refresh();
    const n=await flush();
    const bar=document.getElementById('_offbar');
    if(n>0){
      if(bar){bar.style.background='#15803D';bar.textContent=`✓ ${n} işlem senkronize edildi`;}
      setTimeout(()=>{const b=document.getElementById('_offbar');if(b)b.remove();},2500);
      if(typeof sync==='function')setTimeout(sync,400);
    }else{
      if(bar)bar.remove();
    }
  });

  w.addEventListener('offline',refresh);

  // Sayfa açıldığında kuyruktaki işlemi işle
  w.addEventListener('load',()=>{
    const q=getQ();
    if(q.length&&navigator.onLine){
      flush().then(n=>{
        if(n>0&&typeof sync==='function')setTimeout(sync,400);
      });
    }else{
      refresh();
    }
  });

  w._offQ={enqueue,flush,getQ};
})(window);

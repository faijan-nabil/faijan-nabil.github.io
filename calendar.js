(function(){
  var el=document.getElementById('cal'); if(!el) return;
  var edit=new URLSearchParams(location.search).has('edit');
  if(edit) el.className='cal-edit';
  var busy={}; (window.BUSY||[]).forEach(function(b){busy[b.date]=b.note||'Busy';});
  var d=new Date(); d.setDate(1);
  var pad=function(n){return String(n).padStart(2,'0');};
  var key=function(y,m,i){return y+'-'+pad(m+1)+'-'+pad(i);};
  function exportList(){
    var rows=Object.keys(busy).sort().map(function(k){return '  {date:"'+k+'", note:"'+busy[k].replace(/"/g,"'")+'"}';});
    return 'window.BUSY = [\n'+rows.join(',\n')+'\n];';
  }
  function render(){
    var y=d.getFullYear(), m=d.getMonth();
    var first=new Date(y,m,1).getDay(), days=new Date(y,m+1,0).getDate();
    var t=new Date(), tk=key(t.getFullYear(),t.getMonth(),t.getDate());
    var h='<div class="cal-head"><button id="prev" aria-label="Previous month">&#8249;</button><strong>'+
      d.toLocaleString('en',{month:'long'})+' '+y+'</strong><button id="next" aria-label="Next month">&#8250;</button></div><div class="cal-grid">';
    ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].forEach(function(w){h+='<div class="dow">'+w+'</div>';});
    for(var i=0;i<first;i++) h+='<div></div>';
    var notes='';
    for(var j=1;j<=days;j++){
      var k=key(y,m,j), b=busy[k];
      h+='<div class="day'+(b?' busy':'')+(k===tk?' today':'')+'" data-k="'+k+'"'+(b?' title="'+b+'"':'')+'>'+j+'</div>';
      if(b) notes+='<li>'+j+' '+d.toLocaleString('en',{month:'short'})+': '+b+'</li>';
    }
    h+='</div><p class="cal-key"><span class="sw"></span> Busy &nbsp;&nbsp; <span class="sw today"></span> Today</p>';
    h+=notes?'<ul class="cal-notes">'+notes+'</ul>':'<p class="cal-key">No busy days marked this month.</p>';
    if(edit) h+='<p class="cal-key">Edit mode: click a date to mark or clear it, then copy this into busy-dates.js.</p><textarea id="out" rows="7" readonly>'+exportList()+'</textarea>';
    el.innerHTML=h;
    document.getElementById('prev').onclick=function(){d.setMonth(d.getMonth()-1);render();};
    document.getElementById('next').onclick=function(){d.setMonth(d.getMonth()+1);render();};
    if(edit) el.querySelectorAll('.day').forEach(function(c){c.onclick=function(){
      var k=c.dataset.k;
      if(busy[k]) delete busy[k]; else busy[k]=prompt('Short note (optional)','Busy')||'Busy';
      render();};});
  }
  render();
})();

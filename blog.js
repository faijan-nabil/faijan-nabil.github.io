(function(){
  var P=(window.POSTS||[]).slice().sort(function(a,b){return b.date.localeCompare(a.date);});
  var fmt=function(s){return new Date(s+'T00:00:00').toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'});};
  var mins=function(p){return Math.max(1,Math.round(p.body.replace(/<[^>]+>/g,' ').split(/\s+/).length/200));};
  var latest=document.getElementById('latest');
  if(latest) latest.innerHTML=P.slice(0,3).map(function(p){
    return '<li><a href="blog.html#'+p.slug+'">'+p.title+'</a><span class="muted">'+fmt(p.date)+'</span></li>';}).join('')||'<li class="muted">Posts coming soon.</li>';
  var el=document.getElementById('blog'); if(!el) return;
  var tag='All';
  function list(){
    var tags=['All'].concat(P.map(function(p){return p.tag;}).filter(function(t,i,a){return a.indexOf(t)===i;}));
    var h='<div class="tags">'+tags.map(function(t){return '<button class="tag'+(t===tag?' on':'')+'" data-t="'+t+'">'+t+'</button>';}).join('')+'</div>';
    h+=P.filter(function(p){return tag==='All'||p.tag===tag;}).map(function(p){
      return '<article class="post-card"><div class="meta">'+fmt(p.date)+' &middot; '+p.tag+' &middot; '+mins(p)+' min read</div><h2><a href="#'+p.slug+'">'+p.title+'</a></h2><p>'+p.summary+'</p><a href="#'+p.slug+'">Read more &rarr;</a></article>';}).join('')||'<p class="muted">No posts yet.</p>';
    el.innerHTML=h;
    el.querySelectorAll('.tag').forEach(function(b){b.onclick=function(){tag=b.dataset.t;list();};});
  }
  function route(){
    var slug=location.hash.slice(1), p=P.filter(function(x){return x.slug===slug;})[0];
    if(p){
      el.innerHTML='<a class="back" href="#">&larr; All posts</a><article class="post"><div class="meta">'+fmt(p.date)+' &middot; '+p.tag+' &middot; '+mins(p)+' min read</div><h1>'+p.title+'</h1>'+p.body+'</article>';
      window.scrollTo(0,0);
    } else list();
  }
  window.addEventListener('hashchange',route); route();
})();

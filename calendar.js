(function () {
  var el = document.getElementById('busy-calendar');
  if (!el) return;

  var st = document.createElement('style');
  st.textContent =
    '#busy-calendar{max-width:340px}' +
    '.cal-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;font-weight:600}' +
    '.cal-head button{border:1px solid #ccd;background:#fff;border-radius:6px;padding:2px 10px;cursor:pointer}' +
    '.cal-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:3px;text-align:center}' +
    '.cal-dow{font-size:.75rem;color:#667;padding:2px 0}' +
    '.cal-day{padding:7px 0;border-radius:6px;background:#f3f6fa;font-size:.9rem}' +
    '.cal-day.empty{background:none}' +
    '.cal-day.today{outline:2px solid #2a6fb0}' +
    '.cal-day.busy{background:#d9534f;color:#fff}' +
    '.cal-edit .cal-day:not(.empty){cursor:pointer}' +
    '.cal-legend{font-size:.78rem;margin-top:6px;color:#556}' +
    '.cal-legend i{display:inline-block;width:10px;height:10px;border-radius:2px;background:#d9534f;margin-right:4px}' +
    '.cal-export textarea{width:100%;height:110px;font-family:monospace;font-size:.8rem;margin-top:8px}';
  document.head.appendChild(st);

  var editMode = new URLSearchParams(location.search).get('edit') === '1';
  var busy = {};
  var view = new Date(); view.setDate(1);
  var MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  function pad(n) { return String(n).padStart(2, '0'); }
  function key(y, m, d) { return y + '-' + pad(m + 1) + '-' + pad(d); }

  function addRange(a, b) {
    var d = new Date(a + 'T00:00:00'), e = new Date(b + 'T00:00:00');
    for (; d <= e; d.setDate(d.getDate() + 1)) busy[key(d.getFullYear(), d.getMonth(), d.getDate())] = true;
  }

  fetch('busy-dates.json?v=' + Date.now())
    .then(function (r) { return r.json(); })
    .then(function (j) {
      (j.busy || []).forEach(function (d) { busy[d] = true; });
      (j.ranges || []).forEach(function (r) { addRange(r[0], r[1]); });
    })
    .catch(function () {})
    .then(render);

  function render() {
    var y = view.getFullYear(), m = view.getMonth();
    var first = new Date(y, m, 1).getDay(), days = new Date(y, m + 1, 0).getDate();
    var t = new Date(), todayKey = key(t.getFullYear(), t.getMonth(), t.getDate());
    var h = '<div class="' + (editMode ? 'cal-edit' : '') + '">' +
      '<div class="cal-head"><button id="cal-prev">&lsaquo;</button><span>' + MONTHS[m] + ' ' + y + '</span><button id="cal-next">&rsaquo;</button></div>' +
      '<div class="cal-grid">' +
      ['Su','Mo','Tu','We','Th','Fr','Sa'].map(function (d) { return '<div class="cal-dow">' + d + '</div>'; }).join('');
    for (var i = 0; i < first; i++) h += '<div class="cal-day empty"></div>';
    for (var d = 1; d <= days; d++) {
      var k = key(y, m, d);
      h += '<div class="cal-day' + (busy[k] ? ' busy' : '') + (k === todayKey ? ' today' : '') + '" data-k="' + k + '">' + d + '</div>';
    }
    h += '</div><div class="cal-legend"><i></i>Busy / unavailable</div>';
    if (editMode) {
      var json = JSON.stringify({ busy: Object.keys(busy).sort() }, null, 2);
      h += '<div class="cal-export"><small>Edit mode: click dates to mark busy or free. Then copy this text into <b>busy-dates.json</b> on GitHub.</small>' +
        '<textarea readonly>' + json + '</textarea></div>';
    }
    el.innerHTML = h + '</div>';
    el.querySelector('#cal-prev').onclick = function () { view.setMonth(view.getMonth() - 1); render(); };
    el.querySelector('#cal-next').onclick = function () { view.setMonth(view.getMonth() + 1); render(); };
    if (editMode) {
      el.querySelectorAll('.cal-day[data-k]').forEach(function (c) {
        c.onclick = function () {
          if (busy[c.dataset.k]) delete busy[c.dataset.k]; else busy[c.dataset.k] = true;
          render();
        };
      });
    }
  }
})();

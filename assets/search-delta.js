let UNITS_DELTA = null;
async function loadUnitsDelta() { if (UNITS_DELTA) return UNITS_DELTA; const r = await fetch("assets/units-delta.json"); UNITS_DELTA = await r.json(); return UNITS_DELTA; }
const boxDelta = document.getElementById("q"), outDelta = document.getElementById("results");
if (boxDelta) {
  boxDelta.addEventListener("input", async () => {
    const q = boxDelta.value.trim().toLowerCase();
    if (q.length < 2) { outDelta.innerHTML = ""; return; }
    const units = await loadUnitsDelta();
    const hits = units.filter(u => u.c.toLowerCase().includes(q) || u.n.toLowerCase().includes(q) || u.w.toLowerCase().includes(q) || u.l.toLowerCase().includes(q)).slice(0, 50);
    if (!hits.length) { outDelta.innerHTML = '<p class="fineprint">No polling unit matches that search in Delta.</p>'; return; }
    outDelta.innerHTML = "<p class='fineprint'>" + hits.length + (hits.length >= 50 ? " (first 50)" : "") + " match(es):</p>" + hits.map(u => {
      const slug = u.l.toLowerCase().replace(/ /g, "-");
      return '<div class="result"><span class="code">' + u.c + '</span> - <b>' + escDelta(u.n) + '</b><br><span class="muted">' + escDelta(u.w) + ', ' + escDelta(u.l) + '</span> &middot; <a class="link" href="lga/' + slug + '.html#' + u.c + '">Open in ' + escDelta(u.l) + '</a></div>';
    }).join("");
  });
}
function escDelta(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }

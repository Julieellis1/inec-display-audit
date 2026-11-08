let UNITS_LAGOS = null;
async function loadUnitsLagos() { if (UNITS_LAGOS) return UNITS_LAGOS; const r = await fetch("assets/units-lagos.json"); UNITS_LAGOS = await r.json(); return UNITS_LAGOS; }
const boxLagos = document.getElementById("q"), outLagos = document.getElementById("results");
if (boxLagos) {
  boxLagos.addEventListener("input", async () => {
    const q = boxLagos.value.trim().toLowerCase();
    if (q.length < 2) { outLagos.innerHTML = ""; return; }
    const units = await loadUnitsLagos();
    const hits = units.filter(u => u.c.toLowerCase().includes(q) || u.n.toLowerCase().includes(q) || u.w.toLowerCase().includes(q) || u.l.toLowerCase().includes(q)).slice(0, 50);
    if (!hits.length) { outLagos.innerHTML = '<p class="fineprint">No polling unit matches that search in Lagos.</p>'; return; }
    outLagos.innerHTML = "<p class='fineprint'>" + hits.length + (hits.length >= 50 ? " (first 50)" : "") + " match(es):</p>" + hits.map(u => {
      const slug = u.l.toLowerCase().replace(/ /g, "-");
      return '<div class="result"><span class="code">' + u.c + '</span> - <b>' + escLagos(u.n) + '</b><br><span class="muted">' + escLagos(u.w) + ', ' + escLagos(u.l) + '</span> &middot; <a class="link" href="lga/' + slug + '.html#' + u.c + '">Open in ' + escLagos(u.l) + '</a></div>';
    }).join("");
  });
}
function escLagos(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }

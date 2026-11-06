let UNITS_EDO = null;
async function loadUnitsEdo() { if (UNITS_EDO) return UNITS_EDO; const r = await fetch("assets/units-edo.json"); UNITS_EDO = await r.json(); return UNITS_EDO; }
const boxEdo = document.getElementById("q"), outEdo = document.getElementById("results");
if (boxEdo) {
  boxEdo.addEventListener("input", async () => {
    const q = boxEdo.value.trim().toLowerCase();
    if (q.length < 2) { outEdo.innerHTML = ""; return; }
    const units = await loadUnitsEdo();
    const hits = units.filter(u => u.c.toLowerCase().includes(q) || u.n.toLowerCase().includes(q) || u.w.toLowerCase().includes(q) || u.l.toLowerCase().includes(q)).slice(0, 50);
    if (!hits.length) { outEdo.innerHTML = '<p class="fineprint">No polling unit matches that search in Edo.</p>'; return; }
    outEdo.innerHTML = "<p class='fineprint'>" + hits.length + (hits.length >= 50 ? " (first 50)" : "") + " match(es):</p>" + hits.map(u => {
      const slug = u.l.toLowerCase().replace(/ /g, "-");
      return '<div class="result"><span class="code">' + u.c + '</span> - <b>' + escEdo(u.n) + '</b><br><span class="muted">' + escEdo(u.w) + ', ' + escEdo(u.l) + '</span> &middot; <a class="link" href="lga/' + slug + '.html#' + u.c + '">Open in ' + escEdo(u.l) + '</a></div>';
    }).join("");
  });
}
function escEdo(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }

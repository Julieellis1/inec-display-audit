let UNITS_ENUGU = null;
async function loadUnitsEnugu() { if (UNITS_ENUGU) return UNITS_ENUGU; const r = await fetch("assets/units-enugu.json"); UNITS_ENUGU = await r.json(); return UNITS_ENUGU; }
const boxEnugu = document.getElementById("q"), outEnugu = document.getElementById("results");
if (boxEnugu) {
  boxEnugu.addEventListener("input", async () => {
    const q = boxEnugu.value.trim().toLowerCase();
    if (q.length < 2) { outEnugu.innerHTML = ""; return; }
    const units = await loadUnitsEnugu();
    const hits = units.filter(u => u.c.toLowerCase().includes(q) || u.n.toLowerCase().includes(q) || u.w.toLowerCase().includes(q) || u.l.toLowerCase().includes(q)).slice(0, 50);
    if (!hits.length) { outEnugu.innerHTML = '<p class="fineprint">No polling unit matches that search in Enugu.</p>'; return; }
    outEnugu.innerHTML = "<p class='fineprint'>" + hits.length + (hits.length >= 50 ? " (first 50)" : "") + " match(es):</p>" + hits.map(u => {
      const slug = u.l.toLowerCase().replace(/ /g, "-");
      return '<div class="result"><span class="code">' + u.c + '</span> - <b>' + escEnugu(u.n) + '</b><br><span class="muted">' + escEnugu(u.w) + ', ' + escEnugu(u.l) + '</span> &middot; <a class="link" href="lga/' + slug + '.html#' + u.c + '">Open in ' + escEnugu(u.l) + '</a></div>';
    }).join("");
  });
}
function escEnugu(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }

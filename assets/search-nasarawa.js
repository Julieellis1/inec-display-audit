let UNITS_NASARAWA = null;
async function loadUnitsNasarawa() { if (UNITS_NASARAWA) return UNITS_NASARAWA; const r = await fetch("assets/units-nasarawa.json"); UNITS_NASARAWA = await r.json(); return UNITS_NASARAWA; }
const boxNasarawa = document.getElementById("q"), outNasarawa = document.getElementById("results");
if (boxNasarawa) {
  boxNasarawa.addEventListener("input", async () => {
    const q = boxNasarawa.value.trim().toLowerCase();
    if (q.length < 2) { outNasarawa.innerHTML = ""; return; }
    const units = await loadUnitsNasarawa();
    const hits = units.filter(u => u.c.toLowerCase().includes(q) || u.n.toLowerCase().includes(q) || u.w.toLowerCase().includes(q) || u.l.toLowerCase().includes(q)).slice(0, 50);
    if (!hits.length) { outNasarawa.innerHTML = '<p class="fineprint">No polling unit matches that search in Nasarawa.</p>'; return; }
    outNasarawa.innerHTML = "<p class='fineprint'>" + hits.length + (hits.length >= 50 ? " (first 50)" : "") + " match(es):</p>" + hits.map(u => {
      const slug = u.l.toLowerCase().replace(/ /g, "-");
      return '<div class="result"><span class="code">' + u.c + '</span> - <b>' + escNasarawa(u.n) + '</b><br><span class="muted">' + escNasarawa(u.w) + ', ' + escNasarawa(u.l) + '</span> &middot; <a class="link" href="lga/' + slug + '.html#' + u.c + '">Open in ' + escNasarawa(u.l) + '</a></div>';
    }).join("");
  });
}
function escNasarawa(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }

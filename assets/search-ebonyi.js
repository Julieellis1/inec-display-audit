let UNITS_EBONYI = null;
async function loadUnitsEbonyi() { if (UNITS_EBONYI) return UNITS_EBONYI; const r = await fetch("assets/units-ebonyi.json"); UNITS_EBONYI = await r.json(); return UNITS_EBONYI; }
const boxEbonyi = document.getElementById("q"), outEbonyi = document.getElementById("results");
if (boxEbonyi) {
  boxEbonyi.addEventListener("input", async () => {
    const q = boxEbonyi.value.trim().toLowerCase();
    if (q.length < 2) { outEbonyi.innerHTML = ""; return; }
    const units = await loadUnitsEbonyi();
    const hits = units.filter(u => u.c.toLowerCase().includes(q) || u.n.toLowerCase().includes(q) || u.w.toLowerCase().includes(q) || u.l.toLowerCase().includes(q)).slice(0, 50);
    if (!hits.length) { outEbonyi.innerHTML = '<p class="fineprint">No polling unit matches that search in Ebonyi.</p>'; return; }
    outEbonyi.innerHTML = "<p class='fineprint'>" + hits.length + (hits.length >= 50 ? " (first 50)" : "") + " match(es):</p>" + hits.map(u => {
      const slug = u.l.toLowerCase().replace(/ /g, "-");
      return '<div class="result"><span class="code">' + u.c + '</span> - <b>' + escEbonyi(u.n) + '</b><br><span class="muted">' + escEbonyi(u.w) + ', ' + escEbonyi(u.l) + '</span> &middot; <a class="link" href="lga/' + slug + '.html#' + u.c + '">Open in ' + escEbonyi(u.l) + '</a></div>';
    }).join("");
  });
}
function escEbonyi(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }

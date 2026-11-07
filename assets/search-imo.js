let UNITS_IMO = null;
async function loadUnitsImo() { if (UNITS_IMO) return UNITS_IMO; const r = await fetch("assets/units-imo.json"); UNITS_IMO = await r.json(); return UNITS_IMO; }
const boxImo = document.getElementById("q"), outImo = document.getElementById("results");
if (boxImo) {
  boxImo.addEventListener("input", async () => {
    const q = boxImo.value.trim().toLowerCase();
    if (q.length < 2) { outImo.innerHTML = ""; return; }
    const units = await loadUnitsImo();
    const hits = units.filter(u => u.c.toLowerCase().includes(q) || u.n.toLowerCase().includes(q) || u.w.toLowerCase().includes(q) || u.l.toLowerCase().includes(q)).slice(0, 50);
    if (!hits.length) { outImo.innerHTML = '<p class="fineprint">No polling unit matches that search in Imo.</p>'; return; }
    outImo.innerHTML = "<p class='fineprint'>" + hits.length + (hits.length >= 50 ? " (first 50)" : "") + " match(es):</p>" + hits.map(u => {
      const slug = u.l.toLowerCase().replace(/ /g, "-");
      return '<div class="result"><span class="code">' + u.c + '</span> - <b>' + escImo(u.n) + '</b><br><span class="muted">' + escImo(u.w) + ', ' + escImo(u.l) + '</span> &middot; <a class="link" href="lga/' + slug + '.html#' + u.c + '">Open in ' + escImo(u.l) + '</a></div>';
    }).join("");
  });
}
function escImo(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }

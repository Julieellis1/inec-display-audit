let UNITS_CROSSRIVER = null;
async function loadUnitsCrossRiver() { if (UNITS_CROSSRIVER) return UNITS_CROSSRIVER; const r = await fetch("assets/units-cross-river.json"); UNITS_CROSSRIVER = await r.json(); return UNITS_CROSSRIVER; }
const boxCrossRiver = document.getElementById("q"), outCrossRiver = document.getElementById("results");
if (boxCrossRiver) {
  boxCrossRiver.addEventListener("input", async () => {
    const q = boxCrossRiver.value.trim().toLowerCase();
    if (q.length < 2) { outCrossRiver.innerHTML = ""; return; }
    const units = await loadUnitsCrossRiver();
    const hits = units.filter(u => u.c.toLowerCase().includes(q) || u.n.toLowerCase().includes(q) || u.w.toLowerCase().includes(q) || u.l.toLowerCase().includes(q)).slice(0, 50);
    if (!hits.length) { outCrossRiver.innerHTML = '<p class="fineprint">No polling unit matches that search in Cross River.</p>'; return; }
    outCrossRiver.innerHTML = "<p class='fineprint'>" + hits.length + (hits.length >= 50 ? " (first 50)" : "") + " match(es):</p>" + hits.map(u => {
      const slug = u.l.toLowerCase().replace(/ /g, "-");
      return '<div class="result"><span class="code">' + u.c + '</span> - <b>' + escCrossRiver(u.n) + '</b><br><span class="muted">' + escCrossRiver(u.w) + ', ' + escCrossRiver(u.l) + '</span> &middot; <a class="link" href="lga/' + slug + '.html#' + u.c + '">Open in ' + escCrossRiver(u.l) + '</a></div>';
    }).join("");
  });
}
function escCrossRiver(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }

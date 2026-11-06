let UNITS_ANAMBRA = null;
async function loadUnitsAnambra() { if (UNITS_ANAMBRA) return UNITS_ANAMBRA; const r = await fetch("assets/units-anambra.json"); UNITS_ANAMBRA = await r.json(); return UNITS_ANAMBRA; }
const boxAnambra = document.getElementById("q"), outAnambra = document.getElementById("results");
if (boxAnambra) {
  boxAnambra.addEventListener("input", async () => {
    const q = boxAnambra.value.trim().toLowerCase();
    if (q.length < 2) { outAnambra.innerHTML = ""; return; }
    const units = await loadUnitsAnambra();
    const hits = units.filter(u => u.c.toLowerCase().includes(q) || u.n.toLowerCase().includes(q) || u.w.toLowerCase().includes(q) || u.l.toLowerCase().includes(q)).slice(0, 50);
    if (!hits.length) { outAnambra.innerHTML = '<p class="fineprint">No polling unit matches that search in Anambra.</p>'; return; }
    outAnambra.innerHTML = "<p class='fineprint'>" + hits.length + (hits.length >= 50 ? " (first 50)" : "") + " match(es):</p>" + hits.map(u => {
      const slug = u.l.toLowerCase().replace(/ /g, "-");
      return '<div class="result"><span class="code">' + u.c + '</span> - <b>' + escAnambra(u.n) + '</b><br><span class="muted">' + escAnambra(u.w) + ', ' + escAnambra(u.l) + '</span> &middot; <a class="link" href="lga/' + slug + '.html#' + u.c + '">Open in ' + escAnambra(u.l) + '</a></div>';
    }).join("");
  });
}
function escAnambra(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }

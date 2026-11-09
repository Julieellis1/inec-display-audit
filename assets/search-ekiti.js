let UNITS_EKITI = null;
async function loadUnitsEkiti() { if (UNITS_EKITI) return UNITS_EKITI; const r = await fetch("assets/units-ekiti.json"); UNITS_EKITI = await r.json(); return UNITS_EKITI; }
const boxEkiti = document.getElementById("q"), outEkiti = document.getElementById("results");
if (boxEkiti) {
  boxEkiti.addEventListener("input", async () => {
    const q = boxEkiti.value.trim().toLowerCase();
    if (q.length < 2) { outEkiti.innerHTML = ""; return; }
    const units = await loadUnitsEkiti();
    const hits = units.filter(u => u.c.toLowerCase().includes(q) || u.n.toLowerCase().includes(q) || u.w.toLowerCase().includes(q) || u.l.toLowerCase().includes(q)).slice(0, 50);
    if (!hits.length) { outEkiti.innerHTML = '<p class="fineprint">No polling unit matches that search in Ekiti.</p>'; return; }
    outEkiti.innerHTML = "<p class='fineprint'>" + hits.length + (hits.length >= 50 ? " (first 50)" : "") + " match(es):</p>" + hits.map(u => {
      return '<div class="result"><span class="code">' + u.c + '</span> - <b>' + escEkiti(u.n) + '</b><br><span class="muted">' + escEkiti(u.w) + ', ' + escEkiti(u.l) + '</span> &middot; <a class="link" href="lga/' + u.s + '.html#' + u.c + '">Open in ' + escEkiti(u.l) + '</a></div>';
    }).join("");
  });
}
function escEkiti(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }

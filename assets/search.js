let UNITS=null;
async function loadUnits(){if(UNITS)return UNITS;const r=await fetch("assets/units.json");UNITS=await r.json();return UNITS;}
const box=document.getElementById("q"),out=document.getElementById("results");
if(box){box.addEventListener("input",async()=>{const q=box.value.trim().toLowerCase();if(q.length<2){out.innerHTML="";return;}
const units=await loadUnits();const hits=units.filter(u=>u.c.toLowerCase().includes(q)||u.n.toLowerCase().includes(q)||u.w.toLowerCase().includes(q)||u.l.toLowerCase().includes(q)).slice(0,50);
if(!hits.length){out.innerHTML="<p>No polling unit matches that search in Abia.</p>";return;}
out.innerHTML="<p>"+hits.length+(hits.length>=50?" (first 50)":"")+" match(es):</p>"+hits.map(u=>{const slug=u.l.toLowerCase().replace(/ /g,"-");return '<div class="result"><span class="code">'+u.c+'</span> - <b>'+esc(u.n)+'</b><br>'+esc(u.w)+', '+esc(u.l)+' &middot; <a href="lga/'+slug+'.html#'+u.c+'">Open in '+esc(u.l)+'</a></div>';}).join("");});}
function esc(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");}

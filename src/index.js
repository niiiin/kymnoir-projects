const projects = [
  { slug: "sanglung", name: "Sanglung Villas", detail: "Guest experience prototype", status: "Preparing" },
  { slug: "time", name: "KYM TIME", detail: "Universal time concept", status: "Preparing" },
  { slug: "atlas", name: "Atlas", detail: "Experimental workspace", status: "Preparing" }
];
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function page(title, body) {
 return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#0c1018"><title>${esc(title)} · KYM NOIR</title><style>
 :root{color-scheme:dark}*{box-sizing:border-box}body{margin:0;background:#0c1018;color:#f5f4f2;font-family:system-ui,-apple-system,sans-serif}main{max-width:860px;margin:0 auto;padding:8vh 24px}a{color:inherit;text-decoration:none}.brand{font-size:12px;letter-spacing:.28em;color:#b5a1f6;font-weight:800}.eyebrow{color:#a8a9b2}h1{font-size:clamp(38px,8vw,70px);line-height:1.05;margin:26px 0}p{line-height:1.7}.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;margin-top:40px}.card{border:1px solid #343844;border-radius:18px;padding:24px;background:#171b26;display:block}.card:hover{border-color:#a38fe8}.card h2{margin:10px 0;font-size:23px}.tag{font-size:12px;color:#c2adff}.muted{color:#a8a9b2}footer{margin-top:70px;color:#888c98;font-size:12px}</style></head><body><main><a class="brand" href="/projects">KYM NOIR / PROJECTS</a>${body}<footer>Prototype workspace · No guest orders or payments are accepted here.</footer></main></body></html>`;
}
export default { async fetch(request) {
 const url = new URL(request.url);
 let path = decodeURIComponent(url.pathname).replace(/\/+$/, "") || "/";
 if (path === "/") return Response.redirect(url.origin + "/projects", 302);
 if (path === "/projects") {
  const cards = projects.map(p => `<a class="card" href="/projects/${p.slug}"><span class="tag">${p.status}</span><h2>${esc(p.name)}</h2><p class="muted">${esc(p.detail)}</p><span aria-hidden="true">Explore →</span></a>`).join("");
  return new Response(page("Projects", `<h1>Ideas in motion.</h1><p class="eyebrow">Our live development playground. Choose a project below.</p><div class="cards">${cards}</div>`), {headers:{"content-type":"text/html; charset=utf-8","cache-control":"no-store"}});
 }
 const match = /^\/projects\/([a-z0-9-]+)$/.exec(path);
 const project = match && projects.find(p=>p.slug===match[1]);
 if (project) return new Response(page(project.name, `<p class="eyebrow">← <a href="/projects">All projects</a></p><h1>${esc(project.name)}</h1><p>${esc(project.detail)}</p><p class="muted">This is a temporary project landing page. The interactive prototype is being prepared.</p>`),{headers:{"content-type":"text/html; charset=utf-8","cache-control":"no-store"}});
 return new Response(page("Not found",'<h1>Page not found.</h1><p><a href="/projects">Back to projects →</a></p>'),{status:404,headers:{"content-type":"text/html; charset=utf-8"}});
}};

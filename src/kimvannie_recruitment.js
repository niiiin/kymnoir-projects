// Staging-only recruiter downloads. Do not merge until factual and visual review.
const data = {
  introduction: {
    title: "EXECUTIVE INTRODUCTION | RECRUITMENT & PERSONAL PITCH",
    filename: "Kim_Rene_van_Nie_Welcome_and_Pitch.pdf",
    groups: [
      ["WELCOME", "I am an international owner-operator with more than 25 years developing, opening and running hospitality businesses in Europe, Southeast Asia and the Caribbean. I connect property, people, logistics and commercial accountability, often where a principal needs trusted execution."],
      ["RECRUITER INTRODUCTION", "I welcome confidential discussions about principal-side property and private-office operations, owner representation, hospitality development, pre-opening, repositioning and selected international leadership roles. I have personally developed and operated properties across Indonesia, Spain and Aruba, taking accountability for teams, budgets, projects and guest experience."],
      ["WHAT I OFFER", "For a family office: international property oversight, discreet problem-solving, specialist supplier coordination and calm execution. For an investment group: development-stage judgement, contractor coordination, pre-opening, commercial stabilisation and practical owner-side management."],
      ["PERSONAL PITCH", "I have never only managed somebody else's investment. I have lived with the consequences of my own. That shapes how I assess risk, read a budget, solve an operational problem and communicate with the person whose resources are at stake. I build the team and systems to make the result sustainable."],
      ["CONFIDENTIAL ENQUIRIES", "Kim René van Nie | kym90nize@gmail.com"]
    ]
  },
  principal: {
    title: "PRINCIPAL & PRIVATE OFFICE OPERATIONS | PROPERTY OVERSIGHT",
    filename: "Kim_Rene_van_Nie_Principal_Private_Office.pdf",
    groups: [
      ["PROFILE", "International hospitality founder, developer and owner-operator with more than 25 years across Indonesia, Spain and Aruba. Practical high-trust property operations, international movements, logistics, people, budgets and discreet service."],
      ["CORE CAPABILITIES", "Property and estate operations; supplier and contractor oversight; recruitment and team leadership; owner reporting and budgets; travel logistics; guest privacy and bespoke VIP service."],
      ["SANGLUNG VILLAS & SUITES | NORTH BALI | 2014-PRESENT", "Founder, co-owner, developer and General Manager. Developed initial villa operations into a destination resort with about 15 operational accommodation units, restaurant and bar, infinity pool and wellness amenities. Leads people, procurement, commercial strategy and guest service, while major capital decisions are jointly governed with an equal partner."],
      ["ABCYOU & ZALAMERA | VALENCIA, SPAIN", "Founded and operated two boutique accommodation businesses, with 17 and 16 rooms respectively. Coordinated development and opening, teams, pricing, service standards, and delegated local operations. Major Zalamera building development was investor-financed."],
      ["ARUBA & BALI | PRIVATE RENTAL VILLAS", "Commercial villa development, fitting out, international furniture sourcing and shipping, supplier management, rental operations and guest readiness across differing ownership structures."],
      ["HIGH-TRUST & INTERNATIONAL EXPERIENCE", "Hosted governors and members of parliament; coordinated specialist authorised transport and security arrangements. Location transport/logistics on The Bridge of San Luis Rey (2003), personally supporting Mary McGuckian, Kathy Bates, Geraldine Chaplin and Yvonne Blake. On-site production logistics for a major Unilever leadership event."],
      ["EARLIER EXPERIENCE", "Opening Bar Manager, Soho Amsterdam; nightlife operations in the Netherlands and Barcelona; airline passenger service, reservations, ticketing and complaint handling; publishing and media projects."],
      ["LANGUAGES & CREDENTIALS", "Dutch native; fluent English and Spanish; conversational Indonesian. Microsoft Certified Systems Engineer (MCSE), professional certification. Dutch/EU citizen, internationally mobile."]
    ]
  },
  owner: {
    title: "OWNER'S REPRESENTATIVE | HOSPITALITY DEVELOPMENT & OPERATIONS",
    filename: "Kim_Rene_van_Nie_Owners_Representative.pdf",
    groups: [
      ["PROFILE", "International hospitality founder, developer, investor and operator with 25+ years in Southeast Asia, Europe and the Caribbean. Takes opportunities from initial concept and feasibility through design briefs, project coordination, procurement, opening and commercial operation."],
      ["CORE CAPABILITIES", "Opportunity appraisal; owner representation; independent legal and technical due diligence; site and community coordination; design and procurement oversight; recruitment; pre-opening; P&L and commercial strategy; multi-property leadership."],
      ["SANGLUNG VILLAS & SUITES | NORTH BALI | 2014-PRESENT", "Founder, co-owner, developer and General Manager. From three initial villas to around 15 operational suites and villas, with restaurant/bar, 25-metre infinity pool, spa, gym and yoga facilities. Worked with local stakeholders on site access and utilities, contractors and design teams. Led 2025 reopening and repositioning within equal-partner investment governance."],
      ["ABCYOU & ZALAMERA | VALENCIA, SPAIN", "Founded and developed two boutique businesses with 17 and 16 rooms respectively; guided concept, works coordination, openings, service operations and strategic commercial oversight. Zalamera building redevelopment was principally investor-funded."],
      ["ARUBA & BALI VILLAS", "Developed, fitted out and operated private rental villas; contractor and supplier coordination, furnishing design, international sourcing and shipping, rental operations and selected property exits."],
      ["RELATED ENTREPRENEURSHIP", "Minority angel investor in Brancheteers Holding / sneleentaxi.nl, with share exit completed November 2017. Earlier bar management, tourism publishing, media production, film and international event logistics."],
      ["OPERATING APPROACH", "Owner-minded accountability; candid risk reporting, legal and specialist diligence, thoughtful commercial feasibility, close attention to property condition and guest proposition, cost control and delegated operating leadership."],
      ["LANGUAGES & MOBILITY", "Dutch native; fluent English and Spanish; conversational Indonesian. Dutch/EU citizen; internationally mobile. Microsoft Certified Systems Engineer (MCSE), professional certification."]
    ]
  }
};
const safe = x => String(x).replace(/[‘’]/g,"'").replace(/[“”]/g,'"').replace(/[–—]/g,'-').replace(/•/g,'-').replace(/[^\x20-\x7E\xC0-\xFF]/g,'');
const esc = x => safe(x).replace(/\\/g,'\\\\').replace(/\(/g,'\\(').replace(/\)/g,'\\)');
function makePdf(which) {
  const d=data[which]; if(!d) return null;
  const pages=[];let lines=[],y=790;
  function place(t,size=10,bold=false){
    if(y<58){pages.push(lines.join('\n'));lines=[];y=790;}
    lines.push('BT /F'+(bold?'2':'1')+' '+size+' Tf 53 '+Math.round(y)+' Td ('+esc(t)+') Tj ET');
    y-=size*1.5;
  }
  function wrap(s,max){
    let a=[],line='';
    for(const w of safe(s).split(/\s+/)){if((line+' '+w).trim().length>max){if(line)a.push(line);line=w;}else line=(line+' '+w).trim();}
    if(line)a.push(line);return a;
  }
  place('KIM RENE VAN NIE',21,true); y-=7;
  for(const l of wrap(d.title,75))place(l,10,true);
  place('Bali, Indonesia  |  Dutch / EU citizen  |  Internationally mobile',9);
  place('Confidential enquiries: kym90nize@gmail.com',9);y-=12;
  for(const [heading,body] of d.groups){
    place(heading,10,true);
    for(const l of wrap(body,95))place(l,9.5);
    y-=7;
  }
  pages.push(lines.join('\n'));
  const objs=[];
  objs[1]='<< /Type /Catalog /Pages 2 0 R >>';
  objs[3]='<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>';
  objs[4]='<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>';
  const kids=[];
  pages.forEach((stream,i)=>{
    const cn=5+i*2,pn=6+i*2;kids.push(pn+' 0 R');
    objs[cn]='<< /Length '+stream.length+' >>\nstream\n'+stream+'\nendstream';
    objs[pn]='<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents '+cn+' 0 R >>';
  });
  objs[2]='<< /Type /Pages /Count '+pages.length+' /Kids ['+kids.join(' ')+'] >>';
  let pdf='%PDF-1.4\n',offsets=[0],max=objs.length-1;
  for(let i=1;i<=max;i++){offsets[i]=pdf.length;pdf+=i+' 0 obj\n'+objs[i]+'\nendobj\n';}
  const xref=pdf.length;
  pdf+='xref\n0 '+(max+1)+'\n0000000000 65535 f \n';
  for(let i=1;i<=max;i++) pdf+=String(offsets[i]).padStart(10,'0')+' 00000 n \n';
  pdf+='trailer\n<< /Size '+(max+1)+' /Root 1 0 R >>\nstartxref\n'+xref+'\n%%EOF';
  return new Response(Uint8Array.from(pdf,c=>c.charCodeAt(0)),{headers:{'content-type':'application/pdf','content-disposition':'attachment; filename="'+d.filename+'"','cache-control':'no-store'}});
}
export function executiveResponse(path) {
  if(path==='/kimvannie/cv/principal.pdf')return makePdf('principal');
  if(path==='/kimvannie/cv/owner-side.pdf')return makePdf('owner');
  if(path==='/kimvannie/cv/introduction.pdf')return makePdf('introduction');
  if(path==='/kimvannie/recruitment'){
    const h=String.raw`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Kim René van Nie | Executive Introduction</title><style>body{margin:0;background:#171b1b;color:#f2eee7;font-family:Arial,sans-serif}main{max-width:980px;padding:35px;margin:auto}header{padding:20px 0;border-bottom:1px solid #58544a;letter-spacing:.19em}h1,h2{font-family:Georgia,serif;font-weight:400}h1{font-size:clamp(45px,8vw,85px);line-height:1.04;margin:75px 0 30px}em{color:#c7aa79}p{color:#dedbd3;line-height:1.75;font-size:17px;max-width:790px}.tag{font-size:11px;letter-spacing:.25em;color:#c7aa79;text-transform:uppercase}.section{margin-top:75px;border-top:1px solid #4c4942;padding-top:34px}h2{font-size:38px}.grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}.card{padding:25px;border:1px solid #4c4942;background:#202525}.card h3{font-family:Georgia,serif;font-size:25px;font-weight:400}.card p{font-size:14px}.btn{display:inline-block;border:1px solid #c7aa79;padding:13px 17px;text-decoration:none;color:#e7c996;text-transform:uppercase;font-size:11px;letter-spacing:.12em;margin-top:16px}footer{margin-top:75px;padding:20px 0;border-top:1px solid #4c4942;color:#a8a49b;font-size:11px}@media(max-width:700px){main{padding:20px}.grid{grid-template-columns:1fr}h1{margin-top:48px}}</style></head><body><main><header>KIM RENÉ VAN NIE</header><section><p class="tag">International owner-operator · principal-side leadership</p><h1>Five steps ahead.<br>One call away.<br><em>Zero noise.</em></h1><p>More than 25 years building, opening and operating hospitality businesses across Europe, Southeast Asia and the Caribbean. I work where property, people, logistics and commercial responsibility meet. I value direct communication, discretion and owner-minded accountability.</p></section><section class="section"><p class="tag">A private introduction</p><h2>From the decision to the delivery.</h2><p>My career has not followed a conventional corporate path. I have built and operated villas, boutique hotels and a destination resort; coordinated development, sourcing and property operations; supported high-profile guests and international productions; and led teams in several countries.</p><p>For a principal or investment group, I can evaluate a challenge, bring together the right specialists, and make execution dependable while the person whose time and capital are involved remains informed.</p></section><section class="section"><p class="tag">Curriculum vitae</p><h2>Choose the relevant profile.</h2><div class="grid"><div class="card"><h3>Principal & Private Office Operations</h3><p>Private property oversight, international operations, discreet guest experience, contractor management, mobility and practical problem-solving.</p><a class="btn" href="/kimvannie/cv/principal.pdf">Download PDF</a></div><div class="card"><h3>Owner's Representative & Hospitality Development</h3><p>Owner-side development, pre-opening, repositioning, multi-property operations, commercial responsibility and operational leadership.</p><a class="btn" href="/kimvannie/cv/owner-side.pdf">Download PDF</a></div></div><p style="margin-top:28px"><a class="btn" href="/kimvannie/cv/introduction.pdf">Download the welcome letter & personal pitch · PDF</a></p></section><section class="section"><p class="tag">Confidential enquiries</p><h2>Let's discuss the mandate.</h2><p>I welcome relevant international assignments involving principals, private property portfolios, owner representation and selected senior hospitality roles.</p><a class="btn" href="mailto:kym90nize@gmail.com?subject=Private%20Executive%20Introduction">Contact directly</a></section><footer>Kim René van Nie · 2026 · Private executive introduction</footer></main></body></html>`;
    return new Response(h,{headers:{'content-type':'text/html; charset=utf-8','cache-control':'no-store'}});
  }
  return null;
}

import { growHtml } from "./grow.js";
import { landscapeHtml } from "./landscape.js";
import { kymGmHtml } from "./kymgm.js";
import { housekeepingHtml } from "./housekeeping.js";
import { posHtml } from "./pos.js";
import original from "./index.js";

const mainSiteHtml = "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<meta name=\"viewport\" content=\"width=device-width,initial-scale=1,viewport-fit=cover\">\n<meta name=\"theme-color\" content=\"#070707\">\n<title>KYM NOIR</title>\n<style>\n:root{--bg:#070707;--panel:#0d0d0d;--line:#242424;--text:#f5f0e7;--muted:#99938c;--gold:#c9a66b;--red:#e9182e}\n*{box-sizing:border-box}\nhtml{background:var(--bg)}\nbody{margin:0;background:var(--bg);color:var(--text);font-family:Arial,Helvetica,sans-serif}\n.wrap{max-width:1480px;margin:auto;padding:0 28px}\n.nav{height:76px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #1b1b1b;position:sticky;top:0;background:#070707eb;backdrop-filter:blur(14px);z-index:20}\n.brand{font-size:20px;letter-spacing:.42em;font-weight:700}\n.brand span{color:var(--red)}\n.nav a{color:#d9d5ce;text-decoration:none;font-size:12px;letter-spacing:.18em;text-transform:uppercase}\n.links{display:flex;gap:24px;align-items:center}\n.hero{padding:88px 0 68px;border-bottom:1px solid var(--line);display:grid;grid-template-columns:minmax(0,1.25fr) minmax(280px,.75fr);gap:70px;align-items:end}\n.eyebrow{font-size:12px;letter-spacing:.32em;text-transform:uppercase;color:var(--gold);font-weight:700}\n.hero h1{font-family:Georgia,'Times New Roman',serif;font-size:clamp(68px,11vw,170px);line-height:.82;letter-spacing:-.055em;margin:24px 0 30px;font-weight:500}\n.hero p{max-width:650px;color:#b8b2aa;font-family:Georgia,'Times New Roman',serif;font-size:20px;line-height:1.55;margin:0}\n.hero-note{border-left:1px solid #40372d;padding-left:24px;color:#8e8881;font-size:13px;line-height:1.7}\n.hero-note b{color:#eee8de;display:block;margin-bottom:10px;letter-spacing:.08em;text-transform:uppercase}\n.section-head{padding:54px 0 30px;display:flex;justify-content:space-between;align-items:end;gap:30px}\n.section-head h2{font-family:Georgia,'Times New Roman',serif;font-size:42px;font-weight:500;margin:8px 0}\n.section-head p{margin:0;color:var(--muted);max-width:520px;line-height:1.6}\n.grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:16px;padding-bottom:80px}\n.art{aspect-ratio:1/1;background:#101010;background-size:500% 400%;border:1px solid #202020;overflow:hidden;position:relative;transition:transform .2s ease,border-color .2s ease}\n.art:before{content:\"\";position:absolute;inset:0;background:linear-gradient(115deg,#0d0d0d,#17120f);z-index:-1}\n.art:hover{transform:translateY(-2px);border-color:#4c4032}\n.c1{background-position:0% 0%}.c2{background-position:25% 0%}.c3{background-position:50% 0%}.c4{background-position:75% 0%}.c5{background-position:100% 0%}\n.c6{background-position:0% 33.333%}.c7{background-position:25% 33.333%}.c8{background-position:50% 33.333%}.c9{background-position:75% 33.333%}.c10{background-position:100% 33.333%}\n.c11{background-position:0% 66.666%}.c12{background-position:25% 66.666%}.c13{background-position:50% 66.666%}.c14{background-position:75% 66.666%}.c15{background-position:100% 66.666%}\n.c16{background-position:0% 100%}.c17{background-position:25% 100%}.c18{background-position:50% 100%}.c19{background-position:75% 100%}.c20{background-position:100% 100%}\n.more{border:1px solid var(--line);min-height:180px;margin:0 0 82px;padding:34px;display:flex;align-items:end;justify-content:space-between;background:linear-gradient(135deg,#0c0c0c,#12100d)}\n.more h3{font-family:Georgia,'Times New Roman',serif;font-size:36px;font-weight:500;margin:0 0 8px}\n.more p{color:var(--muted);margin:0;max-width:600px;line-height:1.6}\n.pill{display:inline-block;border:1px solid #4c4235;padding:13px 18px;color:#ead7b8;text-decoration:none;text-transform:uppercase;letter-spacing:.16em;font-size:11px;white-space:nowrap}\n.footer{border-top:1px solid var(--line);padding:30px 0 45px;color:#6f6a64;font-size:11px;letter-spacing:.16em;text-transform:uppercase;display:flex;justify-content:space-between;gap:20px}\n.footbrand{color:#c9c2b8}.footbrand span{color:var(--red)}\n.loading{grid-column:1/-1;color:#736e68;font-size:12px;letter-spacing:.15em;text-transform:uppercase;padding:10px 0}\n@media(max-width:1050px){.grid{grid-template-columns:repeat(4,1fr)}.hero{grid-template-columns:1fr}.hero-note{max-width:600px}}\n@media(max-width:760px){\n.wrap{padding:0 16px}.nav{height:64px}.brand{font-size:16px}.links a:not(:last-child){display:none}.links{gap:12px}\n.hero{padding:56px 0 45px;gap:34px}.hero h1{font-size:clamp(64px,23vw,110px)}.hero p{font-size:18px}\n.section-head{padding-top:42px;align-items:start;flex-direction:column}.grid{grid-template-columns:repeat(2,1fr);gap:9px;padding-bottom:50px}\n.more{padding:24px;display:block}.more h3{font-size:30px}.more .pill{margin-top:24px}.footer{display:block;line-height:2}\n}\n</style>\n</head>\n<body>\n<div class=\"wrap\">\n<nav class=\"nav\">\n  <div class=\"brand\">KYM <span>NOIR</span></div>\n  <div class=\"links\"><a href=\"#collection\">Collection</a><a href=\"/projects\">Projects</a></div>\n</nav>\n\n<section class=\"hero\">\n  <div>\n    <div class=\"eyebrow\">Music · DJ · Visual archive</div>\n    <h1>KYM<br>NOIR</h1>\n    <p>A first look at the work. Music, covers, visual ideas and stories built around the KYM NOIR world.</p>\n  </div>\n  <div class=\"hero-note\">\n    <b>Work in progress</b>\n    This is not the full catalogue. It is the first small part of a much larger collection, with more releases, music, visuals and projects still being added.\n  </div>\n</section>\n\n<section id=\"collection\">\n  <div class=\"section-head\">\n    <div><div class=\"eyebrow\">Archive 001</div><h2>The collection</h2></div>\n    <p>Mostly singles. Different chapters, cities and moods. Presented here simply, side by side, as the archive grows.</p>\n  </div>\n  <div class=\"grid\" id=\"artGrid\">\n    <div class=\"loading\" id=\"loading\">Loading the first part of the archive…</div>\n    <div class=\"art c1\" aria-label=\"KYM NOIR artwork 1\"></div><div class=\"art c2\" aria-label=\"KYM NOIR artwork 2\"></div><div class=\"art c3\" aria-label=\"KYM NOIR artwork 3\"></div><div class=\"art c4\" aria-label=\"KYM NOIR artwork 4\"></div><div class=\"art c5\" aria-label=\"KYM NOIR artwork 5\"></div><div class=\"art c6\" aria-label=\"KYM NOIR artwork 6\"></div><div class=\"art c7\" aria-label=\"KYM NOIR artwork 7\"></div><div class=\"art c8\" aria-label=\"KYM NOIR artwork 8\"></div><div class=\"art c9\" aria-label=\"KYM NOIR artwork 9\"></div><div class=\"art c10\" aria-label=\"KYM NOIR artwork 10\"></div><div class=\"art c11\" aria-label=\"KYM NOIR artwork 11\"></div><div class=\"art c12\" aria-label=\"KYM NOIR artwork 12\"></div><div class=\"art c13\" aria-label=\"KYM NOIR artwork 13\"></div><div class=\"art c14\" aria-label=\"KYM NOIR artwork 14\"></div><div class=\"art c15\" aria-label=\"KYM NOIR artwork 15\"></div><div class=\"art c16\" aria-label=\"KYM NOIR artwork 16\"></div><div class=\"art c17\" aria-label=\"KYM NOIR artwork 17\"></div><div class=\"art c18\" aria-label=\"KYM NOIR artwork 18\"></div><div class=\"art c19\" aria-label=\"KYM NOIR artwork 19\"></div><div class=\"art c20\" aria-label=\"KYM NOIR artwork 20\"></div>\n  </div>\n</section>\n\n<section class=\"more\">\n  <div>\n    <div class=\"eyebrow\">Next</div>\n    <h3>Much more is coming.</h3>\n    <p>The site is being built in public. More artwork, audio, releases, private sets and the wider KYM NOIR story will follow.</p>\n  </div>\n  <a class=\"pill\" href=\"/projects\">Open projects</a>\n</section>\n\n<footer class=\"footer\"><div class=\"footbrand\">KYM <span>NOIR</span> · 2026</div><div>Music · Visuals · Stories</div></footer>\n</div>\n<script>\n(async()=>{\n  try{\n    const base='https://raw.githubusercontent.com/niiiin/kymnoir-projects/main/assets/site/';\n    const jobs=[];\n    for(let i=1;i<=10;i++) jobs.push(fetch(base+'c'+String(i).padStart(2,'0')+'.txt',{cache:'no-store'}).then(r=>{if(!r.ok)throw new Error('art '+i);return r.text()}));\n    const b64=(await Promise.all(jobs)).join('');\n    const bg='url(\"data:image/webp;base64,'+b64+'\")';\n    document.querySelectorAll('.art').forEach(el=>el.style.backgroundImage=bg);\n    document.getElementById('loading')?.remove();\n  }catch(e){\n    const n=document.getElementById('loading');\n    if(n)n.textContent='Archive artwork is loading. Refresh once if needed.';\n  }\n})();\n</script>\n</body></html>";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, "") || "/";
    if (path === "/") {
      return new Response(mainSiteHtml, {
        headers: {
          "content-type": "text/html; charset=utf-8",
          "cache-control": "no-store"
        }
      });
    }
    if (path === "/kimvannie") {
      try {
        const base = "https://raw.githubusercontent.com/niiiin/kymnoir-projects/main/assets/kimvannie/";
        const pieces = await Promise.all(Array.from({ length: 9 }, async (_, i) => {
          const part = "part-" + String(i).padStart(2, "0") + ".txt";
          const res = await fetch(base + part, { cf: { cacheEverything: true, cacheTtl: 3600 } });
          if (!res.ok) throw new Error("Presentation component unavailable: " + part);
          return res.text();
        }));
        let portraitHtml = pieces.join("");
        const revisions = [["<title>Kim René van Nie | A Private Executive Introduction</title>","<title>Kim René van Nie | A private introduction</title>"],["Kim René van Nie · A private executive introduction","Kim René van Nie · A private introduction"],["Five steps ahead.<br/><em>One call away.</em>","I make complicated things<br/><em>happen quietly.</em>"],["I don't specialise in one industry. I specialise in making complicated things possible.","I make complicated things happen quietly, so the person I work for never has to think about them."],["Operational leverage.","Discreet by habit."],["\"The principal makes the decision. My job is to make execution feel effortless.\"","\"Discreet by habit. What I see stays with me.\""],["Founded, developed and manage an approximately 20-key luxury resort in North Bali, operated to five-star service standards. Private-pool villas and suites, restaurant, bar and spa. Personalised butler arrangements on request. Built from bare land with full operational and financial responsibility and a core team of approximately 50.","Founded, developed and run Sanglung Villas &amp; Suites in North Bali since 2014, built from bare land, with approximately 20 keys, full operational and financial responsibility and a core team of about 50."],["An operational example: when dry-season village water supply is insufficient, I arrange supplemental tanker deliveries to maintain water reserves and keep the resort running.","When dry-season village water supplies run short, I arrange tanker deliveries to keep reserves sufficient so guests never notice. At the beginning there was no adequate electricity connection. With approval from the village chief and help from local authorities, I arranged a temporary two-kilometre connection from a village building, allowing the first villas to operate. Persistent coordination later helped secure road improvements, water pipes, a water source and permanent PLN power poles along the route—benefiting nearby households and making further resort development possible."],["<div class=\"number\">2 × 17</div>","<div class=\"number\">17 + 16</div>"],["Founded and operated ABCyou and Zalamera, two boutique city hotels with 17 rooms each.","Founded and operated two boutique city hotels: ABCyou with 17 rooms and Zalamera with 16."],["<div class=\"number\">6 villas</div><strong>Private villas · Aruba &amp; Bali</strong><p>Developed, fitted out and operated two villas in Aruba and four in Ubud, Bali. Managed design, contractors, Indonesian sourcing, international shipping, procurement, guest readiness and eventual exits.</p>","<div class=\"number\">3 projects</div><strong>Private villas · Bali</strong><p><b>Deguna, Canggu:</b> leased and operated day to day, overseeing guests, staff and upkeep. <b>Ajun, Ubud:</b> built from the ground up, sold and operated. <b>Another Bali villa project:</b> built, sold and operated, from initial planning through guest readiness.</p>"],["Personally hosted high-profile guests, including governors and members of parliament. Where individually requested and appropriately authorised, helped organise discreet private arrangements, helicopter transport and police escorts. These were bespoke guest arrangements, not standard resort services.","Personally hosted high-profile guests, including governors and members of parliament. Arranged discreet, highly personalised services for private guests, including specialist transport and security coordination when requested and appropriately authorised."],["A conversation is where it begins","Some things are better discussed privately."],["Not the conventional candidate.","A private conversation."],["An experienced builder-operator with unconventional breadth. Open to a confidential conversation about principal operations, international mobility, exceptional private service and making difficult things happen.","For a confidential first conversation, write to kym90nize@gmail.com."],["Start a conversation ↗","Contact me directly ↗"]];
        for (const [oldText, newText] of revisions) {
          portraitHtml = portraitHtml.replace(oldText, newText);
        }

        // Editorial revisions approved 22 October 2026. Only text and existing HTML,
        // leaving media, typography, page layout, and noindex untouched.
        const editorial = [
          ["I make complicated things<br/><em>happen quietly.</em>", "Quietly. <em>Already handled.</em>"],
          ["I make complicated things happen quietly, so the person I work for never has to think about them.", "I make complicated things happen quietly, so the person I work for never has to think about them."],
          ["Discreet by habit. What I see stays with me.", "What I see stays with me."],
          ["My role is not to compete for the spotlight. It is to anticipate what the principal needs, reduce avoidable friction and create room for their most important decisions.", "My role is to anticipate what the principal needs, reduce avoidable friction and create room for their most important decisions."],
          ["Discreet · Mobile · Accountable", "Discreet · Mobile · Accountable · Available"],
          ["Born in Amsterdam, the Netherlands · ", ""],
          ["Written and produced by Kim René van Nie (KYM NØIR). AI was used to fine-tune the production.", "Written and produced by KYM NØIR, sung by a featured voice."],
          ["approximately 20 keys", "20 keys"],
          ["An internationally mobile builder-operator with more than 25 years across luxury hospitality, property development, film, creative business and international operations.", "An internationally mobile builder operator with a background in computer systems engineering and more than 25 years across luxury hospitality, property development, film and creative business. I have also worked as a television presenter and published a fashion and lifestyle magazine."],
          ["Some things are better discussed privately.", "Your life, running smoother."],
          ["A private conversation.", "Your time. Your headspace."],
          ["For a confidential first conversation, write to kym90nize@gmail.com.", "I take care of what you ask, with dependable availability and discretion, so your work and surroundings run smoothly. You get your time and your headspace back. For a confidential first conversation, write to kym90nize@gmail.com."],
          ["When dry-season village water supplies run short, I arrange tanker deliveries to keep reserves sufficient so guests never notice. At the beginning there was no adequate electricity connection. With approval from the village chief and help from local authorities, I arranged a temporary two-kilometre connection from a village building, allowing the first villas to operate. Persistent coordination later helped secure road improvements, water pipes, a water source and permanent PLN power poles along the route—benefiting nearby households and making further resort development possible.", "When the village water supply runs short, I arrange tanker deliveries so guests never notice. To start operating the first villas without adequate electricity, I arranged a temporary two kilometre connection with village approval. Continued coordination helped secure permanent PLN electricity, better access roads and water infrastructure, benefiting neighbours and enabling the resort's expansion."],
          ["Personally hosted high-profile guests, including governors and members of parliament. Arranged discreet, highly personalised services for private guests, including specialist transport and security coordination when requested and appropriately authorised.", "Personally hosted prominent private guests, including governors and members of parliament. Where requested and authorised, arranged discreet services including helicopter transport, police escorts and security coordination."],
          ["The wider cast included Academy Award winners Robert De Niro and F. Murray Abraham, as well as Harvey Keitel; these names are cast context, not a claim of personal transport.", ""],
          ["Signum Niehe Events received the Silver Gouden Giraffe for this event in 2003. This was an agency award, not an individual award.", ""],
          ["<a href=\"tel:+6282323141350\">+62 823 2314 1350</a>", ""],
          ["<div class=\"portrait-footnote\">A creative portrait of how I work. <em>“You might call it pressure. I call it oxygen.”</em></div>", "<div class=\"portrait-footnote\">A private introduction.</div>"],
          ["“You might call it pressure. I call it oxygen.”", ""],
          ["“Some people find their rhythm in routine.<br/><span style=\"color:var(--accent)\">I find mine in motion.”</span>", ""],
          ["builder-operator", "builder operator"],
          ["I have worked as a television presenter and published a fashion and lifestyle magazine.", "I have worked as a television presenter and published a fashion and lifestyle magazine."],
          ["last-minute", "last minute"],
          ["dry-season", "dry season"],
          ["two-kilometre", "two kilometre"],
          ["high-profile", "prominent"],
          ["High-profile", "Prominent"],
          ["event-production", "event production"],
          ["Western-themed", "Western themed"],
          ["team-building", "team building"],
          ["three-day", "three day"],
          ["on-location", "on location"],
          ["fine-tune", "refine"],
          ["2014—", "2014 "]
        ];
        for (const [a, b] of editorial) portraitHtml = portraitHtml.replaceAll(a, b);
        // Keep markup and embedded media intact; remove only visible punctuation and personal phone links.
        portraitHtml = portraitHtml.replaceAll("route—benefiting", "route, benefiting");
        // Address the future principal directly rather than imply a current employer.
        portraitHtml = portraitHtml.replaceAll(
          "I make complicated things happen quietly, so the person I work for never has to think about them.",
          "The person I'm looking for is a high-end individual, someone with a full, complicated life who values their time. I work smart and quick, and I make their thinking, their work and their surroundings run smoother."
        );
        portraitHtml = portraitHtml.replaceAll(
          "My role is to anticipate what the principal needs, reduce avoidable friction and create room for their most important decisions.",
          "What I offer: anticipating what you need, reducing avoidable friction and creating room for your most important decisions."
        );
        // Final approved cleanup: no changes to video, audio, font, layout or indexing.
        portraitHtml = portraitHtml.replace(
          'I take care of what you ask, with dependable availability and discretion, so your work and surroundings run smoothly. You get your time and your headspace back.',
          'I take care of what you ask, at any hour, any day of the year, so your thinking, your work and your surroundings simply run. You get your time and your headspace back.'
        );
        // Remove the remaining pressure/oxygen quote above the closing.
        portraitHtml = portraitHtml.replace(/<[^>]+>[^<>]*You might call it pressure\. I call it oxygen\.[^<>]*<\/[^>]+>/g, '');
        portraitHtml = portraitHtml.replaceAll('“You might call it pressure. I call it oxygen.”', '');
        // Convert family sentence punctuation into clean independent sentences.
        portraitHtml = portraitHtml.replace(
          'My father was director René van Nie; my mother worked in production and later became a TV producer and director, as did my stepfather; my sister is actress Nada van Nie.',
          'My father was director René van Nie. My mother worked in production and later became a TV producer and director, as did my stepfather. My sister is actress Nada van Nie.'
        );
        // Conflicting event records name different years and production companies.
        // Keep only the agreed, verifiable scope until the original event credit is checked.
        portraitHtml = portraitHtml.replace('Live events · Spain · 2003', 'Live events · Spain');
        portraitHtml = portraitHtml.replace(
          'Worked in event production logistics for a three day Unilever leadership event in Almería, Spain, produced by Signum Niehe Events for around 1,000 participants.',
          'Worked in event production logistics for a Unilever leadership event in Almería, Spain, for around 1,000 participants.'
        );

        // Final editorial rhythm pass, preserving visuals and privacy settings.
        const finalCopy = [
          ["The person I'm looking for is a high-end individual, someone with a full, complicated life who values their time. I work smart and quick, and I make their thinking, their work and their surroundings run smoother.", "I want to work for one person: someone with a full, complicated life who values their time. I work quickly and precisely, making their thinking, work and surroundings run smoother."],
          ["Property improvement, commercial operations, guest experience and multidisciplinary teams.", "I oversaw property improvements, commercial operations and guest experience while leading multidisciplinary teams."],
          ["<b>Another Bali villa project:</b>", "<b>A further private villa development in Bali:</b>"],
          ["Close enough to understand the context. Independent enough to execute. Experienced enough to recognise when a decision requires specialist advice.", "I stay close to the context while working independently. I also know when to bring in specialist advice."],
          ["The thinking has a soundtrack.", "An optional soundtrack."],
          ["Optional listening · Creative direction by Kim René van Nie", "Optional listening"],
          ["Personally supported director McGuckian, Kathy Bates, Geraldine Chaplin and costume designer Yvonne Blake. Blake, an Academy Award winner, also won the film’s 2005 Goya for Best Costume Design.", "Personally supported director McGuckian, Kathy Bates, Geraldine Chaplin and costume designer Yvonne Blake, who won the film’s 2005 Goya for Best Costume Design."],
          ["Raised in a Dutch film and television family. My father was director René van Nie. My mother worked in production and later became a TV producer and director, as did my stepfather. My sister is actress Nada van Nie.", "Raised in a Dutch film and television family. My father was director René van Nie. My mother worked in production before becoming a television producer and director. My stepfather also worked in television. My sister is actress Nada van Nie."],
          ["Your time. Your headspace.", "A confidential conversation."],
          ["You get your time and your headspace back. For a confidential first conversation, write to kym90nize@gmail.com.", "For a confidential first conversation, write to kym90nize@gmail.com."],
          ["<div class=\"portrait-footnote\">A private introduction.</div>", ""]
        ];
        for (const [a, b] of finalCopy) portraitHtml = portraitHtml.replaceAll(a, b);
        return new Response(portraitHtml, { headers: {
          "content-type": "text/html; charset=utf-8",
          "cache-control": "public, max-age=300",
          "x-robots-tag": "noindex, nofollow"
        } });
      } catch (e) {
        return new Response("This presentation is temporarily unavailable.", {status: 503, headers: { "content-type": "text/plain; charset=utf-8" }});
      }
    }
    if (path === "/projects/sanglung-pos") return new Response(posHtml, { headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" } });
    if (path === "/projects/sanglung-housekeeping") return new Response(housekeepingHtml, { headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" } });
    if (path === "/projects/kym-gm") return new Response(kymGmHtml, { headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" } });
    if (path === "/projects/sanglung-landscape") return new Response(landscapeHtml, { headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" } });
    if (path === "/projects/sanglung-grow") return new Response(growHtml, { headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" } });
    return original.fetch(request, env, ctx);
  }
};
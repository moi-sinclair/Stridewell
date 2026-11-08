/* Stridewell | store-state.js */
let cr = (()=>{try{const c=localStorage.getItem("sw_currency");return ["USD","EUR","GBP","GHS"].includes(c)?c:"USD"}catch{return "USD"}})();
    const RT = { USD: 1, EUR: .92, GBP: .79, GHS: 12.5 }, SY = { USD: "$", EUR: "€", GBP: "£", GHS: "₵" };
    const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)], R = matchMedia("(prefers-reduced-motion:reduce)").matches;
    try { const savedTheme=localStorage.getItem("sw_theme"); if(savedTheme==="light"||savedTheme==="dark") document.documentElement.dataset.theme=savedTheme; } catch {}
    const ES = [["Court", "#3d7be0", 190, "leather", "White leather, black overlay stripes, red heel accent. The clean court classic."], ["Ochre", "#d08a1e", 210, "canvas", "Heavy workwear canvas, corduroy collar, brass eyelets. Built to get scuffed."], ["Ember", "#d4202a", 195, "knit", "One-piece knit in deep reds on a flexible sole. Light enough to forget."], ["Night", "#555", 185, "leather", "All-black leather, tonal stitching, chunky sole. Quiet on purpose."], ["Bone", "#9aa0a6", 180, "leather", "Perforated white leather on a clean cupsole. Goes with everything."], ["Moss", "#9a8a10", 200, "knit", "Ember's knit in a mossy olive. Limited to 300 pairs."], ["Garnet", "#c4254a", 215, "canvas", "Ochre's canvas dyed garnet. Studio exclusive."]].map((e, i) => ({ id: "s" + i, n: e[0], c: e[1], p: e[2], t: e[3], d: e[4], img: IMG[i], cat: "shoe", sz: [7, 8, 9, 10, 11] }));

    // Five editorial previews bring the collection to twelve. The first seven remain the purchasable range.
    ES.push(
        { id:"s7", n:"Chalk", c:"#e6e0d4", p:205, t:"leather", d:"Soft ivory leather with tonal panels and a clean cupsole.", img:"https://www.follestad.no/content/uploads/2023/10/fliteless-38.jpeg", cat:"shoe", sz:[7,8,9,10,11], interactive:false },
        { id:"s8", n:"Drift", c:"#c8c7c2", p:220, t:"leather", d:"A quiet retro runner in soft grey suede and white leather.", img:"https://images.quince.com/6xXEB7rx0Lar33xLj2X0Vk/ab4394f872707d6c45b6b3dd3b6caa86/W--421_Men_s_Italian_Leather_and_Suede_Retro_Runner_White_139_EDITED.jpg?h=1978&q=50&reqOrigin=website-ssr&w=1582", cat:"shoe", sz:[7,8,9,10,11], interactive:false },
        { id:"s9", n:"Slate", c:"#73777b", p:215, t:"leather", d:"Slate suede slip-on with a crisp white sole.", img:"https://fadano.com/cdn/shop/files/Rhodes_Sneaker_Loafer.jpg?v=1770888868", cat:"shoe", sz:[7,8,9,10,11], interactive:false },
        { id:"s10", n:"Sable", c:"#6e432d", p:225, t:"leather", d:"Deep brown suede with a clean, low-profile silhouette.", img:"https://cdn.sugawara-ltd.com/thegear/content/theme/media/%E3%81%8B%E3%81%8D%E3%81%8F%E3%81%91%E3%81%93/%E3%82%AB/%E3%82%AB%E3%83%A1%E3%83%AB%E3%83%AC%E3%83%B3%E3%82%B4/17017-6S/10.JPG", cat:"shoe", sz:[7,8,9,10,11], interactive:false },
        { id:"s11", n:"Terracotta", c:"#a85f42", p:210, t:"canvas", d:"Warm clay canvas, cream laces and a clean rubber foxing.", img:"https://cdn.laredoute.com/products/1/2/0/1208c67af854a4197729e74073e98e3b.jpg", cat:"shoe", sz:[7,8,9,10,11], interactive:false }
    );
    const ic = (c, d) => `<svg viewBox="0 0 100 100"><defs><linearGradient id="sh" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset=".6" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient></defs><g fill="${c}" stroke="rgba(0,0,0,.28)" stroke-width="1.2" stroke-linejoin="round">${d}</g><g fill="url(#sh)" stroke="none">${d}</g></svg>`;
    const SH = {
        pants: '<path d="M30 12h40l6 78H56L50 40l-6 50H24z"/><path d="M30 12h40v8H30z" fill="rgba(255,255,255,.25)"/>',
        shorts: '<path d="M24 20h52l8 50H56l-6-24-6 24H16z"/><path d="M24 20h52v8H24z" fill="rgba(255,255,255,.25)"/>',
        hood: '<path d="M32 14c6 8 30 8 36 0l24 14-8 22-10-4v42H30V46l-10 4-8-22z"/><path d="M40 18c4 14 16 14 20 0" fill="none"/>',
        tee: '<path d="M34 14c6 6 26 6 32 0l26 14-8 20-10-4v44H26V44l-10 4-8-20z"/>',
        cap: '<path d="M20 60c0-30 14-40 32-40s28 12 28 40z"/><path d="M60 58h34c0 8-24 12-34 4z"/>',
        sock: '<path d="M36 10h26v50l24 14c4 10-4 18-16 16L36 76z"/>',
        tote: '<path d="M24 36h52l4 56H20z"/><path d="M36 36c0-26 28-26 28 0" fill="none" stroke-width="4"/>',
        jack: '<path d="M32 12h36l26 16-6 56H64V44h-4v40H40V44h-4v40H12l-6-56z"/>'
    };
    const EW = [
        ["Baggy Sweatpants", "pants", "#6b7a6a", 95, "bottoms", "Oversized heavyweight fleece, drawstring waist, stacked hem.", "https://images.unsplash.com/photo-1789110853665-11a03e391f04?auto=format&fit=crop&w=900&q=85", "engin akyurt", "https://unsplash.com/photos/person-wearing-light-blue-sweatpants-oeTSgHRA6u0"],
        ["Cargo Sweats", "pants", "#8a7a5a", 110, "bottoms", "Baggy cargo fleece with four pockets.", "https://ca.representclo.com/cdn/shop/articles/IMG_3716.jpg?crop=center&height=1200&v=1705311677&width=1200", "Represent", "https://ca.representclo.com/blogs/articles/what-to-wear-with-cargo-pants"],
        ["Baggy Shorts", "shorts", "#3b4a6b", 70, "bottoms", "Knee-length wide-leg shorts in washed twill.", "https://www.hemblanks.com/cdn/shop/files/short0683.png?v=1758942385&width=1200", "HEMBLANKS", "https://hemblanks.com/"],
        ["Sweat Shorts", "shorts", "#a39d8c", 65, "bottoms", "Heavy fleece shorts with a relaxed, boxy fit.", "https://www.chanbangkok.com/cdn/shop/files/CH-C-0066-3_7_0141f3aa-766d-4198-8a4e-c1316968945d.png?v=1770030203&width=1200", "Chan Bangkok", "https://www.chanbangkok.com/products/ch-c-0066-3-s-long-sleeve-polo-shorts-set-navy"],
        ["Studio Hoodie", "hood", "#234f3b", 120, "tops", "450gsm brushed hoodie with brass-tone aglets.", "https://res.cloudinary.com/www-stanleystella-com/image/upload/c_fill%2Cg_xy_center%2Ch_800%2Cw_1200/v1689071964/Mood%20Images/SS24/EDITO%20INSTUDIO%20%2B%20STILL%20LIFE/STANLEYSTELLA_STILLLIFE_SS24_ICONICS_CREATOR_2.0._MOVER_2.0._CULTIVATOR_2.0._2.webp", "Stanley/Stella", "https://stanleystella.com/de-eu/blog/post/cotton-care-guide"],
        ["Stride Tee", "tee", "#e3d3a4", 55, "tops", "Boxy heavy cotton tee, S× chest print.", "https://museot.fi/uploadkuvat/museot/21431/Triennale.jpg", "Museot", "https://museot.fi/nayttelykalenteri/?nayttely_id=42177"],
        ["Drop Jacket", "jack", "#17211c", 180, "tops", "Water-resistant coach jacket, numbered tag.", "https://images.prom.ua/6433091135_w640_h640_komplekt-6v1-s.jpg", "Prom.ua", "https://prom.ua/ua/p2457470463-komplekt-6v1-kurtkoj.html"],
        ["Dad Cap", "cap", "#d08a1e", 40, "acc", "Six-panel washed twill.", "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=900&q=85", "Unsplash", "https://unsplash.com/"],
        ["Crew Socks", "sock", "#ebe7de", 18, "acc", "Cushioned 3-pack in drop colours.", "https://images.unsplash.com/photo-1582966772680-860e372bb558?auto=format&fit=crop&w=900&q=85", "Unsplash", "https://unsplash.com/"],
        ["Canvas Tote", "tote", "#d4202a", 35, "acc", "Everyday tote, fits a pair of Stride 1.", "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85", "Unsplash", "https://unsplash.com/"],
        ["Leopard Midi Dress", "tee", "#8b654c", 145, "dresses", "A relaxed statement dress with a warm autumn print.", "https://images.unsplash.com/photo-1664894626606-283ad185a726?auto=format&fit=crop&w=900&q=85", "Lance Reis", "https://unsplash.com/photos/a-woman-wearing-a-dress-7DKH70W8xEU"],
        ["Floral Occasion Dress", "tee", "#b47c8a", 165, "dresses", "A floral occasion look with a soft, editorial finish.", "https://images.unsplash.com/photo-1633460730183-e05d32a1250b?auto=format&fit=crop&w=900&q=85", "Jonathan Borba", "https://unsplash.com/photos/a-woman-wearing-a-dress-IKpQYMIftLA"],
        ["Patterned Summer Dress", "tee", "#416b83", 135, "dresses", "A bold patterned dress for warm-weather styling.", "https://images.unsplash.com/photo-1678534959977-68e1beca1a18?auto=format&fit=crop&w=900&q=85", "nikhil uttam", "https://unsplash.com/photos/a-woman-wearing-a-dress-with-a-blue-and-yellow-pattern-wcj3u4ubHIE"],
        ["Relaxed Tailored Trousers", "pants", "#77736d", 115, "bottoms", "Easy, relaxed trousers with a clean tailored line.", "https://images.unsplash.com/photo-1493357335960-4583bfa6f8d9?auto=format&fit=crop&w=900&q=85", "Clem Onojeghuo", "https://unsplash.com/photos/person-wearing-gray-dress-pants-with-camera-kg3N8vqvMd8"],
        ["Printed Wide-Leg Pants", "pants", "#697c6c", 125, "bottoms", "Wide-leg patterned trousers with an easy everyday drape.", "https://images.unsplash.com/photo-1768478701607-db8c96dbb87f?auto=format&fit=crop&w=900&q=85", "IMANA", "https://unsplash.com/photos/woman-wearing-a-colorful-patterned-tunic-and-pants-8Z-D2mPhnc0"],
        ["Classic Grey Trousers", "pants", "#777777", 105, "bottoms", "Versatile grey trousers with a straight relaxed fit.", "https://oldmoneybrand.com/cdn/shop/files/591b6d72-d6f1-4c14-8fdf-7a2e8fbbbe61.jpg?v=1742786020&width=1445", "Old Money", "https://oldmoneybrand.com/en/products/classic-modern-men-pants-old-money"]
    ].map((e, i) => ({ id: "w" + i, n: e[0], c: e[2], p: e[3], t: e[4], d: e[5], svg: ic(e[2], SH[e[1]]), img: e[6] || null, photographer: e[7] || null, photoUrl: e[8] || null, cat: "wear", sz: ["XS", "S", "M", "L", "XL"] }));

    // Extra apparel and accessory pieces inspired by the clean, drop-led streetwear assortment.
    EW.push(
        {id:"w16",n:"Contrast Zip Hoodie",c:"#343a35",p:125,t:"tops",d:"Relaxed heavyweight zip hoodie with a clean front and structured hood.",img:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85",cat:"wear",sz:["XS","S","M","L","XL"]},
        {id:"w17",n:"Everyday Box Tee",c:"#e6e1d7",p:58,t:"tops",d:"Boxy heavyweight cotton tee with a quiet chest mark.",img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",cat:"wear",sz:["XS","S","M","L","XL"]},
        {id:"w18",n:"Relaxed Denim Jorts",c:"#526477",p:88,t:"bottoms",d:"Relaxed above-knee denim shorts with a roomy leg.",img:"https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=85",cat:"wear",sz:["XS","S","M","L","XL"]},
        {id:"w19",n:"Everyday Crossbody",c:"#282a27",p:65,t:"acc",d:"Compact everyday crossbody bag with adjustable strap.",img:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85",cat:"wear",sz:["One size"]},
        {id:"w20",n:"Washed Cotton Cap",c:"#b27b35",p:38,t:"acc",d:"Six-panel washed cotton cap with an adjustable back strap.",img:"https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=900&q=85",cat:"wear",sz:["One size"]},
        {id:"w21",n:"Canvas Utility Tote",c:"#d7c9ad",p:32,t:"acc",d:"Structured canvas tote for daily essentials.",img:"https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85",cat:"wear",sz:["One size"]}
    );
    const ALL = [...ES, ...EW], G = id => ALL.find(x => x.id === id), strideNo = id => ALL.filter(x => x.cat === "shoe").findIndex(x => x.id === id) + 1, fmt = n => SY[cr] + Math.round(n * RT[cr]);
    let cart = [], wish = [], user = null, sel = null, sz = null, disc = 0, rv = [];
    try { rv = JSON.parse(localStorage.getItem("sw_recent") || "[]").filter(id => ALL.some(p => p.id === id)).slice(0,8); } catch { rv = []; }
    try { user = JSON.parse(localStorage.getItem("sw_user") || "null"); if (user && user.authVersion !== 1) user = null; } catch { user = null; }
    try {
        cart = JSON.parse(localStorage.getItem("sw_c") || "[]");
        wish = JSON.parse(localStorage.getItem("sw_w") || "[]");
    }
    catch (e) { }
    const save = () => { try {
        localStorage.setItem("sw_c", JSON.stringify(cart));
        localStorage.setItem("sw_w", JSON.stringify(wish));
    }
    catch (e) { } };
    const vis = p => p.img ? `<img src="${p.img}" alt="${p.n}" loading="lazy" draggable="false" onerror="this.onerror=null;this.style.display='none';if(this.parentElement&&this.parentElement.dataset.fallback){this.parentElement.innerHTML=this.parentElement.dataset.fallback}">` : p.svg;
    function toast(t) { const e = $("#toast"); e.textContent = t; e.classList.add("on"); clearTimeout(toast.t); toast.t = setTimeout(() => e.classList.remove("on"), 2400); }
    function stockMap() { try { return JSON.parse(localStorage.getItem("sw_stock") || "{}"); } catch { return {}; } }
    function stockFor(id, size) { const m = stockMap(); return Number.isInteger(m[id + "-" + size]) ? m[id + "-" + size] : 5; }
    function stockTotal(p) { return p.cat === "shoe" ? p.sz.reduce((n, size) => n + stockFor(p.id, size), 0) : null; }
    function card(p) { const preview=p.interactive===false; return `<div class="cd2" data-id="${p.id}" data-preview="${preview?"1":"0"}" style="--c:${p.c};${preview?"cursor:default":""}"><span class="bg">${preview?"COMING SOON":p.cat == "shoe" ? `${stockTotal(p)} LEFT` : "IN STOCK"}</span>${preview?"":`<button class="hb" data-w="${p.id}" aria-label="Wishlist">${wish.includes(p.id) ? "♥" : "♡"}</button>`}<div class="im" data-fallback="${p.svg ? esc(p.svg) : ''}">${vis(p)}</div>${p.photographer ? `<small class="mut photo-credit">Photo: <a href="${p.photoUrl}" target="_blank" rel="noopener">${esc(p.photographer)} / Unsplash</a></small>` : ""}<div class="in"><div><b>${p.cat == "shoe" ? `Stride ${Math.max(1,strideNo(p.id))} · ${p.n}` : p.n}</b><small>${p.t}</small></div><b>${fmt(p.p)}</b></div></div>`; }
    function list(k, f = "all", s = 0) { let a = ALL.filter(x => x.cat == k && !CFG.off[x.id] && (f == "all" || x.t == f || (f === "acc" && ["Dad Cap", "Crew Socks", "Canvas Tote", "Washed Cotton Cap", "Canvas Utility Tote", "Everyday Crossbody"].includes(x.n)))); if (s == 1)
        a.sort((x, y) => x.p - y.p); if (s == 2)
        a.sort((x, y) => y.p - x.p); $(k == "shoe" ? "#sg" : "#wg").innerHTML = a.map(card).join(""); if (!R && window.ScrollTrigger)
        cardsIn(k == "shoe" ? "#shoes " : "#wear "); }
    function reveal(s) { if (R)
        return; gsap.fromTo(s, { y: 50, opacity: 0, scale: .94 }, { y: 0, opacity: 1, scale: 1, stagger: .06, duration: .6, ease: "power3.out" }); }
    $("#hg").innerHTML = ES.map(card).join("");
    $("#ft").innerHTML = [["✂", "Numbered runs", "Every pair is stamped 1 of 2,400."], ["♻", "Recycled soles", "40% reclaimed rubber, 100% grip."], ["◎", "Free returns", "30 days, worn once, no questions."], ["⚑", "Ships worldwide", "Free over $250."]].map(f => `<div class="fc"><em>${f[0]}</em><h3>${f[1]}</h3><p class="mut">${f[2]}</p></div>`).join("");
    $("#vl").innerHTML = [["Craft", "Hand-lasted in small batches."], ["Colour", "Warm paper, deep green, brass."], ["Honesty", "This whole brand is made up."]].map(f => `<div class="fc"><h3>${f[0]}</h3><p class="mut">${f[1]}</p></div>`).join("");
    $("#ns").innerHTML = [[2400, "Pairs in Drop 01"], [7, "Colourways"], [48, "Countries"]].map(n => `<div><div class="nm num" data-n="${n[0]}">0</div><div class="mut">${n[1]}</div></div>`).join("");
    let hi = 0;
    const HS = ES.slice(0, 5);
    $("#hs").innerHTML = HS.map((p, i) => `<button style="background:${p.c}" data-i="${i}" aria-label="${p.n}" class="${i ? "" : "on"}"></button>`).join("");
    let base = "#d08a1e";
    const split = s => s.split(" ").map(w => `<span style="display:inline-block;white-space:nowrap">${[...w].map(c => `<i class="ch">${c}</i>`).join("")}</span>`).join(" ");
    function theme(c) { document.documentElement.style.setProperty("--a", c); }
    function setBase(c) { base = c; theme(c); }
    function pop(x, y, c, n = 8, spread = 120, sz = 9) {
        for (let i = 0; i < n; i++) {
            const d = document.createElement("i"), s = 3 + Math.random() * sz, a = Math.random() * 6.28, v = spread * (.35 + Math.random() * .65);
            d.className = "cf";
            d.style.cssText = `left:${x}px;top:${y}px;width:${s}px;height:${s}px;background:${c};border-radius:50%`;
            document.body.appendChild(d);
            gsap.to(d, { x: Math.cos(a) * v, y: Math.sin(a) * v - 60, opacity: 0, scale: 0, duration: .7 + Math.random() * .5, ease: "power3.out", onComplete: () => d.remove() });
        }
    }
    function burst(el, c, n) { const r = el.getBoundingClientRect(); pop(r.left + r.width / 2, r.top + r.height * .62, c, n); }
    function ring(el, c) {
        const r = el.getBoundingClientRect(), d = document.createElement("div");
        d.className = "cf";
        d.style.cssText = `left:${r.left + r.width / 2 - 20}px;top:${r.top + r.height * .62 - 20}px;width:40px;height:40px;border:3px solid ${c};border-radius:50%`;
        document.body.appendChild(d);
        gsap.fromTo(d, { scale: 0, opacity: 1 }, { scale: 14, opacity: 0, duration: .8, ease: "power2.out", onComplete: () => d.remove() });
    }
    function shake() { }
    function hero(i, first, ev) {
        if (i == hi && !first)
            return;
        if (!first && hero.b)
            return;
        const p = HS[i], prev = HS[hi];
        hi = i;
        setBase(p.c);
        $$("#hs button").forEach((b, k) => b.classList.toggle("on", k == i));
        const set = () => {
            $("#hn").innerHTML = split(`Stride ${hi + 1} · ${p.n}`);
            $("#hd").textContent = p.d;
            $("#big").textContent = p.n.toUpperCase();
            $("#hi").src = p.img;
        };
        if (R || first) {
            set();
            $("#hp").textContent = fmt(p.p);
            return;
        }
        hero.b = 1;
        const st = $("#st"), H = $("#hi"), O = $("#ho"), W = innerWidth, r = (ev || st).getBoundingClientRect(), wp = $("#wipe"), cx = r.left + r.width / 2, cy = r.top + r.height / 2, o = { v: prev.p };
        wp.style.background = `color-mix(in srgb,${p.c} 12%,var(--bg))`;
        gsap.fromTo(wp, { opacity: 1, clipPath: `circle(0px at ${cx}px ${cy}px)` }, { clipPath: `circle(150vmax at ${cx}px ${cy}px)`, duration: .45, ease: "power2.in", onComplete: () => gsap.set(wp, { opacity: 0 }) });
        O.src = H.src;
        gsap.set(O, { opacity: 1, x: 0, y: 0, rotation: 0, scale: 1 });
        set();
        heroRig.reset();
        gsap.set(H, { opacity: 1, x: W * .6, y: -40, rotation: 30, scale: .85 });
        gsap.timeline({ onComplete: () => { hero.b = 0; gsap.set(O, { opacity: 0 }); } })
            .to(H, { x: 0, y: 0, rotation: 0, scale: 1, duration: .22, ease: "power3.in" }, 0)
            .to(O, { x: -W * .8, y: -240, rotation: -120, scale: .7, opacity: 0, duration: .4, ease: "power2.out" }, .2)
            .call(() => { burst(st, p.c, 10); ring(st, p.c); shake(10); }, null, .22)
            .fromTo(H, { x: 26, rotation: -4 }, { x: 0, rotation: 0, duration: .4, ease: "power2.out", immediateRender: false }, .22)
            .fromTo("#shd", { scaleX: .5, opacity: .15 }, { scaleX: 1, opacity: .45, duration: .4, ease: "power2.out" }, .22)
            .fromTo("#big", { x: -120, skewX: -12, opacity: .3 }, { x: 0, skewX: 0, opacity: 1, duration: .45, ease: "power3.out" }, .18)
            .from("#hn .ch", { yPercent: 110, opacity: 0, stagger: .012, duration: .28, ease: "power3.out" }, .18)
            .fromTo("#hd", { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: .3, ease: "power3.out" }, .2)
            .to(o, { v: p.p, duration: .4, ease: "power2.out", onUpdate: () => $("#hp").textContent = fmt(Math.round(o.v)) }, .18);
    }
    $("#hs").onclick = e => { const b = e.target.closest("button"); if (b)
        hero(+b.dataset.i, false, b); };

    let heroPausedByUser = false;
    const heroStage = $("#st");
    heroStage.addEventListener("pointerdown", () => { heroPausedByUser = true; });
    heroStage.addEventListener("focusin", () => { heroPausedByUser = true; });
    document.addEventListener("pointerdown", e => { if (!heroStage.contains(e.target)) heroPausedByUser = false; });
    document.addEventListener("focusin", e => { if (!heroStage.contains(e.target)) heroPausedByUser = false; });
    setInterval(() => { if (!heroPausedByUser && $("#home").classList.contains("on") && !document.hidden && !$("#md").classList.contains("on")) hero((hi + 1) % 5); }, 5500);
    let END = Date.parse("2026-11-20T18:00:00Z");
    let pre = 1347;
    function tick() {
        let d = Math.max(0, END - Date.now());
        const v = [d / 864e5 | 0, d / 36e5 % 24 | 0, d / 6e4 % 60 | 0, d / 1e3 % 60 | 0];
        $$("#cd b").forEach((b, i) => b.textContent = String(v[i]).padStart(2, "0"));
        try {
            const savedCfg=JSON.parse(localStorage.getItem("sw_cfg")||"{}");
            const orders=JSON.parse(localStorage.getItem("sw_orders")||"[]");
            const baseline=Number.isFinite(+savedCfg.base)?+savedCfg.base:1347;
            const sold=orders.filter(o=>!['Cancelled','Refunded','Pending'].includes(o.status)).reduce((sum,o)=>sum+(o.items||[]).reduce((n,i)=>n+(ES.some(p=>p.n===i.n)?(+i.q||0):0),0),0);
            pre=Math.min(2400,baseline+sold);
        } catch { pre=Math.min(2400,pre); }
        $("#pc").textContent = pre.toLocaleString();
        $("#pl").textContent = Math.max(0,2400-pre).toLocaleString();
        $("#pb").style.width = Math.min(100,pre/24) + "%";
    }
    setInterval(tick, 1e3);
    tick();
    function go(h) {
        h = ["home", "shoes", "wear", "about", "guide", "dash", "pay"].includes(h) ? h : "home";
        const prev = $(".pg.on:not(#admin)"), enter = () => {
    if ($("#admin")) { if (prev) gsap.set(prev, { clearProps: "all" }); return; }
    $$(".pg:not(#admin)").forEach(p => p.classList.toggle("on", p.id == h));
            $$(".lk a").forEach(a => { const active = a.dataset.go == h; a.classList.toggle("on", active); if (active) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); });
            if (prev)
                gsap.set(prev, { clearProps: "all" });
            scrollTo(0, 0);
            if (h == "shoes")
                list("shoe");
            if (h == "wear")
                list("wear");
            if (h == "dash")
                dash();
            if (!R) {
                gsap.from("#" + h, { opacity: 0, duration: .4 });
                scr(h);
            }
        };
        if (prev && prev.id != h && !R)
            gsap.to(prev, { opacity: 0, y: -24, duration: .22, ease: "power2.in", onComplete: enter });
        else
            enter();
    }
    let trig = [];
    function cardsIn(P) { $$(P + ".fc," + P + ".cd2").forEach((el, i) => { const d = i % 2 ? 1 : -1, a = gsap.fromTo(el, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: .6, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 98%", once: true, toggleActions: "play none none none" } }); trig.push(a.scrollTrigger); }); }
    function scr(h) {
        if (!window.ScrollTrigger)
            return;
        trig.forEach(t => t && t.kill());
        trig = [];
        gsap.registerPlugin(ScrollTrigger);
        const P = "#" + h + " ", S = (a, f, to, st, en, x = {}) => { const g = gsap.fromTo(a, f, { ...to, duration: .7, ease: "power2.out", ...x, scrollTrigger: { trigger: typeof a == "string" ? a : a[0] || a, start: st, once: true, toggleActions: "play none none none" } }); trig.push(g.scrollTrigger); };
        $$(P + ".num").forEach(el => { trig.push(ScrollTrigger.create({ trigger: el, start: "top 92%", once: true, onEnter: () => { const o = { v: 0 }; gsap.to(o, { v: +el.dataset.n, duration: 1.6, ease: "power2.out", onUpdate: () => el.textContent = Math.round(o.v).toLocaleString() }); } })); S(el, { scale: .2, opacity: 0, transformOrigin: "0 50%" }, { scale: 1, opacity: 1 }, "top 98%", "top 60%"); });
        $$(P + "h2:not(#wl)").forEach(el => {
            if (!el.dataset.s) {
                el.dataset.s = 1;
                el.innerHTML = el.textContent.split(" ").map(w => `<span style="display:inline-block;white-space:nowrap">${[...w].map(c => `<i class="ch">${c}</i>`).join("")}</span>`).join(" ");
            }
            const g = gsap.fromTo(el.querySelectorAll(".ch"), { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: .02, duration: .5, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 95%", once: true, toggleActions: "play none none none" } });
            trig.push(g.scrollTrigger);
        });
        $$(P + ".tg").forEach(el => S(el, { x: -30, opacity: 0 }, { x: 0, opacity: 1 }, "top 98%", "top 70%"));
        $$(P + ".nm").forEach(el => S(el, { y: 30, opacity: 0 }, { y: 0, opacity: 1 }, "top 95%", "top 50%"));
        cardsIn(P);
        if (h == "home") {
            
            
            const mf = $("#mf");
            if (!mf.dataset.s) {
                mf.dataset.s = 1;
                mf.innerHTML = mf.textContent.split(" ").map(w => `<span>${w}</span>`).join(" ");
            }
            const g = gsap.to("#mf span", { opacity: 1, stagger: .03, duration: .4, ease: "none", scrollTrigger: { trigger: "#mf", start: "top 80%", once: true, toggleActions: "play none none none" } });
            trig.push(g.scrollTrigger);
            S(".nl", { y: 40, opacity: 0 }, { y: 0, opacity: 1 }, "top 98%", "top 40%");
        }
        ScrollTrigger.refresh();
    }
    document.addEventListener("click", e => {
        const trigger = e.target.closest("#accountMenuTrigger");
        const menu = $("#accountMenu");
        if (trigger && menu) {
            const opened = menu.classList.toggle("open");
            trigger.setAttribute("aria-expanded", String(opened));
            return;
        }
        if (menu && !e.target.closest("#accountMenu")) {
            menu.classList.remove("open");
            $("#accountMenuTrigger")?.setAttribute("aria-expanded", "false");
        }
        const g = e.target.closest("[data-go]");
        if (g) {
            if (g.closest("#accountMenu")) { menu?.classList.remove("open"); $("#accountMenuTrigger")?.setAttribute("aria-expanded", "false"); }
            e.preventDefault();
            location.hash = g.dataset.go;
        }
        const b = e.target.closest(".btn,.ib");
        if (b) {
            const r = b.getBoundingClientRect(), s = document.createElement("span");
            s.className = "rp";
            const d = Math.max(r.width, r.height) * 2;
            Object.assign(s.style, { width: d + "px", height: d + "px", left: e.clientX - r.left - d / 2 + "px", top: e.clientY - r.top - d / 2 + "px" });
            b.appendChild(s);
            setTimeout(() => s.remove(), 600);
        }
        const w = e.target.closest("[data-w]");
        if (w) {
            e.stopPropagation();
            const id = w.dataset.w, on = wish.includes(id);
            wish = on ? wish.filter(x => x != id) : [...wish, id];
            save();
            w.textContent = on ? "♡" : "♥";
            if (!on) {
                const r = w.getBoundingClientRect();
                pop(r.left + 18, r.top + 18, "#d4202a", 16, 160, 6);
            }
            if (!R)
                gsap.fromTo(w, { scale: .5 }, { scale: 1, duration: .6, ease: "power2.out" });
            toast(on ? "Removed from wishlist" : "Saved to wishlist");
            return;
        }
        const c = e.target.closest(".cd2");
        if (c) { if (c.dataset.preview === "1") { toast("This pair is part of the upcoming collection preview."); return; } openM(c.dataset.id); }
        const sr = e.target.closest(".sr");
        if (sr) {
            $("#sr").classList.remove("on");
            if (G(sr.dataset.id)?.interactive === false) { toast("This pair is part of the upcoming collection preview."); return; }
            openM(sr.dataset.id);
        }
        // Keep the social icons interactive: their click explains that this demo has no live social accounts.
        if (e.target.closest(".so")) {
            e.preventDefault();
            toast("Stridewell is a fictional demo brand, so these social icons are placeholders rather than live accounts.");
        }
    });
    addEventListener("hashchange", () => go(location.hash.slice(1)));
    document.addEventListener("submit", e => { if (!e.target.classList.contains("nf")) return; e.preventDefault();
        const input = e.target.querySelector('input[type="email"]'), email = (input?.value || "").trim().toLowerCase();
        if (!email) return toast("Enter an email address to join the list.");
        let subs=[]; try{subs=JSON.parse(localStorage.getItem("sw_subs")||"[]")}catch{}
        if(subs.some(x=>x.email===email)){toast("You’re already on the Stridewell list. No need to subscribe twice.");e.target.reset();return;}
        subs.push({email,at:Date.now()});localStorage.setItem("sw_subs",JSON.stringify(subs));
        toast("You’re on the list! Your browser saved the signup. No campaign email is sent in this demo.");e.target.reset();conf(e.target);
    });
    $$(".fl").forEach(f => { let cf = "all", cs = 0; const k = f.dataset.k; f.onclick = e => { const b = e.target.closest("button"); if (!b)
        return; cf = b.dataset.f; $$("button", f).forEach ? 0 : 0; [...f.querySelectorAll("button")].forEach(x => x.classList.toggle("on", x == b)); list(k, cf, cs); }; f.querySelector("select").onchange = e => { cs = +e.target.value; list(k, cf, cs); }; });
    function openM(id) {
        sel = G(id);
        sz = null;
        theme(sel.c);
        rv = [id, ...rv.filter(x => x != id)].slice(0, 8); try { localStorage.setItem("sw_recent", JSON.stringify(rv)); } catch {}
        modalRig.reset(true);
        $("#mi").innerHTML = vis(sel);
        {
            const h = [...sel.id].reduce((a, c) => a + c.charCodeAt(0), 0);
            $("#mr").textContent = `★★★★★ ${(4.5 + h % 5 / 10).toFixed(1)} · ${40 + h * 7 % 190} reviews`;
        }
        $("#sf").style.display = sel.cat == "shoe" ? "flex" : "none";
        $("#mt").textContent = sel.cat == "shoe" ? `Limited stock · ${stockTotal(sel)} pairs remaining · ships Dec 2026` : "In stock";
        $("#mn").textContent = sel.cat == "shoe" ? `Stride ${Math.max(1,strideNo(sel.id))} · ${sel.n}` : sel.n;
        $("#mp").textContent = fmt(sel.p);
        $("#md2").textContent = sel.d;
        $("#ma").textContent = sel.cat == "shoe" ? "Preorder now" : "Add to bag";
        $("#sz").innerHTML = sel.sz.map(s => `<button data-s="${s}" ${sel.cat === "shoe" && stockFor(sel.id, s) < 1 ? "disabled" : ""}>${s}${sel.cat === "shoe" ? ` · ${stockFor(sel.id, s)} left` : ""}</button>`).join("");
        $("#md").classList.add("on");
        if (!R)
            gsap.from(".mb", { y: 60, scale: .92, opacity: 0, duration: .5, ease: "back.out(1.1)" });
    }
    $("#sz").onclick = e => { const b = e.target.closest("button"); if (!b)
        return; sz = b.dataset.s; $$("#sz button").forEach(x => x.classList.toggle("on", x == b)); if (!R)
        gsap.fromTo(b, { scale: .8 }, { scale: 1, duration: .4, ease: "back.out(1.1)" }); };
    function closeM() { $("#md").classList.remove("on"); theme(base); }
    $("#mx").onclick = closeM;
    $("#md").onclick = e => { if (e.target.id == "md")
        closeM(); };
    function add(p, s, src) { if (!shoppingAllowed()) { toast(IS_ADMIN ? "Admins cannot preorder. Sign out of Admin first." : "Create an account or sign in before shopping."); if (!IS_ADMIN) go("dash"); return; } const existing = cart.find(i => i.id == p.id && i.s == s); if (p.cat === "shoe" && (stockFor(p.id, s) < (existing?.q || 0) + 1)) { toast("That size is sold out or already fully reserved in your bag"); return; } existing ? existing.q++ : cart.push({ id: p.id, s, q: 1 }); save(); draw(); if (!R && src) {
        const r = src.getBoundingClientRect(), f = document.createElement("div");
        f.style.cssText = `position:fixed;z-index:99;left:${r.left}px;top:${r.top}px;width:${r.width}px;height:${r.height}px;background:var(--fg);border-radius:12px;pointer-events:none`;
        document.body.appendChild(f);
        const t = $("#cb").getBoundingClientRect();
        gsap.to(f, { x: t.left - r.left, y: t.top - r.top, scale: .1, opacity: .3, duration: .8, ease: "power3.inOut", onComplete: () => { f.remove(); gsap.fromTo("#cc", { scale: 2 }, { scale: 1, duration: .6, ease: "power2.out" }); tg(1); } });
    }
    else
        tg(1); }
    const tg = v => document.body.classList.toggle("o", !!v);
    $("#ma").onclick = e => { if (!sz) {
        toast("Select a size first");
        if (!R)
            gsap.fromTo("#sz", { x: 0 }, { x: 9, duration: .06, repeat: 5, yoyo: true, clearProps: "x" });
        return;
    } closeM(); add(sel, sz, e.currentTarget); };
    $("#hb").onclick = e => add(HS[hi], "9", e.currentTarget);
    function draw() { const t = cart.reduce((s, i) => s + G(i.id).p * i.q, 0) * (1 - disc); $("#cc").textContent = cart.reduce((s, i) => s + i.q, 0); $("#ci").innerHTML = cart.length ? cart.map((i, k) => { const p = G(i.id); return `<div class="ci">${vis(p)}<div><b>${p.n}</b><br><small class="mut">Size ${i.s}</small><br><button data-a="m" data-k="${k}">−</button> ${i.q} <button data-a="p" data-k="${k}">+</button></div><div>${fmt(p.p * i.q)}<br><button data-a="x" data-k="${k}">✕</button></div></div>`; }).join("") : '<p class="mut">Your bag is empty.</p>'; $("#sb").textContent = fmt(t); const l = Math.max(0, 250 - t); $("#fs").textContent = l ? `${fmt(l)} to free shipping` : "Free shipping unlocked ✓"; $("#fb").style.width = Math.min(100, t / 2.5) + "%"; }
    $("#ci").onclick = e => { const b = e.target.closest("button"); if (!b)
        return; const k = +b.dataset.k, i = cart[k], p = G(i.id); if (b.dataset.a == "p") { if (p.cat === "shoe" && i.q >= stockFor(p.id, i.s)) return toast("No more pairs available in that size"); i.q++; } else if (b.dataset.a == "m") { if (--i.q < 1) cart.splice(k, 1); } else cart.splice(k, 1); save(); draw(); };
    $("#cb").onclick = () => tg(1);
    $("#cx").onclick = () => tg(0);
    $("#sh").onclick = () => tg(0);
    addEventListener("keydown", e => { if (e.key == "Escape") {
        tg(0);
        closeM();
        $("#sr").classList.remove("on");
    } if (e.key == "/" && !/INPUT|SELECT/.test(document.activeElement.tagName)) {
        e.preventDefault();
        openS();
    } if (e.key == "a" && $("#home").classList.contains("on") && !/INPUT|SELECT/.test(document.activeElement.tagName) && !$("#md").classList.contains("on"))
        heroRig.next(); });
    function conf(el) { if (R)
        return; const r = el.getBoundingClientRect(); for (let i = 0; i < 14; i++) {
        const d = document.createElement("i");
        d.className = "cf";
        d.style.cssText = `left:${r.left + r.width / 2}px;top:${r.top + r.height / 2}px;background:hsl(${Math.random() * 360},80%,60%);border-radius:${Math.random() > .5 ? "50%" : "2px"}`;
        document.body.appendChild(d);
        gsap.to(d, { x: (Math.random() - .5) * 600, y: (Math.random() - .8) * 500, rotation: Math.random() * 720, opacity: 0, duration: 1.4, ease: "power3.out", onComplete: () => d.remove() });
    } }
    $("#co").onclick = e => {
        if (!cart.length) {
            toast("Your bag is empty");
            return;
        }
        const n = cart.length, b = e.currentTarget;
        conf(b);
        plane(b);
        cart = [];
        save();
        draw();
        tg(0);
        setTimeout(() => showOk(n), R ? 0 : 2000);
    };
    function updateRoleBadge() { const b = $("#roleBadge"); if (!b) return; b.hidden = !IS_ADMIN; b.textContent = IS_ADMIN ? "ADMIN" : ""; }
    function shoppingAllowed() { return !!user && !IS_ADMIN; }
    function refreshCommerceControls() { const allowed = shoppingAllowed(); const co = $("#co"); if (co) { co.disabled = !allowed; co.title = IS_ADMIN ? "Admins cannot preorder. Sign out of Admin first." : !user ? "Sign in to preorder" : ""; co.textContent = IS_ADMIN ? "Admin mode · checkout locked" : !user ? "Sign in to checkout" : "Checkout (demo)"; } updateRoleBadge(); }
    function dash() {
        ORD = readLocal("sw_orders", []);
        $("#dl").style.display = user ? "none" : "grid";
        $("#dd").style.display = user ? "block" : "none";
        if (!user) { refreshCommerceControls(); return; }
        $("#wl").textContent = "Welcome, " + user.n;
        const mine = ORD.filter(o => (o.email || "").toLowerCase() === (user.email || "").toLowerCase()).sort((a,b) => (b.at||0)-(a.at||0));
        const statusClass = st => ({"Paid":"paid","Processing":"processing","In production":"processing","Cutting":"processing","Sewing":"processing","Shipped":"shipped","Delivered":"delivered","Cancelled":"cancelled","Refunded":"cancelled","Pending":"pending"}[st] || "pending");
        const stages = ["Paid", "Cutting", "Sewing", "Shipped", "Delivered"];
        const tracker = o => {
            const st = o.status || "Pending", at = stages.indexOf(st);
            if (["Cancelled", "Refunded"].includes(st)) return `<p class="order-terminal ${st.toLowerCase()}">${esc(st)} · This order will not move through fulfilment.</p>`;
            const active = st === "Pending" ? -1 : at >= 0 ? at : st === "Processing" || st === "In production" ? 1 : 0;
            return `<div class="order-track">${stages.map((label, i) => `<div class="order-track-step ${i <= active ? "done" : ""} ${i === active ? "current" : ""}"><i>${i < active ? "✓" : i + 1}</i><span>${label}</span></div>`).join("")}</div>`;
        };
        $("#po").innerHTML = mine.length ? `<div class="sw-order-list">${mine.map(o => `<article class="sw-order-card"><header><div><b>${esc(o.id)}</b><small>Placed ${o.at ? new Date(o.at).toLocaleDateString() : "Date unavailable"}</small></div><span class="sw-order-status ${statusClass(o.status)}">${esc(o.status || "Pending")}</span></header><div class="sw-order-items">${(o.items||[]).map(i => `<div><span>${esc(i.n)} · ${esc(i.s || "One size")} × ${Number(i.q)||1}</span></div>`).join("") || "Items unavailable"}</div><footer><span>${(o.items||[]).reduce((n,i)=>n+(Number(i.q)||0),0)} item(s)</span><b>${fmt(Number(o.total)||0)}</b></footer>${tracker(o)}${o.updatedAt ? `<small class="sw-order-updated">Last status update: ${new Date(o.updatedAt).toLocaleString()}</small>` : ""}</article>`).join("")}</div>` : "No orders yet. Your orders will appear here after checkout.";
        const latest = mine[0];
        $("#orderStatusPanel").innerHTML = latest ? `<div class="mut" style="margin-bottom:8px">Latest order · ${esc(latest.id)} · ${esc(latest.status || "Pending")}</div>${tracker(latest)}<small class="sw-order-updated">This tracker updates when the admin changes the order status.</small>` : '<p class="mut">Your order progress will appear here after checkout.</p>';
        // Recently viewed is a short, browser-local history. Each item can be reopened or removed independently.
        $("#rv").innerHTML = rv.length ? rv.map(id => G(id)).filter(Boolean).map(p => `<div style="display:flex;align-items:center;gap:8px;margin:6px 0;flex-wrap:wrap"><button class="ib" data-recent="${p.id}" style="text-align:left;flex:1">${esc(p.n)} · ${fmt(p.p)}</button><button class="ib" type="button" data-recent-remove="${p.id}" aria-label="Remove ${esc(p.n)} from recently viewed">×</button></div>`).join("") : "Nothing viewed recently";
        $("#ws").innerHTML = wish.map(i => G(i).n).join("<br>") || "Nothing saved";
        refreshCommerceControls();
    }
    // Remember-me is only a convenience autofill record. The account itself remains in sw_accounts.
    try { const remembered = JSON.parse(localStorage.getItem("sw_remembered_login") || "null"); if (remembered && remembered.email && remembered.password) { $("#le").value = remembered.email; $("#lpw").value = remembered.password; $("#rememberLogin").checked = true; } } catch {}
    $("#rememberLogin").addEventListener("change", e => { if (!e.target.checked) { localStorage.removeItem("sw_remembered_login"); toast("Saved autofill credentials cleared. Your account is unchanged."); } });
    $("#togglePassword").onclick = () => { const field = $("#lpw"), show = field.type === "password"; field.type = show ? "text" : "password"; $("#togglePassword").textContent = show ? "Hide" : "Show"; $("#togglePassword").setAttribute("aria-label", show ? "Hide password" : "Show password"); };
    $("#forgotPassword").onclick = () => { const email = $("#le").value.trim().toLowerCase(); if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { $("#accountError").textContent = "Enter the account email above first. This reset only works for an email already saved in this browser."; toast("Enter the account email before requesting a reset."); return; } const accounts = readLocal("sw_accounts", {}); if (!accounts[email]) { $("#accountError").textContent = "No local account exists for that email. You can create a new account normally."; toast("No demo account found for that email. Create a new account instead."); return; } if (!confirm("Reset this demo account? Its saved email/password account record will be deleted. Existing orders and other store data will remain.")) return; delete accounts[email]; writeLocal("sw_accounts", accounts); const remembered = readLocal("sw_remembered_login", null); if (remembered && remembered.email === email) localStorage.removeItem("sw_remembered_login"); if (user && user.email === email) { user = null; localStorage.removeItem("sw_user"); } $("#lpw").value = ""; $("#rememberLogin").checked = false; $("#accountError").textContent = "Demo account reset. Create the account again with a new password."; toast("Local demo account reset"); dash(); };
    $("#dl").addEventListener("submit", e => { e.preventDefault(); const name = $("#aname").value.trim(), email = $("#le").value.trim().toLowerCase(), password = $("#lpw").value; if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return toast("Enter a valid email address"); if (password.length < 6) return toast("Password must be at least 6 characters"); const accounts = readLocal("sw_accounts", {}), existing = accounts[email]; if (existing && existing.password !== password) { $("#accountError").textContent = "That email already has an account. The password doesn't match. Use Forgot password? to reset this demo account."; toast("Incorrect password. Check it or use Forgot password to reset this demo account."); return; } if (!existing) { accounts[email] = { name: name || email.split("@")[0], password, created: Date.now() }; writeLocal("sw_accounts", accounts); } if ($("#rememberLogin").checked) writeLocal("sw_remembered_login", { email, password }); else localStorage.removeItem("sw_remembered_login"); user = { n: existing?.name || name || email.split("@")[0], email, role: "customer", authVersion: 1 }; writeLocal("sw_user", user); $("#accountError").textContent = ""; toast(existing ? "Signed in" : "Demo account created"); dash(); });
    $("#lo").onclick = () => { if (IS_ADMIN) return toast("Sign out of Admin first to end the admin session."); user = null; try { localStorage.removeItem("sw_user"); } catch {} cart = []; save(); draw(); dash(); };
    if (0) {
        $$(".btn").forEach(b => { b.addEventListener("mousemove", e => { const r = b.getBoundingClientRect(); gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * .2, y: (e.clientY - r.top - r.height / 2) * .3, duration: .3 }); }); b.addEventListener("mouseleave", () => gsap.to(b, { x: 0, y: 0, duration: .6, ease: "power2.out" })); });
    }
    const openS = () => { $("#sr").classList.add("on"); $("#si").value = ""; $("#sl").innerHTML = ""; setTimeout(() => $("#si").focus(), 50); };
    $("#sbtn").onclick = openS;
    $("#sr").onclick = e => { if (e.target.id == "sr")
        $("#sr").classList.remove("on"); };
    $("#si").oninput = e => { const q = e.target.value.toLowerCase(); $("#sl").innerHTML = q ? ALL.filter(p => (p.n + p.t).toLowerCase().includes(q)).map(p => `<div class="ci sr" data-id="${p.id}" style="cursor:pointer">${vis(p)}<b>${p.n}</b><span>${fmt(p.p)}</span></div>`).join("") || '<p class="mut">No matches</p>' : ""; };
    $("#tm").onclick = () => { const d = document.documentElement, dk = d.dataset.theme == "dark" || (!d.dataset.theme && matchMedia("(prefers-color-scheme:dark)").matches); d.dataset.theme = dk ? "light" : "dark"; try{localStorage.setItem("sw_theme",d.dataset.theme)}catch{} };
    $("#cu").value = cr;
    $("#cu").onchange = e => { cr = e.target.value; try{localStorage.setItem("sw_currency",cr)}catch{}; draw(); $("#hp").textContent = fmt(HS[hi].p); $("#hg").innerHTML = ES.map(card).join(""); const h = location.hash.slice(1); if (h == "shoes" || h == "wear") list(h == "shoes" ? "shoe" : "wear"); if (typeof dash === "function" && user) dash(); if (IS_ADMIN && $("#admin")) renderAdmin(); if (location.hash === "#pay") renderPay(); toast("Prices in " + cr); };
    $("#pa").onclick = () => { const ok = $("#pr").value.trim().toUpperCase() == "STRIDE10"; disc = ok ? .1 : 0; toast(ok ? "10% off applied" : "Invalid code (try STRIDE10)"); draw(); };
    document.addEventListener("mouseover", e => { const c = e.target.closest(".cd2"); if (c)
        theme(G(c.dataset.id).c); });
    const fine = matchMedia("(pointer:fine)").matches;
    const ANG = [
        { n: "Front", ry: 0, rx: 0, rz: 0 },
        { n: "Turn left", ry: -28, rx: 8, rz: -2 },
        { n: "Turn right", ry: 28, rx: 8, rz: 2 },
        { n: "Tilt up", ry: 0, rx: 24, rz: 0 },
        { n: "Tilt down", ry: 0, rx: -24, rz: 0 }
    ];
    if (fine)
        gsap.set("#cur", { xPercent: -50, yPercent: -170 });
    /* Perspective controls for the supplied product image, not separate angle photographs. */
    function rig(zone, tgt, o = {}) {
        const S = { a: 0, flip: 0, drag: 0, sx: 0, sy: 0 }, cur = $("#cur"), T = () => typeof tgt == "function" ? tgt() : tgt, A = () => ANG[S.a], Y = () => A().ry + (S.flip ? 180 : 0);
        const pose = (d = .7, e = "power3.inOut") => gsap.to(T(), { rotationY: Y(), rotationX: A().rx, rotation: A().rz, x: 0, y: 0, scale: 1, transformPerspective: 900, duration: d, ease: e, overwrite: "auto" });
        const api = {
            view(i) { S.a = i; pose(); o.onView && o.onView(i); },
            next() { api.view((S.a + 1) % ANG.length); },
            flip() {
                S.flip ^= 1;
                gsap.timeline().to(T(), { y: -90, duration: .25, ease: "power2.out", overwrite: "auto" }).to(T(), { y: 0, duration: .6, ease: "power3.out" });
                gsap.to(T(), { rotationY: Y(), transformPerspective: 900, duration: .85, ease: "power3.inOut" });
                toast(S.flip ? "Other side" : "Front side");
            },
            spin() {
                const r = gsap.getProperty(T(), "rotationY");
                gsap.to(T(), { rotationY: r + 360, transformPerspective: 900, duration: 1.2, ease: "power3.inOut", onComplete: () => gsap.set(T(), { rotationY: Y() }) });
            },
            reset(instant) {
                S.a = 0;
                S.flip = 0;
                o.onView && o.onView(0);
                if (instant)
                    gsap.set(T(), { clearProps: "transform" });
                else
                    pose(.5);
            }
        };
        const land = () => {
            const r = T().getBoundingClientRect();
            pop(r.left + r.width / 2, r.bottom - 10, "var(--a)", 14, 220, 6);
            shake(4);
            if (o.shadow)
                gsap.to("#shd", { scaleX: 1, opacity: .45, duration: .5, ease: "power2.out" });
        };
        const up = () => {
            if (!S.drag)
                return;
            S.drag = 0;
            if (cur)
                cur.textContent = "Grab & drop";
            gsap.timeline().to(T(), { x: 0, y: 0, rotation: A().rz, scale: 1, duration: .9, ease: "power3.out", overwrite: "auto" }).call(land, null, .33);
        };
        zone.addEventListener("pointerenter", () => { if (fine && cur) {
            cur.textContent = "Grab & drop";
            gsap.to(cur, { opacity: 1, duration: .2 });
        } });
        zone.addEventListener("pointerleave", () => { if (cur)
            gsap.to(cur, { opacity: 0, duration: .2 }); if (!S.drag)
            pose(.6, "power3.out"); });
        zone.addEventListener("pointermove", e => {
            if (fine && cur)
                gsap.to(cur, { x: e.clientX, y: e.clientY, duration: .2 });
            const r = zone.getBoundingClientRect(), px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
            if (S.drag)
                gsap.to(T(), { x: e.clientX - S.sx, y: e.clientY - S.sy - 24, rotation: A().rz + Math.max(-16, Math.min(16, (e.clientX - S.sx) * .05)), duration: .25, overwrite: "auto" });
            else if (e.pointerType == "mouse")
                gsap.to(T(), { rotationY: Y() + px * 16, rotationX: A().rx - py * 12, x: px * 16, y: py * 10, transformPerspective: 900, duration: .5, overwrite: "auto" });
        });
        zone.addEventListener("pointerdown", e => {
            if (e.button !== 0 || e.target.closest("button"))
                return;
            S.drag = 1;
            S.sx = e.clientX;
            S.sy = e.clientY;
            zone.setPointerCapture(e.pointerId);
            if (cur)
                cur.textContent = "Holding";
            gsap.to(T(), { scale: 1.12, y: -24, duration: .25, ease: "back.out(1.1)", overwrite: "auto" });
            if (o.shadow)
                gsap.to("#shd", { scaleX: .55, opacity: .15, duration: .3 });
        });
        zone.addEventListener("pointerup", up);
        zone.addEventListener("pointercancel", up);
        zone.addEventListener("contextmenu", e => { e.preventDefault(); api.flip(); });
        zone.addEventListener("dblclick", () => api.spin());
        return api;
    }
    const heroRig = rig($("#st"), $("#hw"), { shadow: true, onView: i => $$("#ang button").forEach((b, k) => b.classList.toggle("on", k == i)) });
    const modalRig = rig($("#mi"), () => $("#mi").firstElementChild, {});
    $("#ang").innerHTML = '<small class="mut" style="display:block;width:100%;font-size:11px">Interactive perspective · not separate product photographs</small>' + ANG.map((a, i) => `<button data-v="${i}">${a.n}</button>`).join("") + '<button data-v="flip">Other side</button><button data-v="spin">Spin</button>';
    $("#ang").children[0].classList.add("on");
    $("#ang").onclick = e => { const b = e.target.closest("button"); if (!b)
        return; const v = b.dataset.v; v == "flip" ? heroRig.flip() : v == "spin" ? heroRig.spin() : heroRig.view(+v); };
    /* Click + hover polish */
    document.addEventListener("pointerdown", e => {
        if (1)
            return;
        const d = document.createElement("div");
        d.className = "pr";
        d.style.left = e.clientX - 6 + "px";
        d.style.top = e.clientY - 6 + "px";
        document.body.appendChild(d);
        gsap.fromTo(d, { scale: .4, opacity: .9 }, { scale: 4, opacity: 0, duration: .6, ease: "power2.out", onComplete: () => d.remove() });
        const b = e.target.closest(".btn,.ib,.fl button,.sw button,.sz button,.ang button");
        if (b)
            gsap.fromTo(b, { scale: .92 }, { scale: 1, duration: .55, ease: "power2.out", onComplete: () => gsap.set(b, { clearProps: "scale" }) });
    });
    document.addEventListener("mousemove", e => {
        if (R)
            return;
        const c = e.target.closest(".cd2");
        if (!c)
            return;
        const m = c.querySelector("img,svg"), r = c.getBoundingClientRect(), px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
        gsap.to(m, { rotationY: px * 8, rotationX: -py * 6, scale: 1.03, transformPerspective: 700, duration: .4, overwrite: "auto" });
    });
    document.addEventListener("mouseout", e => {
        const c = e.target.closest(".cd2");
        if (!c || c.contains(e.relatedTarget))
            return;
        gsap.to(c.querySelector("img,svg"), { rotationY: 0, rotationX: 0, x: 0, y: 0, scale: 1, rotation: 0, duration: .6, ease: "power3.out" });
        theme(base);
    });
    $("#sfb").onclick = () => {
        const v = +$("#sfi").value;
        if (!v || v < 22 || v > 32) {
            toast("Enter your foot length in cm (22–32)");
            return;
        }
        const us = Math.max(7, Math.min(11, v - 18)), best = sel.sz.reduce((a, b) => Math.abs(b - us) < Math.abs(a - us) ? b : a);
        $(`#sz [data-s="${best}"]`).click();
        toast(`We suggest US ${best}`);
    };
    $("#msh").onclick = async () => { try {
        await navigator.clipboard.writeText(location.href);
        toast("Link copied");
    }
    catch (e) {
        toast("Couldn’t copy — use the address bar");
    } };
    /* Paper plane: launches from the checkout button, loops, and flies off screen */
    function plane(from) {
        if (1)
            return;
        const r = from.getBoundingClientRect(), W = innerWidth, H = innerHeight, p = document.createElement("div");
        p.className = "plane";
        p.innerHTML = '<svg viewBox="0 0 64 64" width="72" height="72"><path d="M4 30 60 4 40 60 30 38z" fill="#fff" stroke="#17211c" stroke-width="2" stroke-linejoin="round"/><path d="M30 38 60 4 26 34z" fill="#d9d4c7" stroke="#17211c" stroke-width="2" stroke-linejoin="round"/></svg>';
        p.style.left = r.left + r.width / 2 - 36 + "px";
        p.style.top = r.top + r.height / 2 - 36 + "px";
        document.body.appendChild(p);
        let n = 0;
        const trail = () => {
            if (++n % 3)
                return;
            const q = p.getBoundingClientRect(), d = document.createElement("i");
            d.className = "cf";
            d.style.cssText = `left:${q.left + q.width / 2}px;top:${q.top + q.height / 2}px;width:7px;height:7px;border-radius:50%;background:var(--a)`;
            document.body.appendChild(d);
            gsap.to(d, { scale: 0, opacity: 0, duration: .9, onComplete: () => d.remove() });
        };
        gsap.timeline({ onUpdate: trail, onComplete: () => p.remove() })
            .fromTo(p, { scale: .2, rotation: -30, opacity: 0 }, { scale: 1, rotation: -20, opacity: 1, duration: .3, ease: "back.out(1.1)" })
            .to(p, { x: -W * .3, y: -H * .3, rotation: -60, duration: .6, ease: "power2.out" })
            .to(p, { x: -W * .5, y: -H * .1, rotation: -420, duration: .8, ease: "power1.inOut" })
            .to(p, { x: W * .5, y: -H * 1.1, rotation: -435, scale: .4, duration: .9, ease: "power2.in" });
    }
    function showOk(n) {
        $("#okt").textContent = `Order #SW-${10000 + Math.random() * 89999 | 0} · ${n} item${n > 1 ? "s" : ""} · ships Dec 2026. Demo only, nothing charged.`;
        $("#ok").classList.add("on");
        if (!R)
            gsap.from("#ok .mb", { y: 60, scale: .9, opacity: 0, duration: .5, ease: "back.out(1.1)" });
    }
    $("#ok").onclick = e => { if (e.target.id == "ok" || e.target.closest("button"))
        $("#ok").classList.remove("on"); };
    addEventListener("scroll", () => { const on = scrollY > 600; $("#up").style.opacity = on ? 1 : 0; $("#up").style.pointerEvents = on ? "auto" : "none"; }, { passive: true });
    $("#up").onclick = () => scrollTo({ top: 0, behavior: R ? "auto" : "smooth" });
    /* Real order activity only: one notification per tab session, never invented buyers. */
    function live() {
        if (!RECENT.length || sessionStorage.getItem("sw_order_notice_seen")) return;
        sessionStorage.setItem("sw_order_notice_seen","1");
        const label=RECENT[0].privateName ? "Someone" : RECENT[0].first;
        const e=$("#live"); e.textContent=label+" just ordered";
        e.style.display="flex"; e.style.opacity="1"; e.style.transform="translateY(0)";
        setTimeout(()=>{e.style.opacity="0";e.style.transform="translateY(120px)";},3600);
    }
    window.addEventListener("stridewell:order-placed",()=>setTimeout(live,700));
    addEventListener("load", () => window.ScrollTrigger && ScrollTrigger.refresh());
    function start() { setTimeout(live, 6000); setInterval(() => { if (!document.hidden && !R)
        live(); }, 11000); gsap.registerPlugin(window.ScrollTrigger); if (window.ScrollTrigger)
        gsap.to("#pgb", { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: .2 } }); draw(); hero(0, true); go(location.hash.slice(1)); if (!localStorage.getItem("sw_welcome_seen")) setTimeout(() => { const w = $("#welcomeDemo"); if (w) w.hidden = false; }, 900); if (!R) {
        gsap.from("#hi", { y: -500, rotation: -30, opacity: 0, duration: 1.4, ease: "power3.out", delay: .5 });
        gsap.from("#big", { scale: .7, opacity: 0, duration: 1.4, ease: "power3.out" });
    } }
    function end() { const i = $("#intro"); if (!i)
        return; gsap.to(i, { clipPath: "inset(0 0 100% 0)", duration: .8, ease: "power4.inOut", onComplete: () => i.remove() }); start(); }
    if (R || !!user) {
        // Returning customers go straight to the storefront; the cinematic intro is first-visit only.
        $("#intro").remove();
        start();
    }
    else {
        const n = $("#in-n"), t = $("#in-t"), o = { v: 0 };
        t.textContent = "";
        const W = [["STUDIO", "#0d0d0d", "#fff"], ["×", "#d4202a", "#fff"], ["STRIDE", "#ebe7de", "#111"], ["NUMBERED.", "#0d0d0d", "#fff"], ["LIMITED.", "#234f3b", "#e3d3a4"]];
        const word = w => {
            n.style.fontSize = "clamp(48px,13vw,170px)";
            n.innerHTML = [...w].map(c => `<span style="display:inline-block">${c}</span>`).join("");
            gsap.from(n.children, { yPercent: 110, rotation: () => gsap.utils.random(-20, 20), duration: .55, stagger: .045, ease: "power4.out" });
        };
        const tl = gsap.timeline();
        let x = .2;
        W.forEach(([w, b, f]) => {
            tl.to("#intro", { backgroundColor: b, color: f, duration: .22 }, x)
              .call(word, [w], x + .08);
            x += .45;
        });
        tl.call(() => { n.style.fontSize = ""; n.textContent = "000"; t.textContent = "STRIDEWELL · MADE TO MOVE"; }, null, x)
            .to("#intro", { backgroundColor: "#d08a1e", color: "#111", duration: 1.1 }, x)
            .to(o, { v: 100, duration: 1.5, ease: "power2.inOut", onUpdate: () => n.textContent = String(Math.round(o.v)).padStart(3, "0") }, x)
            .call(() => t.textContent = `DROPS IN ${Math.ceil((END - Date.now()) / 864e5)} DAYS`, null, x + 1.5)
            .to(n, { scale: 1.12, duration: .45, ease: "power2.out" }, x + 1.5)
            .to(n, { scale: 5, opacity: 0, duration: .55, ease: "power4.in" }, x + 2.25)
            .call(end, null, x + 2.6);
        $("#skip").onclick = () => { tl.kill(); end(); };
    }
  
    // V8 account settings: migrate account identity consistently across local records.
    document.addEventListener("submit", e => {
      if (e.target.id !== "accountSettings") return; e.preventDefault();
      if (!user || IS_ADMIN) return toast("Sign in as a customer to edit account settings.");
      const d = new FormData(e.target), oldEmail = String(user.email||"").toLowerCase(), name = String(d.get("name")||"").trim(), email = String(d.get("email")||"").trim().toLowerCase(), current = String(d.get("currentPassword")||""), next = String(d.get("newPassword")||"");
      const accounts = readLocal("sw_accounts", {}), account = accounts[oldEmail];
      if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return toast("Enter a valid name and email.");
      if (!account || account.password !== current) return toast("Current password is incorrect.");
      if (next && next.length < 6) return toast("New password must be at least 6 characters.");
      if (email !== oldEmail && accounts[email]) return toast("That email already belongs to another local account.");
      delete accounts[oldEmail]; accounts[email] = { ...account, name, password: next || account.password, updated: Date.now() };
      if (!writeLocal("sw_accounts", accounts)) return;
      user = { ...user, n:name, email }; writeLocal("sw_user",user);
      const orders = readLocal("sw_orders",[]).map(o => (o.email||"").toLowerCase()===oldEmail ? {...o,email,name} : o); writeLocal("sw_orders",orders); ORD=orders;
      const remembered = readLocal("sw_remembered_login",null); if (remembered && remembered.email===oldEmail) writeLocal("sw_remembered_login",{email,password:next||remembered.password});
      dash(); const msg=$("#settingsMessage"); if(msg)msg.textContent="Your account details were updated."; toast("Account settings saved across your local account and order history.");
    }, true);
    document.addEventListener("click", e => {
      // Keep history actions separate from wishlist and product catalogue data.
      const remove = e.target.closest("[data-recent-remove]");
      if (remove) { rv = rv.filter(id => id !== remove.dataset.recentRemove); try { localStorage.setItem("sw_recent", JSON.stringify(rv)); } catch {} if (user) dash(); return; }
      const clear = e.target.closest("[data-recent-clear]");
      if (clear) { if (!rv.length) return toast("Recently viewed is already empty."); if (!confirm("Clear your entire recently viewed list?")) return; rv = []; try { localStorage.setItem("sw_recent", "[]"); } catch {} if (user) dash(); else { const box=$("#rv"); if(box)box.textContent="Nothing viewed recently"; } toast("Recently viewed cleared."); return; }
      const b=e.target.closest("[data-recent]"); if(b){const id=b.dataset.recent;if(G(id))openM(id);}
    });
    // Restore form values whenever the account dashboard is rendered.
    const baseDashV8 = dash; dash = function(){ baseDashV8(); if(user && !IS_ADMIN){ const n=$("#settingName"), em=$("#settingEmail"); if(n)n.value=user.n||""; if(em)em.value=user.email||""; } };

/* Stridewell | orders-and-checkout.js */
/* ===== Store layer: shared config, orders, auth, admin ===== */
    const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
    // Shared demo configuration: persisted in this browser's localStorage, not a remote database.
    const DEF = {
        end: END,
        base: 1347,
        posts: [{ id: "p1", t: "Drop 01 opens soon", b: "Numbered runs, no restocks. Preorders close when the clock hits zero.", d: Date.now() }],
        off: {},
        price: {},
        products: {}
    };
    const STATUS = ["Pending", "Paid", "Cutting", "Sewing", "Shipped", "Delivered", "Cancelled", "Refunded"];
    let CFG = JSON.parse(JSON.stringify(DEF)), ORD = [], SUBS = [], tab = "orders";
    const BASEP = Object.fromEntries(ALL.map(p => [p.id, p.p]));
    const store = (k, v) => {
        try {
            if (v === undefined) return JSON.parse(localStorage.getItem(k) || "[]");
            localStorage.setItem(k, JSON.stringify(v));
        } catch (e) { }
        return v === undefined ? [] : v;
    };

    function applyCfg() {
        END = +CFG.end || DEF.end;
        pre = +CFG.base || 0;
        ALL.forEach(p => { const meta = CFG.products?.[p.id] || {}; p.n = meta.n || p.n; p.img = meta.img || p.img; p.p = CFG.price[p.id] != null ? +CFG.price[p.id] : BASEP[p.id]; });
        $("#hg").innerHTML = ES.filter(p => !CFG.off[p.id]).map(card).join("");
        $("#hp").textContent = fmt(HS[hi].p);
        // Refresh both catalogue sections even when the admin page is active.
        list("shoe");
        list("wear");
        renderInsider();
        draw();
        tick();
        if (IS_ADMIN && $("#admin")) renderAdmin();
    }

    function renderInsider() {
        const host = $("#ins");
        if (!host) return;
        const posts = Array.isArray(CFG.posts) ? CFG.posts : [];
        const sorted = [...posts].sort((x, y) => Number(!!y.pin) - Number(!!x.pin) || (+y.d || 0) - (+x.d || 0));
        const cards = sorted.map(post => {
            const article = document.createElement("article");
            article.className = "fc insider-post-expanded";
            const date = document.createElement("div");
            date.className = "mut";
            date.textContent = `${post.pin ? "Pinned · " : ""}${post.d ? new Date(post.d).toLocaleDateString() : ""}`;
            const title = document.createElement("h3");
            title.textContent = String(post.t ?? "");
            const body = document.createElement("p");
            body.style.whiteSpace = "pre-wrap";
            body.style.overflowWrap = "anywhere";
            body.textContent = String(post.b ?? "");
            article.append(date, title, body);
            return article;
        });
        if (cards.length) host.replaceChildren(...cards);
        else {
            const empty = document.createElement("p");
            empty.className = "mut";
            empty.textContent = "Nothing new yet. Check back soon.";
            host.replaceChildren(empty);
        }
    }

    // Local-only demo storage. This is deliberately not secure authentication:
    // credentials and data live in this browser and can be inspected/edited.
    const ADMIN_USER = "admin";
    const ADMIN_PASS = "stridewell2026";
    const readLocal = (key, fallback) => { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; } };
    const writeLocal = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { toast("Browser storage is unavailable"); return false; } };
    let IS_ADMIN = localStorage.getItem("sw_admin_session") === "1";
    const ADMIN_BROWSER_ID = localStorage.getItem("sw_admin_browser_id") || (() => { const id = "adm-" + Math.random().toString(36).slice(2); localStorage.setItem("sw_admin_browser_id", id); return id; })();
    function adminPresence() { const all = readLocal("sw_admin_presence", {}), now = Date.now(); for (const [id, stamp] of Object.entries(all)) if (now - stamp > 45000) delete all[id]; if (IS_ADMIN) all[ADMIN_BROWSER_ID] = now; writeLocal("sw_admin_presence", all); return Object.keys(all).length; }
    if (IS_ADMIN) { if (!user || user.role !== "admin") { const prior = user; localStorage.setItem("sw_pre_admin_user", JSON.stringify(prior)); user = prior ? { ...prior, role: "admin" } : { n: "Store admin", email: "admin@stridewell.demo", role: "admin", authVersion: 1 }; writeLocal("sw_user", user); } adminPresence(); setInterval(() => { if (IS_ADMIN) adminPresence(); }, 15000); }
    const savedCfg = readLocal("sw_cfg", {});
    CFG = { ...DEF, ...savedCfg, posts: Array.isArray(savedCfg.posts) ? savedCfg.posts : DEF.posts, off: { ...DEF.off, ...(savedCfg.off || {}) }, price: { ...DEF.price, ...(savedCfg.price || {}) }, products: { ...(savedCfg.products || {}) }, customProducts: Array.isArray(savedCfg.customProducts) ? savedCfg.customProducts : [] };
    (CFG.customProducts || []).forEach(p => { if (!ALL.some(x => x.id === p.id)) ALL.push(p); });
    ALL.forEach(p => { const meta=CFG.products?.[p.id]||{}; if(meta.n)p.n=meta.n; if(meta.img)p.img=meta.img; if(CFG.price[p.id]!=null)p.p=+CFG.price[p.id]; });
    ORD = readLocal("sw_orders", readLocal("sw_o", []));
    SUBS = readLocal("sw_subs", []);
    let RECENT = [];
    function saveCfg() { if (!IS_ADMIN) return toast("Sign in as admin first"); writeLocal("sw_cfg", CFG); toast("Saved on this browser"); }
    async function saveOrder(o) {
        const l = readLocal("sw_orders", []);
        l.push(o);
        const saved = writeLocal("sw_orders", l);
        ORD = l;
        RECENT = [{ first: esc((o.name || "Someone").split(" ")[0]), privateName: !!o.privateName }];
        window.dispatchEvent(new CustomEvent("stridewell:data-updated", { detail: { type: "orders" } }));
        window.dispatchEvent(new CustomEvent("stridewell:order-placed"));
        return saved;
    }
    async function setStatus(_u, id, st) {
        const current = readLocal("sw_orders", []);
        const index = current.findIndex(o => String(o.id) === String(id));
        if (index < 0) throw new Error("Order not found in this browser's saved order list");
        current[index] = { ...current[index], status: st, updatedAt: Date.now() };
        if (!writeLocal("sw_orders", current)) throw new Error("Could not save order status");
        // Read back what the browser actually stored before refreshing either dashboard.
        const verified = readLocal("sw_orders", []);
        const saved = verified.find(o => String(o.id) === String(id));
        if (!saved || saved.status !== st) throw new Error("Order status could not be verified after saving");
        ORD = verified;
        refreshLocalData();
        window.dispatchEvent(new CustomEvent("stridewell:data-updated", { detail: { type: "orders", id, status: st } }));
        return true;
    }

    // Keep open tabs in sync when the same local demo is used in another tab.
    window.addEventListener("storage", e => {
        if (["sw_orders", "sw_subs", "sw_cfg"].includes(e.key)) {
            refreshLocalData();
            applyCfg();
            if (typeof dash === "function" && user) dash();
        }
    });
    window.addEventListener("stridewell:data-updated", () => {
        refreshLocalData();
        applyCfg();
        if (typeof dash === "function" && user) dash();
        if (typeof tick === "function") tick();
    });
    window.addEventListener("focus", () => {
        if (IS_ADMIN && $("#admin")) renderAdmin();
        if (typeof dash === "function" && user) dash();
    });
    const READY = Promise.resolve();

    /* ---- Routing ---- */
    const baseGo = go;
    go = async h => {
        if (h == "admin") return openAdmin();
        if (h == "pay" && !shoppingAllowed()) { toast(IS_ADMIN ? "Admin accounts cannot preorder." : "Sign in before checkout."); if (!IS_ADMIN) { history.replaceState(null, "", "#dash"); baseGo("dash"); } return; }
        $("#admin")?.remove();
        if (h == "pay" && !cart.length) { history.replaceState(null, "", "#home"); h = ""; }
        if (h == "pay") renderPay();
        baseGo(h);
    };

    /* ---- Admin ---- */
    function openAdmin() {
        $$(".pg").forEach(p => p.classList.remove("on"));
        $$(".lk a").forEach(a => a.classList.remove("on"));
        if (!$("#admin")) {
            const d = document.createElement("div");
            d.className = "pg on";
            d.id = "admin";
            $("main").appendChild(d);
        }
        $("#admin").classList.add("on");
        scrollTo(0, 0);
        renderAdmin();
    }

    function refreshLocalData() {
        ORD = readLocal("sw_orders", []);
        SUBS = readLocal("sw_subs", []);
        const latestCfg = readLocal("sw_cfg", {});
        CFG = { ...DEF, ...latestCfg,
            posts: Array.isArray(latestCfg.posts) ? latestCfg.posts : DEF.posts,
            off: { ...DEF.off, ...(latestCfg.off || {}) },
            price: { ...DEF.price, ...(latestCfg.price || {}) },
            products: { ...(latestCfg.products || {}) },
            customProducts: Array.isArray(latestCfg.customProducts) ? latestCfg.customProducts : []
        };
        (CFG.customProducts || []).forEach(p => { if (!ALL.some(x => x.id === p.id)) ALL.push(p); });
        ALL.forEach(p => { const meta=CFG.products?.[p.id]||{}; if(meta.n)p.n=meta.n; if(meta.img)p.img=meta.img; if(CFG.price[p.id]!=null)p.p=+CFG.price[p.id]; else if(BASEP[p.id]!=null)p.p=BASEP[p.id]; });
    }

    function renderAdmin() {
        const el = $("#admin");
        if (!el) return;
        refreshLocalData();
        if (!IS_ADMIN) {
            el.innerHTML = `<div class="w" style="padding:60px 24px;max-width:520px"><div class="tg">Restricted area · demo mode</div><h2>Admin sign in</h2><p class="mut">This is a local demonstration login. It is not secure and must never protect real customer data.</p><form id="adminLogin" class="fm"><label>Username<input name="username" autocomplete="username" required></label><label>Password<input name="password" type="password" autocomplete="current-password" required></label><button class="btn" type="submit">Enter control room</button><p class="mut" id="adminError" aria-live="polite"></p></form><p class="mut">Public demo credentials: username <b>admin</b> · password <b>stridewell2026</b>. These are intentionally visible so visitors can test the control room.</p><button class="ib" data-go="home">Back to storefront</button></div>`;
            // Admin login is handled once by the delegated submit handler below.
            return;
        }
        const paid = ORD.filter(o => !["Cancelled", "Refunded", "Pending"].includes(o.status)), rev = paid.reduce((s, o) => s + o.total, 0), activeAdmins = adminPresence();
        const tabs = ["orders", "customers", "insider", "countdown", "products", "subscribers"];
        const money = n => fmt(+n || 0);
        let body = "";
        if (tab == "orders") {
            const q = (el.querySelector("#aq")?.value || "").toLowerCase(), fs = el.querySelector("#af")?.value || "";
            const rows = ORD.filter(o => (!fs || o.status == fs) && (o.name + o.email + o.id).toLowerCase().includes(q)).sort((a, b) => b.at - a.at);
            body = `<div class="ar"><input id="aq" placeholder="Search name, email, order id" value="${esc(q)}"><select id="af"><option value="">All statuses</option>${STATUS.map(s => `<option ${s == fs ? "selected" : ""}>${s}</option>`).join("")}</select><button class="ib" data-a="csv">Export CSV</button></div>
                <div class="at"><table><tr><th>Order</th><th>Customer</th><th>Items</th><th>Total</th><th>Payment</th><th>Status</th><th>Placed</th></tr>
                ${rows.map(o => `<tr><td>${esc(o.id)}</td><td>${esc(o.name)}<br><span class="mut">${esc(o.email)}</span></td><td>${o.items.map(i => esc(i.n) + " × " + i.q).join("<br>")}</td><td>${money(o.total)}</td><td>${esc(o.pay)}</td>
                <td><select data-order="${esc(o.id)}">${STATUS.map(s => `<option ${s == o.status ? "selected" : ""}>${s}</option>`).join("")}</select></td><td>${new Date(o.at).toLocaleString()}</td></tr>`).join("") || '<tr><td colspan="7" class="mut">No orders yet.</td></tr>'}</table></div>`;
        } else if (tab == "customers") {
            const m = {};
            ORD.forEach(o => { const c = m[o.email] = m[o.email] || { n: o.name, e: o.email, c: 0, s: 0, l: 0 }; c.c++; c.s += o.total; c.l = Math.max(c.l, o.at); });
            body = `<div class="at"><table><tr><th>Name</th><th>Email</th><th>Orders</th><th>Spent</th><th>Last order</th></tr>${Object.values(m).map(c => `<tr><td>${esc(c.n)}</td><td>${esc(c.e)}</td><td>${c.c}</td><td>${money(c.s)}</td><td>${new Date(c.l).toLocaleDateString()}</td></tr>`).join("") || '<tr><td colspan="5" class="mut">No customers yet.</td></tr>'}</table></div>`;
        } else if (tab == "insider") {
            body = `<form class="ar" id="ap"><input name="t" placeholder="Headline" required maxlength="80"><textarea name="b" placeholder="Full post details" required maxlength="5000" rows="6" style="min-width:min(520px,100%);padding:12px;border:1px solid var(--line);border-radius:10px;background:var(--card);color:var(--ink)"></textarea><label><input type="checkbox" name="pin"> Pin</label><button class="ib">Publish post</button></form>
                <div class="at"><table>${CFG.posts.map(p => `<tr><td><b>${esc(p.t)}</b>${p.pin ? " (pinned)" : ""}<br><span class="mut">${esc(p.b)}</span></td><td><button class="ib" data-del="${esc(p.id)}">Delete</button></td></tr>`).join("") || '<tr><td class="mut">No posts.</td></tr>'}</table></div>`;
        } else if (tab == "countdown") {
            const v = new Date(END - new Date(END).getTimezoneOffset() * 6e4).toISOString().slice(0, 16);
            body = `<form class="ar" id="ac"><label>Drop closes at <input type="datetime-local" name="end" value="${v}" required></label><label>Preorders counted <input type="number" name="base" min="0" max="2400" value="${CFG.base}"></label><button class="ib">Save</button></form>
                <p class="mut">The public countdown runs in real time against this date. Real orders you see in the Orders tab: ${ORD.length}.</p>`;
        } else if (tab == "products") {
            body = `<p class="mut">Changes saved here update product cards, search, product details, bag totals and future checkout totals. Past orders keep the price charged when they were placed. Uploaded images are resized and saved in this browser; large uploads may hit browser storage limits.</p><div class="at"><table><tr><th>Item</th><th>Name</th><th>Price (${cr})</th><th>Image</th><th>Visible</th></tr>${ALL.map(p => `<tr><td>${esc(p.id)}</td><td><input type="text" data-pname="${p.id}" value="${esc(p.n)}" maxlength="80"></td><td><div style="display:flex;align-items:center;gap:6px;min-width:150px"><input type="number" min="1" step="1" data-pr="${p.id}" value="${p.p}" aria-label="Price for ${esc(p.n)}"><button class="ib" type="button" data-pr-save="${p.id}">Set</button></div></td><td><label class="ib">Upload image<input type="file" accept="image/*" data-pimage="${p.id}" hidden></label></td><td><input type="checkbox" data-vis="${p.id}" ${CFG.off[p.id] ? "" : "checked"}></td></tr>`).join("")}</table></div><h3 style="margin-top:28px">Add a listing</h3><form id="newProduct" class="admin-product-editor"><label>Item name<input name="name" required maxlength="80"></label><label>Price in USD<input name="price" type="number" min="1" step="1" required></label><label>Listing type<select name="category"><option value="wear">Listings / accessory</option><option value="shoe">Footwear</option></select></label><label>Image file<input name="image" type="file" accept="image/*" required></label><button class="ib" type="submit">Add listing</button></form>`;
        } else {
            body = `<div class="ar"><button class="ib" data-a="subcsv">Export CSV</button><button class="ib" data-a="mail">Prepare newsletter email</button></div>
                <div class="at"><table><tr><th>Email</th><th>Joined</th></tr>${SUBS.map(s => `<tr><td>${esc(s.email)}</td><td>${new Date(s.at).toLocaleDateString()}</td></tr>`).join("") || '<tr><td colspan="2" class="mut">No subscribers recorded.</td></tr>'}</table></div>`;
        }
        const keep = document.activeElement?.id;
        el.innerHTML = `<div class="w" style="padding:40px 24px"><div class="tg">Admin · local demo <span class="role-badge">ADMIN</span></div><div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap"><h2 style="margin:6px 0 20px">Drop 01 control room</h2><button class="ib" data-logout>Sign out</button></div><p class="mut">Local demo storage only: orders from this same browser profile and exact site file appear here. Different devices, browsers, or separately opened copies do not share data. <button class="ib" type="button" data-a="refresh">Refresh orders</button></p>
            <div class="ak"><div><b>${ORD.length}</b><span>Orders</span></div><div><b>${paid.length}</b><span>Paid or in production</span></div><div><b>${money(rev)}</b><span>Revenue</span></div><div><b>${SUBS.length}</b><span>Subscribers</span></div><div><b>${activeAdmins}</b><span>Active admin browsers</span></div></div>
            <div class="fl ad-tabs">${tabs.map(t => `<button class="${t == tab ? "on" : ""}" data-tab="${t}">${t[0].toUpperCase() + t.slice(1)}</button>`).join("")}</div>${body}</div>`;
        if (keep && el.querySelector("#" + keep)) { const k = el.querySelector("#" + keep); k.focus(); try { k.setSelectionRange(k.value.length, k.value.length); } catch (e) { } }
    }

    document.addEventListener("submit", e => {
        if (e.target.id !== "adminLogin") return;
        e.preventDefault();
        const d = new FormData(e.target);
        // Trim accidental leading/trailing whitespace before comparing demo credentials.
        const adminUsername = String(d.get("username") || "").trim();
        const adminPassword = String(d.get("password") || "").trim();
        if (adminUsername === ADMIN_USER && adminPassword === ADMIN_PASS) {
            IS_ADMIN = true; localStorage.setItem("sw_admin_session", "1"); adminPresence(); localStorage.setItem("sw_pre_admin_user", JSON.stringify(user)); user = user ? { ...user, role: "admin" } : { n: "Store admin", email: "admin@stridewell.demo", role: "admin", authVersion: 1 }; writeLocal("sw_user", user); updateRoleBadge(); refreshCommerceControls(); setInterval(() => { if (IS_ADMIN) adminPresence(); }, 15000); renderAdmin();
        } else { const msg = $("#adminError"); if (msg) msg.textContent = "Incorrect username or password. Check the demo credentials shown below."; toast("Admin sign-in failed. Check username and password."); }
    });
    document.addEventListener("click", async e => {
        if (e.target.closest("#admin [data-logout]")) { IS_ADMIN = false; localStorage.removeItem("sw_admin_session"); const presence = readLocal("sw_admin_presence", {}); delete presence[ADMIN_BROWSER_ID]; writeLocal("sw_admin_presence", presence); const prior = readLocal("sw_pre_admin_user", null); localStorage.removeItem("sw_pre_admin_user"); user = prior || null; if (user) writeLocal("sw_user", user); else localStorage.removeItem("sw_user"); updateRoleBadge(); refreshCommerceControls(); $("#admin")?.remove(); if(user){ location.hash="dash"; if(typeof dash==="function")dash(); } else { location.hash="home"; } return; }
        const priceSave = e.target.closest("#admin [data-pr-save]");
        if (priceSave && IS_ADMIN) {
            const id = priceSave.dataset.prSave, input = document.querySelector(`#admin [data-pr="${CSS.escape(id)}"]`);
            const value = Number(input?.value);
            if (!input || !Number.isFinite(value) || value < 1) { toast("Enter a valid price greater than zero."); input?.focus(); return; }
            CFG.price[id] = value;
            if (!writeLocal("sw_cfg", CFG)) { toast("Price could not be saved in this browser."); return; }
            applyCfg(); renderAdmin(); toast("Price updated across the storefront."); return;
        }
        const el = e.target.closest("#admin [data-tab],#admin [data-a],#admin [data-del]");
        if (!el || !IS_ADMIN) return;
        if (el.dataset.tab) { tab = el.dataset.tab; renderAdmin(); }
        if (el.dataset.del) { CFG.posts = CFG.posts.filter(p => p.id != el.dataset.del); saveCfg(); renderAdmin(); }
        const csv = (n, rows) => { const data = rows.map(r => r.map(c => '"' + String(c ?? "").replace(/"/g, '""') + '"').join(",")).join("\n"); const url = URL.createObjectURL(new Blob([data], { type: "text/csv;charset=utf-8" })); const a = document.createElement("a"); a.href = url; a.download = n; a.click(); URL.revokeObjectURL(url); };
        if (el.dataset.a == "refresh") { refreshLocalData(); renderAdmin(); toast("Orders refreshed from this browser"); }
        if (el.dataset.a == "csv") csv("orders.csv", [["id", "name", "email", "total", "payment", "status", "placed"], ...ORD.map(o => [o.id, o.name, o.email, o.total, o.pay, o.status, new Date(o.at).toISOString()])]);
        if (el.dataset.a == "subcsv") csv("subscribers.csv", [["email", "joined"], ...SUBS.map(s => [s.email, new Date(s.at).toISOString()])]);
        if (el.dataset.a == "mail") location.href = `mailto:?bcc=${encodeURIComponent(SUBS.map(s => s.email).join(","))}&subject=${encodeURIComponent("Stridewell Drop 01 — latest")}&body=${encodeURIComponent(newsletterText())}`;
    });
    document.addEventListener("change", async e => {
        const t = e.target;
        if (!IS_ADMIN || !t.closest("#admin")) return;
        if (t.dataset.order) {
            const selectedStatus = t.value, orderId = t.dataset.order;
            t.disabled = true;
            try {
                await setStatus(null, orderId, selectedStatus);
                refreshLocalData();
                renderAdmin();
                if (typeof dash === "function" && user) dash();
                if (typeof tick === "function") tick();
                toast(`Order ${orderId} updated to ${selectedStatus}.`);
            } catch (er) {
                refreshLocalData(); renderAdmin();
                toast("Status was not saved: " + (er?.message || "storage error"));
            }
            return;
        }
        // Product prices are committed explicitly with Set or Enter, not merely on blur.
        if (t.dataset.pr) { /* edited value remains pending until the admin confirms it */ }
        if (t.dataset.pname) { const id=t.dataset.pname; CFG.products=CFG.products||{}; CFG.products[id]={...(CFG.products[id]||{}),n:t.value.trim()||G(id)?.n}; saveCfg(); applyCfg(); }
        if (t.dataset.pimage && t.files?.[0]) { const id=t.dataset.pimage, file=t.files[0]; if(!file.type.startsWith("image/")) return toast("Choose an image file."); const reader=new FileReader(); reader.onload=()=>{ const img=new Image(); img.onload=()=>{ const max=1400, scale=Math.min(1,max/Math.max(img.width,img.height)), c=document.createElement("canvas"); c.width=Math.round(img.width*scale);c.height=Math.round(img.height*scale);c.getContext("2d").drawImage(img,0,0,c.width,c.height); const data=c.toDataURL("image/jpeg",.84); CFG.products=CFG.products||{};CFG.products[id]={...(CFG.products[id]||{}),img:data}; if(writeLocal("sw_cfg",CFG)){applyCfg();toast("Product image updated across the storefront.");} };img.onerror=()=>toast("That image could not be opened.");img.src=reader.result; };reader.readAsDataURL(file); }
        if (t.dataset.vis) { CFG.off[t.dataset.vis] = !t.checked; saveCfg(); applyCfg(); }
        if (t.id == "af") renderAdmin();
    }, true);
    document.addEventListener("keydown", e => {
        if (e.key !== "Enter" || !e.target.matches("#admin [data-pr]")) return;
        e.preventDefault();
        e.target.closest("td")?.querySelector("[data-pr-save]")?.click();
    });
    document.addEventListener("input", e => { if (e.target.id == "aq") renderAdmin(); });
    document.addEventListener("submit", e => {
        const f = e.target;
        if (!IS_ADMIN || !f.closest("#admin")) return;
        e.preventDefault();
        e.stopImmediatePropagation();
        const d = new FormData(f);
        if (f.id == "ap") { CFG.posts.push({ id: "p" + Date.now(), t: d.get("t").trim(), b: d.get("b").trim(), pin: !!d.get("pin"), d: Date.now() }); }
        if (f.id == "ac") { CFG.end = new Date(d.get("end")).getTime(); CFG.base = +d.get("base") || 0; }
        if (f.id == "newProduct") {
          const name=String(d.get("name")||"").trim(), price=Number(d.get("price")), category=String(d.get("category")), file=d.get("image");
          if(!name || !Number.isFinite(price) || price<1 || !file || !file.size) return toast("Complete every listing field and choose an image.");
          if(!file.type.startsWith("image/")) return toast("Choose a valid image file.");
          const reader=new FileReader(); reader.onload=()=>{const img=new Image();img.onload=()=>{const max=1400,scale=Math.min(1,max/Math.max(img.width,img.height)),c=document.createElement("canvas");c.width=Math.round(img.width*scale);c.height=Math.round(img.height*scale);c.getContext("2d").drawImage(img,0,0,c.width,c.height);const data=c.toDataURL("image/jpeg",.84);const id="custom-"+Date.now();const item={id,n:name,c:"#8a8178",p:price,t:category==="shoe"?"leather":"apparel",d:"New Stridewell listing.",img:data,cat:category,sz:category==="shoe"?[7,8,9,10,11]:["One size"],interactive:true};ALL.push(item);if(category==="shoe")item.stock=25;CFG.customProducts=CFG.customProducts||[];CFG.customProducts.push(item);CFG.products=CFG.products||{};CFG.products[id]={n:name,img:data};CFG.price[id]=price;writeLocal("sw_cfg",CFG);applyCfg();renderAdmin();toast("New listing added. It is now available in the collection.");};img.onerror=()=>toast("That image could not be opened.");img.src=reader.result;};reader.readAsDataURL(file); return;
        }
        saveCfg();
        applyCfg();
    }, true);

    /* ---- Mock payment ---- */
    function renderPay() {
        const t = cart.reduce((s, i) => s + G(i.id).p * i.q, 0) * (1 - disc);
        $("#pys").innerHTML = cart.map(i => `<div class="pl"><span>${esc(G(i.id).n)} (${esc(i.s)}) × ${i.q}</span><b>${fmt(G(i.id).p * i.q * (1 - disc))}</b></div>`).join("") + `<div class="pl"><span>Total</span><b>${fmt(t)}</b></div>`;
        if (user && !IS_ADMIN) { $("#pf [name=name]").value = user.n || ""; $("#pf [name=email]").value = user.email || ""; $("#pf [name=email]").readOnly = true; }
    }
    const luhn = n => { let s = 0, d = false; for (let i = n.length - 1; i >= 0; i--) { let x = +n[i]; if (d && (x *= 2) > 9) x -= 9; s += x; d = !d; } return s % 10 == 0; };
    $("#co").onclick = () => {
        if (!shoppingAllowed()) { toast(IS_ADMIN ? "Admins cannot checkout. Sign out of Admin first." : "Sign in before checkout."); if (!IS_ADMIN) go("dash"); return; }
        if (!cart.length) return toast("Your bag is empty");
        tg(0);
        location.hash = "pay";
    };
    // Mock checkout validates test-card input before touching stock or creating an order.
    $("#pf").addEventListener("submit", async e => {
        e.preventDefault();
        if (!shoppingAllowed()) { toast("A customer account is required. Admins cannot buy."); return; }
        const accountEmail = user.email;
        const f = new FormData(e.target), num = String(f.get("card")).replace(/\D/g, ""), ex = String(f.get("exp")).match(/^(\d\d)\/(\d\d)$/), cvc = String(f.get("cvc"));
        if (num.length < 13 || !luhn(num)) return toast("That card number isn’t valid");
        if (!ex || +ex[1] < 1 || +ex[1] > 12 || new Date(2000 + +ex[2], +ex[1]) < new Date()) return toast("Check the expiry date");
        if (!/^\d{3,4}$/.test(cvc)) return toast("Check the security code");
        if (num == "4000000000000002") return toast("Card declined (test card). No order or stock change was made.");
        const btn = e.target.querySelector("button");
        btn.disabled = true;
        btn.textContent = "Processing…";
        await new Promise(r => setTimeout(r, 900));
        const stock = stockMap();
        for (const i of cart) { const p = G(i.id); if (p.cat === "shoe" && stockFor(p.id, i.s) < i.q) { toast(`Sorry, size ${i.s} of ${p.n} no longer has enough stock`); btn.disabled = false; btn.textContent = "Pay now (mock)"; return; } }
        for (const i of cart) { const p = G(i.id); if (p.cat === "shoe") { const key = p.id + "-" + i.s; stock[key] = stockFor(p.id, i.s) - i.q; } }
        try { localStorage.setItem("sw_stock", JSON.stringify(stock)); } catch { toast("Could not update stock. Order was not placed."); btn.disabled = false; btn.textContent = "Pay now (mock)"; return; }
        const t = cart.reduce((s, i) => s + G(i.id).p * i.q, 0) * (1 - disc);
        const o = { id: "SW-" + (10000 + Math.random() * 89999 | 0), name: String(f.get("name")).trim(), email: accountEmail, addr: String(f.get("addr")).trim(), items: cart.map(i => ({ n: G(i.id).n, s: i.s, q: i.q })), total: Math.round(t), pay: "Mock •••• " + num.slice(-4), status: "Paid", privateName: !!f.get("privateName"), at: Date.now() };
        const shared = await saveOrder(o), n = cart.length;
        applyCfg();
        cart = []; save(); draw(); e.target.reset();
        btn.disabled = false;
        btn.textContent = "Pay now (mock)";
        location.hash = "home";
        showOk(n);
        $("#okt").textContent = `Order #${o.id} · ${n} item${n > 1 ? "s" : ""} · ships Dec 2026. Mock payment, nothing charged.${shared ? "" : " (Saved on this browser only; this demo has no shared database.)"}`;
    });

    /* ---- Newsletter: generic welcome issue, handed to the visitor's mail app ---- */
    const newsletterText = () => `STRIDEWELL — Drop 01 dispatch\n\nHi there,\n\nThanks for joining the list. Here is what is coming:\n\n• Drop 01 is limited to 2,400 numbered pairs. No restocks.\n• Preorders close when the countdown hits zero. Pairs ship December 2026.\n• Free returns within 30 days, worn once.\n\nWalk like you mean it.\n— The Stridewell studio`;
    document.addEventListener("submit", async e => {
        if (!e.target.classList.contains("nf")) return;
        e.stopImmediatePropagation();
        e.preventDefault();
        const email = e.target.querySelector("input").value.trim(), s = { email, at: Date.now() };
        SUBS = readLocal("sw_subs", []); if (!SUBS.some(x => x.email.toLowerCase() === email.toLowerCase())) SUBS.push(s); writeLocal("sw_subs", SUBS);
        const o = document.createElement("div");
        o.className = "nlo";
        o.innerHTML = `<div class="nlc"><h3>You’re on the list</h3><p class="mut">Here is the welcome issue. This page has no mail server, so “Send to my inbox” opens your mail app with it ready to go.</p><pre>${esc(newsletterText())}</pre><a class="btn" href="mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent("Welcome to Stridewell Drop 01")}&body=${encodeURIComponent(newsletterText())}">Send to my inbox</a> <button class="btn o" type="button">Close</button></div>`;
        o.onclick = ev => { if (ev.target == o || ev.target.closest("button")) o.remove(); };
        document.body.appendChild(o);
        e.target.reset();
    }, true);

    $("#welcomeGuide").onclick = () => { localStorage.setItem("sw_welcome_seen", "1"); $("#welcomeDemo").hidden = true; go("guide"); };
    $("#welcomeSkip").onclick = () => { localStorage.setItem("sw_welcome_seen", "1"); $("#welcomeDemo").hidden = true; };
    applyCfg();
    refreshCommerceControls();
    if (location.hash == "#admin" || location.hash == "#pay") go(location.hash.slice(1));

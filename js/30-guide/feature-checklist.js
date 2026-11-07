/* Stridewell feature checklist. The old comic/speech-bubble helper has been removed. */
(() => {
  const $ = (selector) => document.querySelector(selector);
  const tasks = [
    ["nav", "Visit a navigation section"], ["search", "Search for a product"],
    ["filter", "Filter or sort a collection"], ["product", "Open a product"],
    ["size", "Choose a size"], ["wishlist", "Save a wishlist item"],
    ["bag", "Open your bag"], ["account", "Create an account or sign in"],
    ["remember", "Try Remember me"], ["newsletter", "Subscribe to the newsletter"],
    ["theme", "Change theme or currency"], ["guide", "Open this guide"],
    ["studio", "Visit the studio page"], ["admin", "Open the admin control room"],
    ["faq", "Read a FAQ"], ["checkout", "Visit checkout"]
  ];

  let progress = {};
  try { progress = JSON.parse(localStorage.getItem("sw_explored") || "{}"); } catch {}

  function render() {
    const box = $("#featureChecklist");
    if (!box) return;
    box.innerHTML = tasks.map(([key, label]) => `
      <label class="feature-check ${progress[key] ? "done" : ""}">
        <input type="checkbox" data-check="${key}" ${progress[key] ? "checked" : ""}>
        <span>${label}</span>
      </label>`).join("");
  }

  function mark(key) {
    if (!key || progress[key]) return;
    progress[key] = true;
    try { localStorage.setItem("sw_explored", JSON.stringify(progress)); } catch {}
    render();
  }

  document.addEventListener("click", (event) => {
    if (event.target.closest("#resetChecklist")) {
      progress = {};
      localStorage.removeItem("sw_explored");
      render();
      return;
    }
    const el = event.target.closest("button,a,input,select,summary,.cd2,.logo");
    if (!el) return;
    const key = el.closest(".lk,[data-go]") ? "nav"
      : el.closest("#sbtn,#si") ? "search"
      : el.closest(".fl") ? "filter"
      : el.closest(".cd2,.sr") ? "product"
      : el.closest("#sz") ? "size"
      : el.closest("[data-w]") ? "wishlist"
      : el.closest("#cb,#co,.dr") ? (el.closest("#co") ? "checkout" : "bag")
      : el.closest("#dl,#rememberLogin,#togglePassword,#forgotPassword") ? "account"
      : el.closest(".nf") ? "newsletter"
      : el.closest("#tm,#cu") ? "theme"
      : el.closest("#guide") ? "guide"
      : el.closest("#about") ? "studio"
      : el.closest("#admin,[data-go=admin]") ? "admin"
      : el.closest("#faq") ? "faq"
      : el.closest("#pay") ? "checkout" : null;
    mark(key);
  });

  document.addEventListener("input", (event) => {
    if (event.target.id === "si" && event.target.value.trim()) mark("search");
  });
  document.addEventListener("submit", (event) => {
    if (event.target.id === "dl") mark("account");
    if (event.target.classList.contains("nf")) mark("newsletter");
    if (event.target.id === "pf") mark("checkout");
  });
  document.addEventListener("change", (event) => {
    if (event.target.id === "rememberLogin") mark("remember");
    if (event.target.id === "cu") mark("theme");
  });
  document.addEventListener("hashchange", () => {
    const section = location.hash.slice(1);
    if (["guide", "about", "pay"].includes(section)) mark(section === "about" ? "studio" : section === "pay" ? "checkout" : "guide");
  });
  render();
  if (location.hash === "#guide") mark("guide");
})();

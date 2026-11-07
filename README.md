# Stridewell

A responsive, front-end footwear storefront demo built as a learning project. Stridewell includes a product catalogue, shopping bag, wishlist, customer account area, preorder flow, mock card checkout, order tracking, currency and theme controls, newsletter demo, and a local admin dashboard.

> **Demo only:** Stridewell does not process real payments or send real emails. It stores demo data in the browser's `localStorage`. Do not enter real personal, account, or payment information.

## Preview

The repository is designed to run as a static website. Open the GitHub Pages deployment (when enabled) or run it locally using the steps below.

## Notice

Any image or product is not mine. I got them online. All credits are given to original owners this is a mock site. I do not intend to monetize or otherwise sell it. If you have any qualms contact me and I'll take down all my images imemdiately.

## Run locally

No build step or package installation is required.

1. Download or clone this repository.
2. Open the repository folder in VS Code.
3. Start a local static server. VS Code's Live Server extension is convenient, or run:

   ```bash
   python -m http.server 8000
   ```

4. Visit `http://localhost:8000` in your browser.

Opening `index.html` directly may work, but a local server is more reliable for browser APIs and testing.

## Demo access

The demo admin credentials currently included in the client-side application are:

- **Username:** `admin`
- **Password:** `stridewell2026`

These credentials are public and provide no real security. They exist only to explore the demonstration admin interface. Never reuse them for another service.

## Mock checkout cards

Use these test numbers to exercise both checkout outcomes:

| Scenario | Test card |
| --- | --- |
| Successful mock payment | `4242 4242 4242 4242` |
| Declined mock payment | `4000 0000 0000 0002` |

Use any valid future expiry date and a 3- or 4-digit CVC. The application does not contact a payment processor and no money moves.

## Project layout

```text
Stridewell/
├── index.html                 # Main entry point; keep this at repository root
├── styles.css                 # Site-wide styles and responsive rules
├── README.md                  # Project documentation
├── LICENSE                    # MIT license for project code (see asset note)
├── CONTRIBUTING.md            # Contribution and local testing guide
├── SECURITY.md                # Demo security limitations and reporting guidance
├── .gitignore                 # Common local/editor files excluded from Git
├── .nojekyll                  # Keeps GitHub Pages from applying Jekyll processing
├── .github/
│   ├── ISSUE_TEMPLATE/         # Bug report and feature request templates
│   └── PULL_REQUEST_TEMPLATE.md
└── js/
    ├── 00-core/                # Runtime fallback and shared foundations
    ├── 10-storefront/          # Product catalogue and storefront interactions
    ├── 20-commerce/            # Shared store state and commerce behavior
    ├── 30-guide/               # How-to guide feature checklist
    └── 40-admin/               # Admin, orders and checkout behavior
```

JavaScript files are loaded in dependency order by `index.html`. The current code uses ordered classic browser scripts to preserve the original shared state and avoid a build tool. When adding a script, place it in the folder matching its responsibility and add its `<script>` tag after any scripts it depends on. Keep the numbered folder prefixes so the intended order remains obvious.

For a future multi-page version, use shared components and explicit ES module imports/exports, then add a router and backend API when the app genuinely needs them. Avoid duplicating the same header, footer, or account logic across pages.

## Data, privacy and deployment limitations

- Accounts, orders, inventory, settings, and newsletter signups are stored in the current browser's `localStorage`.
- Data is not shared between browsers, devices, or different hosted origins.
- Clearing site data can erase the demo state.
- Admin checks and credentials are implemented client-side and can be inspected or changed by visitors.
- The preorder counter and stock are demo behavior, not authoritative shared inventory.
- A production store requires server-side authentication and authorization, a database, server-enforced inventory and preorder limits, validated APIs, secure payment-provider integration, and a real email service.
- Do not deploy this demo as a live shop or collect real customer data without replacing the demo infrastructure.

## Third-party resources and media

The page loads Google Fonts and GSAP from their respective CDNs. The studio section uses Pexels stock video; its source link is shown on the page. Product cut-out images are embedded in the storefront source. Check the applicable third-party terms before redistributing or using any media commercially. The repository's MIT license applies to the project's original code and documentation, not third-party assets or services.

## Browser support

Use a current version of Chrome, Edge, Firefox, or Safari. JavaScript and browser storage must be enabled. Some animation effects depend on the GSAP CDN; the project includes a basic fallback when GSAP is unavailable.

## Contributing

Bug reports, accessibility improvements, documentation fixes, and focused pull requests are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

## License

The original project code and documentation are available under the MIT License. See [LICENSE](LICENSE). Third-party media and services remain subject to their own terms.


### Navigation update

The Account control in the top navigation opens a dropdown with separate Customer account and Admin control room destinations. It supports pointer hover, keyboard focus, and click/tap interaction. The intro animation no longer injects the floating product image that could appear as an isolated red dot.

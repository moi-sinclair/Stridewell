# Contributing to Stridewell

Thanks for taking an interest in the project.

## Before you start

- Check existing issues before opening a new one.
- For larger changes, open an issue first so the scope can be discussed.
- Keep changes focused and avoid adding dependencies unless they solve a clear problem.

## Local setup

1. Clone or download the repository.
2. Run a static server from the repository root, for example `python -m http.server 8000`.
3. Open `http://localhost:8000`.
4. Test the relevant flow in a current browser.

## Code organization

- Keep `index.html` at the repository root.
- Put global presentation rules in `styles.css`.
- Put JavaScript in the numbered `js/` feature folders.
- Add new scripts to `index.html` in dependency order.
- Avoid unrelated formatting changes to the large embedded product-image data in the storefront script.
- Do not commit real customer data, credentials, API keys, or local browser exports.

## Before submitting

- Check the browser console for errors.
- Test the affected feature at desktop and mobile widths.
- Test both successful and declined mock checkout paths when changing checkout.
- Confirm that existing cart, account, order, admin, and navigation flows still work when relevant.
- Update the README if setup, features, or limitations change.

## Pull requests

Describe the problem, the change, and how you tested it. Include screenshots for visible UI changes when practical.

## Actual note

I might not be available for contributions just follow standard contribution protocols online.
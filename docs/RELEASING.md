# Releasing Updates - Auaha Core

This is the step-by-step update procedure for Auaha Core - auaha-core.js, the core engine js file.   
Goal: ship updates safely with minimal regression risk for non-technical Squarespace users.
Note:  there is a separate procedure for releasing and managing the HTML mount pattern - the public API to this source code - see docs/MODULES.md.

---
## Release Checklist (GITHUB Browser Workflow)

### Step 1 — Update the code
1. Edit: `dist/auaha-core.js`
2. Confirm the file is **pure JS** (no `<script>` tags).
3. Update the version string near the top:
   - Find: `version: "x.y.z"`
   - Change to the new version.
Optional (recommended): update header banner at the top with version:
  /*!
  Auaha Core
  Version: 0.2.1
  https://github.com/sonnz/auaha-core
  Lightweight enhancement engine for Squarespace 7.1
  (c) 2026 Auaha
  */

### Step 2 — Update CHANGELOG.md
1. Add version, date, and change description notes

### Step 3 — Create a GitHub Release
1. Go to: Releases
2.  Click: Draft a new release
3.  Tag version: x.y.z
4.  Release title: Auaha Core vx.y.z
5.  Paste brief notes (can match CHANGELOG)
6.  Publish release

---

## Deployment Verification Test
- Always verify window.Auaha exists after release.  In site, F12, search window.Auaha in the console
- Always check file ends with window.Auaha = Auaha; + })();
- Always open the jsDelivr URL in a tab to sanity-check the first/last lines

## Smoke Test
On a page using Filters:
- Hard refresh (Cmd/Ctrl+Shift+R) → buttons appear
- Click 3–4 categories fast → no duplicates, reshuffle works
- Mobile viewport → no layout break

---

## Versioning Rules

- Use semantic versioning: `vMAJOR.MINOR.PATCH` (e.g. `v0.2.1`)
- Keep the version tag and the internal `Auaha.version` string aligned:
  - Git tag: `v0.2.1`
  - Code: `version: "0.2.1",`

Recommended: bump PATCH for bug fixes, MINOR for new backward-compatible features, MAJOR for breaking changes.

---

## Key Learnings (Do Not Skip)

### 1) dist/*.js` must be **pure JavaScript**
When loading via `<script src="..."></script>`, the file must NOT contain HTML - ie should not have the script tags.
✅ OK:
- Starts with `(function(){`
- Ends with `})();`
❌ NOT OK:
- Starts with `<script>`
- Ends with `</script>`
If `<script>` tags are present, the file may load (200 OK) but will not execute, and `window.Auaha` will be undefined.

### 2) Do NOT use `@main` in production installs
jsDelivr caches aggressively and `@main` can serve stale content.
✅ Use a version tag instead:
`@v0.2.1` (or whatever the current release is) per example below
<script src="https://cdn.jsdelivr.net/gh/sonnz/auaha-core@v0.2.1/dist/auaha-core.js" defer></script>
This also prevents accidental regressions if `main` changes later.

### 3) GitHub “Raw” URLs are not for production
`raw.githubusercontent.com` can be blocked or behave inconsistently due to MIME/CORB/security policies.

✅ Use jsDelivr (recommended):
`https://cdn.jsdelivr.net/gh/<user>/<repo>@<tag>/dist/auaha-core.js`

### 4) Always verify execution in the browser
Network 200 OK is not enough. The script can load but fail to execute.

---

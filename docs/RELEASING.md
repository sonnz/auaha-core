# Releasing Updates (Auaha Core)

This is the step-by-step update procedure for Auaha Core.  
Goal: ship updates safely with minimal regression risk for non-technical Squarespace users.

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

## Versioning Rules

- Use semantic versioning: `vMAJOR.MINOR.PATCH` (e.g. `v0.2.1`)
- Keep the version tag and the internal `Auaha.version` string aligned:
  - Git tag: `v0.2.1`
  - Code: `version: "0.2.1",`

Recommended: bump PATCH for bug fixes, MINOR for new backward-compatible features, MAJOR for breaking changes.

---

## Release Checklist (Browser Workflow)

### Step 1 — Update the code
1. Edit: `dist/auaha-core.js`
2. Confirm the file is **pure JS** (no `<script>` tags).
3. Update the version string near the top:
   - Find: `version: "x.y.z"`
   - Change to the new version.

Optional (recommended): add/update a small header banner at the top:
/*!
  Auaha Core
  Version: 0.2.1
  https://github.com/sonnz/auaha-core
  Lightweight enhancement engine for Squarespace 7.1
  (c) 2026 Auaha
*/

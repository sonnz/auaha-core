# Auaha Filters Module

This document defines the public HTML interface (mount patterns) for Auaha Filters module.
These patterns are considered part of the public API and must remain backward compatible.

---
# Filters Module

## Overview
Adds dynamic category filtering to Squarespace Blog Basic Grid layouts for blog summary section.
- Auto-generates filter buttons from blog categories
- Filters and reshuffles posts
- Optional title & category visibility control
- Uses native Squarespace button styles

Requires Auaha Core.

---

## Basic Installation
1. Load Auaha Core in Footer Code Injection:

```html
<script src="https://cdn.jsdelivr.net/gh/sonnz/auaha-core@v0.2.1/dist/auaha-core.js" defer></script>

## Web page setup
* Create your blog section using basic grid style.
* Do NOT hide meta-data:  categories

## Basic Usage
Add this to a code block in a section above your blog section:

```html
<div data-auaha="filters"
     data-auaha-target='section[data-section-id="XXXX"]'     <!-- Requires section id of the blog section -->
     data-auaha-button-style="primary"                       <!-- Options:  primary, secondary, tertiary to inherit styles -->
     data-auaha-hide-title="true"                            <!-- Options:  true/false -->
     data-auaha-hide-category="true">                        <!-- Options:  true/false -->
</div>

## Deployment Notes
* Must be placed above the blog grid section.
* Requires Auaha Core to be loaded in Footer.
* Layout Compatibility
  Supported
  *  Works with Blog Basic Grid layout only (v0.2.x).
  Not supported
  *  Masonry
  *  Summary Block (future module)

## Public API Rules
* Attribute names must never change without a major version bump.
* Default behaviour must remain stable.
* New attributes may be added but must be optional.

---

# 🚨 Critical Rule Going Forward
Once a mount attribute is published: eg.  data-auaha-hide-title
You must treat it like an API.

* Do not rename it.
* Do not change behaviour.
* Do not remove it.

Only add new attributes.

---

## Release procedure
1. Update code
2. Update `CHANGELOG.md`
3. Update `docs/modules/filters.md`
4. Release new tag

## Release documentation for core engine
See /docs/RELEASING.md for release procedure when releasing patch, minor or major versions of the core engine 

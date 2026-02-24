# Auaha Core

Auaha Core is a lightweight enhancement engine for Squarespace 7.1.

It powers modular add-ons (called "Auaha Modules") that enhance existing Squarespace functionality without replacing or interfering with native systems.

## Philosophy

Auaha delivers simple solutions to everyday problems — using what is already in our hands, repurposed to deliver what we need.

- No dependencies
- No frameworks
- No CMS overrides
- No heavy state management
- Pure DOM enhancement

## How It Works

Modules register themselves with Auaha Core and activate using simple HTML attributes:
html
<div data-auaha="filters"></div>

Core handles initialization.
Modules handle behavior.

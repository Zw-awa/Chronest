# Contributing to Chronest

[中文](CONTRIBUTING.md) | English

## Scope

Chronest is a local-first desktop automation calendar. Contributions should support one of these areas:

- Calendar-driven scheduling UX
- Local runtime reliability
- Plugin model and permissions
- Git automation as an official plugin
- Documentation, testing, packaging, and accessibility

## Workflow

1. Open an issue before large changes.
2. Keep pull requests focused.
3. Prefer incremental, reviewable changes over broad rewrites.
4. Include screenshots for UI changes.
5. Explain behavioral changes and testing performed.

## Development

```bash
npm install
npm run tauri dev
```

Useful commands:

```bash
npm run build
cargo check
```

## Coding expectations

- Keep the app local-first.
- Do not silently expand permissions for plugins or window capabilities.
- Avoid storing secrets in SQLite.
- Prefer explicit task execution behavior over implicit automation.
- Match the existing UI direction unless the change is intentionally revising it.

## Pull request checklist

- The change is scoped and explained.
- New behavior is documented if user-facing.
- Build passes locally.
- Screenshots are included for UI changes.
- Security or permission implications are called out explicitly.

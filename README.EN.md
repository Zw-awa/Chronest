# Chronest

[![License: Apache-2.0](https://img.shields.io/badge/license-Apache--2.0-4b5563.svg)](LICENSE)
![Platform: Windows First](https://img.shields.io/badge/platform-Windows%20first-6b7280.svg)
![Stack: Tauri + React + Rust](https://img.shields.io/badge/stack-Tauri%20%2B%20React%20%2B%20Rust-9ca3af.svg)
![Status: Pre-1.0](https://img.shields.io/badge/status-pre--1.0-d1d5db.svg)

[中文](README.md) | English

Chronest is a local-first desktop app for calendar-driven automation. It is designed around exact date-and-time scheduling, local command execution, SQLite-backed task state, and a plugin model where Git is only one official capability.

## Status

`Chronest` is currently an `early scaffold` and **not production-ready**.

At this stage, the repository is best used for:

- validating product direction
- iterating on desktop interaction and scheduling behavior
- defining plugin boundaries and permission rules

It should not yet be treated as:

- a production-grade automation tool
- a stable distribution build for general users
- a trusted runtime for high-risk scheduled workflows

## Positioning

Chronest is not just a Git tool and not just a cron wrapper.

It is intended to become:

- a calendar-first local automation surface
- a desktop runtime for scheduled jobs
- a plugin-capable workbench for developer and local workflow automation

The repository is in early pre-1.0 development. The current codebase includes:

- `Tauri + React + TypeScript + Vite`
- SQLite-backed task schema, run history table, and seeded runtime data
- calendar-centric desktop UI scaffold powered by `react-day-picker`
- lunar metadata rendering powered by `lunar-javascript`
- early data-directory switching and history-clearing command path
- official Git plugin manifest stub
- early window and desktop interaction experimentation

## Project structure

- `src/`: frontend UI
- `src/locales/`: frontend locale resources
- `src/assets/`: frontend static assets
- `src-tauri/`: Rust runtime, Tauri entrypoint, permissions, SQLite setup
- `plugins/`: official and future community plugin manifests
- `docs/architecture.EN.md`: current architecture direction

## Development

```bash
npm install
npm run tauri dev
```

Validation:

```bash
npm run check
npx tsc --noEmit
cargo check --manifest-path ./src-tauri/Cargo.toml --no-default-features
```

## Near-term roadmap

1. Task creation and editing from the calendar.
2. Reliable background scheduling behavior.
3. Run history, logs, and failure handling.
4. Official Git automation flow with optional AI-assisted commit message generation.
5. Secret handling moved out of SQLite and into system-backed storage.
6. Clear plugin permission and installation model.
7. Safer data-directory switching, migration, and reset flows.

## Security notes

Chronest will eventually execute local commands and host plugins. That makes permission boundaries and secret storage first-class concerns, not secondary polish.

Please read [SECURITY.EN.md](SECURITY.EN.md) before reporting vulnerabilities.

## Contributing

See [CONTRIBUTING.EN.md](CONTRIBUTING.EN.md) for contribution expectations and workflow.

## License

This project is licensed under `Apache-2.0`.

See [LICENSE](LICENSE) for the full text.

## Documentation

- Chinese architecture notes: [docs/architecture.md](docs/architecture.md)
- English architecture notes: [docs/architecture.EN.md](docs/architecture.EN.md)

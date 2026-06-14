# Chronest Architecture

[中文](architecture.md) | English

Chronest is scaffolded as a local-first desktop app with three clear seams:

1. `src/` is the React shell that renders the calendar, queue, runtime notes, and plugin workshop entry point.
2. `src-tauri/` is the desktop runtime that owns SQLite, command execution, scheduling, and plugin manifest discovery.
3. `plugins/` is the seed location for official and community plugin packages.

Additional source-owned resource seams:

- `src/locales/` for frontend translation resources
- `src/assets/` for frontend bundled assets such as icons

## Core product shape

- The calendar is the primary interaction model, not an afterthought on top of cron.
- Jobs are stored in SQLite with explicit timing, working directory, command payload, and plugin metadata.
- Plugins should declare permissions up front, especially for `exec`, `fs`, `network`, `git`, and `secrets`.
- Git automation is a first-party plugin so the core can remain generic.

## Suggested next milestones

1. Add task creation and editing commands, then bind the calendar cells to a real form.
2. Decide whether tasks must keep running when the app window is closed or when the process exits entirely.
3. Move API keys out of SQLite and into an OS-backed secret store before exposing provider settings.
4. Define the plugin manifest contract and installation flow before the workshop UI is built.
5. Turn the current data-directory switch into a full migration and restart-safe workflow.

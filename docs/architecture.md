# Chronest Architecture

## Goals

Chronest is being structured for long-term maintainability before feature depth.

The architecture priorities are:

- keep desktop shell concerns isolated from product logic
- keep feature ownership explicit on both frontend and backend
- make composition roots obvious
- allow vertical growth of modules without returning to god-files

## Frontend Structure

`src/app/`
- composition root only
- bootstrap, providers, routes, shell wiring

`src/features/<module>/`
- feature-owned types, sample data, hooks, services, copy, and future UI
- modules should expose a small public API through `index.ts`

`src/components/`
- presentation components that are either generic enough to share or are being migrated into feature ownership

`src/lib/`
- shared low-level contracts and framework-agnostic helpers

`src/locales/`
- frontend translation resources
- language files should live here instead of the repository root

`src/assets/`
- frontend static assets such as icons and bundled artwork

### Frontend Dependency Rule

Preferred direction:

1. `app` depends on `features`
2. `features` may depend on `lib`
3. `components` may depend on `features` public types, but should not reach into another feature's internals

Avoid:

- feature A importing private files from feature B
- global state hidden in arbitrary hooks
- runtime-specific APIs leaking outside the owning feature

## Backend Structure

`src-tauri/src/app/`
- backend composition root only
- constructs repositories, services, and shared runtime dependencies

`src-tauri/src/<module>/`
- vertical business modules such as `tasks`, `plugins`, `settings`, `dashboard`
- each module owns its models and module-local services/repositories/contracts

`src-tauri/src/runtime/`
- cross-cutting runtime concerns such as paths, clock, and shared error/result types

Current runtime-specific responsibilities also include:

- storage path resolution
- persisted storage configuration
- external URL opening helpers

`src-tauri/src/state.rs`
- thin container type for app-managed state

### Backend Dependency Rule

Preferred direction:

1. `main.rs` depends on `app` and command-exporting modules
2. `app` composes module implementations
3. feature modules may depend on `runtime`
4. aggregate modules like `dashboard` may depend on other feature module public contracts

Avoid:

- root-level shared business models outside owning modules
- one feature module reaching into another feature module's private files
- using `state.rs` as a hidden service locator with business logic

## Current Composition Roots

Frontend:
- [src/main.tsx](../src/main.tsx)
- [src/app/bootstrap.tsx](../src/app/bootstrap.tsx)

Backend:
- [src-tauri/src/main.rs](../src-tauri/src/main.rs)
- [src-tauri/src/app/bootstrap.rs](../src-tauri/src/app/bootstrap.rs)

## Module Growth Guidance

When adding a new capability:

1. decide which feature owns it
2. add types/contracts inside that feature first
3. add module-local services or repositories next
4. export only the minimal public API through the feature/module `index` or `mod`
5. wire it from the composition root instead of reaching across layers directly

## Near-Term Refactors

- move remaining shared presentation components under feature ownership when their reuse pattern is clearer
- add backend module-local command files for write operations instead of routing everything through `dashboard`
- add test directories per feature/module once behavior becomes less scaffold-oriented
- turn data-directory switching into a full migration flow with clear restart behavior and reset-to-default support

# obvious.md — DataNeel/my_website

Personal website of Neel Shivdasani (https://neel.sh): a static Jekyll site deployed via GitHub Pages.
Default branch: `master`.

## Stack

- Jekyll 4.4.1 with the `minima` theme, Ruby 3.3, Bundler (see `Gemfile` / `Gemfile.lock`)
- No database, no external services, no environment variables, no secrets
- No test, lint, or typecheck tooling — a clean `jekyll build` is the only automated check
- Content is pre-rendered HTML (`index.html`) plus plain markdown and image assets

## Commands

```sh
bundle install                  # once (gems go to vendor/bundle)
bundle exec jekyll serve        # dev server, auto-regeneration on
bundle exec jekyll build        # production build into _site/
```

- Dev server address is parsed from the `Server address:` startup line (default http://127.0.0.1:4000).

## Codebase map

| Path | What it is |
|---|---|
| `index.html` | Homepage — committed pre-rendered HTML (profile photo, social links) |
| `_config.yml` | Jekyll config (site name, kramdown markdown) |
| `Gemfile`, `Gemfile.lock` | Ruby deps: jekyll + minima theme; lockfile modernized 2026-09-30 for Ruby 3.3 |
| `tropism/` | "Tropism" generative-art write-up + artwork PNGs — `index.md` has **no front matter**, so it is served as a static file, not Jekyll-rendered |
| `old/` | Archived old homepage sources (HTML, CSVs, notebook) |
| `index_old.md` | Previous homepage markdown, kept for reference (also front-matter-less) |
| `stakra.frag` | GLSL fragment shader (standalone artifact) |
| `*.gif`, `profile.JPG` | Image assets |

## Local verification

1. `bundle exec jekyll build` completes without errors.
2. `bundle exec jekyll serve`, then `curl -s http://127.0.0.1:4000/` → HTTP 200 with `<title>Neel Shivdasani</title>`.
3. `curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:4000/profile.JPG` → 200.

## Gotchas

- `tropism/index.md` and `index_old.md` lack Jekyll front matter, so Jekyll copies them verbatim instead of rendering. Locally `/tropism/` shows a directory listing and the raw markdown lives at `/tropism/index.md`; production behaves the same (serves the raw file). This is repo behavior, not a local-env bug.
- There is no `.gitignore`: `vendor/bundle/` and `_site/` are untracked build artifacts — never stage them.
- `index.html` is committed rendered output; edit it directly (or regenerate and commit the result).

## Onboarding change (required)

`Gemfile.lock` was modernized during onboarding (jekyll 4.0.0→4.4.1, minima 2.5.2, sass-embedded replacing sassc, listen/ffi bumps, +webrick). The 2020 pins could not install on any modern Ruby (`listen 3.2.1` requires ruby `~> 2.2`; `sassc 2.2.1` fails to compile on gcc 14). `Gemfile` itself is unchanged.

## Local Verification Summary

- `dev_stack_healthy: true` — verified 2026-09-30
- Ruby 3.3.8 / Bundler 4 / jekyll 4.4.1; `bundle install` and `jekyll build` OK
- `jekyll serve` up on http://127.0.0.1:4000 (port parsed from server output)
- Primary flow verified over HTTP and headless Chromium: `/` → 200 with correct title and content; `/tropism/index.md` → 200 raw markdown (matches live site); `/profile.JPG` → 200
- Console errors: external-only (favicon.ico 404, mutinycdn third-party script cert) — none from site code
- Screenshots: `~/evidence/home.png`, `~/evidence/tropism.png`; serve log: `~/evidence/jekyll-serve.log`

## Snapshot

- snapshotId: `1itrnltjqkkuxl1ffpaa:default`
- Captured: 2026-09-30T18:55:02.991Z (includes Ruby 3.3 toolchain, vendored gems, verified serve state)

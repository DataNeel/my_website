---
name: local-dev
description: How to run the DataNeel/my_website Jekyll site locally
---

# Local dev — DataNeel/my_website

Jekyll static site (minima theme) deployed to GitHub Pages at neel.sh. Ruby toolchain only — no services, no env vars, no secrets.

## One-time setup

- Ruby >= 3.3 with dev headers and build tools (preinstalled in sandbox; snapshot `1itrnltjqkkuxl1ffpaa:default` has the full toolchain plus vendored gems).
- `gem install bundler` (Bundler 4.x works; the lockfile no longer pins an ancient one).
- `bundle config set --local path vendor/bundle`, then `bundle install`.

## Run

- `bundle exec jekyll serve` — dev server with auto-regeneration. Read the port from the `Server address:` line rather than assuming 4000.
- `bundle exec jekyll build` — production build into `_site/`.

## Verify

- Build completes without errors (no tests/lint exist; a clean build is the check).
- `curl -s http://127.0.0.1:4000/ | grep -F '<title>Neel Shivdasani</title>'`
- `curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:4000/profile.JPG` → 200
- Optional deeper check: headless Chromium screenshot of `/` (worked with playwright-core during onboarding).

## Gotchas

- `tropism/index.md` and `index_old.md` have no Jekyll front matter → copied as static files, NOT rendered. `/tropism/` shows a directory listing locally; production serves the raw markdown at `/tropism/index.md`. Not a local-env bug — don't "fix" the dev server for this.
- `Gemfile.lock` was modernized 2026-09-30 because the 2020 pins (listen 3.2.1 with ruby `~> 2.2`, sassc 2.2.1 native build) cannot install on Ruby 3.x. Don't revert it to restore old versions.
- No `.gitignore` exists: `vendor/bundle/` and `_site/` stay untracked — never stage them.
- Root `index.html` is committed pre-rendered output; edit it directly.

## Onboarding evidence (2026-09-30)

- Screenshots: `~/evidence/home.png` (homepage), `~/evidence/tropism.png`; serve log `~/evidence/jekyll-serve.log`.
- Verified `/` (200, correct title/content), `/profile.JPG` (200), `/tropism/index.md` (200 raw, matches live site); console errors external-only (favicon 404, mutinycdn script cert).

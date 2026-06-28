# 香江文藝慶典製作公司 — Final Learnings

## [2026-06-28] Project Complete

### Status
- All 15 tasks completed (111, F1-F4)
- 3 commits on master
- All deliverables verified

### Key Technical Decisions
1. **data-lang pattern**: All text via `data-lang` attributes, JS reads from `langData` object. Works well.
2. **Single JS toggle**: `switchLang()` + `localStorage`persistence; no page reload needed.
3. **Static site**: Pure HTML/CSS/JS, deployable anywhere. No build step.
4. **Vercel config**: Security headers (X-Content-Type-Options, X-Frame-Options, Referrer-Policy) + static asset caching (1 year, immutable).

### Known Items for Client Action
1. Replace picsum.photos placeholder images with real photos
2. Replace logo at `images/logo/logo.png`
3. Verify Google Maps embed coordinates
4. Confirm phone (+852 9660 1220) and email (info@hopefulpro.com)

### What Worked Well
- Parallel verification via `Select-String` and cross-referencing data-lang keys
- ESLint-free JS syntax
- All inter-page navigation links verified (6×6 = 36 links)

### What to Note for Future
- PowerShell has encoding issues with Chinese characters; use `Select-String` with UTF-8 or grep instead
- The orphistrator CAN do direct file writes when subagent delegation is blocked (API restrictions)

# Development

- Run all project tools through `devenv shell -- <command>` or an activated direnv shell. System Node/npm, global CLIs, `npx`, and ad hoc tool downloads are not supported.
- Nix + `devenv.lock` own Node, pnpm, Bun and Chromium.
- Every package.json script gets a `pw-` command (colons become hyphens).
- Use Oxfmt and Oxlint. Do not reintroduce Prettier, ESLint, Nx or the old Express server.
- Never install the historical dependencies or run their lifecycle scripts. Review registry metadata, exact versions, lockfile changes and vulnerability reports before running new dependencies. Do not claim an audit proves absence of malware.
- Keep assets same-origin; never restore the historical analytics IP or backend address. Validate place identifiers against the catalogue.
- Before finishing, run format, lint, typecheck, meaningful tests and a production build through devenv. Document checks that could not run.
- Do not deploy or push unless requested. Do not invent missing panoramas or music.
- Preserve the original game interface and assets. Do not add headings, explanatory copy, footers, lists or new controls to the map/panorama without an explicit request. The ninth-slot transfer rune returns to the map.
- Keep investigations, audit reports and private working notes under the ignored `docs/` directory. Do not force-add them or link to them from public documentation. Keep local paths, credentials and private infrastructure details out of tracked files.

# probe.rs website

## Commands

### Launch env with deps

```sh
nix-shell
```

### First usage

```sh
npm install
```

### Run hot-reloading dev server

```sh
npm run dev
```

> [!WARNING]
> For some reason, you have to restart after adding icons. TODO: file bug against astro icon pkg

### Build static site (goes into `dist/`)

```sh
npm run build
```

### Update domain / base path

Update `astro.config.mjs`, `src/consts.ts` (used for preloads), and `global.css`.
The last one seems to be necessary due to a bug with `npm run dev`; the base
paths get rewritten nicely for `npm run build`. It causes warnings like:

> _08:08:13 [WARN] [vite] /probe.rs/fonts/epilogue.ttf referenced in /probe.rs/fonts/epilogue.ttf didn't resolve at build time, it will remain unchanged to be resolved at runtime_

### Icons

Find free / open source icons, throw them in `src/icons`: https://iconify.design/

# Original template generated with (after many tweaks by Julian)

```sh
npm create astro@latest -- --template blog
```

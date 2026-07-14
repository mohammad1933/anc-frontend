# Atelier — Fabric Configurator

A luxury, browser-only furniture fabric configurator. Upload your own fabric
photos and see them applied — as real, tiling upholstery textures, not a
color tint — to a single 3D sofa in real time.

No AI, no server, no predefined swatches: everything runs locally in the
browser, and the fabric library starts empty until you upload something.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS (no UI framework)
- Three.js + React Three Fiber + Drei

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL. The sofa model lives at
`public/models/sofa.glb` — swap it out for another single-mesh upholstered
model if you like, as long as it has clean UVs.

```bash
npm run build   # production build to dist/
npm run preview # preview the production build locally
```

## Using the configurator

1. **Upload fabrics** — drag images onto the left panel, or click it to
   browse. JPG, PNG and WEBP up to 20MB each, multiple at once.
2. **Apply a fabric** — click any thumbnail in the gallery. It becomes the
   sofa's upholstery immediately, no reload.
3. **Adjust the weave** — the right panel controls how the texture tiles:
   scale (X/Y, lockable to keep it proportional), rotation, and offset.
   Reset returns to the default framing.
4. **Capture it** — the camera button in the right panel downloads a
   full-resolution PNG of the current view. The expand icon opens the
   viewer fullscreen.

## Project structure

```
src/
  components/
    scene/       3D scene: model, lighting, camera rig, floor, loader
    sidebar/     Upload zone, search, fabric gallery, rejection toasts
    controls/    Texture sliders, fabric info, action buttons
    layout/      Top bar, status bar
    viewer/      Center viewport wrapper
    ui/          Shared buttons and icons
  hooks/         Configurator state, viewer refs, fullscreen, drag & drop
  utils/         Validation, thumbnails, texture cache, formatting, screenshot
  types/         Shared TypeScript types
  constants/     Tunable configuration values
```

## Performance notes

- Textures are cached by fabric id in `utils/textureCache.ts` and disposed
  when a fabric is removed from the library, so GPU memory doesn't leak
  across a long session.
- Anisotropic filtering is capped to the GPU's real maximum (up to 16x) the
  moment the renderer is created.
- The texture transform (scale/rotation/offset) is applied directly to the
  already-loaded `THREE.Texture`, so dragging a slider never re-decodes or
  re-uploads the image to the GPU.

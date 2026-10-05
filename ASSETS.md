# Website assets

## Globe artwork

- Final website asset: `assets/globe.webp`.
- Original: `assets/globe.png`.
- Method: built-in image generation tool, then WebP encoding for website delivery.
- Usage: hero artwork and company approach page.
- This is a conceptual brand illustration, not documentary photography.

Generation prompt:

> Use case: stylized-concept. Asset type: premium technology company website hero artwork. Create an exceptionally art-directed, photorealistic 3D sculptural globe floating on a seamless very pale warm ivory studio background (#f4f3ed). A large obsidian-black metal sphere, longitude and latitude meridians etched into the dark surface, a beautiful silver metallic relief of AFRICA prominently facing camera, Europe subtly visible above it. One thick vivid vermilion orange glossy elliptical orbit ribbon encircles the sphere on a dramatic 35-degree diagonal, passes in front at lower left and behind at upper right. Delicate secondary brushed chrome orbital ring. High-end industrial design, tactile brushed titanium, glossy black and orange reflections, sharp material detail, realistic soft grounding shadow, premium editorial product photography, powerful restrained composition. Square image, whole sculpture fully visible with generous margin, sphere roughly centered, warm ivory background all the way to edges. No space background, no stars, no text, no lettering, no logo, no UI, no watermark, no pedestal. This is original brand artwork for an African technology firm.

## Type

- Manrope: https://fonts.google.com/specimen/Manrope
- Noto Sans Arabic: https://fonts.google.com/noto/specimen/Noto+Sans+Arabic
- The files are served locally. Licence texts are in `licenses/`.

## Interface concepts

The clinic and fleet previews are original HTML/CSS interface compositions. All names, numbers, routes and statuses within them are illustrative sample data, not client work or performance claims.


## Motion additions

- Land-point geometry derived from Natural Earth 1:110m land polygons (public domain): https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_land.geojson . Converted to lightweight lon/lat dots in `assets/motion/land.json`.
- Plane and cargo artwork reused from the user's West Wings project; Queen Secret hero artwork reused from the user's Queen Secret project. Source originals retained in their project directories; WebP delivery copies used here.
- Website preview from the actual AFRICA TECH local preview. Presenter, diner and camera are original SVG/CSS illustrations.

## October 5 motion revision
- `assets/motion/africa-page.webp`: captured from the local AFRICA TECH home page.
- `assets/motion/queen-page.webp`: captured from the user-owned Queen Secret local preview, hero and services.
- `assets/motion/cargo-page.webp`: captured from the user-owned West Wings public site.
- Page captures are combined for a scrolling portfolio preview; no enquiries or customer data are captured.
- `assets/vendor/motion-14.0.0.js`: official npm `motion@14.0.0` browser distribution, MIT license alongside the bundle.

- `assets/motion/westwings-plane.webp`: original top-down aircraft from the user-owned West Wings `app/public/air/top.webp`. The towing/release choreography follows that project’s `Towed` component.

Build site and serve locally
```npm run start````

## Article creation workflow

1. Create a folder in `src/blog/` named `YYYY-MM-DD-slug/` (e.g. `2026-03-12-ponton/`)
2. Add an `index.md` file inside with frontmatter and your content
3. Place your images (`.jpg`, `.png`, `.webp`) in the same folder

## Images

Images are added using the `figure` shortcode. All images are automatically optimized and converted to WebP during build.

### Basic usage

```md
{% figure "./photo.jpg", "Description de l'image", "Légende visible sous l'image" %}
```

By default, images stay within the article column width.

To make an image larger (e.g. a chart or diagram), pass a width in pixels as 4th argument:

```md
{% figure "./graphique.png", "Mon graphique", "Légende du graphique", 1000 %}
```

This generates a higher resolution image and allows it to display up to that width, **even beyond the article column**.

Default image widths and formats are configured in `.eleventy.js` (`eleventyImageTransformPlugin` options). Article column width is set in `public/style.css` (`.content`).
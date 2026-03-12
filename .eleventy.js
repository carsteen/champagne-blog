const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");

module.exports = async function (eleventyConfig) {
  // Copy paths to target site
  eleventyConfig.addPassthroughCopy({ "./public/": "/" });

  // Plugins
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ["webp"],

    widths: [300, 600, 800, 1200],

    failOnError: true,
    htmlOptions: {
      imgAttributes: {
        // e.g. <img loading decoding> assigned on the HTML tag will override these values.
        loading: "lazy",
        decoding: "async",
      }
    },
  });

  // Filters
  eleventyConfig.addFilter("date", function (dateObj, format = "dd/MM/yyyy") {
    const date = dateObj instanceof Date ? dateObj : new Date(dateObj);
    if (Number.isNaN(date.getTime())) {
      return "";
    }

    const tokens = {
      yyyy: String(date.getFullYear()),
      yy: String(date.getFullYear()).slice(-2),
      MM: String(date.getMonth() + 1).padStart(2, "0"),
      dd: String(date.getDate()).padStart(2, "0")
    };

    return format.replace(/yyyy|yy|MM|dd/g, (token) => tokens[token] || token);
  });

  eleventyConfig.addFilter("isoDate", function (dateObj) {
    const date = dateObj instanceof Date ? dateObj : new Date(dateObj);
    return Number.isNaN(date.getTime()) ? "" : date.toISOString();
  });

  eleventyConfig.addFilter("excerpt", function (content, maxLength = 200) {
    if (!content) return "";
    const plain = content.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    if (plain.length <= maxLength) return plain;
    return plain.slice(0, maxLength).replace(/\s\S*$/, "") + "…";
  });

  eleventyConfig.addFilter("limit", function (collection, amount = 3) {
    if (!Array.isArray(collection)) {
      return [];
    }
    return collection.slice(0, amount);
  });

  eleventyConfig.addFilter(
    "parseDate",
    /**
     * Parses a date string into a Date object.
     * @param {string} dateString - The date string to parse
     * @returns {Date} The parsed Date object
     */
    function (dateString) {
      return new Date(dateString)
    }
  )

  eleventyConfig.addFilter(
    "readableDate",
    /**
     * @param {Date} dateObj
     */
    function (dateObj) {
      const date = new Date(dateObj)
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC"
      }
      return date.toLocaleDateString("FR", options)
    }
  )

  // Shortcodes
  eleventyConfig.addShortcode("figure", function (src, alt, caption, width) {
    const widthAttr = width ? ` eleventy:widths="${width}"` : '';
    const style = width ? ` style="max-width:${width}px"` : '';
    return `
    <figure class="image"${style}>
      <img src="${src}" alt="${alt}" loading="lazy"${widthAttr}>
      <figcaption>${caption}</figcaption>
    </figure>
  `;
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};


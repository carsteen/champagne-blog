module.exports = function(eleventyConfig) {
  // Copy les images directement vers le dossier de sortie
  eleventyConfig.addPassthroughCopy("public");

  eleventyConfig.addFilter("date", function(dateObj, format = "dd/MM/yyyy") {
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

  eleventyConfig.addCollection("blog", function(collection) {
    return collection.getFilteredByGlob("src/blog/*.md");
  });

  // Retourne la config
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
  

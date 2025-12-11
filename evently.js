module.exports = function(eleventyConfig) {
    // Copy les images directement vers le dossier de sortie
    eleventyConfig.addPassthroughCopy("public");
  
    // Retourne la config
    return {
      dir: {
        input: "src",
        // includes: "_includes",
        output: "_site"
      },
      markdownTemplateEngine: "njk",
      htmlTemplateEngine: "njk"
    };
  };

eleventyConfig.addCollection("blog", function(collection) {
  return collection.getFilteredByGlob("src/blog/*.md");
});
  
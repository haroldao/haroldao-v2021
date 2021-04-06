const fs = require("fs");
const htmlmin = require("html-minifier");

module.exports = function(eleventyConfig) {
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function(err, bs) {

        bs.addMiddleware("*", (req, res) => {
          const content_404 = fs.readFileSync('_site/404.html');
          // Add 404 http status code in request header.
          res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      }
    }
  });

  eleventyConfig.setTemplateFormats(["liquid"]);

  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    // Eleventy 1.0+: use this.inputPath and this.outputPath instead
    if( outputPath && outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
          useShortDoctype: true,
          removeComments: true,
          collapseWhitespace: true
      });
      return minified;
    }
    return content;
  });
  eleventyConfig.addPassthroughCopy({
    "./src/admin/config.yml": "./admin/config.yml",
    "./src/admin/index.html": "./admin/index.html"
  });

  return {
    dir:{
      // ⚠️ These values are both relative to your input directory.
      input: "src",
      includes: "_includes",
      layouts: "_layouts",
      data: "data"
    }
  }

};

// @see https://www.11ty.io/docs/config/
const fs = require("fs");
const htmlmin = require("html-minifier");
const pluginRespimg = require( "eleventy-plugin-respimg" );
const schema = require("@quasibit/eleventy-plugin-schema");
const sitemap = require("@quasibit/eleventy-plugin-sitemap");

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
    },
    files: './_site/css/**/*.css'
  });

  eleventyConfig.setTemplateFormats(["liquid", "md"]);
  eleventyConfig.addWatchTarget("./src/scss/");
  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy("_redirects");
  eleventyConfig.addPassthroughCopy(".src/robot.txt");
  eleventyConfig.addPassthroughCopy("./src/js/app.js");

  // @see https://github.com/eeeps/eleventy-respimg
  eleventyConfig.cloudinaryCloudName = 'haroldao';
  eleventyConfig.srcsetWidths = [ 320, 640, 960, 1280, 1600, 1920, 2240, 2560 ];
  eleventyConfig.fallbackWidth = 640;
  eleventyConfig.addPlugin(pluginRespimg);
  eleventyConfig.addPlugin(schema);

  eleventyConfig.addPlugin(sitemap, {
    sitemap: {
      hostname: "https://haroldao.com",
    },
  });

  // Minify HTML
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

  eleventyConfig.addFilter('iso8601', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toISO()
  });

  // Copy Static Files to /_Site
  eleventyConfig.addPassthroughCopy({
    "./src/admin/config.yml": "./admin/config.yml",
    "./src/admin/index.html": "./admin/index.html",
    "./src/fonts/": "src/fonts",
    "./src/assets/": "/",
    "node_modules/locomotive-scroll/dist/locomotive-scroll.min.js": "./js/locomotive-scroll.min.js",
    "node_modules/splitting/dist/splitting-lite.js": "./js/splitting-lite.js",
    "node_modules/splitting/dist/splitting.css": "./css/splitting.css",
    "node_modules/splitting/dist/splitting-cells.css": "./css/splitting-cells.css"
  });

  return {
    dir:{
      // ⚠️ These values are both relative to your input directory.
      input: "src",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data"
    },
    templateFormats: ["liquid", "md"]
  }
};

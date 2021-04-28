const fs = require("fs");
const htmlmin = require("html-minifier");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const pluginRespimg = require( "eleventy-plugin-respimg" );

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

  eleventyConfig.setTemplateFormats(["liquid"]);
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addWatchTarget("./src/scss/");
  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy("./src/js");

  // https://github.com/eeeps/eleventy-respimg
  eleventyConfig.cloudinaryCloudName = 'haroldao';
  eleventyConfig.srcsetWidths = [ 320, 640, 960, 1280, 1600, 1920, 2240, 2560 ];
  eleventyConfig.fallbackWidth = 640;
  eleventyConfig.addPlugin( pluginRespimg );

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
  // Copy Static Files to /_Site
  eleventyConfig.addPassthroughCopy({
    "./src/admin/config.yml": "./admin/config.yml",
    "./src/admin/index.html": "./admin/index.html",
    "./src/fonts/": "src/fonts",
    "node_modules/locomotive-scroll/dist/locomotive-scroll.js": "./js/locomotive-scroll.js"
  });

  // eleventyConfig.addPassthroughCopy('./src/fonts');

  return {
    dir:{
      // ⚠️ These values are both relative to your input directory.
      input: "src",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data"
    }
  }

};

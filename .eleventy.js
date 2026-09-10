const { EleventyRenderPlugin } = require("@11ty/eleventy");

module.exports = function (eleventyConfig) {
  // Lets src/index.njk pull README.md through 11ty's own markdown renderer
  // ({% renderFile "./README.md", {}, "md" %}) — no separate build step, no
  // data file. README.md stays a plain GitHub readme.
  eleventyConfig.addPlugin(EleventyRenderPlugin);

  // README has literal <br> tags — let markdown-it pass HTML through.
  eleventyConfig.amendLibrary("md", (md) => md.set({ html: true }));

  // Ship the built framework alongside the promo page so every existing URL
  // keeps resolving:
  //   au.goldenharpmedia.com/framework/packages/vX.X.X/au.css  (versioned archive, CDN)
  //   au.goldenharpmedia.com/framework/dist/au.css             (latest release)
  //   au.goldenharpmedia.com/framework/lib/au.flex.css         (raw source)
  eleventyConfig.addPassthroughCopy("packages");
  eleventyConfig.addPassthroughCopy("dist");
  eleventyConfig.addPassthroughCopy("lib");

  return {
    dir: { input: "src", output: "_site" },
  };
};

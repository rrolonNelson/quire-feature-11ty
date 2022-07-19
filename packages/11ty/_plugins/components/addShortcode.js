/**
 * Adds a custom tag for a shortcode component.
 *
 * Shortcodes are added for all template languages. This is a simple wrapper
 * around `eleventyConfig.addShortcode()`, providing `page` data to component.
 * @see ./addComponentTag.js to add custom tags with keyword arguments.
 *
 * @param  {Object}  eleventyConfig  The Eleventy configuration instance
 * @param  {Object}  component       A JavaScript shortcode component
 * @param  {String}  tagName         A template tag name for the component
 */
module.exports = function(eleventyConfig, collections, tagName, component) {
  eleventyConfig.addShortcode(tagName, function(...args) {
    const page = collections.all.find(({ inputPath }) => this.page.inputPath)
    return component(eleventyConfig, { page })(...args)
  })
}

const { html } = require('common-tags')

/**
 * Render UI elements for selecting IIIF annotations or choices, 
 * which are a type of annotation but need their own UI
 * 
 * @param  {Object} eleventyConfig
 * @return {String} HTML radio or checkbox input elements
 */

module.exports = function(eleventyConfig) {
  const figureOption = eleventyConfig.getFilter('figureOption')

  /**
   * @param  {Object} figure
   */
  return function(figure, context='inline') {
    const { annotations } = figure
    if (!annotations || !annotations.length) return ''
    const fieldsets = annotations.map(({ input, items, title='', type }, index) => {
      const name = `${figure.id}-${index}-${context}`
      const options = 
        items.map((annotation, index) => figureOption({ annotation, index, input, name }))
      return html`
        <fieldset class="annotations-ui annotations-ui--${context}">
          <legend>${title}</legend>
          ${options}
        </fieldset>
      `
    })
    return html`<form>${fieldsets}</form>`
  }
}

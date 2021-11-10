const { html } = require('common-tags')

module.exports = function (eleventyConfig, { config }, { caption, id }, content) {
  const qicon = eleventyConfig.getFilter('qicon')
  const markdownify = eleventyConfig.getFilter('markdownify')
  const icon = config.params.figureLabelLocation === 'below' 
    ? qicon('fullscreen', 'Expand') 
    : ''
  return config.params.figureModal
    ? html`<a
          href="#deepzoom-${ id }"
          class="inline popup"
          data-type="inline"
          title="${markdownify(caption || '')}">
          <span class="q-figure__label-icon">${icon}</span>
          ${content}
        </a>`
    : content
}
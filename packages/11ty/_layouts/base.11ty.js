const { html } = require('~lib/common-tags')

/**
 * Base layout as a JavaScript method
 *
 * @param      {Object}  data    Final data from the Eleventy data cascade
 * @return     {Function}  Template render function
 */
module.exports = function(data) {
  const { class: classes, collections, content, pageData, publication } = data
  const { outputPath } = pageData || {}

  let pageClasses = Array.isArray(classes) ? classes : [classes]
  pageClasses.map((className) => `quire-page--${className}`)

  return this.renderTemplate(
    html`
      <!doctype html>
      <html lang="${publication.language}">
        ${this.head(data)}
        <body>
          ${this.icons(data)}
          ${this.iconscc(data)}
          <div class="quire no-js" id="container">
            <div
              aria-expanded="false"
              class="quire__secondary remove-from-epub"
              id="site-menu"
              role="contentinfo"
            >
              ${this.menu({ collections, pageData })}
            </div>
            <div class="quire__primary" id="{{ section }}">
              ${this.navigation(data)}
              <section class="quire-page ${pageClasses}" data-output-path="${outputPath}">
                ${content}
              </section>
            </div>
            {% render 'search' %}
          </div>
          ${this.modal()}
          ${this.scripts()}
        </body>
      </html>
    `,
    'liquid'
  )
}

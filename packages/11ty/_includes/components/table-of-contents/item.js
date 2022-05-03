const path = require ('path')
const { oneLine } = require('common-tags')

/**
 * Renders a TOC item
 *
 * @param     {Object} context
 * @param     {String} params
 * @property  {String} className - The TOC page class, "grid", "brief", or "abstract"
 * @property  {String} config - The global config
 * @property  {String} imageDir - The computed imageDir property
 * @property  {String} page - The TOC item's page data
 *
 * @return {String} TOC item markup
 */
module.exports = function (eleventyConfig) {
  const contributorList = eleventyConfig.getFilter('contributorList')
  const getFigure = eleventyConfig.getFilter('getFigure')
  const getObject = eleventyConfig.getFilter('getObject')
  const icon = eleventyConfig.getFilter('icon')
  const markdownify = eleventyConfig.getFilter('markdownify')
  const pageTitle = eleventyConfig.getFilter('pageTitle')
  const tableOfContentsImage = eleventyConfig.getFilter('tableOfContentsImage')
  const urlFilter = eleventyConfig.getFilter('url')
  const { imageDir } = eleventyConfig.globalData.config.params

  return function (params) {
    const {
      abstract,
      className,
      data,
      figure: pageFigure,
      layout,
      summary,
      tocPages,
      url
    } = params

    const {
      contributor: pageContributors,
      image,
      label,
      object: pageObject,
      short_title,
      title,
      weight
    } = data

    const brief = className.includes('brief')
    const grid = className.includes('grid')

    const itemClassName = weight < tocPages[0].data.weight ? "frontmatter-page" : ""
    const pageContributorList = contributorList({ contributors: pageContributors })
    const pageContributorsElement = pageContributorList
      ? `<span class="contributor"> — ${pageContributorList}</span>`
      : ''

    let pageTitleElement = ''
    if (short_title && brief) {
      pageTitleElement += short_title
    } else if (brief) {
      pageTitleElement += title
    } else {
      const { label, subtitle, title } = data
      pageTitleElement += oneLine`${pageTitle({ label, subtitle, title })}${pageContributorsElement}`
    }
    const arrowIcon = `<span class="arrow remove-from-epub">&nbsp${icon({ type: 'arrow-forward', description: '' })}</span>`

    // Returns abstract with any links stripped out
    const abstractText =
      className === 'abstract' && (abstract || summary)
        ? `<div class="abstract-text">
            {{ markdownify(abstract) | replaceRE "</?a(|\\s*[^>]+)>" "" | strip_html }}
        </div>`
        : ''


    const openingAnchorTag = url ? `<a href="${urlFilter(url)}" class="${itemClassName}">` : ''
    const closingAnchorTag = url ? `</a>` : ''

    let mainElement

    if (grid) {
      const imageAttribute = pageFigure || pageObject ? "image" : "no-image"
      const slugPageAttribute = layout === 'contents' ? "slug-page" : ""
      let imageElement
      switch (true) {
        case !!image:
          imageElement = `<div class="card-image">
              <figure class="image">
                <img src="${path.join(imageDir, image)}" alt="" />
              </figure>
            </div>`
          break
        case !!pageFigure:
          const firstFigure = firstPageFigure ? getFigure(pageFigure[0]) : null
          imageElement = firstFigure ? tableOfContentsImage({ imageDir, src: firstFigure.src }) : ''
          break
        case !!pageObject:
          const firstObjectId = pageObject[0].id
          const object = getObject(firstObjectId)
          const firstObjectFigure = object ? getFigure(object.figure[0].id) : null
          imageElement = firstObjectFigure ? tableOfContentsImage({ imageDir, src: firstObjectFigure.src }) : ''
          break
        default:
          imageElement = ''
          break;
      }
      mainElement = `
        ${openingAnchorTag}
          <div class="card ${imageAttribute} ${slugPageAttribute}">
            ${imageElement}
            <div class="card-content">
              <div class="title">
                ${markdownify(pageTitleElement)}
                ${url ? arrowIcon : ''}
              </div>
            </div>
          </div>
        ${closingAnchorTag}`
    } else {
      mainElement = `
        <div class="title">
          ${openingAnchorTag}
            ${markdownify(pageTitleElement)}
            ${url ? arrowIcon : ''}
          ${closingAnchorTag}
        </div>
        ${abstractText}
      `
    }
    return mainElement
  }
}

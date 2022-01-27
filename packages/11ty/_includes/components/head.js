/**
 * @param      {Object}  context
 * @param      {Object}  eleventyComputed
 */
module.exports = function({ eleventyConfig, globalData, page }, eleventyComputed) {
  const analytics = eleventyConfig.getFilter('analytics')
  const dublinCore = eleventyConfig.getFilter('dublinCore')
  const jsonld = eleventyConfig.getFilter('jsonld')
  const opengraph = eleventyConfig.getFilter('opengraph')
  const twitterCard = eleventyConfig.getFilter('twitterCard')

  const { config, publication } = globalData
  const { canonicalURL, title } = eleventyComputed

  const title = title
    ? `${title} | ${publication.title}`
    : publication.title

  const description = publication.description.full || publication.description.one_line

  const publisherLinks = publication.publisher
    .filter(({ url }) => url)
    .map(({ url }) => `<link rel="publisher" href="${ url }">`)
    .join('\n')

  const contributorLinks = publication.contributor
    .filter(({ url }) => url)
    .map(({ url }) => `<link rel="author" href="${ url }">`)
    .join('\n')

  const keywords = publication.subject
    .filter(({ type }) => type === "keyword")
    .map(({ name }) => name)
    .join(', ')

  return `
    <head>
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <meta name="robots" content="noindex, nofollow"/>

      <title>${title}</title>

      <meta name="description" content="${description}">
      <meta name="keywords" content="${keywords}">

      <link rel="canonical" href="${canonicalURL}">
      <link rel="version-history" href="${publication.repositoryUrl}">

      ${publisherLinks}

      ${contributorLinks}

      ${dublinCore()}

      ${opengraph()}

      ${twitterCard(eleventyComputed)}

      <script type="application/ld+json">${jsonld(eleventyComputed)}</script>

      <link rel="icon" href="/_assets/img/icons/favicon.ico" />
      <link rel="stylesheet" href="/_assets/styles/custom.css" />
      <link rel="stylesheet" href="/_assets/styles/application.css" />

      <!-- {% render 'polyfills/template.html' %} -->

      ${analytics()}
    </head>
  `
}

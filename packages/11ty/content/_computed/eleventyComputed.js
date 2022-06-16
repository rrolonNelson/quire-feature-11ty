const path = require('path')
/**
 * Global computed data
 */
module.exports = {
  canonicalURL: ({ config, page }) => page.url && path.join(config.baseURL, page.url),
  eleventyNavigation: {
    /**
     * Explicitly define page data properties used in the TOC
     * since eleventyNavigation does not include the entire page object
     */
    data: (data) => {
      return {
        abstract: data.abstract,
        contributor: data.contributor,
        figure: data.figure,
        image: data.image,
        label: data.label,
        layout: data.layout,
        object: data.object,
        order: data.order,
        short_title: data.short_title,
        subtitle: data.subtitle,
        summary: data.summary,
        title: data.title
      }
    },
    key: (data) => {
      if (!data.page.url) return
      const segments = data.page.url.split('/')
      const key = segments.slice(1, segments.length - 1).join('/')
      return data.key || key
    },
    order: (data) => data.order,
    parent: (data) => {
      if (!data.page.url) return
      const segments = data.page.url.split('/')
      const parent = segments.slice(1, segments.length - 2).join('/')
      return data.parent || parent
    },
    url: (data) => data.page.url,
    title: (data) => data.title
  },
  pageContributors: ({ contributor, contributor_as_it_appears }) => {
    const contributors = contributor_as_it_appears 
      ? contributor_as_it_appears
      : contributor
    if (!contributors) return;
    return (typeof contributors === 'string' || Array.isArray(contributors))
      ? contributors
      : [contributors]
  },
  /**
   * Compute a 'pageData' property that includes the page and collection page data
   * @todo figure out how to have this override the page property
   */
  pageData: ({ collections, page }) => {
    if (!collections) return
    return collections.all.find(({ url }) => url === page.url)
  },
  /**
   * Figures data for figures referenced by id in page frontmatter 
   */
  pageFigures: ({ figure, figures }) => {
    if (!figure || !figure.length) return
    return figure.map((figure) => figures.figure_list.find((item) => item.id === figure.id))
  },
  /**
   * Objects data referenced by id in page frontmatter including figures data
   */
  pageObjects: ({ figures, object, objects }) => {
    if (!object || !object.length) return
    return object
      .reduce((validObjects, item) => {
        const objectData = objects.object_list.find(({ id }) => id === item.id)
        if (!objectData) {
          console.warn(`Error: eleventyComputed: pageObjects: no object found with id ${item.id}`)
          return validObjects
        }

        if (!objectData.figure) {
          console.warn(`Error: eleventyComputed: pageObjects: object id ${objectData.id} has no figure data`)
        } else {
          objectData.figures = objectData.figure.map((figure) => {
            if (figure.id) {
              return figures.figure_list.find((item) => item.id === figure.id)
            } else {
              return figure
            }
          })
          validObjects.push(objectData)
        }

        return validObjects
      }, [])
  },
  pagination: ({ collections, page }) => {
    if (!page) return {}
    const currentPageIndex = collections.navigation
      .findIndex(({ url }) => url === page.url)
    return {
      currentPage: collections.navigation[currentPageIndex],
      currentPageIndex,
      nextPage: collections.navigation[currentPageIndex + 1],
      previousPage: collections.navigation[currentPageIndex - 1]
    }
  },
  /**
   * Contributors with a `pages` property containing data about the pages they contributed to
   */
  publicationContributors: ({ config, publication, pages }) => {
    const { contributor, contributor_as_it_appears } = publication
    return contributor_as_it_appears
      ? contributor_as_it_appears
      : contributor
      .map((item) => {
        const { pic } = item
        item.imagePath = pic
          ? path.join(config.params.imageDir, pic)
          : null
        item.pages = pages && pages.filter(
          ({ data }) => {
            if (!data.contributor) return
            return Array.isArray(data.contributor)
              ? data.contributor.find(
                (pageContributor) => pageContributor.id === item.id
              )
              : data.contributor.id === item.id
          }
        )
        return item
      })
  }
}

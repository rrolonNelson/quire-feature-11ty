/**
 * Contents page template for TOC and Section TOCs. 
 * Page content from the markdown will appear in the content outlet below. 
 * The Table of Contents list will appear below that. 
 * It is scoped to show the contents of the full site. 
 * Pages can be removed from the TOC indivudally by setting toc to `false` in the page yaml.
 */

module.exports = class TableOfContents {
  data() {
    return {
      layout: 'base'
    }
  }

  render(data) {
    const {
      class: className,
      collections,
      config,
      content,
      imageDir,
      pagination,
      section,
      tocPages
    } = data

    const contentElement = content
      ? `
        <div class="container">
          <div class="content">
            ${content}
          </div>
        </div>
        `
      : ''
    const containerClass = className === 'grid' ? 'is-fullhd' : ''
    const contentsListClass = ['abstract', 'brief', 'grid'].includes(className)
      ? className
      : 'list'


    let renderedSection

    const defaultContentsItemParams = { className, tocPages }

    const listItems = tocPages
      .filter((page) => !section || section && page.data.section === section)
      .map((page) => {
        let listItem = ''
        if (page.data.section && page.data.section !== renderedSection) {
          renderedSection = page.data.section

          const subPages =
            config.params.tocType === 'full'
              ? tocPages
                  .filter(
                    (item) =>
                      item.data.section === page.data.section &&
                      item.data.layout !== 'table-of-contents'
                  )
                  .map((item) => {
                    return `
                      <li class="page-item">
                        ${this.tableOfContentsItem({ ...defaultContentsItemParams, ...item })}
                      </li>
                    `
                  }).join('')
                : null

          let sectionHeadingProps = {}
          if (page.data.layout === 'table-of-contents') {
            sectionHeadingProps = page
          } else {
            /**
             * Derive title from directory name
             */
            const titleParts = page.url.split('/')[1].split('-')
            for (let i = 0; i < titleParts.length; i++) {
                titleParts[i] = titleParts[i][0].toUpperCase() + titleParts[i].substr(1);
            }
            sectionHeadingProps = {
              data: {
                title: titleParts.join(' ')
              }
            }
          }

          return `
            <li class="section-item">
              ${this.tableOfContentsItem({ ...defaultContentsItemParams, ...sectionHeadingProps })}
              <ul>${subPages}</ul>
            </li>
          `
        } else if (section || !page.data.section) {
          return `
            <li class="page-item">
              ${this.tableOfContentsItem({ ...defaultContentsItemParams, ...page })}
            </li>
          `
        }
      })

    return this.renderTemplate(
      `<div class="{% pageClass pages=tocPages, pagination=pagination %} quire-contents" id="main" role="main">
        {% pageHeader
          contributor=contributor,
          contributor_as_it_appears=contributor_as_it_appears,
          contributor_byline=contributor_byline,
          image=image,
          label=label,
          subtitle=subtitle,
          title=title
        %}
        <section class="section quire-page__content" id="content">
          ${contentElement}
          <div class="container ${containerClass}">
            <div class="quire-contents-list ${contentsListClass}">
              <div class="menu-list">
                <ul>
                  ${listItems.join('')}
                </ul>
              </div>
              <div class="content">
                {% bibliography %}
              </div>
            </div>
            ${this.pageButtons({ pagination })}
          </div>
        </section>
      </div>`,
      'liquid',
      data
    )
  }
}

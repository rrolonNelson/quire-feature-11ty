/**
 * Export all component includes
 */
const licenseIcons = require('./license-icons')

module.exports = {
  analytics: require('./analytics.js'),
  citation: require('./citation/index.js'),
  citationChicagoPage: require('./citation/chicago/page.js'),
  citationChicagoPublishers: require('./citation/chicago/publishers.js'),
  citationChicagoPublication: require ('./citation/chicago/publication.js'),
  citationChicagoPublicationContributors: require ('./citation/chicago/publication-contributors.js'),
  citationChicagoSite: require('./citation/chicago/site.js'),
  citationMLAPage: require('./citation/mla/page.js'),
  citationMLAPublishers: require('./citation/mla/publishers.js'),
  citationMLAPublication: require('./citation/mla/publication.js'),
  citationMLAPublicationContributors: require('./citation/mla/publication-contributors.js'),
  citationMLASite: require('./citation/mla/site.js'),
  citationPubDate: require('./citation/pub-date.js'),
  citationPubSeries: require('./citation/pub-series.js'),
  citationContributors: require('./citation/contributors.js'),
  contentsImage: require('./contents/image.js'),
  copyright: require('./copyright/index.js'),
  copyrightLicensing: require('./copyright/licensing.js'),
  contentsItem: require('./contents/item.js'),
  contributorList: require('./contributor/list.js'),
  contributorName: require('./contributor/name.js'),
  contributorPageLinks: require('./contributor/page-links.js'),
  contributorTitle: require('./contributor/title.js'),
  head: require('./head.js'),
  icons: require('./icons.js'),
  iconscc: require('./icons-cc.js'),
  index: require('./index.js'),
  ...licenseIcons,
  link: require('./link.js'),
  linkList: require('./link-list.js'),
  menuHeader: require('./menu/header.js'),
  menu: require('./menu/index.js'),
  menuItem: require('./menu/item.js'),
  menuList: require('./menu/list.js'),
  menuResources: require('./menu/resources.js'),
  nav: require('./nav-bar.js'),
  pageButtons: require('./page-buttons.js'),
  pageTitle: require('./page-title.js'),
  scripts: require('./scripts.js'),
  siteTitle: require('./site-title.js'),
}

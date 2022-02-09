const { oneLine } = require('common-tags')
const path = require('path')
const link = require('../../_includes/link.js')

/**
 * qcontributor shortcode
 * Renders contributor data with bio for contributors page
 * ---
 * @todo
 * ---
 * Render formats other than 'bio'
 *
 * @param  {Object} eleventyConfig
 * @param  {Object} globalData
 * @param  {Object} params
 * @property  {Object} contributor
 * @property  {String} format              'bio' or... ?
 * @property  {String} entryType "publication" or "page"
 * 
 * @return {String} contributor markup
 */
module.exports = function ({ eleventyConfig }, { contributor, format, entryType }) {
  const fullName = eleventyConfig.getFilter('fullName')
  const contributorPageLinks = eleventyConfig.getFilter('contributorPageLinks')
  const getContributor = eleventyConfig.getFilter('getContributor')
  const qicon = eleventyConfig.getFilter('qicon')
  const slugify = eleventyConfig.getFilter('slugify')

  const { bio, id, imagePath, pages, url } = contributor
  const name = fullName(contributor)
  return oneLine`
    <ul class="quire-contributors-list bio">
      <li class="quire-contributor" id="${slugify(name)}">
        <div class="title is-5">
          <span class="quire-contributor__name">${name}</span> 
          ${link({ classes: ["quire-contributor__url"], name: qicon('link', ''), url })}
        </div>
        <div class="media">
          <div class="quire-contributor__details media-content">
            <div class="media-left">
              <img class="image quire-contributor__pic" src="${imagePath}" alt="Picture of ${name}">
            </div>
            <div class="quire-contributor__bio">
              ${bio}
            </div>
            ${contributorPageLinks(contributor)}
          </div>
        </div>
      </li>
    </ul>`
}

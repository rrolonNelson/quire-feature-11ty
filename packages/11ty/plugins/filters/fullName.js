/**
 * @param     {Object} person
 * @property  {Object} first_name
 * @property  {Object} full_name
 * @property  {Object} last_name
 * @param     {Object} options
 * @property  {Object} reverse - if true, returns "lastname, firstname"
 *
 * @return {String} person display name
 */
module.exports = function (person, options = {}) {
  const { first_name, full_name, last_name } = person
  const nameParts = [first_name, last_name].filter(item => item)
  let joinedName
  if (options.reverse) {
    joinedName = nameParts.reverse().join(', ')
  } else {
    joinedName = nameParts.join(' ')
  }
  return full_name ? full_name : joinedName
}

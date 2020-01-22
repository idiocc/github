const { _github } = require('./github')

/**
 * @methodType {_idio.githubOAuth}
 */
function github(app, config) {
  return _github(app, config)
}

module.exports = github

/* typal types/index.xml namespace */

/* typal types/user.xml namespace */

/* typal types/api.xml namespace */

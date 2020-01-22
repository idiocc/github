const { _github } = require('./github')

/**
 * The GitHub OAuth Login Routes For The Idio Web Server. Two routes will be configured: one to redirect to GitHub to start authentication, and one to handle the callback from GitHub. They will be installed on the app automatically.
 * @param {_goa.Application} app The Goa/Koa Application.
 * @param {!_idio.GithubOAuthConfig} config Options for the program.
 * @param {string} config.client_id The app's client id.
 * @param {string} config.client_secret The app's client secret.
 * @param {string} [config.path="/auth/github"] The server path to start the login flaw at and use for redirect (`${path}/redirect`). Default `/auth/github`.
 * @param {string} [config.scope] The scope to ask permissions for. No scope by default.
 * @param {!_goa.Middleware} [config.session] The configured session middleware in case the `session` property is not globally available on the context.
 * @param {(ctx: _idio.Context, token: string, scope: string, user: !_idio.GithubUser, next: function()) => !Promise} [config.finish="setSession; redirect;"] The function to complete the authentication that receives the token and the data about the user, such as name and id. The default function redirects to `/`. Default `setSession; redirect;`.
 * @param {(ctx: !_idio.Context, error: string, description: string, next: function()) => !Promise} [config.error="throw;"] The function to be called in case of error. If not specified, the middleware will throw an internal server error. Default `throw;`.
 */
function github(app, config) {
  return _github(app, config)
}

module.exports = github

/* typal types/index.xml namespace */
/**
 * @typedef {import('@typedefs/goa').Middleware} _goa.Middleware
 * @typedef {import('@typedefs/idio').Context} _idio.Context
 * @typedef {_idio.GithubOAuthConfig} GithubOAuthConfig `＠record` Options for the program.
 * @typedef {Object} _idio.GithubOAuthConfig `＠record` Options for the program.
 * @prop {string} client_id The app's client id.
 * @prop {string} client_secret The app's client secret.
 * @prop {string} [path="/auth/github"] The server path to start the login flaw at and use for redirect (`${path}/redirect`). Default `/auth/github`.
 * @prop {string} [scope] The scope to ask permissions for. No scope by default.
 * @prop {!_goa.Middleware} [session] The configured session middleware in case the `session` property is not globally available on the context.
 * @prop {(ctx: _idio.Context, token: string, scope: string, user: !_idio.GithubUser, next: function()) => !Promise} [finish="setSession; redirect;"] The function to complete the authentication that receives the token and the data about the user, such as name and id. The default function redirects to `/`. Default `setSession; redirect;`.
 * @prop {(ctx: !_idio.Context, error: string, description: string, next: function()) => !Promise} [error="throw;"] The function to be called in case of error. If not specified, the middleware will throw an internal server error. Default `throw;`.
 */

/* typal types/user.xml namespace */
/**
 * @typedef {_idio.GithubEmail} GithubEmail `＠record`
 * @typedef {Object} _idio.GithubEmail `＠record`
 * @prop {string} email The email address.
 * @prop {boolean} verified Whether the email was verified.
 * @prop {boolean} primary Whether the email is primary.
 * @prop {string} visibility Either `public` or `private`.
 * @typedef {_idio.GithubUser} GithubUser Public user information
 * @typedef {Object} _idio.GithubUser Public user information
 * @prop {?string} email Publicly visible email address. `octocat＠github.com` or `null`.
 * @prop {!Array<!_idio.GithubEmail>} emails All email addresses accessible if the `user:email` scope was requested.
 * @prop {string} login `octocat`
 * @prop {number} id 1
 * @prop {string} node_id `MDQ6VXNlcjE=`
 * @prop {string} avatar_url `https://github.com/images/error/octocat_happy.gif`
 * @prop {string} gravatar_id ``
 * @prop {string} url `https://api.github.com/users/octocat`
 * @prop {string} html_url `https://github.com/octocat`
 * @prop {string} followers_url `https://api.github.com/users/octocat/followers`
 * @prop {string} following_url `https://api.github.com/users/octocat/following{/other_user}`
 * @prop {string} gists_url `https://api.github.com/users/octocat/gists{/gist_id}`
 * @prop {string} starred_url `https://api.github.com/users/octocat/starred{/owner}{/repo}`
 * @prop {string} subscriptions_url `https://api.github.com/users/octocat/subscriptions`
 * @prop {string} organizations_url `https://api.github.com/users/octocat/orgs`
 * @prop {string} repos_url `https://api.github.com/users/octocat/repos`
 * @prop {string} events_url `https://api.github.com/users/octocat/events{/privacy}`
 * @prop {string} received_events_url `https://api.github.com/users/octocat/received_events`
 * @prop {string} type `User`
 * @prop {boolean} site_admin false
 * @prop {string} name `monalisa octocat`
 * @prop {string} company `GitHub`
 * @prop {string} blog `https://github.com/blog`
 * @prop {string} location `San Francisco`
 * @prop {boolean} hireable false
 * @prop {string} bio `There once was...`
 * @prop {number} public_repos 2
 * @prop {number} public_gists 1
 * @prop {number} followers 20
 * @prop {number} following 0
 * @prop {string} created_at `2008-01-14T04:33:35Z`
 * @prop {string} updated_at `2008-01-14T04:33:35Z`
 */

/* typal types/api.xml namespace */
/**
 * @typedef {import('@typedefs/goa').Application} _goa.Application
 * @typedef {_idio.githubOAuth} githubOAuth The GitHub OAuth Login Routes For The Idio Web Server. Two routes will be configured: one to redirect to GitHub to start authentication, and one to handle the callback from GitHub. They will be installed on the app automatically.
 * @typedef {(app: _goa.Application, config: !_idio.GithubOAuthConfig) => void} _idio.githubOAuth The GitHub OAuth Login Routes For The Idio Web Server. Two routes will be configured: one to redirect to GitHub to start authentication, and one to handle the callback from GitHub. They will be installed on the app automatically.
 */

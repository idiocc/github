/**
 * @fileoverview
 * @externs
 */
/* typal types/user.xml */
/** @const */
var _idio = {}
/**
 * Public user information
 * @typedef {{ login: string, id: number, node_id: string, avatar_url: string, gravatar_id: string, url: string, html_url: string, followers_url: string, following_url: string, gists_url: string, starred_url: string, subscriptions_url: string, organizations_url: string, repos_url: string, events_url: string, received_events_url: string, type: string, site_admin: boolean, name: string, company: string, blog: string, location: string, email: ?string, hireable: boolean, bio: string, public_repos: number, public_gists: number, followers: number, following: number, created_at: string, updated_at: string }}
 */
_idio.GithubUser

/* typal types/index.xml */
/**
 * Options for the program.
 * @record
 */
_idio.GithubOAuthConfig
/**
 * The app's client id.
 * @type {string}
 */
_idio.GithubOAuthConfig.prototype.client_id
/**
 * The app's client secret.
 * @type {string}
 */
_idio.GithubOAuthConfig.prototype.client_secret
/**
 * The server path to start the login flaw at and use for redirect (`${path}/redirect`). Default `/auth/github`.
 * @type {string|undefined}
 */
_idio.GithubOAuthConfig.prototype.path
/**
 * The scope to ask permissions for. No scope by default.
 * @type {string|undefined}
 */
_idio.GithubOAuthConfig.prototype.scope
/**
 * The configured session middleware in case the `session` property is not globally available on the context.
 * @type {_goa.Middleware|undefined}
 */
_idio.GithubOAuthConfig.prototype.session
/**
 * The function to complete the authentication that receives the token and the data about the user, such as name and id. The default function redirects to `/`. Default `setSession; redirect;`.
 * @type {(function(_goa.Context,string,string,_idio.GithubUser,function()): !Promise)|undefined}
 */
_idio.GithubOAuthConfig.prototype.finish = function(ctx, token, scope, user, next) {}
/**
 * The function to be called in case of error. If not specified, the middleware will throw an internal server error. Default `throw;`.
 * @type {(function(_goa.Context,string,string,function()): !Promise)|undefined}
 */
_idio.GithubOAuthConfig.prototype.error = function(ctx, error, description, next) {}

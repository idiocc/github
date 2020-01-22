/**
 * @fileoverview
 * @externs
 */

/* typal types/index.xml */
/** @const */
var _idio = {}
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
 * @type {(!_goa.Middleware)|undefined}
 */
_idio.GithubOAuthConfig.prototype.session
/**
 * The function to complete the authentication that receives the token and the data about the user, such as name and id. The default function redirects to `/`. Default `setSession; redirect;`.
 * @type {(function(_idio.Context,string,string,!_idio.GithubUser,function()): !Promise)|undefined}
 */
_idio.GithubOAuthConfig.prototype.finish = function(ctx, token, scope, user, next) {}
/**
 * The function to be called in case of error. If not specified, the middleware will throw an internal server error. Default `throw;`.
 * @type {(function(!_idio.Context,string,string,function()): !Promise)|undefined}
 */
_idio.GithubOAuthConfig.prototype.error = function(ctx, error, description, next) {}

/* typal types/api.xml */
/**
 * The GitHub OAuth Login Routes For The Idio Web Server. Two routes will be configured: one to redirect to GitHub to start authentication, and one to handle the callback from GitHub. They will be installed on the app automatically.
 * @typedef {function(_goa.Application,!_idio.GithubOAuthConfig)}
 */
_idio.githubOAuth

/* typal types/github.xml namespace */
/**
 * The response from GitHub for OAuth code exchange request.
 * @record
 */
_idio.GithubExchangeResponse
/**
 * The error title.
 * @type {string}
 */
_idio.GithubExchangeResponse.prototype.error
/**
 * The error description.
 * @type {string}
 */
_idio.GithubExchangeResponse.prototype.error_description
/**
 * The received token.
 * @type {string}
 */
_idio.GithubExchangeResponse.prototype.access_token
/**
 * The scope.
 * @type {string}
 */
_idio.GithubExchangeResponse.prototype.scope
/**
 * The type, i.e. `bearer`.
 * @type {string}
 */
_idio.GithubExchangeResponse.prototype.token_type

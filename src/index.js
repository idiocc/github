import { jqt } from 'rqt'
import { stringify } from 'querystring'

/**
 * The GitHub OAuth Login Routes For The Idio Web Server.
 * @param {_goa.Application} [app] The Koa/Goa app.
 * @param {_idio.GithubOAuthConfig} [config] Options for the program.
 * @param {string} config.client_id The app's client id.
 * @param {string} config.client_secret The app's client secret.
 * @param {string} [config.path="/auth/github"] The server path to start the login flaw at and use for redirect (`${path}/redirect`). Default `/auth/github`.
 * @param {string} [config.scope] The scope to ask permissions for. No scope by default.
 * @param {_goa.Middleware} [config.session] The configured session middleware in case the `session` property is not globally available on the context.
 * @param {(ctx: _goa.Context, token: string, scope: string, scope: _idio.GithubUser, next: function()) => !Promise} [config.finish="setSession; redirect;"] The function to complete the authentication that receives the token and the data about the user, such as name and id. The default function redirects to `/`. Default `setSession; redirect;`.
 * @param {(ctx: _goa.Context, error: string, description: string, next: function()) => !Promise} [config.error="throw;"] The function to be called in case of error. If not specified, the middleware will throw an internal server error. Default `throw;`.
 */
export default function github(app, config = {}) {
  const {
    client_id,
    client_secret,
    path = '/auth/github',
    scope = '',
    error = (ctx, err, description) => {
      throw new Error(description)
    },
    finish = /* async */ (ctx, token, s, user /* next */) => {
      ctx.session.token = token
      ctx.session.scope = s
      ctx.session.user = user
      ctx.redirect('/')
    },
    session,
  } = config

  if (!client_id) {
    console.warn('[github] No client id - the dialog won\'t work.')
  }
  if (!client_secret) {
    console.warn('[github] No client secret - the redirect won\'t work.')
  }

  const start = async (ctx) => {
    let state
    if (ctx.session) {
      state = Math.floor(Math.random() * 10000)
      ctx.session.state = state
      await ctx.session.manuallyCommit()
    }
    const redirect_uri = getRedirect(ctx, path) + 1
    const u = githubDialogUrl({
      redirect_uri,
      client_id,
      scope,
      state,
    })
    ctx.redirect(u)
  }

  const redirect = async (ctx, next) => {
    const redirect_uri = getRedirect(ctx, path)
    let state
    if (ctx.session) {
      state = ctx.query.state
      if (state != ctx.session.state) {
        throw new Error('The state is incorrect.')
      }
      ctx.session.state = null
      await ctx.session.manuallyCommit()
    }
    if (ctx.query.error) {
      const { error: e, error_description } = ctx.query
      await error(ctx, e, error_description, next)
      return
    }
    if (!ctx.query.code) throw new Error('Code Not Found.')

    const { access_token, scope: s } = await exchange({
      client_id,
      client_secret,
      redirect_uri,
      code: ctx.query.code,
      state,
    })
    const data = await getInfo(access_token)
    await finish(ctx, access_token, s, data, next)
  }

  app.use(async (ctx, next) => {
    if (ctx.path == path) {
      if (session) await session(ctx, next)
      await start(ctx, next)
    } else if (ctx.path.startsWith(`${path}/redirect`)) {
      if (session) await session(ctx, next)
      await redirect(ctx, next)
    } else return next()
  })
}

/**
 * Gets all available info
 */
const getInfo = async (token) => {
  return await query({
    token,
    path: 'user',
  })
}

/**
 * Request data from github API.
 * @param {Object} config Options for Query.
 * @param {string} config.token The access token with appropriate permissions.
 * @param {string} config.path The API endpoint.
 * @param {*} config.data The object containing data to query the API with.
 */
export const query = async (config) => {
  const {
    token,
    path,
    data,
  } = config
  const url = `https://api.github.com/${path}`
  const d = stringify(data)
  const res = await jqt(`${url}?${d}`, {
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/json',
      'User-Agent': '@idio/github http://github.com/idiocc/github',
    },
  })
  if (res.message) {
    throw new Error(res.message)
  }
  return res
}

const exchange = async ({
  code, client_id, client_secret, redirect_uri, state,
}) => {
  const data = {
    code,
    redirect_uri,
    client_id,
    client_secret,
    ...(state ? { state } : {}),
  }
  const { access_token, scope, token_type,
    error, error_description } = await jqt('https://github.com/login/oauth/access_token', {
    data,
    headers: {
      Accept: 'application/json',
    },
  })
  if (error) {
    const err = new Error(error_description)
    err.type = error
    throw err
  }
  return { access_token, scope, token_type }
}

const githubDialogUrl = ({
  redirect_uri,
  client_id,
  scope,
  state,
}) => {
  const s = stringify({
    client_id,
    redirect_uri,
    ...(state ? { state } : {}),
    ...(scope ? { scope } : {}),
  })
  return `https://www.github.com/login/oauth/authorize?${s}`
}

const getRedirect = ({ protocol, host }, path) => {
  const parts = [
    /\.ngrok\.io$/.test(host) ? 'https' : protocol,
    '://',
    host,
    path,
    '/redirect',
  ]
  const p = parts.join('')
  return p
}

/* documentary types/index.xml namespace */
/**
 * @typedef {import('@typedefs/goa').Middleware} _goa.Middleware
 * @typedef {import('@typedefs/goa').Context} _goa.Context
 * @typedef {import('@typedefs/goa').Application} _goa.Application
 * @typedef {_idio.GithubOAuthConfig} GithubOAuthConfig `＠record` Options for the program.
 * @typedef {Object} _idio.GithubOAuthConfig `＠record` Options for the program.
 * @prop {string} client_id The app's client id.
 * @prop {string} client_secret The app's client secret.
 * @prop {string} [path="/auth/github"] The server path to start the login flaw at and use for redirect (`${path}/redirect`). Default `/auth/github`.
 * @prop {string} [scope] The scope to ask permissions for. No scope by default.
 * @prop {_goa.Middleware} [session] The configured session middleware in case the `session` property is not globally available on the context.
 * @prop {(ctx: _goa.Context, token: string, scope: string, scope: _idio.GithubUser, next: function()) => !Promise} [finish="setSession; redirect;"] The function to complete the authentication that receives the token and the data about the user, such as name and id. The default function redirects to `/`. Default `setSession; redirect;`.
 * @prop {(ctx: _goa.Context, error: string, description: string, next: function()) => !Promise} [error="throw;"] The function to be called in case of error. If not specified, the middleware will throw an internal server error. Default `throw;`.
 */

/* documentary types/user.xml namespace */
/**
 * @typedef {_idio.GithubUser} GithubUser Public user information
 * @typedef {Object} _idio.GithubUser Public user information
 * @prop {string} login `octocat`
 * @prop {number} id 1
 * @prop {string} node_id MDQ6VXNlcjE=`
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
 * @prop {?string} email Publicly visible email address. `octocat＠github.com` or `null`.
 * @prop {boolean} hireable false
 * @prop {string} bio `There once was...`
 * @prop {number} public_repos 2
 * @prop {number} public_gists 1
 * @prop {number} followers 20
 * @prop {number} following 0
 * @prop {string} created_at `2008-01-14T04:33:35Z`
 * @prop {string} updated_at `2008-01-14T04:33:35Z`
 */

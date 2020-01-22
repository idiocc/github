import { jqt } from 'rqt'
import { stringify } from 'querystring'
import { defaultFinish } from './finish'

/**
 * @type {_idio.githubOAuth}
 */
function $github(app, config) {
  if (!config) throw new Error('Config with at least client_id and client_secret is required.')
  const {
    client_id = '',
    client_secret = '',
    path = '/auth/github',
    scope = '',
    error = (ctx, err, description) => {
      throw new Error(description)
    },
    finish = defaultFinish,
    session,
  } = config

  if (!client_id) {
    console.warn('[github] No client id - the dialog won\'t work.')
  }
  if (!client_secret) {
    console.warn('[github] No client secret - the redirect won\'t work.')
  }

  /**
   * @type {!_idio.Middleware}
   */
  const start = async (ctx) => {
    let state
    if (ctx.session) {
      state = Math.floor(Math.random() * 10000)
      ctx.session['githib-state'] = state
      await ctx.session.manuallyCommit()
    }
    const redirect_uri = getRedirect(ctx, path)
    const u = githubDialogUrl({
      redirect_uri,
      client_id,
      scope,
      state,
    })
    ctx.redirect(u)
  }

  /**
   * @type {!_idio.Middleware}
   */
  const redirect = async (ctx, next) => {
    const redirect_uri = getRedirect(ctx, path)
    let state
    if (ctx.session) {
      state = ctx.query['state']
      if (state != ctx.session['githib-state']) {
        throw new Error('The state is incorrect.')
      }
      ctx.session['githib-state'] = null
      await ctx.session.manuallyCommit()
    }
    if (ctx.query['error']) {
      const e = ctx.query['error']
      const ed = ctx.query['error_description']
      // closure bug
      // const { 'error': e, 'error_description': ed } = ctx.query
      await error(/** @type {!_goa.Context} */ (ctx), e, ed, next)
      return
    }
    const code = ctx.query['code']
    if (!code) throw new Error('Code Not Found.')

    const { access_token, scope: s } = await exchange({
      client_id,
      client_secret,
      redirect_uri,
      code,
      state,
    })
    const data = await getInfo(access_token)
    await finish(/** @type {!_goa.Context} */ (ctx), access_token, s, data, next)
  }

  /** @type {!_idio.Middleware} */
  const mw = async (ctx, next) => {
    if (ctx.path == path) {
      if (session) await session(ctx, next)
      await start(ctx, next)
    } else if (ctx.path.startsWith(`${path}/redirect`)) {
      if (session) await session(ctx, next)
      await redirect(ctx, next)
    } else return next()
  }
  app.use(/** @type {!_goa.Middleware} */ (mw))
}

export default $github

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
      'Authorization': `token ${token}`,
      'Accept': 'application/json',
      'User-Agent': '@idio/github http://github.com/idiocc/github',
    },
  })
  if (res['message']) {
    throw new Error(res['message'])
  }
  return res
}

const exchange = async ({
  code, client_id, client_secret, redirect_uri, state,
}) => {
  const data = {
    'code': code,
    'redirect_uri': redirect_uri,
    'client_id': client_id,
    'client_secret': client_secret,
    ...(state ? { 'state': state } : {}),
  }
  const { 'access_token': access_token, 'scope': scope,
    'token_type': token_type, 'error': error,
    'error_description': error_description,
  } = await jqt('https://github.com/login/oauth/access_token', {
    data,
    headers: {
      'Accept': 'application/json',
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
    'client_id': client_id,
    'redirect_uri': redirect_uri,
    ...(state ? { 'state': state } : {}),
    ...(scope ? { 'scope': scope } : {}),
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

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('@typedefs/idio').Middleware} _idio.Middleware
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('@typedefs/goa').Middleware} _goa.Middleware
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../')} _idio.githubOAuth
 */
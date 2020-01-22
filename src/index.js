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
    if (!ctx.session) throw new Error('Cannot start github middleware because session was not started.')

    state = Math.floor(Math.random() * 10000)
    ctx.session['githib-state'] = state
    await ctx.session.manuallyCommit()

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
    if (!ctx.session) throw new Error('Cannot finish github middleware because session was not started.')
    state = ctx.query['state']
    if (state != ctx.session['githib-state']) {
      throw new Error('The state is incorrect.')
    }
    ctx.session['githib-state'] = null
    // would have to compose if not committing manually
    await ctx.session.manuallyCommit()

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
    const p = [
      getInfo(access_token),
      ...(/user:email/.test(s) ? [getEmails(access_token)] : []),
    ]
    const [data, emails] = await Promise.all(p)
    if (emails) data.emails = emails
    await finish(/** @type {!_goa.Context} */ (ctx), access_token, s, data, next)
  }

  /** @type {!_idio.Middleware} */
  const mw = async (ctx, next) => {
    if (ctx.path == path) {
      if (session) await session(ctx, () => {})
      await start(ctx)
    } else if (ctx.path.startsWith(`${path}/redirect`)) {
      if (session) await session(ctx, () => {})
      await redirect(ctx, next)
    } else return next()
  }
  app.use(/** @type {!_goa.Middleware} */ (mw))
}

export default $github

/**
 * Gets all available info
 * @param {string} token
 */
const getInfo = async (token) => {
  const user = /** @type {!_idio.GithubUser} */ (await query({
    token,
    path: 'user',
  }))
  return user
}

/**
 * Gets available private emails.
 * @param {string} token
 */
const getEmails = async (token) => {
  const emails = /** @type {!Array<!_idio.GithubEmail>} */ (await query({
    token,
    path: 'user/emails',
  }))
  return emails
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

/**
 * Get the oauth token in exchange for access code.
 * @param {Object} params
 * @param {string} params.code
 * @param {string} params.client_id
 * @param {string} params.client_secret
 * @param {string} params.redirect_uri
 * @param {string} params.state
 */
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
  const {
    access_token,
    scope,
    token_type, error,
    error_description,
  } = /** @type {!_idio.GithubExchangeResponse} */ (await jqt('https://github.com/login/oauth/access_token', {
    data,
    headers: {
      'Accept': 'application/json',
    },
  }))
  if (error) {
    const err = new Error(error_description)
    err['type'] = error
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
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../types').GithubExchangeResponse} _idio.GithubExchangeResponse
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('..').GithubEmail} _idio.GithubEmail
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('..').GithubUser} _idio.GithubUser
 */
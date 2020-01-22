/* start example */
/**
 * @param {!_idio.Context} ctx
 * @param {string} token
 * @param {string} scope
 * @param {!_idio.GithubUser} user
 */
export const defaultFinish = async (ctx, token, scope, user, next) => {
  ctx.session['token'] = token
  ctx.session['scope'] = scope
  ctx.session['user'] = user
  await ctx.session.manuallyCommit()
  ctx.redirect('/')
}
/* end example */

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('@typedefs/idio').Context} _idio.Context
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../').GithubUser} _idio.GithubUser
 */
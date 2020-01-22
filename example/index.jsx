import { aqt } from 'rqt'
import dotenv from '@demimonde/dotenv'
import render from '@depack/render'
dotenv()
/* start example */
import github from '../src'
import idio from '@idio/idio'

const Server = async () => {
  const { url, app, router, middleware: {
    session,
  } } = await idio({
    session: {
      keys: [process.env.SESSION_KEY],
    },
  })

  router.get('/', session, (ctx) => {
    ctx.body = render(<html>
      <body>
        {ctx.session.user ?
          <span>Hello, {ctx.session.user}.{' '}
            <a href="/signout">Sign Out</a>
          </span> :
          <a href="/github">Sign In With GitHub</a>}
        <hr/>
        (c) Art Deco, 2020
      </body>
    </html>, { addDoctype: true })
  })
  router.get('/signout', session, (ctx) => {
    ctx.session = null
    ctx.redirect('/')
  })
  app.use(router.routes())

  github(app, {
    session,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    scope: 'user:email',
    error(ctx, error) {
      ctx.redirect(`/?error=${error}`)
    },
    path: '/github',
    async finish(ctx, token, scope, user, next) {
      console.log(user.name, user.login, user.company)
      ctx.session.user = user.login
      ctx.session.manuallyCommit()
      ctx.redirect('/')
    },
  })
  return { app, url }
}

/* end example */

(async () => {
  const { app, url } = await Server()
  console.log(url, '')
  const res = await aqt(`${url}/github`)
  console.log(res)
  const { headers: { location } } = res
  console.log('\n > Redirect to Dialog %s', location)
  if (!process.env.LIVE) await app.destroy()
})()
import { aqt } from 'rqt'
/* yarn example/ */
import dotenv from '@demimonde/dotenv'
import render from '@depack/render'
dotenv()
/* start example */
import github from '../src'
import idio from '@idio/idio'

const Server = async () => {
  const { url, app, middleware: {
    session,
  } } = await idio({
    session: {
      keys: [process.env.SESSION_KEY],
    },
    async index(ctx, next) {
      if (ctx.path != '/') return next()
      ctx.body = render(<html>
        <body>
          {ctx.session.user ? ctx.session.user :
            <a href="/auth/github">Sign In With GitHub</a>}
          <hr/>
          (c) Art Deco, 2019
        </body>
      </html>, { addDoctype: true })
    },
    async signout(ctx, next) {
      if (ctx.path != '/signout') return next()
      ctx.session = null
      ctx.redirect('/')
    },
  }, { port: 5003 })

  github(app, {
    session,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    scope: '',
    error(ctx, error) {
      ctx.redirect(`/?error=${error}`)
    },
    async finish(ctx, token, scope, user, next) {
      console.log(user.name, user.login, user.company)
      await next()
    },
  })
  return { app, url }
}

/* end example */

(async () => {
  const { app, url } = await Server()
  console.log(url, '')
  const res = await aqt(`${url}/auth/github`)
  console.log(res)
  const { headers: { location } } = res
  console.log('\n > Redirect to Dialog %s', location)
  if (!process.env.LIVE) await app.destroy()
})()
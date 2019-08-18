# @idio/github

[![npm version](https://badge.fury.io/js/%40idio%2Fgithub.svg)](https://npmjs.org/package/@idio/github)

`@idio/github` is The GitHub OAuth Flow For Idio Web Server.

```sh
yarn add -E @idio/github
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
- [`githubOAuth(app, config): void`](#githuboauthapp-_goaapplicationconfig-_idiogithuboauthconfig-void)
  * [`_idio.GithubOAuthConfig`](#type-_idiogithuboauthconfig)
- [Copyright](#copyright)

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/0.svg?sanitize=true">
</a></p>

## API

The package is available by importing its default function:

```js
import github from '@idio/github'
```

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/1.svg?sanitize=true">
</a></p>

## <code><ins>githubOAuth</ins>(</code><sub><br/>&nbsp;&nbsp;`app: _goa.Application,`<br/>&nbsp;&nbsp;`config: _idio.GithubOAuthConfig,`<br/></sub><code>): <i>void</i></code>
The GitHub OAuth Login Routes For The Idio Web Server.

 - <kbd><strong>app*</strong></kbd> <em>`_goa.Application`</em>: The Goa/Koa Application.
 - <kbd><strong>config*</strong></kbd> <em><code><a href="#type-_idiogithuboauthconfig" title="Options for the program.">_idio.GithubOAuthConfig</a></code></em>: Options for the oauth.

<strong><a name="type-_idiogithuboauthconfig">`_idio.GithubOAuthConfig`</a></strong>: Options for the program.
<table>
 <thead><tr>
  <th>Name</th>
  <th>Type &amp; Description</th>
  <th>Default</th>
 </tr></thead>
 <tr>
  <td rowSpan="3" align="center"><strong>client_id*</strong></td>
  <td><em>string</em></td>
  <td rowSpan="3">-</td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   The app's client id.
  </td>
 </tr>
 <tr>
  <td rowSpan="3" align="center"><strong>client_secret*</strong></td>
  <td><em>string</em></td>
  <td rowSpan="3">-</td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   The app's client secret.
  </td>
 </tr>
 <tr>
  <td rowSpan="3" align="center">path</td>
  <td><em>string</em></td>
  <td rowSpan="3"><code>/auth/github</code></td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   The server path to start the login flaw at and use for redirect (<code>${path}/redirect</code>).
  </td>
 </tr>
 <tr>
  <td rowSpan="3" align="center">scope</td>
  <td><em>string</em></td>
  <td rowSpan="3">-</td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   The scope to ask permissions for. No scope by default.
  </td>
 </tr>
 <tr>
  <td rowSpan="3" align="center">session</td>
  <td><em>Middleware</em></td>
  <td rowSpan="3">-</td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   The configured session middleware in case the <code>session</code> property is not globally available on the context.
  </td>
 </tr>
 <tr>
  <td rowSpan="3" align="center">finish</td>
  <td colSpan="2"><em>(ctx: _goa.Context, token: string, scope: string, next: function()) => !Promise</em></td>
 </tr>
 <tr></tr>
 <tr>
  <td colSpan="2">
   The function to complete the authentication that receives the token and the data about the user, such as name and id. The default function redirects to <code>/</code>.<br/>
   <kbd><strong>ctx*</strong></kbd> <em><code>_goa.Context</code></em>: The app context.<br/>
   <kbd><strong>token*</strong></kbd> <em><code>string</code></em>: The exchanged token.<br/>
   <kbd><strong>scope*</strong></kbd> <em><code>string</code></em>: The scopes which the user authorised the app to access.<br/>
   <kbd><strong>next*</strong></kbd> <em><code>function()</code></em>
  </td>
 </tr>
 <tr>
  <td rowSpan="3" align="center">error</td>
  <td colSpan="2"><em>(ctx: _goa.Context, error: string, description: string, next: function()) => !Promise</em></td>
 </tr>
 <tr></tr>
 <tr>
  <td colSpan="2">
   The function to be called in case of error. If not specified, the middleware will throw an internal server error.<br/>
   <kbd><strong>ctx*</strong></kbd> <em><code>_goa.Context</code></em>: The app context.<br/>
   <kbd><strong>error*</strong></kbd> <em><code>string</code></em>: The error type.<br/>
   <kbd><strong>description*</strong></kbd> <em><code>string</code></em>: The explaination of the error.<br/>
   <kbd><strong>next*</strong></kbd> <em><code>function()</code></em>
  </td>
 </tr>
</table>

```jsx
import github from '@idio/github'
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
      await next()
    },
  })
  return { app, url }
}
```
```
[+] CLIENT_ID [+] CLIENT_SECRET [+] SESSION_KEY
```

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/2.svg?sanitize=true">
</a></p>

## Copyright

(c) [Idio][1] 2019

[1]: https://idio.cc

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/-1.svg?sanitize=true">
</a></p>
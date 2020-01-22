# @idio/github

[![npm version](https://badge.fury.io/js/%40idio%2Fgithub.svg)](https://www.npmjs.com/package/@idio/github)

`@idio/github` is The GitHub OAuth Flow For the [Idio Web Server](https://github.com/idiocc/idio).

```sh
yarn add @idio/github
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
- [`githubOAuth(app, config): void`](#githuboauthapp-_goaapplicationconfig-githuboauthconfig-void)
  * [`GithubOAuthConfig`](#type-githuboauthconfig)
- [GithubUser](#githubuser)
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

## <code><ins>githubOAuth</ins>(</code><sub><br/>&nbsp;&nbsp;`app: _goa.Application,`<br/>&nbsp;&nbsp;`config: GithubOAuthConfig,`<br/></sub><code>): <i>void</i></code>
The GitHub OAuth Login Routes For The Idio Web Server.

 - <kbd><strong>app*</strong></kbd> <em><code><a href="https://github.com/idiocc/goa/wiki/Application#type-_goaapplication" title="The application interface.">_goa.Application</a></code></em>: The Goa/Koa Application.
 - <kbd><strong>config*</strong></kbd> <em><code><a href="#type-githuboauthconfig" title="Options for the program.">GithubOAuthConfig</a></code></em>: Options for the oauth.

__<a name="type-githuboauthconfig">`GithubOAuthConfig`</a>__: Options for the program.
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
  <td><em><a href="https://github.com/idiocc/goa/wiki/Application#type-_goamiddleware" title="The function to handle requests which can be installed with the .use method.">_goa.Middleware</a></em></td>
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
  <td colSpan="2"><em>(ctx: <a href="https://github.com/idiocc/goa/wiki/Context#type-_goacontext" title="The context object for each request.">_goa.Context</a>, token: string, scope: string, user: <a href="#type-githubuser" title="Public user information">GithubUser</a>, next: function()) => !Promise</em></td>
 </tr>
 <tr></tr>
 <tr>
  <td colSpan="2">
   The function to complete the authentication that receives the token and the data about the user, such as name and id. The default function redirects to <code>/</code>.<br/>
   <kbd><strong>ctx*</strong></kbd> <em><code><a href="https://github.com/idiocc/goa/wiki/Context#type-_goacontext" title="The context object for each request.">_goa.Context</a></code></em>: The app context.<br/>
   <kbd><strong>token*</strong></kbd> <em><code>string</code></em>: The exchanged token.<br/>
   <kbd><strong>scope*</strong></kbd> <em><code>string</code></em>: The scopes which the user authorised the app to access.<br/>
   <kbd><strong>user*</strong></kbd> <em><code><a href="#type-githubuser" title="Public user information">GithubUser</a></code></em>: The scopes which the user authorised the app to access.<br/>
   <kbd><strong>next*</strong></kbd> <em><code>function()</code></em>: Calls next middleware.
  </td>
 </tr>
 <tr>
  <td rowSpan="3" align="center">error</td>
  <td colSpan="2"><em>(ctx: <a href="https://github.com/idiocc/goa/wiki/Context#type-_goacontext" title="The context object for each request.">_goa.Context</a>, error: string, description: string, next: function()) => !Promise</em></td>
 </tr>
 <tr></tr>
 <tr>
  <td colSpan="2">
   The function to be called in case of error. If not specified, the middleware will throw an internal server error.<br/>
   <kbd><strong>ctx*</strong></kbd> <em><code><a href="https://github.com/idiocc/goa/wiki/Context#type-_goacontext" title="The context object for each request.">_goa.Context</a></code></em>: The app context.<br/>
   <kbd><strong>error*</strong></kbd> <em><code>string</code></em>: The error type.<br/>
   <kbd><strong>description*</strong></kbd> <em><code>string</code></em>: The explaination of the error.<br/>
   <kbd><strong>next*</strong></kbd> <em><code>function()</code></em>: Calls next middleware.
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
      console.log(user.name, user.login, user.company)
      await next()
    },
  })
  return { app, url }
}
```
```
[+] CLIENT_ID [+] CLIENT_SECRET [+] SESSION_KEY 
http://localhost:5003 
{ body: 'Redirecting to <a href="https://www.github.com/login/oauth/authorize?client_id=f0a8762e7329780e85de&amp;redirect_uri=http%3A%2F%2Flocalhost%3A5003%2Fauth%2Fgithub%2Fredirect&amp;state=8812">https://www.github.com/login/oauth/authorize?client_id=f0a8762e7329780e85de&amp;redirect_uri=http%3A%2F%2Flocalhost%3A5003%2Fauth%2Fgithub%2Fredirect&amp;state=8812</a>.',
  headers: 
   { 'set-cookie': 
      [ 'koa:sess=eyJzdGF0ZSI6ODgxMiwiX2V4cGlyZSI6MTU3OTc3NzI4Mjg1NiwiX21heEFnZSI6ODY0MDAwMDB9; path=/; expires=Thu, 23 Jan 2020 11:01:22 GMT; httponly',
        'koa:sess.sig=evlz5iw0Lpzt0Sz0wVtBXRTe77c; path=/; expires=Thu, 23 Jan 2020 11:01:22 GMT; httponly' ],
     location: 'https://www.github.com/login/oauth/authorize?client_id=f0a8762e7329780e85de&redirect_uri=http%3A%2F%2Flocalhost%3A5003%2Fauth%2Fgithub%2Fredirect&state=8812',
     'content-type': 'text/html; charset=utf-8',
     'content-length': '359',
     date: 'Wed, 22 Jan 2020 11:01:22 GMT',
     connection: 'close' },
  statusCode: 302,
  statusMessage: 'Found' }

 > Redirect to Dialog https://www.github.com/login/oauth/authorize?client_id=f0a8762e7329780e85de&redirect_uri=http%3A%2F%2Flocalhost%3A5003%2Fauth%2Fgithub%2Fredirect&state=8812
```

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/2.svg?sanitize=true">
</a></p>

## GithubUser

If authorisation was successful, the server will make a request to GitHub API at `/user` path with the token, to get user's public info. This information can then be accessed in the `finish` function passed in the config.

__<a name="type-githubuser">`GithubUser`</a>__: Public user information
<table>
 <thead><tr>
  <th>Name</th>
  <th>Type &amp; Description</th>
 </tr></thead>
 <tr>
  <td rowSpan="3" align="center"><strong>login*</strong></td>
  <td><em>string</em></td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   <code>octocat</code>
  </td>
 </tr>
 <tr>
  <td rowSpan="3" align="center"><strong>id*</strong></td>
  <td><em>number</em></td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   1
  </td>
 </tr>
 <tr>
  <td rowSpan="3" align="center"><strong>node_id*</strong></td>
  <td><em>string</em></td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   <code>MDQ6VXNlcjE=</code>
  </td>
 </tr>
 <tr>
  <td rowSpan="3" align="center"><strong>avatar_url*</strong></td>
  <td><em>string</em></td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   <code>https://github.com/images/error/octocat_happy.gif</code>
  </td>
 </tr>
 <tr>
  <td rowSpan="3" align="center"><strong>gravatar_id*</strong></td>
  <td><em>string</em></td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   <code></code>
  </td>
 </tr>
 <tr>
  <td rowSpan="3" align="center"><strong>url*</strong></td>
  <td><em>string</em></td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   <code>https://api.github.com/users/octocat</code>
  </td>
 </tr>
 <tr>
  <td rowSpan="3" align="center"><strong>html_url*</strong></td>
  <td><em>string</em></td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   <code>https://github.com/octocat</code>
  </td>
 </tr>
 <tr>
  <td rowSpan="3" align="center"><strong>followers_url*</strong></td>
  <td><em>string</em></td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   <code>https://api.github.com/users/octocat/followers</code>
  </td>
 </tr>
 <tr>
  <td rowSpan="3" align="center"><strong>following_url*</strong></td>
  <td><em>string</em></td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   <code>https://api.github.com/users/octocat/following{/other_user}</code>
  </td>
 </tr>
 <tr>
  <td rowSpan="3" align="center"><strong>gists_url*</strong></td>
  <td><em>string</em></td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   <code>https://api.github.com/users/octocat/gists{/gist_id}</code>
  </td>
 </tr>
 <tr>
  <td rowSpan="3" align="center"><strong>starred_url*</strong></td>
  <td><em>string</em></td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   <code>https://api.github.com/users/octocat/starred{/owner}{/repo}</code>
  </td>
 </tr>
 <tr>
  <td rowSpan="3" align="center"><strong>subscriptions_url*</strong></td>
  <td><em>string</em></td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   <code>https://api.github.com/users/octocat/subscriptions</code>
  </td>
 </tr>
 <tr>
  <td rowSpan="3" align="center"><strong>organizations_url*</strong></td>
  <td><em>string</em></td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   <code>https://api.github.com/users/octocat/orgs</code>
  </td>
 </tr>
 <tr>
  <td rowSpan="3" align="center"><strong>repos_url*</strong></td>
  <td><em>string</em></td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   <code>https://api.github.com/users/octocat/repos</code>
  </td>
 </tr>
 <tr>
  <td rowSpan="3" align="center"><strong>events_url*</strong></td>
  <td><em>string</em></td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   <code>https://api.github.com/users/octocat/events{/privacy}</code>
  </td>
 </tr>
 <tr>
  <td rowSpan="3" align="center"><strong>received_events_url*</strong></td>
  <td><em>string</em></td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   <code>https://api.github.com/users/octocat/received_events</code>
  </td>
 </tr>
 <tr>
  <td rowSpan="3" align="center"><strong>type*</strong></td>
  <td><em>string</em></td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   <code>User</code>
  </td>
 </tr>
 <tr>
  <td rowSpan="3" align="center"><strong>site_admin*</strong></td>
  <td><em>boolean</em></td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   false
  </td>
 </tr>
 <tr>
  <td rowSpan="3" align="center"><strong>name*</strong></td>
  <td><em>string</em></td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   <code>monalisa octocat</code>
  </td>
 </tr>
 <tr>
  <td rowSpan="3" align="center"><strong>company*</strong></td>
  <td><em>string</em></td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   <code>GitHub</code>
  </td>
 </tr>
 <tr>
  <td rowSpan="3" align="center"><strong>blog*</strong></td>
  <td><em>string</em></td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   <code>https://github.com/blog</code>
  </td>
 </tr>
 <tr>
  <td rowSpan="3" align="center"><strong>location*</strong></td>
  <td><em>string</em></td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   <code>San Francisco</code>
  </td>
 </tr>
 <tr>
  <td rowSpan="3" align="center"><strong>email*</strong></td>
  <td><em>?string</em></td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   Publicly visible email address. <code>octocat＠github.com</code> or <code>null</code>.
  </td>
 </tr>
 <tr>
  <td rowSpan="3" align="center"><strong>hireable*</strong></td>
  <td><em>boolean</em></td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   false
  </td>
 </tr>
 <tr>
  <td rowSpan="3" align="center"><strong>bio*</strong></td>
  <td><em>string</em></td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   <code>There once was...</code>
  </td>
 </tr>
 <tr>
  <td rowSpan="3" align="center"><strong>public_repos*</strong></td>
  <td><em>number</em></td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   2
  </td>
 </tr>
 <tr>
  <td rowSpan="3" align="center"><strong>public_gists*</strong></td>
  <td><em>number</em></td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   1
  </td>
 </tr>
 <tr>
  <td rowSpan="3" align="center"><strong>followers*</strong></td>
  <td><em>number</em></td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   20
  </td>
 </tr>
 <tr>
  <td rowSpan="3" align="center"><strong>following*</strong></td>
  <td><em>number</em></td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   0
  </td>
 </tr>
 <tr>
  <td rowSpan="3" align="center"><strong>created_at*</strong></td>
  <td><em>string</em></td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   <code>2008-01-14T04:33:35Z</code>
  </td>
 </tr>
 <tr>
  <td rowSpan="3" align="center"><strong>updated_at*</strong></td>
  <td><em>string</em></td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   <code>2008-01-14T04:33:35Z</code>
  </td>
 </tr>
</table>

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/3.svg?sanitize=true">
</a></p>

## Copyright

(c) [Idio][1] 2019

[1]: https://idio.cc

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/-1.svg?sanitize=true">
</a></p>
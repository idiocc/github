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
  * [`GithubEmail`](#type-githubemail)
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


## <code><ins>githubOAuth</ins>(</code><sub><br/>&nbsp;&nbsp;`app: _goa.Application,`<br/>&nbsp;&nbsp;`config: !GithubOAuthConfig,`<br/></sub><code>): <i>void</i></code>
The GitHub OAuth Login Routes For The Idio Web Server. Two routes will be configured: one to redirect to GitHub to start authentication, and one to handle the callback from GitHub. They will be installed on the app automatically.

 - <kbd><strong>app*</strong></kbd> <em><code><a href="https://github.com/idiocc/goa/wiki/Application#type-application" title="The application interface.">_goa.Application</a></code></em>: The Goa/Koa Application.
 - <kbd><strong>config*</strong></kbd> <em><code><a href="#type-githuboauthconfig" title="Options for the program.">!GithubOAuthConfig</a></code></em>: Options for the middleware.

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
   The server path to start the login flaw at.
  </td>
 </tr>
 <tr>
  <td rowSpan="3" align="center">redirectPath</td>
  <td><em>string</em></td>
  <td rowSpan="3">-</td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   The redirect path (must start with <code>/</code>). If not specified, <code>${path}/redirect</code> will be used.
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
  <td><em><a href="https://github.com/idiocc/goa/wiki/Application#middlewarectx-contextnext-function-promisevoid" title="The function to handle requests which can be installed with the `.use` method.">!_goa.Middleware</a></em></td>
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
  <td colSpan="2"><em>(ctx: <a href="https://github.com/idiocc/idio/wiki/Home#type-context" title="The extension to the standard Goa context with properties set by middleware.">Context</a>, token: string, scope: string, user: <a href="#type-githubuser" title="Public user information">!GithubUser</a>, next: function()) => !Promise</em></td>
 </tr>
 <tr></tr>
 <tr>
  <td colSpan="2">
   The function to complete the authentication that receives the token and the data about the user, such as name and id. The default function redirects to <code>/</code>.<br/>
   <kbd><strong>ctx*</strong></kbd> <em><code><a href="https://github.com/idiocc/idio/wiki/Home#type-context" title="The extension to the standard Goa context with properties set by middleware.">Context</a></code></em>: The app context.<br/>
   <kbd><strong>token*</strong></kbd> <em><code>string</code></em>: The exchanged token.<br/>
   <kbd><strong>scope*</strong></kbd> <em><code>string</code></em>: The scopes which the user authorised the app to access.<br/>
   <kbd><strong>user*</strong></kbd> <em><code><a href="#type-githubuser" title="Public user information">!GithubUser</a></code></em>: The scopes which the user authorised the app to access.<br/>
   <kbd><strong>next*</strong></kbd> <em><code>function()</code></em>: Calls next middleware.
  </td>
 </tr>
 <tr>
  <td rowSpan="3" align="center">error</td>
  <td colSpan="2"><em>(ctx: <a href="https://github.com/idiocc/idio/wiki/Home#type-context" title="The extension to the standard Goa context with properties set by middleware.">!Context</a>, error: string, description: string, next: function()) => !Promise</em></td>
 </tr>
 <tr></tr>
 <tr>
  <td colSpan="2">
   The function to be called in case of error. If not specified, the middleware will throw an internal server error.<br/>
   <kbd><strong>ctx*</strong></kbd> <em><code><a href="https://github.com/idiocc/idio/wiki/Home#type-context" title="The extension to the standard Goa context with properties set by middleware.">!Context</a></code></em>: The app context.<br/>
   <kbd><strong>error*</strong></kbd> <em><code>string</code></em>: The error type.<br/>
   <kbd><strong>description*</strong></kbd> <em><code>string</code></em>: The explanation of the error.<br/>
   <kbd><strong>next*</strong></kbd> <em><code>function()</code></em>: Calls next middleware.
  </td>
 </tr>
</table>

```jsx
import github from '..'
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
```
```
[+] CLIENT_ID [+] CLIENT_SECRET [+] SESSION_KEY 
http://localhost:5000 
{
  body: 'Redirecting to <a href="https://www.github.com/login/oauth/authorize?client_id=f0a8762e7329780e85de&amp;redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fgithub%2Fredirect&amp;state=8275&amp;scope=user%3Aemail">https://www.github.com/login/oauth/authorize?client_id=f0a8762e7329780e85de&amp;redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fgithub%2Fredirect&amp;state=8275&amp;scope=user%3Aemail</a>.',
  headers: {
    'set-cookie': [
      'koa:sess=eyJnaXRoaWItc3RhdGUiOjgyNzUsIl9leHBpcmUiOjE1ODI4OTY0NTk1OTIsIl9tYXhBZ2UiOjg2NDAwMDAwfQ==; path=/; expires=Fri, 28 Feb 2020 13:27:39 GMT; httponly',
      'koa:sess.sig=mPZuFR0kFz8XFkQRJeuTm3VnMfw; path=/; expires=Fri, 28 Feb 2020 13:27:39 GMT; httponly'
    ],
    location: 'https://www.github.com/login/oauth/authorize?client_id=f0a8762e7329780e85de&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fgithub%2Fredirect&state=8275&scope=user%3Aemail',
    'content-type': 'text/html; charset=utf-8',
    'content-length': '391',
    date: 'Thu, 27 Feb 2020 13:27:39 GMT',
    connection: 'close'
  },
  statusCode: 302,
  statusMessage: 'Found'
}

 > Redirect to Dialog https://www.github.com/login/oauth/authorize?client_id=f0a8762e7329780e85de&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fgithub%2Fredirect&state=8275&scope=user%3Aemail
```

If authorisation was successful, the server will make a request to GitHub API at `/user` path with the token, to get user's public info. This information can then be accessed in the `finish` function passed in the config.

If the `user:email` scope was requested, emails returned from the `/user/emails` API path will also be populated in the `emails` field. If the user's main email is private, it won't be visible in the `email` field, so that this scope should be requested if the email address needs to be collected.

__<a name="type-githubemail">`GithubEmail`</a>__
<table>
 <thead><tr>
  <th>Name</th>
  <th>Type &amp; Description</th>
 </tr></thead>
 <tr>
  <td rowSpan="3" align="center"><strong>email*</strong></td>
  <td><em>string</em></td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   The email address.
  </td>
 </tr>
 <tr>
  <td rowSpan="3" align="center"><strong>verified*</strong></td>
  <td><em>boolean</em></td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   Whether the email was verified.
  </td>
 </tr>
 <tr>
  <td rowSpan="3" align="center"><strong>primary*</strong></td>
  <td><em>boolean</em></td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   Whether the email is primary.
  </td>
 </tr>
 <tr>
  <td rowSpan="3" align="center"><strong>visibility*</strong></td>
  <td><em>string</em></td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   Either <code>public</code> or <code>private</code>.
  </td>
 </tr>
</table>


__<a name="type-githubuser">`GithubUser`</a>__: Public user information
<table>
 <thead><tr>
  <th>Name</th>
  <th>Type &amp; Description</th>
 </tr></thead>
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
  <td rowSpan="3" align="center"><strong>emails*</strong></td>
  <td><em>!Array&lt;<a href="#type-githubemail">!GithubEmail</a>&gt;</em></td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   All email addresses accessible if the <code>user:email</code> scope was requested.
  </td>
 </tr>
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

A custom implementation of the  `finish` function can be provided, only that `session` must be manually committed after being set.

```js
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
```

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/2.svg?sanitize=true">
</a></p>

## Copyright

GNU Affero General Public License v3.0

Affero GPL means that you're not allowed to use this middleware on the web unless you release the source code for your application. This is a restrictive license which has the purpose of defending Open Source work and its creators.

Please refer to the [Idio license agreement](https://github.com/idiocc/idio#copyright--license) for more info on dual-licensing. You're allowed to use this middleware without disclosing the source code if you sign up on the [neoluddite.dev](https://neoluddite.dev) package reward scheme.

<table>
  <tr>
    <th>
      <a href="https://www.artd.eco">
        <img width="100" src="https://raw.githubusercontent.com/wrote/wrote/master/images/artdeco.png"
          alt="Art Deco">
      </a>
    </th>
    <th>© <a href="https://www.artd.eco">Art Deco™</a> for <a href="https://idio.cc">Idio</a> 2020</th>
    <th>
      <a href="https://idio.cc">
        <img src="https://avatars3.githubusercontent.com/u/40834161?s=100" width="100" alt="Idio">
      </a>
    </th>
  </tr>
</table>

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/-1.svg?sanitize=true">
</a></p>
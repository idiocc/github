## API

The package is available by importing its default function:

```js
import github from '@idio/github'
```

%~%

<include-typedefs>@typedefs/goa</include-typedefs>
<include-typedefs>@typedefs/idio</include-typedefs>

<typedef noArgTypesInToc>types/api.xml</typedef>

<typedef narrow>types/index.xml</typedef>

%EXAMPLE: example, ../src => @idio/github%
%FORK example%

If authorisation was successful, the server will make a request to GitHub API at `/user` path with the token, to get user's public info. This information can then be accessed in the `finish` function passed in the config.

If the `user:email` scope was requested, emails returned from the `/user/emails` API path will also be populated in the `emails` field. If the user's main email is private, it won't be visible in the `email` field, so that this scope should be requested if the email address needs to be collected.

<typedef narrow>types/user.xml</typedef>

A custom implementation of the  `finish` function can be provided, only that `session` must be manually committed after being set.

%EXAMPLE: src/finish%

%~%
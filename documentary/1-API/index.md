## API

The package is available by importing its default function:

```js
import github from '@idio/github'
```

%~%

<typedef noArgTypesInToc>types/api.xml</typedef>

<typedef narrow>types/index.xml</typedef>

%EXAMPLE: example, ../src => @idio/github%
%FORK example%

%~%

## GithubUser

If authorisation was successful, the server will make a request to GitHub API at `/user` path with the token, to get user's public info. This information can then be accessed in the `finish` function passed in the config.

<typedef narrow>types/user.xml</typedef>

%~%
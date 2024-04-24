# [oPoint](https://opoint.com/) realtime news feed API client

[Search](https://api-docs.opoint.com/guides/getting-started-with-searching)
Stored search
Safefeed

Following this pattern:
https://www.yieldcode.blog/post/npm-workspaces/
https://stackoverflow.com/questions/72055371/npm-workspaces-typescript-unable-to-find-local-modules

### Add a new package
```
$ npm init --workspace packages/types --scope @opoint -y
$ ls -la node_modules/@opoint/
```

### Require a new package
```bash
$ npm install @opoint/types --workspace ./packages/storedsearch
$ cat packages/storedsearch/package.json | grep -C1 opoint
$ npm ls
```

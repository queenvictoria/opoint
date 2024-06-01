# [oPoint](https://opoint.com/) realtime news feed API client

* (TODO: Not implemented) [Search](https://api-docs.opoint.com/guides/getting-started-with-searching)
* [Stored search](https://api-docs.opoint.com/references/api#storedsearch)
* (TODO: Not implemented) [Safefeed](https://api-docs.opoint.com/references/safefeed)

## Installation
```bash
$ npm install --save @opoint/storedsearch
$ npm install --save-dev @opoint/types
```

## Using stored search

See `tests/stored-search.test.ts` and `@opoint/types` for more options.

```ts
import { StoredSearch } from '@opoint/storedsearch'
// Pass your API key to the constructor
const api = new StoredSearch({ api_key: process.env.OPOINT_API_KEY })

// ...
// Add a new stored search
const props: StoredSearchAddProps = { search: "Anthropic"}
const res = await api.add(props)

// List current stored searches
const res = await api.list()
const body = res.data as StoredSearchListResponse

// Retrieve a stored search
const params: StoredSearchRetrieveProps = {
  id: 0, // some stored search id
}
const res = await api.retrieve(params)
const body = res.data as StoredSearchRetrieveResponse

// Retrieve data from all stored searches
const params: StoredSearchFeedProps = {
  from: 0,      // A Unix timestamp (in seconds since epoc)
  format: 'json' as FormatEnum, // or `xml`
  num_art: 50,  // Number of articles to return
}

// Retrieve data enriched by textrazor
const params: StoredSearchFeedProps = {
  from: 0,      // A Unix timestamp (in seconds since epoc)
  format: 'json' as FormatEnum, // or `xml`
  num_art: 50,  // Number of articles to return
  features: {
    entities: true, // Return entites found in articles
    topics: true,   // Return topics found in articles
    // all: true    // Return topics and entities
  }
}

const res = await api.feed(params)
const body = res.data as StoredSearchFeedResponse
// A list of documents since `from`
const documents: Array<DocumentProps> = body.searchresult.document

// (Not implemented) Retrieve data from all stored searchs filted by group

// Update a stored search
const params: StoredSearchUpdateProps = {
  id: 0, // some stored search id
  search: "Anthropic Claude"
}
const res = await api.update(params)
const body = res.data as StoredSearchUpdateResponse

// Delete a stored search
const props: StoredSearchDeleteProps = {
  id: searches[0]?.id
}
const res = await api.delete(props)
// Returns res.response.status = 204 no content
```

## Contributing

Uses patterns for a typescript monorepo found here:
https://blog.frankdejonge.nl/setting-up-a-typescript-mono-repo-for-scoped-packages/

### Tests

```bash
$ npm install --dev
$ cp env.sample .env
# Update .env with an oPoint API key.
$ source .env
$ npm run tests
```

### Add a new package
_Following this pattern:_
https://www.yieldcode.blog/post/npm-workspaces/
https://stackoverflow.com/questions/72055371/npm-workspaces-typescript-unable-to-find-local-modules

```bash
$ npm init --workspace packages/types --scope @opoint -y
$ ls -la node_modules/@opoint/
```

### Require a new package

```bash
$ npm install @opoint/types --workspace ./packages/storedsearch
$ cat packages/storedsearch/package.json | grep -C1 opoint
$ npm ls
```

### Publishing

```bash
$ npm run build -ws
$ npm version patch -ws --verbose
# git commit and push
# Can't publish them all at once because of interdependcies
$ npm publish --access public -ws --verbose
# $ npm publish --access public -w @opoint/types
# $ npm publish --access public -w @opoint/core
# $ npm publish --access public -w @opoint/storedsearch
```

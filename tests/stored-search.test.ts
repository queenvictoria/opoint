import { StoredSearch } from '@opoint/storedsearch'

import {
  type StoredSearchFeedProps,
  type StoredSearchAddProps,
  type StoredSearchRetrieveProps,
  type StoredSearchUpdateProps,
  type StoredSearchDeleteProps,
  type StoredSearchListResponse,
  type FormatEnum,
  type StoredSearchFeedResponse,
  type StoredSearchRetrieveResponse,
  type StoredSearchUpdateResponse
} from '@opoint/types'


import { expect, test } from '@jest/globals'
import { DocumentProps } from '@opoint/types/src'

const SECONDS = 1000
const TEST_ID = 100418137
let searches: StoredSearchListResponse = []

test('API key present', async () => {
  expect(process.env.OPOINT_API_KEY).not.toBe(undefined)
})

if ( !process.env.OPOINT_API_KEY ) throw new Error("Please add OPOINT_API_KEY to your environment.")
const api = new StoredSearch({ api_key: process.env.OPOINT_API_KEY })

test('List stored searches', async () => {
  const res = await api.list()

  expect(res.response).toHaveProperty('status')
  expect(res.response.status).toBe(200)

  const body = res.data as StoredSearchListResponse
  expect(typeof body).toEqual("object")
  expect(Array.isArray(body)).toEqual(true)
  // expect(body).toBe(expect.any(Array))
  // expect(body).toBeInstanceOf(Array)

  expect(body.length).toBeGreaterThan(-1)

  // Store the searches
  searches = body
}, 20 * SECONDS)

test('Add stored search', async () => {
  const props: StoredSearchAddProps = {
    search: "Anthropic",
    // access_group: null,      // Not null
    // max_age: null,           // Not null
    // get_old_articles: true,  // Can't get old articles. API restriction?
    get_old_articles: false,
    use_syndicates: false
  }
  const res = await api.add(props)

  expect(res.response).toHaveProperty('status')
  expect(res.response.status).not.toBe(400) // Status: Bad request
  expect(res.response.status).toBe(201)

  const body = res.data as StoredSearchRetrieveResponse
  expect(typeof body).toEqual('object')
  expect(body).toHaveProperty('id')
  expect(typeof body.id).toEqual('number')

  expect(body).toHaveProperty('max_age')
  expect(typeof body.max_age).toEqual('number')

  expect(body).toHaveProperty('search')
  expect(typeof body.search).toEqual('string')
  expect(body.search).toEqual(props.search)

  expect(body).toHaveProperty('get_old_articles')
  expect(typeof body.get_old_articles).toEqual('boolean')
  expect(body.get_old_articles).toEqual(props.get_old_articles)

  // Put the result into searches so we can delete it later.
  searches = [body]
}, 15 * SECONDS)

let stored_search: StoredSearchRetrieveResponse
test('Retrieve a stored search', async () => {
  const params: StoredSearchRetrieveProps = {
    id: TEST_ID
  }
  const res = await api.retrieve(params)
  const body = res.data as StoredSearchRetrieveResponse

  expect(res.response).toHaveProperty('status')
  expect(res.response.status).toBe(200)

  expect(typeof body).toEqual('object')
  expect(body).toHaveProperty('id')
  expect(typeof body.id).toEqual('number')
  stored_search = body
})

test('Update stored search', async () => {
  const { id, search } = stored_search
  const params: StoredSearchUpdateProps = {
    id,
    search: search + " Claude"
  }
  const res = await api.update(params)
  const body = res.data as StoredSearchUpdateResponse

  expect(res.response).toHaveProperty('status')
  expect(res.response.status).toBe(200)

  expect(typeof body).toEqual('object')
  expect(body).toHaveProperty('id')
  expect(typeof body.id).toEqual('number')
  expect(body.id).toEqual(id)
  expect(body.search).toEqual(search + " Claude")
})

/* https://stackoverflow.com/questions/62680040/testing-function-to-throw-an-error-in-jest */
test('Retrieving feed articles should fail without a from parameter', async () => {
  expect(() => api.feed()).toThrow(Error)
})

// Don't nest tests
let documents: Array<DocumentProps> = []
test('Retrieve feed articles from all stored searches', async () => {
  // const from = Math.round((new Date().getTime() - (1*60*60*SECONDS))/1000)
  // @FIX Correctly calculate `from` value.
  const from = 1714033515
  const params: StoredSearchFeedProps = {
    from,
    format: 'json' as FormatEnum,
    num_art: 50,
  }

  const res = await api.feed(params)
  const body = res.data as StoredSearchFeedResponse

  expect(res.response).toHaveProperty('status')
  expect(res.response.status).toBe(200)

  expect(body).toHaveProperty('searchresult')
  expect(typeof body.searchresult).toEqual('object')
  expect(body.searchresult).toHaveProperty('first_timestamp')
  expect(body.searchresult).toHaveProperty('last_timestamp')
  expect(body.searchresult).toHaveProperty('documents')

  expect(typeof body.searchresult.documents).toEqual('number')
  expect(body.searchresult.documents).toBeGreaterThan(0)
  expect(body.searchresult).toHaveProperty('document')
  expect(Array.isArray(body.searchresult.document)).toEqual(true)

  if ( body.searchresult.document ) documents = body.searchresult.document

  expect(documents.length).toBeGreaterThan(0)
  if (params.num_art)
    expect(documents.length).toBeLessThan(params.num_art)
})

// Cant nest tests in Jest
test('Retrieved feed articles', () => {
  documents.forEach((doc: DocumentProps) => {
    expect(typeof doc).toEqual('object')
    expect(doc).toHaveProperty('id_article')
    expect(doc).toHaveProperty('countrycode')
    expect(doc).toHaveProperty('countryname')
    expect(doc).toHaveProperty('unix_timestamp')
    expect(doc).toHaveProperty('stimestamp')
    expect(doc).toHaveProperty('word_count')
    expect(doc).toHaveProperty('header')
    expect(doc).toHaveProperty('summary')
    expect(doc).toHaveProperty('body')
    expect(doc).toHaveProperty('url')
    expect(doc).toHaveProperty('orig_url')
    expect(doc).toHaveProperty('stored_search_id')
  })
})

test('Delete stored search', async () => {
  const props: StoredSearchDeleteProps = {
    id: searches[0]?.id
  }
  const res = await api.delete(props)

  expect(res.response).toHaveProperty('status')
  expect(res.response.status).toBe(204) // Status: No content
}, 15 * SECONDS)

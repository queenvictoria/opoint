import { StoredSearch } from '@opoint/storedsearch'
import { type StoredSearchListResult } from '@opoint/types'

const SECONDS = 1000
const NUM = 2
let searches: Array<StoredSearchListResult> = []

test('API key present', async () => {
  expect(process.env.OPOINT_API_KEY).not.toBe(undefined)
})

if ( !process.env.OPOINT_API_KEY ) throw new Error("Please add OPOINT_API_KEY to your environment.")
const api = new StoredSearch({ api_key: process.env.OPOINT_API_KEY })

test('List stored searches', async () => {
  const res = await api.list()

  expect(res).toHaveProperty('status')
  expect(res.status).toBe(200)

  const body = await res.json()
  expect(typeof body).toEqual("object")
  expect(Array.isArray(body)).toEqual(true)
  // expect(body).toBe(expect.any(Array))
  // expect(body).toBeInstanceOf(Array)

  expect(body.length).toBeGreaterThan(-1)

  // Store the searches
  searches = body
}, 20 * SECONDS)

test('Add stored search', async () => {
  const props = {
    search: "Anthropic",
    // access_group: null,  // Not null
    // max_age: null,       // Not null
    get_old_articles: false,
    use_syndicates: false
  }
  const res = await api.add(props)

  expect(res).toHaveProperty('status')
  expect(res.status).not.toBe(400) // Status: Bad request
  expect(res.status).toBe(201)

  const body = await res.json()
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

test('Delete stored search', async () => {
  const props = {
    id: searches[0]?.id
  }
  const res = await api.delete(props)

  expect(res).toHaveProperty('status')
  expect(res.status).toBe(204) // Status: No content
}, 15 * SECONDS)

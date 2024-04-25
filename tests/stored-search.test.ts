const { StoredSearch } = require('@opoint/storedsearch')
// const { type StoredSearchAddProps } = require('@opoint/types')

const SECONDS = 1000

const api = new StoredSearch({ api_key: process.env.OPOINT_API_KEY })

test('API key present', async () => {
  expect(process.env.OPOINT_API_KEY).not.toBe(undefined)
})

test('List stored searches', async () => {
  const res = await api.list()

  expect(res).toHaveProperty('status')
  expect(res.status).toBe(200)

  const body = await res.json()
  expect(typeof body).toEqual("object")
  expect(Array.isArray(body)).toEqual(true)
  // expect(body).toBe(expect.any(Array))
  // expect(body).toBeInstanceOf(Array)

  expect(body).toEqual([])
  expect(body.length).toEqual(0)
}, 10 * SECONDS)


// test('Add stored search', async () => {
//   const props = {
//     search: "Anthropic"
//   }
//   const res = await api.add(props)

//   console.log("++++ status", res.status)
//   expect(res).toHaveProperty('status')
//   expect(res.status).not.toBe(404)

//   // console.log(res.statusCode)
//   // console.log(res.status.code)
//   console.log(res.body)
//   console.log(res.json())
//   // console.log(JSON.stringify(res.body))
//   // console.log(res.errors)
//   // console.log(res.error)

//   expect(res).toBe(3)

// }, 15 * SECONDS)

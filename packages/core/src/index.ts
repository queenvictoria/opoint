import {
  type SearchProps,
  type StoredSearchAddProps
} from '@opoint/types'

type OpointProps = SearchProps | StoredSearchAddProps

export class BaseService {
  base_url = 'https://api.opoint.com/'
  method = 'GET'
  headers = {}

  constructor () {}

  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
   *
   * @param params
   */
  fetch (body: OpointProps, method = 'GET') {
    const url = `${this.base_url}/`

    return fetch(url, {
      headers: this.headers,
      method,
      body: JSON.stringify(body)
    })

    // .then((response) => {
      //   // Do something with response
      // })
      // .catch(function (err) {
      //   console.log("Unable to fetch -", err);
      // })
  }

  /**
   *
  */
  delete (body: OpointProps) {
    return this.fetch(body, 'DELETE')
  }

  /**
   *
  */
  get (body: OpointProps) {
    return this.fetch(body, 'GET')
  }


  /**
   *
   */
  patch (body: OpointProps) {
    return this.fetch(body, 'PATCH')
  }

  /**
   *
   */
  post (body: OpointProps) {
    return this.fetch(body, 'POST')
  }
}
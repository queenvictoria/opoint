import {
  type SearchProps,
  type StoredSearchAddProps,
  type StoredSearchListProps
} from '@opoint/types'

type OpointProps = SearchProps
  | StoredSearchAddProps
  | StoredSearchListProps

export class BaseService {
  base_url = 'https://api.opoint.com'
  method = 'GET'
  headers = new Headers({
    Accept: 'application/json'
  })
  endpoint = ''

  constructor ({api_key}: {api_key: string}) {
    if (api_key) {
      this.headers.set('Authorization', ['Token', api_key].join(' '))
    }
  }

  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
   *
   * @param params
   */
  fetch (opts: RequestInit) {
    const url = [this.base_url, this.endpoint].join('/')

    // Add Headers
    if ( this.headers )
      opts.headers = this.headers

    return fetch(url, opts)
  }

  /**
   *
  */
  delete (body: OpointProps) {
    return this.fetch({ body: JSON.stringify(body), method: 'DELETE' })
  }

  /**
   *
  */
  get (body: OpointProps) {
    return this.fetch({ method: 'GET' })
  }


  /**
   *
   */
  patch (body: OpointProps) {
    return this.fetch({ body: JSON.stringify(body), method: 'PATCH' })
  }

  /**
   *
   */
  post (body: OpointProps) {
    const opts = {
      method: 'POST',
      body: JSON.stringify(body)
    }

    return this.fetch(opts)
  }
}
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
    Accept: 'application/json',
    'Content-Type': 'application/json'
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
  fetch (opts: RequestInit, paths?: Array<string>) {
    const fragments = [this.base_url, this.endpoint]
    if ( paths && paths.length > 0 ) {
      paths.forEach(p => fragments.push(p))
    }
    // Add a trailing slash
    fragments.push('')
    const url = fragments.join('/')

    // Add Headers
    opts.headers = this.headers

    return fetch(url, opts)
  }

  /**
   *
  */
  _delete (id: string) {
    return this.fetch({ method: 'DELETE' }, [id])
  }

  /**
   *
  */
  _get (body: OpointProps) {
    return this.fetch({ method: 'GET' })
  }


  /**
   *
   */
  _patch (body: OpointProps) {
    return this.fetch({ body: JSON.stringify(body), method: 'PATCH' })
  }

  /**
   *
   */
  _post (body: any) {
    const params = {
      method: 'POST',
      body: JSON.stringify(body)
    }

    return this.fetch(params)
  }
}
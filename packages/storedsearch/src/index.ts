import { BaseService } from '@opoint/core'

import {
  type StoredSearchFeedProps,
  type StoredSearchListProps,
  type StoredSearchAddProps,
  type StoredSearchRetrieveProps,
  type StoredSearchUpdateProps,
  type StoredSearchDeleteProps
} from '@opoint/types'


export class StoredSearch extends BaseService {
  endpoint = 'storedsearch'

  constructor ({api_key}: {api_key: string}) {
    super({ api_key })
  }

  // https://api-docs.opoint.com/references/api#storedsearch-get-storedsearch-feed
  feed (params?: StoredSearchFeedProps) {
    if ( !params?.from) throw new Error("Feed requires a `from` timestamp.")

    return this._get(['feed'], params)
  }

  /**
   * List all stored searches
   */
  list () {
    const params = {} as StoredSearchListProps
    return this._get([], params)
  }

  add (params: StoredSearchAddProps) {
    return this._post(params)
  }

  retrieve ({id}: StoredSearchRetrieveProps) {
    if (!id) throw new Error("Retrieve requires an ID.")

    return this._get([id.toString()])
  }

  update (params: StoredSearchUpdateProps) {}

  delete ({id}: {id: string|number}): Promise<Response> {
    if (!id) throw new Error("Delete requires an ID.")

    return this._delete(id.toString())
  }
}

import { BaseService } from '@opoint/core'

import {
  type StoredSearchFeedProps,
  type StoredSearchListProps,
  type StoredSearchAddProps,
  type StoredSearchRetrieveProps,
  type StoredSearchUpdateProps,
  type StoredSearchDeleteProps,
  type OpointResponse
} from '@opoint/types'


export class StoredSearch extends BaseService {
  endpoint = 'storedsearch'

  constructor ({api_key}: {api_key: string}) {
    super({ api_key })
  }

  // https://api-docs.opoint.com/references/api#storedsearch-get-storedsearch-feed
  feed (params?: StoredSearchFeedProps): Promise<OpointResponse> {
    if ( !params?.from) throw new Error("Feed requires a `from` timestamp.")

    return this._get(['feed'], params)
  }

  /**
   * List all stored searches
   */
  list (): Promise<OpointResponse> {
    const params = {} as StoredSearchListProps
    return this._get([], params)
  }

  add (params: StoredSearchAddProps): Promise<OpointResponse> {
    return this._post(params)
  }

  retrieve ({id}: StoredSearchRetrieveProps): Promise<OpointResponse> {
    if (!id) throw new Error("Retrieve requires an ID.")

    return this._get([id.toString()])
  }

  // @TODO PATCH
  update (params: StoredSearchUpdateProps): Promise<OpointResponse> {
    if (!params.id) throw new Error("Retrieve requires an ID.")

    return this._patch([params.id.toString()], params)
  }

  delete ({id}: StoredSearchDeleteProps): Promise<OpointResponse> {
    if (!id) throw new Error("Delete requires an ID.")

    return this._delete(id.toString())
  }
}

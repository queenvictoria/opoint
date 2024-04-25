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
  endpoint = "storedsearch"

  constructor ({api_key}: {api_key: string}) {
    super({ api_key })
  }

  // https://api-docs.opoint.com/references/api#storedsearch-get-storedsearch-feed
  feed (params: StoredSearchFeedProps) {}

  /**
   * List all stored searches
   */
  list () {
    const params = {} as StoredSearchListProps
    return this.get(params)
  }

  add (params: StoredSearchAddProps) {
    return this.post(params)
  }

  retrieve (params: StoredSearchRetrieveProps) {}

  update (params: StoredSearchUpdateProps) {}

  // delete (params: StoredSearchDeleteProps) {}
}

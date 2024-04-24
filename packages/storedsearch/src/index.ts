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
  endpoint = ""

  constructor () {
    super()
  }

  // https://api-docs.opoint.com/references/api#storedsearch-get-storedsearch-feed
  feed (params: StoredSearchFeedProps) {}

  list (params: StoredSearchListProps) {}

  add (params: StoredSearchAddProps) {
    return this.post(params)
  }

  retrieve (params: StoredSearchRetrieveProps) {}

  update (params: StoredSearchUpdateProps) {}

  // delete (params: StoredSearchDeleteProps) {}
}

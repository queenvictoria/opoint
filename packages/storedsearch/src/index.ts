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

    /**
     * Four bits
     *  1 Topics
     *  2 Entities
     *  3 Entities without a wikidata id
     *  4 Highlighting: adds entity ids to match tags, using ent attributes.  Since these tags are activated by main.matches, you should set that as well.
     *
     *  1 0001  Topics.
     *  2 0010  Entities.
     *  3 0011  Topics and entities.
     *  4 0100  Entities without a wikidata id.
     *  5 0101  Topics and entities without a wikidata id.
     *  6 0110  Entities including those without a wikidata id.
     *  7 0111  Setting it to 7 will include all the available data, but no highlighting information.
     *  8 1000  Setting it 8 will include only highlighting information.
     *  9 1001  Topics and highlights.
     * 10 1010  Entities and highlights.
     * 14 1110  Entities including those without a wikidata id and highlighs.
     * 15 1111  Setting it to 15 will include everything.

     */
    // https://api-docs.opoint.com/references/search-request#parameters-textrazor
    if ( params.features && ! params.textrazor ) {
      if ( params.features.all )
        params.textrazor = 15
      else if ( params.features.entities && params.features.topics )
        params.textrazor = 15
      else if ( params.features.topics )
        params.textrazor = 9
      else if ( params.features.entities )
        params.textrazor = 14

      delete params.features
    }
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

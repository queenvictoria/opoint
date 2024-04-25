
export type MainProps = {
  header?: number
  summary?: number
}
export type ParamsProps = {
  reqestedarticles?: number
  main?: MainProps
}
export type SearchProps = {
  searchterm: string
  params?: ParamsProps
}

export type StoredSearchListResult = {
  id: number
  // search: string
  last_new_article: number
  // max_age: number
  // get_old_articles: boolean
  // use_syndicates: boolean
} & StoredSearchAddProps

export type StoredSearchFeedProps = {}
export type StoredSearchListProps = {}

export type StoredSearchAddProps = {
  search: string
  access_group?: string
  get_old_articles?: boolean
  max_age?: number
  use_syndicates?: boolean
}

export type StoredSearchRetrieveProps = {
  fred?: string
}
export type StoredSearchUpdateProps = {}
export type StoredSearchDeleteProps = {}

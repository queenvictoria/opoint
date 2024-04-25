import { Url } from "url"

enum format {
  JSON = "json",
  XML = "xml"
}

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

export type textProps = {
  matches: boolean
  text: string
}

export type ImageProps = {
  url: Url
}

export type DocumentProps = {
  id_site: number
  id_article: number
  hidden: boolean
  position: number
  countrycode: string
  countryname: string
  similarweb: {
    domain: string
  }
  site_rank: {
    rank_global: number
    rank_country: number
  }
  unix_timestamp: number
  media_type: {
    timemap: boolean
    clip: boolean
    hastext: boolean
    haslogo: boolean
    paywall: boolean
    fulltext: boolean
    text: string // 'WEB'
  }
  stimestamp: number
  stimestamp_index: number
  local_time: {
    GMT: number
    text: string
  }
  local_rcf822_time: {
    text: string
  }
  distribute_conditions: string
  content_protected: number // 1
  language: {
    encoding: string
    text: string
  }
  word_count: number
  first_source: {
    id: number
    name: string
    sitename: string
    url: Url
    siteurl: Url
  }
  header: textProps
  summary: textProps
  body: textProps
  articleimages: {
    count: number
    articleimage: Array<ImageProps>
  }
  caption: {
    text: string
  }
  quotes: any // An array of some kind
  url: Url
  orig_url: Url
  url_common: Url
  screenshots: any // An array of some kind
  author: string
  exists_in_basket: string
  tags: Array<string> // At a guess
  stored_search_id: number
}

export type StoredSearchListResult = {
  id: number
  // search: string
  last_new_article: number
  // max_age: number
  // get_old_articles: boolean
  // use_syndicates: boolean
} & StoredSearchAddProps

export type StoredSearchFeedProps = {
  from: number
  to?: number
  format?: format     // json|xml
  num_art?: number
  topics?: number     // 0|1
  matches?: number    // 0|1
  equalgroup?: number // 0|1
  readership?: number // requires licence
  textrazor?: number  // requires licence
}

export type StoredSearchFeedResponse = {
  search_result: {
    documents: number
    search_start: number
    covered: number
    next_from: number

    first_timestamp?: number
    last_timestamp?: number
    generated_timestamp?: number
    cacheage?: number
    cputime?: number
    host?: string
    compiledate?: string
    notimeout?: boolean
    document?: Array<DocumentProps>
  }
}

export type StoredSearchListProps = {}

export type StoredSearchAddProps = {
  search: string
  access_group?: string
  get_old_articles?: boolean
  max_age?: number
  use_syndicates?: boolean
}

export type StoredSearchRetrieveProps = {
  id: number|string
}

export type StoredSearchUpdateProps = {}
export type StoredSearchDeleteProps = {}

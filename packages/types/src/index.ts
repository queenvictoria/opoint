import { Url } from "url"

export enum FormatEnum {
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

export type TextProps = {
  matches: boolean
  text?: string
  readmore?: boolean
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
    id: number|string
    name: string
    sitename: string
    url: Url
    siteurl: Url
  }
  header: TextProps
  summary: TextProps
  body: TextProps
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
  topics_and_entities?: {
    topics?: TopicProps[]
    entities?: {
      location?: EntityProps[]
      organization?: EntityProps[]
      person?: EntityProps[]
    }
  }
}

export type EntityProps = {
  entity: string
  wikidata_id?: string
}

export type TopicProps = {
  label: string
  mediatopic_id?: string
  score: number
}

export type StoredSearchListResponse = Array<StoredSearchRetrieveResponse>

export type StoredSearchFeedProps = {
  from: number        // timestamp in seconds. Must be after the earliest stored search.
  to?: number         // timestamp in seconds. If greater than now set to now.
  interval?: number   // 120-1800 ignored if `to` is set
  format?: FormatEnum // json|xml
  num_art?: number    // defaults to 25000. This is `per` stored search not a limit
  topics?: number     // 0|1
  matches?: number    // 0|1
  equalgroup?: number // 0|1
  readership?: number // requires licence
  textrazor?: number  // requires licence
  allmeta?: boolean
  allsubject?: boolean
}

export type StoredSearchFeedResponse = {
  searchresult: {
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

export type StoredSearchAddResponse = {
  id: number|string
} & StoredSearchAddProps

export type StoredSearchRetrieveProps = {
  id: number|string
}

export type StoredSearchRetrieveResponse = {
  last_new_article: number
  access_group: {
    access_groups: Array<any>
    sites: Array<any>
    sources: Array<any>
  }
} & StoredSearchAddResponse

export type StoredSearchUpdateProps = {
  id: number|string
} & StoredSearchAddProps

export type StoredSearchUpdateResponse = StoredSearchRetrieveResponse

export type StoredSearchDeleteProps = {
  id: number|string
}

export type StoredSearchDeleteResponse = {}

export type OpointProps = SearchProps
  | StoredSearchAddProps
  | StoredSearchListProps

export type OpointResponse = {
  response: Response
  data: StoredSearchAddResponse
    | StoredSearchFeedResponse
    | StoredSearchListResponse
    | StoredSearchUpdateResponse
    | StoredSearchDeleteResponse
}

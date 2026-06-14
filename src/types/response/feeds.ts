export interface FeedResponse {
  meta: FeedResponseMeta
  data: FeedItemData[]
}

export interface FeedResponseMeta {
  page: number
  total: number
  limit: number
}

export interface FeedItemData {
  id: number
  destination: string
  heroImage: string
  tripType: string
  price: number
  duration: string
  rating: number
  details: FeedDetail[]
}

export interface FeedDetail {
  day: string
  text: string
  icon: string
}

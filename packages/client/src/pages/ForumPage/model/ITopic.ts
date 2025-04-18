export interface ITopic {
  id: number
  title: string
  author: {
    name: string
    avatar: string
  }
  date: string
  commentsCount: number
  viewsCount: number
  content: string
}

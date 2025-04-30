export interface IComment {
  parent_id: number
  id: number
  author: {
    avatar: string
    name: string
  }
  content: string
  date: string
  topic: number
}

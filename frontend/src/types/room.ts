export interface Room {
  id: number
  title: string
  description: string | null
  price: number
  location: string | null
  latitude: number | null
  longitude: number | null
  images: string[] | null
  isActive: boolean
  isRenting: boolean
  minStay: number | null
  maxStay: number | null
  furnished: boolean | null
  aircon: boolean | null
  parking: boolean | null
  userId: number
  createdAt: string
  updatedAt: string

  user: {
    id: number
    fullName: string | null
    email: string | null
    phone: string | null
  }
}
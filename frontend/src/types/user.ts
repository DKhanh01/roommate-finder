import type { Room } from "./room"

export interface User {
  id: number
  email: string
  fullName: string

  age: number | null
  gender: string | null
  phone: string | null
  budget: number | null

  location: string | null

  bio: string | null

  smoke: boolean | null
  pet: boolean | null
  sleepLate: boolean | null

  rooms?: Room[]
}
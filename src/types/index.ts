export interface Playlist {
  id: number
  name: string
  description: string | null
  created_at: string
  songs: Song[]
  user: User
  public: boolean
  thumbnail_art_file_url: string | null
}

export interface Song {
  id: number
  name: string
  artist_name: string
  album_name?: string
  album_art_url?: string
  duration: string
}

export interface User {
  id: number
  profile_name: string
  bio: string | null
  profile_image_url: string
  country: string
  user_type: 'creator' | 'artist'
  is_pro: boolean
  is_premium: boolean
}

export interface Project {
  id: number
  name: string
  songs: any[]
  thumbnail_art_file_url: string | null
  [key: string]: any
}

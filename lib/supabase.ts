import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ─── Types ───────────────────────────────────────────────────

export type Profile = {
  id: string
  full_name: string | null
  phone: string | null
  role: 'USER' | 'ADMIN'
  created_at: string
  updated_at: string
}

export type DbProperty = {
  id: string
  user_id: string
  title: string
  description: string | null
  price: number
  city: string
  neighborhood: string | null
  bedrooms: number
  bathrooms: number
  square_meters: number
  images: string[]
  property_type: 'APPARTEMENT' | 'VILLA' | 'MAISON' | 'STUDIO' | 'TERRAIN' | 'COMMERCE'
  transaction_type: 'A_LOUER' | 'A_VENDRE'
  status: 'EN_ATTENTE' | 'PUBLIE' | 'ARCHIVE'
  is_featured: boolean
  is_new: boolean
  is_urgent: boolean
  created_at: string
  updated_at: string
  // Joined
  profiles?: Profile
}

export type Message = {
  id: string
  property_id: string
  sender_name: string
  sender_email: string
  sender_phone: string | null
  content: string
  is_read: boolean
  created_at: string
  // Joined
  properties?: Pick<DbProperty, 'id' | 'title'>
}

export type SiteContact = {
  id: string
  name: string
  email: string
  phone: string | null
  subject: string
  message: string
  is_read: boolean
  created_at: string
}

// ─── Helpers ─────────────────────────────────────────────────

/** Map DB property type to frontend display string */
const typeMap: Record<DbProperty['property_type'], string> = {
  APPARTEMENT: 'Appartement',
  VILLA: 'Villa',
  MAISON: 'Maison',
  STUDIO: 'Studio',
  TERRAIN: 'Terrain',
  COMMERCE: 'Commerce',
}

/** Map DB transaction type to frontend display string */
const transactionMap: Record<DbProperty['transaction_type'], string> = {
  A_LOUER: 'À louer',
  A_VENDRE: 'À vendre',
}

/** Convert a Supabase DbProperty to the frontend Property shape used by PropertyCard */
export function toFrontendProperty(p: DbProperty) {
  return {
    id: p.id,
    title: p.title,
    price: p.price,
    location: p.neighborhood ? `${p.city}, ${p.neighborhood}` : p.city,
    city: p.city,
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    squareMeter: p.square_meters,
    image: p.images?.[0] || '/placeholder.jpg',
    type: typeMap[p.property_type] as 'Appartement' | 'Maison' | 'Terrain' | 'Villa' | 'Studio' | 'Commerce',
    transaction: transactionMap[p.transaction_type] as 'À louer' | 'À vendre',
    isNew: p.is_new,
    isUrgent: p.is_urgent,
    isFeatured: p.is_featured,
    description: p.description,
    images: p.images,
    owner: p.profiles ? {
      name: p.profiles.full_name || 'Utilisateur',
      phone: p.profiles.phone || '',
    } : undefined,
  }
}

/** Upload an image to Supabase Storage and return its public URL */
export async function uploadPropertyImage(file: File, userId: string): Promise<string> {
  const ext = file.name.split('.').pop()
  const fileName = `${userId}/${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`

  const { error } = await supabase.storage
    .from('property-images')
    .upload(fileName, file, { cacheControl: '3600', upsert: false })

  if (error) throw error

  const { data } = supabase.storage
    .from('property-images')
    .getPublicUrl(fileName)

  return data.publicUrl
}

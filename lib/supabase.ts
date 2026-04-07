import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Supabase URL or Anon Key is missing. Ensure you have set them in .env.local",
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/** Exporting types for convenience (In a real project, these are generated via Supabase CLI) */
export type Profile = {
  id: string;
  full_name: string | null;
  phone: string | null;
  role: "USER" | "ADMIN";
  created_at: string;
};

export type Property = {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  price: number;
  city: string;
  neighborhood: string | null;
  bedrooms: number;
  bathrooms: number;
  square_meters: number;
  images: string[];
  property_type:
    | "APPARTEMENT"
    | "VILLA"
    | "MAISON"
    | "STUDIO"
    | "TERRAIN"
    | "COMMERCE";
  transaction_type: "A_LOUER" | "A_VENDRE";
  status: "EN_ATTENTE" | "PUBLIE" | "ARCHIVE";
  is_featured: boolean;
  is_new: boolean;
  is_urgent: boolean;
  created_at: string;
};

export type Message = {
  id: string;
  property_id: string;
  sender_name: string;
  sender_email: string;
  sender_phone: string | null;
  content: string;
  is_read: boolean;
  created_at: string;
};

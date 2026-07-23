export interface Category {
  id: number; parent_id?: number; name: string; slug: string; description?: string; image_path?: string; sort_order?: number;
  status: "active" | "draft" | "hidden"; catalogs_count?: number;
}

export interface Catalog {
  id: number; category_id?: number; name: string; slug: string; sku?: string; description?: string;
  material?: string; composition?: string; applications?: string[]; specifications?: Record<string, string>;
  thumbnail_path?: string; pdf_path?: string; status: "draft" | "published" | "hidden";
  is_featured: boolean; is_new: boolean; view_count?: number; colors_count?: number; category?: Category; colors?: Color[];
}

export interface Color {
  id: number; catalog_id: number; name: string; code: string; sku: string; type: "plain" | "pattern";
  hex_code?: string; color_family?: string; price?: string; currency: string; stock_quantity: number;
  stock_status: "in_stock" | "low_stock" | "out_of_stock" | "check_stock"; swatch_path?: string;
  is_active: boolean; view_count?: number; catalog?: Pick<Catalog, "id" | "name" | "slug">;
}

export interface Service {
  id: number; title: string; slug: string; type?: string; description: string; tags?: string[];
  image_path?: string; cta_label?: string; cta_url?: string; status: "draft" | "visible" | "hidden";
  inquiry_count?: number; inquiries_count?: number; updated_at: string;
}

export interface Customer {
  id: number; company_name?: string; contact_name: string; email: string; phone?: string;
  industry?: string; country?: string; city?: string; tier: string; status: string;
  sample_requests_count?: number; inquiries_count?: number; created_at: string;
}

export interface SampleRequestItem {
  id: number; sample_name: string; quantity: number; catalog?: Catalog; color?: Color;
}

export interface SampleRequest {
  id: number; reference: string; company_name?: string; full_name: string; country: string;
  city: string; email: string; phone: string; status: "pending" | "approved" | "rejected" | "fulfilled";
  items: SampleRequestItem[]; created_at: string;
}

export interface Inquiry {
  id: number; full_name: string; email: string; company_name?: string; department?: string;
  phone?: string; subject?: string; message: string; status: string; created_at: string;
}

export interface Setting {
  id: number; key: string; value: unknown; group: string; is_public: boolean;
}

export interface DashboardData {
  catalogs: { total: number; published: number; missing_specs: number };
  sample_requests: { total: number; pending: number; recent: SampleRequest[] };
  customers: { total: number; active: number };
  inquiries: { total: number; new: number; recent: Inquiry[] };
  trending_colors: Color[]; top_catalogs: Catalog[];
}

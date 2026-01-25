import { createClient } from "@supabase/supabase-js";

// Lưu ý: Trong môi trường thực tế, hãy thay các giá trị này bằng URL và Anon Key từ dự án Supabase của bạn.
// Bạn có thể lấy chúng trong Project Settings -> API.
const supabaseUrl =
  process.env.SUPABASE_URL || "https://your-project-url.supabase.co";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "your-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

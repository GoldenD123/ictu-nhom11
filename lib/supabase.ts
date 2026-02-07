
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

const isRealSupabase = supabaseUrl && 
                       !supabaseUrl.includes('your-project-url') && 
                       !supabaseUrl.includes('vduzrtvytzkqvxqvxqvx');

const INITIAL_JOBS = [
  {
    id: '1',
    title: 'Senior Frontend Engineer (React)',
    company: 'TechVision Global',
    location: 'TP. Hồ Chí Minh',
    salary: '2,500$ - 4,000$',
    description: 'Chúng tôi tìm kiếm chuyên gia React để xây dựng hệ thống dashboard phức tạp.',
    requirements: ['React', 'TypeScript', 'Tailwind CSS'],
    tags: ['Remote', 'Frontend'],
    logo: 'https://picsum.photos/seed/tech/200',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Fullstack Developer (Node.js/React)',
    company: 'Fintech Solutions',
    location: 'Hà Nội',
    salary: '1,500$ - 2,500$',
    description: 'Phát triển các ứng dụng ví điện tử và cổng thanh toán bảo mật cao.',
    requirements: ['Node.js', 'React', 'PostgreSQL'],
    tags: ['Fullstack', 'Fintech'],
    logo: 'https://picsum.photos/seed/fin/200',
    created_at: new Date().toISOString()
  }
];

class MockSupabaseClient {
  private storageKey = 'jobmatch_db_storage';
  private sessionKey = 'jobmatch_session_storage';

  private getDB() {
    const data = localStorage.getItem(this.storageKey);
    if (!data) {
      const initial = { jobs: INITIAL_JOBS, profiles: [] };
      localStorage.setItem(this.storageKey, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(data);
  }

  private saveDB(data: any) {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  auth = {
    getSession: async () => {
      const session = localStorage.getItem(this.sessionKey);
      return { data: { session: session ? JSON.parse(session) : null }, error: null };
    },
    signInWithPassword: async ({ email, password }: any) => {
      const db = this.getDB();
      if (email === 'admin@jobmatch.ai' && password === '123') {
        const session = { user: { id: 'admin-123', email, role: 'admin' }, access_token: 'mock-jwt' };
        localStorage.setItem(this.sessionKey, JSON.stringify(session));
        return { data: session, error: null };
      }
      const user = db.profiles.find((p: any) => p.email === email && p.password === password);
      if (user) {
        const session = { user: { id: user.id, email: user.email, role: user.role || 'user' }, access_token: 'mock-jwt' };
        localStorage.setItem(this.sessionKey, JSON.stringify(session));
        return { data: session, error: null };
      }
      return { data: null, error: { message: 'Email hoặc mật khẩu không đúng.' } };
    },
    signUp: async ({ email, password, options }: any) => {
      const db = this.getDB();
      if (db.profiles.find((p: any) => p.email === email)) {
        return { data: null, error: { message: 'Email đã tồn tại.' } };
      }
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        password,
        full_name: options?.data?.full_name || 'Ứng viên',
        role: 'user',
        cv_content: ''
      };
      db.profiles.push(newUser);
      this.saveDB(db);
      return { data: { user: newUser }, error: null };
    },
    signOut: async () => {
      localStorage.removeItem(this.sessionKey);
      return { error: null };
    },
    onAuthStateChange: (callback: any) => {
      return { data: { subscription: { unsubscribe: () => {} } } };
    }
  };

  from(table: string) {
    return {
      select: (query?: string) => ({
        order: (col: string, { ascending }: any) => {
          const db = this.getDB();
          const data = db[table] || [];
          const sorted = [...data].sort((a, b) => {
            if (ascending) return a[col] > b[col] ? 1 : -1;
            return a[col] < b[col] ? 1 : -1;
          });
          return Promise.resolve({ data: sorted, error: null });
        },
        eq: (col: string, val: any) => ({
          single: () => {
            const db = this.getDB();
            const data = db[table] || [];
            const item = data.find((i: any) => i[col] === val);
            return Promise.resolve({ data: item || null, error: item ? null : { message: 'Not found' } });
          },
          then: (resolve: any) => {
             const db = this.getDB();
             const data = db[table] || [];
             const filtered = data.filter((i: any) => i[col] === val);
             return resolve({ data: filtered, error: null });
          }
        }),
        then: (resolve: any) => {
          const db = this.getDB();
          const data = db[table] || [];
          return resolve({ data, error: null });
        }
      }),
      insert: (items: any[]) => {
        const db = this.getDB();
        const newItems = items.map(item => ({
          id: Math.random().toString(36).substr(2, 9),
          created_at: new Date().toISOString(),
          ...item
        }));
        db[table] = [...(db[table] || []), ...newItems];
        this.saveDB(db);
        return Promise.resolve({ data: newItems, error: null });
      },
      update: (updates: any) => ({
        eq: (col: string, val: any) => {
          const db = this.getDB();
          db[table] = (db[table] || []).map((item: any) => {
            if (item[col] === val) return { ...item, ...updates };
            return item;
          });
          this.saveDB(db);
          return Promise.resolve({ error: null });
        }
      }),
      delete: () => ({
        eq: (col: string, val: any) => {
          const db = this.getDB();
          db[table] = (db[table] || []).filter((item: any) => item[col] !== val);
          this.saveDB(db);
          return Promise.resolve({ error: null });
        }
      })
    };
  }
}

export const supabase = isRealSupabase 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : (new MockSupabaseClient() as any);

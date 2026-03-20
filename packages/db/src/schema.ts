// Автоматически сгенерированные типы из Supabase
// Запустить `pnpm db:types` для обновления
// Пока используем ручные типы на основе SQL-схемы

export type Database = {
  public: {
    Tables: {
      tenants: {
        Row: {
          id: string
          name: string
          domain: string | null
          primary_color: string
          logo_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['tenants']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['tenants']['Insert']>
      }
      users: {
        Row: {
          id: string
          tenant_id: string
          auth_id: string | null
          name: string
          email: string
          role: 'superadmin' | 'tenant_admin' | 'curator' | 'mentor' | 'student'
          avatar_url: string | null
          bio: string | null
          referred_by: string | null
          created_at: string
          updated_at: string
          deleted_at: string | null
        }
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at' | 'updated_at' | 'deleted_at' | 'tenant_id'> & {
          id?: string
          tenant_id?: string
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
        Update: Partial<Database['public']['Tables']['users']['Insert']>
      }
      academies: {
        Row: {
          id: string
          tenant_id: string
          name: string
          description: string | null
          color: string
          access: 'open' | 'tariff' | 'invite'
          order: number
          created_at: string
          updated_at: string
          deleted_at: string | null
        }
        Insert: Omit<Database['public']['Tables']['academies']['Row'], 'id' | 'created_at' | 'updated_at' | 'deleted_at' | 'tenant_id' | 'order' | 'color' | 'access'> & {
          id?: string
          tenant_id?: string
          color?: string
          access?: 'open' | 'tariff' | 'invite'
          order?: number
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
        Update: Partial<Database['public']['Tables']['academies']['Insert']>
      }
      modules: {
        Row: {
          id: string
          academy_id: string
          title: string
          description: string | null
          order: number
          created_at: string
          updated_at: string
          deleted_at: string | null
        }
        Insert: Omit<Database['public']['Tables']['modules']['Row'], 'id' | 'created_at' | 'updated_at' | 'deleted_at' | 'order'> & {
          id?: string
          order?: number
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
        Update: Partial<Database['public']['Tables']['modules']['Insert']>
      }
      lessons: {
        Row: {
          id: string
          module_id: string
          title: string
          description: string | null
          type: 'video' | 'practice' | 'project' | 'test'
          duration: string | null
          video_url: string | null
          status: 'published' | 'draft' | 'scheduled'
          access: 'open' | 'order' | 'locked'
          package: 'all' | 'operator' | 'director' | 'studio' | 'promo'
          price: number
          xp: number
          frames: number
          order: number
          created_at: string
          updated_at: string
          deleted_at: string | null
        }
        Insert: Omit<Database['public']['Tables']['lessons']['Row'], 'id' | 'created_at' | 'updated_at' | 'deleted_at' | 'order' | 'price' | 'xp' | 'frames' | 'type' | 'status' | 'access' | 'package'> & {
          id?: string
          type?: 'video' | 'practice' | 'project' | 'test'
          status?: 'published' | 'draft' | 'scheduled'
          access?: 'open' | 'order' | 'locked'
          package?: 'all' | 'operator' | 'director' | 'studio' | 'promo'
          price?: number
          xp?: number
          frames?: number
          order?: number
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
        Update: Partial<Database['public']['Tables']['lessons']['Insert']>
      }
      lesson_content: {
        Row: {
          id: string
          lesson_id: string
          type: 'prompt' | 'file' | 'homework'
          title: string | null
          content: string | null
          file_url: string | null
          order: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['lesson_content']['Row'], 'id' | 'created_at' | 'order'> & {
          id?: string
          order?: number
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['lesson_content']['Insert']>
      }
      user_progress: {
        Row: {
          id: string
          user_id: string
          lesson_id: string
          completed: boolean
          score: number | null
          completed_at: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['user_progress']['Row'], 'id' | 'created_at' | 'completed'> & {
          id?: string
          completed?: boolean
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['user_progress']['Insert']>
      }
      user_gamification: {
        Row: {
          id: string
          user_id: string
          xp: number
          frames: number
          rank: string
          streak: number
          last_activity: string
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['user_gamification']['Row'], 'id' | 'created_at' | 'updated_at' | 'xp' | 'frames' | 'rank' | 'streak' | 'last_activity'> & {
          id?: string
          xp?: number
          frames?: number
          rank?: string
          streak?: number
          last_activity?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['user_gamification']['Insert']>
      }
      posts: {
        Row: {
          id: string
          user_id: string
          tenant_id: string
          title: string | null
          content: string | null
          image_url: string | null
          video_url: string | null
          type: 'homework' | 'film' | 'creative'
          likes_count: number
          comments_count: number
          created_at: string
          deleted_at: string | null
        }
        Insert: Omit<Database['public']['Tables']['posts']['Row'], 'id' | 'created_at' | 'deleted_at' | 'tenant_id' | 'likes_count' | 'comments_count' | 'type'> & {
          id?: string
          tenant_id?: string
          type?: 'homework' | 'film' | 'creative'
          likes_count?: number
          comments_count?: number
          created_at?: string
          deleted_at?: string | null
        }
        Update: Partial<Database['public']['Tables']['posts']['Insert']>
      }
      comments: {
        Row: {
          id: string
          post_id: string
          user_id: string
          text: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['comments']['Row'], 'id' | 'created_at'> & {
          id?: string
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['comments']['Insert']>
      }
      likes: {
        Row: {
          user_id: string
          post_id: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['likes']['Row'], 'created_at'> & {
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['likes']['Insert']>
      }
      tariffs: {
        Row: {
          id: string
          name: string
          price: number
          period: string
          features: string[]
          academy_ids: string[]
          popular: boolean
          accent: string
          order: number
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['tariffs']['Row'], 'id' | 'created_at' | 'updated_at' | 'period' | 'features' | 'academy_ids' | 'popular' | 'accent' | 'order'> & {
          id?: string
          period?: string
          features?: string[]
          academy_ids?: string[]
          popular?: boolean
          accent?: string
          order?: number
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['tariffs']['Insert']>
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          tariff: 'operator' | 'director' | 'studio'
          status: 'active' | 'frozen' | 'expired'
          started_at: string
          expires_at: string | null
        }
        Insert: Omit<Database['public']['Tables']['subscriptions']['Row'], 'id' | 'started_at' | 'status'> & {
          id?: string
          status?: 'active' | 'frozen' | 'expired'
          started_at?: string
        }
        Update: Partial<Database['public']['Tables']['subscriptions']['Insert']>
      }
      payments: {
        Row: {
          id: string
          user_id: string
          tenant_id: string
          amount: number
          tariff: 'operator' | 'director' | 'studio'
          status: 'paid' | 'pending' | 'refunded'
          payment_id: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['payments']['Row'], 'id' | 'created_at' | 'tenant_id' | 'status'> & {
          id?: string
          tenant_id?: string
          status?: 'paid' | 'pending' | 'refunded'
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['payments']['Insert']>
      }
      calendar_events: {
        Row: {
          id: string
          tenant_id: string
          user_id: string | null
          title: string
          description: string | null
          event_date: string
          event_time: string | null
          type: 'lesson' | 'deadline' | 'call' | 'webinar' | 'quest'
          created_by: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['calendar_events']['Row'], 'id' | 'created_at' | 'tenant_id' | 'type'> & {
          id?: string
          tenant_id?: string
          type?: 'lesson' | 'deadline' | 'call' | 'webinar' | 'quest'
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['calendar_events']['Insert']>
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          message: string | null
          type: string
          read: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['notifications']['Row'], 'id' | 'created_at' | 'read' | 'type'> & {
          id?: string
          type?: string
          read?: boolean
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['notifications']['Insert']>
      }
      analytics_events: {
        Row: {
          id: string
          tenant_id: string
          user_id: string | null
          event_type: string
          event_data: Record<string, unknown> | null
          page: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['analytics_events']['Row'], 'id' | 'created_at' | 'tenant_id'> & {
          id?: string
          tenant_id?: string
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['analytics_events']['Insert']>
      }
      quests: {
        Row: {
          id: string
          tenant_id: string
          title: string
          description: string | null
          reward: string | null
          deadline: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['quests']['Row'], 'id' | 'created_at' | 'tenant_id'> & {
          id?: string
          tenant_id?: string
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['quests']['Insert']>
      }
      achievements: {
        Row: {
          id: string
          title: string
          description: string | null
          icon: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['achievements']['Row'], 'id' | 'created_at'> & {
          id?: string
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['achievements']['Insert']>
      }
      certificates: {
        Row: {
          id: string
          user_id: string
          academy_id: string | null
          module_id: string | null
          certificate_number: string | null
          issued_at: string
        }
        Insert: Omit<Database['public']['Tables']['certificates']['Row'], 'id' | 'issued_at'> & {
          id?: string
          issued_at?: string
        }
        Update: Partial<Database['public']['Tables']['certificates']['Insert']>
      }
      portfolio_items: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          media_url: string | null
          type: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['portfolio_items']['Row'], 'id' | 'created_at' | 'type'> & {
          id?: string
          type?: string
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['portfolio_items']['Insert']>
      }
      landing_tool_categories: {
        Row: {
          id: string
          name: string
          color_var: string
          icon: string
          order: number
          created_at: string
          deleted_at: string | null
        }
        Insert: Omit<Database['public']['Tables']['landing_tool_categories']['Row'], 'id' | 'created_at' | 'deleted_at' | 'color_var' | 'icon' | 'order'> & {
          id?: string
          color_var?: string
          icon?: string
          order?: number
          created_at?: string
          deleted_at?: string | null
        }
        Update: Partial<Database['public']['Tables']['landing_tool_categories']['Insert']>
      }
      landing_tools: {
        Row: {
          id: string
          category_id: string
          name: string
          order: number
          created_at: string
          deleted_at: string | null
        }
        Insert: Omit<Database['public']['Tables']['landing_tools']['Row'], 'id' | 'created_at' | 'deleted_at' | 'order'> & {
          id?: string
          order?: number
          created_at?: string
          deleted_at?: string | null
        }
        Update: Partial<Database['public']['Tables']['landing_tools']['Insert']>
      }
    }
  }
}

// Удобные алиасы
type Tables = Database['public']['Tables']
export type User = Tables['users']['Row']
export type Academy = Tables['academies']['Row']
export type Module = Tables['modules']['Row']
export type Lesson = Tables['lessons']['Row']
export type LessonContent = Tables['lesson_content']['Row']
export type UserProgress = Tables['user_progress']['Row']
export type UserGamification = Tables['user_gamification']['Row']
export type Post = Tables['posts']['Row']
export type Comment = Tables['comments']['Row']
export type Tariff = Tables['tariffs']['Row']
export type Subscription = Tables['subscriptions']['Row']
export type Payment = Tables['payments']['Row']
export type CalendarEvent = Tables['calendar_events']['Row']
export type Notification = Tables['notifications']['Row']
export type Quest = Tables['quests']['Row']
export type Achievement = Tables['achievements']['Row']
export type Certificate = Tables['certificates']['Row']
export type PortfolioItem = Tables['portfolio_items']['Row']
export type LandingToolCategory = Tables['landing_tool_categories']['Row']
export type LandingTool = Tables['landing_tools']['Row']

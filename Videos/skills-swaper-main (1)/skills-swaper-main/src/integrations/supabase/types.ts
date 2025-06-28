export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      challenge_completions: {
        Row: {
          challenge_name: string
          completed_at: string
          difficulty_level: string
          id: string
          questions_correct: number
          questions_total: number
          score: number
          skills: string[]
          time_spent: number
          user_id: string
          xp_earned: number
        }
        Insert: {
          challenge_name: string
          completed_at?: string
          difficulty_level: string
          id?: string
          questions_correct: number
          questions_total: number
          score: number
          skills: string[]
          time_spent: number
          user_id: string
          xp_earned?: number
        }
        Update: {
          challenge_name?: string
          completed_at?: string
          difficulty_level?: string
          id?: string
          questions_correct?: number
          questions_total?: number
          score?: number
          skills?: string[]
          time_spent?: number
          user_id?: string
          xp_earned?: number
        }
        Relationships: []
      }
      collaboration_sessions: {
        Row: {
          code_content: string | null
          created_at: string
          created_by: string
          id: string
          is_active: boolean | null
          notes_content: string | null
          title: string
          updated_at: string
        }
        Insert: {
          code_content?: string | null
          created_at?: string
          created_by: string
          id?: string
          is_active?: boolean | null
          notes_content?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          code_content?: string | null
          created_at?: string
          created_by?: string
          id?: string
          is_active?: boolean | null
          notes_content?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      discussion_messages: {
        Row: {
          created_at: string
          discussion_id: string
          id: string
          message: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          discussion_id: string
          id?: string
          message: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          discussion_id?: string
          id?: string
          message?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "discussion_messages_discussion_id_fkey"
            columns: ["discussion_id"]
            isOneToOne: false
            referencedRelation: "discussions"
            referencedColumns: ["id"]
          },
        ]
      }
      discussions: {
        Row: {
          content: string
          created_at: string
          id: string
          is_pinned: boolean | null
          message_count: number | null
          reply_count: number | null
          tags: string[] | null
          title: string
          updated_at: string
          upvotes: number | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_pinned?: boolean | null
          message_count?: number | null
          reply_count?: number | null
          tags?: string[] | null
          title: string
          updated_at?: string
          upvotes?: number | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_pinned?: boolean | null
          message_count?: number | null
          reply_count?: number | null
          tags?: string[] | null
          title?: string
          updated_at?: string
          upvotes?: number | null
          user_id?: string
        }
        Relationships: []
      }
      mentor_ratings: {
        Row: {
          created_at: string
          feedback: string | null
          id: string
          mentor_id: string
          rater_id: string
          rating: number
        }
        Insert: {
          created_at?: string
          feedback?: string | null
          id?: string
          mentor_id: string
          rater_id: string
          rating: number
        }
        Update: {
          created_at?: string
          feedback?: string | null
          id?: string
          mentor_id?: string
          rater_id?: string
          rating?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          id: string
          location: string | null
          name: string
          role: string
          skills: string[] | null
          updated_at: string
          user_id: string
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          id?: string
          location?: string | null
          name: string
          role: string
          skills?: string[] | null
          updated_at?: string
          user_id: string
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          id?: string
          location?: string | null
          name?: string
          role?: string
          skills?: string[] | null
          updated_at?: string
          user_id?: string
          website?: string | null
        }
        Relationships: []
      }
      replies: {
        Row: {
          content: string
          created_at: string
          discussion_id: string
          id: string
          parent_reply_id: string | null
          updated_at: string
          upvotes: number | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          discussion_id: string
          id?: string
          parent_reply_id?: string | null
          updated_at?: string
          upvotes?: number | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          discussion_id?: string
          id?: string
          parent_reply_id?: string | null
          updated_at?: string
          upvotes?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "replies_discussion_id_fkey"
            columns: ["discussion_id"]
            isOneToOne: false
            referencedRelation: "discussions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "replies_parent_reply_id_fkey"
            columns: ["parent_reply_id"]
            isOneToOne: false
            referencedRelation: "replies"
            referencedColumns: ["id"]
          },
        ]
      }
      session_participants: {
        Row: {
          id: string
          is_host: boolean | null
          joined_at: string
          session_id: string | null
          user_id: string
        }
        Insert: {
          id?: string
          is_host?: boolean | null
          joined_at?: string
          session_id?: string | null
          user_id: string
        }
        Update: {
          id?: string
          is_host?: boolean | null
          joined_at?: string
          session_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "session_participants_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "collaboration_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      skill_badges: {
        Row: {
          badge_color: string | null
          badge_type: string
          created_at: string
          difficulty_level: string
          earned_at: string
          id: string
          is_verified: boolean | null
          proof_description: string | null
          skill_name: string
          user_id: string
        }
        Insert: {
          badge_color?: string | null
          badge_type: string
          created_at?: string
          difficulty_level: string
          earned_at?: string
          id?: string
          is_verified?: boolean | null
          proof_description?: string | null
          skill_name: string
          user_id: string
        }
        Update: {
          badge_color?: string | null
          badge_type?: string
          created_at?: string
          difficulty_level?: string
          earned_at?: string
          id?: string
          is_verified?: boolean | null
          proof_description?: string | null
          skill_name?: string
          user_id?: string
        }
        Relationships: []
      }
      user_karma: {
        Row: {
          created_at: string
          discussion_karma: number | null
          id: string
          mentor_rating: number | null
          mentor_rating_count: number | null
          reply_karma: number | null
          total_xp: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          discussion_karma?: number | null
          id?: string
          mentor_rating?: number | null
          mentor_rating_count?: number | null
          reply_karma?: number | null
          total_xp?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          discussion_karma?: number | null
          id?: string
          mentor_rating?: number | null
          mentor_rating_count?: number | null
          reply_karma?: number | null
          total_xp?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_stats: {
        Row: {
          created_at: string
          daily_xp: number | null
          id: string
          last_rank_update: string | null
          primary_skill: string | null
          rank_position: number | null
          total_xp: number | null
          updated_at: string
          user_id: string
          weekly_xp: number | null
        }
        Insert: {
          created_at?: string
          daily_xp?: number | null
          id?: string
          last_rank_update?: string | null
          primary_skill?: string | null
          rank_position?: number | null
          total_xp?: number | null
          updated_at?: string
          user_id: string
          weekly_xp?: number | null
        }
        Update: {
          created_at?: string
          daily_xp?: number | null
          id?: string
          last_rank_update?: string | null
          primary_skill?: string | null
          rank_position?: number | null
          total_xp?: number | null
          updated_at?: string
          user_id?: string
          weekly_xp?: number | null
        }
        Relationships: []
      }
      votes: {
        Row: {
          created_at: string
          discussion_id: string | null
          id: string
          reply_id: string | null
          user_id: string
          vote_type: string | null
        }
        Insert: {
          created_at?: string
          discussion_id?: string | null
          id?: string
          reply_id?: string | null
          user_id: string
          vote_type?: string | null
        }
        Update: {
          created_at?: string
          discussion_id?: string | null
          id?: string
          reply_id?: string | null
          user_id?: string
          vote_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "votes_discussion_id_fkey"
            columns: ["discussion_id"]
            isOneToOne: false
            referencedRelation: "discussions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "votes_reply_id_fkey"
            columns: ["reply_id"]
            isOneToOne: false
            referencedRelation: "replies"
            referencedColumns: ["id"]
          },
        ]
      }
      xp_activities: {
        Row: {
          activity_type: string
          created_at: string
          description: string | null
          id: string
          user_id: string
          xp_earned: number
        }
        Insert: {
          activity_type: string
          created_at?: string
          description?: string | null
          id?: string
          user_id: string
          xp_earned: number
        }
        Update: {
          activity_type?: string
          created_at?: string
          description?: string | null
          id?: string
          user_id?: string
          xp_earned?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      award_challenge_badges: {
        Args: {
          p_user_id: string
          p_skills: string[]
          p_score: number
          p_difficulty: string
        }
        Returns: undefined
      }
      calculate_challenge_xp: {
        Args: { score: number; difficulty: string }
        Returns: number
      }
      reset_periodic_xp: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

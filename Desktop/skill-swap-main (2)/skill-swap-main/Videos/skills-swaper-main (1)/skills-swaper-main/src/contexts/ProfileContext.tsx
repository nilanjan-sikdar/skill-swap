import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface ProfileData {
  name: string;
  bio: string;
  location: string;
  website: string;
  skills: string[];
  avatar_url?: string;
  collaborations_count?: number;
  challenges_completed?: number;
}

interface ProfileContextType {
  profileData: ProfileData;
  updateProfileData: (data: Partial<ProfileData>) => void;
  uploadAvatar: (file: File) => Promise<string>;
  refreshStats: () => Promise<void>;
  loading: boolean;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

interface ProfileProviderProps {
  children: ReactNode;
}

export const ProfileProvider = ({ children }: ProfileProviderProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
    bio: "",
    location: "",
    website: "",
    skills: [],
    avatar_url: "",
    collaborations_count: 0,
    challenges_completed: 0
  });

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      // Load profile data from localStorage first for immediate display
      const savedProfile = localStorage.getItem(`profile_${user.id}`);
      if (savedProfile) {
        setProfileData(JSON.parse(savedProfile));
      }

      // Then load from database
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading profile:', error);
        return;
      }

      // Get user stats for challenges and collaborations
      const { data: stats } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', user.id)
        .single();

      const { data: challengeCount } = await supabase
        .from('challenge_completions')
        .select('id', { count: 'exact' })
        .eq('user_id', user.id);

      const { data: collaborationCount } = await supabase
        .from('session_participants')
        .select('id', { count: 'exact' })
        .eq('user_id', user.id);

      const updatedProfile = {
        name: profile?.name || user.email?.split('@')[0] || "User",
        bio: profile?.bio || "Full-stack developer passionate about building amazing user experiences.",
        location: profile?.location || "San Francisco, CA",
        website: profile?.website || "example.dev",
        skills: profile?.skills || ["React", "TypeScript", "Node.js", "UI/UX Design", "PostgreSQL"],
        avatar_url: profile?.avatar_url || "",
        challenges_completed: challengeCount?.length || 0,
        collaborations_count: collaborationCount?.length || 0
      };

      setProfileData(updatedProfile);
      localStorage.setItem(`profile_${user.id}`, JSON.stringify(updatedProfile));
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshStats = async () => {
    if (!user) return;

    try {
      console.log('Refreshing stats for user:', user.id);
      
      const { data: challengeCount } = await supabase
        .from('challenge_completions')
        .select('id', { count: 'exact' })
        .eq('user_id', user.id);

      const { data: collaborationCount } = await supabase
        .from('session_participants')
        .select('id', { count: 'exact' })
        .eq('user_id', user.id);

      const updatedStats = {
        challenges_completed: challengeCount?.length || 0,
        collaborations_count: collaborationCount?.length || 0
      };

      console.log('Updated stats:', updatedStats);

      setProfileData(prev => ({ ...prev, ...updatedStats }));
      
      // Update localStorage
      const updatedProfile = { ...profileData, ...updatedStats };
      localStorage.setItem(`profile_${user.id}`, JSON.stringify(updatedProfile));
    } catch (error) {
      console.error('Error refreshing stats:', error);
    }
  };

  const updateProfileData = async (data: Partial<ProfileData>) => {
    if (!user) return;

    const newProfileData = { ...profileData, ...data };
    setProfileData(newProfileData);
    
    // Save to localStorage immediately
    localStorage.setItem(`profile_${user.id}`, JSON.stringify(newProfileData));

    try {
      // Save to database (only profile fields, not stats)
      const profileFields = {
        user_id: user.id,
        name: newProfileData.name,
        bio: newProfileData.bio,
        location: newProfileData.location,
        website: newProfileData.website,
        skills: newProfileData.skills,
        avatar_url: newProfileData.avatar_url,
        role: 'learner', // Default role
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('profiles')
        .upsert(profileFields);

      if (error) {
        console.error('Error saving profile:', error);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const uploadAvatar = async (file: File): Promise<string> => {
    if (!user) throw new Error('No user logged in');

    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    const avatarUrl = data.publicUrl;
    await updateProfileData({ avatar_url: avatarUrl });
    
    return avatarUrl;
  };

  return (
    <ProfileContext.Provider value={{ profileData, updateProfileData, uploadAvatar, refreshStats, loading }}>
      {children}
    </ProfileContext.Provider>
  );
};

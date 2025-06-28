
export interface LocalDiscussion {
  id: string;
  title: string;
  content: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  tags: string[];
  upvotes: number;
  reply_count: number;
  message_count: number;
  is_pinned: boolean;
  profiles?: {
    name: string;
    user_id: string;
  };
}

export interface LocalMessage {
  id: string;
  discussion_id: string;
  user_id: string;
  message: string;
  created_at: string;
  user_name: string;
}

const DISCUSSIONS_KEY = 'local_discussions';
const MESSAGES_KEY = 'local_messages';

export const localStorageUtils = {
  // Discussion methods
  getDiscussions: (): LocalDiscussion[] => {
    try {
      const data = localStorage.getItem(DISCUSSIONS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting discussions from localStorage:', error);
      return [];
    }
  },

  saveDiscussion: (discussion: Pick<LocalDiscussion, 'title' | 'content' | 'user_id' | 'tags'> & { profiles?: { name: string; user_id: string } }): LocalDiscussion => {
    try {
      const discussions = localStorageUtils.getDiscussions();
      const newDiscussion: LocalDiscussion = {
        ...discussion,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        upvotes: 0,
        reply_count: 0,
        message_count: 0,
        is_pinned: false
      };
      
      discussions.unshift(newDiscussion);
      localStorage.setItem(DISCUSSIONS_KEY, JSON.stringify(discussions));
      return newDiscussion;
    } catch (error) {
      console.error('Error saving discussion to localStorage:', error);
      throw error;
    }
  },

  // Message methods
  getMessages: (discussionId: string): LocalMessage[] => {
    try {
      const data = localStorage.getItem(MESSAGES_KEY);
      const allMessages: LocalMessage[] = data ? JSON.parse(data) : [];
      return allMessages.filter(msg => msg.discussion_id === discussionId);
    } catch (error) {
      console.error('Error getting messages from localStorage:', error);
      return [];
    }
  },

  saveMessage: (message: Omit<LocalMessage, 'id' | 'created_at'>): LocalMessage => {
    try {
      const allMessages = localStorageUtils.getAllMessages();
      const newMessage: LocalMessage = {
        ...message,
        id: Date.now().toString(),
        created_at: new Date().toISOString()
      };
      
      allMessages.push(newMessage);
      localStorage.setItem(MESSAGES_KEY, JSON.stringify(allMessages));
      
      // Update message count for the discussion
      localStorageUtils.updateDiscussionMessageCount(message.discussion_id);
      
      return newMessage;
    } catch (error) {
      console.error('Error saving message to localStorage:', error);
      throw error;
    }
  },

  getAllMessages: (): LocalMessage[] => {
    try {
      const data = localStorage.getItem(MESSAGES_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting all messages from localStorage:', error);
      return [];
    }
  },

  updateDiscussionMessageCount: (discussionId: string) => {
    try {
      const discussions = localStorageUtils.getDiscussions();
      const messages = localStorageUtils.getMessages(discussionId);
      const updatedDiscussions = discussions.map(discussion => {
        if (discussion.id === discussionId) {
          return { ...discussion, message_count: messages.length };
        }
        return discussion;
      });
      localStorage.setItem(DISCUSSIONS_KEY, JSON.stringify(updatedDiscussions));
    } catch (error) {
      console.error('Error updating discussion message count:', error);
    }
  },

  // Search and filter methods
  searchDiscussions: (query: string, tags: string[]): LocalDiscussion[] => {
    try {
      let discussions = localStorageUtils.getDiscussions();
      
      if (query) {
        discussions = discussions.filter(d => 
          d.title.toLowerCase().includes(query.toLowerCase()) ||
          d.content.toLowerCase().includes(query.toLowerCase())
        );
      }
      
      if (tags.length > 0) {
        discussions = discussions.filter(d => 
          tags.some(tag => d.tags.includes(tag))
        );
      }
      
      return discussions;
    } catch (error) {
      console.error('Error searching discussions:', error);
      return [];
    }
  }
};

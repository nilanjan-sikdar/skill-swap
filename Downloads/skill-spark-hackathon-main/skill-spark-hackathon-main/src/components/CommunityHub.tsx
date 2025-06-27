
import { useState } from 'react';
import { MessageSquare, Users, Star, ThumbsUp, MessageCircle, Eye, Clock, Pin, Search, Filter, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const CommunityHub = () => {
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const topics = [
    { id: 'all', name: 'All Topics', count: 1247 },
    { id: 'react', name: 'React', count: 324 },
    { id: 'typescript', name: 'TypeScript', count: 198 },
    { id: 'web3', name: 'Web3', count: 156 },
    { id: 'design', name: 'UI/UX Design', count: 142 },
    { id: 'career', name: 'Career Advice', count: 89 },
  ];

  const discussions = [
    {
      id: 1,
      title: 'Advanced React Patterns: When to use Render Props vs Hooks?',
      author: {
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b44b?w=40&h=40&fit=crop&crop=face',
        role: 'Senior Frontend Engineer',
        reputation: 4.8
      },
      topic: 'react',
      isPinned: true,
      timeAgo: '2 hours ago',
      replies: 23,
      likes: 45,
      views: 312,
      tags: ['React', 'Patterns', 'Hooks'],
      preview: 'I\'ve been exploring different patterns for component composition and state management...'
    },
    {
      id: 2,
      title: 'Best practices for smart contract security auditing',
      author: {
        name: 'Mike Johnson',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
        role: 'Blockchain Developer',
        reputation: 4.9
      },
      topic: 'web3',
      isPinned: false,
      timeAgo: '4 hours ago',
      replies: 18,
      likes: 67,
      views: 234,
      tags: ['Solidity', 'Security', 'Audit'],
      preview: 'After conducting several smart contract audits, here are the key areas to focus on...'
    },
    {
      id: 3,
      title: 'Design System Components: Building a scalable library',
      author: {
        name: 'Lisa Anderson',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
        role: 'Product Designer',
        reputation: 4.7
      },
      topic: 'design',
      isPinned: false,
      timeAgo: '6 hours ago',
      replies: 31,
      likes: 89,
      views: 456,
      tags: ['Design System', 'Components', 'Figma'],
      preview: 'Let\'s discuss how to create maintainable and scalable design system components...'
    },
    {
      id: 4,
      title: 'TypeScript 5.0: New features and migration strategies',
      author: {
        name: 'Alex Kim',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
        role: 'Full Stack Developer',
        reputation: 4.6
      },
      topic: 'typescript',
      isPinned: false,
      timeAgo: '8 hours ago',
      replies: 15,
      likes: 52,
      views: 287,
      tags: ['TypeScript', 'Migration', 'Features'],
      preview: 'With TypeScript 5.0 released, let\'s explore the new features and how to migrate...'
    }
  ];

  const topMentors = [
    {
      name: 'Dr. Emily Parker',
      role: 'AI Research Scientist',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&fit=crop&crop=face',
      rating: 5.0,
      reviews: 245,
      specialties: ['Machine Learning', 'Python', 'Research'],
      isOnline: true
    },
    {
      name: 'David Rodriguez',
      role: 'Senior DevOps Engineer',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face',
      rating: 4.9,
      reviews: 189,
      specialties: ['AWS', 'Docker', 'CI/CD'],
      isOnline: false
    },
    {
      name: 'Maria Silva',
      role: 'UX Design Lead',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=40&h=40&fit=crop&crop=face',
      rating: 4.8,
      reviews: 156,
      specialties: ['User Research', 'Prototyping', 'Strategy'],
      isOnline: true
    }
  ];

  const resources = [
    {
      title: 'React Performance Optimization Guide',
      type: 'Article',
      author: 'React Team',
      likes: 1234,
      bookmarks: 567
    },
    {
      title: 'Complete TypeScript Course 2024',
      type: 'Video Course',
      author: 'TypeScript Academy',
      likes: 890,
      bookmarks: 445
    },
    {
      title: 'Web3 Development Roadmap',
      type: 'Interactive Guide',
      author: 'Blockchain Collective',
      likes: 756,
      bookmarks: 334
    }
  ];

  const filteredDiscussions = discussions.filter(discussion => 
    (selectedTopic === 'all' || discussion.topic === selectedTopic) &&
    (searchQuery === '' || 
     discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     discussion.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Community Hub</h1>
        <p className="text-slate-300">Connect, learn, and grow with fellow developers</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search discussions, topics, or users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-slate-800/50 border-slate-700 text-white"
          />
        </div>
        <Button variant="outline" className="border-slate-600 text-slate-300">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Topics */}
      <div className="flex flex-wrap gap-2">
        {topics.map((topic) => (
          <Button
            key={topic.id}
            variant={selectedTopic === topic.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedTopic(topic.id)}
            className={`${
              selectedTopic === topic.id
                ? 'bg-purple-600 hover:bg-purple-700 text-white'
                : 'border-slate-600 text-slate-300 hover:bg-slate-700/50'
            }`}
          >
            {topic.name} ({topic.count})
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-4">
          {/* Create Post Button */}
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                    YO
                  </AvatarFallback>
                </Avatar>
                <Button 
                  variant="outline" 
                  className="flex-1 justify-start border-slate-600 text-slate-400 hover:bg-slate-700/50"
                >
                  Share your knowledge or ask a question...
                </Button>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Create Post
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Discussions */}
          <div className="space-y-4">
            {filteredDiscussions.map((discussion) => (
              <Card key={discussion.id} className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:border-purple-500/30 transition-colors">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={discussion.author.avatar} alt={discussion.author.name} />
                      <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                        {discussion.author.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {discussion.isPinned && (
                            <Pin className="h-4 w-4 text-yellow-400" />
                          )}
                          <h3 className="font-semibold text-white hover:text-purple-300 cursor-pointer">
                            {discussion.title}
                          </h3>
                        </div>
                        <Badge variant="outline" className="border-slate-600 text-slate-300 text-xs">
                          {topics.find(t => t.id === discussion.topic)?.name}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-sm text-slate-300">{discussion.author.name}</span>
                        <Badge variant="secondary" className="bg-slate-700/50 text-slate-300 text-xs">
                          {discussion.author.role}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-slate-400">{discussion.author.reputation}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-slate-400" />
                          <span className="text-xs text-slate-400">{discussion.timeAgo}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-slate-300 mb-3">{discussion.preview}</p>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {discussion.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs border-purple-500/50 text-purple-300">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-6 text-sm text-slate-400">
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{discussion.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>{discussion.replies} replies</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span>{discussion.views} views</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Top Mentors */}
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white text-sm">
                <Star className="h-4 w-4 text-yellow-400" />
                Top Mentors
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {topMentors.map((mentor, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={mentor.avatar} alt={mentor.name} />
                      <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                        {mentor.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {mentor.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-slate-800 rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{mentor.name}</p>
                    <p className="text-xs text-slate-400 truncate">{mentor.role}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-slate-400">{mentor.rating} ({mentor.reviews})</span>
                    </div>
                  </div>
                </div>
              ))}
              <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700">
                View All Mentors
              </Button>
            </CardContent>
          </Card>

          {/* Trending Resources */}
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white text-sm">
                <TrendingUp className="h-4 w-4 text-green-400" />
                Trending Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {resources.map((resource, index) => (
                <div key={index} className="p-3 bg-slate-700/30 rounded-lg">
                  <h4 className="text-sm font-medium text-white mb-1">{resource.title}</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-400">{resource.type}</p>
                      <p className="text-xs text-slate-400">by {resource.author}</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="h-3 w-3" />
                        <span>{resource.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Community Stats */}
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white text-sm">
                <Users className="h-4 w-4 text-blue-400" />
                Community Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Total Members</span>
                <span className="text-white font-medium">50,247</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Active Today</span>
                <span className="text-green-400 font-medium">2,431</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Discussions</span>
                <span className="text-white font-medium">12,890</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Resources Shared</span>
                <span className="text-white font-medium">8,456</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CommunityHub;

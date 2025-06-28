
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Users, Clock, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

interface Room {
  id: string;
  name: string;
  participants: number;
  lastActive: Date;
  language: string;
}

export const RoomManager: React.FC = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState('');
  const [roomName, setRoomName] = useState('');
  const [copiedRoom, setCopiedRoom] = useState<string | null>(null);
  
  // Mock recent rooms - in a real app, this would come from your backend
  const [recentRooms] = useState<Room[]>([
    {
      id: 'project-alpha',
      name: 'Project Alpha',
      participants: 3,
      lastActive: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      language: 'javascript'
    },
    {
      id: 'react-workshop',
      name: 'React Workshop',
      participants: 1,
      lastActive: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      language: 'typescript'
    }
  ]);

  const generateRoomId = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const handleCreateRoom = () => {
    const newRoomId = generateRoomId();
    navigate(`/editor/${newRoomId}`);
    toast.success(`Created room: ${newRoomId}`);
  };

  const handleJoinRoom = () => {
    if (!roomId.trim()) {
      toast.error('Please enter a room ID');
      return;
    }
    navigate(`/editor/${roomId.trim()}`);
  };

  const handleJoinRecentRoom = (room: Room) => {
    navigate(`/editor/${room.id}`);
  };

  const copyRoomLink = async (roomId: string) => {
    const link = `${window.location.origin}/editor/${roomId}`;
    try {
      await navigator.clipboard.writeText(link);
      setCopiedRoom(roomId);
      toast.success('Room link copied to clipboard!');
      setTimeout(() => setCopiedRoom(null), 2000);
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Collaborative Code Editor
        </h1>
        <p className="text-muted-foreground">
          Create or join a room to start coding together in real-time
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Create New Room */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span>Create New Room</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={handleCreateRoom}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Create Room
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              A unique room ID will be generated automatically
            </p>
          </CardContent>
        </Card>

        {/* Join Existing Room */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Join Room</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Enter room ID..."
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleJoinRoom()}
            />
            <Button onClick={handleJoinRoom} variant="outline" className="w-full">
              Join Room
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Rooms */}
      {recentRooms.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Recent Rooms</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentRooms.map((room) => (
                <div
                  key={room.id}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium">{room.name}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {room.language}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center space-x-1">
                        <Users className="h-3 w-3" />
                        <span>{room.participants} active</span>
                      </span>
                      <span>{formatTimeAgo(room.lastActive)}</span>
                      <code className="bg-muted px-2 py-1 rounded text-xs">
                        {room.id}
                      </code>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyRoomLink(room.id)}
                    >
                      {copiedRoom === room.id ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      onClick={() => handleJoinRecentRoom(room)}
                      size="sm"
                    >
                      Join
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

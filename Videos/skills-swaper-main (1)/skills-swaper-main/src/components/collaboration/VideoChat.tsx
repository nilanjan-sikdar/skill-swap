
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Video, VideoOff, Mic, MicOff, Phone, MessageSquare, Users } from 'lucide-react';

interface VideoChatProps {
  sessionId: string;
}

export const VideoChat = ({ sessionId }: VideoChatProps) => {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="h-full bg-gray-800 flex">
      <div className="flex-1 flex items-center justify-center relative">
        <div className="w-32 h-24 bg-gray-700 rounded-lg flex items-center justify-center mr-4">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-semibold">You</span>
          </div>
        </div>
        
        <div className="w-32 h-24 bg-gray-700 rounded-lg flex items-center justify-center">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-semibold">User</span>
          </div>
        </div>
        
        <div className="absolute bottom-4 left-4 flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMicOn(!isMicOn)}
            className={`${isMicOn ? 'text-white' : 'text-red-400'} hover:bg-gray-700`}
          >
            {isMicOn ? <Mic size={16} /> : <MicOff size={16} />}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVideoOn(!isVideoOn)}
            className={`${isVideoOn ? 'text-white' : 'text-red-400'} hover:bg-gray-700`}
          >
            {isVideoOn ? <Video size={16} /> : <VideoOff size={16} />}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-red-400 hover:bg-red-500 hover:text-white"
          >
            <Phone size={16} />
          </Button>
        </div>
        
        <div className="absolute bottom-4 right-4 flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowChat(!showChat)}
            className="text-gray-400 hover:text-white hover:bg-gray-700"
          >
            <MessageSquare size={16} />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white hover:bg-gray-700"
          >
            <Users size={16} />
          </Button>
        </div>
      </div>
      
      {showChat && (
        <div className="w-80 bg-gray-900 border-l border-gray-700 flex flex-col">
          <div className="h-10 bg-gray-800 border-b border-gray-700 flex items-center px-4">
            <span className="text-sm text-gray-300">Chat</span>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-3">
              <div className="text-sm">
                <span className="text-blue-400 font-medium">You:</span>
                <span className="text-gray-300 ml-2">Hey, let's start coding!</span>
              </div>
            </div>
          </div>
          
          <div className="p-4 border-t border-gray-700">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full bg-gray-800 text-white border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      )}
    </div>
  );
};

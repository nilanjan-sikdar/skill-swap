
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Clock, Users, Settings, X } from 'lucide-react';

interface CollaborationHeaderProps {
  title: string;
  startTime: Date;
  onExit: () => void;
}

export const CollaborationHeader = ({ title, startTime, onExit }: CollaborationHeaderProps) => {
  const [elapsed, setElapsed] = useState('00:00');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = now.getTime() - startTime.getTime();
      const minutes = Math.floor(diff / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setElapsed(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  return (
    <div className="h-12 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-4">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-white font-medium">{title}</span>
        </div>
        
        <div className="flex items-center space-x-1 text-gray-400">
          <Clock size={16} />
          <span className="text-sm font-mono">{elapsed}</span>
        </div>
        
        <div className="flex items-center space-x-1 text-gray-400">
          <Users size={16} />
          <span className="text-sm">2 participants</span>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
          <Settings size={16} />
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onExit}
          className="text-gray-400 hover:text-red-400"
        >
          <X size={16} />
          Exit
        </Button>
      </div>
    </div>
  );
};

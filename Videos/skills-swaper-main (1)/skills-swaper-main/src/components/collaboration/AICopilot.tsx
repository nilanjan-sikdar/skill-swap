
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Bot, Send, X, Minimize2 } from 'lucide-react';

interface AICopilotProps {
  isOpen: boolean;
  onToggle: () => void;
  sessionId: string;
}

export const AICopilot = ({ isOpen, onToggle, sessionId }: AICopilotProps) => {
  const [message, setMessage] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // TODO: Implement AI chat functionality
    console.log('Sending message to AI:', message);
    setMessage('');
  };

  if (!isOpen) {
    return (
      <Button
        onClick={onToggle}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg"
      >
        <Bot size={24} className="text-white" />
      </Button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 bg-gray-800 border border-gray-600 rounded-lg shadow-xl transition-all duration-300 ${
      isMinimized ? 'w-80 h-12' : 'w-96 h-96'
    }`}>
      <div className="h-12 bg-gray-700 rounded-t-lg flex items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <Bot size={20} className="text-blue-400" />
          <span className="text-white font-medium">AI Copilot</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-gray-400 hover:text-white p-1"
          >
            <Minimize2 size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="text-gray-400 hover:text-white p-1"
          >
            <X size={16} />
          </Button>
        </div>
      </div>
      
      {!isMinimized && (
        <>
          <div className="h-72 p-4 overflow-y-auto">
            <div className="space-y-3">
              <div className="bg-gray-700 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Bot size={16} className="text-blue-400" />
                  <span className="text-sm font-medium text-blue-400">AI Copilot</span>
                </div>
                <p className="text-sm text-gray-300">
                  Hi! I'm here to help you with your collaboration session. You can ask me about:
                </p>
                <ul className="text-sm text-gray-300 mt-2 space-y-1">
                  <li>• Code review and suggestions</li>
                  <li>• Debugging assistance</li>
                  <li>• Best practices</li>
                  <li>• Documentation help</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="p-4 border-t border-gray-600">
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me anything..."
                className="flex-1 bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              />
              <Button
                onClick={handleSendMessage}
                size="sm"
                className="bg-blue-500 hover:bg-blue-600"
              >
                <Send size={16} />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

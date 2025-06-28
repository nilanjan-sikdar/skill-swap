
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CollaborativeEditor } from '@/components/collaboration/CollaborativeEditor';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Settings, Share, Copy, Check, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

const Editor: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const [language, setLanguage] = useState('javascript');
  const [theme, setTheme] = useState('vs-dark');
  const [isConnected, setIsConnected] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    if (!roomId) {
      navigate('/collaboration');
      return;
    }
  }, [roomId, navigate]);

  const handleBackToRooms = () => {
    navigate('/collaboration');
  };

  const handleShareRoom = async () => {
    const link = `${window.location.origin}/editor/${roomId}`;
    try {
      await navigator.clipboard.writeText(link);
      setLinkCopied(true);
      toast.success('Room link copied! Share this with others to collaborate together.');
      setTimeout(() => setLinkCopied(false), 3000);
    } catch (err) {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = link;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setLinkCopied(true);
      toast.success('Room link copied! Share this with others to collaborate together.');
      setTimeout(() => setLinkCopied(false), 3000);
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'json', label: 'JSON' },
    { value: 'markdown', label: 'Markdown' },
    { value: 'sql', label: 'SQL' }
  ];

  const themes = [
    { value: 'vs-dark', label: 'Dark' },
    { value: 'light', label: 'Light' },
    { value: 'hc-black', label: 'High Contrast' }
  ];

  if (!roomId) {
    return null;
  }

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="h-14 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shrink-0">
        <div className="h-full px-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToRooms}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Rooms</span>
            </Button>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Room:</span>
              <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
                {roomId}
              </code>
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Language Selector */}
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-32 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Theme Selector */}
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger className="w-28 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {themes.map((t) => (
                  <SelectItem key={t.value} value={t.value}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Refresh Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              className="flex items-center space-x-2 h-8"
              title="Refresh connection"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>

            {/* Share Button */}
            <Button
              variant="default"
              size="sm"
              onClick={handleShareRoom}
              className="flex items-center space-x-2 h-8"
            >
              {linkCopied ? (
                <Check className="h-4 w-4 text-white" />
              ) : (
                <Share className="h-4 w-4" />
              )}
              <span>Invite Others</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Editor - Takes remaining space */}
      <div className="flex-1 min-h-0">
        <CollaborativeEditor
          roomId={roomId}
          language={language}
          theme={theme}
          onConnectionChange={setIsConnected}
        />
      </div>

      {/* Connection Status Toast */}
      {!isConnected && (
        <div className="fixed bottom-4 right-4 z-50">
          <Card className="bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800">
            <CardContent className="p-3">
              <div className="flex items-center space-x-2 text-yellow-800 dark:text-yellow-200">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium">
                  Connecting to collaboration server...
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Editor;

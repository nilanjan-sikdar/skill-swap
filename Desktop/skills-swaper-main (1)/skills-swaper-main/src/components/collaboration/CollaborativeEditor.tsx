
import React, { useEffect, useRef, useState } from 'react';
import { Editor } from '@monaco-editor/react';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { MonacoBinding } from 'y-monaco';
import { Badge } from '@/components/ui/badge';
import { Users, Wifi, WifiOff } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface CollaborativeEditorProps {
  roomId: string;
  language?: string;
  theme?: string;
  onConnectionChange?: (connected: boolean) => void;
}

interface UserPresence {
  name: string;
  color: string;
  cursor: { line: number; column: number } | null;
}

export const CollaborativeEditor: React.FC<CollaborativeEditorProps> = ({
  roomId,
  language = 'javascript',
  theme = 'vs-dark',
  onConnectionChange
}) => {
  const { user } = useAuth();
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<any>(null);
  const docRef = useRef<Y.Doc | null>(null);
  const providerRef = useRef<WebsocketProvider | null>(null);
  const bindingRef = useRef<MonacoBinding | null>(null);
  
  const [isConnected, setIsConnected] = useState(false);
  const [connectedUsers, setConnectedUsers] = useState<Map<string, UserPresence>>(new Map());
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');

  // Generate user color based on user ID
  const getUserColor = (userId: string) => {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', 
      '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'
    ];
    const hash = userId.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    return colors[Math.abs(hash) % colors.length];
  };

  useEffect(() => {
    if (!user) return;

    console.log('Setting up collaborative editor for room:', roomId);

    // Create Yjs document
    const doc = new Y.Doc();
    docRef.current = doc;

    // Try multiple WebSocket servers for better reliability
    const wsUrls = [
      'wss://demos.yjs.dev',
      'ws://localhost:1234',
      'wss://y-websocket-server.herokuapp.com'
    ];

    let provider: WebsocketProvider | null = null;
    let currentUrlIndex = 0;

    const tryConnect = () => {
      if (currentUrlIndex >= wsUrls.length) {
        console.error('Failed to connect to any WebSocket server');
        setConnectionStatus('disconnected');
        setIsConnected(false);
        onConnectionChange?.(false);
        return;
      }

      const wsUrl = wsUrls[currentUrlIndex];
      console.log('Trying WebSocket server:', wsUrl);

      provider = new WebsocketProvider(
        wsUrl,
        `skillsync-${roomId}`,
        doc,
        {
          connect: true,
          maxBackoffTime: 2500,
        }
      );

      providerRef.current = provider;

      // Set up user awareness
      provider.awareness.setLocalStateField('user', {
        name: user.email?.split('@')[0] || 'Anonymous',
        color: getUserColor(user.id),
        id: user.id
      });

      // Handle connection events with timeout
      const connectionTimeout = setTimeout(() => {
        if (!isConnected) {
          console.log('Connection timeout, trying next server...');
          provider?.destroy();
          currentUrlIndex++;
          tryConnect();
        }
      }, 5000);

      provider.on('status', (event: any) => {
        console.log('WebSocket status:', event.status);
        const connected = event.status === 'connected';
        
        if (connected) {
          clearTimeout(connectionTimeout);
          setIsConnected(true);
          setConnectionStatus('connected');
          onConnectionChange?.(true);
          toast.success('Connected to collaboration server!');
        } else if (event.status === 'disconnected') {
          setIsConnected(false);
          setConnectionStatus('disconnected');
          onConnectionChange?.(false);
          
          if (currentUrlIndex === 0) {
            setTimeout(() => {
              currentUrlIndex++;
              tryConnect();
            }, 1000);
          }
        }
      });

      // Handle awareness changes (user presence)
      provider.awareness.on('change', () => {
        const users = new Map<string, UserPresence>();
        provider.awareness.getStates().forEach((state: any, clientId: number) => {
          if (state.user && clientId !== provider.awareness.clientID) {
            users.set(clientId.toString(), {
              name: state.user.name,
              color: state.user.color,
              cursor: state.cursor || null
            });
          }
        });
        setConnectedUsers(users);
        console.log('Connected users:', users.size);
      });
    };

    tryConnect();

    return () => {
      console.log('Cleaning up collaborative editor');
      if (bindingRef.current) {
        bindingRef.current.destroy();
      }
      if (providerRef.current) {
        providerRef.current.destroy();
      }
      if (docRef.current) {
        docRef.current.destroy();
      }
    };
  }, [roomId, user, onConnectionChange]);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    console.log('Monaco editor mounted');
    editorRef.current = editor;
    monacoRef.current = monaco;

    // Wait a bit for the provider to be ready
    setTimeout(() => {
      if (docRef.current && providerRef.current) {
        // Get the shared text type
        const ytext = docRef.current.getText('monaco');
        
        // Create Monaco binding
        const binding = new MonacoBinding(
          ytext,
          editor.getModel(),
          new Set([editor]),
          providerRef.current.awareness
        );
        bindingRef.current = binding;

        // Handle cursor position changes
        editor.onDidChangeCursorPosition((e: any) => {
          if (providerRef.current) {
            providerRef.current.awareness.setLocalStateField('cursor', {
              line: e.position.lineNumber,
              column: e.position.column
            });
          }
        });

        console.log('Monaco binding created successfully');
      }
    }, 1000);

    // Set initial content if empty
    setTimeout(() => {
      if (!editor.getValue()) {
        editor.setValue(`// Welcome to SkillSync Collaborative Editor!
// Room ID: ${roomId}
// 
// Share the room link to invite others to code with you.
// Everyone in this room can edit this code in real-time!

console.log("Hello, collaborative coding!");

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Try editing this code - others will see your changes live!
console.log("Fibonacci sequence:");
for (let i = 0; i < 10; i++) {
  console.log(\`fibonacci(\${i}) = \${fibonacci(i)}\`);
}

// Add your own code here:

`);
      }
    }, 500);
  };

  const getConnectionIcon = () => {
    switch (connectionStatus) {
      case 'connected':
        return <Wifi className="h-4 w-4 text-green-500" />;
      case 'connecting':
        return <div className="h-4 w-4 animate-spin rounded-full border-2 border-yellow-500 border-t-transparent" />;
      default:
        return <WifiOff className="h-4 w-4 text-red-500" />;
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Connection Status Header - Fixed height */}
      <div className="h-10 px-4 bg-background border-b flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            {getConnectionIcon()}
            <span className="text-sm font-medium capitalize">
              {connectionStatus}
            </span>
          </div>
          <Badge variant="outline" className="flex items-center space-x-1">
            <Users className="h-3 w-3" />
            <span>{connectedUsers.size + 1}</span>
          </Badge>
        </div>
        
        {connectedUsers.size > 0 && (
          <div className="flex items-center space-x-2">
            <span className="text-xs text-muted-foreground">Online:</span>
            <div className="flex space-x-1">
              {Array.from(connectedUsers.values()).slice(0, 5).map((user, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium"
                  style={{ backgroundColor: user.color + '20', color: user.color }}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: user.color }}
                  />
                  <span>{user.name}</span>
                </div>
              ))}
              {connectedUsers.size > 5 && (
                <span className="text-xs text-muted-foreground">+{connectedUsers.size - 5}</span>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Editor - Takes all remaining space */}
      <div className="flex-1">
        <Editor
          height="100%"
          width="100%"
          language={language}
          theme={theme}
          onMount={handleEditorDidMount}
          options={{
            automaticLayout: true,
            fontSize: 14,
            lineHeight: 20,
            fontFamily: "'Fira Code', 'Cascadia Code', 'JetBrains Mono', Consolas, monospace",
            padding: { top: 16, bottom: 16 },
            lineNumbers: 'on',
            minimap: { enabled: true, side: 'right' },
            scrollBeyendLastLine: false,
            tabSize: 2,
            insertSpaces: true,
            wordWrap: 'on',
            renderWhitespace: 'selection',
            cursorBlinking: 'smooth',
            smoothScrolling: true,
            selectOnLineNumbers: true,
            roundedSelection: false,
            readOnly: false,
            cursorStyle: 'line',
            mouseWheelZoom: true,
            contextmenu: true,
            folding: true,
            foldingHighlight: true,
            bracketPairColorization: {
              enabled: true
            }
          }}
        />
      </div>
    </div>
  );
};

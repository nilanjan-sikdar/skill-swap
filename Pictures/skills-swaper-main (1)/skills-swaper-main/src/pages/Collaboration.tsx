
import { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { MonacoBinding } from 'y-monaco';
import { FaCopy, FaExpand, FaCompress, FaCheck, FaPlay, FaRobot } from 'react-icons/fa';

const ZEGO_APP_ID = 1378806013;
const ZEGO_SERVER_SECRET = 'a38725e3bc2718190ac7574633ffb6f9';

export default function Collaboration() {
  const [roomName, setRoomName] = useState('');
  const [joined, setJoined] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [output, setOutput] = useState<string>('');
  const editorRef = useRef<any>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const ydocRef = useRef<Y.Doc | null>(null);
  const providerRef = useRef<WebrtcProvider | null>(null);
  const zpRef = useRef<any>(null);

  const initVideoCall = async () => {
    if (!roomName || !videoContainerRef.current) return;

    try {
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        ZEGO_APP_ID,
        ZEGO_SERVER_SECRET,
        roomName,
        Date.now().toString(),
        'User' + Math.floor(Math.random() * 1000)
      );

      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zpRef.current = zp;

      await zp.joinRoom({
        container: videoContainerRef.current,
        scenario: {
          mode: ZegoUIKitPrebuilt.VideoConference,
        },
        showPreJoinView: false,
        showLeavingView: false,
        turnOnCameraWhenJoining: true,
        turnOnMicrophoneWhenJoining: true,
        showAudioVideoSettingsButton: true,
        showScreenSharingButton: true,
        layout: "Auto",
        maxUsers: 4,
      });
    } catch (err) {
      console.error('Video init failed:', err);
    }
  };

  const initCollaborativeEditor = () => {
    if (!roomName || !editorRef.current) return;

    ydocRef.current = new Y.Doc();
    providerRef.current = new WebrtcProvider(roomName, ydocRef.current);

    const ytext = ydocRef.current.getText('monaco');
    new MonacoBinding(
      ytext,
      editorRef.current.getModel(),
      new Set([editorRef.current]),
      providerRef.current.awareness
    );
  };

  const handleJoinRoom = () => {
    if (!roomName) return;
    window.history.pushState({}, '', `?room=${encodeURIComponent(roomName)}`);
    setJoined(true);
  };

  const copyRoomLink = () => {
    const link = `${window.location.origin}${window.location.pathname}?room=${encodeURIComponent(roomName)}`;
    navigator.clipboard.writeText(link)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch(err => console.error('Copy failed:', err));
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const runCode = () => {
    try {
      const code = editorRef.current?.getValue();
      // Capture console.log output
      const originalConsoleLog = console.log;
      let logs: string[] = [];
      
      console.log = (...args) => {
        logs.push(args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' '));
        originalConsoleLog(...args);
      };

      // Execute the code
      const result = new Function(code)();
      
      // Restore original console.log
      console.log = originalConsoleLog;

      // Display output
      if (logs.length > 0) {
        setOutput(logs.join('\n'));
      } else if (result !== undefined) {
        setOutput(typeof result === 'object' ? JSON.stringify(result, null, 2) : String(result));
      } else {
        setOutput('Code executed successfully (no output)');
      }
    } catch (error: any) {
      setOutput(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    return () => {
      if (zpRef.current) zpRef.current.destroy();
      providerRef.current?.destroy();
      ydocRef.current?.destroy();
    };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlRoom = params.get('room');
    if (urlRoom) {
      setRoomName(urlRoom);
      setJoined(true);
    }
  }, []);

  useEffect(() => {
    if (joined) {
      initCollaborativeEditor();
      initVideoCall();
    }
  }, [joined]);

  return (
    <div className={`flex flex-col h-screen w-screen ${isFullscreen ? 'fixed inset-0 z-50 bg-white' : 'bg-gray-100'}`}>
      {!joined ? (
        <div className="flex items-center justify-center flex-1 bg-gradient-to-br from-gray-900 to-gray-800">
          <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-96 border border-gray-700">
            <h1 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Live Code Collaboration
            </h1>
            <input
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="Enter room name"
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyDown={(e) => e.key === 'Enter' && handleJoinRoom()}
            />
            <button
              onClick={handleJoinRoom}
              disabled={!roomName}
              className={`w-full p-3 rounded-lg text-white font-medium transition-all duration-300 ${
                roomName 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-blue-500/30' 
                  : 'bg-gray-600 cursor-not-allowed'
              }`}
            >
              Join Room
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-gray-900 text-white p-3 flex justify-between items-center border-b border-gray-700">
            <h2 className="font-bold text-sm md:text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Room: {roomName}
            </h2>
            <div className="flex gap-3">
              <button
                onClick={copyRoomLink}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  isCopied
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                }`}
              >
                {isCopied ? (
                  <>
                    <FaCheck className="text-white" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <FaCopy className="text-blue-400" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
              <button
                onClick={toggleFullscreen}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg transition-all duration-300"
              >
                {isFullscreen ? (
                  <>
                    <FaCompress className="text-purple-400" />
                    <span>Exit Fullscreen</span>
                  </>
                ) : (
                  <>
                    <FaExpand className="text-purple-400" />
                    <span>Fullscreen</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className={`flex-1 flex ${isFullscreen ? 'flex-col' : 'flex-col md:flex-row'} overflow-hidden`}>
            {/* Video Container */}
            {!isFullscreen && (
              <div 
                ref={videoContainerRef} 
                className={`${isFullscreen ? 'hidden' : 'md:w-1/2'} bg-gray-900`}
                style={{ minHeight: '40vh' }}
              />
            )}

            {/* Editor Container */}
            <div className={`${isFullscreen ? 'w-full' : 'md:w-1/2'} flex flex-col`} style={{ height: '100%' }}>
              <div className="flex-1 overflow-hidden">
                <Editor
                  height="100%"
                  width="100%"
                  defaultLanguage="javascript"
                  defaultValue={`// Write JavaScript below and click Run\n// Use console.log() to see output\n\nfunction greet() {\n  console.log("Hello world");\n  return "Greeting complete";\n}\n\ngreet();`}
                  theme="vs-dark"
                  onMount={(editor) => {
                    editorRef.current = editor;
                    if (joined) initCollaborativeEditor();
                  }}
                  options={{
                    minimap: { enabled: true },
                    fontSize: 16,
                    automaticLayout: true,
                  }}
                />
              </div>

              {/* Run Button & Output */}
              <div className="bg-gray-900 p-4 border-t border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <button
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-green-500/20"
                    onClick={runCode}
                  >
                    <FaPlay className="text-xs" />
                    <span>Run Code</span>
                  </button>
                  <span className="text-sm text-gray-400 bg-gray-800 px-3 py-1 rounded-full">
                    JavaScript
                  </span>
                </div>
                {output && (
                  <div className="mt-2 bg-gray-800 text-white p-3 rounded-lg font-mono text-sm overflow-auto" style={{ maxHeight: '200px' }}>
                    <div className="flex justify-between items-center mb-1">
                      <strong className="text-blue-400">Output:</strong>
                      <button 
                        onClick={() => setOutput('')}
                        className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded transition-colors"
                      >
                        Clear
                      </button>
                    </div>
                    <pre className="whitespace-pre-wrap text-gray-200">{output}</pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

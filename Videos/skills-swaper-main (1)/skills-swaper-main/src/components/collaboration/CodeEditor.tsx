
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Save, FileText } from 'lucide-react';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const CodeEditor = ({ value, onChange }: CodeEditorProps) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    
    // Debounce the onChange call
    const timeoutId = setTimeout(() => {
      onChange(newValue);
    }, 500);

    return () => clearTimeout(timeoutId);
  };

  return (
    <div className="h-full flex flex-col bg-gray-900">
      <div className="h-10 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <FileText size={16} className="text-gray-400" />
          <span className="text-sm text-gray-300">main.js</span>
          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <Save size={14} />
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-green-400">
            <Play size={14} />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 relative">
        <textarea
          value={localValue}
          onChange={handleChange}
          className="w-full h-full bg-gray-900 text-gray-100 p-4 resize-none border-none outline-none font-mono text-sm leading-relaxed"
          placeholder="// Start coding together..."
          spellCheck={false}
        />
        
        <div className="absolute bottom-4 right-4 text-xs text-gray-500">
          Line 1, Column 1
        </div>
      </div>
    </div>
  );
};

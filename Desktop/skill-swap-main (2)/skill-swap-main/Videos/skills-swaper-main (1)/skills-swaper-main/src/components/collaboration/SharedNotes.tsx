
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { StickyNote, Bold, Italic, List } from 'lucide-react';

interface SharedNotesProps {
  value: string;
  onChange: (value: string) => void;
}

export const SharedNotes = ({ value, onChange }: SharedNotesProps) => {
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
    <div className="h-full flex flex-col bg-gray-850">
      <div className="h-10 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <StickyNote size={16} className="text-gray-400" />
          <span className="text-sm text-gray-300">Shared Notes</span>
        </div>
        
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
            <Bold size={12} />
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
            <Italic size={12} />
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
            <List size={12} />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 p-4">
        <textarea
          value={localValue}
          onChange={handleChange}
          className="w-full h-full bg-transparent text-gray-100 resize-none border-none outline-none text-sm leading-relaxed"
          placeholder="Add your notes here... 
          
• Meeting agenda
• Key decisions
• Action items
• Ideas & thoughts"
        />
      </div>
    </div>
  );
};

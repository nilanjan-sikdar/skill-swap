
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { X, Filter } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface TagFilterProps {
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

export const TagFilter = ({ selectedTags, onTagsChange }: TagFilterProps) => {
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    const { data } = await supabase
      .from("discussions")
      .select("tags")
      .not("tags", "is", null);

    if (data) {
      const allTags = data.flatMap(d => d.tags || []);
      const uniqueTags = Array.from(new Set(allTags));
      setAvailableTags(uniqueTags);
    }
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter(t => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  const removeTag = (tag: string) => {
    onTagsChange(selectedTags.filter(t => t !== tag));
  };

  const filteredTags = availableTags.filter(tag => 
    tag.toLowerCase().includes(tagInput.toLowerCase()) && 
    !selectedTags.includes(tag)
  );

  return (
    <div className="space-y-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start">
            <Filter className="h-4 w-4 mr-2" />
            Filter by tags
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-3">
            <Input
              placeholder="Search tags..."
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
            />
            <div className="max-h-40 overflow-y-auto space-y-1">
              {filteredTags.map(tag => (
                <Button
                  key={tag}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedTags.map(tag => (
            <Badge key={tag} variant="secondary" className="flex items-center gap-1">
              {tag}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => removeTag(tag)}
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

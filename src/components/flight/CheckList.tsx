
import React from 'react';
import { Card } from "@/components/ui/card";
import { ListChecks } from 'lucide-react';

interface CheckListProps {
  items: string[];
  completedItems: string[];
  onItemToggle: (item: string) => void;
}

export const CheckList = ({ items, completedItems, onItemToggle }: CheckListProps) => {
  return (
    <Card className="p-6 bg-black/80 shadow-lg rounded-xl border-[#ea384c]/20">
      <div className="flex items-center gap-2 mb-4">
        <ListChecks className="h-5 w-5 text-[#ea384c]" />
        <h2 className="text-lg font-semibold text-white">Flight Checklist</h2>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onItemToggle(item)}
          >
            <div className={`w-5 h-5 rounded border ${
              completedItems.includes(item)
                ? 'bg-[#ea384c] border-[#ea384c]'
                : 'border-gray-400'
            } flex items-center justify-center`}>
              {completedItems.includes(item) && (
                <span className="text-white text-sm">✓</span>
              )}
            </div>
            <span className={`text-sm ${
              completedItems.includes(item)
                ? 'text-gray-400 line-through'
                : 'text-white'
            }`}>
              {item}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

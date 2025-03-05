
import React from 'react';
import { Card } from "@/components/ui/card";
import { ListCheck, Check } from 'lucide-react';

export const CheckList = () => {
  return (
    <Card className="p-6 bg-black/80 shadow-lg rounded-xl border-[#ea384c]/20">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <ListCheck className="h-5 w-5 text-[#ea384c]" />
          Flight Check List
        </h2>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-white/80">
          <Check className="h-4 w-4 text-[#ea384c]" />
          <span>Pre-flight checks complete</span>
        </div>
        <div className="flex items-center gap-2 text-white/80">
          <Check className="h-4 w-4 text-[#ea384c]" />
          <span>Safety briefing completed</span>
        </div>
        <div className="flex items-center gap-2 text-white/80">
          <Check className="h-4 w-4 text-[#ea384c]" />
          <span>Cabin secured</span>
        </div>
      </div>
    </Card>
  );
};

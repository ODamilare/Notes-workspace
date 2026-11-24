"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
type NotesSearchProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function NotesSearch({
  value,
  onChange,
  placeholder = "Search notes...",
}: NotesSearchProps) {
  return (
    <div className="relative w-full max-w-md">
      <Search
        className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#98a1b1]"
        aria-hidden="true"
      />

     <Input
  type="search"
  value={value}
  onChange={(event) => onChange(event.target.value)}
  placeholder={placeholder}
  aria-label="Search notes"
  className="
    h-10
    w-full
    rounded-lg
    border
    border-[#dfe4ec]
    bg-white
    pl-9
    pr-3
    text-[13px]
    text-[#14213d]
    shadow-none
    outline-none
    placeholder:text-[#98a1b1]
    transition-colors
    focus-visible:border-[#4963e7]
    focus-visible:ring-2
    focus-visible:ring-[#4963e7]/10
  "
/>
    </div>
  );
}
"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Item {
  id: number | string;
  name: string;
  [key: string]: any;
}

interface GenericSelectorProps<T extends Item> {
  items: T[];
  selectedValue: string;
  onValueChange: (value: string, item?: T) => void;
  placeholder?: string;
  label?: string;
  isLoading?: boolean;
  error?: Error | null;
  className?: string;
}

export function GenericSelector<T extends Item>({
  items,
  selectedValue,
  onValueChange,
  placeholder = "Select an item",
  label = "Available Items",
  isLoading = false,
  error = null,
  className = "w-full max-w-xs",
}: Readonly<GenericSelectorProps<T>>) {
  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>Error loading items: {error?.message || "An error occurred"}</p>
      </div>
    );
  }

  const handleChange = (value: string) => {
    const selectedItem = items.find((item) => item.id.toString() === value);
    onValueChange(value, selectedItem);
  };

  return (
    <div className={className}>
      <Select onValueChange={handleChange} value={selectedValue}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {items?.length > 0 ? (
              items.map((item) => (
                <SelectItem key={item.id} value={item.id.toString()}>
                  {item.name}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="no-items" disabled>
                {isLoading ? "Loading..." : "No items available"}
              </SelectItem>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

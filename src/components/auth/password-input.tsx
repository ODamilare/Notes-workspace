"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
type PasswordInputProps = Omit<
  React.ComponentProps<typeof Input>,
  "type" | "onChange"
> & {
  onChange?: (value: string) => void;
};

export function PasswordInput({
  className,
  onChange,
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="relative">
      <Input
        {...props}
        type={showPassword ? "text" : "password"}
        onChange={(event) => onChange?.(event.target.value)}
        className={cn(
          "h-[41px] rounded-[5px] border-[#d7dce5] bg-white px-3 pr-10 text-[14px] text-[#14213d] shadow-none placeholder:text-[#9aa3b5] focus-visible:border-[#4963e7] focus-visible:ring-[3px] focus-visible:ring-[#4963e7]/10",
          className
        )}
      />

    <Button
  type="button"
  variant="ghost"
  size="icon"
  onClick={() => setShowPassword((value) => !value)}
  aria-label={showPassword ? "Hide password" : "Show password"}
  className="absolute right-2.5 top-1/2 size-7 -translate-y-1/2 rounded-md text-[#8993a6] hover:bg-[#f1f4fa] hover:text-[#4d5b76]"
>
        {showPassword ? (
          <EyeOff className="size-[17px]" aria-hidden="true" />
        ) : (
          <Eye className="size-[17px]" aria-hidden="true" />
        )}
      </Button>
    </div>
  );
}
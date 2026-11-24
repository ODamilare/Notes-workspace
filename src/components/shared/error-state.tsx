"use client";

import { AlertCircle, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";

type ErrorStateProps = {
  message: string;
  onRetry: () => void;
};

export function ErrorState({
  message,
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex min-h-[280px] items-center justify-center px-4">
      <div className="flex w-full max-w-md flex-col items-center text-center">
        <div
          className="
            mb-4
            flex
            size-11
            items-center
            justify-center
            rounded-full
            bg-[#fff4f4]
            text-[#d64545]
          "
        >
          <AlertCircle className="size-5" aria-hidden="true" />
        </div>

        <h2 className="text-[15px] font-semibold text-[#14213d]">
          Something went wrong
        </h2>

        <p className="mt-2 max-w-sm text-[13px] leading-[1.6] text-[#778299]">
          {message}
        </p>

        <Button
          type="button"
          onClick={onRetry}
          variant="outline"
          className="
            mt-5
            h-9
            rounded-[6px]
            border-[#d6dce6]
            bg-white
            px-4
            text-[13px]
            font-semibold
            text-[#4963e7]
            shadow-none
            hover:border-[#c5cde0]
            hover:bg-[#f7f8ff]
            hover:text-[#3d55d5]
            focus-visible:border-[#4963e7]
            focus-visible:ring-2
            focus-visible:ring-[#4963e7]/20
          "
        >
          <RefreshCw className="mr-2 size-4" aria-hidden="true" />
          Try again
        </Button>
      </div>
    </div>
  );
}
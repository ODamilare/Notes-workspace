import { FileText, Plus, Sparkles } from "lucide-react";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

import { Button } from "@/components/ui/button";

type EmptyStateProps = {
  onCreate: () => void;
};

export function EmptyState({
  onCreate,
}: EmptyStateProps) {
  return (
    <div
      data-testid="notes-empty"
      className="flex min-h-[calc(100vh-150px)] items-center justify-center px-4"
    >
      <Empty className="max-w-[430px]">
        <EmptyHeader className="gap-0">
          {/* Illustration */}
          <div className="relative mx-auto mb-7">
            {/* Decorative sparkle */}
            <Sparkles
              className="absolute -left-8 top-3 size-4 rotate-[-15deg] text-[#7c8bea]"
              aria-hidden="true"
            />

            {/* Decorative dot */}
            <span
              className="absolute -right-7 top-10 size-2 rounded-full bg-[#aeb8f5]"
              aria-hidden="true"
            />

            {/* Decorative dot */}
            <span
              className="absolute -bottom-1 -left-5 size-2 rounded-full bg-[#c1c9f7]"
              aria-hidden="true"
            />

            {/* Decorative sparkle */}
            <Sparkles
              className="absolute -bottom-3 -right-5 size-3 rotate-12 text-[#a2acef]"
              aria-hidden="true"
            />

            {/* Main illustration circle */}
            <EmptyMedia
              variant="icon"
              className="
                relative
                flex
                size-[132px]
                items-center
                justify-center
                rounded-full
                border-0
                bg-[#eef0ff]
                text-[#4963e7]
                shadow-[0_8px_25px_rgba(73,99,231,0.08)]
              "
            >
              <div
                className="
                  flex
                  size-[72px]
                  items-center
                  justify-center
                  rounded-[12px]
                  border-2
                  border-[#4963e7]
                  bg-white
                  shadow-[0_4px_12px_rgba(73,99,231,0.08)]
                "
              >
                <div className="relative flex h-[48px] w-[38px] flex-col items-center justify-center">
                  {/* Folded corner */}
                  <div
                    className="
                      absolute
                      right-[-1px]
                      top-[-1px]
                      size-[12px]
                      rounded-bl-[4px]
                      border-b-2
                      border-l-2
                      border-[#4963e7]
                      bg-white
                    "
                  />

                  <FileText
                    className="size-[34px] stroke-[1.5]"
                    aria-hidden="true"
                  />

                  {/* Writing lines */}
                  <div className="absolute bottom-[10px] left-[8px] h-[2px] w-[21px] rounded-full bg-[#4963e7]" />
                  <div className="absolute bottom-[4px] left-[8px] h-[2px] w-[15px] rounded-full bg-[#aab4ef]" />
                </div>
              </div>
            </EmptyMedia>
          </div>

          <EmptyTitle
            className="
              text-[19px]
              font-semibold
              leading-[1.3]
              tracking-[-0.02em]
              text-[#14213d]
            "
          >
            No notes yet
          </EmptyTitle>

          <EmptyDescription
            className="
              mt-2
              text-[14px]
              font-normal
              leading-[1.5]
              text-[#778299]
            "
          >
            Create your first note
          </EmptyDescription>
        </EmptyHeader>

        <EmptyContent className="mt-5">
          <Button
            type="button"
            onClick={onCreate}
            className="
              h-[40px]
              min-w-[130px]
              rounded-[6px]
              border-0
              bg-gradient-to-br
              from-[#5069e8]
              to-[#3d55d5]
              px-5
              text-[13px]
              font-semibold
              text-white
              shadow-[0_4px_10px_rgba(73,99,231,0.20)]
              transition-all
              hover:from-[#5870ec]
              hover:to-[#4059dc]
              hover:shadow-[0_5px_14px_rgba(73,99,231,0.25)]
              active:translate-y-px
            "
          >
            <Plus
              className="mr-2 size-[16px]"
              aria-hidden="true"
            />
            New note
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  );
}


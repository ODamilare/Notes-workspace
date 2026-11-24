
import { Skeleton } from "@/components/ui/skeleton";

function NoteSkeleton({ delay }: { delay: string }) {
  return (
    <div
      className="
        flex
        h-[230px]
        min-w-0
        flex-col
        overflow-hidden
        rounded-[9px]
        border
        border-[#e1e5ec]
        bg-white
        p-4
        shadow-[0_2px_8px_rgba(20,33,61,0.035)]
      "
      style={{ animationDelay: delay }}
    >
      {/* Card header */}
      <div className="flex items-center justify-between">
        <Skeleton className="size-7 rounded-full" />
        <Skeleton className="size-7 rounded-md" />
      </div>

      {/* Title */}
      <div className="mt-5 space-y-2">
        <Skeleton className="h-[17px] w-[72%] rounded-md" />
        <Skeleton className="h-[10px] w-[35%] rounded-md" />
      </div>

      {/* Content */}
      <div className="mt-5 space-y-2.5">
        <Skeleton className="h-[10px] w-full rounded-md" />
        <Skeleton className="h-[10px] w-[94%] rounded-md" />
        <Skeleton className="h-[10px] w-[72%] rounded-md" />
      </div>

      {/* Category */}
      <Skeleton className="mt-5 h-5 w-[52px] rounded-full" />

      {/* Metadata */}
      <div className="mt-auto flex items-center justify-between">
        <Skeleton className="h-[10px] w-[72px] rounded-md" />
        <Skeleton className="h-[10px] w-[58px] rounded-md" />
      </div>
    </div>
  );
}

export function LoadingState() {
  return (
    <section
      data-testid="notes-loading"
      aria-label="Loading notes"
      className="relative"
    >
      {/* Loading indicator */}
      <div className="mb-4 flex items-center gap-2 text-[12px] font-medium text-[#778299]">
        <span className="relative flex size-4 items-center justify-center">
          <span className="absolute size-4 animate-ping rounded-full bg-[#4963e7]/20" />

          <span className="relative size-2 rounded-full bg-[#4963e7]" />
        </span>

        Loading your notes...
      </div>

      {/* Skeleton cards */}
      <div className="grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <NoteSkeleton delay="0ms" />
        <NoteSkeleton delay="120ms" />
        <NoteSkeleton delay="240ms" />
        <NoteSkeleton delay="360ms" />
        <NoteSkeleton delay="480ms" />
        <NoteSkeleton delay="600ms" />
      </div>
    </section>
  );
}


import { FileText, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main
      className="
        min-h-screen
        w-full
        bg-[#f8faff]
        px-5
        py-10
        sm:px-6
        sm:py-12
      "
    >
      <div className="mx-auto flex w-full max-w-[405px] flex-col items-center">
        {/* Brand */}
        <div className="mb-8 flex items-center gap-3">
          <div
            className="
              flex
              size-9
              shrink-0
              items-center
              justify-center
              rounded-[8px]
              bg-gradient-to-br
              from-[#5570eb]
              to-[#3d56d7]
              shadow-[0_4px_10px_rgba(73,99,231,0.18)]
            "
          >
            <FileText
              className="size-[19px] text-white"
              strokeWidth={2}
              aria-hidden="true"
            />
          </div>

          <span
            className="
              text-[19px]
              font-semibold
              tracking-[-0.025em]
              text-[#17233d]
            "
          >
            Notes Workspace
          </span>
        </div>

        {/* Authentication card */}
        {children}

        {/* Security notice */}
        <div
          className="
            mt-6
            flex
            min-h-[67px]
            w-full
            items-center
            gap-3
            rounded-[8px]
            border
            border-[#ccd7ff]
            bg-[#f3f6ff]
            px-4
            py-3
          "
        >
          <ShieldCheck
            className="size-[27px] shrink-0 text-[#4163e8]"
            strokeWidth={1.8}
            aria-hidden="true"
          />

          <p
            className="
              text-[13px]
              leading-[1.45]
              text-[#52617d]
            "
          >
            Your data is securely encrypted and never shared
            with third parties.
          </p>
        </div>
      </div>
    </main>
  );
}
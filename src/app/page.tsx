
"use client";

import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Layers3,
  LockKeyhole,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import {
  Card,

  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Sparkles,
    title: "Simple by design",
    detail:
      "Capture ideas quickly with a workspace designed to stay out of your way.",
  },
  {
    icon: LockKeyhole,
    title: "Private & secure",
    detail:
      "Your notes belong to you. Secure authentication keeps your workspace protected.",
  },
  {
    icon: Layers3,
    title: "Everything organized",
    detail:
      "Keep your thoughts, ideas, and important information neatly organized in one place.",
  },
];

const notes = [
  {
    title: "Project ideas",
    text: "Ideas for the next project and things worth exploring...",
    color: "bg-[#eef0ff]",
  },
  {
    title: "Meeting notes",
    text: "Important points from today's discussion...",
    color: "bg-[#f1f8f5]",
  },
  {
    title: "Things to remember",
    text: "A few things I want to come back to later...",
    color: "bg-[#fff7e8]",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#fbfcff] text-[#14213d]">
      {/* Background decoration */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-[-300px] h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-[#4963e7]/10 blur-3xl animate-pulse" />

        <div className="absolute right-[-180px] top-[35%] h-[400px] w-[400px] rounded-full bg-[#8b5cf6]/10 blur-3xl" />

        <div className="absolute bottom-[-200px] left-[-150px] h-[400px] w-[400px] rounded-full bg-[#38bdf8]/10 blur-3xl" />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-[#e8ebf2]/80 bg-white/75 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] w-full max-w-6xl items-center justify-between px-6">
          <Link
            href="/"
            className="flex items-center gap-3 transition-opacity hover:opacity-80"
          >
            <div className="flex size-9 items-center justify-center rounded-[9px] bg-gradient-to-br from-[#5c73eb] to-[#3d55d5] text-white shadow-[0_6px_18px_rgba(73,99,231,0.25)]">
              <FileText
                className="size-[18px]"
                strokeWidth={2}
                aria-hidden="true"
              />
            </div>

            <span className="text-[15px] font-semibold tracking-tight">
              Notes Workspace
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="ghost"
              className="hidden text-[#536078] hover:bg-[#f4f5f8] sm:inline-flex"
            >
              <Link href="/login">Sign in</Link>
            </Button>

            <Button
              asChild
              className="rounded-full text-white bg-[#4963e7] px-5 shadow-[0_5px_15px_rgba(73,99,231,0.22)] transition-all hover:-translate-y-0.5 hover:bg-[#3f59d8] hover:shadow-[0_8px_22px_rgba(73,99,231,0.28)]"
            >
              <Link href="/register">Create account</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 pb-20 pt-20 text-center sm:pt-28 lg:pb-28 lg:pt-32">
        <Badge
          variant="secondary"
          className="mb-6 rounded-full border border-[#dfe4ff] bg-[#f1f3ff] px-4 py-1.5 text-[#4963e7] shadow-sm"
        >
          <Sparkles className="mr-1.5 size-3.5" />
          A better way to organize your thoughts
        </Badge>

        <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.045em] text-[#111b35] sm:text-6xl lg:text-7xl">
          Your thoughts.
          <br />
          <span className="bg-gradient-to-r from-[#4963e7] via-[#6957d9] to-[#8b5cf6] bg-clip-text text-transparent">
            Beautifully organized.
          </span>
        </h1>

        <p className="mt-7 max-w-2xl text-base leading-7 text-[#68738a] sm:text-lg sm:leading-8">
          Notes Workspace gives you a simple, focused place to capture ideas,
          organize information, and keep the things that matter close at hand.
        </p>

        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="h-12 rounded-full bg-[#4963e7] px-7 text-white text-[14px] shadow-[0_8px_25px_rgba(73,99,231,0.25)] transition-all hover:-translate-y-1 hover:bg-[#3f59d8] hover:shadow-[0_12px_30px_rgba(73,99,231,0.3)]"
          >
            <Link href="/register">
              Get started
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>

          <Button
            asChild
            variant="ghost"
            size="lg"
            className="h-12 rounded-full px-7 text-[#536078] hover:bg-white hover:shadow-sm"
          >
            <Link href="/login">Sign in</Link>
          </Button>
        </div>

        {/* Product preview */}
        <div className="relative mt-20 w-full max-w-5xl sm:mt-24">
          <div className="absolute inset-x-16 -top-10 h-32 rounded-full bg-[#4963e7]/20 blur-3xl" />

          <div className="relative overflow-hidden rounded-[22px] border border-[#dfe4ec] bg-white text-left shadow-[0_30px_80px_rgba(20,33,61,0.12)] transition-transform duration-700 hover:-translate-y-2">
            {/* Fake browser bar */}
            <div className="flex h-11 items-center gap-2 border-b border-[#e8ebf0] bg-[#fafbfc] px-5">
              <span className="size-2.5 rounded-full bg-[#d9dde5]" />
              <span className="size-2.5 rounded-full bg-[#d9dde5]" />
              <span className="size-2.5 rounded-full bg-[#d9dde5]" />

              <div className="mx-auto hidden h-6 w-48 rounded-md bg-[#f0f2f6] sm:block" />
            </div>

            <div className="grid min-h-[380px] md:grid-cols-[190px_1fr]">
              {/* Sidebar */}
              <aside className="hidden border-r border-[#e8ebf0] bg-[#fbfcfd] p-5 md:block">
                <div className="mb-8 flex items-center gap-2">
                  <div className="flex size-7 items-center justify-center rounded-md bg-[#4963e7] text-white">
                    <FileText className="size-3.5" />
                  </div>

                  <span className="text-[11px] font-semibold">
                    Notes Workspace
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="rounded-lg bg-[#eef0ff] px-3 py-2 text-[11px] font-semibold text-[#4963e7]">
                    Your notes
                  </div>

                  <div className="px-3 py-2 text-[11px] text-[#7a8497]">
                    Favorites
                  </div>

                  <div className="px-3 py-2 text-[11px] text-[#7a8497]">
                    Trash
                  </div>
                </div>
              </aside>

              {/* Notes area */}
              <div className="bg-white p-6 sm:p-8">
                <div className="mb-7 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold tracking-tight">
                      Your notes
                    </h2>
                    <p className="mt-1 text-[11px] text-[#8a94a7]">
                      Keep your thoughts organized.
                    </p>
                  </div>

                  <div className="rounded-lg bg-[#4963e7] px-3 py-2 text-[11px] font-medium text-white shadow-sm">
                    + New note
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {notes.map((note) => (
                    <div
                      key={note.title}
                      className="group rounded-xl border border-[#e9ecf1] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#d9def0] hover:shadow-[0_10px_25px_rgba(20,33,61,0.06)]"
                    >
                      <div
                        className={`mb-4 flex size-8 items-center justify-center rounded-lg ${note.color}`}
                      >
                        <FileText className="size-3.5 text-[#59657d]" />
                      </div>

                      <h3 className="text-[12px] font-semibold">
                        {note.title}
                      </h3>

                      <p className="mt-2 line-clamp-2 text-[10px] leading-5 text-[#8993a6]">
                        {note.text}
                      </p>

                      <div className="mt-4 h-1 w-8 rounded-full bg-[#e8ebf2] transition-all group-hover:w-12 group-hover:bg-[#4963e7]" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-[#e8ebf0] bg-white/60 py-20 backdrop-blur-sm">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#4963e7]">
              Designed for focus
            </p>

            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#14213d] sm:text-4xl">
              Everything you need.
              <br />
              Nothing you don&apos;t.
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#7a8497]">
              A thoughtfully designed workspace that makes managing your notes
              feel effortless.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {features.map(({ icon: Icon, title, detail }) => (
              <Card
                key={title}
                className="group border-[#e5e8ef] bg-white/80 shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-[#d8def4] hover:shadow-[0_15px_35px_rgba(20,33,61,0.07)]"
              >
                <CardHeader>
                  <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-[#eef0ff] text-[#4963e7] transition-transform duration-300 group-hover:scale-110">
                    <Icon className="size-5" />
                  </div>

                  <CardTitle className="text-[15px]">{title}</CardTitle>

                  <CardDescription className="text-[13px] leading-6">
                    {detail}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto w-full max-w-6xl px-6 py-24">
        <div className="relative overflow-hidden rounded-[28px] bg-[#111b35] px-7 py-16 text-center shadow-[0_25px_70px_rgba(20,33,61,0.15)] sm:px-12">
          <div className="absolute left-1/2 top-[-150px] h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-[#4963e7]/30 blur-3xl" />

          <div className="relative">
            <Badge className="mb-5 rounded-full border border-white/10 bg-white/10 text-white hover:bg-white/10">
              <CheckCircle2 className="mr-1.5 size-3.5" />
              Start organizing today
            </Badge>

            <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              Give your ideas a place to live.
            </h2>

            <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#aeb7ca]">
              Create your free workspace and start turning scattered thoughts
              into organized notes.
            </p>

            <Button
              asChild
              size="lg"
              className="mt-8 h-12 rounded-full bg-white px-7 text-[#14213d] shadow-lg transition-all hover:-translate-y-1 hover:bg-[#f4f6ff]"
            >
              <Link href="/register">
                Create your account
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e8ebf0] py-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-6 text-xs text-[#8993a6] sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex size-6 items-center justify-center rounded-md bg-[#4963e7] text-white">
              <FileText className="size-3" />
            </div>
            <span>Notes Workspace</span>
          </div>

          <span>Built for better thinking.</span>
        </div>
      </footer>
    </main>
  );
}


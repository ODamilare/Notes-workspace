"use client";

import Link from "next/link";
import type { FormEvent } from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/auth/password-input";

type AuthMode = "login" | "register";

type AuthFormProps = {
  mode: AuthMode;
  name?: string;
  email: string;
  password: string;
  error?: string;
  isSubmitting?: boolean;
  onNameChange?: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function AuthForm({
  mode,
  name = "",
  email,
  password,
  error,
  isSubmitting = false,
  onNameChange,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: AuthFormProps) {
  const isRegister = mode === "register";

  return (
    <Card
      className="
        w-full
        max-w-[405px]
        overflow-hidden
        rounded-[10px]
        border
        border-[#dfe4ec]
        bg-white
        py-0
        shadow-[0_2px_4px_rgba(20,33,61,0.03),0_12px_35px_rgba(20,33,61,0.07)]
      "
    >
      {/* Header */}
      <CardHeader className="px-7 pb-0 pt-7 text-center">
        <CardTitle
          className="
            text-[25px]
            font-bold
            leading-[1.2]
            tracking-[-0.03em]
            text-[#14213d]
          "
        >
          {isRegister ? "Create your account" : "Welcome back"}
        </CardTitle>

        <CardDescription
          className="
            mt-2
            text-[14px]
            font-normal
            leading-[1.5]
            text-[#778299]
          "
        >
          {isRegister
            ? "Sign up to get started with Notes Workspace."
            : "Sign in to continue to Notes Workspace."}
        </CardDescription>
      </CardHeader>

      <CardContent className="px-7 pb-7 pt-6">
        <form
          onSubmit={onSubmit}
          data-testid={isRegister ? "register-form" : "login-form"}
          className="space-y-[17px]"
        >
          {/* Error */}
       {error && (
  <Alert
    variant="destructive"
    data-testid="auth-error"
    className="rounded-[6px] border border-[#fecaca] bg-[#fef2f2] px-3.5 py-3 text-[#b42318]"
  >
    <AlertDescription className="flex items-center gap-2 text-[13px] font-medium leading-5 text-[#b42318]">
      <span
        className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#fee2e2] text-[12px] font-bold"
        aria-hidden="true"
      >
        !
      </span>

      <span>{error}</span>
    </AlertDescription>
  </Alert>
)}

          {/* Name */}
          {isRegister && (
            <div className="space-y-[7px]">
              <Label
                htmlFor="name"
                className="
                  text-[13px]
                  font-semibold
                  leading-none
                  text-[#1d2b46]
                "
              >
                Name
              </Label>

              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(event) =>
                  onNameChange?.(event.target.value)
                }
                autoComplete="name"
                required
                className="
                  h-[42px]
                  rounded-[6px]
                  border-[#d6dce6]
                  bg-white
                  px-3
                  text-[14px]
                  text-[#14213d]
                  shadow-none
                  transition-all
                  placeholder:text-[#9aa3b3]
                  hover:border-[#bfc7d5]
                  focus-visible:border-[#4963e7]
                  focus-visible:ring-4
                  focus-visible:ring-[#4963e7]/10
                "
              />
            </div>
          )}

          {/* Email */}
          <div className="space-y-[7px]">
            <Label
              htmlFor="email"
              className="
                text-[13px]
                font-semibold
                leading-none
                text-[#1d2b46]
              "
            >
              Email
            </Label>

            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) =>
                onEmailChange(event.target.value)
              }
              autoComplete="email"
              required
              className="
                h-[42px]
                rounded-[6px]
                border-[#d6dce6]
                bg-white
                px-3
                text-[14px]
                text-[#14213d]
                shadow-none
                transition-all
                placeholder:text-[#9aa3b3]
                hover:border-[#bfc7d5]
                focus-visible:border-[#4963e7]
                focus-visible:ring-4
                focus-visible:ring-[#4963e7]/10
              "
            />
          </div>

          {/* Password */}
          <div className="space-y-[7px]">
            <Label
              htmlFor="password"
              className="
                text-[13px]
                font-semibold
                leading-none
                text-[#1d2b46]
              "
            >
              Password
            </Label>

            <PasswordInput
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={onPasswordChange}
              autoComplete={
                isRegister
                  ? "new-password"
                  : "current-password"
              }
              required
              className="
                h-[42px]
                rounded-[6px]
                border-[#d6dce6]
                bg-white
                text-[14px]
                text-[#14213d]
                shadow-none
                transition-all
                placeholder:text-[#9aa3b3]
                hover:border-[#bfc7d5]
                focus-visible:border-[#4963e7]
                focus-visible:ring-4
                focus-visible:ring-[#4963e7]/10
              "
            />
          </div>

          {/* Primary action */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="
              mt-1
              h-[42px]
              w-full
              rounded-[6px]
              border-0
              bg-gradient-to-br
              from-[#5069e8]
              to-[#3d55d5]
              text-[14px]
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
            {isSubmitting
              ? "Please wait..."
              : isRegister
                ? "Create account"
                : "Sign in"}
          </Button>
        </form>

        {/* Divider */}
        <div className="my-[19px] flex items-center gap-3">
          <div className="h-px flex-1 bg-[#e4e7ed]" />

          <span
            className="
              shrink-0
              text-[12px]
              font-medium
              text-[#8992a3]
            "
          >
            or
          </span>

          <div className="h-px flex-1 bg-[#e4e7ed]" />
        </div>

        {/* Secondary action */}
        <Button
          asChild
          variant="outline"
          className="
            h-[42px]
            w-full
            rounded-[6px]
            border-[#c5d0f5]
            bg-white
            text-[14px]
            font-semibold
            text-[#4260df]
            shadow-none
            transition-all
            hover:border-[#aebcf0]
            hover:bg-[#f7f8ff]
            hover:text-[#3856d2]
          "
        >
          <Link href={isRegister ? "/login" : "/register"}>
            {isRegister
              ? "Sign in to your account"
              : "Create your account"}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
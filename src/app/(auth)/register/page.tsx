
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { AuthForm } from "@/components/auth/auth-form";

type ApiErrorResponse = {
  error?: {
    message?: string;
  };
  message?: string;
};

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {

    
    event.preventDefault();

    setError("");

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    // Client-side validation
    if (!trimmedName) {
      setError("Please enter your name.");
      return;
    }

    if (!trimmedEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (!password) {
      setError("Please enter a password.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          password,
        }),
      });

      let result: ApiErrorResponse | null = null;

      try {
        result = await response.json();
      } catch {
        result = null;
      }

      // Registration successful
      if (response.ok) {
        router.push("/notes");
        router.refresh();
        return;
      }

      // Extract API error message
      const apiMessage =
  typeof result?.error === "string"
    ? result.error
    : result?.error?.message || result?.message || "";

// Validation error
if (response.status === 400) {
  setError(
    apiMessage ||
      "Please check your information and try again.",
  );
  return;
}

// Account already exists
if (response.status === 409) {
  setError(
    apiMessage ||
      "An account with this email already exists.",
  );
  return;
}

// Unauthorized / forbidden
if (response.status === 401 || response.status === 403) {
  setError(
    apiMessage ||
      "You are not authorized to perform this action.",
  );
  return;
}

// Server error
if (response.status >= 500) {
  setError(
    apiMessage ||
      "We couldn't create your account right now. Please try again later.",
  );
  return;
}

// Unexpected response
setError(
  apiMessage ||
    "Unable to create your account. Please try again.",
);
    } catch (error) {
      console.error("Registration request failed:", error);

      setError(
        "Unable to connect to the server. Please check your connection and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthForm
      mode="register"
      name={name}
      email={email}
      password={password}
      error={error}
      isSubmitting={isSubmitting}
      onNameChange={setName}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onSubmit={handleSubmit}
    />
  );
}
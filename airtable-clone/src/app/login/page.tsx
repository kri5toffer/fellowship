"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  const handleComingSoon = (feature: string) => {
    alert(`${feature} coming soon! Use "Continue with Google" to sign in.`);
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left side — sign-in form */}
      <div className="flex flex-1 items-center justify-center px-8 py-10">
        <div className="w-full max-w-[480px]">
          {/* Logo */}
          <div className="mb-8">
            <svg
              width="40"
              height="40"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 16L24 4L44 16L24 22L4 16Z"
                fill="#FCB400"
              />
              <path
                d="M24 26L44 16V32L24 42V26Z"
                fill="#18BFFF"
              />
              <path
                d="M24 26L4 16V32L24 42V26Z"
                fill="#F82B60"
              />
              <path
                d="M24 26L4 16L24 22L44 16L24 26Z"
                fill="#7C3AED"
                opacity="0.5"
              />
            </svg>
          </div>

          {/* Heading */}
          <h1 className="mb-10 text-[28px] font-bold tracking-tight text-gray-900">
            Sign in to Airtable
          </h1>

          {/* Email field */}
          <div className="mb-5">
            <label className="mb-1.5 block text-[14px] font-medium text-gray-900">
              Email
            </label>
            <input
              type="email"
              placeholder="Email address"
              className="w-full cursor-pointer rounded-lg border border-gray-300 px-4 py-3 text-[15px] text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1]"
              onClick={() => handleComingSoon("Email sign-in")}
              readOnly
            />
          </div>

          {/* Continue button */}
          <button
            type="button"
            onClick={() => handleComingSoon("Email sign-in")}
            className="mb-8 w-full rounded-lg bg-[#b4b0d8] py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#9d98c9]"
          >
            Continue
          </button>

          {/* Divider */}
          <div className="mb-8 text-center text-[14px] text-gray-500">or</div>

          {/* SSO button */}
          <button
            type="button"
            onClick={() => handleComingSoon("Single Sign On")}
            className="mb-3 flex w-full items-center justify-center gap-1.5 rounded-lg border border-gray-300 py-3 text-[15px] text-gray-700 transition-colors hover:bg-gray-50"
          >
            Sign in with{" "}
            <span className="font-bold">Single Sign On</span>
          </button>

          {/* Google button */}
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="mb-3 flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 py-3 text-[15px] text-gray-700 transition-colors hover:bg-gray-50"
          >
            <svg className="size-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A11.96 11.96 0 0 0 0 12c0 1.94.46 3.77 1.28 5.4l3.56-2.77.01-.54z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with <span className="font-bold">Google</span>
          </button>

          {/* Apple button */}
          <button
            type="button"
            onClick={() => handleComingSoon("Apple ID sign-in")}
            className="mb-12 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 py-3 text-[15px] text-gray-700 transition-colors hover:bg-gray-50"
          >
            <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
            Continue with <span className="font-bold">Apple ID</span>
          </button>

          {/* Footer links */}
          <div className="space-y-3 text-[14px] text-gray-600">
            <p>
              New to Airtable?{" "}
              <button
                type="button"
                onClick={() => handleComingSoon("Account creation")}
                className="text-[#2563eb] underline hover:text-[#1d4ed8]"
              >
                Create an account
              </button>{" "}
              instead
            </p>
            <p>
              Manage your cookie preferences{" "}
              <button
                type="button"
                className="text-[#2563eb] underline hover:text-[#1d4ed8]"
              >
                here
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Right side — purple promo panel (centered square) */}
      <div className="hidden lg:flex lg:w-[32%] lg:items-center lg:justify-center">
        <div className="flex w-full max-w-[500px] flex-col rounded-[2rem] bg-[#2d1b69] p-8" style={{ aspectRatio: "1" }}>
          {/* Promo heading */}
          <h2 className="mb-4 text-[26px] font-bold leading-[1.2] text-white">
            Meet Airtable, your workspace for building custom apps.
          </h2>

          {/* CTA button */}
          <div className="mb-8">
            <button
              type="button"
              className="rounded-full border-2 border-white bg-white px-5 py-2 text-[13px] font-semibold text-[#2d1b69] transition-colors hover:bg-white/90"
            >
              Start building
            </button>
          </div>

          {/* Preview cards grid */}
          <div className="flex flex-1 items-end overflow-hidden">
            <div className="grid w-full grid-cols-3 gap-2 pb-0">
              <div className="aspect-square overflow-hidden rounded-lg bg-[#3d2d7a] p-2">
                <div className="flex h-full items-center justify-center">
                  <div className="size-10 rounded-full bg-gray-400/30" />
                </div>
              </div>
              <div className="aspect-square overflow-hidden rounded-lg bg-[#f0a0d0] p-2">
                <div className="flex h-full flex-wrap items-center justify-center gap-1.5">
                  <div className="size-3 rounded-full bg-[#d946a8]/40" />
                  <div className="size-3 rounded-full bg-[#d946a8]/40" />
                  <div className="size-3 rounded-full bg-[#d946a8]/40" />
                  <div className="size-3 rounded-full bg-[#d946a8]/40" />
                  <div className="size-3 rounded-full bg-[#d946a8]/40" />
                  <div className="size-3 rounded-full bg-[#d946a8]/40" />
                </div>
              </div>
              <div className="aspect-square overflow-hidden rounded-lg bg-[#4a3680] p-2">
                <div className="grid h-full grid-cols-2 gap-1">
                  <div className="rounded bg-orange-300/40" />
                  <div className="rounded bg-blue-300/40" />
                  <div className="rounded bg-pink-300/40" />
                  <div className="rounded bg-green-300/40" />
                </div>
              </div>
              <div className="aspect-square overflow-hidden rounded-lg bg-[#f5e6d0] p-2">
                <div className="flex h-full flex-col gap-1">
                  <div className="h-2 w-1/2 rounded bg-[#b8860b]/30" />
                  <div className="flex-1 rounded bg-[#b8860b]/15" />
                </div>
              </div>
              <div className="aspect-square overflow-hidden rounded-lg bg-[#d4edda] p-2">
                <div className="flex h-full flex-col gap-1">
                  <div className="h-1.5 w-3/4 rounded bg-green-600/30" />
                  <div className="h-1.5 w-1/2 rounded bg-green-600/20" />
                  <div className="flex-1 rounded bg-green-600/10" />
                </div>
              </div>
              <div className="aspect-square overflow-hidden rounded-lg bg-[#3a3a4a] p-2">
                <div className="flex h-full items-center justify-center">
                  <div className="size-8 rounded-full border-2 border-gray-500/40" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

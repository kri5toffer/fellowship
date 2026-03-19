"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";

export function UserButton() {
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  if (status === "loading") {
    return (
      <div className="size-7 animate-pulse rounded-full bg-gray-200" />
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setMenuOpen((v) => !v)}
        className="flex size-7 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-gray-100 transition-shadow hover:shadow-sm"
        title={session.user.name ?? "Account"}
      >
        {session.user.image ? (
          <img
            src={session.user.image}
            alt={session.user.name ?? "User"}
            className="size-full object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          <span className="text-[11px] font-medium text-gray-600">
            {(session.user.name ?? session.user.email ?? "U").charAt(0).toUpperCase()}
          </span>
        )}
      </button>

      {menuOpen && (
        <div className="absolute right-0 top-full z-50 mt-1 w-56 rounded-md border border-gray-200 bg-white py-1 shadow-lg">
          <div className="border-b border-gray-100 px-3 py-2">
            <p className="truncate text-[13px] font-medium text-gray-900">
              {session.user.name}
            </p>
            <p className="truncate text-[12px] text-gray-500">
              {session.user.email}
            </p>
          </div>
          <button
            onClick={() => signOut()}
            className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-[13px] text-gray-700 hover:bg-gray-50"
          >
            <svg
              className="size-3.5"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M6 2H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" />
              <path d="M10 12l4-4-4-4" />
              <path d="M14 8H6" />
            </svg>
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}

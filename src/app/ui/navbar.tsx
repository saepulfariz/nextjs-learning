"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DropdownMenu from "@/app/ui/navbar/DropdownMenu";
import NavDropdownTrigger from "@/app/ui/navbar/NavDropdownTrigger";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [stateDropdownOpen] = useState(false);

  const masterMenuItems = [
    {
      label: "Products",
      href: "/products",
    },
    {
      label: "Users",
      href: "/users",
    },
    {
      label: "Divisions",
      href: "/divisions",
    },
  ];

  // State menu items
  const stateMenuItems = [
    {
      label: "Local Counter",
      href: "/state/local-counter",
    },
    {
      label: "Global Counter Easy",
      href: "/state/global-counter-easy",
    },
    {
      label: "Global Counter Hard",
      href: "/state/global-counter-hard",
    },
    {
      label: "Global Posts",
      href: "/state/global-posts",
    },
    {
      label: "Global Running Text",
      href: "/state/global-running-text",
    },
  ];

  // Profile menu items
  const profileMenuItems = [
    {
      label: session?.user?.name ?? "Guest",
      divider: true,
    },
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Logout",
      onClick: () => signOut({ callbackUrl: "/login" }),
    },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex space-x-6 items-center">
            <Link
              href="/dashboard"
              className="text-gray-800 hover:text-blue-600 font-medium"
            >
              Dashboard
            </Link>
            <Link
              href="/about"
              className="text-gray-800 hover:text-blue-600 font-medium"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-800 hover:text-blue-600 font-medium"
            >
              Contact
            </Link>

            {/* State Dropdown Menu */}
            <DropdownMenu
              trigger={
                <NavDropdownTrigger label="Master" isOpen={stateDropdownOpen} />
              }
              items={masterMenuItems}
              position="left"
            />

            {/* State Dropdown Menu */}
            <DropdownMenu
              trigger={
                <NavDropdownTrigger label="States" isOpen={stateDropdownOpen} />
              }
              items={stateMenuItems}
              position="left"
            />
          </div>

          {/* Profile Dropdown Menu */}
          <DropdownMenu
            trigger={
              <button className="focus:outline-none">
                <Image
                  src="/assets/images/saepulfariz.jpg"
                  alt="User Profile"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-gray-300"
                />
              </button>
            }
            items={profileMenuItems}
            position="right"
          />
        </div>
      </div>
    </nav>
  );
}

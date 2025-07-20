"use client";
import { useState, useRef, useEffect, ReactNode } from "react";
import Link from "next/link";

interface DropdownItem {
  label: string;
  href?: string;
  onClick?: () => void;
  divider?: boolean;
}

interface DropdownMenuProps {
  trigger: ReactNode;
  items: DropdownItem[];
  className?: string;
  dropdownClassName?: string;
  position?: "left" | "right";
}

export default function DropdownMenu({
  trigger,
  items,
  className = "",
  dropdownClassName = "",
  position = "left",
}: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleItemClick = (item: DropdownItem) => {
    if (item.onClick) {
      item.onClick();
    }
    setIsOpen(false);
  };

  const positionClasses = position === "right" ? "right-0" : "left-0";

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

      {isOpen && (
        <div
          className={`absolute ${positionClasses} mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50 ${dropdownClassName}`}
        >
          {items.map((item, index) => (
            <div key={index}>
              {item.divider ? (
                <>
                  <div className="px-4 py-2 border-b text-sm text-gray-700">
                    {item.label}
                  </div>
                </>
              ) : item.href ? (
                <Link
                  href={item.href}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => handleItemClick(item)}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  onClick={() => handleItemClick(item)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {item.label}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

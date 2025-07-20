interface NavDropdownTriggerProps {
  label: string;
  isOpen: boolean;
}

export default function NavDropdownTrigger({
  label,
  isOpen,
}: NavDropdownTriggerProps) {
  return (
    <button className="text-gray-800 hover:text-blue-600 font-medium flex items-center space-x-1 focus:outline-none">
      <span>{label}</span>
      <svg
        className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>
  );
}

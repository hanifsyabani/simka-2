"use client";

import { Search } from "lucide-react";
import { Input } from "./ui/input";
import LogoutComponent from "./auth/logout";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between px-4 py-2">
      <div className="w-70 flex items-center">
        <div className="p-2 rounded-md bg-blue-950 text-white">
          <Search size={20} />
        </div>
        <Input placeholder="Search..." className="border border-gray-400" />
      </div>
      <LogoutComponent />
    </div>
  );
}

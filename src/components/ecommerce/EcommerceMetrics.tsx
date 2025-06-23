import {
  ArrowDownIcon,
  ArrowUpIcon,
  BoxIconLine,
  GroupIcon,
} from "../../icons";
import Badge from "../ui/badge/Badge";

import React from "react";
import GridShape from "../../components/common/GridShape";
import { Link } from "react-router";
import ThemeTogglerTwo from "../../components/common/ThemeTogglerTwo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
 <div className="relative flex flex-col items-center justify-center w-screen h-screen bg-brand-950 dark:bg-white/5 p-4 overflow-hidden">
  {/* Constrain GridShape size */}
  <div className="max-h-[30vh] w-auto mb-6 flex justify-center">
  <GridShape />
</div>
  {/* Logo and description */}
  <div className="flex flex-col items-center max-w-xs overflow-hidden">
    <Link to="/" className="block mb-4">
      <img
        src="/images/logo/logo.png"
        alt="Logo"
        className="max-h-[40vh] w-auto object-contain"
      />
    </Link>
    <p className="text-center text-gray-400 dark:text-white/60">
      Invoice Management System
    </p>
  </div>
</div>



    </div>
  );
}

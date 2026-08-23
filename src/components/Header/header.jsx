import React from "react";
import { useLocation } from "react-router-dom";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

export default function Header() {
  const { pathname } = useLocation();
  const isHomePage = pathname === "/";

  return (
    <>
      <div className="hidden md:block">
        <DesktopHeader isHomePage={isHomePage} />
      </div>

      <div className="block md:hidden">
        <MobileHeader />
      </div>
    </>
  );
}

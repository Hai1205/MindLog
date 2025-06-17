"use client";

import { cn } from "@/lib/utils";
import { ReactNode, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

interface SideBarProps {
  triggerIcon: ReactNode;
  triggerClassName?: string;
  children: React.ReactNode;
}

const SideBar = (props: SideBarProps) => {
  const [show, setShow] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref as React.RefObject<HTMLElement>, () => setShow(false));

  return (
    <>
      <button
        className={props.triggerClassName}
        onClick={() => setShow((prev) => !prev)}
      >
        {props.triggerIcon}
      </button>
      
      <div
        ref={ref}
        className={cn(
          "w-60 absolute top-0 z-50 duration-300 transition-all bg-white rounded-r-md min-h-screen",
          {
            "-left-full": !show,
            "left-0": show,
          }
        )}
      >
        {props.children}
      </div>
    </>
  );
};

export default SideBar;

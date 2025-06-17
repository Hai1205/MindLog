import { Bars3Icon } from "@heroicons/react/16/solid";
import SideBar from "./SideBar";

interface MobileNavbarProps {
  children: React.ReactNode;
}

const MobileNavbar = (props: MobileNavbarProps) => {
  return (
    <div className="md:hidden">
      <SideBar
        triggerIcon={<Bars3Icon className="w-4 cursor-pointer" />}
        triggerClassName="absolute top-2 left-2"
      >
        {props.children}
      </SideBar>
    </div>
  );
};

export default MobileNavbar;
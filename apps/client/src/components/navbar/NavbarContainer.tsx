import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

interface NavbarContainerProps {
  children: React.ReactNode;
}

const NavbarContainer = (props: NavbarContainerProps) => {
  return (
    <div className="relative">
      <DesktopNavbar>{props.children}</DesktopNavbar>
      
      <MobileNavbar>{props.children}</MobileNavbar>
    </div>
  );
};

export default NavbarContainer;
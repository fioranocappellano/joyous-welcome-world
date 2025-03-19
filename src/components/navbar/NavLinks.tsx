
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";

interface NavLink {
  name: string;
  href?: string;
  path?: string;
}

interface NavLinksProps {
  links: NavLink[];
  activeSection: string;
  isHomePage: boolean;
  handleNavClick: (link: NavLink) => void;
  isMobile?: boolean;
}

const NavLinks = ({ links, activeSection, isHomePage, handleNavClick, isMobile = false }: NavLinksProps) => {
  const location = useLocation();

  // Helper to check if link is active
  const isLinkActive = (link: NavLink) => {
    if (link.path) {
      return location.pathname === link.path;
    }
    return isHomePage && activeSection === link.href;
  };

  return (
    <>
      {links.map((link) => (
        link.path ? (
          <Link
            key={link.name}
            to={link.path}
            className={`relative transition-colors ${
              isLinkActive(link) 
                ? "text-white font-medium" 
                : "text-gray-300 hover:text-white"
            } ${isMobile ? "py-2" : ""} ${
              isMobile && isLinkActive(link) ? "pl-2 border-l-2 border-[#D946EF]" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(link);
            }}
          >
            {link.name}
            {!isMobile && isLinkActive(link) && (
              <motion.div 
                layoutId="navbar-indicator"
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#D946EF]"
                transition={{ duration: 0.2, type: "spring" }}
              />
            )}
          </Link>
        ) : (
          <a
            key={link.name}
            href={`#${link.href}`}
            className={`relative transition-colors ${
              isLinkActive(link) 
                ? "text-white font-medium" 
                : "text-gray-300 hover:text-white"
            } ${isMobile ? "py-2" : ""} ${
              isMobile && isLinkActive(link) ? "pl-2 border-l-2 border-[#D946EF]" : ""
            }`}
            onClick={(e) => {
              e.preventDefault(); 
              handleNavClick(link);
            }}
          >
            {link.name}
            {!isMobile && isLinkActive(link) && (
              <motion.div 
                layoutId="navbar-indicator"
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#D946EF]"
                transition={{ duration: 0.2, type: "spring" }}
              />
            )}
          </a>
        )
      ))}
    </>
  );
};

export default NavLinks;

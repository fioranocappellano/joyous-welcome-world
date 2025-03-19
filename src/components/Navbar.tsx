import { useState, useEffect } from "react";
import { Menu, X, Twitter } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useSectionTracker } from "@/hooks/use-section-tracker";
import Logo from "./navbar/Logo";
import NavLinks from "./navbar/NavLinks";
import MobileMenu from "./navbar/MobileMenu";
import ActionButtons from "./navbar/ActionButtons";
import LanguageSelector from "./LanguageSelector";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { translations } = useLanguage();
  const isMobile = useIsMobile();
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const { activeSection, setActiveSection, scrollToSection, isHomePage } = useSectionTracker();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    
    // Handle initial scroll position on refresh - always go to top on refresh
    window.addEventListener('load', () => {
      window.scrollTo(0, 0);
    });

    // Cleanup event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener('load', () => {});
    };
  }, []);

  const handleNavClick = (link: { name: string, href?: string, path?: string }) => {
    if (link.path && location.pathname === link.path) {
      // If we're already on the page, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (link.path) {
      // Otherwise navigate to the page
      navigate(link.path);
    } else {
      // Handle homepage section navigation
      scrollToSection(link.href || "top");
    }
    setIsMobileMenuOpen(false);
  };
  
  const showMobileMenu = isMobile || isTablet;

  const navLinks = [
    { name: translations.home, href: "top" },
    { name: translations.community, href: "community" },
    { name: translations.players, href: "top-players" },
    { name: translations.resources, href: "resources" },
    { name: "Best Games", path: "/best-games" },
    { name: "FAQ", path: "/faq" },
  ];

  const navVariants = {
    initial: { y: -20, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" } 
    }
  };

  return (
    <motion.header
      initial="initial"
      animate="animate"
      variants={navVariants}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-jf-dark/80 backdrop-blur-md border-b border-white/10"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo - left */}
          <Logo />

          {/* Navigation - center */}
          {!showMobileMenu && (
            <nav className="flex items-center justify-center mx-auto">
              <div className="flex items-center">
                <NavLinks 
                  links={navLinks} 
                  activeSection={activeSection} 
                  isHomePage={isHomePage} 
                  handleNavClick={handleNavClick} 
                />
              </div>
            </nav>
          )}

          {/* Buttons - right */}
          {!showMobileMenu && <ActionButtons />}

          {/* Mobile menu button */}
          {showMobileMenu && (
            <div className="flex items-center gap-3 ml-auto">
              <LanguageSelector />
              <motion.button
                className="text-white p-2 rounded-full hover:bg-white/10 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileTap={{ scale: 0.95 }}
                whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.15)" }}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          )}
        </div>
      </div>

      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        links={navLinks} 
        activeSection={activeSection} 
        isHomePage={isHomePage} 
        handleNavClick={handleNavClick} 
      />
    </motion.header>
  );
};

export default Navbar;

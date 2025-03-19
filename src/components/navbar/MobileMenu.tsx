
import { motion, AnimatePresence } from "framer-motion";
import { Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "../../contexts/LanguageContext";
import NavLinks from "./NavLinks";
import LanguageSelector from "../LanguageSelector";

interface NavLink {
  name: string;
  href?: string;
  path?: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  links: NavLink[];
  activeSection: string;
  isHomePage: boolean;
  handleNavClick: (link: NavLink) => void;
}

const MobileMenu = ({ isOpen, links, activeSection, isHomePage, handleNavClick }: MobileMenuProps) => {
  const { translations } = useLanguage();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-jf-gray border-t border-white/10"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <NavLinks 
              links={links} 
              activeSection={activeSection} 
              isHomePage={isHomePage} 
              handleNavClick={handleNavClick} 
              isMobile={true} 
            />
            <Button 
              className="bg-[#D946EF] hover:bg-[#D946EF]/90 w-full"
              onClick={() => window.open('https://twitter.com/JudgmentFleet', '_blank')}
            >
              <Twitter size={18} className="mr-2" />
              {translations.followOnTwitter}
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;

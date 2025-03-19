
import { motion, AnimatePresence } from "framer-motion";
import { Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "../../contexts/LanguageContext";
import NavLinks from "./NavLinks";

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

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        when: "afterChildren",
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.05,
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
          className="bg-jf-gray border-t border-white/10 overflow-hidden"
        >
          <motion.div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <NavLinks 
              links={links} 
              activeSection={activeSection} 
              isHomePage={isHomePage} 
              handleNavClick={handleNavClick} 
              isMobile={true} 
            />
            <motion.div variants={itemVariants}>
              <Button 
                className="bg-[#D946EF] hover:bg-[#D946EF]/90 w-full transition-colors duration-300"
                onClick={() => window.open('https://twitter.com/JudgmentFleet', '_blank')}
              >
                <Twitter size={18} className="mr-2" />
                {translations.followOnTwitter}
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;

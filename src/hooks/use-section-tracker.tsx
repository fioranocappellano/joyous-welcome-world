
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function useSectionTracker() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";
  const [activeSection, setActiveSection] = useState("top");

  useEffect(() => {
    const handleScroll = () => {
      if (isHomePage) {
        // Get all sections and their positions
        const sections = {
          top: document.getElementById('top'),
          community: document.getElementById('community'),
          'top-players': document.getElementById('top-players'),
          resources: document.getElementById('resources')
        };

        // Find which section is most visible
        const viewportHeight = window.innerHeight;
        const viewportMiddle = window.scrollY + (viewportHeight / 2);

        let currentSection = 'top';
        let minDistance = Infinity;

        Object.entries(sections).forEach(([id, element]) => {
          if (element) {
            const rect = element.getBoundingClientRect();
            const absDistance = Math.abs((window.scrollY + rect.top) - viewportMiddle);
            if (absDistance < minDistance) {
              minDistance = absDistance;
              currentSection = id;
            }
          }
        });

        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Handle initial scroll position on refresh - always go to top on refresh
    window.addEventListener('load', () => {
      window.scrollTo(0, 0);
      setActiveSection('top');
    });

    // Cleanup event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener('load', () => {});
    };
  }, [isHomePage]);

  const scrollToSection = async (sectionId: string) => {
    if (!isHomePage) {
      navigate('/', { replace: true, state: { scrollTo: sectionId } });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      // Update URL hash without triggering scroll
      window.history.pushState(null, '', `#${sectionId}`);
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return { activeSection, setActiveSection, scrollToSection, isHomePage };
}

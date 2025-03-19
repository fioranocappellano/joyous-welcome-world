
import { useState, useEffect } from "react";

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    // Set initial value with a small delay to ensure smooth transitions
    const initialCheck = () => {
      setMatches(media.matches);
    };
    
    // Run initial check after a small delay
    const timeoutId = setTimeout(initialCheck, 10);
    
    // Add event listener for subsequent changes
    const updateMatch = () => setMatches(media.matches);
    media.addEventListener("change", updateMatch);
    
    return () => {
      clearTimeout(timeoutId);
      media.removeEventListener("change", updateMatch);
    };
  }, [query]);

  return matches;
}


import { useState, useEffect } from "react";

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const updateMatch = () => setMatches(media.matches);
    
    updateMatch(); // Set initial value
    media.addEventListener("change", updateMatch);
    
    return () => media.removeEventListener("change", updateMatch);
  }, [query]);

  return matches;
}


import { Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "../../contexts/LanguageContext";
import LanguageSelector from "../LanguageSelector";

const ActionButtons = () => {
  const { translations } = useLanguage();

  return (
    <div className="flex items-center gap-4 flex-shrink-0">
      <LanguageSelector />
      <Button 
        className="bg-[#D946EF] hover:bg-[#D946EF]/90"
        onClick={() => window.open('https://twitter.com/JudgmentFleet', '_blank')}
      >
        <Twitter size={18} className="mr-2" />
        {translations.followOnTwitter}
      </Button>
    </div>
  );
};

export default ActionButtons;

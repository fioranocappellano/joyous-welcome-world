
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="flex-shrink-0">
      <Link to="/" className="flex items-center gap-2">
        <span className="text-2xl font-display font-bold text-white">
          Judgment<span className="text-[#D946EF]">Fleet</span>
        </span>
      </Link>
    </div>
  );
};

export default Logo;

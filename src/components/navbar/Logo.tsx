
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Logo = () => {
  return (
    <motion.div
      className="flex-shrink-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Link to="/" className="flex items-center gap-2">
        <span className="text-2xl font-display font-bold text-white">
          Judgment<span className="text-[#D946EF]">Fleet</span>
        </span>
      </Link>
    </motion.div>
  );
};

export default Logo;

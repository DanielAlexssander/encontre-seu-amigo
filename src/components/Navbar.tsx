import { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

const FEEDBACK_URL = import.meta.env.VITE_FEEDBACK_URL || "#";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <img src={import.meta.env.BASE_URL + "logo.png"} alt="Encontre seu Amigo" className="h-10" />
          <span className="font-bold text-lg text-emerald-700 hidden sm:block">
            Encontre seu Amigo
          </span>
        </Link>

        <button
          onClick={() => setOpen(!open)}
          className="text-3xl text-emerald-700 cursor-pointer"
          aria-label="Menu"
        >
          {open ? <HiX /> : <HiMenu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-white border-t"
          >
            <div className="flex flex-col items-center gap-4 py-4">
              <Link
                to="/registrar"
                onClick={() => setOpen(false)}
                className="text-emerald-700 font-medium hover:underline"
              >
                Perdi meu PET
              </Link>
              <a
                href={FEEDBACK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 font-medium hover:underline"
              >
                Feedback
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

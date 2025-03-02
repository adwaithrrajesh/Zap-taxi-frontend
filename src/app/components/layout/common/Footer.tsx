"use client";

import { ThemeProvider,useTheme } from "@/app/context/ThemeContext";

function FooterContent() {
  const { darkMode } = useTheme();

  console.log(darkMode,'ghereerer ')

  return (
    <footer className={`p-8 md:p-12 lg:p-16 transition-colors duration-500 ${darkMode ? "bg-black text-white" : "bg-gray-900 text-white"}`}>
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-4">
        <p className="text-sm text-gray-400">© {new Date().getFullYear()} ZAP TAXI. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default function Footer() {
  return (
    <ThemeProvider>
      <FooterContent />
    </ThemeProvider>
  );
}
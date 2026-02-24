import { useState } from "react";
import { Outlet, useLocation } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { CustomCursor } from "@/components/CustomCursor";
import { StarField } from "@/components/StarField";
import { Navigation } from "@/components/Navigation";
import { IntroSplash } from "@/components/IntroSplash";
import { ScrollToTop } from "@/components/ScrollToTop";

export function Root() {
  const location = useLocation();
  const [splashDone, setSplashDone] = useState(false);

  return (
    <div
      style={{
        background: "#04050E",
        minHeight: "100vh",
        cursor: "none",
        overflowX: "hidden",
      }}
    >
      {/* Cinematic intro — only on first load */}
      {!splashDone && <IntroSplash onComplete={() => setSplashDone(true)} />}

      <CustomCursor />
      <StarField />
      <ScrollToTop />
      <Navigation />

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
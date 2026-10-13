"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** Motion follows the visitor's reduced-motion setting everywhere, so no
 *  component has to branch its first render on it (which the server cannot
 *  know, and which would break hydration). */
export default function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

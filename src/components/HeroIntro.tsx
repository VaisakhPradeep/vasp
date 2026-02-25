"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*<> ";
const FULL = "VAISAKH PRADEEP";
const TARGET = "VASP";
/** Indices in FULL that we keep as-is (V, A, S, P, and the space): 0=V, 1=A, 3=S, 7=space, 8=P */
const FIXED_INDICES = [0, 1, 3, 7, 8];
const CYCLES = 14;
const CYCLE_MS = 40;
const HOLD_EMPTY_MS = 450;

function pickRandom() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

function isFixed(i: number) {
  return FIXED_INDICES.includes(i);
}

export const HeroHoverContext = createContext(false);

export function HeroIntro({ className }: { className?: string }) {
  const isHovered = useContext(HeroHoverContext);
  const [letters, setLetters] = useState<string[]>(() => FULL.split(""));
  const holdTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isHovered) return;

    const rafId = requestAnimationFrame(() => {
      setLetters(
        FULL.split("").map((ch, i) => (isFixed(i) ? ch : pickRandom()))
      );
    });

    let step = 0;
    const intervalId = setInterval(() => {
      step += 1;
      if (step >= CYCLES) {
        clearInterval(intervalId);
        setLetters(
          FULL.split("").map((ch, i) => (isFixed(i) ? ch : ""))
        );
        holdTimeoutRef.current = setTimeout(() => {
          setLetters(TARGET.split(""));
          holdTimeoutRef.current = null;
        }, HOLD_EMPTY_MS);
        return;
      }
      setLetters((prev) =>
        prev.map((_, i) => (isFixed(i) ? FULL[i] : pickRandom()))
      );
    }, CYCLE_MS);

    return () => {
      cancelAnimationFrame(rafId);
      clearInterval(intervalId);
      if (holdTimeoutRef.current) {
        clearTimeout(holdTimeoutRef.current);
        holdTimeoutRef.current = null;
      }
    };
  }, [isHovered]);

  const isHoldPhase =
    isHovered && letters.length === FULL.length && letters.some((ch) => ch === "");

  const namePart =
    isHovered && letters.length === FULL.length && !isHoldPhase
      ? letters.join("")
      : isHovered && letters.length === 4
        ? letters.join("")
        : !isHovered
          ? FULL
          : null;

  return (
    <p className={className}>
      HI, I&apos;M{" "}
      {namePart !== null ? (
        namePart
      ) : (
        <>
          {letters.map((ch, i) =>
            ch === "" ? (
              <span
                key={i}
                className="opacity-30"
                aria-hidden
              >
                ░
              </span>
            ) : (
              ch
            )
          )}
        </>
      )}
    </p>
  );
}

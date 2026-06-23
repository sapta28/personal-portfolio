"use client";

import { useEffect, useState } from "react";

interface TypingEffectProps {
  words: string[];
  typingSpeed?: number;
  delayBetweenWords?: number;
}

export default function TypingEffect({
  words,
  typingSpeed = 120,
  delayBetweenWords = 2500,
}: TypingEffectProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  // Mulai dengan huruf pertama agar h1 tidak pernah kosong saat mount pertama
  const [currentText, setCurrentText] = useState(words[0]?.[0] ?? "");
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (words.length === 0) return;

    let timer: NodeJS.Timeout;
    const fullWord = words[currentWordIndex];

    if (isFading) {
      // Tunggu transisi fade-out selesai (300ms), lalu ganti kata berikutnya
      timer = setTimeout(() => {
        setCurrentText("");
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        setIsFading(false);
      }, 300);
    } else {
      if (currentText !== fullWord) {
        // Efek ketikan berjalan maju
        timer = setTimeout(() => {
          setCurrentText((prev) => fullWord.slice(0, prev.length + 1));
        }, typingSpeed);
      } else {
        // Kata sudah terketik penuh, tunggu sebelum melakukan fade-out
        timer = setTimeout(() => {
          if (words.length > 1) {
            setIsFading(true);
          }
        }, delayBetweenWords);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isFading, currentWordIndex, words, typingSpeed, delayBetweenWords]);

  return (
    <span
      className="text-primary font-extrabold"
      style={{ display: "inline-block", verticalAlign: "top", position: "relative" }}
    >
      <span
        className={`transition-opacity duration-300 ${
          isFading ? "opacity-0" : "opacity-100"
        }`}
        style={{ whiteSpace: "nowrap" }}
      >
        {currentText || "\u200b"}
      </span>
      {/* Kursor diposisikan absolute agar tidak masuk ke aliran teks dan tidak mendorong layout */}
      <span
        className="animate-blink inline-block w-[3px] bg-primary rounded-sm"
        style={{
          willChange: "opacity",
          position: "absolute",
          top: "0.1em",
          height: "0.85em",
          marginLeft: "4px",
        }}
      />
    </span>
  );
}

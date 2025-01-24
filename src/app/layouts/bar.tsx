// Header.tsx
import React, { useEffect } from "react";
import styles from "../../styles/Header.module.css";

function fillRepeatingText(): void {
  const container = document.getElementById("repeating-text") as HTMLElement;
  const word = "\u00A0SangGaDee Space \u00A0\u00A0 ✸ ";
  const containerWidth = container.offsetWidth;
  const wordWidth = getTextWidth(word, "16px Arial");

  // Calculate how many times the word needs to be repeated to fill the width
  const repeatCount = Math.ceil(containerWidth / wordWidth);

  // Repeat the text and set it in the container
  container.textContent = word.repeat(repeatCount);
}

// Helper function to calculate the width of text
function getTextWidth(text: string, font: string): number {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Failed to create 2D rendering context");
  }
  context.font = font;
  return context.measureText(text).width;
}

const Bar: React.FC = () => {
  useEffect(() => {
    fillRepeatingText();
    window.addEventListener("resize", fillRepeatingText);

    return () => {
      window.removeEventListener("resize", fillRepeatingText);
    };
  }, []);

  return <div id="repeating-text" className={styles.repeatingText}></div>;
};

export default Bar;

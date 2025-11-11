import React from "react";
import DynamicTexts from "../molecules/DynamicTexts";
import Image from "../atoms/Image";
import CardsDisplay from "../organims/CardsDisplay";

function Section({ content = [], className = "p-4" }) {
  return (
    <div className={className}>
      {content.map((item, index) => {
        if (item.type === "text") {
          return <DynamicTexts key={index} Texts={item.text} />;
        }

        if (item.type === "image") {
          return (
            <img
              key={index}
              src={item.src}
              alt={item.alt}
              className={item.className}
            />
          );
        }

        if (item.type === "cards" || item.type === "cardList") {
          return (
            <CardsDisplay
              key={index}
              content={item.cards}
              isCardList={item.type === "cardList"}
            />
          );
        }

        return null;
      })}
    </div>
  );
}

export default Section;
"use client";
import { useEffect, type FunctionComponent } from "react";
import Character from "./character";
import Level from "@/components/common/level";
import { CharacterModel } from "@/types/character";
import { motion, useAnimate, stagger } from "framer-motion";

type OnlineCharacterListProps = {
  characters: CharacterModel[];
};
const OnlineCharacterList: FunctionComponent<OnlineCharacterListProps> = ({
  characters,
}) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (characters.length == 0) return
    
    animate(
      "div",
      {
        opacity: [0, 1],
        filter: ["blur(5px)", "blur(0px)"],
        y: [50, 0],
      },
      {
        delay: stagger(0.325, { ease: "linear" }),
      }
    );
  }, [characters]);

  if (characters && characters.length > 0) {
    return (
      <section className="text-xl pb-6 max-w-5xl mx-auto">
        <h2
          style={{
            filter: "hue-rotate(160deg)",
          }}
          className="level-no text-white font-bold rounded-md m-1 font-arial py-1 px-2 flex justify-center text-base"
        >
          These gamers are online [<Level level={characters.length} />]
        </h2>
        <div
          ref={scope}
          className="flex flex-wrap gap-5 justify-center mx-auto mt-6"
        >
          {characters.map((character) => (
            <motion.div 
              initial={{ opacity: 0, filter: "blur(5px)", y: 50 }}
              key={character.Name}>
              <Character character={character} />
            </motion.div>
          ))}
        </div>
      </section>
    );
  }

  return <></>;
};

export default OnlineCharacterList;

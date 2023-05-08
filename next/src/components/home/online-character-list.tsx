import { type FunctionComponent } from "react";
import { getCharacters } from "@/rpc";
import Character from "./character";
import Level from "@/components/common/level";

/* @ts-expect-error Async Server Component */
const OnlineCharacterList: FunctionComponent = async () => {
  const onlineCharacters = await getCharacters({
    isOnline: true,
    limit: 0,
    offset: 0,
  });

  if (onlineCharacters && onlineCharacters.length > 0) {
    return (
      <section className="text-xl pb-6 max-w-5xl mx-auto">
        <h2
          style={{
            filter: "hue-rotate(160deg)",
          }}
          className="level-no text-white font-bold rounded-md m-1 font-arial py-1 px-2 flex justify-center text-base"
        >
          These gamers are online [<Level level={onlineCharacters.length} />]
        </h2>
        <div className="flex flex-wrap gap-5 justify-center mx-auto mt-6">
          {onlineCharacters.map((character) => (
            <Character key={character.Name} character={character} />
          ))}
        </div>
      </section>
    );
  }

  return <></>;
};

export default OnlineCharacterList;

import { type FunctionComponent } from "react";
import { getCharacters } from "@/rpc";
import Character from "./character";
import Level from "@/components/common/level";
import CharacterList from "@/components/home/char-list"
/* @ts-expect-error Async Server Component */
const OnlineCharacterList: FunctionComponent = async () => {
  const onlineCharacters = await getCharacters({
    isOnline: true,
    limit: 0,
    offset: 0,
  });

  return <CharacterList characters={onlineCharacters}/>
};

export default OnlineCharacterList;

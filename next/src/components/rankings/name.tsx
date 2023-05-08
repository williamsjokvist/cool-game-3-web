"use client";
import { type FunctionComponent } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { openCharacterPopup } from "@/redux/features/character-popup-slice";
import { CharacterModel } from "@/types/character";
type NameProps = {
  character: CharacterModel;
};
const Name: FunctionComponent<NameProps> = (props) => {
  const dispatch = useAppDispatch();
  const { character } = props;
  return (
    <button
      type="button"
      className="px-3 py-[2px] md:px-4 md:py-2 whitespace-nowrap hover:underline"
      onMouseOver={(e) => {
        const { top, left } = (e.target as HTMLElement).getBoundingClientRect();
        dispatch(
          openCharacterPopup({
            character: props.character,
            left: Math.floor(left + 150),
            top: Math.floor(top),
          })
        );
      }}
    >
      {character.Name}
    </button>
  );
};

export default Name;

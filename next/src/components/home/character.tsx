"use client";

import { type FunctionComponent } from "react";
import { CharacterModel } from "@/types/character";
import { useAppDispatch } from "@/redux/hooks";
import { openCharacterPopup } from "@/redux/features/character-popup-slice";

type CharacterProps = { character: CharacterModel };
const Character: FunctionComponent<CharacterProps> = (props) => {
  const dispatch = useAppDispatch();

  const { Name, SkinColor, Face, Hair, EquippedItems } = props.character;

  const equips = EquippedItems.map(
    (itemId) => `{itemId:${itemId},version:64}`
  ).join(",");

  return (
    <button
      onClick={(e) => {
        const { top, left } = (e.target as HTMLElement).getBoundingClientRect();
        dispatch(
          openCharacterPopup({
            character: props.character,
            left: Math.floor(left),
            top: Math.floor(top)
          })
        );
      }}
      className="relative flex justify-end"
    >
      <figure className="relative flex flex-col justify-end items-center hover:bg-[rgba(255,255,255,.25)] rounded-md transition-colors">
        <img
          src={`https://maplestory.io/api/character/{itemId:${
            2000 + SkinColor
          },version:64},{itemId:${Face},version:64},{itemId:${Hair},version:64},{itemId:${
            12000 + SkinColor
          },version:64},${equips}/stand1/animated?resize=1&renderMode=default&flipX=true`}
          alt={`${Name}'s avatar'`}
          className='pixelated'
          loading="lazy"
        />
        <figcaption className="text-white font-arial text-sm mt-2 px-3 py-1 rounded-md">
          {Name}
        </figcaption>
      </figure>
    </button>
  );
};

export default Character;

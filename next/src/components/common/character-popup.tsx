"use client";
import { Icon } from "@iconify/react";
import { useRef, type FunctionComponent, useState, useEffect } from "react";
import Draggable from "react-draggable";
import { closeCharacterPopup } from "@/redux/features/character-popup-slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Level from "@/components/common/level";

type CharacterPopupProps = {
  mdLeftOffset: number;
};

const CharacterPopup: FunctionComponent<CharacterPopupProps> = (props) => {
  const [stopped, setStopped] = useState(false)
  const draggableRef = useRef<Draggable>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const isOpen = useAppSelector((state) => state.characterPopupReducer.isOpen);
  const left = useAppSelector((state) => state.characterPopupReducer.left);
  const top = useAppSelector((state) => state.characterPopupReducer.top);

  const character = useAppSelector(
    (state) => state.characterPopupReducer.character
  );

  const [coordinates, setCoordinates] = useState({ left, top });
  const [overrideCoords, setOverrideCoords] = useState(false);

  const close = () => {
    if (!containerRef.current) return
    setStopped(true)

    const { top, left } = containerRef.current.getBoundingClientRect();
    dispatch(
      closeCharacterPopup({
        top: Math.floor(top),
        left: Math.floor(left),
      })
    );
  }
  const onOutOfBoundsClicked = () => {
    close()
    const els = document.querySelectorAll("body>*:not(.character-popup)")!;
    els.forEach((el) => el.removeEventListener("click", onOutOfBoundsClicked));
  };

  useEffect(() => {
    const els = document.querySelectorAll("body>*:not(.character-popup)")!;
    if (isOpen) {
      els.forEach((el) => el.addEventListener("click", onOutOfBoundsClicked));
    }

    return () => {
      if (isOpen) {
        els.forEach((el) =>
          el.removeEventListener("click", onOutOfBoundsClicked)
        );
      }
    };
  }, [isOpen]);

  useEffect(() => {
    isOpen && setOverrideCoords(false);
  }, [isOpen]);

  if (!character) return <></>;

  const {
    Name,
    Level: CharLevel,
    JobName,
    StreetName,
    MapName,
    Exp,
    ExpRequired,
    Str,
    Luk,
    Dex,
    Int,
    HP,
    MP,
    MaxHP,
    MaxMP,
    Fame,
    SkinColor,
    Rank,
    CreateDate,
    TotalPlayTime,
    Face,
    Hair,
    EquippedItems,
  } = character;

  const expPercentage = ((Exp / ExpRequired) * 100).toFixed(2) + "%";
  const playTimeHrs = Math.floor(TotalPlayTime / 1000 / (60 * 60));
  const equips = EquippedItems.map(
    (itemId) => `{itemId:${itemId},version:64}`
  ).join(",");

  return (
    <Draggable
      ref={draggableRef}
      handle={".drag-handle"}
      {...(!overrideCoords && {
        position: {
          x: left,
          y: top,
        },
      })}
      onStart={(e) => {
        setStopped(false)
        setOverrideCoords(true);
        setCoordinates({
          top: Math.floor(coordinates.top),
          left: Math.floor(coordinates.left),
        });
      }}
      onStop={(e) => {
        setStopped(true)
        const { top, left } = (e.target as HTMLElement).getBoundingClientRect();
        setCoordinates({
          top: Math.floor(top),
          left: Math.floor(left),
        });
      }}
    >
      <section
        ref={containerRef}
        className={`
        character-popup
        ${isOpen ? "visible" : "invisible"} 
        ${isOpen ? "opacity-100" : "opacity-0"}
        ${stopped ? "popup-transitions-transform" : "popup-transitions"} fixed top-0 left-0 z-50 popup-gradient text-xs md:text-base font-arial min-w-[403px] max-w-[403px] text-center text-[#031532] border-[#5c7e9e] border-2 border-solid outline-white outline-none outline-2 outline-offset-0 shadow-lg shadow-black backdrop-blur rounded-lg`}
      >
        <button
          onClick={close}
          className="left-2 top-2 absolute self-start bg-[rgba(255,255,255,.5)] hover:bg-[#f7faff] p-1 rounded-md transition-colors"
        >
          <Icon icon="ci:close-big" className="w-6 h-full" />
        </button>
        <header className="rounded-t-md drag-handle flex bg-[rgba(255,255,255,.5)] justify-between border-b-2 border-solid border-[#5c7e9e] px-4 py-2">
          {/* Avatar */}
          <figure className="w-full self-end flex flex-col justify-center items-center avatar-box">
            <img
              src={`https://maplestory.io/api/character/{itemId:${
                2000 + SkinColor
              },version:64},{itemId:${Face},version:64},{itemId:${Hair},version:64},{itemId:${
                12000 + SkinColor
              },version:64},${equips}/stand1/animated?resize=1&renderMode=default&flipX=true`}
              alt={`${Name}'s character`}
              className="pixelated mx-auto z-10"
              loading="lazy"
            />
            <figcaption className="mx-auto blue-gradient-top mt-2 border-solid border-white border-2 shadow-[0px_0px_3px_rgba(0,0,0,.5)] px-3 py-1 rounded-md text-white">
              {Name}
            </figcaption>
          </figure>

          {/* Bars */}
          <div className="text-center pl-4 mt-4 min-w-[220px] font-small">
            {/* HP Bar */}
            <div className="max-w-[200px] mx-auto mb-2 w-full relative glow-line h-4 bg-slate-700 rounded-md overflow-hidden outline-none outline-2 outline-offset-0 outline-[#4d4a52]">
              <span className="absolute w-full text-center top-0 md:top-[-3px] left-0 z-50 font-bold text-[10px] text-white">
                {HP}/{MaxHP}
              </span>
              <div
                className="absolute bg-gradient-to-r from-[#d82963] to-[#f75ca5] h-4"
                style={{
                  width: Math.floor((HP / MaxHP) * 100) + "%",
                }}
              ></div>
            </div>

            {/* MP Bar */}
            <div className="max-w-[200px] mx-auto mb-2 relative glow-line w-full h-4 bg-slate-700 rounded-md overflow-hidden outline-none outline-2 outline-offset-0 outline-[#4d4a52]">
              <span className="absolute w-full text-center top-0 md:top-[-3px] left-0 z-50 font-bold text-[10px] text-white">
                {MP}/{MaxMP}
              </span>
              <div
                className="absolute bg-gradient-to-r from-[#01a0c6] to-[#5dcbe3] h-4"
                style={{
                  width: Math.floor((MP / MaxMP) * 100) + "%",
                }}
              ></div>
            </div>

            {/* EXP Bar */}
            <div className="max-w-[200px] mx-auto mb-2 relative glow-line w-full h-4 bg-slate-700 rounded-md overflow-hidden outline-none outline-2 outline-offset-0 outline-[#4d4a52]">
              <span className="absolute w-full text-center top-0 md:top-[-3px] left-0 z-50 font-bold text-[10px] text-white">
                {expPercentage}
              </span>
              <div
                className="absolute bg-yellow-500 h-4"
                style={{
                  width: expPercentage,
                }}
              ></div>
            </div>

            {/* Character Level */}
            <div className="flex gap-2 mb-1">
              <i
                className="outline-none outline-offset-[-4px] outline-[rgba(255,255,255,.3)] mr-[2px] inline-block blue-gradient-top p-[6px] rounded-md border-solid border-2 border-[#4d4a52]"
                aria-label="Level"
              >
                <span
                  className="block stat stat-level"
                  style={{
                    filter: "invert(1)",
                  }}
                ></span>
              </i>
              <span className="w-[124px] mt-[2px] inline-flex align-top text-left">
                <Level level={CharLevel} />
              </span>
            </div>

            {/* Character Job */}
            <div className="flex gap-2">
              <i
                className="outline-none outline-offset-[-4px] outline-[rgba(255,255,255,.3)] mr-[2px] inline-block bg-[lightslategray] p-[6px] rounded-md border-solid border-2 border-[#4d4a52]"
                aria-label="Job"
              >
                <span
                  className="block stat stat-job"
                  style={{
                    filter: "invert(1)",
                  }}
                ></span>
              </i>
              <span className="w-[124px] whitespace-nowrap inline-block align-top text-left px-3 py-[2px] border-solid border-[#cecdc9] bg-[rgba(255,255,255,.72)] rounded-md border-t-2 border-l-2">
                {JobName}
              </span>
            </div>
          </div>
        </header>

        {/* Character Stats */}
        <dl className="font-sans font-medium py-3 border-b-2 border-solid border-[#5c7e9e] px-2">
          {/* Map */}
          <div className="w-full flex content-start items-start gap-1 mb-2">
            <dt
              className="outline-none outline-offset-[-4px] outline-[rgba(255,255,255,.3)] mr-[2px] inline-block blue-gradient-top p-[6px] rounded-md border-solid border-2 border-[#4d4a52]"
              aria-label="Map"
            >
              <span
                className="block stat stat-map"
                style={{
                  filter: "invert(1)",
                }}
              ></span>
            </dt>
            <dd className="inline-block flex-1 text-center whitespace-nowrap overflow-hidden text-ellipsis px-3 py-[2px] border-solid border-[#cecdc9] bg-[rgba(255,255,255,.72)] rounded-md border-t-2 border-l-2">
              {StreetName} - {MapName}
            </dd>
          </div>

          {/* Rank */}
          <div className="inline-block mr-1">
            <dt
              className="outline-none outline-offset-[-4px] outline-[rgba(255,255,255,.3)] mr-[2px] inline-block blue-gradient-top p-[6px] rounded-md border-solid border-2 border-[#4d4a52]"
              aria-label="Rank"
              style={{
                filter: "hue-rotate(145deg)",
              }}
            >
              <span
                className="block stat stat-rank"
                style={{
                  filter: "invert(1)",
                }}
              ></span>
            </dt>
            <dd className="w-[124px] inline-block align-top text-left px-3 py-[2px] border-solid border-[#cecdc9] bg-[rgba(255,255,255,.72)] rounded-md border-t-2 border-l-2">
              #{Rank}
            </dd>
          </div>

          {/* Fame */}
          <div className="inline-block">
            <dt
              className="outline-none outline-offset-[-4px] outline-[rgba(255,255,255,.3)] mr-[2px] inline-block blue-gradient-top p-[6px] rounded-md border-solid border-2 border-[#4d4a52]"
              aria-label="Fame"
              style={{
                filter: "hue-rotate(145deg)",
              }}
            >
              <span
                className="block stat stat-fame"
                style={{
                  filter: "invert(1)",
                }}
              ></span>
            </dt>
            <dd className="w-[124px] inline-block align-top text-left px-3 py-[2px] border-solid border-[#cecdc9] bg-[rgba(255,255,255,.72)] rounded-md border-t-2 border-l-2">
              {Fame}
            </dd>
          </div>

          {/* Strength */}
          <div className="inline-block mr-1">
            <dt
              className="outline-none outline-offset-[-4px] outline-[rgba(255,255,255,.3)] mr-[2px] inline-block blue-gradient-top p-[6px] rounded-md border-solid border-2 border-[#4d4a52]"
              aria-label="Strength"
              style={{
                filter: "hue-rotate(-57deg)",
              }}
            >
              <span
                className="block stat stat-str"
                style={{
                  filter: "invert(1)",
                }}
              ></span>
            </dt>
            <dd className="w-[124px] inline-block align-top text-left px-3 py-[2px] border-solid border-[#cecdc9] bg-[rgba(255,255,255,.72)] rounded-md border-t-2 border-l-2">
              {Str}
            </dd>
          </div>

          {/* Dex */}
          <div className="inline-block">
            <dt
              className="outline-none outline-offset-[-4px] outline-[rgba(255,255,255,.3)] mr-[2px] inline-block blue-gradient-top p-[6px] rounded-md border-solid border-2 border-[#4d4a52]"
              aria-label="Dexterity"
              style={{
                filter: "hue-rotate(-57deg)",
              }}
            >
              <span
                className="block stat stat-dex"
                style={{
                  filter: "invert(1)",
                }}
              ></span>
            </dt>
            <dd className="w-[124px] inline-block align-top text-left px-3 py-[2px] border-solid border-[#cecdc9] bg-[rgba(255,255,255,.72)] rounded-md border-t-2 border-l-2">
              {Dex}
            </dd>
          </div>

          {/* Luck */}
          <div className="inline-block mr-1">
            <dt
              className="outline-none outline-offset-[-4px] outline-[rgba(255,255,255,.3)] mr-[2px] inline-block blue-gradient-top p-[6px] rounded-md border-solid border-2 border-[#4d4a52]"
              aria-label="Luck"
              style={{
                filter: "hue-rotate(-57deg)",
              }}
            >
              <span
                className="block stat stat-luk"
                style={{
                  filter: "invert(1)",
                }}
              ></span>
            </dt>
            <dd className="w-[124px] inline-block align-top text-left px-3 py-[2px] border-solid border-[#cecdc9] bg-[rgba(255,255,255,.72)] rounded-md border-t-2 border-l-2">
              {Luk}
            </dd>
          </div>

          {/* Intelligence */}
          <div className="inline-block">
            <dt
              className="outline-none outline-offset-[-4px] outline-[rgba(255,255,255,.3)] mr-[2px] inline-block blue-gradient-top p-[6px] rounded-md border-solid border-2 border-[#4d4a52]"
              aria-label="Intelligence"
              style={{
                filter: "hue-rotate(-57deg)",
              }}
            >
              <span
                className="block stat stat-int"
                style={{
                  filter: "invert(1)",
                }}
              ></span>
            </dt>
            <dd className="w-[124px] inline-block align-top text-left px-3 py-[2px] border-solid border-[#cecdc9] bg-[rgba(255,255,255,.72)] rounded-md border-t-2 border-l-2">
              {Int}
            </dd>
          </div>
        </dl>

        {/* Extra stats */}
        <footer className="drag-handle flex justify-around py-3 bg-[#5c7e9e] text-white font-small">
          <span className="block leading-none">
            <b className="mr-1">Created on:</b>
            <time dateTime={CreateDate}>{CreateDate.slice(0, 10)}</time>
          </span>
          <span className="block leading-none">
            <b className="mr-1">Play Time:</b>
            {playTimeHrs + " hrs"}
          </span>
        </footer>
      </section>
    </Draggable>
  );
};

export default CharacterPopup;

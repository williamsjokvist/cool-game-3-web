import { CharacterModel } from "@/types/character";
import { type FunctionComponent } from "react";

type CharacterPopupProps = {
  character: CharacterModel;
};

const CharacterPopup: FunctionComponent<CharacterPopupProps> = (props) => {
  const {
    Name,
    Level,
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
  } = props.character;

  const expPercentage = ((Exp / ExpRequired) * 100).toFixed(2) + "%";
  const playTimeHrs = Math.floor(TotalPlayTime / 1000 / (60 * 60));
  const equips = EquippedItems.map(
    (itemId) => `{itemId:${itemId},version:64}`
  ).join(",");

  return (
    <section className="text-xs md:text-base font-arial min-w-[320px] text-center group-hover:block hidden bg-[#e4e1d4] text-black border-[#5c7e9e] border-2 border-solid outline-white outline-none outline-2 outline-offset-0 shadow-lg shadow-black backdrop-blur absolute z-50 top-[-240px] left-[15px] md:left-[150px] px-4 py-2 rounded-lg">
      <header>
        <figure className="grid justify-items-center">
          <img
            src={`https://maplestory.io/api/character/{itemId:${
              2000 + SkinColor
            },version:64},{itemId:${Face},version:64},{itemId:${Hair},version:64},{itemId:${
              12000 + SkinColor
            },version:64},${equips}/stand1/animated?resize=1&renderMode=default&flipX=true`}
            alt=""
            loading="lazy"
          />
          <figcaption className="mt-2 bg-[#5479c4] border-solid border-white border-2 shadow-[0px_0px_3px_rgba(0,0,0,.5)] px-3 py-1 rounded-md text-white">
            {Name}
          </figcaption>
        </figure>
        <div className="mt-4 flex items-center justify-center gap-4  font-small">
          {JobName}
          <span>|</span>
          <span className="flex items-center gap-2 font-bold font-semismall">
            LV.
            <span className="level-no">
              {Level.toString()
                .split("")
                .map((num) => (
                  <span className={`level-no-${num}`} />
                ))}
            </span>
          </span>
        </div>
      </header>
      <span className="mt-4 block font-small pb-4 mb-4 border-b-2 border-solid border-[#c1a790]">
        {StreetName} - {MapName}
      </span>
      <div className="flex items-center justify-between w-full font-small">
        <span className="text-left">
          <span className="w-6 inline-block">HP</span>
          <span className="ml-2 text-[#95c634]">
            [
            <span className="text-black">
              {HP}/{MaxHP}
            </span>
            ]
          </span>
        </span>
        <div className="max-w-[130px] w-full h-3 bg-slate-700 rounded-md overflow-hidden">
          <div
            className="bg-red-500 h-3"
            style={{
              width: Math.floor((HP / MaxHP) * 100) + "%",
            }}
          ></div>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between w-full font-small">
        <span className="text-left">
          <span className="w-6 inline-block">MP</span>
          <span className="ml-2 text-[#95c634]">
            [
            <span className="text-black">
              {MP}/{MaxMP}
            </span>
            ]
          </span>
        </span>
        <div className="max-w-[130px] w-full h-3 bg-slate-700 rounded-md overflow-hidden">
          <div
            className="bg-blue-500 h-3"
            style={{
              width: Math.floor((MP / MaxMP) * 100) + "%",
            }}
          ></div>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between w-full font-small pb-4 mb-4 border-b-2 border-solid border-[#c1a790]">
        <span className="text-left">
          <span className="w-6 inline-block">EXP</span>
          <span className="ml-2 text-[#95c634]">
            [<span className="text-black">{expPercentage}</span>]
          </span>
        </span>
        <div className="max-w-[130px] w-full h-3 bg-slate-700 rounded-md overflow-hidden">
          <div
            className="bg-yellow-500 h-3"
            style={{
              width: expPercentage,
            }}
          ></div>
        </div>
      </div>
      <dl className="font-sans font-medium pb-4 mb-4 border-b-2 border-solid border-[#c1a790]">
        <div className="flex gap-8 w-full justify-between mb-1">
          <div className="flex gap-4 w-full justify-between px-2">
            <dt className="text-[#633c2f]">RANK</dt>
            <dd>#{Rank}</dd>
          </div>
          <div className="flex gap-4 w-full justify-between px-2">
            <dt className="text-[#633c2f]">FAME</dt>
            <dd>{Fame}</dd>
          </div>
        </div>
        <div className="flex gap-8 w-full justify-between mb-1">
          <div className="flex gap-4 w-full justify-between px-2">
            <dt className="text-[#633c2f]">STR</dt>
            <dd>{Str}</dd>
          </div>
          <div className="flex gap-4 w-full justify-between px-2">
            <dt className="text-[#633c2f]">DEX</dt>
            <dd>{Dex}</dd>
          </div>
        </div>
        <div className="flex gap-8 w-full justify-between">
          <div className="flex gap-4 w-full justify-between px-2">
            <dt className="text-[#633c2f]">LUK</dt>
            <dd>{Luk}</dd>
          </div>
          <div className="flex gap-4 w-full justify-between px-2">
            <dt className="text-[#633c2f]">INT</dt>
            <dd>{Int}</dd>
          </div>
        </div>
      </dl>
      <span className="font-small block leading-none mb-2">
        Created on: <time dateTime={CreateDate}>{CreateDate.slice(0, 10)}</time>
      </span>
      <span className="font-small block leading-none mb-2">
        Total Play Time: {playTimeHrs + " hrs"}
      </span>
    </section>
  );
};

export default CharacterPopup;

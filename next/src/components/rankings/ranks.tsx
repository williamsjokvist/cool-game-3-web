"use client";
import { CharacterModel } from "@/types/character";
import { type FunctionComponent, useRef, useState, useEffect } from "react";
import Name from "./name";
import Level from "@/components/common/level";

enum TableHead {
  Rank = 0,
  Name = 1,
  Lv = 2,
  Job = 3,
  Exp = 4,
  Fame = 5,
  Meso = 6,
  PlayTime = 7,
}

type RanksProps = {
  characters: CharacterModel[];
};
const Ranks: FunctionComponent<RanksProps> = (props) => {
  const [characters, setCharacters] = useState<CharacterModel[]>(props.characters);

  const sortTable = (column: TableHead) => {
    const sortedCharacters = characters.sort((a, b) => {
      let cmpValueA: string | number;
      let cmpValueB: string | number;

      switch (column) {
        case TableHead.Name:
          cmpValueA = a.Name;
          cmpValueB = b.Name;
          break;
        case TableHead.Job:
          cmpValueA = a.JobName;
          cmpValueB = b.JobName;
          break;
        case TableHead.Rank:
          cmpValueA = a.Rank;
          cmpValueB = b.Rank;
          break;
        case TableHead.Lv:
          cmpValueA = a.Level;
          cmpValueB = b.Level;
          break;
        case TableHead.Fame:
          cmpValueA = a.Fame;
          cmpValueB = b.Fame;
          break;
        case TableHead.Meso:
          cmpValueA = a.Meso;
          cmpValueB = b.Meso;
          break;
        case TableHead.Exp:
          cmpValueA = ((a.Exp / a.ExpRequired) * 100)
          cmpValueB = ((b.Exp / b.ExpRequired) * 100)
          break;
        case TableHead.PlayTime:
          cmpValueA = Math.floor(a.TotalPlayTime / 1000 / (60 * 60))
          cmpValueB = Math.floor(b.TotalPlayTime / 1000 / (60 * 60))
          break;
        default:
          cmpValueA = a.Rank;
          cmpValueB = b.Rank;
      }

      if (
        column == TableHead.Name ||
        column == TableHead.Rank ||
        column == TableHead.Job
      ) {
        if (cmpValueA < cmpValueB) return -1;
        else if (cmpValueA > cmpValueB) return 1;
        else return 0;
      } else {
        if (cmpValueA > cmpValueB) return -1;
        else if (cmpValueA < cmpValueB) return 1;
        else return 0;
      }
    });

    setCharacters([...sortedCharacters])
  };

  return (
    <table
      id="rankings"
      className="w-full md:w-auto md:mx-auto mt-8 text-sm md:text-md"
    >
      <thead className="hidden md:table-header-group">
        <tr>
          <th className="text-center font-bold px-4">
            <button
              type="button"
              className="text-center w-full hover:underline"
              onClick={() => sortTable(TableHead.Rank)}
            >
              Overall Rank
            </button>
          </th>
          <th className="text-left font-bold px-4">
            <button
              type="button"
              className="hover:underline"
              onClick={() => sortTable(TableHead.Name)}
            >
              Name
            </button>
          </th>
          <th className="text-left font-bold px-4">
            <button
              type="button"
              className="hover:underline"
              onClick={() => sortTable(TableHead.Lv)}
            >
              LV
            </button>
          </th>
          <th className="text-left font-bold px-4">
            <button
              type="button"
              className="hover:underline"
              onClick={() => sortTable(TableHead.Job)}
            >
              Job
            </button>
          </th>
          <th className="text-left font-bold px-4">
            <button
              type="button"
              className="hover:underline"
              onClick={() => sortTable(TableHead.Exp)}
            >
              EXP
            </button>
          </th>
          <th className="text-left font-bold px-4">
            <button
              type="button"
              className="hover:underline"
              onClick={() => sortTable(TableHead.Fame)}
            >
              Fame
            </button>
          </th>
          <th className="text-left font-bold px-4">
            <button
              type="button"
              className="hover:underline"
              onClick={() => sortTable(TableHead.Meso)}
            >
              Meso
            </button>
          </th>
          <th className="text-right font-bold px-4">
            <button
              type="button"
              className="hover:underline"
              onClick={() => sortTable(TableHead.PlayTime)}
            >
              Play Time
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {characters.map((character) => {
          const {
            Rank,
            Level: charLevel,
            JobName,
            Exp,
            ExpRequired,
            TotalPlayTime,
            Meso,
            Fame,
          } = character;
          const playTimeHrs = Math.floor(TotalPlayTime / 1000 / (60 * 60));

          return (
            <tr
              key={character.Name}
              className="text-center md:text-left relative group text-[#031532] md:text-[rgba(255,255,255,0.75)] md:hover:text-white even:bg-[rgba(255,255,255,0.075)] hover:bg-[rgba(255,255,255,0.155)]"
            >
              <td
                className="text-xl md:text-sm text-white md:bg-transparent block md:table-cell rank text-center md:px-4 py-1 md:py-4"
              >
                #{Rank}
              </td>
              <td className="bg-[#f4f7f8] max-w-[200px] mx-auto  md:bg-transparent inline-block md:table-cell">
                <Name character={character} />
              </td>
              <td
                className="inline-block ml-5 md:ml-0 md:table-cell md:px-4 "
                aria-label={`Level ${Level}`}
              >
                <Level level={charLevel} />
              </td>
              <td className="bg-[#f4f7f8] max-w-[200px] mx-auto  md:bg-transparent block px-3 py-[2px] md:table-cell  md:px-4 md:py-2 whitespace-nowrap">
                {JobName}
              </td>
              <td
                className="bg-[#f4f7f8] max-w-[200px] mx-auto my-2  md:bg-transparent inline-block px-3 py-[2px] md:table-cell  md:px-4 md:py-2 whitespace-nowrap"
              >
                {((Exp / ExpRequired) * 100).toFixed(2)}%
              </td>
              <td
                className="bg-[#f4f7f8] max-w-[200px] mx-auto my-2  md:bg-transparent inline-block px-3 py-[2px] md:table-cell  md:px-4 md:py-2 whitespace-nowrap"
              >
                {Fame}
              </td>
              <td
                className="bg-[#f4f7f8] max-w-[200px] mx-auto my-2  md:bg-transparent inline-block px-3 py-[2px] md:table-cell  md:px-4 md:py-2 whitespace-nowrap"
              >
                {Meso.toLocaleString()}
              </td>
              <td
                className="bg-[#f4f7f8] max-w-[200px] mx-auto my-2  md:bg-transparent inline-block px-3 py-[2px] md:table-cell  md:px-4 md:py-2 whitespace-nowrap md:text-right"
              >
                {playTimeHrs} hrs
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Ranks;

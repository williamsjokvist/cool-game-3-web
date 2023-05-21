"use client";
import { CharacterModel } from "@/types/character";
import { type FunctionComponent, useRef, useState, useEffect } from "react";
import Name from "./name";
import Level from "@/components/common/level";
import { motion, Reorder, useAnimate, stagger } from "framer-motion";

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
  const [characters, setCharacters] = useState<CharacterModel[]>(
    props.characters
  );

  const [scope, animate] = useAnimate()

  useEffect(() => {
    animate("li", 
      { 
        opacity: [0, 1], 
        filter: ["blur(3px)", "blur(0px)"], 
        x: [-100, 0],
      }, 
      { 
        
        delay: stagger(0.025, { ease: "circInOut" }) 
      })
  }, [])

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
          cmpValueA = (a.Exp / a.ExpRequired) * 100;
          cmpValueB = (b.Exp / b.ExpRequired) * 100;
          break;
        case TableHead.PlayTime:
          cmpValueA = Math.floor(a.TotalPlayTime / 1000 / (60 * 60));
          cmpValueB = Math.floor(b.TotalPlayTime / 1000 / (60 * 60));
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

    setCharacters([...sortedCharacters]);
  };

  return (
    <motion.section
      initial={ { opacity: 0 }}
      animate={ { opacity: 1 }}
      id="rankings"
      className="md:table w-full md:w-auto md:mx-auto mt-8 text-sm md:text-md"
    >
      <ul className="hidden md:table-header-group">
        <li className="md:table-cell text-center font-bold px-4">
          <button
            type="button"
            className="text-center w-full hover:underline"
            onClick={() => sortTable(TableHead.Rank)}
          >
            Overall Rank
          </button>
        </li>
        <li className="md:table-cell text-left font-bold px-4">
          <button
            type="button"
            className="hover:underline"
            onClick={() => sortTable(TableHead.Name)}
          >
            Name
          </button>
        </li>
        <li className="md:table-cell text-left font-bold px-4">
          <button
            type="button"
            className="hover:underline"
            onClick={() => sortTable(TableHead.Lv)}
          >
            LV
          </button>
        </li>
        <li className="md:table-cell text-left font-bold px-4">
          <button
            type="button"
            className="hover:underline"
            onClick={() => sortTable(TableHead.Job)}
          >
            Job
          </button>
        </li>
        <li className="md:table-cell text-left font-bold px-4">
          <button
            type="button"
            className="hover:underline"
            onClick={() => sortTable(TableHead.Exp)}
          >
            EXP
          </button>
        </li>
        <li className="md:table-cell text-left font-bold px-4">
          <button
            type="button"
            className="hover:underline"
            onClick={() => sortTable(TableHead.Fame)}
          >
            Fame
          </button>
        </li>
        <li className="md:table-cell text-left font-bold px-4">
          <button
            type="button"
            className="hover:underline"
            onClick={() => sortTable(TableHead.Meso)}
          >
            Meso
          </button>
        </li>
        <li className="md:table-cell text-right font-bold px-4">
          <button
            type="button"
            className="hover:underline"
            onClick={() => sortTable(TableHead.PlayTime)}
          >
            Play Time
          </button>
        </li>
      </ul>
      <Reorder.Group
        ref={scope}
        values={characters}
        onReorder={() => {}}
        className="md:table-row-group"
      >
        {characters.map((character) => {
          const {
            Name: charName,
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
            <Reorder.Item
              key={character.Name}
              value={charName}
              className="md:table-row text-center md:text-left relative group even:bg-[rgba(255,255,255,0.075)] hover:bg-[rgba(255,255,255,0.155)] text-[#031532] md:text-[rgba(255,255,255,0.75)] md:hover:text-white "
            >
              <div className="md:table-cell text-white md:bg-transparent block rank text-center md:px-4 py-1">
                #{Rank}
              </div>
              <div className="bg-[#f4f7f8] max-w-[200px] mx-auto  md:bg-transparent inline-block md:table-cell">
                <Name character={character} />
              </div>
              <div
                className="inline-block ml-5 md:ml-0 md:table-cell md:px-4 "
                aria-label={`Level ${Level}`}
              >
                <span className="relative top-[6px]">
                  <Level level={charLevel} />
                </span>
              </div>
              <div className="bg-[#f4f7f8] max-w-[200px] mx-auto  md:bg-transparent block px-3 py-[2px] md:table-cell  md:px-4 md:py-2 whitespace-nowrap">
                {JobName}
              </div>
              <div className="bg-[#f4f7f8] max-w-[200px] mx-auto my-2  md:bg-transparent inline-block px-3 py-[2px] md:table-cell  md:px-4 md:py-2 whitespace-nowrap">
                {((Exp / ExpRequired) * 100).toFixed(2)}%
              </div>
              <div className="bg-[#f4f7f8] max-w-[200px] mx-auto my-2  md:bg-transparent inline-block px-3 py-[2px] md:table-cell  md:px-4 md:py-2 whitespace-nowrap">
                {Fame}
              </div>
              <div className="bg-[#f4f7f8] max-w-[200px] mx-auto my-2  md:bg-transparent inline-block px-3 py-[2px] md:table-cell  md:px-4 md:py-2 whitespace-nowrap">
                {Meso.toLocaleString()}
              </div>
              <div className="bg-[#f4f7f8] max-w-[200px] mx-auto my-2  md:bg-transparent inline-block px-3 py-[2px] md:table-cell  md:px-4 md:py-2 whitespace-nowrap md:text-right">
                {playTimeHrs} hrs
              </div>
            </Reorder.Item>
          );
        })}
      </Reorder.Group>
    </motion.section>
  );
};

export default Ranks;

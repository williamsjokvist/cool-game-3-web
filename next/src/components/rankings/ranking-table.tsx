import { FunctionComponent } from "react";
import Level from "@/components/common/level";
import { getCharacters } from "@/rpc";
import Name from "./name";

/* @ts-expect-error Async Server Component */
const RankingTable: FunctionComponent = async () => {
  const characters = await getCharacters({
    isOnline: false,
    limit: 0,
    offset: 0,
  });

  return (
    <section className="font-arial text-white">
      <h2 className="bg-white text-[#235877] rounded-md m-1 py-1 px-2 text-base flex gap-4 items-center justify-between max-w-3xl mx-auto">
        Total Characters:
        <Level level={characters.length} color="blue" />
      </h2>
      {characters && characters.length > 0 && (
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
                >
                  Overall Rank
                </button>
              </th>
              <th className="text-left font-bold px-4">
                <button type="button" className="hover:underline">
                  Name
                </button>
              </th>
              <th className="text-left font-bold px-4">
                <button type="button" className="hover:underline">
                  LV
                </button>
              </th>
              <th className="text-left font-bold px-4">
                <button type="button" className="hover:underline">
                  Job
                </button>
              </th>
              <th className="text-left font-bold px-4">
                <button type="button" className="hover:underline">
                  EXP
                </button>
              </th>
              <th className="text-left font-bold px-4">
                <button type="button" className="hover:underline">
                  Fame
                </button>
              </th>
              <th className="text-left font-bold px-4">
                <button type="button" className="hover:underline">
                  Meso
                </button>
              </th>
              <th className="text-right font-bold px-4">
                <button type="button" className="hover:underline">
                  Play Time
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {characters.map((character) => {
              const {
                Rank,
                Level,
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
                    data-number={Rank}
                  >
                    #{Rank}
                  </td>
                  <td
                    className="bg-[#f4f7f8] max-w-[200px] mx-auto  md:bg-transparent inline-block md:table-cell"
                  >
                    <Name character={character}/>
                  </td>
                  <td
                    className="inline-block ml-5 md:ml-0 md:table-cell md:px-4 "
                    aria-label={`Level ${Level}`}
                    data-number={Level}
                  >
                    <span className="level-no justify-center md:justify-normal">
                      {Level.toString()
                        .split("")
                        .map((num) => (
                          <span className={`level-no-${num}`} />
                        ))}
                    </span>
                  </td>
                  <td className="bg-[#f4f7f8] max-w-[200px] mx-auto  md:bg-transparent block px-3 py-[2px] md:table-cell  md:px-4 md:py-2 whitespace-nowrap">
                    {JobName}
                  </td>
                  <td
                    className="bg-[#f4f7f8] max-w-[200px] mx-auto my-2  md:bg-transparent inline-block px-3 py-[2px] md:table-cell  md:px-4 md:py-2 whitespace-nowrap"
                    data-number={((Exp / ExpRequired) * 100).toFixed(2)}
                  >
                    {((Exp / ExpRequired) * 100).toFixed(2)}%
                  </td>
                  <td
                    className="bg-[#f4f7f8] max-w-[200px] mx-auto my-2  md:bg-transparent inline-block px-3 py-[2px] md:table-cell  md:px-4 md:py-2 whitespace-nowrap"
                    data-number={Fame}
                  >
                    {Fame}
                  </td>
                  <td
                    className="bg-[#f4f7f8] max-w-[200px] mx-auto my-2  md:bg-transparent inline-block px-3 py-[2px] md:table-cell  md:px-4 md:py-2 whitespace-nowrap"
                    data-number={Meso}
                  >
                    {Meso.toLocaleString()}
                  </td>
                  <td
                    className="bg-[#f4f7f8] max-w-[200px] mx-auto my-2  md:bg-transparent inline-block px-3 py-[2px] md:table-cell  md:px-4 md:py-2 whitespace-nowrap md:text-right"
                    data-number={playTimeHrs}
                  >
                    {playTimeHrs} hrs
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default RankingTable;

import { FunctionComponent } from "react";
import Level from "@/components/common/level";
import { getCharacters } from "@/rpc";
import Ranks from "./ranks";

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
      <Ranks characters={characters} />
    </section>
  );
};

export default RankingTable;

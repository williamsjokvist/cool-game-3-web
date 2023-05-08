import RankingTable from "@/components/rankings/ranking-table";
import { type FunctionComponent } from "react";

export const revalidate = 60;

const Rankings: FunctionComponent = () => {
  return (
    <main>
      <RankingTable />
    </main>
  );
};

export default Rankings;

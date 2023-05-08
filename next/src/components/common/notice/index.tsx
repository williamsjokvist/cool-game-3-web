import { getNotice } from "@/rpc";
import { type FunctionComponent } from "react";
import Marquee from './marquee'

/* @ts-expect-error Async Server Component */
const Notice: FunctionComponent = async () => {
  const notice = await getNotice()
  
  if (notice && notice.length > 0) {
    return (
      <Marquee text={notice} />
    )
  }
  return <></>
}

export default Notice
"use client";
import { useState, type FunctionComponent } from "react";
import ReactFastMarquee from "react-fast-marquee";

type MarqueeProps = {
  text: string;
};
const Marquee: FunctionComponent<MarqueeProps> = (props) => {
  const text = props.text;

  return (
    <div className='fixed z-50 top-0 left-0'>
      <ReactFastMarquee
        autoFill={true}
        speed={100}
        pauseOnHover={true}
        className="font-arial whitespace-nowrap text-[#ff2] text-[15px] py-2 w-full bg-[rgba(0,0,0,.5)] h-[27px] overflow-hidden"
      >
        <p className="mx-[100vw]">{text}</p>
      </ReactFastMarquee>
    </div>
  );
};

export default Marquee;

import { CharacterModel } from "@/types/character";
import CharacterPopup from "../CharacterPopup";
import { type FunctionComponent } from 'react';

async function getData() {
  const res = await fetch('https://www.williamsjokvist.se/api/spotify');
  // Recommendation: handle errors
  // This will activate the closest `error.js` Error Boundary
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

/* @ts-expect-error Async Server Component */
const OnlineCharacterList: FunctionComponent = async () => {
  const res = await getData();
  console.log(res);

  const onlineCharacters: CharacterModel[] = [];

  if (onlineCharacters && onlineCharacters.length > 0) {
    return (
      <section className='rounded-xl text-black text-center text-xl max-w-2xl bg-[#efefef] border-[#5c7e9e] pb-6 mx-auto border-2 border-solid outline-white outline-none outline-2 outline-offset-0'>
      <h2 className='bg-white rounded-md m-1 font-arial py-1 px-2 text-base flex gap-4 items-center justify-between'>
        Players Online
        <span
          className='level-no'
          style={{
            filter: 'hue-rotate(94deg)',
          }}
        >
          {onlineCharacters.length
            .toString()
            .split('')
            .map((num) => (
              <span className={`level-no-${num}`} />
            ))}
        </span>
      </h2>
      <div className='flex flex-wrap gap-10 justify-center mx-auto mt-6'>
        {onlineCharacters.map((character) => {
          const { Name, SkinColor, Face, Hair, EquippedItems } = character;

          const equips = EquippedItems.map(
            (itemId) => `{itemId:${itemId},version:64}`
          ).join(',');

          return (
            <figure className='relative group grid justify-items-center items-end'>
              <img
                src={`https://maplestory.io/api/character/{itemId:${
                  2000 + SkinColor
                },version:64},{itemId:${Face},version:64},{itemId:${Hair},version:64},{itemId:${
                  12000 + SkinColor
                },version:64},${equips}/stand1/animated?resize=1&renderMode=default&flipX=true`}
                alt=''
                loading='lazy'
              />
              <figcaption className='text-white font-arial text-base mt-2 bg-[#5479c4] border-solid border-white border-2 shadow-[0px_0px_3px_rgba(0,0,0,.5)] px-3 py-1 rounded-md'>
                {Name}
              </figcaption>
              <CharacterPopup character={character} />
            </figure>
          );
        })}
      </div>
    </section>
    )
  }

  return <></>
};

export default OnlineCharacterList;

import {convertAniBinaryToCSS} from 'ani-cursor';

export const applyCursor = async (selector: string, aniUrl: string) => {
  const response = await fetch(aniUrl);
  const data = new Uint8Array(await response.arrayBuffer());
  const style = document.createElement('style')
  const convertedData = convertAniBinaryToCSS(selector, data)
  style.innerText = convertedData
  document.head.append(style)
  return convertedData
}
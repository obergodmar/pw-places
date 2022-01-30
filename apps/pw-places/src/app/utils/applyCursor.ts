import { convertAniBinaryToCSS } from 'ani-cursor';

export async function applyCursor(selector: string, aniUrl: string) {
  const response = await fetch(aniUrl);
  const data = new Uint8Array(await response.arrayBuffer());

  const style = document.createElement('style');
  style.innerText = convertAniBinaryToCSS(selector, data);

  document.head.appendChild(style);
}

import { setTimeout } from "timers/promises";
import { decodeBase64 } from "../utils/utils";

type SeqItem = {
  text: string;
  time: number;
};

const turboText =
  "CiAgIF9fX19fICAgICAgX18gICAgIF9fCiAgLyBfX19ffCAgIC9cXCBcICAgLyAvCiB8IHwgIF9fICAgLyAgXFwgXF8vIC8gCiB8IHwgfF8gfCAvIC9cIFxcICAgLyAgCiB8IHxfX3wgfC8gX19fXyBcfCB8ICAgCiAgXF9fX19fL18vICAgIFxfXF98ICAgCiAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgCg==";

const messageSequence = async (items: SeqItem[]) => {
  for (const item of items) {
    await setTimeout(item.time);
    process.stdout.write(item.text);
  }
};

export const whoami = async () => {
  await messageSequence([
    { text: "Hello from turbo-cli, druzhok-pirozhok.\n", time: 5 },
    { text: "Wait a second... I wanna say something to you.\n", time: 1000 },
    { text: "I think u are", time: 3000 },
    { text: ".", time: 300 },
    { text: ".", time: 300 },
    { text: ".", time: 400 },
    { text: ".", time: 500 },
    { text: ". ", time: 500 },
    { text: "look a bit", time: 1000 },
    { text: ".", time: 300 },
    { text: ".", time: 300 },
    { text: ".", time: 400 },
    { text: ".", time: 400 },
    { text: ".", time: 500 },
    { text: ".", time: 500 },
    { text: ".", time: 500 },
    { text: ".", time: 600 },
    { text: ".", time: 600 },
    { text: ".", time: 600 },
    { text: ".", time: 1000 },
    { text: ". \n", time: 1700 },
  ]);

  const lines = decodeBase64(turboText).split("\n");

  // eslint-disable-next-line no-constant-condition
  while (true) {
    await messageSequence(
      lines.map((line) => ({ text: line + "\n", time: 20 })),
    );
  }
};

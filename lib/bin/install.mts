import { getBinary } from "./shared.mjs";

const install = () => {
  const binary = getBinary();
  binary.install().then(() => {});
};

install();

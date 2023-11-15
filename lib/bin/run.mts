#!/usr/bin/env node
import { getBinary } from "./shared.mjs";

const run = () => {
  const binary = getBinary();
  binary.run();
};

run();

// @ts-ignore
import Binary from './binary.mjs';
// import { Binary } from 'binary-install';
import path from 'path';
import os from 'os';
import fs from 'fs';
import { fileURLToPath } from 'url';

function error(msg: string): never {
  console.error(msg);
  process.exit(1);
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PACKAGE_JSON: typeof import('../package.json') = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../../package.json'), {
    encoding: 'utf8'
  })
);


// type Architecture = 'x64' | 'arm64'

// - build: linux gnu x64
//   os: ubuntu-latest
//   rust: stable
//   target: x86_64-unknown-linux-gnu
// # - build: linux gnu aarch64
// #   os: ubuntu-latest
// #   rust: stable
// #   target: aarch64-unknown-linux-gnu
// - build: macos x64
//   os: macos-latest
//   rust: stable
//   target: x86_64-apple-darwin
// # - build: macos aarch64
// #   os: macos-latest
// #   rust: stable
// #   target: aarch64-apple-darwin


const supportedPlatforms = [
  // {
  //   TYPE: "Windows_NT",
  //   ARCHITECTURE: "x64",
  //   RUST_TARGET: "x86_64-pc-windows-msvc",
  //   BINARY_NAME: "binary-install-example.exe"
  // },
  {
    TYPE: "Linux",
    ARCHITECTURE: "x64",
    RUST_TARGET: "x86_64-unknown-linux-musl",
    BINARY_NAME: "ntr"
  },
  // {
  //   TYPE: "Linux",
  //   ARCHITECTURE: "x64",
  //   RUST_TARGET: "x86_64-unknown-linux-musl",
  //   BINARY_NAME: "binary-install-example"
  // },
  {
    TYPE: "Darwin",
    ARCHITECTURE: "x64",
    RUST_TARGET: "x86_64-apple-darwin",
    BINARY_NAME: "ntr"
  },
  {
    TYPE: "Darwin",
    ARCHITECTURE: "arm64",
    RUST_TARGET: "x86_64-apple-darwin",
    BINARY_NAME: "ntr"
  }
] as const;

const getPlatformMetadata = () => {
  const type = os.type();
  const architecture = os.arch();

  const platform = supportedPlatforms.find(x => type === x.TYPE && architecture === x.ARCHITECTURE) ?? null;

  if (platform === null) return error(
    `Platform with type "${type}" and architecture "${architecture}" is not supported by ${PACKAGE_JSON.name}.\nYour system must be one of the following:\n\n${JSON.stringify(supportedPlatforms, null, 2)}`
  );

  return platform
};

export const getBinary = () => {
  const platformMetadata = getPlatformMetadata();
  const version = PACKAGE_JSON.version.split('-').shift()!;
  // the url for this binary is constructed from values in `package.json`
  // https://github.com/EverlastingBugstopper/binary-install/releases/download/v1.0.0/binary-install-example-v1.0.0-x86_64-apple-darwin.tar.gz
  const url = `${PACKAGE_JSON.repository.url}/releases/download/v${version}/${'ntr'}-${platformMetadata.RUST_TARGET}.tar.gz`;
  // const url = `https://github.com/Ziothh/ntr/releases/download/v0.0.0/ntr-x86_64-unknown-linux-musl.tar.gz`;
  const installDirectory = path.join(__dirname, "../../node_modules", ".bin");

  // console.log('Binary dir: ', ))
  // console.log('\n\n\n\n');
  // console.log(`Fetching from "${url}"`);
  // console.log(`installDirectory: "${installDirectory}"`);
  // console.log("wgwefewfewfweF: ", __dirname);
  // console.log('\n\n\n\n');

  return new Binary(platformMetadata.BINARY_NAME, url, {
    // installDirectory: path.join(process.cwd(), "node_modules", ".bin")
    // installDirectory: path.join(__dirname, ".bin")
    installDirectory,
  });
};


const { Binary } = require("binary-install") as typeof import('binary-install');
const os = require("os") as typeof import('os');
const path = require("path") as typeof import('path');
const cTable = require("console.table") as typeof import('console')['table'];
const PACKAGE_JSON = require("./package.json") as typeof import('../package.json');

function error(msg: string): never {
  console.error(msg);
  process.exit(1);
};

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

  for (let supportedPlatform of supportedPlatforms) {
    if (
      type === supportedPlatform.TYPE &&
      architecture === supportedPlatform.ARCHITECTURE
    ) {
      return supportedPlatform;
    }
  }

  error(
    `Platform with type "${type}" and architecture "${architecture}" is not supported by ${name}.\nYour system must be one of the following:\n\n${cTable.getTable(
      supportedPlatforms
    )}`
  );
};

const getBinary = () => {
  const platformMetadata = getPlatformMetadata();
  // the url for this binary is constructed from values in `package.json`
  // https://github.com/EverlastingBugstopper/binary-install/releases/download/v1.0.0/binary-install-example-v1.0.0-x86_64-apple-darwin.tar.gz
  const url = `${repository.url}/releases/download/rust_v${version}/${name}-v${version}-${platformMetadata.RUST_TARGET}.tar.gz`;
  return new Binary(platformMetadata.BINARY_NAME, url, version, {
    installDirectory: join(__dirname, "node_modules", ".bin")
  });
};

const run = () => {
  const binary = getBinary();
  binary.run();
};

const install = () => {
  const binary = getBinary();
  binary.install();
};

module.exports = {
  install,
  run
};

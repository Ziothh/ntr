import childProcess from 'child_process';
import fs from 'fs';
import path from 'path';

// const axios = require("axios");
import tar from 'tar';
// const rimraf = require("rimraf");

function error(msg: string, cause?: Error) {
  console.error(msg, ...(cause ? [cause] : []));
  process.exit(1);
};

export default class Binary {
  private readonly installDirectory: string;
  private readonly binaryPath: string;

  constructor(
    public readonly name: string,
    public readonly url: string | URL,
    config?: {
      installDirectory: string
    }
  ) {
    try {
      new URL(url);
    } catch (e: any) {
      error(`The given URL "${e}" is not valid`, e);
    }

    this.url = url;
    this.name = name;
    this.installDirectory =
      config?.installDirectory || path.join(__dirname, "node_modules", ".bin");

    if (!fs.existsSync(this.installDirectory)) {
      fs.mkdirSync(this.installDirectory, { recursive: true });
    }

    this.binaryPath = path.join(this.installDirectory, this.name);
  }

  private exists() {
    return fs.existsSync(this.binaryPath);
  }

  public async install(suppressLogs = false) {
    if (this.exists()) {
      if (!suppressLogs) {
        console.error(
          `${this.name} is already installed, skipping installation.`
        );
      }
      return Promise.resolve();
    }

    if (fs.existsSync(this.installDirectory)) {
      childProcess.execSync(`rm -rf ${this.installDirectory}`);
    }

    fs.mkdirSync(this.installDirectory, { recursive: true });

    if (!suppressLogs) {
      console.error(`Downloading release from ${this.url}`);
    }

    const tarFileLocation = path.resolve(this.installDirectory, this.url.toString().split('/').pop() ?? 'download.tar.gz');
    return await fetch(this.url)
      .then(res => res.arrayBuffer())
      .then(blob => {
        // const file = new File([blob], tarFileLocation)

        fs.appendFileSync(tarFileLocation, new Uint8Array(blob));
        // console.log('Wrote tar file to ', tarFileLocation);




        return new Promise((res, rej) => {
          const stream = fs.createReadStream(tarFileLocation).pipe(
            tar.x({
              // strip: 1,
              C: this.installDirectory, // alias for cwd:'some-dir', also ok
            })
          );

          // console.log('Doing stream things');

          stream.on('finish', res);
          stream.on('error', rej);
        })
          .then(() => {
            childProcess.spawnSync(`chmod +x ${this.binaryPath}`);
            fs.unlinkSync(tarFileLocation);
            // console.log('Delete tar file');
          });
      });
  }

  public run() {
    const promise = !this.exists()
      ? this.install(true)
      : Promise.resolve();

    promise
      .then(() => {
        const [, , ...args] = process.argv;

        const result = childProcess.spawnSync(this.binaryPath, args, {
          cwd: process.cwd(),
          stdio: 'inherit'
        });

        if (result.error) {
          error(result.error as any);
        }

        process.exit(result.status ?? 0);
      })
      .catch(e => {
        error(e.message);
        process.exit(1);
      });
  }
}

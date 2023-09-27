import { type Config } from "tailwindcss";
// @ts-expect-error
import libConfig from '@acme/lib/tailwind.config';


export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "../lib/**/*.tsx"],
  theme: {
    extend: {},
  },
  plugins: [],
  presets: [libConfig],
} satisfies Config;

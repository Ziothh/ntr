"use client"

import { useState } from "react"

import { Switch } from '../shadcn/ui/switch';



interface Props {
}


const DebugTheme: React.FC<Props> = ({
}) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  return (
    <div className="max-h-full h-full overflow-hidden">
      <h2 className="text-xl mb-4">Theme</h2>

      <label className="flex flex-col gap-2">
        {`Dark mode is ${theme === "dark" ? "" : "in"}active.`}

        <Switch
          name="darkMode"
          checked={theme === "dark"}
          onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        />
      </label>
    </div>
  )
}


export default DebugTheme

"use client";

import {useState} from "react";
import {IoMoonSharp} from "react-icons/io5";
import {IoIosSunny} from "react-icons/io";

const themes = {
  cupcake: "cupcake",
  night: "night",
};

const ThemeToggle = ({IconLight, IconDark}) => {
  const [theme, setTheme] = useState(themes.cupcake);

  const toggleTheme = () => {
    const newTheme = theme === themes.cupcake ? themes.night : themes.cupcake;
    document.documentElement.setAttribute("data-theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <button onClick={toggleTheme} className="btn btn-sm btn-outline">
      {theme === themes.cupcake ? <IoMoonSharp className="h-4 w-4"/> : <IoIosSunny className="h-4 w-4"/>}
    </button>
  );
};

export default ThemeToggle;

import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

// create context
export const ThemeContext = createContext({ theme: "lightblue" }); // need to use variable instead of colors

// create provider to provide context to all its children
function ThemeProvider(props) {
  const [theme, setTheme] = useState("lightblue");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div style={{ backgroundColor: theme }}>
        {" "}
        {/* padding: "0 90px" */}
        {props.children}
      </div>
    </ThemeContext.Provider>
  );
}
export default ThemeProvider;

// step 3: create custom hook for using context
export function useTheme() {
  return useContext(ThemeContext);
}

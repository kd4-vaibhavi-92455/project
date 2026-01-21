import { useState } from "react";
import "./App.css";
import "./index.css";
import ThemeProvider from "../providers/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <div className="bg-amber-400">
        <p className="read-the-docs dark text-primary">
          Project basic structure..
        </p>
      </div>
    </ThemeProvider>
  );
}

export default App;

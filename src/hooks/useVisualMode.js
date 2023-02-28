import { useState } from "react";


export default function useVisualMode(initial) {
  //const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  //push into arr
  const transition = (newMode, replace) => {
    const newHistory =[...history];
    if(replace) {
      newHistory.pop();
    }
    setHistory([...newHistory, newMode]);
  }

  //pop out of arr
  const back = () => {
    if(history.length < 2) {
      return;
    }
    const newHistory =[...history];
    newHistory.pop();
    setHistory(newHistory);
  }

const mode = history.slice(-1)[0];
//console.log('histoy',mode);
return { mode, transition, back };
};
import { useEffect, useRef, useState } from "react";
import "./App.css";
import item from "./components/item";
import Item from "./components/item";
import { isNumber } from "test/utils";

function App() {
  const cashierStyle = {
    height: 100,
    width: 100,
    backgroundColor: "red",
    margin: "20px 20px",
  };

  const [lines, setLines] = useState([[4], [6], [8], [9], [10]]);
  const input = useRef(null);

  function handleCheckout(e) {
    e.preventDefault();

    if (Number.isNaN(Number.parseInt(input.current.value))) return;

    let smallest = Number.MAX_VALUE;
    let smallestIndex;

    lines.forEach((line, index) => {
      const sumOfItems = line.reduce((prev, curr) => curr + prev, 0);

      if (sumOfItems < smallest) {
        smallest = sumOfItems;
        smallestIndex = index;
      }
    });

    setLines((prevLine) =>
      prevLine.map((line, index) => {
        if (index === smallestIndex) {
          return [...line, Number.parseInt(input.current.value)];
        } else {
          return line;
        }
      })
    );
  }

  useEffect(() => {
    const decrement = setInterval(() => {
      setLines((prevLines) =>
        prevLines.map((line) => {
          return [line[0] - 1, ...line.slice(1)].filter((item) => item >= 1);
        })
      );
    }, 2500);

    return () => {
      clearInterval(decrement);
    };
  }, []);

  return (
    <div className="App">
      <form onSubmit={handleCheckout}>
        <input ref={input} type="number"></input>
        <button type="submit"> Checkout </button>
      </form>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {lines.map((line, idx) => (
          <div key={idx}>
            <div style={cashierStyle}></div>
            {line.map((item, index) => (
              <Item key={index} item={item} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

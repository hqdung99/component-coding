import React, { useRef, useState, useEffect } from "react";

function AutoSizer(props) {
  const { children } = props;
  const ref = useRef(null);
  const [componentSize, setComponentSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    setComponentSize({
      width: ref.current.clientWidth,
      height: ref.current.clientHeight,
    });

    const handleDivResize = () => {
      setComponentSize({
        width: ref.current.clientWidth,
        height: ref.current.clientHeight,
      });
    };
    window.addEventListener("resize", handleDivResize);

    return () => {
      window.removeEventListener("resize", handleDivResize);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        border: "2px solid blue",
        width: "100%",
        height: "100%",
      }}
    >
      {children({ ...componentSize })}
    </div>
  );
}

export default function App() {
  return (
    <div
      style={{
        border: "2px solid red",
        width: "50vw",
        height: "50vh",
      }}
    >
      <AutoSizer>
        {({ width, height }) => (
          <div
            style={{
              border: "2px solid green",
              width: width / 2,
              height: height / 2,
            }}
          >{`Width: ${width}, Height: ${height}`}</div>
        )}
      </AutoSizer>
    </div>
  );
}

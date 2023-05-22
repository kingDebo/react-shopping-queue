import React from "react";

export default function Item({ item }) {
  return (
    <div
      style={{
        height: 100,
        width: 100,
        backgroundColor: "blue",
        color: "white",
        margin: "20px 20px",
        borderRadius: "100%",
        display: "grid",
        placeContent: "center",
      }}
    >
      {item}
    </div>
  );
}

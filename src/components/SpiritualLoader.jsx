import React from "react";

const logo = "/logo.png";

const palette = [
  "#E2B385",
  "#C99665",
  "#2D545E",
  "#103438",
  "#D7D7D7",
];

const SpiritualLoader = ({ fullScreen = true }) => {
  return (
    <div
      className={`spiritual-loader ${fullScreen ? "spiritual-loader--screen" : ""}`}
      role="status"
      aria-live="polite"
    >
      <div className="spiritual-loader__panel" aria-hidden="true">
        <div className="spiritual-loader__logo-wrap">
          <img src={logo} alt="" />
        </div>

        <div className="spiritual-loader__wallpaper">
          <span className="spiritual-loader__roll" />
          <span className="spiritual-loader__sheet spiritual-loader__sheet--one" />
          <span className="spiritual-loader__sheet spiritual-loader__sheet--two" />
          <span className="spiritual-loader__sheet spiritual-loader__sheet--three" />
        </div>

        <div className="spiritual-loader__palette">
          {palette.map((color) => (
            <span key={color} style={{ backgroundColor: color }} />
          ))}
        </div>

        <span className="spiritual-loader__text">Curating beautiful spaces</span>
        <span className="spiritual-loader__bar">
          <span />
        </span>
      </div>
      <span className="sr-only">Loading Life n Colors</span>
    </div>
  );
};

export default SpiritualLoader;

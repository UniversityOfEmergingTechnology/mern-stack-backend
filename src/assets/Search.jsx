import React from "react";

function Icon({color , className}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
    >
      <g
        stroke={`${color}`}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
        <path d="M9.583 17.5a7.917 7.917 0 100-15.833 7.917 7.917 0 000 15.833z"></path>
        <path d="M18.333 18.333l-1.666-1.666"></path>
      </g>
    </svg>
  );
}

export default Icon;

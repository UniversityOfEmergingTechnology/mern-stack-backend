import React from "react";

function Icon({color , className}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width="25"
      height="10"
      // style={{display:'none'}}
      fill="none"
      viewBox="0 0 25 10"
    >
      <g fill={`${color}`}>
        <path d="M0 0H25V2H0z"></path>
        <path d="M10 8H25V10H10z"></path>
      </g>
    </svg>
  );
}

export default Icon;

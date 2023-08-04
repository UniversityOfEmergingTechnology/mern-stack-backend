import React from "react";

function Icon({color , className}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="9"
      className={className}
      height="6"
      fill="none"
      viewBox="0 0 9 6"
    >
      <path
        fill={`${color}`}
        d="M5.077 5.34l3.787-3.788A.462.462 0 009 1.222a.462.462 0 00-.136-.329L8.585.615a.466.466 0 00-.658 0l-3.18 3.18L1.561.61a.463.463 0 00-.659 0L.626.89a.462.462 0 00-.136.33c0 .124.049.24.136.328L4.416 5.34a.463.463 0 00.33.136.463.463 0 00.33-.136z"
      ></path>
    </svg>
  );
}

export default Icon;

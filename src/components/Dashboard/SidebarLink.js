import React from "react";
import * as Icons from "react-icons/vsc";
import { NavLink, matchPath, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

const SidebarLink = ({ link, iconName }) => {
  const location = useLocation();
  // const dispatch = useDispatch()
  const Icon = Icons[iconName];

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };
  return (
    <NavLink
      to={link.path}
      className={`relative px-8 py-3 font-meidum ${
        matchRoute(link.path)
          ? "text-white rounded-[16px] bg-[#1a064f]"
          : "text-[#4f5478] font-walsheimMed"
      } transition-all text-sm duration-1000 hover:scale-95 scale-90`}
    >
      <div className="flex items-center gap-x-2">
        <Icon
          className={`text-lg 
      ${matchRoute(link.path) ? "text-white" : "text-[#4f547b]"}`}
        />
        <span>{link.name}</span>
      </div>
    </NavLink>
  );
};

export default SidebarLink;

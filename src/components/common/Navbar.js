import React, { useEffect, useState } from "react";
import logo from "../../assets/new_logo.png";
import Search from "../../assets/Search.jsx";
import Basket from "../../assets/Basket.jsx";
import Vector from "../../assets/Vector.jsx";
import Sidebar from "../../assets/Sidebar.jsx";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileDropdown from "../Auth/ProfileDropdown";
import { fetchCourseCategories } from "../../services/operations/courseDetailsAPI";

const pagesData = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Login",
    path: "/login",
  },
  {
    name: "Signup",
    path: "/signup",
  },
  {
    name: "Contact Us",
    path: "/contact-us",
  },
  {
    name: "About Us",
    path: "/about-us",
  },
];

const Navbar = ({ theme }) => {
  const [loading, setLoading] = useState(false);
  const [subLinks, setSubLinks] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetchCourseCategories();
        setSubLinks(res);
      } catch (error) {
        console.log("Could not fetch categories", error);
      }
      setLoading(false);
    })();
  }, []);

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  // we need to implement use effect after we are completed with backend of categories
  return (
    <div
      className={`${
        theme === "dark" ? "bg-black border-b-white" : "bg-white border-b-black"
      }   flex flex-row  border-b-[1px] border-opacity-50  items-center justify-between px-[15px] py-[15px]`}
    >
      {/* left side */}
      <div className=" flex flex-row lg:px-[25px] items-center gap-2 ">
        <Link to="/">
          <img
            src={logo}
            className="w-[45px] h-[45px]"
            alt="Logo not able to show"
          />
        </Link>
        <Link to="/">
          <h2
            className={`${
              theme === "dark" ? "text-white" : "text-black"
            } font-[700] text-[10px] lg:text-[18px] text-center font-walsheimCon leading-normal`}
          >
            Uniemtech <br className="text-[6px] lg:text-sm" />
            Digital Academy
          </h2>
        </Link>
        <div className="hidden lg:flex flex-row pl-[40px]  items-center gap-4">
          {/* lines image */}
          <div className="flex flex-col skew-x-[-15deg]  items-center gap-[0.35rem]">
            <div
              className={`w-[15px] h-[2px] ${
                theme === "dark" ? "bg-[#00FF84]" : "bg-[#6440FB]"
              }`}
            ></div>
            <div
              className={`w-[15px] h-[2px] ${
                theme === "dark" ? "bg-[#00FF84]" : "bg-[#6440FB]"
              }`}
            ></div>
            <div
              className={`w-[15px] h-[2px] ${
                theme === "dark" ? "bg-[#00FF84]" : "bg-[#6440FB]"
              }`}
            ></div>
          </div>
          <div
            className={`font-walsheimMed ${
              theme === "dark" ? "text-[#00FF84]" : "text-[#6440FB]"
            }   hidden md:block  text-[15px] leading-[26px]`}
          >
            Explore
          </div>
        </div>
      </div>

      {/* middle section */}
      <div
        className={`hidden xl:flex flex-row gap-[2rem] ${
          theme === "dark" ? "text-white" : "text-black"
        } `}
      >
        <div className="flex flex-row cursor-pointer gap-[0.5rem] items-center">
          <Link to="/about-us" className="text-[15px] ">
            About Us
          </Link>
          {/* <img src={Vector}  alt="Vector" /> */}
        </div>
        <div className="flex flex-row cursor-pointer group relative gap-[0.5rem] items-center">
          <div className="text-[15px]">Categories</div>
          <Vector color={`${theme === "dark" ? "white" : "black"}`} />

          <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
            <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
            {loading ? (
              <p className="text-center">Loading...</p>
            ) : subLinks.length ? (
              <>
                {subLinks
                  ?.filter((subLink) => subLink?.courses?.length > 0)
                  ?.map((subLink, i) => (
                    <Link
                      to={`/catalog/${subLink.name
                        .split(" ")
                        .join("-")
                        .toLowerCase()}`}
                      className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                      key={i}
                    >
                      <p className="font-walsheimMed font-[400] text-darkblue">
                        {subLink.name}
                      </p>
                    </Link>
                  ))}
              </>
            ) : (
              <p className="text-center">No Categories Found</p>
            )}
          </div>
        </div>
        <div className="flex flex-row cursor-pointer relative group gap-[0.5rem] items-center">
          <div className="text-[15px] ">Events</div>
          <Vector color={`${theme === "dark" ? "white" : "black"}`} />
          <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-white p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
            <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-white"></div>
            <p className="rounded-lg text-center  bg-transparent py-4  text-darkblue font-walsheimCon">
              Coming Soon....
            </p>
          </div>
        </div>

        <div className="flex flex-row cursor-pointer gap-[0.5rem] items-center">
          <div className="text-[15px]">Blog</div>
        </div>
        <div className="flex flex-row cursor-pointer group relative gap-[0.5rem] items-center">
          <div className="text-[15px]">Pages</div>
          <Vector color={`${theme === "dark" ? "white" : "black"}`} />

          <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
            <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
            {pagesData.map((page, index) => (
              <Link
                to={page.path}
                className="rounded-lg font-walsheimMed font-[400] text-darkblue bg-transparent py-4 pl-4 hover:bg-richblack-50"
                key={index}
              >
                {page.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-row cursor-pointer gap-[0.5rem] items-center">
          <Link to="/contact-us" className="text-[15px]">
            Contact
          </Link>
        </div>
      </div>

      {/* right section */}

      <div className="flex flex-row gap-4 items-center">
        <Search
          className="w-[20px] h-[20px]"
          color={`${theme === "dark" ? "white" : "black"}`}
        />
        {/* you have show cart only to student  */}
        {user && user?.accountType !== "Instructor" && (
          <Link to="/dashboard/cart" className="relative">
            <Basket
              className="w-[20px] h-[20px]"
              color={`${theme === "dark" ? "white" : "black"}`}
            />
            {totalItems > 0 && (
              <span className="animate-bounce items-center flex justify-center w-5 h-5 absolute -top-3 
              left-[7.5px] rounded-full bg-black text-white text-[12px]">
                {totalItems}
              </span>
            )}
          </Link>
        )}

        <Sidebar
          className="lg:hidden"
          alt="Sidebar not able to show"
          color={`${theme === "dark" ? "white" : "black"}`}
        />
        {token === null && (
          <Link to="/login" className="lg:block hidden">
            <button
              className={`text-[15px] hidden lg:block font-walsheimCon leading-[26px] ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              Log In
            </button>
          </Link>
        )}
        {token === null && (
          <Link to="/signup" className="lg:block hidden">
            <div
              className={`w-[120px] hidden lg:flex h-[40px] flex-row items-center justify-center rounded-[8px] ${
                theme === "dark" ? "text-black bg-white" : "text-white bg-black"
              }`}
            >
              <button
                className={`text-[15px]  leading-[26px] font-walsheimCon `}
              >
                Sign Up
              </button>
            </div>
          </Link>
        )}
        {token !== null && <ProfileDropdown />}
      </div>
    </div>
  );
};

export default Navbar;

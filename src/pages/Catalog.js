import React, { useEffect, useState } from "react";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import { useParams } from "react-router-dom";
import { getCatalogPageData } from "../services/operations/pageAndComponentData";
import { fetchCourseCategories } from "../services/operations/courseDetailsAPI";
import { useSelector } from "react-redux";
import CourseSlider from "../components/Catalog/CourseSlider";
import Course_Card from "../components/Catalog/Course_Card";

const Catalog = () => {
  const { loading } = useSelector((state) => state.profile);
  const { catalogName } = useParams();
  const [active, setActive] = useState(1);
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [filter, setFilter] = useState(null);

  // fetch all categories
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetchCourseCategories();
        const category_id = res.filter(
          (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
        )[0]._id;
        console.log(category_id);
        setCategoryId(category_id);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, [catalogName]);

  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const res = await getCatalogPageData(categoryId);
        setCatalogPageData(res);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    if (categoryId) {
      getCategoryDetails();
    }
  }, [categoryId]);

  if (loading || !catalogPageData) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="loader"></div>
      </div>
    );
  }

  // get the course array and apply the filter to it
  let filteredCourses = [...catalogPageData?.data?.selectedCategory?.courses];

  switch (filter) {
    case "Price Ascending":
      filteredCourses.sort((a, b) => a.price - b.price);
      break;
    case "Price Descending":
      filteredCourses.sort((a, b) => b.price - a.price);
      break;
    case "Name Ascending":
      filteredCourses.sort((a, b) => a.courseName.localeCompare(b.courseName));
      break;
    case "Name Descending":
      filteredCourses.sort((a, b) => b.courseName.localeCompare(a.courseName));
      break;
    default:
      // no filter selected or unknown filter selected do not sort
      break;
  }

  return (
    <>
      <Navbar />
      {/* hero section */}
      <div className="box-content bg-richblack-800 px-4">
        <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent">
          <p className="text-sm text-richblack-300">
            {`Home / Catalog / `}{" "}
            <span className="text-yellow-25">
              {catalogPageData?.data?.selectedCategory?.name}
            </span>{" "}
          </p>
          <p className="text-3xl text-richblack-5">
            {catalogPageData?.data?.selectedCategory?.name}
          </p>
          <p className="max-w-[870px] text-richblack-200">
            {(catalogPageData?.data?.selectedCategory?.description).substring(
              0,
              300
            )}
            ...
          </p>
        </div>
      </div>

      {/* section1 */}
      <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="text-[30px] font-walsheimCon text-darkblue">
          Courses to get you started
        </div>
        <div className="my-4 justify-between flex border-b border-b-richblack-600 text-sm">
          <div className="flex flex-row">
            <p
              className={`px-4 py-2 cursor-pointer ${
                active === 1
                  ? "border-b border-b-darkblue text-darkblue"
                  : "text-richblack-50"
              }`}
              onClick={() => setActive(1)}
            >
              Most popular
            </p>
            <p
              className={`px-4 py-2 cursor-pointer ${
                active === 2
                  ? "border-b border-b-darkblue text-darkblue"
                  : "text-richblack-50"
              }`}
              onClick={() => setActive(2)}
            >
              New
            </p>
          </div>
          <select
            onChange={(e) => setFilter(e.target.value)}
            className="px-[3px] rounded-[10px] py-[12px] gap-[20px] flex flex-col border-[1px] border-pure-greys-100 mb-2 cursor-pointer outline-none text-darkblue font-walsheimReg"
          >
            <option value="">Filter</option>
            <option value="Price Ascending">Price Ascending</option>
            <option value="Price Descending">Price Descending</option>
            <option value="Name Ascending">Name Ascending</option>
            <option value="Name Descending">Name Descending</option>
          </select>
        </div>
        <div>
          <CourseSlider Courses={filteredCourses} filter={filteredCourses} />
        </div>
      </div>

      {/* Section 2 */}
      <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="text-[30px] font-walsheimCon text-darkblue">
          Top course in {catalogPageData?.data?.differentCategory?.name}
        </div>
        <div className="py-8">
          <CourseSlider
            Courses={catalogPageData?.data?.differentCategory?.courses}
          />
        </div>
      </div>

      {/* section 3 */}
      <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="text-[30px] font-walsheimCon text-darkblue">
          Frequently Bought
        </div>
        <div className="py-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {catalogPageData?.data?.mostSellingCourses
              ?.slice(0, 4)
              .map((course, i) => (
                <Course_Card course={course} key={i} height={"h-[400px]"} />
              ))}
          </div>
        </div>
      </div>

      <div className="py-[100px] px-[50px] lg:px-[100px] bg-black text-white">
        <Footer/>
      </div>
    </>
  );
};

export default Catalog;

import React from 'react'
import one from '../../assets/categories/one.svg'
import two from '../../assets/categories/two.svg'
import three from '../../assets/categories/three.svg'
import fourth from '../../assets/categories/fourth.svg'
import fifth from '../../assets/categories/fifth.svg'
import sixth from '../../assets/categories/sixth.svg'

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {Swiper , SwiperSlide} from 'swiper/react'
// import SwiperCore , {AutoPlay , Pagination , Navigation} from "swiper"
import { Navigation, Pagination ,Autoplay } from 'swiper/modules';


const categoriesData = [
    {
        img : one , 
        title : "Design Creative",
        courses : "573+ Courses"
    },
    {
        img: two ,
        title:'Sales Marketing',
        courses : "565+ courses"
    },
    {
        img : three , 
        title : "Finance Accouting",
        courses : "126+courses"
    },
    {
        img:fourth , 
        title : "Development IT",
        courses : "35+ courses"
    },
    {
        img : fifth , 
        title : "Engineering Architecture",
        courses : "50+ courses"
    },
    {
        img: sixth,
        title : "Personal Development",
        courses : "129+ courses"
    },
    {
        img : one , 
        title : "Design Creative",
        courses : "573+ Courses"
    },
    {
        img: two ,
        title:'Sales Marketing',
        courses : "565+ courses"
    },
    {
        img : three , 
        title : "Finance Accouting",
        courses : "126+courses"
    },
    {
        img:fourth , 
        title : "Development IT",
        courses : "35+ courses"
    },
    {
        img : fifth , 
        title : "Engineering Architecture",
        courses : "50+ courses"
    },
    {
        img: sixth,
        title : "Personal Development",
        courses : "129+ courses"
    }

]


const Categories = () => {
  return (
    <div className='flex flex-col gap-5'>
        <h3 className='text-[#140342] text-center text-[30px] leading-normal font-walsheimCon'>Top Categories</h3>
        <p className='text-[15px] font-normal leading-[26px] font-walsheimReg text-center'>Explore our Top Categories</p>
        <Swiper
          modules={[Navigation, Pagination , Autoplay]}
          spaceBetween={50}
          slidesPerView={4}
          onSlideChange={() => console.log("Slide change")}
          onSwiper={(swiper)=> console.log(swiper)}
          loop={true}
          speed={500}
          autoplay
          className='w-[100%] h-[100%] cursor-pointer'
          pagination={{clickable : true}}
          navigation
          breakpoints={{
            320:{
                slidesPerView:2,
                spaceBetween:20
            },
            480:{
                slidesPerView:3,
                spaceBetween:30
            },
            640:{
                slidesPerView:4,
                spaceBetween:40
            }
          }}
        >
            {
                categoriesData.map((category , index) => (
                    <SwiperSlide key={index}>
                        <div className='w-[180px] h-[240px] lg:w-[220px] xl:w-[290px] lg:h-[240px] flex flex-col gap-4 items-center justify-center group hover:bg-black duration-300 rounded-[8px] bg-[#eef2f6]'>
                            <div className='w-24 h-24 flex items-center justify-center bg-white rounded-full'>
                                <img src={category.img} className='w-12 h-12' alt="" />
                            </div>
                            <h3 className='text-[#140342] break-words group-hover:text-white capitalize font-walsheimCon text-[17px] leading-[26px]'>{category.title}</h3>
                            <p className='text-[13px] group-hover:text-white font-walsheimReg leading-normal font-normal'>
                                {category.courses}
                            </p>
                        </div>
                     </SwiperSlide>
                ))
            }
        </Swiper>
    </div>
  )
}

export default Categories
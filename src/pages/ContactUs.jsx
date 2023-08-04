import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import location from "../assets/contact-us/location.svg";
import mail from "../assets/contact-us/mail.svg";
import phone from "../assets/contact-us/phone.svg";
import { apiConnector } from "../services/apiconnector";
import { contactusEndpoint } from "../services/apis";
import { set, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import FaqItem from "../components/Contact/FaqItem";

// AIzaSyAbDLor5DBBfrNKD0FmiRR8PU1zeSPoD6E

const faqData = [
  {
    question: "What courses do you offer for students?",
    answer:
      "At UnimTech, we offer a wide range of courses tailored for students in various disciplines, including programming, data science, cybersecurity, and cloud computing. Our courses are designed to provide comprehensive knowledge and practical skills to help students excel in their chosen fields.",
  },
  {
    question: "How can I enroll in a course?",
    answer:
      "Enrolling in a course at UnimTech is easy! Simply browse our course catalog, choose the course you're interested in, and click on the 'Enroll Now' button. Follow the instructions to complete the enrollment process, and you'll gain access to the course materials and resources.",
  },
  {
    question: "Are the courses self-paced or instructor-led?",
    answer:
      "We offer both self-paced and instructor-led courses to cater to different learning preferences. Our self-paced courses allow you to learn at your own pace, accessing the course materials and completing assignments at your convenience. For instructor-led courses, you'll have scheduled lectures and interactions with the instructor and fellow students.",
  },
  {
    question: "Do you provide certificates upon course completion?",
    answer:
      "Yes, upon successful completion of a course, you will receive a certificate of completion from UnimTech. Our certificates are recognized and can be used to showcase your skills and knowledge to potential employers or academic institutions.",
  },
  {
    question: "Are there any prerequisites for the courses?",
    answer:
      "The prerequisites for each course may vary. Some courses require a basic understanding of programming concepts, while others may require prior knowledge in specific domains. You can find the prerequisites listed on the course details page. If you have any specific questions, feel free to reach out to our support team.",
  },
];

const TouchData = [
  {
    img: location,
    data: "38 Queensberry Street , North Melbourne VIC 3051 , Australia",
  },
  {
    img: phone,
    data: "+(1) 123 456 7890",
  },
  {
    img: mail,
    data: "hi@Uniemtech.com",
  },
];

const center = {
  lat: -37.809811,
  lng: 144.965195,
};
const containerStyle = {
  width: "100%",
  height: "500px",
};
const ContactUs = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitContactForm = async (data) => {
    const toastId = toast.loading("Loading...");
    try {
      setLoading(true);
      const res = await apiConnector(
        "POST",
        contactusEndpoint.CONTACT_US_ENDPOINT,
        data
      );
      console.log("Email response", res);
      setLoading(false);
      toast.success("Your feedback has been sent successfully");
    } catch (error) {
      setLoading(false);
      toast.error("Not able to send your feedback");
    }
    toast.dismiss(toastId);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful, errors },
  } = useForm();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        name: "",
        message: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <>
      <Navbar theme={"dark"} />
      <LoadScript googleMapsApiKey='AIzaSyAbDLor5DBBfrNKD0FmiRR8PU1zeSPoD6E'>
            <GoogleMap zoom={10} center={center} mapContainerStyle={containerStyle}>
                <Marker position={center}/>
            </GoogleMap>
        </LoadScript>

      <div className="mt-[100px] mb-[50px] w-[70%] mx-auto">
        <div className="flex flex-row gap-[100px] mb-[100px]">
          <div className="flex flex-col w-[40%] gap-[10px]">
            <h3 className="text-[#140432] leading-normal text-[24px] font-walsheimMed">
              Keep in Touch With Us
            </h3>
            <p className="text-[#4f547b] text-[15px] leading-normal font-normal font-walsheimReg">
              Stay connected with us
            </p>
            <div className="flex flex-col mt-[50px] gap-[50px]">
              {TouchData.map((touch, index) => (
                <div
                  key={index}
                  className="flex flex-row items-center gap-[25px]"
                >
                  <div className="w-[80px] rounded-[100%] p-5 flex items-center justify-center bg-[#e5f0fd]">
                    <img src={touch.img} className="w-[40px] h-[40px]" alt="" />
                  </div>
                  <p className="text-[#4f547b] w-[280px] text-[15px] leading-normal font-normal font-walsheimReg">
                    {touch.data}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-[10px]">
            <h3 className="text-[#140432] leading-normal text-[24px] font-walsheimMed">
              Send a Message
            </h3>
            <p className="text-[#4f547b] text-[15px] leading-normal font-normal font-walsheimReg">
              Contact us by sending a message
            </p>
            <form
              onSubmit={handleSubmit(submitContactForm)}
              className="flex flex-col mt-[80px] gap-[50px]"
            >
              <div className="flex flex-row gap-[20px]">
                <div className="flex flex-col gap-[10px]">
                  <label htmlFor="name" className="lable-style">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    {...register("name", { required: true })}
                    className="border-[1px] font-walsheimReg text-darkblue w-[300px] p-3 h-[35px] border-[#ddd]"
                    placeholder="Enter your Name"
                  />
                  {errors.name && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
                      Please enter your name
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-[10px]">
                  <label htmlFor="email" className="lable-style">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    {...register("email", { required: true })}
                    className="border-[1px] font-walsheimReg text-darkblue w-[300px] p-3 h-[35px] border-[#ddd]"
                    placeholder="Enter your Email"
                  />
                  {errors.name && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
                      Please enter your email address
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-[10px]">
                <label htmlFor="message" className="lable-style">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  className="border-[1px] font-walsheimReg text-darkblue   p-3 
                  border-[#ddd]"
                  {...register("message", { required: true })}
                  rows={7}
                  cols={30}
                  placeholder="Enter your message"
                />
                {errors.message && (
                  <span className="-mt-1 text-[12px] text-yellow-100">
                    Please enter your message
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`self-start px-[55px] py-[21px] ${
                  !loading &&
                  "transition-all duration-300 hover:scale-90 hover:shadow-none"
                } text-white bg-[#6440fb] font-walsheimCon duration-300 hover:scale-90 rounded-lg`}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* faq section */}
      <div className="bg-[#f7f8fb] py-[100px] flex flex-col">
        <h1 className="text-[30px] text-center font-walsheim font-[700] leading-normal">
          Frequently Asked Questions
        </h1>
        <p className="font-walsheimReg leading-[26px] font-[400] text-[15px] text-center">
          Find answers to commonly asked questions below
        </p>

        <div className="flex mt-[50px] flex-col gap-[10px] items-center">
          {faqData.map((faq, index) => (
            <FaqItem
              key={index}
              faq={faq}
              isSelected={selectedQuestion === index}
              onSelected={() =>
                setSelectedQuestion(selectedQuestion === index ? null : index)
              }
            />
          ))}
        </div>
      </div>
      <div className="bg-black">
        <Footer />
      </div>
    </>
  );
};

export default ContactUs;

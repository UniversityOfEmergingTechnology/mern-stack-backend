import React from "react";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import {CSSTransition} from 'react-transition-group'
import './FaqItem.css'

const FaqItem = ({ faq, isSelected, onSelected }) => {
  return (
    <div
      style={{ boxShadow: "0 1px 4px 0 rgba(20,3,66,0.07)" }}
      className="flex flex-col gap-[20px] py-5 px-16 w-[730px] relative rounded-[16px] bg-white"
    >
      <div onClick={onSelected}>
        {isSelected ? (
          <FiMinusCircle
            size={20}
            className="duration-300 hover:scale-90 absolute top-6 left-5 cursor-pointer"
          />
        ) : (
          <FiPlusCircle
            size={20}
            className="duration-300 hover:scale-90 absolute top-6 left-5 cursor-pointer"
          />
        )}
        <h3 className="text-darkblue font-walsheimCon text-[17px] capitalize leading-[26px] font-[400]">{faq.question}</h3>
      </div>
      <div>
      <CSSTransition
        in={isSelected}
        timeout={1000}
        classNames="faq"
        unmountOnExit
      >
        <p className="text-[#4f547b] text-justify font-walsheimMed leading-[26px] font-normal">{faq.answer}</p>
      </CSSTransition>

      </div>

    </div>
  );
};

export default FaqItem;

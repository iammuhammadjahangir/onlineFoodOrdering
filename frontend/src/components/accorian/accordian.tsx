// import React, { useEffect, useRef, useState } from "react";
// import { MdOutlineKeyboardArrowDown } from "react-icons/md";

// interface AccordionProps {
//   title: string;
//   isRequired: boolean;
//   isSelected: boolean;
//   children: React.ReactNode;
//   index: number;
//   openAccordionIndex: number | null; // Changed to number | null
// }

// const Accordion: React.FC<AccordionProps> = ({
//   title,
//   isRequired,
//   isSelected,
//   children,
//   index,
//   openAccordionIndex,
// }) => {
//   const navRef = useRef<HTMLDivElement | null>(null);
//   const [isOpenAccordian, setIsOpenAccordian] = useState(false);

//   const toggleAccordion = () => {
//     setIsOpenAccordian((prev) => !prev);
//   };

//   console.log(openAccordionIndex);
//   console.log(index);

//   useEffect(() => {
//     setIsOpenAccordian(true);
//     if (openAccordionIndex === index) {
//     } else {
//       setIsOpenAccordian(false);
//     }
//   }, [openAccordionIndex, index]);

// useEffect(() => {
//   const handleResize = () => {
//     if (navRef.current) {
//       navRef.current.style.height = isOpenAccordian
//         ? `${navRef.current.scrollHeight + 10}px`
//         : "0px";
//     }
//   };

//   handleResize(); // Call on mount

//   window.addEventListener("resize", handleResize);
//   return () => {
//     window.removeEventListener("resize", handleResize);
//   };
// }, [isOpenAccordian]);

//   return (
//     <section className="accordionContainer">
//       <section className="accordionHeader" onClick={toggleAccordion}>
//         <article>
//           <h2>{title}</h2>
//           {isRequired && (
//             <span className={isSelected ? "selected" : "required"}>
//               {isSelected ? "Selected" : "Required"}
//             </span>
//           )}
//         </article>
//         <MdOutlineKeyboardArrowDown
//           className={isOpenAccordian ? "arrow open" : "arrow"}
//         />
//       </section>
//       <section
//         ref={navRef}
//         className={`accordionBody ${isOpenAccordian ? "open" : ""}`}
// style={{
//   height: isOpenAccordian ? `${navRef.current?.scrollHeight}px` : "0px",
//   transition: "height 0.3s ease",
// }}
//       >
//         {children}
//       </section>
//     </section>
//   );
// };

// export default Accordion;

import React, { useEffect, useRef, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

interface AccordionProps {
  title: string;
  isRequired: boolean;
  isSelected: boolean;
  //   isOpenDefault: boolean;
  children: React.ReactNode;
  index: number;
  openAccordionIndex: boolean;
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  isRequired,
  isSelected,
  //   isOpenDefault,
  children,
  index,
  openAccordionIndex,
}) => {
  const navRef = useRef<any>(null);
  const [isOpenAccordian, setIsOpenAccordian] = useState(openAccordionIndex);

  console.log(index);
  const toggleAccordion = () => {
    setIsOpenAccordian(!isOpenAccordian);
  };

  console.log(navRef);
  useEffect(() => {
    toggleAccordion();
  }, [openAccordionIndex]);

  useEffect(() => {
    const handleResize = () => {
      if (navRef.current) {
        navRef.current.style.height = isOpenAccordian
          ? `${navRef.current.scrollHeight + 10}px`
          : "0px";
      }
    };

    handleResize(); // Call on mount

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpenAccordian]);

  return (
    <section className="accordionContainer">
      <section className="accordionHeader" onClick={toggleAccordion}>
        <article>
          <h2>{title}</h2>
          {isRequired && (
            <span className={isSelected ? "selected" : "required"}>
              {isSelected ? "Selected" : "Required"}
            </span>
          )}
        </article>
        <MdOutlineKeyboardArrowDown
          className={isOpenAccordian ? "arrow openHeader" : "arrow"}
        />
      </section>
      {/* {isOpenAccordian && ( */}
      <section
        ref={navRef}
        className={`accordionBody ${isOpenAccordian ? "open" : ""}`}
        style={{
          height: isOpenAccordian ? `${navRef.current?.scrollHeight}px` : "0px",
          transition: "height 0.3s ease",
        }}
      >
        {children}
      </section>
      {/* )} */}
    </section>
  );
};

export default Accordion;

import { Icon } from "@iconify/react";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import countries from "../../assets/countries.json";

interface PhoneNumberProps {
  completePhoneNumber: string;
  name: string;
  maxLength: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (event: React.ChangeEvent<HTMLInputElement>) => void;
  touched: boolean | undefined;
  errors: string | undefined;
  setFieldValues?: (field: string, value: string) => void;
  defaultValue?: string | null;
}

const PhoneNumber = React.memo(
  ({
    name,
    errors,
    handleBlur,
    handleChange,
    maxLength = "13",
    touched,
    setFieldValues,
    defaultValue,
  }: PhoneNumberProps) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isOptionsOpened, setIsOptionsOpened] = useState<boolean>(false);
    const [selectedCountry, setSelectedCountry] = useState({
      icon: <Icon icon="flag:pk-4x3" />,
      phoneCode: "+92",
    });
    const [phoneNumber, setPhoneNumber] = useState(
      defaultValue
        ? defaultValue.substring(selectedCountry.phoneCode.length)
        : ""
    );

    const handleSearch = useCallback(
      debounce((value: string) => {
        setSearchQuery(value.toLowerCase());
      }, 0),
      []
    );

    const handlePhoneNumberChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const countryCodeLength = selectedCountry.phoneCode.length;
        if (inputValue.startsWith(selectedCountry.phoneCode)) {
          setPhoneNumber(inputValue.substring(countryCodeLength));
        } else if (!inputValue.startsWith("+")) {
          setPhoneNumber(inputValue);
        }
      },
      [selectedCountry.phoneCode]
    );

    useEffect(() => {
      const generateNumber = selectedCountry.phoneCode + phoneNumber;
      if (generateNumber && setFieldValues) {
        setFieldValues(name, generateNumber);
      }
      handleChange({
        target: {
          name,
          value: generateNumber,
        },
      } as React.ChangeEvent<HTMLInputElement>);
    }, [phoneNumber, selectedCountry, name, handleChange, setFieldValues]);

    const handleOptionSelect = useCallback((country: any) => {
      setPhoneNumber("");
      setSelectedCountry({
        icon: <Icon icon={`flag:${country.code.toLowerCase()}-4x3`} />,
        phoneCode: `+${country.phone}`,
      });
      setIsOptionsOpened((prev) => !prev);
    }, []);

    const handleSearchInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        handleSearch(value);
      },
      [handleSearch]
    );

    const filteredOptions = useMemo(() => {
      return countries.filter((country) =>
        country.name.toLowerCase().includes(searchQuery)
      );
    }, [searchQuery]);

    return (
      <section className="phoneNumber">
        <div className="selectBox">
          <div className="selectedOption">
            <div
              className="flagAlign"
              onClick={() => setIsOptionsOpened((prev) => !prev)}
            >
              {selectedCountry.icon}
            </div>
            <input
              type="tel"
              name={name}
              maxLength={Number(maxLength)}
              placeholder="Phone Number"
              value={selectedCountry.phoneCode + phoneNumber}
              onChange={(e) => {
                handlePhoneNumberChange(e);
                handleChange(e);
              }}
              onBlur={handleBlur}
            />
          </div>
          <div className={`options ${isOptionsOpened && "active"}`}>
            <input
              type="text"
              className="searchBox"
              placeholder="Search Country Name"
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
            <ol>
              {filteredOptions.map((country: any) => (
                <li
                  key={country.code}
                  className="option"
                  onClick={() => handleOptionSelect(country)}
                >
                  <div className="flagAlign">
                    <Icon icon={`flag:${country.code.toLowerCase()}-4x3`} />
                    <span className="country-name">{country.name}</span>
                  </div>
                  <strong>+{country.phone}</strong>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <p className="error">{touched && errors ? errors : null}</p>
      </section>
    );
  }
);

export default PhoneNumber;

function debounce(func: Function, wait: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// import { Icon } from "@iconify/react";
// import React, { useEffect, useState } from "react";
// import countries from "../../assets/countries.json"; // Assuming you have an array of countries

// interface PhoneNumberProps {
//   completePhoneNumber: string;
//   name: string;
//   maxLength: string;
//   handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
//   handleBlur: (event: React.ChangeEvent<HTMLInputElement>) => void;
//   touched: boolean | undefined;
//   errors: string | undefined;
//   setFieldValues?: (field: string, value: string) => void;
//   defaultValue?: string | null;
// }

// const PhoneNumber = ({
//   name,
//   errors,
//   handleBlur,
//   handleChange,
//   maxLength = "13",
//   touched,
//   setFieldValues,
//   defaultValue,
// }: PhoneNumberProps) => {
//   // UseState for Handling the inputs
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isOptionsOpened, setIsOptionsOpened] = useState<boolean>(false);
//   const [selectedCountry, setSelectedCountry] = useState({
//     icon: <Icon icon="flag:pk-4x3" />,
//     phoneCode: "+92",
//   });
//   const [phoneNumber, setPhoneNumber] = useState(
//     defaultValue ? defaultValue.substring(selectedCountry.phoneCode.length) : ""
//   );

//   //   Handle Search Dropdown of Country Changed
//   const handleOptionSelect = (country: any) => {
//     setPhoneNumber("");
//     setSelectedCountry({
//       icon: <Icon icon={`flag:${country.code.toLowerCase()}-4x3`} />,
//       phoneCode: `+${country.phone}`,
//     });
//     setIsOptionsOpened((prev) => !prev);
//   };

//   //   Handle Search Input Changed
//   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(event.target.value.toLowerCase());
//   };

//   //   Filter the Countries based on the Search Query
//   const filteredOptions = countries.filter((country) =>
//     country.name.toLowerCase().includes(searchQuery)
//   );

//   //   Handle Phone Number Change
//   const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const inputValue = e.target.value;
//     const countryCodeLength = selectedCountry.phoneCode.length;
//     if (inputValue.startsWith(selectedCountry.phoneCode)) {
//       setPhoneNumber(inputValue.substring(countryCodeLength));
//     } else if (!inputValue.startsWith("+")) {
//       setPhoneNumber(inputValue);
//     }
//   };

//   //   Generate Complete Phone Number
//   const generateCompletePhoneNumber = () => {
//     return selectedCountry.phoneCode + phoneNumber;
//   };

//   useEffect(() => {
//     const generateNumber = generateCompletePhoneNumber();
//     if (generateNumber && setFieldValues) {
//       setFieldValues(name, generateNumber);
//     }
//     // Trigger handleChange to validate length
//     handleChange({
//       target: {
//         name,
//         value: generateNumber,
//       },
//     } as React.ChangeEvent<HTMLInputElement>);
//   }, [phoneNumber, selectedCountry]);

//   return (
//     <section className="phoneNumber">
//       <div className="selectBox">
//         <div className="selectedOption">
//           <div
//             className="flagAlign"
//             onClick={() => setIsOptionsOpened((prev) => !prev)}
//           >
//             {selectedCountry.icon}
//             {/* <strong>{selectedCountry.phoneCode}</strong> */}
//           </div>
//           <input
//             type="tel"
//             name={name}
//             maxLength={Number(maxLength)}
//             placeholder="Phone Number"
//             value={selectedCountry.phoneCode + phoneNumber}
//             onChange={(e) => {
//               handlePhoneNumberChange(e);
//               handleChange(e);
//             }}
//             onBlur={handleBlur}
//           />
//         </div>
//         <div className={`options ${isOptionsOpened && "active"}`}>
//           <input
//             type="text"
//             className="searchBox"
//             placeholder="Search Country Name"
//             value={searchQuery}
//             onChange={handleSearch}
//           />
//           <ol>
//             {filteredOptions.map((country: any) => (
//               <li
//                 key={country.code}
//                 className="option"
//                 onClick={() => handleOptionSelect(country)}
//               >
//                 <div className="flagAlign">
//                   <Icon icon={`flag:${country.code.toLowerCase()}-4x3`} />

//                   <span className="country-name">{country.name}</span>
//                 </div>
//                 <strong>+{country.phone}</strong>
//               </li>
//             ))}
//           </ol>
//         </div>
//       </div>
//       <p className="error">{touched && errors ? errors : null}</p>
//     </section>
//   );
// };

// export default PhoneNumber;

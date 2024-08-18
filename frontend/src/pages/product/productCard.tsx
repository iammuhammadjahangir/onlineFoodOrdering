import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { useSnapshot } from "valtio";
import Accordian from "../../components/accorian/accordian";
import Breadcrumb from "../../components/breadcrumb/breadcrumb";
import { addedToLocalStorageCart } from "../../features/addedLocalStorageCart";
import { server } from "../../redux/store";
import valtioStore from "../../redux/valtioStore";
import {
  VariationOptionArrayType,
  VariationOptionStateType,
  VariationOptionType,
  VariationType,
} from "../../types/apiTypes";
import SimilarProducts from "./similarProducts";

type VariationIdType = {
  index: number;
  id: string;
};
type ChoiceIdType = {
  index: number;
  id: string[];
};

const ProductCard = () => {
  const location = useLocation();
  const valtio = useSnapshot(valtioStore);
  const items = location.state?.item || [];
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // accordian
  // Track open accordions by index

  const [openAccordionIndex, setOpenAccordionIndex] = useState<number>(0);
  // const [openAccordions, setOpenAccordions] = useState<number[]>([]);

  // const toggleAccordion = (index: number) => {
  //   setOpenAccordions((prev) =>
  //     prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
  //   );
  // };
  // Variables for storing the variations IDs in the array for radio button, color of required etc.
  const [variations, setvariations] = useState<VariationIdType[]>([]);

  // For storing complete array of variations
  const [variationArray, setVariationArray] = useState<
    VariationOptionStateType[]
  >([]);

  //To hold the id of the choices that we want to add in cart for checkbox
  const [choices, setChoices] = useState<ChoiceIdType[]>([]);

  // Hold the Data of choices that we want to add in cart
  const [choicesArray, setChoicesArray] = useState<VariationOptionArrayType[]>(
    []
  );
  const [finalPrice, setFinalPrice] = useState(items.actualPrice);
  const [quantity, setQuantity] = useState(1);

  console.log(items);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  console.log(openAccordionIndex);
  useEffect(() => {
    if (items) {
      const varTotalPrice = variationArray.reduce(
        (acc, item) => acc + item.price,
        0
      );
      const choiceTotalPrice = choicesArray.reduce(
        (acc, item) =>
          acc +
          item.variation.reduce((subacc, subItem) => subacc + subItem.price, 0),
        0
      );
      setFinalPrice(
        (choiceTotalPrice + varTotalPrice + items?.actualPrice) * quantity
      );
    }
  }, [quantity, variationArray, choicesArray]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    console.log(variations);
    console.log(variationArray);
    console.log(choices);
    console.log(choicesArray);
  }, [variationArray, variations, choices, choicesArray]);

  const onOptionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    price: number,
    optionsArgument: VariationOptionType,
    variation: VariationType,
    indexNumber: number
  ) => {
    console.log(price);
    // To find that if any item exist in the "variation" with the index passed from function
    const existingVariation = variations?.some((v) => v.index === indexNumber);

    //  If there is no such item then add it to array else update the existing one.
    setvariations((prev) => {
      if (existingVariation) {
        // If the variation with the given index already exists, update its id(variationId)
        return prev?.map((variation) =>
          variation.index === indexNumber
            ? { ...variation, id: e.target.value }
            : variation
        );
      } else {
        // If the variation with the given index doesn't exist, create a new one
        return [...(prev || []), { index: indexNumber, id: e.target.value }];
      }
    });
    // setVariationPrice(price);

    const existingVariationArray = variationArray?.some(
      (variationItem) => variationItem.variationName === variation.name
    );

    setVariationArray((previousArrayOptions) => {
      if (existingVariationArray) {
        // If the variation with the given name already exists, update its options
        return previousArrayOptions.map((options) =>
          options.variationId === variation._id
            ? {
                ...optionsArgument,
                variationName: variation.name,
                variationId: variation._id,
              }
            : options
        );
      } else {
        // If the variation with the given name doesn't exist, create a new one
        return [
          ...(previousArrayOptions || []),
          {
            ...optionsArgument,
            variationName: variation?.name,
            variationId: variation._id,
          },
        ];
      }
    });

    // Toggle Accordion
    setOpenAccordionIndex(indexNumber + 1);
  };

  const onChoiceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    price: number,
    options: VariationOptionType,
    variation: VariationType,
    indexNumber: number
  ) => {
    console.log(price);

    const value = e.target.value;
    const isChecked = e.target.checked;

    // setChoicePrice((prevPrice) => {
    //   if (isChecked) {
    //     return prevPrice + price;
    //   } else {
    //     return prevPrice - price;
    //   }
    // });

    // To find that if any item exist in the "choices" with the index passed from function
    // const existingOption = choices?.some((v) => v.index === indexNumber);
    // if (!existingOption) {
    //   setChoices((prevChoices) => {
    //     if (isChecked) {
    //       return [...prevChoices, { index: indexNumber, id: [value] }];
    //     } else {
    //       return prevChoices.map((choice) => {
    //         if (choice.index === indexNumber) {
    //           return { ...choice, id: choice.id.filter((id) => id !== value) };
    //         }
    //         return choice;
    //       });
    //     }
    //   });
    // } else {
    //   setChoices((prevChoices) => {
    //     if (isChecked) {
    //       return prevChoices.map((choice) => {
    //         if (choice.index === indexNumber) {
    //           return { ...choice, id: [...choice.id, value] };
    //         }
    //         return choice;
    //       });
    //     } else {
    //       // Remove the specific choice with the given indexNumber and value
    //       return prevChoices.map((choice) => {
    //         if (choice.index === indexNumber) {
    //           return { ...choice, id: choice.id.filter((id) => id !== value) };
    //         }
    //         return choice;
    //       });
    //     }
    //   });
    // }

    // To find that if any item exist in the "choices" with the index passed from function
    const existingOption = choices?.some((v) => v.index === indexNumber);

    setChoices((prevChoices) => {
      if (existingOption) {
        // If the choice with the given indexNumber already exists
        return prevChoices.map((choice) => {
          if (choice.index === indexNumber) {
            return isChecked
              ? { ...choice, id: [...choice.id, value] }
              : { ...choice, id: choice.id.filter((id) => id !== value) };
          }
          return choice;
        });
      } else {
        // If the choice with the given indexNumber does not exist
        return [
          ...prevChoices,
          { index: indexNumber, id: isChecked ? [value] : [] },
        ];
      }
    });

    // setChoices((prevOptions) => {
    //   if (isChecked) {
    //     return [...prevOptions, value];
    //   } else {
    //     return prevOptions.filter((option) => option !== value);
    //   }
    // });

    // To find that if any item exist in the "choices" with the index passed from function
    const existingOptionArray = choicesArray?.some(
      (v) => v.index === indexNumber
    );

    setChoicesArray((prevOptions) => {
      if (existingOptionArray) {
        // If the choice with the given indexNumber already exists
        return prevOptions.map((option) => {
          if (option.index === indexNumber) {
            return isChecked
              ? {
                  ...option,
                  variation: [
                    ...option.variation,

                    {
                      ...options,
                      variationName: variation.name,
                      variationId: variation._id,
                      index: indexNumber,
                    },
                  ],
                }
              : {
                  ...option,
                  variation: option.variation.filter(
                    (opt) => opt._id !== options._id
                  ),
                };
          }
          return option;
        });
      } else {
        // If the choice with the given indexNumber does not exist
        return [
          ...prevOptions,
          {
            index: indexNumber,
            varName: variation.name,
            varId: variation._id,
            variation: isChecked
              ? [
                  {
                    ...options,
                    variationName: variation.name,
                    variationId: variation._id,
                    index: indexNumber,
                  },
                ]
              : [],
          },
        ];
      }
    });

    // Toggle Accordion
    setOpenAccordionIndex(indexNumber);
  };

  const handleAddToCart = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();

    // To check that if there is already any field of required or not in the items
    const isRequired = items.variations.some(
      (variation: VariationType) => variation.isRequired === true
    );

    // to find the array to calculate the length of the required fireld so that they can match with variations
    const requiredLength = items.variations.filter(
      (variation: VariationType) => variation.isRequired === true
    );
    if (isRequired && variations.length !== requiredLength.length) {
      toast.error("Please Select Required Option");
      return;
    }
    if (!valtio.user) {
      console.log("Not entered - Add to the user Database");
      return;
    }

    // remove the empty Choices if the suboptions are removed
    const updatedChoicesArray = choicesArray.filter(
      (choices) => choices.variation.length > 0
    );
    items.quantity = quantity;
    items.finalPrice = finalPrice;
    items.variationRequired = variationArray;
    items.variationOptions = updatedChoicesArray;

    addedToLocalStorageCart(items);
  };
  // temp
  return (
    <div className="rootProduct">
      {/* <Back /> */}
      <div className="productCardContainer">
        {windowWidth < 768 && <Breadcrumb />}

        <img src={`${server}/${items.productImage.url}`} alt={items.name} />
        <div>
          {windowWidth >= 768 && <Breadcrumb />}
          <div className="productContainerDetails">
            <h1>{items.name}</h1>
            <p>{items.description}</p>
            <div className="variations">
              {items.variations.map(
                (variation: VariationType, index: number) => {
                  return (
                    <Accordian
                      key={variation._id}
                      title={variation.name}
                      isRequired={!!variation.isRequired}
                      isSelected={variations[index]?.id ? true : false}
                      // isOpenDefault={index === 0}
                      index={index}
                      openAccordionIndex={openAccordionIndex !== index}
                    >
                      {variation.isRequired === true
                        ? variation.variationOptions.map(
                            (options: VariationOptionType) => {
                              return (
                                <div
                                  key={options._id}
                                  className="variationOptions"
                                >
                                  <>
                                    <label>
                                      <input
                                        type="radio"
                                        value={options._id}
                                        checked={
                                          variations[index]?.id === options._id
                                        }
                                        onChange={(e) => {
                                          onOptionChange(
                                            e,
                                            options.price,
                                            options,
                                            variation,
                                            index
                                          );
                                        }}
                                      />
                                      {options.name}
                                    </label>
                                    {options.price > 0 && (
                                      <p>Rs. {options.price}</p>
                                    )}
                                  </>
                                </div>
                              );
                            }
                          )
                        : variation.variationOptions.map(
                            (options: VariationOptionType) => {
                              return (
                                <div
                                  key={options._id}
                                  className="variationOptions"
                                >
                                  <>
                                    <label>
                                      <input
                                        type="checkbox"
                                        value={options._id}
                                        checked={choices[index]?.id.includes(
                                          options._id
                                        )}
                                        onChange={(e) => {
                                          onChoiceChange(
                                            e,
                                            options.price,
                                            options,
                                            variation,
                                            index
                                          );
                                        }}
                                      />
                                      {options.name}
                                    </label>
                                    {options.price > 0 && (
                                      <p>Rs. {options.price}</p>
                                    )}
                                  </>
                                </div>
                              );
                            }
                          )}
                    </Accordian>
                  );
                }
              )}
            </div>
          </div>

          <div className="productContainerPurchase">
            <div className="quantitybtn">
              <button
                disabled={quantity < 2}
                onClick={() => setQuantity((prev) => prev - 1)}
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                disabled={quantity > 9}
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </button>
            </div>
            <div className="cartbtn" onClick={handleAddToCart}>
              <div>Rs. {finalPrice}</div>
              <span>Add to cart</span>
            </div>
          </div>
        </div>
      </div>
      <SimilarProducts category={items.category} productId={items._id} />
    </div>
  );
};

export default ProductCard;

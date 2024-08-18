import toast from "react-hot-toast";
import Carousels from "../components/carousels";
import ItemCard from "../components/itemCard";
import SkeletonLoader from "../components/loader/skeletonLoader";
import { useAllItemsQuery } from "../redux/api/itemsApi";
// import data from "../temp/data.json";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { CustomError, itemCategoryBarType } from "../types/apiTypes";

const scrollToCategory = (category: string) => {
  const element = document.getElementById(category);

  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};
const Home = () => {
  const { isError, isLoading, data, error } = useAllItemsQuery("");

  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      let active = null;
      document.querySelectorAll(".itemCardContainer").forEach((section) => {
        // console.log(section);
        const rect = section.getBoundingClientRect();
        // console.log(rect);

        // console.log("rect.top", rect.top);
        // console.log("window.innerHeight / 2", window.innerHeight / 2);
        // console.log("rect.bottom", rect.bottom);
        // console.log("window.innerHeight / 2", window.innerHeight / 2);
        if (
          rect.top <= window.innerHeight / 2 &&
          rect.bottom >= window.innerHeight / 2
        ) {
          active = section.id;
        }
      });

      // console.log(active);
      if (active) {
        setActiveCategory(active);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once to set the initial active category
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // console.log(data);

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  return (
    <div>
      <Carousels />
      {isLoading ? (
        <SkeletonLoader length={20} />
      ) : (
        <>
          <CategoryBar
            data={data?.newArray ?? []}
            activeCategory={activeCategory}
          />
          <div className="itemsContainer">
            {data?.newArray.map((item, index) => (
              <ItemCard key={index} data={item} index={index} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
const CategoryBar = ({ data, activeCategory }: itemCategoryBarType) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [isRightArrowVisible, setIsRightArrowVisible] = useState(false);

  // Logic to check if the right arrow should be visible on component mount
  useEffect(() => {
    // console.log(scrollRef.current);
    if (scrollRef.current) {
      const containerWidth = scrollRef.current.clientWidth;
      const contentWidth = scrollRef.current.scrollWidth;
      // console.log(contentWidth > containerWidth);
      setShowRightArrow(contentWidth > containerWidth);
    }
  }, [scrollRef.current]);

  useEffect(() => {
    // Function to handle scroll event
    const handleScroll = () => {
      if (scrollRef.current) {
        const container = scrollRef.current;
        // Calculate whether right arrow should be visible
        const isScrollAtEnd =
          container.scrollLeft >= container.scrollWidth - container.clientWidth;
        setIsRightArrowVisible(!isScrollAtEnd);
      }
    };

    // Add event listener for scroll
    scrollRef.current?.addEventListener("scroll", handleScroll);

    // Call handleScroll initially
    handleScroll();

    // Remove event listener on component unmount
    return () => {
      scrollRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, [scrollRef.current]);

  const handleScroll = (scrollOffset: number) => {
    // console.log("clicked on recent", scrollOffset);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: scrollRef.current.scrollLeft + scrollOffset,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (activeCategory) {
      const activeElement = document.getElementById(`btn-${activeCategory}`);
      if (activeElement) {
        const parentElement = activeElement.parentElement;
        console.log(parentElement);
        if (parentElement) {
          const parentRect = parentElement.getBoundingClientRect();
          const activeRect = activeElement.getBoundingClientRect();
          const isVisible =
            activeRect.left >= parentRect.left &&
            activeRect.right <= parentRect.right;

          if (!isVisible) {
            parentElement.scrollTo({
              left: activeElement.offsetLeft - parentElement.offsetLeft,
              behavior: "smooth",
            });
          }
        }
      }
    }
  }, [activeCategory]);

  return (
    <div className="categoryContainer">
      <div
        ref={scrollRef}
        onScroll={(e: React.UIEvent<HTMLDivElement>) =>
          setScrollPosition(e.currentTarget.scrollLeft)
        }
      >
        {scrollPosition > 0 && (
          <IoIosArrowBack
            className="leftHeaderArrowIcon"
            onClick={() => handleScroll(window.innerWidth < 768 ? -420 : -900)}
          />
        )}
        {showRightArrow && (
          <IoIosArrowForward
            className={`rightHeaderArrowIcon ${
              isRightArrowVisible ? "visible" : "hidden"
            }`}
            onClick={() => handleScroll(window.innerWidth < 768 ? 420 : 900)}
          />
        )}
        {data.map((item, index) => (
          <button
            key={index}
            id={`btn-category${index}`}
            onClick={() => scrollToCategory(`category${index}`)}
            className={
              activeCategory === `category${index}` ? "focusCategory" : ""
            }
          >
            {item.category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;

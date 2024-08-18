import { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useGetAllSliderImagesQuery } from "../redux/api/imageSlider";
import { CustomError } from "../types/apiTypes";
import toast from "react-hot-toast";
import { server } from "../redux/store";

const Carousels = () => {
  const {
    isError: isErrorSlider,
    isLoading: isLoadingSlider,
    data: dataSlider,
    error: errorSlider,
  } = useGetAllSliderImagesQuery();
  const [slideIndex, setSlideIndex] = useState(1);

  useEffect(() => {
    const intervalId = setInterval(() => {
      plusSlides(1);
    }, 5000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [slideIndex]);

  const plusSlides = (n: number) => {
    showSlides(slideIndex + n);
  };

  const currentSlide = (n: number) => {
    showSlides(n);
  };

  const showSlides = (n: number) => {
    let i;
    let slides = Array.from(
      document.querySelectorAll(".mySlides")
    ) as HTMLElement[];
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
      setSlideIndex(1);
    } else if (n < 1) {
      setSlideIndex(slides.length);
    } else {
      setSlideIndex(n);
    }
    // Hide all slides
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }

    // Display the current slide
    if (slides[slideIndex - 1]) {
      slides[slideIndex - 1].style.display = "block";
      dots[slideIndex - 1].className += " active";
    }
  };

  useEffect(() => {
    showSlides(slideIndex);
  }, [slideIndex, dataSlider]);

  if (isErrorSlider) {
    const err = errorSlider as CustomError;
    toast.error(err.data.message);
  }

  return (
    <>
      {!isLoadingSlider && (dataSlider?.images.length ?? 0) > 0 && (
        <div className="slideshowContainer">
          {dataSlider?.images?.map((slide, index) => (
            <div key={slide._id} className="mySlides fade">
              <img src={`${server}/${slide.path}`} alt={`Slide ${index + 1}`} />
            </div>
          ))}

          <a className="prev" onClick={() => plusSlides(-1)}>
            <FaAngleLeft />
          </a>
          <a className="next" onClick={() => plusSlides(1)}>
            <FaAngleRight />
          </a>
          <div style={{ textAlign: "center" }}>
            {dataSlider?.images?.map((_, index) => (
              <span
                key={index}
                className="dot"
                onClick={() => currentSlide(index + 1)}
              ></span>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Carousels;

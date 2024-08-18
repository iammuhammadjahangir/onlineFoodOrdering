import { Fragment } from "react/jsx-runtime";
import Container from "../../../components/mainContainer/container";
import Heading from "../../../components/pageHeading/heading";
import { useTranslation } from "react-i18next";
import DragDropImages, {
  ImageType,
} from "../../../components/dragDrop/dragDropImages";
import { useUploadSliderImagesMutation } from "../../../redux/api/imageSlider";
import { useEffect } from "react";
import { CustomError } from "../../../types/types";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UploadSliderImages = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [uploadSliderImage, { isError, error, isSuccess, isLoading }] =
    useUploadSliderImagesMutation();

  const handleClick = async (images: any) => {
    console.log("Uploading Images", images);
    const file = images.map((image: ImageType) => image.file);
    await uploadSliderImage(file);
  };

  useEffect(() => {
    if (!isLoading) {
      if (isError) {
        const err = error as CustomError;
        toast.error(err.data.message);
      }
      if (isSuccess) {
        toast.success("Slider Images Added Successfully");
        navigate("/sliderGallery");
      }
    }
  }, [isError, isSuccess]);
  return (
    <Fragment>
      <Container>
        <section className="uploadSliderImageContainer">
          <Heading name={t("uploadSliderImages")} />
          <DragDropImages handleClick={handleClick} />
        </section>
      </Container>
    </Fragment>
  );
};

export default UploadSliderImages;

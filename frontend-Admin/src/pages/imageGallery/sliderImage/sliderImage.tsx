import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { MdAdd, MdDeleteOutline } from "react-icons/md";
import { Fragment } from "react/jsx-runtime";
import LazyloadImage from "../../../components/lazyLoadImages/lazyloadImage";
import SkeletonLoader from "../../../components/loader/skeletonLoader";
import Container from "../../../components/mainContainer/container";
import Heading from "../../../components/pageHeading/heading";
import { confirmationDialogue } from "../../../components/swal/confirmDeny";
import {
  useDeleteSliderImageMutation,
  useGetAllSliderImagesQuery,
} from "../../../redux/api/imageSlider";
import { server } from "../../../redux/store";
import { CustomError, SliderImageType } from "../../../types/types";
import Button from "../../../components/button/button";
import { useNavigate } from "react-router-dom";

const SliderImage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data, error, isError, isLoading } = useGetAllSliderImagesQuery();
  const [deletSliderImage] = useDeleteSliderImageMutation();
  console.log(data);

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  // Calculate the number of images for each column
  const totalImages = data?.images.length ?? 0;
  const columnCount = 3;
  const imagesPerColumn = Math.floor(totalImages / columnCount);
  const remainingImages = totalImages % columnCount;

  const handleDelete = (image: SliderImageType) => {
    console.log(image);
    confirmationDialogue(
      () => deletSliderImage(image._id),
      t("deleteConfirmationText"),
      t("deleteButtonText"),
      t("cancelButtonText"),
      t("savedButtonText"),
      t("cancelDialogueText")
    );
  };

  return (
    <Fragment>
      <Container>
        {!isLoading ? (
          <div className="sliderImageContainer">
            <div className="headerImageSlider">
              <Heading name={t("sliderImages")} />
              <Button
                text={t("addSliderImage")}
                type="button"
                handleClick={() => {
                  navigate("/uploadSlider");
                }}
                icon={<MdAdd />}
                className="outlined"
              />
            </div>
            <section className="sliderPhotoGallery">
              {/* Mapping over the array to generate columns */}
              {[...Array(columnCount)].map((_, columnIndex) => (
                <div key={columnIndex} className="column">
                  {/* Mapping over each image data object to generate photos */}
                  {data?.images
                    .slice(
                      columnIndex * imagesPerColumn +
                        Math.min(columnIndex, remainingImages),
                      (columnIndex + 1) * imagesPerColumn +
                        Math.min(columnIndex + 1, remainingImages)
                    ) // Slicing the array to get images for each column
                    .map((image, index) => (
                      <div key={index} className="photo">
                        <div className="sliderCurtain">
                          <div className="centerContainer">
                            <div className="info">
                              <h3>{image.originalname}</h3>
                              <p>{Math.floor(image.size / 1024)} kb</p>
                            </div>
                            <div className="actionIcons">
                              <MdDeleteOutline
                                onClick={() => {
                                  handleDelete(image);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        {/* <img src={image.path} alt={image.originalname} /> */}
                        <LazyloadImage
                          blurhash={image?.blurHash}
                          url={`${server}/${image.path}`}
                        />
                      </div>
                    ))}
                </div>
              ))}
            </section>
          </div>
        ) : (
          <SkeletonLoader length={20} />
        )}
      </Container>
    </Fragment>
  );
};

export default SliderImage;

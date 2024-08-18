import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Back = () => {
  const navigate = useNavigate();
  return <IoIosArrowBack className="backIcon" onClick={() => navigate(-1)} />;
};

export default Back;

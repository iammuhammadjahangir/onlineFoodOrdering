import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SkeletonLoader from "../../components/loader/skeletonLoader";
import { useSearchItemQuery } from "../../redux/api/itemsApi";
import { CustomError, ItemsType } from "../../types/apiTypes";
import SearchCard from "../search/searchCard";

type SimilarProductType = {
  category: {
    _id: string;
    description: string;
    name: string;
  };
  productId: string;
};
const SimilarProducts = ({ category, productId }: SimilarProductType) => {
  const [displayData, setDisplayData] = useState<ItemsType[] | []>([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(0);
  const [pages, setPages] = useState(1);

  const { isError, isLoading, data, error } = useSearchItemQuery({
    category: category._id,
    page: pages,
    price: maxPrice,
    search,
    sort,
  });
  console.log(data);
  console.log(productId);

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }
  console.log(category.name);

  useEffect(() => {
    console.log("enterd");
    setSearch("");
    setSort("");
    setMaxPrice(0);
    setPages(1);

    if (data) {
      setDisplayData(data.Items.filter((item) => item._id !== productId));
    }
  }, [data, productId]);

  return (
    <div className="MoreResults">
      {isLoading ? (
        <SkeletonLoader length={10} />
      ) : (
        <>
          {displayData.length > 0 && (
            <>
              <h1>More in {category.name}</h1>
              <div className="itemsContainer">
                {displayData.length > 0 &&
                  displayData.map((item) => (
                    <SearchCard {...item} key={item._id} />
                  ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default SimilarProducts;

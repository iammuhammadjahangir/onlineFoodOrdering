import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiSearch } from "react-icons/ci";
import SkeletonLoader from "../../components/loader/skeletonLoader";
import { useSearchItemQuery } from "../../redux/api/itemsApi";
import { CustomError } from "../../types/apiTypes";
import SearchCard from "./searchCard";
import Breadcrumb from "../../components/breadcrumb/breadcrumb";

const Search = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [pages, setPages] = useState(1);

  const { isError, isLoading, data, error } = useSearchItemQuery({
    category,
    page: pages,
    price: maxPrice,
    search,
    sort,
  });
  useEffect(() => {
    setSort("");
    setMaxPrice(0);
    setCategory("");
  }, []);

  useEffect(() => {
    // Scroll to top when the pages state changes
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pages]);

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }
  return (
    <div className="searchContainer">
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search a Product..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <CiSearch />
      </div>
      <div className="SearchContent">
        <Breadcrumb />
        {isLoading ? (
          <SkeletonLoader length={20} />
        ) : (
          <>
            {data?.Items.map((item) => (
              <SearchCard {...item} key={item._id} />
            ))}
          </>
        )}
      </div>
      <div className="pagination">
        {data && data.totalPage > 1 && (
          <article>
            <button
              onClick={() => setPages((prev) => prev - 1)}
              disabled={pages < 2}
            >
              Prev
            </button>
            <span>
              {pages} of {data.totalPage}
            </span>
            <button
              onClick={() => setPages((prev) => prev + 1)}
              disabled={pages > data.totalPage - 1}
            >
              Next
            </button>
          </article>
        )}
      </div>
    </div>
  );
};

export default Search;

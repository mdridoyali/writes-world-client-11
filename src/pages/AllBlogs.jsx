import { FaRegHeart } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FaSistrix } from "react-icons/fa";
import UseLoading from "../hooks/UseLoading";
import useAuth from "./../hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
const AllBlogs = () => {
  const { user } = useAuth();
  const email = user?.email || "";
  const [blogs, setBlogs] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleCategory = (e) => {
    setSelectedCategory(e.target.value);
    console.log(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetch(
      `http://localhost:5000/allBlogs?title=${searchValue}&category=${selectedCategory}`
    )
      .then((res) => res.json())
      .then((data) => setBlogs(data));
  };

  useEffect(() => {
    fetch(
      `http://localhost:5000/allBlogs?title=${searchValue}&category=${selectedCategory}`
    )
      .then((res) => res.json())
      .then((data) => setBlogs(data));
  }, [searchValue, selectedCategory]);

  const { data, isLoading } = useQuery({
    queryKey: ["allBlogs"],
    queryFn: () =>
      fetch(
        `http://localhost:5000/allBlogs?title=${searchValue}&category=${selectedCategory}`
      ).then((res) => res.json()),
  });
  if (isLoading) {
    return <UseLoading />;
  }
  // console.log(data);

  const handleAddToWishlist = (item) => {
    const { title, image, short_desc, long_desc, category, postedTime } = item;
    const wishListData = {
      title,
      image,
      short_desc,
      long_desc,
      category,
      postedTime,
      email,
    };
    console.log(wishListData);
    axios
      .post("http://localhost:5000/wishlistBlogs", wishListData)
      .then((res) => {
        console.log(res.data);
        toast.success("Added to the Wishlist", { duration: 3000 });
      });
  };

  return (
    <div>
      {isLoading ? (
        <UseLoading />
      ) : (
        <div className=" my-12">
          <h2 className="text-transparent text-3xl font-semibold md:text-7xl text-center my-8 bg-clip-text bg-gradient-to-r from-violet-600 to-amber-500">
            All The Blogs
          </h2>

          <div className=" w-11/12 mx-auto gap-5 md:gap-20 lg:gap-72 flex flex-col md:flex-row justify-between  my-6">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                name="searchValue"
                placeholder="Search by title"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="rounded-full h-12 w-full outline-none border pl-5 pr-20 border-orange-400"
              />
              <button
                type="submit"
                className="absolute right-0 hover:btn-accent rounded-full h-full outline-none border px-7 border-orange-400"
              >
                <FaSistrix className="text-2xl"></FaSistrix>
              </button>
            </form>
            <select
              onChange={handleCategory}
              value={selectedCategory}
              className="input border-orange-400 rounded-full"
            >
              <option value="All">All</option>
              <option value="Food">Food</option>
              <option value="Nature">Nature</option>
              <option value="Health">Health</option>
              <option value="Travel">Travel</option>
              <option value="Technology">Technology</option>
              <option value="Lifestyle">Lifestyle</option>
            </select>
          </div>
          <div className="w-11/12 grid gap-10 md:grid-cols-2 lg:grid-cols-3 mx-auto  ">
            {blogs.map((item, idx) => (
              <div
                className="border p-5 rounded-2xl w-full space-y-4 shadow-lg"
                key={idx}
              >
                <img
                  className="w-full hover:shadow-2xl  rounded-xl"
                  src={item.image}
                />
                <p className="border w-max px-5 py-[2px] rounded-full border-orange-400">
                  {item.category}
                </p>
                <p className="font-semibold text-xl">{item.title}</p>
                <p>{item.short_desc}</p>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => handleAddToWishlist(item)}
                    className="btn btn-sm  border-orange-400 rounded-full"
                  >
                    Add To WishList
                    <FaRegHeart className="text-red-500 text-lg "></FaRegHeart>
                  </button>
                  <div className=" hover:border-orange-400 border border-white p-1 mb- rounded-full">
                    {" "}
                    <Link  to={`/blogDetails/${item._id}`}>
                      {" "}
                      <button className="btn btn-sm btn-accent  rounded-full text-white">
                        Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllBlogs;

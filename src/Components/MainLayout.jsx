import PropTypes from "prop-types";
import { FaHome, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
// import Theme from "./Theme";
import useAuth from "../hooks/useAuth";
import { useState } from "react";

const MainLayout = ({ children }) => {
  const { user, logOutUser } = useAuth();
  // console.log(user)

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div>
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-full navbar border-b-4 ">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-circle "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="flex-1   px-2 md:mx-2">
              <img
                className="w-8 md:w-14"
                src={"https://i.ibb.co/nM1gpGH/Screenshot-5.jpg"}
              />
              <h1 className="text-transparent text-2xl md:text-5xl font-bold bg-clip-text bg-gradient-to-r from-violet-600 to-amber-500">
                Writes World
              </h1>
            </div>
            <div className="flex-none hidden lg:block">
              <div className=" flex items-center gap-5">
                {/* Navbar menu content here */}
                <NavLink
                  to={"/"}
                  className={({ isActive }) =>
                    isActive
                      ? "btn  bg-lime-600 btn-sm text-white"
                      : "btn btn-ghost btn-sm "
                  }
                >
                  <FaHome />
                  Home
                </NavLink>
                <NavLink
                  to={"/addBlog"}
                  className={({ isActive }) =>
                    isActive
                      ? "btn bg-lime-600 btn-sm text-white"
                      : "btn btn-ghost btn-sm "
                  }
                >
                  Add Blog
                </NavLink>
                <NavLink
                  to={"/allBlogs"}
                  className={({ isActive }) =>
                    isActive
                      ? "btn  bg-lime-600  btn-sm text-white"
                      : "btn btn-ghost btn-sm "
                  }
                >
                  All Blogs
                </NavLink>
                <NavLink
                  to={"/featuredBlogs"}
                  className={({ isActive }) =>
                    isActive
                      ? "btn  bg-lime-600  btn-sm text-white"
                      : "btn btn-ghost btn-sm "
                  }
                >
                  Featured Blogs
                </NavLink>
                <NavLink
                  to={"/wishlist"}
                  className={({ isActive }) =>
                    isActive
                      ? "btn  bg-lime-600  btn-sm text-white"
                      : "btn btn-ghost btn-sm "
                  }
                >
                  Wishlist
                </NavLink>
                {/* <NavLink
                  to={"/about"}
                  className={({ isActive }) =>
                    isActive
                      ? "btn btn-accent btn-sm text-white"
                      : "btn btn-ghost btn-sm btn-active"
                  }
                >
                  About
                </NavLink> */}
              </div>
            </div>
            <div className="md:px-3">{/* <Theme /> */}</div>
            <div className=" ">
              <div className="dropdown relative dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-20 rounded-full">
                    {user?.photoURL ? (
                      <img src={user?.photoURL} />
                    ) : (
                      <img
                        className=""
                        src={
                          "https://i.ibb.co/hDN4yRb/296-2969961-no-image-user-profile-icon.jpg"
                        }
                      />
                    )}
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className=" absolute top-0 right-0 z-[1] shadow menu menu-sm dropdown-content bg-slate-200 py-8 px-5 space-y-4   rounded w-60 md:w-72"
                >
                  {user && (
                    <li className="mx-auto">
                      <img className="w-28  rounded-full" src={user.photoURL} />
                    </li>
                  )}
                  {user && (
                    <li className="btn-ghost rounded-full hover:outline-none border-none btn-active hover:btn-accent ">
                      <p className=" text-lg font-semibold hover:bg-lime-500 rounded-full hover:text-white ">
                        {user?.displayName && user?.displayName}
                      </p>
                    </li>
                  )}
                  <li>
                    {!user && (
                      <Link
                        className="text-xl rounded-full  btn-active  hover:outline-none btn-ghost  hover:bg-lime-500  hover:text-white "
                        to={"/register"}
                      >
                        Register
                      </Link>
                    )}
                  </li>
                  <li>
                    {user ? (
                      <button
                        onClick={() => logOutUser()}
                        className="text-xl rounded-full btn-ghost  hover:outline-none border-none btn-active  hover:bg-lime-500  hover:text-white "
                      >
                        <span>Logout</span>
                        <span className="text-base">
                          <FaSignOutAlt />
                        </span>
                      </button>
                    ) : (
                      <Link
                        className="text-lg rounded-full hover:bg-lime-500 hover:outline-none btn-ghost btn-active  hover:text-white "
                        to={"/login"}
                      >
                        <button className="flex items-center text-xl rounded-full  gap-2">
                          <span>Login</span>
                          <span className="text-base">
                            <FaSignInAlt />
                          </span>
                        </button>
                      </Link>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* Page content here */}
          {/* Content */}
          {children}
        </div>
        <div className={`drawer-side ${isSidebarOpen ? "open" : "close"}`}>
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="menu bg-white space-y-5 mt-[0px] p-5 w-9/12 min-h-screen  md:w-7/12 ">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-circle "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="30"
                height="30"
                viewBox="0 0 24 24"
              >
                <path d="M 4.9902344 3.9902344 A 1.0001 1.0001 0 0 0 4.2929688 5.7070312 L 10.585938 12 L 4.2929688 18.292969 A 1.0001 1.0001 0 1 0 5.7070312 19.707031 L 12 13.414062 L 18.292969 19.707031 A 1.0001 1.0001 0 1 0 19.707031 18.292969 L 13.414062 12 L 19.707031 5.7070312 A 1.0001 1.0001 0 0 0 18.980469 3.9902344 A 1.0001 1.0001 0 0 0 18.292969 4.2929688 L 12 10.585938 L 5.7070312 4.2929688 A 1.0001 1.0001 0 0 0 4.9902344 3.9902344 z"></path>
              </svg>
            </label>
            <NavLink
              onClick={closeSidebar}
              to={"/"}
              className={({ isActive }) =>
                isActive
                  ? "btn bg-lime-600 rounded-full text-white"
                  : "btn btn-ghost  btn-active rounded-full "
              }
            >
              <FaHome />
              Home
            </NavLink>
            <NavLink
              onClick={closeSidebar}
              to={"/addBlog"}
              className={({ isActive }) =>
                isActive
                  ? "btn  bg-lime-600   rounded-full text-white"
                  : "btn btn-ghost  btn-active rounded-full "
              }
            >
              Add Blog
            </NavLink>
            <NavLink
              onClick={closeSidebar}
              to={"/allBlogs"}
              className={({ isActive }) =>
                isActive
                  ? "btn  bg-lime-600   rounded-full text-white"
                  : "btn btn-ghost  btn-active rounded-full "
              }
            >
              All Blogs
            </NavLink>
            <NavLink
              onClick={closeSidebar}
              to={"/featuredBlogs"}
              className={({ isActive }) =>
                isActive
                  ? "btn  bg-lime-600   rounded-full text-white"
                  : "btn btn-ghost  btn-active rounded-full "
              }
            >
              Featured Blogs
            </NavLink>
            <NavLink
              onClick={closeSidebar}
              to={"/wishlist"}
              className={({ isActive }) =>
                isActive
                  ? "btn  bg-lime-600   rounded-full text-white"
                  : "btn btn-ghost  btn-active rounded-full "
              }
            >
              Wishlist
            </NavLink>
            {/* <NavLink
            onClick={closeSidebar} 
              to={"/about"}
              className={({ isActive }) =>
                isActive
                  ? "btn btn-accent  rounded-full text-white"
                  : "btn btn-ghost  btn-active rounded-full text-white"
              }
            >
              About
            </NavLink> */}
          </div>
        </div>
      </div>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.element,
};

export default MainLayout;
{
  /* <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 30 30">
    <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
</svg> */
}

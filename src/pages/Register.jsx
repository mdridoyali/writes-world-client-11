import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
// import { FaGithub } from "react-icons/fa";
import { useState } from "react";
import {
  // GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import auth from "../firebase.config";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
const Register = () => {
  const { createUser } = useAuth();
  const [show, setShow] = useState(false);
  const googleProvider = new GoogleAuthProvider();
  // const githubProvider = new GithubAuthProvider();
  const navigate = useNavigate();
  const location = useLocation();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;
    // console.log(name, email, photo, password);

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!.])[A-Za-z\d@#$%^&+=!.]{6,20}$/;
    if (!passwordRegex.test(password)) {
      return Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text: "Password must be at least one uppercase, one digit, one special character and be 6 to 20 characters long.",
      });
    }

    createUser(email, password)
      .then((result) => {
        navigate(location?.state ? location?.state : "/");
        // console.log(result.user);
        updateProfile(result.user, {
          displayName: name,
          photoURL: photo,
        })
          .then((result) => console.log(result))
          .catch((error) => console.log(error));
        form.reset();

        return toast.success("Successfully Registered", { duration: 3000 });
      })
      .catch((error) => {
        console.log(error);
        form.reset();
        return toast.error("Already have an account", { duration: 3000 });
      });
  };

  const googleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        console.log(result.user);
        navigate(location?.state ? location?.state : "/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const githubLogin = () => {
  //   signInWithPopup(auth, githubProvider)
  //     .then((result) => {
  //       console.log(result.user);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  return (
    <div className="">
      <div className="  rounded-xl    md:p-5 md:w-3/5 lg:w-2/2 mx-auto ">
        <h2 className="text-3xl font-bold text-slate-600 mt-5 text-center ">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-700">
            Register Now
          </span>
        </h2>
        <div className=" my-5 mx-auto ">
          <div className="hero-content flex-col lg:flex-row-reverse mx-auto">
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-slate-200">
              <form onSubmit={handleRegister} className=" px-7 text-black">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">
                      Name <span className="text-red-500 text-xl">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">
                      Email <span className="text-red-500 text-xl">*</span>
                    </span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Photo URL</span>
                  </label>
                  <input
                    type="text"
                    name="photo"
                    placeholder="Photo URL"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control relative">
                  <label className="label">
                    <span className="label-text">
                      Password <span className="text-red-500 text-xl">*</span>
                    </span>
                  </label>
                  <span
                    onClick={() => setShow(!show)}
                    className="absolute right-4 cursor-pointer bottom-3"
                  >
                    {show ? <p>Hide</p> : <p>Show</p>}
                  </span>
                  <input
                    name="password"
                    type={show ? "text" : "password"}
                    placeholder="Password"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control mt-6">
                  <button type="submit" className="btn  text-white hover:text-black font-bold bg-lime-600 ">
                    Register
                  </button>
                </div>
                <div className="border pb-2 text-center flex">
                  <p className="border-b border-black flex-1"></p>
                  <p className="font-bold text-lg">or</p>
                  <p className="border-b border-black flex-1"></p>
                </div>
                <div className="">
                  <div className="space-y-3 mt-2 gap-3 justify-between">
                    <button
                      className="btn w-full hover:bg-lime-600 hover:text-white md:px-8 px-4 "
                      onClick={googleLogin}
                    >
                      {"Continue with Google"}
                      <FaGoogle className="text-xl"></FaGoogle>{" "}
                    </button>{" "}
                    <br />
                    {/* <button
                      className="btn w-full  btn-sm md:px-8 px-4 "
                        onClick={githubLogin}
                    >
                      {"Continue with Github"}
                      <FaGithub className="text-xl"></FaGithub>{" "}
                    </button> */}
                  </div>
                </div>
                <p className="text-center py-3">
                  Already have an account?{" "}
                  <Link
                    to={"/login"}
                    className="text-blue-600 underline font-semibold"
                  >
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

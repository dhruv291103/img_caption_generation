import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { toast, Bounce } from "react-toastify";

const Login = () => {
  const {storeTokenInLocalStorage, storeUserInformation} = useAuth();
  const[passwordVisible, setPasswordVisible ] = useState(false);
  const Navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });


  const handlePasswordVisibility = ()=>{
    setPasswordVisible(!passwordVisible);
  } 

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials:'include',
    });
    const temp = await res.json();
    if(temp.success===true){
      // registration logic with context API
      toast.success('Logged in successful !', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        });
      storeTokenInLocalStorage(temp.token);
      storeUserInformation(JSON.stringify(temp.data));
      Navigate("/");
    }else if(temp.success===false && temp.field==false){
      toast.error(' Enter the full details !', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        });
    }else if(temp.success===false && temp.userExists==false){
      toast.error(`${temp.message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        });
    }else if(temp.success===false && temp.password==false){
      toast.error('Invalid credentials', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        });
    }
}

  return (
    <>
      <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div class="w-full bg-white shadow-xl hover:shadow-2xl rounded-xl border-2 border-gray-400 dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Login to account
              </h1>
              <form class="space-y-4 md:space-y-6" onSubmit={submit}>
                <div class="relative w-full max-w-md mx-auto">
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    value={data.email}
                    onChange={handleInput}
                    type="email"
                    name="email"
                    id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div className="relative w-full max-w-md mx-auto">
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    onChange={handleInput}
                    value={data.password}
                    type={passwordVisible ? "text" : "password"}
                    minlength="8"
                    pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}"
                    title="Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    class="pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                  <button
                          type="button"
                          onClick={handlePasswordVisibility}
                          className="absolute right-0 flex items-center pr-3 text-xl cursor-pointer"
                          style={{ top: '22px', bottom:'0px' }}
                        >
                          <FontAwesomeIcon icon={passwordVisible ? faEye : faEyeSlash} />
                  </button>
                </div>
              

                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label
                      for="terms"
                      class="font-light text-gray-500 dark:text-gray-300"
                    >
                      I accept the{" "}
                      <a
                        class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  class="w-full text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Login to account
                </button>
                <p class="text-sm font-light text-gray-500 dark:text-gray-400 gap-8">
                  don't have an account?{" "}
                  <a
                    href="/signup"
                    class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    sign up here
                  </a>

                  <a
                    href="/forgot-password"
                    class="font-medium ms-14 text-right text-primary-600 hover:underline dark:text-primary-500"
                  >
                    forgot password
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;

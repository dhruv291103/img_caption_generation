import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, Bounce } from 'react-toastify';


const ResetPassword = ()=>{
const resetToken = JSON.parse(localStorage.getItem('resetToken'));
const navigate = useNavigate();
const [data, setData] = useState({
        "password": "",
        "cpassword":""
    });
    
      const handleInput = (e) => {
        const { name, value } = e.target;
        setData({
          ...data,
          [name]: value,
        });
      };
    
      const submit = async (e) => {
        e.preventDefault();
        const res = await fetch(`http://localhost:3000/reset-password/${resetToken}`, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
          credentials:'include',
        });
          const temp = await res.json();
          console.log(temp);
          if(temp.success===true){
            localStorage.removeItem("resetToken");
            toast.success(`${temp.message}`, {
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
          navigate("/");
          }else if(temp.success===false){
            toast.error("password has not been changed", {
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
      };
    
      return (
        <>
          <section class="bg-gray-50 dark:bg-gray-900">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              <div class="w-full bg-white shadow-xl hover:shadow-2xl rounded-xl border-2 border-gray-400 dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    ResetPassword
                  </h1>
                  <form class="space-y-4 md:space-y-6" onSubmit={submit}>
                  <div>
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    onChange={handleInput}
                    value={data.password}
                    type="password"
                    minlength="8"
                    pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}"
                    title="Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                <div>
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm Password
                  </label>
                  <input
                    onChange={handleInput}
                    value={data.cpassword}
                    type="password"
                    minlength="8"
                    pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}"
                    title="Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character"
                    name="cpassword"
                    id="cpassword"
                    placeholder="••••••••"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                <button
                  type="submit"
                  class="w-full text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  reset password
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResetPassword;


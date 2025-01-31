import React, { useState } from "react";
import caption from "../assets/caption.png";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { useAuth } from "./Auth";
import { toast, Bounce } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const{isLoggedIn, setIsLoggedIn} = useAuth();
  const info = JSON.parse(localStorage.getItem("user")) || {};

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = () => {
    setSelectedUser(info); // Set the selected user
    setIsModalOpen(true); // Open the modal
  };

  const handleClose = () => {
    setIsModalOpen(false); // Close the modal
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu visibility
  };


  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem('user');
    toast.success('Logged out successful !', {
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
    
    setIsLoggedIn(false)
    navigate("/");
  };

  return (
    <>
      <nav class="bg-white border-gray-200 dark:bg-gray-900">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={caption} class="h-8 rounded-full" alt="Caption.ai Logo" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Caption.ai
            </span>
          </a>
          <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen ? "true" : "false"}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Menu Items (Mobile responsive) */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full md:flex md:w-auto`}
          id="navbar-default"
        >
            <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
                <a
                  href="/"
                  class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-purple-700 md:p-2 dark:text-white md:dark:hover:text-purple-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-purple-700 md:p-2 dark:text-white md:dark:hover:text-purple-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/pricing"
                  class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-purple-700 md:p-2 dark:text-white md:dark:hover:text-purple-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Pricing
                </a>
              </li>

              {isLoggedIn ? (
                <>
                  <li
                    onClick={handleClick}
                    class="block cursor-pointer hover:bg-purple-700 px-3 text-white bg-purple-600 rounded md:hover:bg-purple-700 md:border-0 md:hover:text-white md:px-3 py-2"
                  >
                    {info.email}
                  </li>
                  <Modal
                    isOpen={isModalOpen}
                    onClose={handleClose}
                    user={selectedUser}
                  />
                  <li>
                  <button
                    onClick={handleLogout}
                    class="block  hover:bg-purple-700 px-3 text-white bg-purple-600 rounded md:hover:bg-purple-700 md:border-0 md:hover:text-white md:px-3 py-2"
                  >
                    Logout
                  </button>
                  </li>
                  
                </>
              ) : (
                <>
                  <li>
                <a
                  href="/login"
                  class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-purple-700 md:p-2 dark:text-white md:dark:hover:text-purple-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Login
                </a>
              </li>

                  <li>
                    <a
                      href="/signup"
                      class="block hover:bg-purple-700 px-3 text-white bg-purple-600 rounded md:hover:bg-purple-700 md:border-0 md:hover:text-white md:px-3 py-2"
                    >
                      Sign Up
                    </a>
                  </li>
                </>
              )}

            </ul>
          </div>
        </div>
      </nav>
      <hr />
    </>
  );
};

export default Navbar;

import React from "react";
import { useNavigate ,useLocation} from "react-router-dom";
import { useState, useEffect } from "react";
import { toast, Bounce } from "react-toastify";

const Payment = () => {
  const location = useLocation();
  const Navigate = useNavigate();
  const {price} = location.state || {price:1000};

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      Navigate("/login");
    }
  }, []);
  
  
  const [data, setData] = useState({
    name: "",
    email: "",
    cardNUmber: "",
    cvvNumber: "",
    date: "",
    amount: `${price}`,
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
    const res = await fetch("http://localhost:3000/payment",{
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials:'include',
    });
      const temp = await res.json();
      if(temp.success===true){
        toast.success('Payment successful !', {
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
        Navigate("/paymentsuccess", { state: temp.data });

      }else if(temp.success===false){
      toast.error(' Enter correct details !', {
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


    // clearing the input field again
    setData({
      name: "",
      email: "",
      cardNUmber: "",
      cvvNumber: "",
      date: "",
      amount: `${price}`,
    })

};

  return (
    <>
      <section class="bg-gray-50 py-1 antialiased dark:bg-gray-900 md:py-16">
        <div class="flex items-center justify-center px-6 py-1 mx-auto lg:py-0 ">
          <div class="mx-auto max-w-5xl ">
            <div class="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 shadow-xl hover:shadow-2xl rounded-xl border-2 border-gray-400">
              <form
                onSubmit={submit}
                class="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:max-w-xl lg:p-8"
              >
                <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                  Payment
                </h2>
                <br />
                <div class="mb-6 grid grid-cols-2 gap-4">
                  <div class="col-span-2 sm:col-span-1">
                    <label
                      for="full_name"
                      class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {" "}
                      Full name*{" "}
                    </label>
                    <input
                      onChange={handleInput}
                      type="text"
                      id="full_name"
                      name="name"
                      class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                      placeholder="Bonnie Green"
                      required
                    />
                  </div>

                  <div class="col-span-2 sm:col-span-1">
                    <label
                      for="email"
                      class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {" "}
                      Enter email*{" "}
                    </label>
                    <input
                      onChange={handleInput}
                      type="email"
                      id="email"
                      name="email"
                      class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                      placeholder="example@gmail.com"
                      required
                    />
                  </div>

                  <div class="col-span-2 sm:col-span-1">
                    <label
                      for="card-number-input"
                      class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {" "}
                      Card number*{" "}
                    </label>
                    <input
                      onChange={handleInput}
                      type="password"
                      maxlength="12"
                      pattern="\d{1,12}"
                      id="card-number-input"
                      name="cardNumber"
                      class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                      placeholder="xxxx-xxxx-xxxx-xxxx"
                      required
                    />
                  </div>

                  <div class="col-span-2 sm:col-span-1">
                    <label
                      for="amount"
                      class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {" "}
                      Amount*{" "}
                    </label>
                    <input
                      disabled
                      value={data.amount}
                      type="text"
                      pattern="\d*"
                      id="amount"
                      name="amount"
                      class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                      placeholder="1000"
                      required
                    />
                  </div>

                  <div>
                    <label
                      for="card-expiration-input"
                      class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Card expiration*{" "}
                    </label>
                    <div class="relative">
                      <div class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
                        <svg
                          class="h-4 w-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </div>
                      <input
                        type="date"
                        min="<?= date('Y-m-d') ?>"
                        id="card-expiration-input"
                        name="date"
                        onChange={handleInput}
                        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-9 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder="12/23"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      for="cvv-input"
                      class="mb-2 flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      CVV*
                      <button
                        data-tooltip-target="cvv-desc"
                        data-tooltip-trigger="hover"
                        class="text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white"
                      >
                        <svg
                          class="h-4 w-4"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </button>
                      <div
                        id="cvv-desc"
                        role="tooltip"
                        class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
                      >
                        The last 3 digits on back of card
                        <div class="tooltip-arrow" data-popper-arrow></div>
                      </div>
                    </label>
                    <input
                      onChange={handleInput}
                      type="password"
                      name="cvvNumber"
                      maxlength="3"
                      id="cvv-input"
                      aria-describedby="helper-text-explanation"
                      class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                      placeholder="•••"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  class="flex w-full items-center justify-center rounded-lg bg-purple-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4  focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
                >
                  Pay now
                </button>
              </form>
            </div>
            <p class="mt-6 text-center text-gray-500 dark:text-gray-400 sm:mt-8 lg:text-left">
              Payment processed by{" "}
              <a
                href="#"
                title=""
                class="font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
              >
                billdesk
              </a>{" "}
              for{" "}
              <a
                href="#"
                title=""
                class="font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
              >
                Caption.ai
              </a>
              - India
            </p>
          </div>
        </div>
      </section>

      <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/datepicker.min.js"></script>
    </>
  );
};

export default Payment;

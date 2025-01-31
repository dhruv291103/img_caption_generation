import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import PriceCard from "./PriceCard";
const Pricing = () => {
  const navigate = useNavigate();
  const price = [1000, 3000, 7000];

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <section class="bg-gray-50 dark:bg-gray-900">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Designed for business teams like yours
            </h2>
            <p class="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
              Here at Caption.ai we focus on markets where technology,
              innovation, and capital can unlock long-term value and drive
              economic growth.
            </p>
          </div>
          <div class="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
            {price.map((val) => {
              return (
                <>
                  <PriceCard props={val} />
                </>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Pricing;

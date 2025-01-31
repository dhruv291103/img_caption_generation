import React from "react";
import grow1 from "../assets/grow1.png";
import grow2 from "../assets/grow2.png";
const About = () => {
  return (
    <>
      <section class="bg-white dark:bg-gray-900">
        <div class="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
          <div class="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              We didn't reinvent the wheel
            </h2>
            <p class="mb-4">
              We are strategists, designers and developers. Innovators and
              problem solvers. Small enough to be simple and quick, but big
              enough to deliver the scope you want at the pace you need. Small
              enough to be simple and quick, but big enough to deliver the scope
              you want at the pace you need.
            </p>
            <p>
              We are strategists, designers and developers. Innovators and
              problem solvers. Small enough to be simple and quick.
            </p>
          </div>
          <div class="grid grid-cols-2 gap-4 mt-8">
            <img
              class="w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png"
              alt="office content 1"
            />
            <img
              class="mt-4 w-full lg:mt-10 rounded-lg"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png"
              alt="office content 2"
            />
          </div>
        </div>
      </section>

      <section class="bg-white dark:bg-gray-900">
        <div class="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
          <div class="grid grid-cols-2 gap-4 mt-8">
            <img class="w-full rounded-lg" src={grow1} alt="office content 1" />
            <img
              class="mt-4 w-full lg:mt-10 rounded-lg"
              src={grow2}
              alt="office content 2"
            />
          </div>
          <div class="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Growth of company
            </h2>
            <p class="mb-4">
              We are thrilled to announce that our revenue has seen a remarkable
              increase, reflecting our successful strategies and the growing
              demand for our products and services. This year, we experienced a
              year-over-year revenue growth of [percentage], showcasing our
              resilience and ability to adapt in a dynamic market. Our expansion
              into new regions has further fueled this growth, driven by new
              customer acquisitions and increased sales. The introduction of our
              innovative offerings has significantly contributed to our success,
              allowing us to meet the evolving needs of our customers
              effectively.
            </p>
            <p>
              This impressive revenue milestone not only highlights our
              commitment to excellence but also reinforces the confidence our
              investors have in our vision and strategic direction. Improved
              operational efficiency has enhanced our productivity, while
              positive market trends have positioned us well for future success.
              As we continue to pursue sustainable growth, we remain dedicated
              to delivering value and exceeding expectations for our
              stakeholders.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;

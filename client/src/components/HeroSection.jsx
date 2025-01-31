import React from 'react'

const HeroSection = () => {
  const handleScroll = (e)=>{
    e.preventDefault();
    const targetSection = document.querySelector("#image_upload");
    targetSection.scrollIntoView(
      { behavior: 'smooth',
        block: 'start'
      }
    );

  }

  return (
    <>
        <div class="py-4 px-4 mx-auto max-w-screen-xl text-center lg:py-10 lg:px-12">
          <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Turn Images Into Words with AI-Powered Captions.
          </h1>
          <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
            Here at Caption.ai we focuses on the efficiency and creativity of
            your images into text while drawing attention to its AI-powered
            capabilities
          </p>
          <div class="flex flex-col mb-4 lg:mb-8 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <a
              href="#image_upload"
              onClick={handleScroll}
              className="inline-flex justify-center items-center py-5 px-20 text-base font-large  font-bold text-center text-white rounded-lg bg-purple-600 hover:bg-purple-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
            >
              Get Started
              <svg
                class="ml-2 -mr-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </a>
            
          </div>
        </div>
    </>
  )
}

export default HeroSection
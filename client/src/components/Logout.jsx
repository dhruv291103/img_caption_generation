import React from 'react'
import { useEffect } from 'react'
import { useNavigate} from 'react-router-dom'
const Logout = () => {
const navigate = useNavigate()
useEffect(()=>{
        async function fetchData(){
          await fetch('http://localhost:3000/logout',{
            method:"GET",
            credentials:'include',
        }).then((res)=>{
            if(res.ok===true){
              navigate("/")
            }
          }).catch((error)=>{
            console.log(`ERROR: ${error}`)
        })
        }

        fetchData();

},[]);

    
  return (
    <>
      <section class="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-16">
        <div class="mx-auto max-w-2xl px-4 2xl:px-0">
          <h1 class="text-2xl text-center font-semibold text-gray-900 dark:text-white sm:text-2xl mb-2">
            You are logged out successfully !
          </h1>
          <br />
          <br />
          <div class="flex items-center justify-center space-x-4">
            <a
              href="/"
              class="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800"
            >
              Homepage
            </a>
            <a
              href="/contact"
              class="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Contact
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default Logout;
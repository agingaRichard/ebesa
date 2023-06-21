import { Button } from "flowbite-react";
import Link from "next/link";
import Image from "next/image";
import pb from "../pages/api/pocketbase";
import { useRouter } from "next/router";

const Landing = () => {
  const router = useRouter();

  async function logout() {
    await pb.authStore.clear();
    router.push("/");
  }

  return (
    <div className="flex justify-center">
      <ul className="w-full h-full px-auto">
        <li className="md:flex justify-center items-center text-white hidden md:visible">
          <img src="/images/ebesa-white.png" alt="My Logo" />
            <ul>
              <li><h3 className="text-5xl font-extrabold text-white pb-3">Forward unto dawn</h3></li>
              <li className="flex flex-wrap items-center justify-center mt-6">
              {pb.authStore.isValid ? (
                <Link
                  href="/Create"
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 bg-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>

                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Create new post
                  </span>
                </Link>
              ) : (
                <ul className="bg-white flex flex-wrap rounded p-1">
                  <li>
                    <Link
                      href="/auth/Signup"
                      
                      className="inline-flex items-center px-3 py-2"
                    >
                      Sign Up
                    </Link>
                  </li>
                  <li><p>|</p></li>
                  <li>
                    <Link
                      href="/auth/Signin"
                      className="inline-flex items-center px-3 py-2"
                    >
                      Sign In
                    </Link>
                  </li>
                </ul>
              )}
              </li>
            </ul>
        </li>
        <li className="visible md:hidden text-white h-screen">
          {/* Mobile landing component */}
          <div>
            <ul className=""><li className="text-xl font-extrabold my-6">Find your intellectual edge</li>
              <li className="text-lg font-mono my-6">a space to think and make think</li>
              <li className="flex flex-wrap items-center justify-center mt-10">
              {pb.authStore.isValid ? (
                <Link
                  href="/Create"
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 bg-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>

                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Create new post
                  </span>
                </Link>
              ) : (
                <ul className="bg-white flex flex-wrap rounded p-1">
                  <li>
                    <Link
                      href="/auth/Signup"
                      
                      className="inline-flex items-center px-3 py-2"
                    >
                      Sign Up
                    </Link>
                  </li>
                  <li><p>|</p></li>
                  <li>
                    <Link
                      href="/auth/Signin"
                      className="inline-flex items-center px-3 py-2"
                    >
                      Sign In
                    </Link>
                  </li>
                </ul>
              )}
              </li>
            </ul>
          </div>
        </li>

      </ul>
    </div>
  );
};

export default Landing;

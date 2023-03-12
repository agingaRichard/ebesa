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
    <div class="flex justify-center">
      <ul class="w-full h-full px-auto">
        <li class="w-full flex justify-between">
          <a href="/">
            <Image
              src="/images/mobilelogo.jpg"
              width={120}
              height={40}
              alt="Ebesa icon"
            />
          </a>
          <div>
            <ul class="md:flex flex-wrap mb-4 justify-center text-white hidden md:visible">
              {/* <li>
                <Link href="/Articlespage" class="px-2 text-white">
                  Articles
                </Link>
              </li>
              <li>
                <Link href="/Projectspage" class="px-2 text-white">
                  Projects
                </Link>
              </li> */}
              <li>
                <Link href="/galleries/Galleries" class="px-2 text-white">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="events/Events" class="px-2 text-white">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/Members" class="px-2 text-white">
                  Members
                </Link>
              </li>
              <li>
                <Link href="/Contacts" class="px-2 text-white">
                  Contacts
                </Link>
              </li>
            </ul>
          </div>
          <div>
            {pb.authStore.isValid ? (
              <button
                type="button"
                onClick={logout}
                class="focus:outline-none text-white bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                <span class="flex-1 ml-3 whitespace-nowrap">Sign Out</span>
              </button>
            ) : (
              <></>
            )}
          </div>
        </li>
        <li className="md:flex justify-center items-center text-white">
          <img src="/images/ebesa-transparent.png" alt="My Logo" />
          <h3 class="mx-auto font">Forward unto dawn</h3>
        </li>
        <li>
          <div class="flex flex-wrap justify-center sm:hidden">
            {pb.authStore.isValid ? (
              <Link
                href="/Create"
                class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 bg-white"
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

                <span class="flex-1 ml-3 whitespace-nowrap">
                  Create new post
                </span>
              </Link>
            ) : (
              <ul>
                <li>
                  <Link
                    href="/auth/Signup"
                    class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link
                    href="/auth/Signin"
                    class="inline-flex items-center px-3 py-2"
                  >
                    Sign In
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Landing;

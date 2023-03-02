import { Button } from "flowbite-react";
import Link from "next/link";
import pb from "../pages/api/pocketbase";

const Landing = () => {
  return (
    <div class="flex justify-center">
      <ul>
        <li>
          <div>
            <ul class="flex flex-wrap mb-4 justify-center">
              <li>
                <Link href="/Articlespage" class="px-2">
                  Articles
                </Link>
              </li>
              <li>
                <Link href="/Projectspage" class="px-2">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/galleries/Galleries" class="px-2">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="events/Events" class="px-2">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/Contacts" class="px-2">
                  Contacts
                </Link>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <img src="/images/ebesa-transparent.png" alt="My Logo" />
        </li>
        <li className="flex justify-center">
          <h3>Forward unto dawn</h3>
        </li>
        <li>
          <div class="flex flex-wrap mb-4 justify-center">
            {pb.authStore.isValid ? (
              <div>Welcome!</div>
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

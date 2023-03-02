import { Button } from "flowbite-react";
import Link from "next/link";

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
                <Link href="events/Events" class="px-2">
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
      </ul>
    </div>
  );
};

export default Landing;

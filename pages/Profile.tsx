import pb from "../pages/api/pocketbase";
import Image from "next/image";
import Link from "next/link";
import Card from "../components/ArticleCard";
import { useRouter } from "next/router";
import { Badge } from "flowbite-react";

const Profile = () => {
  const userModel = pb.authStore.model;
  const myAvatar = userModel?.avatar;
  const mysrc = `http://127.0.0.1:8090/api/files/_pb_users_auth_/${userModel?.id}/${myAvatar}?thumb=100x100`;
  const router = useRouter();

  async function logout() {
    await pb.authStore.clear();
    router.push("/");
  }

  // const userImg = pb.collection("users").getOne(userModel?.id).then((res)=>{return(res.avatar)});

  //Get projects
  const myProjects = pb
    .collection("projects")
    .getList(1, 50, {
      filter: `author != null && author == ${userModel?.id}`,
    })
    .then((res) => {
      return res;
    })
    .then((data) => {
      console.log(data.items);
    });

  //Get articles
  const myArticles = pb
    .collection("articles")
    .getList(1, 50, {
      filter: `author != null && author == ${userModel?.id}`,
    })
    .then((res) => {
      return res;
    })
    .then((data) => {
      console.log(data.items);
    });

  // const myloader = () => {
  //   return userModel.avatar;
  // };

  // console.log(JSON.stringify(myProjects));

  return (
    <div>
      <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div class="flex justify-end px-4 pt-4">
          {/*<!-- Dropdown menu -->*/}
          {/* <div
            id="dropdown"
            class="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700"
          >
            <ul class="py-1" aria-labelledby="dropdownButton">
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Edit
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Export Data
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Delete
                </a>
              </li>
            </ul>
          </div> */}
        </div>
        <div class="flex flex-col items-center pb-10">
          <img
            class="w-24 h-24 mb-3 rounded-full shadow-lg"
            src={mysrc}
            height={50}
            width={50}
            alt="userimage"
          />
          <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {userModel?.firstName} {userModel?.lastName}
          </h5>
          <button
            type="button"
            onClick={logout}
            class="focus:outline-none text-white bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            <span class="flex-1 ml-3 whitespace-nowrap">Sign Out</span>
          </button>
          <span class="text-sm text-gray-500 dark:text-gray-400 my-2">
            {userModel?.email}
          </span>
          <Badge>{userModel?.noun}</Badge>
          {/*<div class="flex mt-4 space-x-3 md:mt-6">
            <h3 class="">Projects</h3>
            <ul>
               {myProjects.map((proj) => {
                <li>
                  <Link href={`/projects/Viewpost/${proj.id}`}>
                    <Card item={{ title: proj.title, text: proj.text }} />
                  </Link>
                </li>;
              })}
            </ul>
            <h3 class="">Articles</h3>
            <ul>
               {myArticles.map((art) => {
                <li>
                  <Link href={`/articles/Viewpost/${art.id}`}>
                    <Card item={{ title: art.title, text: art.text }} />
                  </Link>
                </li>;
              })}
            </ul>
          </div>*/}
        </div>
      </div>
    </div>
  );
};

export default Profile;

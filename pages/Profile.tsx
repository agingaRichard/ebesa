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
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-end px-4 pt-4">
          {/*<!-- Dropdown menu -->*/}
          {/* <div
            id="dropdown"
            className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700"
          >
            <ul className="py-1" aria-labelledby="dropdownButton">
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Edit
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Export Data
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Delete
                </a>
              </li>
            </ul>
          </div> */}
        </div>
        <div className="flex flex-col items-center pb-10 min-w-fit">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src={mysrc}
            height={50}
            width={50}
            alt="userimage"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white px-2">
            {userModel?.firstName} {userModel?.lastName}
          </h5>
          <button
            type="button"
            onClick={logout}
            className="focus:outline-none text-white bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            <span className="flex-1 ml-3 whitespace-nowrap">Sign Out</span>
          </button>
          <span className="text-sm text-gray-500 dark:text-gray-400 my-2">
            {userModel?.email}
          </span>
          <Badge>{userModel?.noun}</Badge>
          {/*<div className="flex mt-4 space-x-3 md:mt-6">
            <h3 className="">Projects</h3>
            <ul>
               {myProjects.map((proj) => {
                <li>
                  <Link href={`/projects/Viewpost/${proj.id}`}>
                    <Card item={{ title: proj.title, text: proj.text }} />
                  </Link>
                </li>;
              })}
            </ul>
            <h3 className="">Articles</h3>
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

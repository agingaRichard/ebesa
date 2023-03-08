import pb from "../api/pocketbase";
import Link from "next/link";
import Card from "../../components/ArticleCard";

import Homepage from "../homepage";
import { useEffect, useState } from "react";

const Profile = ({ myProfile }, context: any) => {
  const userModel = pb.authStore.model;
  // const memberId = context.query.id.toString();
  // const myArticles = memberData.articles;
  // const [myData, setMyData] = useState({});
  // console.log(myProjects);

  const [articles, setArticles] = useState();
  const [projects, setProjects] = useState();

  const getarticles = () => {
    pb.collection("articles")
      .getFullList(200 /* batch size */, {
        sort: "-created",
      })
      .then((res) => {
        setArticles(res);
      });
  };

  const getprojects = () => {
    pb.collection("projects")
      .getFullList(200 /* batch size */, {
        sort: "-created",
      })
      .then((res) => {
        setProjects(res);
      });
  };

  useEffect(() => {
    getarticles();
    getprojects();
  }, []);

  return (
    <div>
      <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div class="flex flex-col items-center pb-10">
          <img
            class="w-24 h-24 mb-3 rounded-full shadow-lg"
            src={userModel?.avatar}
            alt="avatar"
          />
          <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {userModel?.firstName} {userModel?.lastName}
          </h5>
          <span class="text-sm text-gray-500 dark:text-gray-400">
            {userModel?.email}
          </span>
          <div class="flex mt-4 space-x-3 md:mt-6">
            <h3 class="">Projects</h3>
            <ul>
              {articles?.map((art) => {
                <li>
                  <Card item={{ title: art.title, text: art.text }} />
                </li>;
              })}
            </ul>
            <ul>
              {projects?.map((proj) => {
                if (proj.author == myProfile.id) {
                  <li>
                    <Link href={`/projects/Viewpost/${proj.id}`}>
                      <Card item={{ title: proj.title, text: proj.text }} />
                    </Link>
                  </li>;
                }
              })}
            </ul>
            <h3 class="">Articles</h3>
            <ul>
              {articles?.map((art) => {
                if (art.author == myProfile.id) {
                  <li>
                    <Link href={`/articles/Viewpost/${art.id}`}>
                      <Card item={{ title: art.title, text: art.text }} />
                    </Link>
                  </li>;
                }
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const memberId = await context.query.id?.toString();

  //Fetch user profile
  const myProfile = await pb
    .collection("users")
    .getOne(memberId, {
      expand: "relField1,relField2.subRelField",
    })
    .then(async (res) => {
      const myResponse = await JSON.stringify(res);
      return myResponse;
    })
    .catch((err) => {
      console.log("Pocketbase error: " + err);
    });

  return { props: { myProfile } };
}

export default Profile;

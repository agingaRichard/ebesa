import pb from "../api/pocketbase";
import Link from "next/link";
import Card from "../../components/ArticleCard";

import { useEffect, useState } from "react";

const Profile = ({ userProfile }) => {
  const [myArticles, setMyArticles] = useState();
  const [myProjects, setMyProjects] = useState();

  const getMyArticles = () => {
    pb.collection("articles")
      .getFullList(200 /* batch size */, {
        sort: "-created",
      })
      .then((res) => {
        setMyArticles(res);
      });
  };

  const getMyProjects = () => {
    pb.collection("projects")
      .getFullList(200 /* batch size */, {
        sort: "-created",
      })
      // .then((res) => {
      //   alert(JSON.stringify(res));
      // })
      .then((res) => {
        setMyProjects(res);
      });
  };

  useEffect(() => {
    getMyArticles();
    getMyProjects();
  }, []);
  // console.log(myProfile);
  // console.log(myProjects);
  const myProfile = userProfile;

  const myCollectionId = pb.collection("users").collectionIdOrName;
  console.log(myProfile.collectionName);
  console.log(myProfile.id);
  console.log(myProfile.avatar);

  // const avatarString = `http://127.0.0.1:8090/api/files/${myProfile.collectionName}/${myProfile.id}/${myProfile.avatar}`;
  const avatarString =
    "http://127.0.0.1:8090/api/files/users/lsyrj63wlnekfc7/musk_8YBKNNAjH9.jpg";

  return (
    <div>
      <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div class="flex flex-col items-center pb-10">
          <img
            class="w-24 h-24 mb-3 rounded-full shadow-lg"
            src={avatarString}
            alt="avatar"
          />
          <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {myProfile?.firstName} {myProfile?.lastName}
          </h5>
          <span class="text-sm text-gray-500 dark:text-gray-400">
            {myProfile?.email}
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
              {myProjects?.map((proj: any) => {
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
              {myArticles?.map((art) => {
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
  const userProfile = await pb
    .collection("users")
    .getOne(memberId, {
      expand: "relField1,relField2.subRelField",
    })
    .then(async (res) => {
      const myResponse = await JSON.stringify(res);
      return myResponse;
    })
    .catch((err) => {
      console.log("Pocketbase error... " + err);
    });
  // console.log(userProfile);

  return { props: { userProfile } };
}

export default Profile;

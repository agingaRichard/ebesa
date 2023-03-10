import pb from "./api/pocketbase";
import Link from "next/link";
import ArticleCard from "./../components/ArticleCard";
import ProjectCard from "../components/ProjectCard";

import { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const Profile = ({ myProfile }) => {
  const [articles, setArticles] = useState();
  const [projects, setProjects] = useState();

  const getArticles = () => {
    pb.collection("articles")
      .getFullList(200 /* batch size */, {
        sort: "-created",
      })
      //   .then((res) => {
      //     for (let i = 0; i < res.length; i++) {
      //       const element = res[i];
      //       if (element.author != myProfile.id) {
      //         res.pop(element);
      //       }
      //     }
      //   })
      .then((res) => {
        setArticles(res);
        return;
      });
  };

  const getProjects = () => {
    pb.collection("projects")
      .getFullList(200 /* batch size */, {
        sort: "-created",
      })
      //   .then((res) => {
      //     for (let i = 0; i < res.length; i++) {
      //       const element = res[i];
      //       if (element.author != myProfile.id) {
      //         res.pop(element);
      //       }
      //     }
      //   })
      .then((res) => {
        setProjects(res);
        return;
      });
  };

  const myArticles = (articles: Array<Object>) => {
    const mine = [];
    for (let i in articles) {
      if (i.author == myProfile.id) {
        mine.push(i);
      }
      return mine;
    }
  };

  const myProjects = (projects: Array<Object>) => {
    const mine = [];
    for (let i in projects) {
      if (i.author == myProfile.id) {
        mine.push(i);
      }
      return mine;
    }
  };
  useEffect(() => {
    getArticles();
    getProjects();
    // filterMyArticles(articles, myProfile);
  }, []);

  // console.log(myProfile);
  //Getting source for user's avatar...
  const avatarString = `http://127.0.0.1:8090/api/files/${myProfile.collectionName}/${myProfile.id}/${myProfile.avatar}`;

  return (
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
        <p class="text-sm text-gray-500 dark:text-gray-400">
          {myProfile?.email}
        </p>
        <div class="flex mt-4 space-x-3 md:mt-6">
          <Tabs>
            <TabList>
              <Tab>Articles</Tab>
              <Tab>Projects</Tab>
            </TabList>
            <TabPanel>
              <ul>
                {articles?.map((article) => {
                  <div class="w-full mb-4 px-2">
                    <ArticleCard
                      item={{
                        title: article.title,
                        text: article.body,
                        id: article.id,
                        images: article.images[0],
                      }}
                    />
                  </div>;
                })}
              </ul>
            </TabPanel>
            <TabPanel>
              {projects?.map((project) => (
                <div class="w-full mb-4 px-2">
                  <ProjectCard
                    item={{
                      title: project.title,
                      text: project.text,
                      id: project.id,
                      images: project.images[0],
                    }}
                  />
                </div>
              ))}
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

//This function can only return a value if its file is located in the pages/ directory.
export async function getServerSideProps(context) {
  const memberId = await context.query.viewmember?.toString();

  //Fetch user profile
  const myProfile = await pb
    .collection("users")
    .getOne(memberId, {
      expand: "relField1,relField2.subRelField",
    })
    .then(async (res) => {
      const myResponse = await JSON.stringify(res);
      const data = await JSON.parse(myResponse);
      return data;
    })
    .catch((err) => {
      console.log("Pocketbase error... " + err);
    });

  return { props: { myProfile } };
}

export default Profile;
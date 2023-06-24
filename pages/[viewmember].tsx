import pb from "./api/pocketbase";
import Link from "next/link";
import ArticleCard from "./../components/ArticleCard";
import ProjectCard from "../components/ProjectCard";

import { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const Profile = ({ myProfile }: any) => {
  const [articles, setArticles] = useState([]);
  const [projects, setProjects] = useState([]);

  const getArticles = () => {
    pb.collection("articles")
      .getFullList(200 /* batch size */, {
        sort: "-created",
      })
      .then((res: any) => {
        setArticles(res);
        return;
      });
  };

  const getProjects = () => {
    pb.collection("projects")
      .getFullList(200 /* batch size */, {
        sort: "-created",
      })
      .then((res: any) => {
        setProjects(res);
        return;
      });
  };

  useEffect(() => {
    getArticles();
    getProjects();
  }, []);

  //Getting source for user's avatar...
  const avatarString = `https://sweet-optician.pockethost.io/api/files/${myProfile.collectionName}/${myProfile.id}/${myProfile.avatar}`;

  return (
    <div className="w-full mx-auto mt-20 max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center pb-10">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src={avatarString}
          alt="avatar"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {myProfile?.firstName} {myProfile?.lastName}
        </h5>
        {/* <h6 className="text-sm text-gray-500 dark:text-gray-400">
          {myProfile?.email}
          Note: This did not work because email visibility is disabled on PocketBase.
        </h6> */}
        <div className="flex mt-4 space-x-3 md:mt-6">
          <Tabs>
            <TabList>
              <Tab>Articles</Tab>
              <Tab>Projects</Tab>
            </TabList>
            <TabPanel>
              {articles?.map((article: any) =>
                article.author == myProfile.id ? (
                  <div key={article} className="w-full mb-4 px-2">
                    <ArticleCard
                      item={{
                        title: article.title,
                        text: article.body,
                        id: article.id,
                        approval: article.approval,
                        images: article.images[0],
                      }}
                    />
                  </div>
                ) : (
                  <></>
                )
              )}
            </TabPanel>
            <TabPanel>
              {projects?.map((project: any) =>
                project.author == myProfile.id ? (
                  <div key={project} className="w-full mb-4 px-2">
                    <ProjectCard
                      item={{
                        title: project.title,
                        text: project.text,
                        id: project.id,
                        approval: project.approval,
                        images: project.images[0],
                      }}
                    />
                  </div>
                ) : (
                  <></>
                )
              )}
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

//This function can only return a value if its file is located in the pages/ directory.
export async function getServerSideProps(context: any) {
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

import ProjectCard from "../components/ProjectCard";
import ArticleCard from "../components/ArticleCard";
import Landing from "../components/landing";
// import Carousel from "../components/Carousel";
import pb from "./api/pocketbase";
// import Link from "next/link";
import { useEffect, useState } from "react";

export default function Homepage() {
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
    // .then((res) => {
    //   //Enabling admin to see unapproved posts
    //   if (pb.authStore.isValid == true) {
    //     setProjects(res);
    //   } else {
    //     //Making unapproved posts invisible to non admins
    //     const customRes = [];
    //     let x = [];
    //     for (let i in res) {
    //       if (i.approval == false) {
    //         const index = res.indexOf(i);
    //         x = res.splice(index, 1);
    //       }
    //     }
    //     // console.log(x);
    //     setProjects(customRes);
    //   }
    // });
  };

  useEffect(() => {
    getarticles();
    getprojects();
  }, []);

  return (
    <div className="bg-opacity-0">
      <Landing className="w-100 h-120 flex justify-center" />
      <h3 className="flex items-center text-5xl font-extrabold text-white pb-3">
        Articles
      </h3>
      <div className="flex flex-wrap justify-center -mb-4 -mx-2">
        {articles?.map((article) =>
          pb.authStore.isValid ? (
            <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
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
          ) : article.approval ? (
            <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
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
      </div>
      <h3 className="flex items-center text-5xl font-extrabold text-white pb-3">
        Projects
      </h3>
      <div className="flex flex-wrap justify-center -mb-4 -mx-2">
        {projects?.map((project) =>
          pb.authStore.isValid ? (
            <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
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
          ) : project.approval ? (
            <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
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
      </div>
    </div>
  );
}

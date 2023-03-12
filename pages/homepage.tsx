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
        //Enabling admin to see unapproved posts
        if (pb.authStore.isValid == true) {
          // console.log(res);
          setArticles(res);
        } else {
          //Creating a list of approved posts for non-admins to see
          const customRes = [];
          for (let i in res) {
            if (i.approval == true) {
              customRes.push(i);
            }
          }
          console.log(customRes);
          setArticles(customRes);
        }
      });
  };

  const getprojects = () => {
    pb.collection("projects")
      .getFullList(200 /* batch size */, {
        sort: "-created",
      })
      .then((res) => {
        //Enabling admin to see unapproved posts
        if (pb.authStore.isValid == true) {
          setProjects(res);
        } else {
          //Making unapproved posts invisible to non admins
          const customRes = [];
          for (let i in res) {
            if (i.approval == false) {
              res.pop(i);
            }
          }
          console.log(customRes);
          setProjects(res);
        }
      });
  };

  useEffect(() => {
    getarticles();
    getprojects();
  }, []);

  return (
    <div class="bg-opacity-0">
      <Landing class="w-100 h-120 flex justify-center" />
      <h3 class="flex items-center text-5xl font-extrabold text-white pb-3">
        Articles
      </h3>
      <div class="flex flex-wrap justify-center -mb-4 -mx-2">
        {articles?.map((article) => (
          <div class="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
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
        ))}
      </div>
      <h3 class="flex items-center text-5xl font-extrabold text-white pb-3">
        Projects
      </h3>
      <div class="flex flex-wrap justify-center -mb-4 -mx-2">
        {projects?.map((project) => (
          <div class="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
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
        ))}
      </div>
    </div>
  );
}

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
  };

  useEffect(() => {
    getarticles();
    getprojects();
  }, []);

  return (
    <div class="bg-opacity-0">
      <Landing class="w-100 h-120 flex justify-center" />
      <h3 class="flex items-center text-5xl font-extrabold dark:text-white">
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
                images: article.images[0],
              }}
            />
          </div>
        ))}
      </div>
      <h3 class="flex items-center text-5xl font-extrabold dark:text-white">
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
                images: project.images[0],
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

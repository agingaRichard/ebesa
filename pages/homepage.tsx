import Card from "../components/Card";
import Carousel from "../components/Carousel";
import pb from "./api/pocketbase";
import Link from "next/link";
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
    <div>
      <h3 class="flex items-center text-5xl font-extrabold dark:text-white">
        Articles
      </h3>
      <div>
        {articles?.map((article) => (
          <Link href={`/articles/Viewpost/${article.id}`}>
            <Card item={{ title: article.title, text: article.body }} />
          </Link>
        ))}
      </div>
      <h3 class="flex items-center text-5xl font-extrabold dark:text-white">
        Projects
      </h3>
      <div>
        {projects?.map((project) => (
          <Link href={`/projects/Viewpost/${project.id}`}>
            <Card item={{ title: project.title, text: project.text }} />
          </Link>
        ))}
      </div>
    </div>
  );
}

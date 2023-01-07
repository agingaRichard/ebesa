import PostCard from "../components/PostCard";
import Carousel from "../components/Carousel";
import pb from "./api/pocketbase";
import { RSC_MODULE_TYPES } from "next/dist/shared/lib/constants";
import createMapper from "map-factory";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Homepage() {
  const [articles, setArticles] = useState();
  const [projects, setProjects] = useState();

  const getarticles = async () => {
    const res = await fetch(
      "http://127.0.0.1:8090/api/collections/articles/records"
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(typeof data.items);
        setArticles(data.items);
      });
  };

  const getprojects = async () => {
    const res = await fetch(
      "http://127.0.0.1:8090/api/collections/projects/records"
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(typeof data.items);
        setProjects(data.items);
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
        {articles?.map((arts) => (
          <p>{arts.title}</p>
        ))}
      </div>
      <h3 class="flex items-center text-5xl font-extrabold dark:text-white">
        Projects
      </h3>
      <div>
        {projects?.map((projs) => (
          <p>{projs.title}</p>
        ))}
      </div>
    </div>
  );
}

/*export async function getServerSideProps() {
  // get the current environment
  // request posts from api
  // extract the data
  //const articles = await connect.collection("articles").find({})
  //articles

  //list = JSON.stringify(articles);

  return {
    props: {},
  };
}*/

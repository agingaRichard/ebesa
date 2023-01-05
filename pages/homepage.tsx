import PostCard from "../components/PostCard";
import Carousel from "../components/Carousel";
import pb from "./api/pocketbase";
import { RSC_MODULE_TYPES } from "next/dist/shared/lib/constants";
import createMapper from "map-factory";
import axios from "axios";

const articles = async () => {
  const res = await axios
    .get("http://127.0.0.1:8090/api/collections/articles/records")
    .then((res) => {
      console.log(typeof res.data.items);
      return res.data.items;
    });

  console.log(typeof res);
  // .then((response) => {
  //   const objs = response.json();
  //   return objs.items;
  // })
  // .then((conc) => {
  //   console.log(conc);
  // });
  // const data = await res.json();
  // const arts = data.items;

  // await console.log(typeof arts);
  // return arts;
};

const projects = async () => {
  const res = await fetch(
    "http://127.0.0.1:8090/api/collections/projects/records"
  );
  // .then((response) => {
  //   return response.json();
  // })
  // .then((conc) => {
  //   console.log(conc.items);
  // });
  //const data = await res.json();
  //const projs = data.items;

  //console.log(data);
  //return data?.items;
};

export default async function Homepage() {
  const allArticles = await articles();
  //const allProjects = await projects();

  return (
    <div>
      <h3 class="flex items-center text-5xl font-extrabold dark:text-white">
        Articles
      </h3>
      <div>
        {allArticles?.map((arts) => (
          <p>{arts.title}</p>
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

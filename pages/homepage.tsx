import PostCard from "../components/PostCard";
import Carousel from "../components/Carousel";
import pb from "./api/pocketbase";
import { RSC_MODULE_TYPES } from "next/dist/shared/lib/constants";

const articles = async () => {
  const res = await fetch(
    "http://127.0.0.1:8090/api/collections/articles/records"
  );
  const data = await res.json();
  await console.log(data);
  //return data?.items as any[];
};

const projects = async () => {
  const res = await fetch(
    "http://127.0.0.1:8090//api/collections/projects/records"
  );
  const data = await res.json();

  return data;
  //return data?.items as any[];
};

export default function Homepage() {
  const allArticles = articles();
  //const appProjects = await

  return (
    <div>
      <h3 class="flex items-center text-5xl font-extrabold dark:text-white">
        EBESA: {allArticles}
      </h3>
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

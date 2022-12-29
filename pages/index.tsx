import Homepage from "./homepage";
import App from "./_app.tsx";
import backend from "../server/index";

export default function Home() {
  return (
    <div class="w-full h-full">
      <Homepage />
    </div>
  );
}

export async function getServerSideProps(ctx) {
  // get the current environment
  let dev = process.env.NODE_ENV !== "production";
  let { DEV_URL, PROD_URL } = process.env;

  // request posts from api
  let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/posts`);
  // extract the data
  let data = await response.json();

  //get initial UnityShop server
  //backend();
  return {
    props: {
      posts: data["message"],
    },
  };
}

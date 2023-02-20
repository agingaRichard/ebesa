import pb from "../api/pocketbase";
import Link from "next/link";
import Card from "../../components/ArticleCard";

const Profile = () => {
  const userModel = pb.authStore.model;
  const myProjects = pb.collection("projects").getList(1, 50, {
    filter: author.id == userModel?.id /*&& someFiled1 != someField2*/,
  });
  const myArticles = pb.collection("articles").getList(1, 50, {
    filter: author.id == userModel?.id /*&& someFiled1 != someField2*/,
  });

  return (
    <div>
      <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div class="flex flex-col items-center pb-10">
          <img
            class="w-24 h-24 mb-3 rounded-full shadow-lg"
            src={userModel?.avatar}
            alt="Bonnie image"
          />
          <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {userModel?.firstName} {userModel?.lastName}
          </h5>
          <span class="text-sm text-gray-500 dark:text-gray-400">
            {userModel?.email}
          </span>
          <div class="flex mt-4 space-x-3 md:mt-6">
            <h3 class="">Projects</h3>
            <ul>
              {myProjects.map((proj) => {
                <li>
                  <Link href={`/projects/Viewpost/${proj.id}`}>
                    <Card item={{ title: proj.title, text: proj.text }} />
                  </Link>
                </li>;
              })}
            </ul>
            <h3 class="">Articles</h3>
            <ul>
              {myArticles.map((art) => {
                <li>
                  <Link href={`/articles/Viewpost/${art.id}`}>
                    <Card item={{ title: art.title, text: art.text }} />
                  </Link>
                </li>;
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const myMembers = await pb
    .collection("users")
    .getOne(200, {
      sort: "-created",
    })
    .then(async (res) => {
      const myResponse = await JSON.stringify(res);
      const data = await JSON.parse(myResponse);
      return data;
    })
    .catch((err) => {
      console.log("Pocketbase error: " + err);
    });

  return { props: { myMembers } };
}

export default Profile;

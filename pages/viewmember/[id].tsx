import pb from "../api/pocketbase";
import Link from "next/link";
import Card from "../../components/ArticleCard";

const Profile = ({ memberPosts }) => {
  const userModel = pb.authStore.model;

  return (
    <div>
      <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div class="flex flex-col items-center pb-10">
          <img
            class="w-24 h-24 mb-3 rounded-full shadow-lg"
            src={userModel?.avatar}
            alt="avatar"
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
  const memberId = await context.query.id?.toString();

  //Fetch user profile
  const myProfile = await pb
    .collection("users")
    .getOne(memberId, {
      expand: "relField1,relField2.subRelField",
    })
    .then(async (res) => {
      const myResponse = await JSON.stringify(res);
      const data = await JSON.parse(myResponse);
      // console.log(myResponse);
      return myResponse;
    })
    .catch((err) => {
      console.log("Pocketbase error: " + err);
    });
  // console.log(myProfile);

  //Fetch Projects and Articles
  const myProjects = pb
    .collection("projects")
    .getList(1, 50, {
      filter: `author == ${memberId}`,
    })
    .then(async (res) => {
      const myResponse = await JSON.stringify(res);
      const data = await JSON.parse(myResponse);
      console.log(res);
      return myResponse;
    })
    .catch((err) => {
      console.log("Pocketbase error: " + err);
    });
  console.log("projects..." + myProjects);

  const myArticles = pb
    .collection("articles")
    .getList(1, 50, {
      filter: `author == ${memberId}` /*&& someFiled1 != someField2*/,
    })
    .then(async (res) => {
      const myResponse = await JSON.stringify(res);
      const data = await JSON.parse(myResponse);
      return data;
    })
    .catch((err) => {
      console.log("Pocketbase error: " + err);
    });

  const memberPosts = JSON.stringify({
    profile: myProfile,
    articles: myArticles,
    projects: myProjects,
  });

  // console.log(memberPosts);

  return { props: { memberPosts } };
}

export default Profile;

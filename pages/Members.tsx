import Link from "next/link";
import pb from "./api/pocketbase";

const Members = ({ myMembers }) => {
  return (
    <div>
      <h2>EBESA members</h2>
      <ul class="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
        {myMembers?.map((member) => (
          <li class="pb-3 sm:pb-4">
            <div class="flex items-center space-x-4">
              <div class="flex-shrink-0">
                <img
                  class="w-8 h-8 rounded-full"
                  src="/docs/images/people/profile-picture-1.jpg"
                  alt="Neil image"
                />
              </div>
              <Link href={`/viewmember/${member.id}`}>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                    {member.firstName} {member.lastName}
                  </p>
                  <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                    {member.email}
                  </p>
                </div>
              </Link>
              <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                {member.noun}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export async function getServerSideProps(context) {
  const myMembers = await pb
    .collection("users")
    .getFullList(200, {
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

export default Members;

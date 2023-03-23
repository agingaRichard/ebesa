import Link from "next/link";
import pb from "./api/pocketbase";

const Members = ({ myMembers }) => {
  // const myCollectionId = pb.collection("users").collectionIdOrName;
  // const mysrc = `http://127.0.0.1:8090/api/files/${myCollectionId}/${myMembers.id}/`;

  //Generate  an array that stores user data and maps it onto a list
  const membersList = myMembers.map((myMembers: Array<string>) => {
    const myCollectionId = pb.collection("users").collectionIdOrName;

    return {
      avatarsrc:
        `http://127.0.0.1:8090/api/files/${myCollectionId}/${myMembers.id}/` +
        myMembers.avatar,
      id: myMembers.id,
      firstName: myMembers.firstName,
      lastName: myMembers.lastName,
      email: myMembers.email,
      noun: myMembers.noun,
    };
  });

  return (
    <div>
      <h2 className="">EBESA members</h2>
      <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
        {membersList?.map((member) => (
          <li className="pb-3 sm:pb-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <img
                  className="w-8 h-8 rounded-full"
                  src={member.avatarsrc}
                  alt="avatar"
                />
              </div>
              <Link href={`/${member.id}`}>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    {member.firstName} {member.lastName}
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    {member.email}
                  </p>
                </div>
              </Link>
              {/* <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                {member.noun}
              </div> */}

              <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300 float-right">
                {member.noun}
              </span>
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
      // console.log(data);
      return data;
    })
    .catch((err) => {
      console.log("Pocketbase error: " + err);
    });

  return { props: { myMembers } };
}

export default Members;

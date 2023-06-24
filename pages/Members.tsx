import Link from "next/link";
import Image from "next/image";
import pb from "./api/pocketbase";

const Members = ({ myMembers }: any) => {
  //Generating an interface to aviod type errors:
  interface Member {
    id: number;
    avatar: string;
    firstName: string;
    lastName: string;
    email: string;
    noun: string;
  }

  //Generate  an array that stores user data and maps it onto a list
  const membersList = myMembers.map((myMembers: Member) => {
    const myCollectionId = pb.collection("users").collectionIdOrName;

    return {
      avatarsrc:
        `https://sweet-optician.pockethost.io/api/files/${myCollectionId}/${myMembers.id}/` +
        myMembers.avatar,
      id: myMembers.id,
      firstName: myMembers.firstName,
      lastName: myMembers.lastName,
      email: myMembers.email,
      noun: myMembers.noun,
    };
  });

  return (
    <div className="pt-10">
      <h2 className="text-sm font-medium text-white truncate dark:text-white">EBESA members</h2>
      <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
        {membersList?.map((member: any) => (
          <li key={member} className="pb-3 sm:pb-4">
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
                  <p className="text-sm font-medium text-white truncate dark:text-white">
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

export async function getServerSideProps(context: any) {
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

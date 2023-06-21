import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useContext, useEffect } from "react";
import pb from "../../api/pocketbase";
import Image from "next/image";
import Carousel from "nuka-carousel/lib/carousel";
import { Badge, Button } from "flowbite-react";
import Modal from "../../../components/Modal";

function ViewPost({ project }: any) {
  //Modal state and functions
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };



  const userModel = pb.authStore.model;
  //Generate links to images
  const mypic = project.images;
  const myCollectionId = pb.collection("projects").collectionIdOrName;
  // const mysrc = `https://sweet-optician.pockethost.io/api/files/${myCollectionId}/${project.id}/`;

  //Create an array of links to images
  const mysrcs = mypic.map((x: string) => {
    const mysrc = `https://sweet-optician.pockethost.io/api/files/${myCollectionId}/${project.id}/`;
    return mysrc + x;
  });
  // console.log(project);
  const router = useRouter();

  function approve() {
    pb.collection(myCollectionId).update(project.id, { approval: true });
    router.push("/");
  }

  return (
    <div>
      <div className="bg-white border border-gray-200 overflow-hidden rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 mt-10 px-auto w-auto">
         <img
          // width={500}
          // height={500}
          onClick={openModal}
          className="rounded-t-lg mx-auto transition duration-300 ease-in-out hover:scale-110"
          src={mysrcs[0]}
          alt=""
        />
        <Modal isOpen={isModalOpen} onClose={closeModal} >
          <Carousel>
            {mysrcs.map((i: string) => {
              return (
                <img
                  // width={500}
                  // height={500}
                  key={i}
                  className="mx-auto my-auto max-h-80"
                  src={i}
                  alt=""
                />
              );
            })}
          </Carousel>
        </Modal>

        <div className="p-5">
          <h5 className="mb-2 md:mx-10 md:text-2xl text-lg font-bold tracking-tight text-gray-900 dark:text-white">
            {project.title}
          </h5>
          <p className="mb-3 md:px-20 font-normal text-gray-700 dark:text-gray-400">
            {project.text}
          </p>

          {pb.authStore.isValid && project.approval == false ? (
            <>
              <Button onClick={approve}>Approve</Button>
            </>
          ) : (
            <>
              <Badge>Approved</Badge>
            </>
          )}
          {/* {userModel.id != null && userModel.id == project.author.id ? (
            <ul>
              <li>
                <Link>Edit project</Link>
              </li>
              <li>
                <Link>Delete project</Link>
              </li>
            </ul>
          ) : (
            <div></div>
          )} */}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const projectId = await context.query.id?.toString();
  const project = await pb
    .collection("projects")
    .getOne(projectId, {
      expand: "relField1,relField2.subRelField",
      $autoCancel: false,
    })
    .then(async (res) => {
      const myResponse = await JSON.stringify(res);
      const data = await JSON.parse(myResponse);
      return data;
    })
    .catch((err) => {
      console.log("Pocketbase error: " + err);
    });

  return { props: { project } };
}

export default ViewPost;

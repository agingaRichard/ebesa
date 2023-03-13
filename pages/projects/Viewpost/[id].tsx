import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useContext, useEffect } from "react";
import pb from "../../api/pocketbase";
import Image from "next/image";
import Carousel from "nuka-carousel/lib/carousel";
import { Badge, Button } from "flowbite-react";

function ViewPost({ project }) {
  const userModel = pb.authStore.model;
  //Generate links to images
  const mypic = project.images;
  const myCollectionId = pb.collection("projects").collectionIdOrName;
  // const mysrc = `http://127.0.0.1:8090/api/files/${myCollectionId}/${project.id}/`;

  //Create an array of links to images
  const mysrcs = mypic.map((x: string) => {
    const mysrc = `http://127.0.0.1:8090/api/files/${myCollectionId}/${project.id}/`;
    return mysrc + x;
  });
  // console.log(project);

  function approve() {
    pb.collection(myCollectionId).update(project.id, { approval: true });
  }

  return (
    <div>
      <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div class="p-5">
          <Carousel>
            {mysrcs.map((i: string) => {
              return (
                <img
                  // width={500}
                  // height={500}
                  class="rounded-t-lg"
                  src={i}
                  alt=""
                />
              );
            })}
          </Carousel>
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {project.title}
          </h5>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {project.text}
          </p>

          {pb.authStore.isValid && project.approval == false ? (
            <>
              <p>LKAJDFSA</p>
              <Button onClick={approve}>Approve</Button>
            </>
          ) : (
            <>
              <p>BUS IS THERE</p>
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

export async function getServerSideProps(context) {
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

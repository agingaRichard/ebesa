import { Button } from "flowbite-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useContext, useEffect } from "react";
import { createEmitAndSemanticDiagnosticsBuilderProgram } from "typescript";
import pb from "../api/pocketbase";
import Carousel from "nuka-carousel/lib/carousel";

// const delete = (x)=>{
//   await pb.collection('events').delete(x.id);
// }

function ViewPost({ event }) {
  //Generate links to images
  const mypic = event.images;
  const myCollectionId = pb.collection("events").collectionIdOrName;
  // const mysrc = `http://127.0.0.1:8090/api/files/${myCollectionId}/${gallery.id}/`;

  //Create an array of links to images
  const mysrcs = mypic.map((x: string) => {
    const mysrc = `http://127.0.0.1:8090/api/files/${myCollectionId}/${event.id}/`;
    return mysrc + x;
  });

  return (
    <div>
      <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div class="p-5">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {event.title}
          </h5>

          {/* <img class="rounded-t-lg" src={mysrc} alt="Event poster" /> */}
          <Carousel>
            {mysrcs.map((i: string) => {
              return (
                <img
                  // width={500}
                  // height={500}
                  class="rounded-t-lg"
                  src={i}
                  alt="Carousel img"
                />
              );
            })}
          </Carousel>
          <p class="text-xs text-gray-900 dark:text-whit">
            by {event.author?.firstName} {event.author?.lastName}
          </p>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {event.text}
          </p>
          {pb.authStore.id != null && pb.authStore?.id == event.author?.id ? (
            <ul>
              <li>
                <Link href={`/events/Editpost/${event.id}`}>Edit event</Link>
              </li>
              <li>
                <Button>Delete event</Button>
              </li>
            </ul>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const eventId = await context.query.id?.toString();
  const event = await pb
    .collection("events")
    .getOne(eventId, {
      expand: "relField1,relField2.subRelField",
      $autoCancel: false,
    })
    .then(async (res) => {
      const myResponse = await JSON.stringify(res);
      const data = await JSON.parse(myResponse);
      // console.log(data.images);
      return data;
    })
    .catch((err) => {
      console.log("Pocketbase error: " + err);
    });

  return { props: { event } };
}

export default ViewPost;

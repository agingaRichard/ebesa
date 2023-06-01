import { Button } from "flowbite-react";
import Link from "next/link";
import Image from "next/image";
// import { useRouter } from "next/router";
// import { useState, useContext, useEffect } from "react";
// import { createEmitAndSemanticDiagnosticsBuilderProgram } from "typescript";
import pb from "../api/pocketbase";
import Carousel from "nuka-carousel";

// const delete = (x)=>{
//   await pb.collection('articles').delete(x.id);
// }

function ViewPost({ gallery }: any) {
  //Generate links to images
  const mypic = gallery.images;
  // const myCollectionId = pb.collection("gallery").collectionIdOrName;
  // const mysrc = `https://sweet-optician.pockethost.io/api/files/${myCollectionId}/${gallery.id}/`;

  //Create an array of links to images
  const mysrcs = mypic.map((x: string) => {
    const mysrc = `https://sweet-optician.pockethost.io/api/files/${gallery.collectionName}/${gallery.id}/`;
    return mysrc + x;
  });

  return (
    <div>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        {/* <img className="rounded-t-lg" src={mysrcs} alt="" /> */}

        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {gallery.title}
          </h5>

          <p className="text-xs text-gray-900 dark:text-whit">
            by {gallery.author?.firstName} {gallery.author?.lastName}
          </p>
          <Carousel>
            {mysrcs.map((i: string) => {
              return (
                <img
                  key={i}
                  // width={500}
                  // height={500}
                  className="rounded-t-lg"
                  src={i}
                  alt=""
                />
              );
            })}
          </Carousel>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {gallery.text}
          </p>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const galleryId = await context.query.id?.toString();
  const gallery = await pb
    .collection("gallery")
    .getOne(galleryId, {
      expand: "relField1,relField2.subRelField",
      $autoCancel: false,
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

  return { props: { gallery } };
}

export default ViewPost;

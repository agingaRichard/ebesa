import { Button } from "flowbite-react";
import Link from "next/link";
// import { useRouter } from "next/router";
// import { useState, useContext, useEffect } from "react";
// import { createEmitAndSemanticDiagnosticsBuilderProgram } from "typescript";
import pb from "../../api/pocketbase";

// const delete = (x)=>{
//   await pb.collection('articles').delete(x.id);
// }

function ViewPost({ gallery }) {
  // console.log(gallery.author);
  // console.log{pb.authStore}

  return (
    <div>
      <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <img class="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />

        <div class="p-5">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {gallery.title}
          </h5>

          <p class="text-xs text-gray-900 dark:text-whit">
            by {gallery.author?.firstName} {gallery.author?.lastName}
          </p>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {gallery.body}
          </p>
          {pb.authStore.id != null && pb.authStore?.id == article.author?.id ? (
            <ul>
              <li>
                <Link href={`/articles/Editpost/${gallery.id}`}>
                  Edit Article
                </Link>
              </li>
              <li>
                <Button>Delete Article</Button>
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

export async function getServerSideProps(context) {
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
      console.log(data);
      return data;
    })
    .catch((err) => {
      console.log("Pocketbase error: " + err);
    });

  return { props: { gallery } };
}

export default ViewPost;

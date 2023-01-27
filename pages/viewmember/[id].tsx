"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useContext, useEffect } from "react";
import { createEmitAndSemanticDiagnosticsBuilderProgram } from "typescript";
import { UserContext } from "../../context/user-context";
import pb from "../../pages/api/pocketbase";

function ViewPost({ member }) {
  const [state, dispatch] = useContext(UserContext);

  return (
    <div>
      <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <Link href="#">
          <img
            class="rounded-t-lg"
            src="/docs/images/blog/image-1.jpg"
            alt=""
          />
        </Link>
        <div class="p-5">
          <Link href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {member.firstName}
            </h5>
          </Link>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {member.lastName}
          </p>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const memberId = await context.query.id?.toString();
  const member = await pb
    .collection("users")
    .getOne(memberId, {
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

const memberArticles = await pb.collection("articles").

  return { props: { member } };
}

export default ViewPost;

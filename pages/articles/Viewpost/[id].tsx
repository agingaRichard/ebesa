import { Button, Badge } from "flowbite-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useContext, useEffect } from "react";
import { createEmitAndSemanticDiagnosticsBuilderProgram } from "typescript";
import pb from "../../api/pocketbase";
import Carousel from "nuka-carousel/lib/carousel";
import Modal from '../../../components/Modal';

// const delete = (x)=>{
//   await pb.collection('articles').delete(x.id);
// }

function ViewPost({ article }: any) {
  //Modal state and functions
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };



  //Generate links to images
  const mypic = article.images;
  const myCollectionId = pb.collection("articles").collectionIdOrName;

  //Create an array of links to images
  const mysrcs = mypic.map((x: string) => {
    const mysrc = `https://sweet-optician.pockethost.io/api/files/${myCollectionId}/${article.id}/`;
    return mysrc + x;
  });
  // console.log(mysrcs);
  const router = useRouter();

  function approve() {
    pb.collection(myCollectionId).update(article.id, { approval: true });
    router.push("/");
  }

  return (
    <div>
      <div className="bg-white border border-gray-200 overflow-hidden rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 px-auto w-auto">
        <img
          // width={500}
          // height={500}
          onClick={openModal}
          className="rounded-t-lg mx-auto transition duration-300 ease-in-out hover:scale-110"
          src={mysrcs[0]}
          alt="click to view"
        />

        {/* <div className="bg-[avatar.images]"></div> */}
        <Modal isOpen={isModalOpen} onClose={closeModal} className="inset-0 ">
          <Carousel>
            {mysrcs.map((i: string) => {
              return (
                <img
                  // width={500}
                  // height={500}
                  className="mx-auto my-auto max-h-80"
                  key={i}
                  src={i}
                  alt="hd-image"
                />
              );
            })}
          </Carousel>
        </Modal>

        <div className="p-5">
          <h5 className="mb-2 mx-10 md:text-2xl text-lg font-bold tracking-tight text-gray-900 dark:text-white">
            {article.title}
          </h5>
          <p className="mb-3 px-20 font-normal text-gray-700 dark:text-gray-400">
            {article.body}
          </p>

          {pb.authStore.isValid && article.approval == false ? (
            <>
              <Button onClick={approve}>Approve</Button>
            </>
          ) : (
            <Badge>Approved</Badge>
          )}
          {/* {pb.authStore.id != null && pb.authStore?.id == article.author?.id ? (
            <ul>
              <li>
                <Link href={`/articles/Editpost/${article.id}`}>
                  Edit Article
                </Link>
              </li>
              <li>
                <Button>Delete Article</Button>
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
  const articleId = await context.query.id?.toString();
  const article = await pb
    .collection("articles")
    .getOne(articleId, {
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

  /* const myAuthor = await pb
     .collection("users")
     .getOne(article.author, {
       expand: "relField1,relField2.subRelField",
     })
     .then(async (res) => {
       const myres = JSON.stringify(res);
       const mydata = await JSON.parse(myres);
       // console.log(myres);
       return myres;
     });*/
  // article.assign(myAuthor, myAuthor);
  // article["myAuthor"] = myAuthor;
  return { props: { article } };
}

export default ViewPost;

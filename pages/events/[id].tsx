import { Button } from "flowbite-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useContext, useEffect } from "react";
import { createEmitAndSemanticDiagnosticsBuilderProgram } from "typescript";
import pb from "../api/pocketbase";
import Carousel from "nuka-carousel/lib/carousel";
import Modal from "../../components/Modal"

// const delete = (x)=>{
//   await pb.collection('events').delete(x.id);
// }

function ViewPost({ event }: any) {
  //Modal state and functions
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  //Generate links to images
  const mypic = event.images;
  const myCollectionId = pb.collection("events").collectionIdOrName;
  // const mysrc = `https://sweet-optician.pockethost.io/api/files/${myCollectionId}/${gallery.id}/`;

  //Create an array of links to images
  const mysrcs = mypic.map((x: string) => {
    const mysrc = `https://sweet-optician.pockethost.io/api/files/${myCollectionId}/${event.id}/`;
    return mysrc + x;
  });

  return (
    <div>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="p-5">
          <h5 className="mb-2 md:mx-10 md:text-2xl text-lg font-bold tracking-tight text-gray-900 dark:text-white">
            {event.title}
          </h5><div className="overflow-hidden">
          <img
            // width={500}
            // height={500}
            onClick={openModal}
            className="rounded-t-lg mx-auto transition duration-300 ease-in-out hover:scale-110"
            src={mysrcs[0]}
            alt=""
          /></div>
          {/* <img className="rounded-t-lg" src={mysrc} alt="Event poster" /> */}
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <Carousel className="max-h-96">
              {mysrcs.map((i: string) => {
                return (
                  <img
                    // width={500}
                    // height={500}
                    key={i}
                    className="mx-auto my-auto max-h-80"
                    src={i}
                    alt="Carousel img"
                  />
                );
              })}
            </Carousel>
          </Modal>
          <p className="mb-3 md:px-20 font-normal text-gray-700 dark:text-gray-400">
            {event.text}
          </p>
          {/* {pb.authStore &&
          pb.authStore.id != null &&
          pb.authStore?.id == event.author?.id ? (
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
          )} */}
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

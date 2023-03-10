import GalleryCard from "../../components/GalleryCard";
import Carousel from "../../components/Carousel";
import pb from "../api/pocketbase";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Galleries() {
  const [galleries, setGalleries] = useState();
  //   const [projects, setProjects] = useState();

  const getgalleries = () => {
    pb.collection("gallery")
      .getFullList(200 /* batch size */, {
        sort: "-created",
      })
      .then((res) => {
        //Enabling admin to see unapproved posts
        if (pb.authStore.isValid == true) {
          setGalleries(res);
        } else {
          //Creating a list of approved posts for non-admins to see
          const customRes = [];
          for (let i in res) {
            if (i.approval == true) {
              customRes.push(i);
            }
          }
          console.log(customRes);
          setGalleries(customRes);
        }
      });
  };

  useEffect(() => {
    getgalleries();
  }, []);

  return (
    <div>
      <h3 class="flex items-center text-5xl font-extrabold dark:text-white">
        Galleries
      </h3>
      <div class="flex flex-wrap justify-center -mb-4 -mx-2">
        {galleries?.map((gallery) => (
          <div class="w-full mb-4 px-2">
            <GalleryCard
              item={{
                title: gallery.title,
                text: gallery.body,
                id: gallery.id,
                images: gallery.images,
              }}
            />
          </div>
        ))}
      </div>
      {/* <h3 class="flex items-center text-5xl font-extrabold dark:text-white">
        Projects
      </h3>
      <div class="flex flex-wrap justify-center -mb-4 -mx-2">
        {projects?.map((project) => (
          <div class="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
            <Card
              item={{
                title: project.title,
                text: project.text,
                id: project.id,
              }}
            />
          </div>
        ))}
      </div> */}
    </div>
  );
}

import GalleryCard from "../../components/GalleryCard";
import Carousel from "../../components/Carousel";
import pb from "../api/pocketbase";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Galleries() {
  const [galleries, setGalleries] = useState<
    {
      id: number;
      text: string;
      title: string;
      approval: boolean;
      images: string[];
    }[]
  >();
  //   const [projects, setProjects] = useState();

  const getgalleries = () => {
    pb.collection("gallery")
      .getFullList(200 /* batch size */, {
        sort: "-created",
      })
      .then((res: any) => {
        setGalleries(res);
      });
  };

  useEffect(() => {
    getgalleries();
  }, []);

  return (
    <div>
      <h3 className="flex items-center text-5xl font-extrabold text-white">
        Galleries
      </h3>
      <div className="flex flex-wrap justify-center -mb-4 -mx-2">
        {galleries &&
          galleries?.map((gallery: any) => (
            <div key={gallery} className="w-full mb-4 px-2">
              <GalleryCard
                item={{
                  title: gallery.title,
                  text: gallery.body,
                  id: gallery.id,
                  approval: gallery.approval,
                  images: gallery.images,
                }}
              />
            </div>
          ))}
      </div>
      {/* <h3 className="flex items-center text-5xl font-extrabold dark:text-white">
        Projects
      </h3>
      <div className="flex flex-wrap justify-center -mb-4 -mx-2">
        {projects?.map((project) => (
          <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
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

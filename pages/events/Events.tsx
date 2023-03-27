import EventCard from "../../components/EventCard";
// import Carousel from "../../components/Carousel";
import pb from "../api/pocketbase";
// import Link from "next/link";
import { useEffect, useState } from "react";

export default function Events() {
  const [events, setEvents] = useState<
    {
      id: number;
      title: string;
      text: string;
      approval: boolean;
      images: string[];
    }[]
  >([]);

  const getevents = () => {
    pb.collection("events")
      .getFullList(200 /* batch size */, {
        sort: "-created",
      })
      .then((res: any) => {
        setEvents(res);
      });
  };

  useEffect(() => {
    getevents();
  }, []);

  return (
    <div>
      <h3 className="flex items-center text-5xl font-extrabold text-white py-2">
        Events
      </h3>
      <div className="flex flex-wrap justify-center -mb-4 -mx-2">
        {events &&
          events?.map((event) => (
            <div key={event.id} className="w-full mb-4 px-2">
              <EventCard
                item={{
                  title: event.title,
                  text: event.text,
                  id: event.id,
                  approval: event.approval,
                  images: event.images,
                }}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

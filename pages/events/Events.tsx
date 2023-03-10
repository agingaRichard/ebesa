import EventCard from "../../components/EventCard";
// import Carousel from "../../components/Carousel";
import pb from "../api/pocketbase";
// import Link from "next/link";
import { useEffect, useState } from "react";

export default function Events() {
  const [events, setEvents] = useState();
  //   const [projects, setProjects] = useState();

  const getevents = () => {
    pb.collection("events")
      .getFullList(200 /* batch size */, {
        sort: "-created",
      })
      .then((res) => {
        //Enabling admin to see unapproved posts
        if (pb.authStore.isValid == true) {
          setEvents(res);
        } else {
          //Creating a list of approved posts for non-admins to see
          const customRes = [];
          for (let i in res) {
            if (i.approval == true) {
              customRes.push(i);
            }
          }
          console.log(customRes);
          setEvents(customRes);
        }
      });
  };

  useEffect(() => {
    getevents();
  }, []);

  return (
    <div>
      <h3 class="flex items-center text-5xl font-extrabold dark:text-white py-2">
        Events
      </h3>
      <div class="flex flex-wrap justify-center -mb-4 -mx-2">
        {events?.map((event) => (
          <div class="w-full mb-4 px-2">
            <EventCard
              item={{
                title: event.title,
                text: event.body,
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

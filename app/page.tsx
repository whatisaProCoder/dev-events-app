import EventCard from "@/components/EventCard";
import ExploreButton from "@/components/ExploreButton";
import { Event } from "@/generated/prisma/client";
import { cacheLife } from "next/dist/server/use-cache/cache-life";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default async function Page() {
  "use cache";
  cacheLife("hours");
  const response = await fetch(`${BASE_URL}/api/events`);
  const { events } = await response.json();

  return (
    <>
      <section className="mt-24 max-sm:mt-44 flex flex-col items-center">
        <h1 className="text-5xl text-center font-semibold leading-14 max-sm:text-3xl max-sm:leading-9">
          The Hub for Every Dev <br />
          <span className="opacity-80">Event You Can’t Miss</span>
        </h1>
        <p className="mt-4 max-sm:w-75 text-center">
          Hackathons, Meetups, and Conferences, All in One Place
        </p>
        <ExploreButton className="mt-4" />
      </section>
      <section
        className="mt-10 flex flex-row justify-center items-center p-8"
        id="events"
      >
        <div className="w-325">
          <a className="font-semibold text-2xl max-sm:text-xl">
            Featured Events
          </a>
          <ul className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6">
            {events &&
              events.length > 0 &&
              events.map((event: Event) => {
                return (
                  <li key={event.slug}>
                    <EventCard {...event} />
                  </li>
                );
              })}
          </ul>
        </div>
      </section>
    </>
  );
}

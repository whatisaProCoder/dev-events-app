import EventCard from "@/components/EventCard";
import ExploreButton from "@/components/ExploreButton";
import { Event } from "@/generated/prisma/client";
import { getEvents } from "@/lib/actions/event.actions";

export default async function Page() {
  const events = await getEvents();

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

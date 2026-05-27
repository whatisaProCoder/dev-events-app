import {
  CalendarRange,
  LaptopMinimal,
  MapPin,
  Timer,
  Users,
} from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { format as dateformat } from "date-fns";
import BookEvent from "@/components/BookEvent";
import { Event } from "@/generated/prisma/client";
import {
  getEventBySlug,
  getSimilarEventsBySlug,
} from "@/lib/actions/event.actions";
import EventCard from "@/components/EventCard";

const EventPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  const event = await getEventBySlug(slug);

  if (!event) {
    return notFound();
  }

  const similarEvents: Event[] = await getSimilarEventsBySlug(slug);

  return (
    <section
      className="mt-24 max-sm:mt-30 flex flex-row justify-center items-center p-8"
      id="events"
    >
      <div className="w-325">
        <div className="flex flex-row max-md:flex-col gap-12">
          <div>
            <h1 className="text-4xl max-sm:text-3xl font-semibold">
              {event.title}
            </h1>
            <p className="mt-4 opacity-80">{event.description}</p>
            <Image
              src={event.image}
              alt={event.slug}
              width={400}
              height={300}
              style={{
                aspectRatio: "16/10",
                width: "100%",
                objectFit: "cover",
              }}
              className="mt-6 rounded-md"
            />
            <h2 className="mt-8 text-2xl font-semibold">Overview</h2>
            <p className="mt-4 opacity-80">{event.overview}</p>

            <h2 className="mt-8 text-2xl font-semibold">Event Details</h2>
            <ul className="mt-4 flex flex-col gap-2 opacity-80">
              <li className="flex flex-row items-center gap-2">
                <CalendarRange size={20} />
                Date: {dateformat(event.datetime, "do LLLL yyyy")}
              </li>
              <li className="flex flex-row items-center gap-2">
                <Timer size={20} />
                Time: {dateformat(event.datetime, "p")}
              </li>
              <li className="flex flex-row items-center gap-2">
                <MapPin size={20} />
                Venue: {event.venue}
              </li>
              <li className="flex flex-row items-center gap-2">
                <LaptopMinimal size={20} />
                Mode: {event.mode}
              </li>
              <li className="flex flex-row items-center gap-2">
                <Users size={20} />
                Audience: {event.audience}
              </li>
            </ul>

            <h2 className="mt-8 text-2xl font-semibold">Agenda</h2>
            <ul className="mt-4 flex flex-col gap-2 opacity-80 ml-4">
              {event.agenda.map((a: string, index: number) => (
                <li key={`agenda-${index}`} className="list-disc">
                  {a}
                </li>
              ))}
            </ul>

            <h2 className="mt-8 text-2xl font-semibold">About the Organizer</h2>
            <p className="mt-4 opacity-80">{event.organizer}</p>

            <ul className="mt-8 flex flex-row gap-2">
              {event.tags.map((tag: string, index: number) => (
                <div
                  key={`tag-${index}`}
                  className="bg-[#0D161A] px-4 py-2 rounded-sm"
                >
                  {tag}
                </div>
              ))}
            </ul>
          </div>

          <div className="w-150 max-md:w-full">
            <BookEvent bookings={event.bookings} slug={event.slug} />
          </div>
        </div>
        <div className="mt-16">
          <a className="font-semibold text-2xl max-sm:text-xl">
            Featured Events
          </a>
          <ul className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6">
            {similarEvents &&
              similarEvents.length > 0 &&
              similarEvents.map((event: Event) => {
                return (
                  <li key={event.slug}>
                    <EventCard {...event} />
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default EventPage;

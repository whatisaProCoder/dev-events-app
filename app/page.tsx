import EventCard from "@/components/EventCard";
import ExploreButton from "@/components/ExploreButton";

const conferenceCards = [
  {
    title: "GitHub Universe 2025",
    slug: "github-universe-2025",
    location: "San Francisco, CA",
    date: "28th October 2025",
    time: "12:25pm - 2:40pm",
    image: "/images/event1.png",
  },
  {
    title: "Infobip Shift 2025 Conference",
    slug: "infobip-shift-2025",
    location: "Zadar, Croatia",
    date: "13th September 2025",
    time: "12:25pm - 2:40pm",
    image: "/images/event2.png",
  },
  {
    title: "React & Frontend Magic",
    slug: "react-frontend-magic",
    location: "San Francisco, CA",
    date: "7th February 2024",
    time: "12:25pm - 2:40pm",
    image: "/images/event3.png",
  },
  {
    title: "DevWorld 2025",
    slug: "devworld-2025",
    location: "Zadar, Croatia",
    date: "13th November 2025",
    time: "10:00am - 2:40pm",
    image: "/images/event4.png",
  },
  {
    title: "Cloudinary User Summit",
    slug: "cloudinary-user-summit",
    location: "The Midway, SF",
    date: "22th October 2025",
    time: "12:25pm - 2:40pm",
    image: "/images/event5.png",
  },
  {
    title: "Vercel Ship 2025",
    slug: "vercel-ship-2025",
    location: "New York City",
    date: "7th February 2025",
    time: "12:25pm - 2:40pm",
    image: "/images/event6.png",
  },
];

export default function Page() {
  return (
    <>
      <section className="mt-20 max-sm:mt-10 flex flex-col items-center">
        <h1 className="text-5xl text-center font-semibold leading-14 max-sm:text-2xl max-sm:leading-6">
          The Hub for Every Dev <br />
          <span className="opacity-80">Event You Can’t Miss</span>
        </h1>
        <p className="mt-4 max-sm:w-75 text-center">
          Hackathons, Meetups, and Conferences, All in One Place
        </p>
        <ExploreButton className="mt-4" />
      </section>
      <section className="mt-10 flex flex-row justify-center items-center p-8">
        <div className="w-325">
          <h3 className="font-semibold text-2xl max-sm:text-xl">
            Featured Events
          </h3>
          <ul className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-6">
            {conferenceCards.map((event) => {
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

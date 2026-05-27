import Image from "next/image";
import { CalendarRange, MapPin, Timer } from "lucide-react";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { format as dateformat } from "date-fns";

interface EventCardProps {
  title: string;
  image: string;
  slug: string;
  location: string;
  datetime: Date;
}

export default function EventCard({
  title,
  image,
  slug,
  location,
  datetime,
}: EventCardProps) {
  return (
    <Link href={`/events/${slug}`}>
      <div style={{ position: "relative", width: "100%", aspectRatio: "4/3" }}>
        <Image
          src={image}
          alt={title}
          fill
          style={{ objectFit: "cover" }}
          className="rounded-md"
        />
      </div>
      <div className="mt-4 font-light flex flex-row items-center gap-1 opacity-70">
        <MapPin size={17} /> {location}
      </div>
      <div className="mt-2 text-xl">{title}</div>
      <div className="mt-2 flex flex-row gap-3  items-center mb-6">
        <div className="flex flex-row gap-2 items-center opacity-70 font-light">
          <CalendarRange size={17} /> {dateformat(datetime, "do LLLL yyyy")}
        </div>
        <Separator orientation="vertical" />
        <div className="flex flex-row gap-2 items-center opacity-70 font-light">
          <Timer size={17} /> {dateformat(datetime, "p")}
        </div>
      </div>
    </Link>
  );
}

"use server";

import prisma from "../prisma";
import { unstable_cache } from "next/cache";

export const getSimilarEventsBySlug = unstable_cache(
  async (slug: string) => {
    try {
      const event = await prisma.event.findUnique({ where: { slug } });

      if (!event) {
        return [];
      }

      const similarEvents = await prisma.event.findMany({
        where: {
          slug: { not: { equals: event.slug } },
          tags: { hasSome: event.tags },
        },
      });

      return similarEvents;
    } catch {
      return [];
    }
  },
  ["similar-events-by-slug"],
  { revalidate: 60 },
);

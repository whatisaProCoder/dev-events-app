"use server";

import prisma from "../prisma";

export const createBooking = async ({
  slug,
  email,
}: {
  slug: string;
  email: string;
}) => {
  try {
    const event = await prisma.event.findUnique({ where: { slug } });

    if (!event) {
      return {
        success: false,
        message: `Event not found for this slug: ${slug}`,
      };
    }

    const booking = await prisma.booking.create({
      data: { email, eventId: event.id },
    });

    return { success: true, booking };
  } catch (e) {
    console.error("Create Booking Failed", e);
    return { success: false, error: e };
  }
};

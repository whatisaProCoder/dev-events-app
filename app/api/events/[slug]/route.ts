import prisma from "../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;

    if (!slug || typeof slug != "string" || slug.trim() == "") {
      return NextResponse.json(
        { message: "Invalid or missing slug parameter" },
        { status: 400 },
      );
    }

    const sanitizedSlug = slug.toLowerCase().trim();

    const event = await prisma.event.findUnique({
      where: { slug: sanitizedSlug },
      include: { bookings: true },
    });

    if (!event) {
      return NextResponse.json(
        { message: `Event with slug ${sanitizedSlug} not found` },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Event fetched successfully", event },
      { status: 200 },
    );
  } catch (e) {
    console.error(e);
    const res = {
      message: "Event Fetching Failed",
      error: e instanceof Error ? e.message : "Unknown",
    };
    return NextResponse.json(res, { status: 500 });
  }
}

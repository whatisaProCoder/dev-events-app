import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { EventSchema } from "@/prisma/generated/schemas";
import z from "zod";
import { v2 as cloudinary } from "cloudinary";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const raw = Object.fromEntries(formData.entries());

    const data = {
      ...raw,
      mode: String(raw.mode).trim(),
      agenda: JSON.parse(String(raw.agenda || "[]")),
      tags: JSON.parse(String(raw.tags || "[]")),
    };

    const result = EventSchema.omit({
      id: true,
      slug: true,
      createdAt: true,
      updatedAt: true,
      image: true,
    })
      .extend({ datetime: z.coerce.date() })
      .safeParse(data);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          errors: result.error.issues,
        },
        { status: 400 },
      );
    }

    const title = result.data.title;

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

    const imageFile = formData.get("image") as File;

    if (!imageFile) {
      return NextResponse.json(
        { message: "Image File is Required" },
        { status: 400 },
      );
    }

    if (imageFile.size > 1024 * 1024 * 5) {
      return NextResponse.json(
        { message: "Image must be under 5 MB" },
        { status: 400 },
      );
    }

    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const cloudinaryResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: process.env.CLOUDINARY_FOLDER_NAME,
            resource_type: "image",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        )
        .end(buffer);
    });

    const imageURL = (cloudinaryResult as { secure_url: string }).secure_url;

    const newEvent = await prisma.event.create({
      data: { ...result.data, slug, image: imageURL },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Event Created Successfully",
        data: newEvent,
      },
      { status: 201 },
    );
  } catch (e) {
    console.error(e);
    const res = {
      message: "Event Creation Failed",
      error: e instanceof Error ? e.message : "Unknown",
    };
    return NextResponse.json(res, { status: 500 });
  }
}

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      { message: "Events Fetched Successfully", events },
      { status: 200 },
    );
  } catch (e) {
    console.error(e);
    const res = {
      message: "Events Fetching Failed",
      error: e instanceof Error ? e.message : "Unknown",
    };
    return NextResponse.json(res, { status: 500 });
  }
}

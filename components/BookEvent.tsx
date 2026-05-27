"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Booking } from "@/generated/prisma/client";
import { useState } from "react";
import { createBooking } from "@/lib/actions/booking.actions";

export default function BookEvent({
  slug,
  bookings,
}: {
  bookings: Booking[];
  slug: string;
}) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    const { success, error } = await createBooking({ slug, email });

    if (success) {
      setSubmitted(true);
    } else {
      console.error("Booking Creation Failed", error);
    }
  };

  return (
    <Card className="opacity-80">
      <CardHeader>
        <CardTitle>Book Your Spot</CardTitle>
        {bookings.length > 0 ? (
          <CardDescription>
            Join {bookings.length} {bookings.length == 1 ? "person" : "people"}{" "}
            who have already booked their spot
          </CardDescription>
        ) : (
          <></>
        )}
        {submitted ? (
          <p className="mt-2">Thank you for signing up!</p>
        ) : (
          <CardContent className="p-0">
            <form className="mt-4" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full mt-4">
                Submit
              </Button>
            </form>
          </CardContent>
        )}
      </CardHeader>
    </Card>
  );
}

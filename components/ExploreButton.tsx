"use client";

import { ArrowDown } from "lucide-react";
import { Button } from "./ui/button";

export default function ExploreButton({ className }: { className: string }) {
  return (
    <Button
      className={className}
      size="lg"
      variant="outline"
      onClick={() => console.log("Explore Events")}
    >
      <a href="#events" className="flex flex-row items-center gap-1.5">
        Explore Events <ArrowDown />
      </a>
    </Button>
  );
}

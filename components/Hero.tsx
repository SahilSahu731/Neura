"use client"

import React from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Globe2, Landmark, Lightbulb, Plane, Send } from "lucide-react";
import { HeroVideoDialog } from "./ui/hero-video-dialog";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const suggestions = [
  {
    title: "Create New Trip",
    icon: <Globe2 className="w-5 h-5 text-blue-400" />,
  },
  {
    title: "Suggest a Destination",
    icon: <Plane className="w-5 h-5 text-green-400" />,
  },
  {
    title: "Find Inspiration",
    icon: <Lightbulb className="w-5 h-5 text-orange-400" />,
  },
  {
    title: "Discover Hidden Gems",
    icon: <Landmark className="w-5 h-5 text-yellow-400" />,
  },
];

const Hero = () => {

  const { user } = useUser();

  const onSend = () => {
    if (!user) {
      redirect("/sign-in");
      return;
    }
    redirect("/create-new-trip");
  }

  return (
    <div className="flex w-full items-center justify-center mt-24">
      <div className="max-w-3xl w-full text-center space-y-6">
        <h1 className="text-xl md:text-5xl font-bold">
          Plan your trips with Neura,{" "}
          <span className="text-primary">Your Personal Travel Planner</span>
        </h1>
        <p className="text-lg text-gray-500 mt-4">
          Just Tell me what you want, and I&apos;ll handle the rest - flights,
          hotels, and more - all in seconds.
        </p>
        {/* Input box */}
        <div>
          <div className="border rounded-2xl p-4 shadow relative">
            <Textarea
              placeholder="Enter your travel plans..."
              className="w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none"
            />
            <Button size={"icon"} className="absolute bottom-3 right-5" onClick={() => onSend()}>
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Suggestions */}
        <div className="flex justify-center gap-4">
          {suggestions.map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-2 border rounded-full p-2 cursor-pointer hover:bg-blue-300 hover:text-white transition-all duration-300"
            >
              {item.icon}
              <p className="text-xs font-medium text-gray-500">{item.title}</p>
            </div>
          ))}
        </div>

        <h2 className="text-lg font-bold mt-12">
          Watch our video to learn more
        </h2>

        {/* video section */}
        <HeroVideoDialog
          className="block dark:hidden"
          animationStyle="from-center"
          videoSrc="https://www.example.com/dummy-video"
          thumbnailSrc="https://mma.prnewswire.com/media/2401528/1_MindTripProduct.jpg?p=facebook"
          thumbnailAlt="Dummy Video Thumbnail"
        />
      </div>
    </div>
  );
};

export default Hero;

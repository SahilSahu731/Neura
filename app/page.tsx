import Hero from "@/components/Hero";
import { PopularCityList } from "@/components/PopularCityList";
import { Button } from "@/components/ui/button";
import Image from "next/image"

export default function Home() {
  return (
    <div>
        <Hero />
        <PopularCityList />
    </div>
  );
}

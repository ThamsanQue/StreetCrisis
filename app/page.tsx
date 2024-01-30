"use client";

import Container from "@/components/ui/container";
import Image from "next/image";
import SClogo from "../Assets/scLogo.png";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const revalidate = 0;

const myFont = localFont({
  src: "../Assets/fonts/RetroGraffiti-JRPwn.otf",
  variable: "--font-retro",
});

const EntrancePage = () => {
  const router = useRouter();
  return (
    <Container>
      <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <Image
          src={SClogo}
          alt="logo"
          width={50}
          height={50}
          className="rounded-md ml-4 flex lg:ml-0 gap-x-2"
        />

        <p className={cn("text-3xl text-primary", myFont.className)}>
          Unleash Creativity
        </p>
      </div>
      <div className="h-screen bg-[url('../Assets/SCback.png')] bg-no-repeat bg-center bg-cover">
        <Button
          className="fixed top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 shadow-lg"
          onClick={() => router.push("home/")}
        >
          Enter The World Of StreetCrisis
        </Button>
      </div>
    </Container>
  );
};

export default EntrancePage;

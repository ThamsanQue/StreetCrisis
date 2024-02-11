"use client";

import Container from "@/components/ui/container";
import Image from "next/image";
import scLogo from "../Assets/scLogo.png";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const revalidate = 0;

const myFont = localFont({
  src: "../Assets/fonts/RetroGraffiti-JRPwn.otf",
  variable: "--font-retro",
});

const EntrancePage = () => {
  return (
    <Container>
      <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <Image
          src={scLogo}
          alt="logo"
          width={50}
          height={50}
          className="rounded-md ml-4 flex lg:ml-0 gap-x-2"
        />

        <p className={cn("text-3xl text-primary", myFont.className)}>
          For The Dreamers
        </p>
      </div>
      <div className="h-screen bg-[url('../Assets/SCback.png')] bg-no-repeat bg-center bg-cover">
        <Link href={"/home/"}>
          <Button className="fixed top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 shadow-lg text-slate-900">
            Enter The World Of StreetCrisis
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default EntrancePage;

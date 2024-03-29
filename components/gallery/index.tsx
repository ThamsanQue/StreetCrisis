"use client";

import { Image as ImageType } from "@/types";
import { Tab } from "@headlessui/react";
import GalleryTab from "./gallery-tab";
import Image from "next/image";
import { cn } from "@/lib/utils";
interface GalleryProps {
  image: ImageType[];
  className?: string;
}
const Gallery: React.FC<GalleryProps> = ({ image, className }) => {
  return (
    <Tab.Group as="div" className="flex flex-col-reverse">
      <div className="mx-auto mt-6  w-full max-w-2xl sm:block lg:max-w-none ">
        <Tab.List className="grid grid-cols-4 gap-6">
          {image.map((image) => (
            <GalleryTab key={image.id} image={image} />
          ))}
        </Tab.List>
      </div>
      <Tab.Panels className="aspect-square w-full ">
        {image.map((image) => (
          <Tab.Panel key={image.id}>
            <div className="aspect-square relative h-full w-full sm:rounded-lg overflow-hidden">
              <Image
                fill
                src={image.url}
                alt="Image"
                className={cn(`object-center`, className)}
              />
            </div>
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};

export default Gallery;

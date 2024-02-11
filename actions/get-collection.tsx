import { Collection } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/collections`;

const getCollections = async (id: string): Promise<Collection> => {
  const res = await fetch(`${URL}/${id}`);

  return res.json();
};

export default getCollections;

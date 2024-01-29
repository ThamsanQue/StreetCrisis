export interface Billboard {
  id: string;
  label: string;
  imageUrl: string;
}

export interface Collection {
  id: string;
  name: string;
  billboard: Billboard;
}

export interface Product {
  id: string;
  collection: Collection;
  name: string;
  description: string;
  price: string;
  isFeatured: boolean;
  size: Size;
  color: Color;
  image: Image[];
  look: Look;
}

export interface Image {
  id: string;
  url: string;
}

export interface Size {
  id: string;
  name: string;
  value: string;
}
export interface Color {
  id: string;
  name: string;
  value: string;
}

export interface Look {
  id: string;
  name: string;
}

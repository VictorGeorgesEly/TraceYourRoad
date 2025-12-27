export interface Image {
  id: string;
  uri: string;
  thumbnail: string;
  width: number;
  height: number;
  caption?: string;
}

export interface Gallery {
  id: string;
  pointId: string;
  title: string;
  description?: string;
  images: Image[];
  createdAt: string;
}

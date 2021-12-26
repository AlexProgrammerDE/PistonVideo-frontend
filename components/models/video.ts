export class Video {
  title: string;
  description: string;
  id: string;
  videoUrl: string;
  thumbnailUrl: string;
  tags: string[];
  uploader: User;
}

export class User {
  username: string;
  id: string;
  avatarUrl: string;
  bioSmall: string;
  bioBig: string;
  badges: string[];
}

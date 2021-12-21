export class Video {
  title: string;
  description: string;
  id: string;
  thumbnailUrl: string;
  tags: string[];
  uploader: User;
}

export class User {
  username: string;
  id: string;
  avatarUrl: string;
  bioSmall: string;
}

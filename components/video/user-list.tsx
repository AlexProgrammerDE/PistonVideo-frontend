import VideoCard from './card';
import { Video } from '../models/video';

export default function VideoUserList({ videos }: { videos: Video[] }) {
  return (
    <div className="flex flex-wrap gap-2 overflow-hidden">
      {videos.map((video, index) => (
        <VideoCard key={index} video={video} />
      ))}
    </div>
  );
}

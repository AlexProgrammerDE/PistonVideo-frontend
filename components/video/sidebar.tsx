import VideoCard from './card';
import { Video } from '../models/video';

export default function VideoSideBar({ videos }: { videos: Video[] }) {
  return (
    <div className="max-w-md flex grid-cols-3 gap-2 overflow-hidden">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}

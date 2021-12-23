import VideoCard from './card';
import { Video } from '../models/video';

export default function VideoList() {
  const rows: Video[][] = [];

  return (
    <div className="flex flex-wrap justify-between gap-2 overflow-hidden w-full">
      {rows.map((rowVideos) => {
        return rowVideos.map((video) => {
          return <VideoCard video={video} />;
        });
      })}
    </div>
  );
}

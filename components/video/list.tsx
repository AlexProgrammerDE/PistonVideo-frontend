import VideoCard from './card';
import { Video } from '../models/video';
import axios from 'axios';
import { GetServerSideProps } from 'next';

export default function VideoList({ videos }: { videos: Video[] }) {
  return (
    <div className="flex flex-wrap justify-between gap-2 overflow-hidden w-full">
      {videos.map((video, index) => {
        return <VideoCard key={index} video={video} />;
      })}
    </div>
  );
}

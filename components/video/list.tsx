import VideoCard from './card';
import { Video } from '../models/video';
import axios from 'axios';
import { useState } from 'react';

export default function VideoList() {
  const [videos, setVideos] = useState<Video[]>([]);

  axios
    .get('backend/suggestions', { params: { amount: 10 } })
    .then((response) => {

      let videosTemp: Video[] = [];

      response.data.forEach((video: Video) => {
        videosTemp.push(video);
      });

      setVideos(videosTemp);
    });

  return (
    <div className="flex flex-wrap justify-between gap-2 overflow-hidden w-full">
      {videos.map((video) => {
        return <VideoCard video={video} />;
      })}
    </div>
  );
}

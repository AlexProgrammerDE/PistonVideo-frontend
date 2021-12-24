import VideoCard from './card';
import { Video } from '../models/video';
import axios from 'axios';
import { useState } from 'react';

export default function VideoList() {
  const [rows, setRows] = useState<Video[][]>([]);

  axios.get('backend/suggestions', { params: { amount: 100 } }).then(response => {
    response.data.forEach((video: Video, index: number) => {
      let rowTemp: Video[][] = []
      if (index % 4 === 0) {
        rowTemp.push([]);
      }
      rowTemp[rowTemp.length - 1].push(video);
      setRows(rowTemp);
    });
  });

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

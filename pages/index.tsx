import SideBarComponent from '../components/sidebar/component';
import VideoList from '../components/video/list';
import axios from 'axios';
import { Video } from '../components/models/video';
import { useEffect, useState } from 'react';

// noinspection JSUnusedGlobalSymbols
export default function Home() {
  const [videos, setVideos] = useState<Video[]>();

  useEffect(() => {
    if (videos) {
      return;
    }

    axios
      .get('/backend/suggestions', {
        params: { amount: 50 },
      })
      .then((res) => {
        let videos: Video[] = [];
        res.data.forEach((video: Video) => {
          videos.push(video);
        });
        setVideos(videos);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [videos]);

  return (
    <div className="flex flex-row min-h-screen bg-gray-50 text-gray-800">
      <SideBarComponent />
      {videos && <VideoList videos={videos} />}
    </div>
  );
}

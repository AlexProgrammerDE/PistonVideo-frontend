import VideoList from '../components/video/list';
import axios from 'axios';
import { Video } from '../components/models/video';
import { useEffect, useState } from 'react';
import Layout from '../components/utils/Layout';

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

  return <Layout>{videos && <VideoList videos={videos} />}</Layout>;
}

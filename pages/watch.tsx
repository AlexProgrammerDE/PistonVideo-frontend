import VideoPlayerComponent from '../components/video-player';
import { Video } from '../components/models/video';
import VideoList from '../components/video/list';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/utils/Layout';
import {
  isBiggerThan,
  useContainerDimensions,
} from '../components/utils/helpers';

// noinspection JSUnusedGlobalSymbols
export default function Watch() {
  const router = useRouter();
  const [videos, setVideos] = useState<Video[]>();
  const [video, setVideo] = useState<Video>();
  const componentRef = useRef();
  const { width } = useContainerDimensions(componentRef);
  const [small, setSmall] = useState(false);

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

  useEffect(() => {
    if (!router.query['id'] || video) {
      return;
    }

    axios
      .get('/backend/videodata', {
        params: { id: router.query['id'] },
      })
      .then((response) => setVideo(response.data));
  }, [video, router]);

  useEffect(() => {
    const temp = isBiggerThan('sm');

    if (temp !== small) {
      setSmall(temp);
    }
  }, [width]);

  return (
    <Layout>
      {video && (
        <div className="flex-grow m-5 shadow-lg bg-gray-100">
          <VideoPlayerComponent video={video} />
          <div className="px-6 py-3">
            <div className="flex flex-row flex-start mb-2">
              <h1 className="font-bold text-2xl mr-2">{video.title}</h1>
              <div className="flex flex-col justify-center">
                <p className="bg-gray-400 text-gray-200 text-center text-sm font-semibold px-1 rounded-full shadow-sm">
                  {video.views}
                </p>
              </div>
            </div>
            <div
              className="text-gray-700 text-lg py-1"
              dangerouslySetInnerHTML={{ __html: video.description }}
            />
            <div className="py-1 pt-1 pb-2">
              {video.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <div className="my-3 flex flex-row w-full bg-gray-300 items-center p-6 space-x-6 rounded-xl shadow-lg">
              <img
                className="rounded-full h-10 w-10 items-center justify-center"
                alt={'Avatar of ' + video.uploader.username}
                src={video.uploader.avatarUrl}
              />
              <a
                className="inline-block text-gray-700 text-lg py-1"
                href={'/user?id=' + video.uploader.id}
              >
                {video.uploader.username}
              </a>
            </div>
          </div>
        </div>
      )}

      <div ref={componentRef} className="mt-5">
        {videos && (
          <VideoList
            videos={videos}
            forcedColumns={small ? 1 : 2}
            noVerticalMargin
          />
        )}
      </div>
    </Layout>
  );
}

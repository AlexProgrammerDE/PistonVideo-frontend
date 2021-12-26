import SideBarComponent from '../components/sidebar/component';
import VideoPlayerComponent from '../components/video-player';
import { Video } from '../components/models/video';
import VideoList from '../components/video/list';
import axios from 'axios';
import { GetServerSideProps } from 'next';

// noinspection JSUnusedGlobalSymbols
export default function Watch({
  video,
  videos,
}: {
  video: Video;
  videos: Video[];
}) {
  return (
    <div className="flex flex-row min-h-screen bg-gray-50 text-gray-800">
      <SideBarComponent />
      {video && (
        <div className="flex-grow m-5 w-full shadow-lg bg-gray-100">
          <VideoPlayerComponent video={video} />
          <div className="px-6 py-3">
            <div className="font-bold text-2xl mb-2">{video.title}</div>
            <div
              className="text-gray-700 text-lg py-1"
              dangerouslySetInnerHTML={{ __html: video.description }}
            />
            <div className="py-1 pt-1 pb-2">
              {video.tags.map((tag, index) => (
                <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #{tag}
                </span>
              ))}
            </div>
            <div className="my-3 flex flex-row w-full bg-gray-300 items-center p-6 space-x-6 rounded-xl shadow-lg">
              <img
                className="rounded-full h-10 w-10 items-center justify-center"
                alt={"Avatar of " + video.uploader.username}
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

      <div className="flex-auto max-w-2xl">
        <VideoList videos={videos} />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const response = await axios.get('/backend/videodata', {
    params: { id: context.query['id'] },
  });
  const video: Video = response.data;

  const response2 = await axios.get('/backend/suggestions', {
    params: { amount: 10 },
  });

  let videos: Video[] = [];
  response2.data.forEach((video: Video) => {
    videos.push(video);
  });

  return {
    props: { video, videos }, // will be passed to the page component as props
  };
};

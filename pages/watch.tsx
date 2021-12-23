import SideBarComponent from '../components/sidebar/component';
import VideoPlayerComponent from '../components/video-player';
import { Video } from '../components/models/video';
import VideoList from '../components/video/list';
import Image from 'next/image';

// noinspection JSUnusedGlobalSymbols
export default function Watch({ video }: { video: Video }) {
  return (
    <div className="flex flex-row min-h-screen bg-gray-50 text-gray-800">
      <SideBarComponent />
      {video && (
        <div className="m-5 w-full shadow-lg bg-gray-100">
          <VideoPlayerComponent video={video} />
          <div className="px-6 py-3">
            <div className="font-bold text-2xl mb-2">{video.title}</div>
            <div
              className="text-gray-700 text-lg py-1"
              dangerouslySetInnerHTML={{ __html: video.description }}
            />
            <div className="py-1 pt-1 pb-2">
              {video.tags.map((tag) => (
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #{tag}
                </span>
              ))}
            </div>
            <div className="my-3 flex flex-row w-full bg-gray-300 items-center p-6 space-x-6 rounded-xl shadow-lg">
              <Image
                className="rounded-full h-10 w-10 items-center justify-center"
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
        <VideoList />
      </div>
    </div>
  );
}

import { Video } from '../models/video';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';

export default function VideoCard({
  video,
  noSideMargin,
}: {
  video: Video;
  noSideMargin?: boolean;
  noVerticalMargin?: boolean;
}) {
  return (
    <div
      className={
        'w-64 h-auto rounded overflow-hidden shadow-lg bg-gray-100' +
        (noSideMargin ? '' : ' ml-2 mr-2')
      }
    >
      <a href={'/watch?id=' + video.id} title={'Watch ' + video.title}>
        <img alt="Thumbnail of the video" src={video.thumbnailUrl} />
      </a>
      <div className="px-6 py-3">
        <div className="flex justify-end -mt-12">
          <a
            href={'/user?id=' + video.uploader.id}
            title={'User page of ' + video.uploader.username}
          >
            <img
              width={'3.5rem'}
              height={'3.5rem'}
              className="w-14 h-14 object-cover rounded-full border-2 border-indigo-500"
              src={video.uploader.avatarUrl}
              alt={'Avatar of ' + video.uploader.username}
            />
          </a>
        </div>
        <a href={'/watch?id=' + video.id}>
          <div className="font-bold text-base mb-2">{video.title}</div>
        </a>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {video.description}
        </ReactMarkdown>
      </div>
      <div className="px-6 pt-1 pb-2">
        {video.tags.map((tag, index) => (
          <span
            key={index}
            className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-1 mb-1"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}

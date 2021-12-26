import { Video } from '../models/video';

export default function VideoCard({ video }: { video: Video }) {
  return (
    <div className="p-2">
      <div className="w-64 h-auto rounded overflow-hidden shadow-lg bg-gray-100">
        <a href={'/watch?id=' + video.id}>
          <img alt="Thumbnail" src={video.thumbnailUrl} />
        </a>
        <div className="px-6 py-3">
          <div className="flex justify-center md:justify-end -mt-12">
            <a href={'/user?id=' + video.uploader.id}>
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
          <div dangerouslySetInnerHTML={{ __html: video.description }} />
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
    </div>
  );
}

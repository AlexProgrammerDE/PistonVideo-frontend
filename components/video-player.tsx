import Plyr from 'plyr-react';
import 'plyr-react/dist/plyr.css';
import { Video } from './models/video';

export default function VideoPlayerComponent({ video }: { video: Video }) {
  return (
    <Plyr
      source={{
        /* https://github.com/sampotts/plyr#the-source-setter */
        type: 'video',
        title: video.title,
        sources: [
          {
            src: video.videoUrl,
            type: 'video/mp4',
            size: 720,
          },
        ],
        poster: video.thumbnailUrl,
        tracks: [],
      }}
      options={
        {
          /* https://github.com/sampotts/plyr#options */
        }
      }
      {
        ...{
          /* Direct props for inner video tag (mdn.io/video) */
        }
      }
    />
  );
}

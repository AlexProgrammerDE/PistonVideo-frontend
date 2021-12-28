import Plyr, { APITypes } from 'plyr-react';
import 'plyr-react/dist/plyr.css';
import { Video } from './models/video';
import { useCallback } from 'react';
import axios from 'axios';

export default function VideoPlayerComponent({ video }: { video: Video }) {
  const plyrRef = useCallback((node) => {
    if (node !== null) {
      const types: APITypes = node as APITypes;
      // DOM node referenced by ref has been unmounted

      if (types.plyr.source === null) return;

      const plyr: Plyr = types.plyr as Plyr;
      // Access the internal plyr instance
      plyr.once('playing', () => {
        setTimeout(() => {
          if (!video) return;

          axios
            .get('/backend/watch', {
              params: { id: video.id },
            })
            .catch((err) => {
              console.log(err);
            });
        }, 5000);
      });
    }
  }, []);

  return (
    <Plyr
      ref={plyrRef}
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
    />
  );
}

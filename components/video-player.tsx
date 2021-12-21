import Plyr from 'plyr-react'
import 'plyr-react/dist/plyr.css'
import { Video } from './models/video';

export default function VideoPlayerComponent({video}: {video: Video}) {
  return (
    <Plyr
      source={
        {
          /* https://github.com/sampotts/plyr#the-source-setter */
          type: 'video',
          title: 'Example title',
          sources: [
            {
              src: '/path/to/movie.mp4',
              type: 'video/mp4',
              size: 720,
            },
            {
              src: '/path/to/movie.webm',
              type: 'video/webm',
              size: 1080,
            },
          ],
          poster: '/path/to/poster.jpg',
          previewThumbnails: {
            src: '/path/to/thumbnails.vtt',
          },
          tracks: [
            {
              kind: 'captions',
              label: 'English',
              srcLang: 'en',
              src: '/path/to/captions.en.vtt',
              default: true,
            },
            {
              kind: 'captions',
              label: 'French',
              srcLang: 'fr',
              src: '/path/to/captions.fr.vtt',
            },
          ],
        }
      }
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
  )
}

import VideoCard from './card';
import { Video } from '../models/video';
import { useContainerDimensions } from '../utils/helpers';
import { useEffect, useRef, useState } from 'react';

export default function VideoList({ videos, noSideMargin }: { videos: Video[], noSideMargin?: boolean }) {
  const componentRef = useRef();
  const { width } = useContainerDimensions(componentRef);
  const [columns, setColumns] = useState<Video[][]>();
  const boxWidth = 256 + 16;

  useEffect(() => {
    if (videos.length > 0) {
      const columnCount = Math.floor(width / boxWidth);

      if (columnCount <= 0) {
        return;
      }

      const tempColumns: Video[][] = [];
      for (let i = 0; i < columnCount; i++) {
        tempColumns.push([]);
      }

      let currentColumn = 0;
      videos.forEach((video) => {
        if (currentColumn >= tempColumns.length) {
          currentColumn = 0;
        }

        tempColumns[currentColumn].push(video);
        currentColumn++;
      });
      setColumns(tempColumns);
    }
  }, [width]);

  return (
    <div ref={componentRef} className="flex flex-row overflow-hidden w-full h-full">
      {columns?.map((column, index) => (
        <div key={index} className="flex flex-col overflow-hidden w-full">
          {column.map((video, index) => (
            <VideoCard key={index} video={video} noMarginLeft={noSideMargin} noMarginRight={noSideMargin}/>
          ))}
        </div>
      ))}
    </div>
  );
}

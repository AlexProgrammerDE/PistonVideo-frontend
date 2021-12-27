import VideoCard from './card';
import { Video } from '../models/video';
import { useContainerDimensions } from '../utils/helpers';
import { useEffect, useRef, useState } from 'react';

export default function VideoList({
  videos,
  forcedColumns = -1,
  noSideMargin,
  noVerticalMargin,
}: {
  videos: Video[];
  forcedColumns?: number;
  noSideMargin?: boolean;
  noVerticalMargin?: boolean;
}) {
  const componentRef = useRef();
  const { width } = useContainerDimensions(componentRef);
  const [columns, setColumns] = useState<Video[][]>();
  const boxWidth = 256 + 16;

  useEffect(() => {
    if (videos.length > 0) {
      let columnCount =
        forcedColumns === -1 ? Math.floor(width / boxWidth) : forcedColumns;

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
    <div
      ref={componentRef}
      className={
        'flex flex-row overflow-hidden w-full h-full' +
        (noVerticalMargin ? '' : ' mt-2 mb-2')
      }
    >
      {columns?.map((column, index) => (
        <div key={index} className="flex flex-col gap-4 overflow-hidden w-full">
          {column.map((video, index) => (
            <div className="flex flex-row justify-center">
              <VideoCard
                key={index}
                video={video}
                noSideMargin={noSideMargin}
                noVerticalMargin={noVerticalMargin}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

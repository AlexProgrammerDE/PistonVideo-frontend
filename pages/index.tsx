import SideBarComponent from '../components/sidebar/component';
import VideoList from '../components/video/list';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { Video } from '../components/models/video';

// noinspection JSUnusedGlobalSymbols
export default function Home({ videos }: { videos: Video[] }) {
  return (
    <div className="flex flex-row min-h-screen bg-gray-50 text-gray-800">
      <SideBarComponent />
      <VideoList videos={videos} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const response = await axios.get('/backend/suggestions', {
    params: { amount: 10 },
  });

  let videos: Video[] = [];
  response.data.forEach((video: Video) => {
    videos.push(video);
  });

  return {
    props: { videos }, // will be passed to the page component as props
  };
};

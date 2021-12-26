import SideBarComponent from '../components/sidebar/component';
import { User, Video } from '../components/models/video';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import VideoList from '../components/video/list';
import { useEffect, useState } from 'react';
import UserBadge from '../components/UserBadge';

// noinspection JSUnusedGlobalSymbols
export default function UserPage({ user }: { user: User }) {
  const [videos, setVideos] = useState<Video[]>();

  useEffect(() => {
    if (videos) {
      return;
    }

    axios
      .get('/backend/uservideos', {
        params: { id: user.id },
      })
      .then((res) => {
        let videos: Video[] = [];
        res.data.forEach((video: Video) => {
          videos.push(video);
        });
        setVideos(videos);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [videos]);

  return (
    <div className="flex flex-row min-h-screen bg-gray-50 text-gray-800">
      <SideBarComponent />

      <div className="m-5 w-full">
        <div className="flex flex-col">
          <div className="bg-blue-100 shadow-lg rounded-2xl">
            <div className="flex flex-row items-center mt-40 mb-10 mx-10 bg-gray-100 rounded-1xl shadow-lg w-42 h-40">
              <img
                alt={'Avatar of ' + user.username}
                src={user.avatarUrl}
                className="w-40 h-40 mr-5 flex-none bg-cover
              rounded-t lg:rounded-t-none lg:rounded-l rounded-1xl text-center overflow-hidden"
              />
              <div>
                <div className="flex flex-row gap-2">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {user.username}
                  </h2>
                  <div className="flex flex-col justify-center">
                    {user.badges.map((badge, index) => {
                      return <UserBadge key={index} badge={badge} />;
                    })}
                  </div>
                </div>
                <p className="text-gray-700 mt-2">{user.bioSmall}</p>
              </div>
            </div>
          </div>
          {videos && <VideoList videos={videos} />}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const response = await axios.get('/backend/userdata', {
    params: { id: context.query['id'] },
  });
  const user: User = response.data;

  return {
    props: { user }, // will be passed to the page component as props
  };
};

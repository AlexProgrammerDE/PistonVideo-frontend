import { User, Video } from '../components/models/video';
import axios from 'axios';
import VideoList from '../components/video/list';
import { useEffect, useState } from 'react';
import UserBadge from '../components/UserBadge';
import { useRouter } from 'next/router';
import Layout from '../components/utils/Layout';

// noinspection JSUnusedGlobalSymbols
export default function UserPage() {
  const router = useRouter();
  const [videos, setVideos] = useState<Video[]>();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (!router.query['id'] || user) {
      return;
    }

    axios
      .get('/backend/userdata', {
        params: { id: router.query['id'] },
      })
      .then((response) => setUser(response.data));
  }, [user, router]);

  useEffect(() => {
    if (!user || videos) {
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
  }, [videos, user]);

  return (
    <Layout>
      <div className="flex flex-col m-5 mb-0 w-full">
        <div className="bg-blue-100 shadow-lg rounded-2xl">
          <div className="flex flex-row items-center mt-40 mb-10 mx-10 bg-gray-100 rounded-1xl shadow-lg w-42 h-40">
            {user && (
              <>
                <img
                  alt={'Avatar of ' + user.username}
                  src={user.avatarUrl}
                  className="w-40 h-40 mr-5 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l rounded-1xl text-center overflow-hidden"
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
              </>
            )}
          </div>
        </div>
        <div className="flex-grow">
          {videos && <VideoList videos={videos} noSideMargin noCenter />}
        </div>
      </div>
    </Layout>
  );
}

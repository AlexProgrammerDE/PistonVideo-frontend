import SideBarComponent from '../components/sidebar/component';
import VideoList from '../components/video/list';
import { edgeConfig } from '@ory/integrations/next';
import { Configuration, Session, V0alpha2Api } from '@ory/kratos-client';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

// Initialize the Ory Kratos SDK which will connect to the
// /api/.ory/ route we created in the previous step.
const kratos = new V0alpha2Api(new Configuration(edgeConfig));

// noinspection JSUnusedGlobalSymbols
export default function Home() {
  // Contains the current session or undefined.
  const [session, setSession] = useState<Session>();

  // The URL we can use to log out.
  const [logoutUrl, setLogoutUrl] = useState<string>();

  // The error message or undefined.
  const [error, setError] = useState<any>();

  useEffect(() => {
    // If the session or error have been loaded, do nothing.
    if (session || error) {
      return;
    }

    // Try to load the session.
    kratos
      .toSession()
      .then(({ data: session }) => {
        // Session loaded successfully! Let's set it.
        setSession(session);

        // Since we have a session, we can also get the logout URL.
        return kratos
          .createSelfServiceLogoutFlowUrlForBrowsers()
          .then(({ data }) => {
            setLogoutUrl(data.logout_url);
          });
      })
      .catch((err: AxiosError) => {
        // An error occurred while loading the session or fetching
        // the logout URL. Let's show that!
        setError({
          error: err.toString(),
          data: err.response?.data,
        });
      });
  }, [session, error]);

  return (
    <div className="flex flex-row min-h-screen bg-gray-50 text-gray-800">
      <SideBarComponent />
      <VideoList />
    </div>
  );
}

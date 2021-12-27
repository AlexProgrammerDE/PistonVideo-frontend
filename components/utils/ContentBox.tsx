import Layout from './Layout';

export default function ContentBox({ children }) {
  return (
    <Layout>
      <div className="m-7 shadow-xl w-full bg-gray-100 flex flex-col">
        {children}
      </div>
    </Layout>
  );
}

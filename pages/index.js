import { useUser } from '../lib/hooks';
import Layout from '../components/layout';
import CodeBoxes from '../components/codeBoxes';

const Home = () => {
  const user = useUser();

  return (
    <Layout>
      <CodeBoxes />
      <p>Online Authenticator App</p>
      <style jsx>{`
        li {
          margin-bottom: 0.5rem;
        }
        pre {
          white-space: pre-wrap;
          word-wrap: break-word;
        }
      `}</style>
      <style jsx global>{`
        .code-container {
          margin-top: 20px;
        }
      `}</style>
    </Layout>
  );
};

export default Home;

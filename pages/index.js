import { useUser } from "../lib/hooks";
import Layout from "../components/layout";
import CodeBoxes from "../components/codeBoxes";

const Home = () => {
  const user = useUser();

  return (
    <Layout>
      <CodeBoxes />
      <p>
        Apexio Auth is an online generator of one-time passwords, based on TOTP
        (RFC 6238) algorithm. A web-based version of the Google Authenticator
        mobile application.
      </p>

      {user && (
        <>
          <p>Currently logged in as:</p>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
      )}

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

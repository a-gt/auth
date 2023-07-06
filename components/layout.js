import Head from "next/head";
import Header from "./header";

const Layout = (props) => (
  <>
    <Head>
      <title>Auth</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Header />

    <main>
      <div className="container">{props.children}</div>
    </main>

    <style jsx global>{`
      *,
      *::before,
      *::after {
        box-sizing: border-box;
        font-family: "Roboto Condensed", sans-serif;
      }
      body {
        margin: 0;
        color: rgb(17, 17, 17);
        font-family: "Roboto Condensed", sans-serif;
      }
      .container {
        padding: 0.2rem 1.25rem;
      }
      footer {
        width: 100%;
        height: 100px;
        border-top: 1px solid rgb(204, 204, 204);
        background: rgb(241, 243, 245);
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .click {
        cursor: pointer;
      }
    `}</style>
  </>
);

export default Layout;

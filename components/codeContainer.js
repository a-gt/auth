export default function CodeContainer({ children }) {
  return (
    <>
      <div className="code-container">{children}</div>
      <style jsx>{`
        .code-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          padding: 10px;
          background-color: #f1f3f5;
          border: 1px solid #ccc;
          border-radius: 4px;
          position: relative;
          min-height: 124px;
        }
      `}</style>
    </>
  );
}

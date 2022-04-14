import Link from "next/link";
import { useUser } from "../lib/hooks";
import { useState, useEffect } from "react";

const time = 30;

const Header = () => {
  const user = useUser();

  function getCurrentSeconds() {
    return Math.round(new Date().getTime() / 1000.0);
  }

  function getPercentage() {
    return 100 - (time - (getCurrentSeconds() % time)) * (100 / time);
  }

  const [width, setWidth] = useState(getPercentage());

  useEffect(() => {
    const interval = setInterval(() => {
      if (width >= 100) {
        setWidth(0);
      } else {
        setWidth(getPercentage());
      }
    }, (time * 1000) / 200);
    return () => clearInterval(interval);
  }, [width, setWidth]);

  return (
    <header>
      <div className="timer">
        <div className="timer_line" style={{ width: width + "%" }}></div>
      </div>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link href="/profile">
                  <a>Profile</a>
                </Link>
              </li>
              <li>
                <Link href="/api/logout">
                  <div className="extend logout">Logout</div>
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link href="/login">
                <div className="extend">Login</div>
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <style jsx>{`
        .timer {
          display: block;
          background-color: #ddd;
        }
        .timer_line {
          display: block;
          background-color: #111;
          height: 5px;
          transition: width 0.25s linear;
        }
        nav {
          padding: 0.2rem 1.25rem;
        }
        ul {
          display: flex;
          list-style: none;
          margin-left: 0;
          padding-left: 0;
          align-items: center;
        }
        li {
          margin-right: 1rem;
        }
        li:first-child {
        }
        li:last-child {
          margin-left: auto;
        }
        a {
          color: rgb(17, 17, 17);
          text-decoration: none;
        }
        header {
          color: rgb(17, 17, 17);
          background-color: #fff;
          border-bottom: 1px solid #ccc;
        }
        .extend {
          display: block;
          cursor: pointer;
          flex: 1;
          border: 1px solid #ccc;
          background-color: #f1f3f5;
          border-radius: 3px;
          text-align: center;
          height: 30px;
          padding: 4px;
          min-width: 100px;
          transition: all 100ms ease-in-out;
        }
        .extend:hover {
          background-color: #e1e3e5;
        }
        .logout {
          background: #f44336;
          border-color: #f44336;
          color: white;
        }
        .logout:hover {
          background-color: #f44336;
        }
      `}</style>
    </header>
  );
};

export default Header;

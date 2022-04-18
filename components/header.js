import Link from "next/link";
import { useUser } from "../lib/hooks";
import { useState, useEffect } from "react";
import md5 from "md5";
import useSWR from "swr";
import { Button } from "@mantine/core";

const time = 30;

const fetcher = (...args) => fetch(...args).then((res) => res.json());
const Header = () => {
  const user = useUser();
  const t = Math.floor(Date.now() / (time * 1000));

  function getPercentage() {
    return (100 / (time * 1000)) * (Date.now() - time * 1000 * t);
  }

  const [width, setWidth] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (width >= 100) {
        setWidth(0);
      } else {
        setWidth(getPercentage());
      }
    }, 100);
    return () => clearInterval(interval);
  }, [width, setWidth]);

  const { data, error } = useSWR(
    user ? `https://en.gravatar.com/${md5(user.email)}.json` : null,
    fetcher
  );

  return (
    <header>
      <div className="timer">
        <div className="timer_line" style={{ width: width + "%" }}></div>
      </div>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>Auth</a>
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
                <img
                  src={`https://www.gravatar.com/avatar/${md5(
                    user.email
                  )}?s=40&d=identicon`}
                  alt=""
                  className="profile-img"
                />
                {data && data?.entry?.length > 0 ? (
                  <p className="username">{data.entry[0].displayName}</p>
                ) : (
                  <p className="username">{user.email}</p>
                )}
                <Link href="/api/logout">
                  <Button color="red">Logout</Button>
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link href="/login">
                <Button variant="default" color="gray">
                  Login
                </Button>
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
          display: flex;
          align-items: center;
          gap: 10px;
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
          padding: 3px;
          min-width: 100px;
          transition: all 100ms ease-in;
        }
        .extend:hover {
          background-color: #e1e3e5;
        }
        .logout {
          background: #f44336;
          border-color: #f44336;
          color: white;
          display: inline-block;
        }
        .logout:hover {
          background-color: #f44336;
        }
        .profile-img {
          display: inline;
          border-radius: 50%;
          width: 32px;
          height: 32px;
        }
        .username {
          margin: 0;
        }
      `}</style>
    </header>
  );
};

export default Header;

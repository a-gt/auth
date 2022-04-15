import * as OTPAuth from "otpauth";
import { useState, useEffect } from "react";
import { showNotification } from "@mantine/notifications";
import { copyToClipboard } from "../lib/clipboard";
import EditAppForm from "./editApp";
import { useModals } from "@mantine/modals";

function truncateTo(str, digits) {
  if (str.length <= digits) {
    return str;
  }

  return str.slice(-digits);
}

export default function TOTPCode({
  secret,
  name = "TOTP",
  issuer = "ACME",
  digits = 6,
  time = 30,
  color = "rgb(17, 17, 17)",
  showTime = false,
  onSubmit = () => {},
  onDelete = () => {},
}) {
  let totp = new OTPAuth.TOTP({
    issuer: issuer,
    label: name,
    algorithm: "SHA1",
    digits,
    period: time,
    secret: OTPAuth.Secret.fromBase32(secret),
  });

  function getToken() {
    return truncateTo(totp.generate(), digits);
  }

  const [code, setCode] = useState(getToken());

  useEffect(() => {
    const interval = setInterval(() => setCode(getToken()), 1000);
    return () => clearInterval(interval);
  }, [time, code, setCode]);
  const t = Math.floor(Date.now() / (time * 1000));

  function getPercentage() {
    return (100 / (time * 1000)) * (Date.now() - time * 1000 * t);
  }

  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (showTime) {
      const interval = setInterval(() => {
        if (width >= 100) {
          setWidth(0);
        } else {
          setWidth(getPercentage());
        }
      }, 100);
      return () => clearInterval(interval);
    }
    setWidth(100);
  }, [width, setWidth, showTime]);

  const modals = useModals();

  const openEditModal = () => {
    const id = modals.openModal({
      title: "Configure",
      centered: true,
      children: (
        <EditAppForm
          onSubmit={(c) => {
            modals.closeModal(id);
            onSubmit(c);
          }}
          onDelete={(c) => {
            onDelete(c);
          }}
          {...{ name, color, secret }}
        />
      ),
    });
  };

  return (
    <>
      <div className="totp">
        <span
          className="code click"
          onClick={() => {
            copyToClipboard(code);
            showNotification({
              title: `Code for ${name} is copied to clipboard`,
              styles: (theme) => ({
                root: {
                  backgroundColor: theme.colors.dark[7],
                  borderColor: theme.colors.dark[7],

                  "&::before": { backgroundColor: theme.colors.dark[3] },
                },

                title: { color: theme.white },
                description: { color: theme.white },
                closeButton: {
                  color: theme.colors.dark[3],
                  transition: "all 100ms ease-in-out",
                  "&:hover": { backgroundColor: "#000" },
                },
              }),
            });
          }}
        >
          {code}
        </span>
        <div className="name">{name}</div>
        <div className="timer">
          <div className="timer_line" style={{ height: width + "%" }}></div>
        </div>
        <div
          title="Configure or move"
          className="setup click"
          onClick={openEditModal}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 92.833 92.833"
            fill="currentColor"
          >
            <path d="M89.834,1.75H3c-1.654,0-3,1.346-3,3v13.334c0,1.654,1.346,3,3,3h86.833c1.653,0,3-1.346,3-3V4.75C92.834,3.096,91.488,1.75,89.834,1.75z" />
            <path d="M89.834,36.75H3c-1.654,0-3,1.346-3,3v13.334c0,1.654,1.346,3,3,3h86.833c1.653,0,3-1.346,3-3V39.75C92.834,38.096,91.488,36.75,89.834,36.75z" />
            <path d="M89.834,71.75H3c-1.654,0-3,1.346-3,3v13.334c0,1.654,1.346,3,3,3h86.833c1.653,0,3-1.346,3-3V74.75C92.834,73.095,91.488,71.75,89.834,71.75z" />
          </svg>
        </div>
      </div>

      <style jsx>{`
        .totp {
          display: block;
          padding: 15px 20px;
          background-color: #fff;
          border: 1px solid #ccc;
          border-radius: 3px;
          transition: all 0.1s linear;
          margin: 10px;
          position: relative;
        }
        .totp:hover {
          border-color: #111;
        }
        .code {
          font-size: 24px;
          line-height: 30px;
          font-weight: 700;
        }
        .name {
          font-size: 12px;
        }
        .timer {
          position: absolute;
          top: 10px;
          left: 0;
          bottom: 10px;
          width: 5px;
          border-radius: 0 2px 2px 0;
          display: block;
          background-color: #ddd;
          width: 5px;
        }
        .timer_line {
          display: block;
          background-color: ${color};
          width: 5px;
          transition: height 0.25s linear;
          border-radius: 0 2px 2px 0;
        }
        .setup {
          position: absolute;
          top: 20px;
          right: 20px;
          opacity: 0.1;
          transition: all 0.1s linear;
        }
        .setup svg {
          display: block;
          height: 16px;
          width: auto;
        }
        .setup:hover {
          opacity: 1;
        }
      `}</style>
    </>
  );
}

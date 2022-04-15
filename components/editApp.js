import { RgbColorPicker } from "react-colorful";
import { useState } from "react";
import { TextInput, Button, Popover } from "@mantine/core";

function rgbToObj(rgb) {
  let colors = ["r", "g", "b", "a"];

  let colorArr = rgb.slice(rgb.indexOf("(") + 1, rgb.indexOf(")")).split(",");

  let obj = new Object();

  colorArr.forEach((k, i) => {
    obj[colors[i]] = parseInt(k);
  });

  return obj;
}

export default function EditAppForm({
  onSubmit,
  onDelete,
  color: oldColor,
  secret: oldSecret,
  name: oldName,
}) {
  const [color, setColor] = useState(rgbToObj(oldColor));
  const [secret, setSecret] = useState(oldSecret);
  const [name, setName] = useState(oldName);
  const [opened, setOpened] = useState(false);

  function getTextColor() {
    const rgb = { ...color };
    const brightness = Math.round(
      (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000
    );
    return brightness > 125 ? "black" : "white";
  }

  return (
    <>
      <form
        className="tpad"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit({
            color: `rgb(${color.r},${color.g},${color.b})`,
            name,
            secret,
          });
        }}
      >
        <div>
          <TextInput
            placeholder="Application name"
            title="Application name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            size="xs"
          />
        </div>
        <div>
          <Popover
            opened={opened}
            onClose={() => setOpened(false)}
            target={
              <Button
                style={{
                  backgroundColor: `rgb(${color.r},${color.g},${color.b})`,
                  color: getTextColor(),
                }}
                onClick={() => setOpened((o) => !o)}
              >
                Change Color
              </Button>
            }
            position="right"
            transition="fade"
            spacing="xs"
            shadow="xl"
            styles={{
              body: { background: "#111", border: "1px solid #000" },
              arrow: { background: "#111", borderColor: "#000" },
            }}
            withArrow
          >
            <RgbColorPicker color={color} onChange={setColor} />
          </Popover>
        </div>
        <div>
          <div className="buttons">
            <Button type="submit" color="dark">
              Save
            </Button>
            <Button
              type="submit"
              color="red"
              onClick={(e) => {
                e.preventDefault();
                onDelete({
                  color: `rgb(${color.r},${color.g},${color.b})`,
                  name,
                  secret,
                });
              }}
            >
              Delete
            </Button>
          </div>
        </div>
        <div>
          <div className="buttons">
            <span className="show">Show Secret</span>
          </div>
        </div>
      </form>

      <style jsx>{`
        .tpad {
          margin-top: 20px;
        }
        form {
          display: flex;
          flex-direction: column;
          color: #111;
          gap: 20px;
        }
        .buttons {
          display: flex;
          gap: 10px;
        }
        .show {
          text-decoration: underline;
          cursor: pointer;
        }
        .show:hover {
          text-decoration: none;
        }
      `}</style>
    </>
  );
}

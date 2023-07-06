import { RgbColorPicker } from 'react-colorful';
import { useState } from 'react';
import { TextInput, Button, Popover } from '@mantine/core';

export default function NewAppForm({ onSubmit }) {
  const [color, setColor] = useState({ r: 17, g: 17, b: 17 });
  const [secret, setSecret] = useState('');
  const [name, setName] = useState('');
  const [opened, setOpened] = useState(false);

  function getTextColor() {
    const rgb = { ...color };
    const brightness = Math.round(
      (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000
    );
    return brightness > 125 ? 'black' : 'white';
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
          <TextInput
            placeholder="Secret key"
            title="Secret key"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
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
              body: { background: '#111', border: '1px solid #000' },
              arrow: { background: '#111', borderColor: '#000' },
            }}
            withArrow
          >
            <RgbColorPicker color={color} onChange={setColor} />
          </Popover>
        </div>
        <div>
          <div className="buttons">
            <Button type="submit" color="dark">
              Add
            </Button>
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
        .inputs {
          display: flex;
          gap: 10px;
        }
      `}</style>
    </>
  );
}

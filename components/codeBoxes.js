import TOTPCode from "./totpCode";
import CodeContainer from "./codeContainer";
import AddCode from "./addCode";
import { useState, useEffect } from "react";
import { showNotification } from "@mantine/notifications";
import { useModals } from "@mantine/modals";

export default function CodeBoxes() {
  const modals = useModals();
  const [data, setData] = useState({
    BSWY3DPEHPK3PXP: {
      secret: "BSWY3DPEHPK3PXP",
      name: "Test Code",
      color: "rgb(17,17,17)",
    },
  });

  useEffect(() => {
    setData(JSON.parse(window.localStorage.getItem("codes")));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("codes", JSON.stringify(data));
  }, [data]);

  function addCode(c) {
    const previous = data[c.secret];
    if (previous) {
      showNotification({
        title: `Existing application ${previous.name} has the same secret!`,
        styles: (theme) => ({
          root: {
            backgroundColor: theme.colors.red[7],
            borderColor: theme.colors.red[7],

            "&::before": { backgroundColor: theme.colors.red[3] },
          },

          title: { color: theme.white },
          description: { color: theme.white },
          closeButton: {
            color: theme.colors.red[3],
            transition: "all 100ms ease-in-out",
            "&:hover": { backgroundColor: theme.colors.red[1] },
          },
        }),
      });
      return;
    }
    setData({ ...data, [c.secret]: c });
    showNotification({
      title: `Application ${c.name} added!`,
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
  }
  return (
    <CodeContainer>
      {Object.values(data).map((s, i) => (
        <TOTPCode
          key={i}
          {...s}
          onSubmit={(c) => setData({ ...data, [c.secret]: c })}
          onDelete={(c) => {
            modals.openConfirmModal({
              title: `Are you sure you want to delete ${c.name}.`,
              centered: true,
              labels: {
                confirm: "Yes",
                cancel: "No",
              },
              confirmProps: { color: "red" },
              onCancel: () => {},
              onConfirm: () => {
                const { [c.secret]: deleted, ...obj } = data;
                setData(obj);
                modals.closeAll();
                showNotification({
                  title: `Application ${c.name} deleted!`,
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
              },
            });
          }}
        />
      ))}
      <AddCode key={Object.values(data).length + 1} onSubmit={addCode} />
    </CodeContainer>
  );
}

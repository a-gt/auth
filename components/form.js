import { TextInput, Button } from "@mantine/core";
import { At } from "tabler-icons-react";
import { useState } from "react";
import { useForm } from "@mantine/form";

const Form = ({ errorMessage, onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      email: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        onSubmit(values.email);
        setLoading(true);
      })}
    >
      <label>
        <span>Email</span>
        <TextInput
          icon={<At />}
          placeholder="Your email"
          required
          name="email"
          {...form.getInputProps("email")}
        />
      </label>

      <div className="submit">
        <Button color="dark" type="submit" loading={loading && !errorMessage}>
          Sign Up / Login
        </Button>
      </div>

      {errorMessage && <p className="error">{errorMessage}</p>}

      <style jsx>{`
        form,
        label {
          display: flex;
          flex-flow: column;
        }
        label > span {
          flex: 1;
          font-size: 17px;
          font-weight: 400;
          line-height: 20px;
          align-items: center;
          margin: 20px 0;
          margin-top: 5px;
        }
        input {
          display: block;
          width: 100%;
          border: 1px solid #ccc;
          background-color: #f1f3f5;
          border-radius: 3px;
          height: 30px;
          padding: 4px;
          outline: none;
          transition: all 200ms ease-in-out;
        }
        input:focus {
          border-color: #111;
        }
        .submit {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          justify-content: space-between;
          margin-top: 10px;
        }
        .submit > a {
          text-decoration: none;
        }
        .submit > button {
          display: inline-block;
          border: none;
          background-color: #111;
          color: #fff;
          padding: 10px 20px;
          text-align: left;
          border-radius: 3px;
          cursor: pointer;
        }
        .error {
          color: #f44336;
          margin: 0.5rem 0 0;
        }
      `}</style>
    </form>
  );
};

export default Form;

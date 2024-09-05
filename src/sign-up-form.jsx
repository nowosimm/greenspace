import {
  Input,
  PasswordInput,
  Modal,
  Stack,
  Button,
  Center,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

import icon from "./images/greenspaceIcon.jpeg";

export default function () {
  const [opened, { open, close }] = useDisclosure(false);
  const [visible, { toggle }] = useDisclosure(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitForm = async () => {
    let json = {
      username: username,
      password: password,
    };
    let response = await fetch("http://localhost:3000/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(json),
    });
    console.log(response);
    close();
  };

  const loginForm = async () => {
    let json = {
      username: username,
      password: password,
    };
    let response = await fetch("http://localhost:3000/log-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(json),
    });
    console.log(response);
  };

  return (
    <Center>
      <div className="flex">
        <div className="w-2/5">
          <img src={icon}></img>
        </div>
        <Center className="flex flex-col">
          <h1 className="font-semibold">Welcome Back</h1>
          <div className="px-4 font-body rounded-xl text-md mx-10">
            <form name="form2">
              <Input.Wrapper
                label="Username"
                description=""
                error=""
              >
                <Input
                  placeholder="Enter Username Here"
                  type="text"
                  radius="lg"
                  label="username"
                  htmlFor="username"
                  input="dook"
                  id="username"
                  name="username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Input.Wrapper>
              <PasswordInput
                className="py-2"
                radius="lg"
                label="Password"
                placeholder="Input placeholder"
                input="password"
                id="password"
                name="password"
                type="text"
                onChange={(e) => setPassword(e.target.value)}
              />

              <Center>
              <button type="button" onClick={loginForm} className="underline underline-offset-2	font-semibold">
                Sign In
              </button>
              </Center>
            </form>

            <form name="form3">
              <Modal
                opened={opened}
                onClose={close}
                size="sm"
                title="Create New Account"
                className="p-1 font-body"
              >
                <Input.Wrapper
                  className="py-5"
                  label="username"
                  description=""
                  error=""
                  id="username"
                  name="username"
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                >
                  <Input
                    placeholder="Enter Username Here"
                    variant="filled"
                    radius="lg"
                  />
                </Input.Wrapper>
                <Stack>
                  <PasswordInput
                    className="py-1"
                    label="password"
                    placeholder="Enter Password Here"
                    // defaultValue="secret"
                    input="password"
                    visible={visible}
                    onVisibilityChange={toggle}
                    variant="filled"
                    radius="lg"
                  />
                  <PasswordInput
                    className="py-1"
                    label="Confirm password"
                    placeholder="Confirm Password Here"
                    // defaultValue="secret"
                    input="password"
                    visible={visible}
                    onVisibilityChange={toggle}
                    variant="filled"
                    radius="lg"
                    id="password"
                    name="password"
                    type="text"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    variant="filled"
                    color="rgba(134, 153, 129, 1)"
                    radius="lg"
                    className="my-5"
                    onClick={submitForm}
                  >
                    Create Account
                  </Button>
                </Stack>
              </Modal>
            </form>
          </div>
          <div className="flex">
            <p>New User?</p>
            <div
              onClick={open}
              className="underline underline-offset-2	font-semibold	ml-2 hover: cursor-pointer"
            >
              Create Account
            </div>
          </div>
        </Center>
      </div>
    </Center>
  );
}

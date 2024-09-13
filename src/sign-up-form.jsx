import {
  Input,
  PasswordInput,
  Modal,
  Stack,
  Button,
  Center,
  Avatar,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";

import icon from "./images/greenspaceIcon.jpeg";

export default function () {
  const [opened, { open, close }] = useDisclosure(false);
  const [visible, { toggle }] = useDisclosure(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useOutletContext();
  const navigate = useNavigate();

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
    let data = await response.json();
    setUser(data);
    navigate("/");
    console.log(response);
  };

  let profileContent;
  if (user.username) {
    profileContent = (
      <div>
        <div className="flex align-middle mx-6">
          <Avatar color="cyan" radius="xl" size="lg">
            MK
          </Avatar>
          <p className="flex items-center	pl-4">{user.username}</p>
        </div>
        <div className="bg-slate-100 my-4 mx-16 max-w-3xl	">
          <p>Total Plants:</p>
          <p>Oldest Plant:</p>
          <p>Newest Plant:</p>
        </div>
      </div>
    );
  } else {
    profileContent = (
      <Center>
        <div className="flex">
          <div className="w-4/12 block ">
            <img src={icon}></img>
          </div>
          <Center className="flex flex-col">
            <h1 className="font-semibold pb-4">Welcome Back</h1>
            <div className="px-4 font-body rounded-xl text-md mx-10 flex">
              <form name="form2">
                <div className="p-2 flex">
                  <Input.Wrapper label="Username" description="" error="">
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
                      className="w-64	"
                    />
                  </Input.Wrapper>
                </div>

                <div className="p-2">
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
                </div>

                <Center>
                  <button
                    type="button"
                    onClick={loginForm}
                    className="underline underline-offset-2	font-semibold pb-6"
                  >
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

  return <div>{profileContent}</div>;
}

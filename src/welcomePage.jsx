import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import { PasswordInput } from "@mantine/core";
import { TextInput } from "@mantine/core";

export default function () {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div>
      <h1>Hi! Welcome to Greenspace</h1>
      <h2>
        We care about plants, and we think you do too. Thats why we make
        managing your plant babies easy!
      </h2>
      <div>
      <TextInput
                  radius="md"
                  label="Username"
                  placeholder="Input placeholder"
                />
                <PasswordInput
                  radius="md"
                  label="Password"
                  placeholder="Enter Password Here"
                />
        <>
          <Modal radius="md" opened={opened} onClose={close} title="Create an Account" centered>
            {
              <div>
                <TextInput
                  radius="md"
                  label="Username"
                  placeholder="Input placeholder"
                />
                <PasswordInput
                  radius="md"
                  label="Password"
                  placeholder="Enter Password Here"
                />
                <p>Already a member? Log-In</p>
              </div>

            }
          </Modal>
          <Button onClick={open}>Create an Account</Button>
        </>
      </div>
    </div>
  );
}

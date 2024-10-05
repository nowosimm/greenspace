
import { UnstyledButton, Group, Avatar, Text, rem, Center } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import classes from "../css/UserButton.module.css";
import { useState, useEffect } from "react";


export function UserButton({ user }) {
  let buttonContent;
  if(user.username) {
    buttonContent = <Group>
      <Avatar
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
        radius="xl"
      />

      <div style={{ flex: 1 }}>
        <Text size="sm" fw={500}>
        Welcome, {user.username}
        </Text>

        <Text c="dimmed" size="xs">
          View Profile
        </Text>
      </div>

      <IconChevronRight
        style={{ width: rem(14), height: rem(14) }}
        stroke={1.5}
      />
    </Group>;
  } else {
    buttonContent = <Group>
    <Avatar
      src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
      radius="xl"
    />

    <div style={{ flex: 1 }}>
      <Text size="sm" fw={500}>
        Login or Sign-Up

      </Text>

      <Text c="dimmed" size="xs">
        Create Account
      </Text>
    </div>

    <IconChevronRight
      style={{ width: rem(14), height: rem(14) }}
      stroke={1.5}
    />
  </Group>
  }
  return (
    <UnstyledButton className={classes.user}>
      {buttonContent}
    </UnstyledButton>
  );
}

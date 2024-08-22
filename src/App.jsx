import { useEffect, useState } from "react";
import "@mantine/core/styles.css";
import {
  UnstyledButton,
  Text,
  Group,
  ActionIcon,
  Tooltip,
  rem,
} from "@mantine/core";
import {
  IconPlus,
  IconHome,
  IconCalendarEvent,
  IconPhotoScan,
} from "@tabler/icons-react";
import { UserButton } from "./userButton.jsx";
import classes from "../css/NavbarSearch.module.css";

import { Link, Outlet } from "react-router-dom";

import { MantineProvider } from "@mantine/core";

const links = [
  { icon: IconHome, label: "Home", href: "/" },
  { icon: IconCalendarEvent, label: "Calender", href: "calendar" },
  { icon: IconPhotoScan, label: "Gallery", href: "gallery" },
];

export default function () {
  const [plants, setPlants] = useState([]);
  useEffect(() => {
    const callServer = async () => {
      let response = await (await fetch("http://localhost:3000/")).json();
      setPlants(response);
    };
    callServer();
  }, []);

  const mainLinks = links.map((link) => (
    <Link to={link.href} key={link.label}>
      <UnstyledButton className={classes.mainLink}>
        <div className={classes.mainLinkInner}>
          <link.icon size={20} className={classes.mainLinkIcon} stroke={1.5} />
          {link.label}
        </div>
      </UnstyledButton>
    </Link>
  ));

  const collectionLinks = plants.map((p) => (
    <Link to={`/plant/${p._id}`} key={p._id} className={classes.collectionLink}>
      <span style={{ marginRight: rem(9), fontSize: rem(20) }}></span> {p.type}
    </Link>
  ));

  return (
    <MantineProvider>
      <div className="flex flex-row font-body">
        <nav className={classes.navbar}>
            <div className={classes.section}>
              <Link to="/HomePage">
                <h1 className="font-decorative text-forest text-2xl tracking-wider p-4">
                  Greenspace
                </h1>
              </Link>
            </div>
            <div className={classes.section}>
              <div className={classes.mainLinks}>{mainLinks}</div>
            </div>

            <div className={classes.section}>
              <Group
                className={classes.collectionsHeader}
                justify="space-between"
              >
                <Text size="xs" fw={500} c="dimmed">
                  Your Plants
                </Text>

                <Link to="/AddPage">
                  <Tooltip label="Add New Plant" withArrow position="right">
                    <ActionIcon variant="default" size={18}>
                      <IconPlus
                        style={{ width: rem(12), height: rem(12) }}
                        stroke={1.5}
                      />
                    </ActionIcon>
                  </Tooltip>
                </Link>
              </Group>
              <div className={classes.collections}>{collectionLinks}</div>
            </div>
            <div className="">
            <Link to="/sign-up">
              <div className={classes.section}>
                <UserButton />
              </div>
            </Link>

            </div>

        </nav>

        <main className="lg:pl-72 flex-1">
          <div>
            <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6 m-9">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </MantineProvider>
  );
}

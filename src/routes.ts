import { createHashRouter } from "react-router";
import { Root } from "@/pages/Root";
import { HomePage } from "@/pages/HomePage";
import { ProjectPage } from "@/pages/ProjectPage";

export const router = createHashRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: "project/:name", Component: ProjectPage },
    ],
  },
]);

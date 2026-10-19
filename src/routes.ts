import { createHashRouter } from "react-router";
import { Layout } from "@/components/Layout";
import { HomePage } from "@/pages/HomePage";
import { WorkPage } from "@/pages/WorkPage";
import { FedLearnPage } from "@/pages/FedLearnPage";
import { TigerResearchBuddyPage } from "@/pages/TigerResearchBuddyPage";
import { FinancialServicesPage } from "@/pages/FinancialServicesPage";
import { ExperiencePage } from "@/pages/ExperiencePage";
import { AboutPage } from "@/pages/AboutPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ProjectStudyPage } from "@/pages/ProjectStudyPage";

// Hash routing is deliberate: it keeps deep links working on GitHub Pages
// without a 404.html redirect. See CLAUDE.md.
export const router = createHashRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "work", Component: WorkPage },
      { path: "work/fedlearn", Component: FedLearnPage },
      { path: "work/tigerresearchbuddy", Component: TigerResearchBuddyPage },
      { path: "work/financial-services", Component: FinancialServicesPage },
      { path: "work/:slug", Component: ProjectStudyPage },
      { path: "experience", Component: ExperiencePage },
      { path: "about", Component: AboutPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);

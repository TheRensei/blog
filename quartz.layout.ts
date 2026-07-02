import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { IconFolderOptions } from "./quartz/plugins/components/FileIcons";


const ICON_MAPPING: Record<string, string> = {
  Far: "font-awesome-regular",
  Ra: "rpg-awesome",
  Li: "lucide-icons",
  Co: "coolicons",
};

const iconsOptions: IconFolderOptions = {
  rootIconFolder: "quartz/static/icons",
  iconMapping: ICON_MAPPING,
  default: {
    file: "file_def",
  }
};

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      "Main": "https://therensei.art/",
      GitHub: "https://github.com/TheRensei/blog",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Row([
      Component.Darkmode(),
      Component.Search(),
    ]),
    Component.Explorer({
      folderClickBehavior: "collapse",
      iconSettings: iconsOptions
    }),
  ],
  right: [
    //Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
    Component.RecentNotes({
      title: "Recent Posts"
    }),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Row([
      Component.Darkmode(),
      Component.Search(),
    ]),
    Component.Explorer({
      folderClickBehavior: "collapse",
      iconSettings: iconsOptions
    }),
  ],
  right: [],
}

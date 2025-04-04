import { TreeItem } from "../components/TreeView";

export const treeData: TreeItem[] = [
  {
    label: "Fundamentals",
    children: [
      { label: "Key Concepts", id: "basics" },
    ],
  },
  {
    label: "Longsword",
    children: [
      {
        label: "German",
        children: [
          { label: "Lichtenauer", id: "lichtenauer" },
          { label: "Meyer", id: "meyer" },
        ],
      },
      {
        label: "Italian",
        children: [
          { label: "Fiore", id: "fiore" },
          { label: "Vadi", id: "vadi" },
        ],
      },
    ],
  },
  {
    label: "Saber/Broadsword",
    children: [
      {
        label: "British Military Saber + Broadsword",
        children: [
          { label: "1", id: "1" },
          { label: "2", id: "2" },
        ],
      },
      {
        label: "Early Saber Systems",
        children: [
          { label: "Polish", id: "polish" },
        ],
      },
    ],
  }
];

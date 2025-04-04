export interface Technique {
    id: number;
    name: string;
    master: string;
    type: string;
    info: string;
    source: string;
    animation: string;
  }

  export const techniquesBasic: Technique[] = [
    {
      id: 1,
      name: "Passing Step",
      master: "N/A",
      type: "Footwork",
      info: "A passing step. Starting with the right foot forward and the left food behind facing around 60 to 90 degrees away, take a step forward. Your feet should end up in the reverse situation, with the left foot forward and the right foot behind and angled.",
      source: "Fundamental Knowledge - Variations of this technique can be found within several sources.",
      animation:"/assets/Passing Step/scene.gltf",
    },
    {
        id: 2,
        name: "Gathering Step",
        master: "N/A",
        type: "Footwork",
        info: "A gathering step. Encroach a small amount on your opponent without changing stance or guard position. Good for closing small gaps to set up larger lunges.",
        source: "Fundamental Knowledge - Variations of this technique can be found within several sources.",
        animation:"/assets/Gathering Step/scene.gltf",
      },
];
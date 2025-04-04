export interface Technique {
  id: number;
  name: string;
  master: string;
  type: string;
  info: string;
  source: string;
  animation: string;
}

export const techniquesMeyer: Technique[] = [
  {
    id: 1,
    name: "Vom Tag",
    master: "Joachim Meyer",
    type: "Guard Position",
    info: "Meaning 'from the day.' An energy conserving guard that keeps the hands withdrawn and close to the chest, with the tip of the blade pointing upwards or over the right shoulder. For left handers, this is the left shoulder. Can also be held directly above the head. This guard facilitates easy decending cuts while also protecting the user's hands and forearms from being hit.",
    source: "MS Bibl. 2465, 1561",
    animation:"/assets/Oberhaw/NEWoberhaw.glb",
  },
  {
    id: 2,
    name: "Ox",
    master: "Joachim Meyer",
    type: "Guard Position",
    info: "A guard position held just in front and above the head that covers the top right and left quadrant of the fencer. The point should be towards your opponent, with your thumb against the blade over the crossguard perpindicular to the ground. Ideal for definding from decending cuts while maintaining a good position for counter attacks like a thrust or cut.",
    source: "MS Bibl. 2465, 1561",
    animation: "/assets/ox/ox.gltf",
  },
  {
    id: 3,
    name: "Pflug",
    master: "Joachim Meyer",
    type: "Guard Position",
    info: "Meaning 'plow' because of the way in which this position is held, like using a field plow. In this guard, the hilt is braced against the hip on either side with the point towards your opponent, covering the lower quadrants of the body from direct attack. Good for launching thrusts or thrust based techniques.",
    source: "source",
    animation: "MS Bibl. 2465, 1561",
  },
  {
    id: 4,
    name: "Alber",
    master: "Joachim Meyer",
    type: "Guard Position",
    info: "Alber, the fool's guard. Let the arms fall forward and point the tip towards the ground. It is left up to your interpritation whether you are a fool to use it, or a fool to attack into it. While this position does not cover the user directly, it opens up options for attacking in surprising ways like raising the point quickly.",
    source: "MS Bibl. 2465, 1561",
    animation: "",
  },
  {
    id: 5,
    name: "Oberhaw",
    master: "Joachim Meyer",
    type: "Cut",
    info: "A basic descending cut that is generally aimed at the opponents head or shoulder. Forms the basis of most offensive actions.",
    source: "MS Bibl. 2465, 1561",
    animation: "/assets/Oberhaw/NEWoberhaw.glb",
  },
  {
    id: 5,
    name: "Unterhaw",
    master: "Joachim Meyer",
    type: "Cut",
    info: "A basic ascending cut that is generally aimed at the opponents armpit or chest region. Inferior range and power to the Oberhaw, but still useful for a skilled fencer.",
    source: "MS Bibl. 2465, 1561",
    animation: "",
  },

];

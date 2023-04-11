import boat from "./boat.jpg";
import cat from "./cat.jpg";
import desk from "./desk.jpg";
import flower from "./flower.jpg";
import girl from "./girl.jpg";
import hand from "./hand.jpg";
import leaf from "./leaf.jpg";
import rave from "./skull.jpg";
import skull from "./skull.jpg";

const photos = [boat, desk, rave, skull, cat, leaf, hand, girl, flower];

const stockPhoto = () => {
  const randomIndex = Math.floor(Math.random() * photos.length);
  return photos[randomIndex];
};

export default stockPhoto;

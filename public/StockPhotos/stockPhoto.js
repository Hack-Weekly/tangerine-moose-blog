import boat from "./boat.jpg";
import cat from "./cat.jpg";
import desk from "./desk.jpg";
import leaf from "./leaf.jpg";
import rave from "./skull.jpg";
import skull from "./skull.jpg";

const photos = [boat, desk, rave, skull, cat, leaf];

const stockPhoto = () => {
  const randomIndex = Math.floor(Math.random() * photos.length);
  return photos[randomIndex];
};

export default stockPhoto;

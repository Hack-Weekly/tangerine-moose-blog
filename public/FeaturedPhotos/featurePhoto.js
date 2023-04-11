import balloon from "./balloons.jpg";
import landscape from "./landscape.jpg";
import mountain from "./mountain.jpg";
import woods from "./woods.jpg";

const photos = [balloon, landscape, mountain, woods];

const featurePhoto = () => {
  const randomIndex = Math.floor(Math.random() * photos.length);
  return photos[randomIndex];
};

export default featurePhoto;

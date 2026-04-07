import { Dimensions } from "react-native";

export const createFakeImage = (w: number, h: number) =>
  `https://placehold.co/${w}x${h}.webp`;

export const getDevice = () => {
  const { width } = Dimensions.get("window");

  const devices = {
    tablet: false,
    mobile: false,
  };

  if (width >= 768) devices.tablet = true;
  if (width >= 576) devices.mobile = true;

  return devices;
};

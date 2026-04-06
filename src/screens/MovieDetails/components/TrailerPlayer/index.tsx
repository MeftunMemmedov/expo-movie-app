import { secondary_black } from "@/constants/colors";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

const TrailerPlayer = ({
  url,
  isTrailerPlayerActive,
}: {
  url: string | URL;
  isTrailerPlayerActive: boolean;
}) => {
  const videoID = url ? new URL(url)?.searchParams.get("v") : null;
  if (!videoID) return null;
  return (
    <View
      style={[
        styles.videoPlayerContainer,
        {
          height: isTrailerPlayerActive ? "auto" : 0,
          marginTop: isTrailerPlayerActive ? 30 : 0,
        },
      ]}
    >
      <YoutubePlayer videoId={videoID} height={"100%"} />
    </View>
  );
};

export default TrailerPlayer;

const styles = StyleSheet.create({
  videoPlayerContainer: {
    width: "100%",
    aspectRatio: "16/9",
    backgroundColor: secondary_black,
    borderRadius: 5,
  },
});

import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import React from "react";
import { Cast, Movie } from "@/types";

const CastSlider = ({ cast }: { cast: Cast[] }) => {
  return (
    <View style={{ marginVertical: 30 }}>
      <Text style={styles.sliderTitle}>Cast</Text>
      <FlatList
        data={cast}
        renderItem={(artist) => (
          <View style={styles.slide}>
            <Image
              source={{ uri: artist.item.actor.image }}
              style={styles.slideImage}
            />
            <Text style={styles.slideArtistName}>
              {artist.item.actor.fullName}
            </Text>
          </View>
        )}
        keyExtractor={(cast, index) =>
          `actor-cast-slide-${Math.random()}-${index}-${cast.actor.id}`
        }
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default CastSlider;

export const styles = StyleSheet.create({
  sliderTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 15,
  },
  slide: {
    width: 80,
    marginRight: 15,
    borderRadius: 10,
    overflow: "hidden",
  },
  slideImage: {
    borderRadius: 10,
    aspectRatio: "1/1",
  },
  slideArtistName: {
    color: "white",
    fontSize: 10,
    textAlign: "center",
  },
});

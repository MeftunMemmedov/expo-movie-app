import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import React from "react";
import { Cast, Movie } from "@/types";
import { createFakeImage } from "@/helpers/common";

const CastSlider = ({ cast }: { cast: Cast[] }) => {
  if (!cast || cast.length == 0) return null;
  return (
    <View style={{ marginVertical: 30 }}>
      <Text style={styles.sliderTitle}>Cast</Text>
      <FlatList
        data={cast}
        renderItem={(artist) => (
          <View style={styles.slide}>
            <Image
              source={{
                uri: artist.item.actor.image || createFakeImage(100, 100),
              }}
              style={styles.slideImage}
            />
            <Text style={styles.slideArtistName}>
              {artist.item.actor.fullName ||""}
            </Text>
            <Text style={styles.slideCharacterName}>
              {artist.item.character}
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
    marginTop: 2,
  },
  slideCharacterName: {
    color: "gray",
    fontSize: 8,
    textAlign: "center",
  },
});

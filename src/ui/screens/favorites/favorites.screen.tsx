import React, { useEffect, useState } from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import ProductCard from "../../atoms/productCard/productCard.atom";
import { storage, FAVORITES_KEY } from "../../../core/mmkv";
import { styles } from "./favorites.styles";
import { useFocusEffect } from "@react-navigation/native";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const FavoritesScreen = ({ navigation }: { navigation: any }) => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      const loadFavorites = () => {
        const storedFavorites = JSON.parse(storage.getString(FAVORITES_KEY) || "[]");
        setFavorites(storedFavorites);
      };

      loadFavorites();
    }, [])
  );

  const removeFavorite = (productId: number) => {
    const updatedFavorites = favorites.filter((item) => item.id !== productId);
    storage.set(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  if (favorites.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>You still don't have any favorite items.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Detail", { productId: item.id })}
          >
            <ProductCard
              product={item}
              addToFavorites={() => {}}
              removeFromFavorites={() => removeFavorite(item.id)}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default FavoritesScreen;

import React, { useEffect, useState } from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import ProductCard from "../../atoms/productCard/productCard.atom";
import { storage, FAVORITES_KEY } from "../../../core/mmkv";
import { styles } from "./favorites.styles";


interface Product {
  id: number;
  title: string;
  image: string;
  description: string;
  rating: {
    rate: number;
    count: number;
  };
}

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  useEffect(() => {
    const loadFavorites = () => {
      const storedFavorites = JSON.parse(storage.getString(FAVORITES_KEY) || "[]");
      setFavorites(storedFavorites);
    };

    loadFavorites();
  }, []);

  const addFavorite = (product: Product) => {
    const storedFavorites = JSON.parse(storage.getString(FAVORITES_KEY) || "[]");
    const isAlreadyFavorite = storedFavorites.some((item: Product) => item.id === product.id);

    if (!isAlreadyFavorite) {
      const updatedFavorites = [...storedFavorites, product];
      storage.set(FAVORITES_KEY, JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
    }
  };

  const removeFavorite = (productId: number) => {
    const updatedFavorites = favorites.filter((item) => item.id !== productId);
    storage.set(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  if (favorites.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>You still dont have any fav item</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.favoriteItem}>
            <ProductCard
              product={item}
              addToFavorites={() => addFavorite(item)}  
              removeFromFavorites={() => removeFavorite(item.id)}  
            />
            <TouchableOpacity onPress={() => removeFavorite(item.id)} style={styles.removeButton}>
              <Text style={styles.removeButtonText}>Rimuovi</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default FavoritesScreen;

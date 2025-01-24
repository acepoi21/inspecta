import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import ProductCard from "../../atoms/productCard/productCard.atom";
import { styles } from "./home.styles";
import { storage, FAVORITES_KEY } from "../../../core/mmkv";

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

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
    };

    const loadFavorites = () => {
      const storedFavorites = JSON.parse(storage.getString(FAVORITES_KEY) || "[]");
      setFavorites(storedFavorites);
    };

    fetchProducts();
    loadFavorites();
  }, []);

  const addFavorite = (product: Product) => {
    const isAlreadyFavorite = favorites.some((item) => item.id === product.id);
    if (!isAlreadyFavorite) {
      const updatedFavorites = [...favorites, product];
      storage.set(FAVORITES_KEY, JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
    }
  };

  const removeFavorite = (productId: number) => {
    const updatedFavorites = favorites.filter((item) => item.id !== productId);
    storage.set(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Detail", { productId: item.id })}
          >
            <ProductCard
              product={item}
              addToFavorites={addFavorite}
              removeFromFavorites={removeFavorite}
            />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

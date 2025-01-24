import React, { useState, useEffect} from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "./productCard.styles";
import { FontAwesome } from "@expo/vector-icons";
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

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({product, addToFavorites, removeFromFavorites}: { product: any, addToFavorites: Function, removeFromFavorites: Function }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(storage.getString(FAVORITES_KEY) || "[]");
    const isAlreadyFavorite = favorites.some((item: any) => item.id === product.id);
    setIsFavorite(isAlreadyFavorite);
  }, [product.id]);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFromFavorites();
    } else {
      addToFavorites(product);
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.title}>{product.title}</Text>
      <View style={styles.ratingContainer}>
        <FontAwesome name="star" size={16} color="gold" />
        <Text style={styles.ratingText}>
          {product.rating.rate.toFixed(1)} ({product.rating.count} reviews)
        </Text>
      </View>

      <Image source={{ uri: product.image }} style={styles.image} />

      <Text style={styles.description}>{product.description}</Text>
      <TouchableOpacity onPress={handleFavoriteToggle} style={styles.favoriteButton}>
        <Text style={{ color: isFavorite ? "blue" : "gray", fontSize: 24 }}>♥</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductCard;

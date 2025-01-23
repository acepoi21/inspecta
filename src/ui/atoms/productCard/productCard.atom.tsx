import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { styles } from "./productCard.styles";
import { FontAwesome } from "@expo/vector-icons"; // Per le stelle

// Tipo per il prodotto
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

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <View style={styles.cardContainer}>
      {/* Titolo del prodotto */}
      <Text style={styles.title}>{product.title}</Text>

      {/* Rating e numero di recensioni */}
      <View style={styles.ratingContainer}>
        {/* Stelle */}
        <FontAwesome name="star" size={16} color="gold" />
        <Text style={styles.ratingText}>
          {product.rating.rate.toFixed(1)} ({product.rating.count} reviews)
        </Text>
      </View>

      {/* Immagine del prodotto */}
      <Image source={{ uri: product.image }} style={styles.image} />

      {/* Descrizione */}
      <Text style={styles.description}>{product.description}</Text>
    </View>
  );
};

export default ProductCard;

import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { styles } from "./detail.styles";
import Button from '../../atoms/button/button.atom';

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

const DetailScreen = ({ route, navigation }: { route: any; navigation: any }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
      const data = await response.json();
      setProduct(data);
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.category}>Category: {product.category}</Text>
      <Text style={styles.price}>Price: ${product.price.toFixed(2)}</Text>
      <Text style={styles.rating}>
        Rating: {product.rating.rate.toFixed(1)} ({product.rating.count} reviews)
      </Text>
      <Text style={styles.description}>{product.description}</Text>
      <Button title={'Go back'} onPress={navigation.goBack} />
    </ScrollView>
  );
};

export default DetailScreen;

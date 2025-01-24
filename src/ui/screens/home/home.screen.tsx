import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import ProductCard from "../../atoms/productCard/productCard.atom";
import { styles } from "./home.styles";

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

  useEffect(() => {

    const fetchProducts = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Detail", { productId: item.id })}
          >
            <ProductCard product={item} />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

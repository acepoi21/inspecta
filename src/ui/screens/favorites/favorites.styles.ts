import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    color: "#777",
  },
  favoriteItem: {
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  removeButton: {
    marginTop: 8,
    alignSelf: "flex-end",
    backgroundColor: "#ff6b6b",
    padding: 8,
    borderRadius: 4,
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

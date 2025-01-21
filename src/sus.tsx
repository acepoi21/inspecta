
const Stack = createNativeStackNavigator<DetailParamList>();
const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Screen.TabNavigator} component={TabNavigator} />
    </Stack.Navigator>
  );
}

export default RootStack;

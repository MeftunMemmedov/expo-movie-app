import { NavigationContainer } from "@react-navigation/native";
import BottomTabsNavigator from "./Tabs";

const AppRouter = () => {
  return (
    <NavigationContainer>
      <BottomTabsNavigator />
    </NavigationContainer>
  );
};

export default AppRouter;

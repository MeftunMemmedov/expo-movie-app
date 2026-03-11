import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Account,
  MovieDetails,
} from "../../../screens";
import { AccountStackParams, MovieStackParams } from "@/types";

const Stack = createNativeStackNavigator<AccountStackParams>();

const AccountStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Account"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Account" component={Account} />

      <Stack.Screen name="MovieDetails" component={MovieDetails} />
    </Stack.Navigator>
  );
};

export default AccountStack;

import { Provider } from "react-redux";
import AppRouter from "./src/router";
import { store } from "@/store";
import ToastManager from "toastify-react-native";

const App = () => {
  return (
    <Provider store={store}>
      <AppRouter />
      <ToastManager />
    </Provider>
  );
};

export default App;

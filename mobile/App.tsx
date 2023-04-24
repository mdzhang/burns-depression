import { WebView } from "react-native-webview";
import Constants from "expo-constants";

const BASE_URL = process.env.BASE_URL;

const uri = `https://${BASE_URL}`;

export default function App() {
  return (
    <WebView
      source={{ uri }}
      style={{ marginTop: 48 }}
    />
  );
}

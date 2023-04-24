import { WebView } from "react-native-webview";
import Constants from "expo-constants";
import { REACT_APP_BASE_URL } from "@env"

const uri = `https://${REACT_APP_BASE_URL }`;
console.log(`URI is ${uri}`);

export default function App() {
  return (
    <WebView
      source={{ uri }}
      style={{ marginTop: 48 }}
    />
  );
}

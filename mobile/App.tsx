import { WebView } from "react-native-webview";
import Constants from "expo-constants";

const uri = 'https://se-likes-folders-resort.trycloudflare.com';
console.log(`URI is ${uri}`);

export default function App() {
  return (
    <WebView
      source={{ uri }}
    />
  );
}

import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import { REACT_APP_BASE_URL } from '@env'

const uri = `https://${REACT_APP_BASE_URL }`;
console.log(`URI is ${uri}`);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <WebView source={{ uri }} />
    </SafeAreaView>
  );
}

import { ThemeProvider } from "styled-components";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { theme } from "@src/presentation/styles/theme";
import { Root } from "@src/presentation/views/Root/Root";

const firebaseConfig = {
  apiKey: "AIzaSyBuHfmEg5j-eTEEM3sgHTDFMmBxAhJecu8",
  authDomain: "campodecultura.firebaseapp.com",
  projectId: "campodecultura",
  storageBucket: "campodecultura.firebasestorage.app",
  messagingSenderId: "918769580804",
  appId: "1:918769580804:web:31b83198d50168144e2e51",
  measurementId: "G-0BV6F3ESE0"
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Root />
    </ThemeProvider>
  );
}

export default App;

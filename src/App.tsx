import { useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { theme } from "@src/presentation/styles/theme";
import { Root } from "@src/presentation/views/Root/Root";
import { useAuthStore } from "@src/presentation/store/authStore";

const firebaseConfig = {
  apiKey: "AIzaSyBuHfmEg5j-eTEEM3sgHTDFMmBxAhJecu8",
  authDomain: "campodecultura.firebaseapp.com",
  projectId: "campodecultura",
  storageBucket: "campodecultura.firebasestorage.app",
  messagingSenderId: "918769580804",
  appId: "1:918769580804:web:31b83198d50168144e2e51",
  measurementId: "G-0BV6F3ESE0",
};

const CustomToastContainer = styled(ToastContainer)`
  .Toastify__toast--success {
    background-color: #b6e1b7;
    color: black;
  }
  .Toastify__toast--error {
    background-color: #c7a19e; /* Red for error */
    color: black;
  }
`;

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    const cancelObserver = initializeAuth();
    return () => {
      cancelObserver();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Root analytics={analytics}/>
      <CustomToastContainer position="bottom-center" hideProgressBar={true} />
    </ThemeProvider>
  );
}

export default App;

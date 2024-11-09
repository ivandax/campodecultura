import { ThemeProvider } from "styled-components";

import { theme } from "@src/presentation/styles/theme";
import { Root } from "@src/presentation/views/Root/Root";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Root />
    </ThemeProvider>
  );
}

export default App;

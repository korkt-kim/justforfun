import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FOOTER_HEIGHT, Footer } from "./components/Footer";
import Router from "./utils/routes";

const queryClient = new QueryClient();

function App() {
  return (
    <div css={{ height: "100%" }}>
      <QueryClientProvider client={queryClient}>
        <div
          css={{ height: `calc(100% - ${FOOTER_HEIGHT}px)`, overflow: "auto" }}
        >
          <Router />
        </div>
      </QueryClientProvider>
      <Footer />
    </div>
  );
}

export default App;

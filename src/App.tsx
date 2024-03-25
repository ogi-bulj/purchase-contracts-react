import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { Home, SingleContract, NewContract } from "./pages";
import { Footer, Header } from "./components";
import { useState } from "react";
import SearchContext, { SearchContextValue } from "./contexts/SearchContext";
import { ContractsProvider } from "./contexts/ContractsContext";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const contextValue: SearchContextValue = {
    searchQuery,
    setSearchQuery,
  };
  return (
    <Router>
      <ContractsProvider>
        <SearchContext.Provider value={contextValue}>
          <Header />
          <Routes>
            <Route path="/purchase-contracts-react/" element={<Home />} />
            <Route
              path="/purchase-contracts-react/contract/:id"
              element={<SingleContract />}
            />
            <Route
              path="/purchase-contracts-react/new-contract"
              element={<NewContract />}
            />
          </Routes>
          <Footer />
        </SearchContext.Provider>
      </ContractsProvider>
    </Router>
  );
}

export default App;

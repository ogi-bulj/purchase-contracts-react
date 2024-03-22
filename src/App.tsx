import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { Home, Contract, NewContract } from "./pages";
import { Footer, Header } from "./components";
import { useState } from "react";
import SearchContext, { SearchContextValue } from "./contexts/SearchContext";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const contextValue: SearchContextValue = {
    searchQuery,
    setSearchQuery,
  };
  return (
    <Router>
      <SearchContext.Provider value={contextValue}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contract" element={<Contract />} />
          <Route path="/new-contract" element={<NewContract />} />
        </Routes>
        <Footer />
      </SearchContext.Provider>
    </Router>
  );
}

export default App;

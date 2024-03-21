import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { Home, Contract, NewContract } from "./pages";
import { Footer, Header } from "./components";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contract" element={<Contract />} />
        <Route path="/new-contract" element={<NewContract />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

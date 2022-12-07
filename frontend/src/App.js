import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./Styles/App.css";
import Home from "./Components/Home";
import Details from "./Components/Details";
import Filter from "./Components/Filter";
import Layout from "./Components/Layout/Layout";
import Success from "./Components/Success";
import Cancel from "./Components/Cancel";
import NotFound from "./Components/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/restaurant/:restaurant_id" element={<Details />} />
          <Route path="/filter" element={<Filter />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

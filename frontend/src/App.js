import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@/App.css";
import { I18nProvider } from "@/i18n/context";
import Layout from "@/components/layout/Layout";

// Imports directs sans doublons
import Home from "@/pages/Home";
import About from "@/pages/About";
import Founder from "@/pages/Founder";
import SolutionsHub from "@/pages/SolutionsHub";
import ModulePage from "@/pages/ModulePage";
import Roadmap from "@/pages/Roadmap";
import IndustriesHub from "@/pages/IndustriesHub";
import IndustryPage from "@/pages/IndustryPage";
import Investors from "@/pages/Investors";
import Technology from "@/pages/Technology";
import Insights from "@/pages/Insights";
import Article from "@/pages/Article";
import Contact from "@/pages/Contact";
import Legal from "@/pages/Legal";
import SearchPage from "@/pages/Search";
import NotFound from "@/pages/NotFound";

function RouteTree() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="founder" element={<Founder />} />
        <Route path="solutions" element={<SolutionsHub />} />
        <Route path="solutions/roadmap" element={<Roadmap />} />
        <Route path="solutions/:slug" element={<ModulePage />} />
        <Route path="industries" element={<IndustriesHub />} />
        <Route path="industries/:slug" element={<IndustryPage />} />
        <Route path="investors" element={<Investors />} />
        <Route path="technology" element={<Technology />} />
        <Route path="insights" element={<Insights />} />
        <Route path="insights/:slug" element={<Article />} />
        <Route path="contact" element={<Contact />} />
        <Route path="legal/:doc" element={<Legal />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/fr/*" element={<RouteTree />} />
          <Route path="/*" element={<RouteTree />} />
        </Routes>
      </BrowserRouter>
    </I18nProvider>
  );
}
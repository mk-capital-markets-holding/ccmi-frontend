import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "@/App.css";
import { I18nProvider } from "@/i18n/context";
import Layout from "@/components/layout/Layout";

const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Founder = lazy(() => import("@/pages/Founder"));
const SolutionsHub = lazy(() => import("@/pages/SolutionsHub"));
const ModulePage = lazy(() => import("@/pages/ModulePage"));
const Roadmap = lazy(() => import("@/pages/Roadmap"));
const IndustriesHub = lazy(() => import("@/pages/IndustriesHub"));
const IndustryPage = lazy(() => import("@/pages/IndustryPage"));
const Investors = lazy(() => import("@/pages/Investors"));
const Technology = lazy(() => import("@/pages/Technology"));
const Insights = lazy(() => import("@/pages/Insights"));
const Article = lazy(() => import("@/pages/Article"));
const Contact = lazy(() => import("@/pages/Contact"));
const Legal = lazy(() => import("@/pages/Legal"));
const SearchPage = lazy(() => import("@/pages/Search"));
const NotFound = lazy(() => import("@/pages/NotFound"));

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

function Loader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="overline text-mk-bronze">Loading…</div>
    </div>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/fr/*" element={<RouteTree />} />
            <Route path="/*" element={<RouteTree />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </I18nProvider>
  );
}

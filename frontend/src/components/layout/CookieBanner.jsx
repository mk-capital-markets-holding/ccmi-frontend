import React, { useEffect, useState } from "react";
import { useI18n } from "@/i18n/context";

export default function CookieBanner() {
  const { t } = useI18n();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("mk-cookie-consent");
    if (!consent) setTimeout(() => setVisible(true), 900);
  }, []);

  const setChoice = (choice) => {
    localStorage.setItem("mk-cookie-consent", choice);
    setVisible(false);
  };

  if (!visible) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 bg-mk-ink text-white border-t border-mk-bronze/40 mk-grain" data-testid="cookie-banner">
      <div className="container-mk py-6 flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6">
        <div className="flex-1">
          <div className="font-serif text-lg">{t("cookie.title")}</div>
          <div className="text-sm text-white/70 mt-1 max-w-3xl">{t("cookie.body")}</div>
        </div>
        <div className="flex gap-3 flex-wrap">
          <button onClick={() => setChoice("essential")} data-testid="btn-cookie-reject" className="border border-white/30 text-white text-sm px-4 py-2.5 hover:bg-white hover:text-mk-ink transition-colors">
            {t("cookie.reject")}
          </button>
          <button onClick={() => setChoice("all")} data-testid="btn-cookie-accept" className="bg-mk-bronze text-mk-ink text-sm px-5 py-2.5 hover:bg-mk-bronze2 transition-colors">
            {t("cookie.accept")}
          </button>
        </div>
      </div>
    </div>
  );
}

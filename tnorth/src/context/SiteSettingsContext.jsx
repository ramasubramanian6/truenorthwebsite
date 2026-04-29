import React, { createContext, useContext, useState, useCallback } from 'react';

const SiteSettingsContext = createContext(null);

const STORAGE_KEY = 'tn_site_settings';

const defaultSettings = {
  testimonialsVisible: true,
};

function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...defaultSettings, ...JSON.parse(raw) };
  } catch (_) { /* ignore */ }
  return defaultSettings;
}

export const SiteSettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(loadSettings);

  const updateSetting = useCallback((key, value) => {
    setSettings(prev => {
      const next = { ...prev, [key]: value };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (_) {}
      return next;
    });
  }, []);

  return (
    <SiteSettingsContext.Provider value={{ settings, updateSetting }}>
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => {
  const ctx = useContext(SiteSettingsContext);
  if (!ctx) throw new Error('useSiteSettings must be used within SiteSettingsProvider');
  return ctx;
};

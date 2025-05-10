
(function(doc, win) {

  class ThemeUtilities {
    static THEME_STORAGE_KEY = "theme-preference";
    static THEME_ATTR = "data-theme";

    static getCurrentPageTheme() {
      return doc.firstElementChild.getAttribute(ThemeUtilities.THEME_ATTR);
    }

    static getSystemThemePreferenceMedia() {
      return win.matchMedia("(prefers-color-scheme: dark)");
    }

    static getThemeToggles() {
      return doc.querySelectorAll(".toggle.theme[type=\"button\"][role=\"switch\"]");
    }

    static syncThemeToggles(preferredTheme) {
      ThemeUtilities.getThemeToggles().forEach((toggle) => {
        // ensure all theme toggles are in sync in the system's preferred theme
        toggle.setAttribute("aria-checked", preferredTheme === "dark");
      });
    }

    static getThemePreference() {
      if (localStorage.getItem(ThemeUtilities.THEME_STORAGE_KEY)) {
        return localStorage.getItem(ThemeUtilities.THEME_STORAGE_KEY);
      }

      return getSystemThemePreferenceMedia().matches
        ? "dark"
        : "light";
    }

    static setThemePreference(theme) {
      // HTML tag
      doc.firstElementChild.setAttribute("data-theme", theme);

      localStorage.setItem(ThemeUtilities.THEME_STORAGE_KEY, theme);
    }
  } 

  const initializeTheme = () => {
    const themeToggles = ThemeUtilities.getThemeToggles();
    
    const preferredTheme = ThemeUtilities.getThemePreference();
    ThemeUtilities.setThemePreference(preferredTheme);
    themeToggles.forEach((toggle) => {
      // ensure all theme toggles are in sync in the system's preferred theme
      toggle.setAttribute("aria-checked", preferredTheme === "dark");

      toggle.addEventListener("click", () => {
        const nextTheme = ThemeUtilities.getCurrentPageTheme() === "dark"
        ? "light" 
        : "dark";
        ThemeUtilities.setThemePreference(nextTheme);
        toggle.ariaChecked = nextTheme === "dark";
      });
    });
  }

    // always sync with system's preferred theme
  const themePreferenceMediaQuery = ThemeUtilities.getSystemThemePreferenceMedia();
  themePreferenceMediaQuery.addEventListener("change", ({ matches: isDark }) => {
    const preferredTheme = isDark ? "dark" : "light"
    ThemeUtilities.syncThemeToggles(preferredTheme);
    ThemeUtilities.setThemePreference(preferredTheme);
  });

  doc.addEventListener("DOMContentLoaded", initializeTheme);

})(document, window);
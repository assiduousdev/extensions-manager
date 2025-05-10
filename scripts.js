
(function(doc, win) {
  const initializeTheme = () => {
    const THEME_STORAGE_KEY = "theme-preference";
    const THEME_ATTR = "data-theme";

  
    const themePreferenceMediaQuery = win.matchMedia("(prefers-color-scheme: dark)");
    const preferredTheme = getThemePreference();

    const themeToggles = doc.querySelectorAll(".toggle.theme[type=\"button\"][role=\"switch\"]");
    themeToggles.forEach((toggle) => {
      
      // ensure all theme toggles are in sync in the system's preferred theme
      toggle.setAttribute("aria-checked", preferredTheme === "dark");

      // update the whole sites theme
      setThemePreference(preferredTheme);

      toggle.addEventListener("click", () => {
        const nextTheme = doc.firstElementChild.getAttribute(THEME_ATTR) === "dark"
        ? "light" 
        : "dark";
        setThemePreference(nextTheme);
        toggle.ariaChecked = nextTheme === "dark";
      });
    });

    // always sync with system's preferred theme
    themePreferenceMediaQuery.addEventListener("change", ({ matches: isDark }) => {
      setThemePreference(isDark ? "dark" : "light");
    });

    function getThemePreference() {
      if (localStorage.getItem(THEME_STORAGE_KEY)) {
        return localStorage.getItem(THEME_STORAGE_KEY);
      }

      return themePreferenceMediaQuery.matches
        ? "dark"
        : "light";
    }

    function setThemePreference(theme) {
      // HTML tag
      doc.firstElementChild.setAttribute("data-theme", theme);

      localStorage.setItem(THEME_STORAGE_KEY, theme);
    }
  }

  doc.addEventListener("DOMContentLoaded", initializeTheme);

})(document, window);
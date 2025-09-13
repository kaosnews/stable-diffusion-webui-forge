// javascript/unload_guard.js
(function () {
  function getOpt(name, fallback) {
    try {
      if (window.opts && name in window.opts) return window.opts[name];
    } catch (e) {}
    return fallback;
  }

  function isAppBusy() {
    // Heuristics for Forge/A1111 being in the middle of work.
    // We check a few known globals; if none exist, fall back to conservative false.
    try {
      // A1111/Forge often toggles these during generation; keep it permissive.
      if (window.uiCurrentTask?.isWorking) return true;
      if (window.gradioApp && window.gradioApp().querySelector('#txt2img_generate')?.disabled) return true;
      if (window.gradioApp && window.gradioApp().querySelector('#img2img_generate')?.disabled) return true;
    } catch (e) {}
    return false;
  }

  window.addEventListener('beforeunload', (e) => {
    const enabled = getOpt('unload_guard_enabled', true);
    if (!enabled) return;

    const allowForgeReload = getOpt('unload_guard_allow_forge_reload', true);
    if (allowForgeReload) {
      const h1 = document.querySelector('body > h1');
      if (h1 && h1.innerText === 'Reloading...') return; // let Forge reloads pass
    }

    const onlyWhenBusy = getOpt('unload_guard_only_when_busy', true);
    if (onlyWhenBusy && !isAppBusy()) return;

    // Modern browsers ignore custom text here; empty string is recommended.
    e.preventDefault();
    e.returnValue = '';
  });
})();

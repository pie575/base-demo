/*
 * Code snippet feedback parity shim.
 *
 * Production docs.base.org shows Mintlify's "Report incorrect code" button beside the
 * copy button on every code block. It is enabled by a hosted-deployment entitlement
 * (CODE_SNIPPET_FEEDBACK), not docs.json, so local builds omit it. This recreates the
 * production markup wherever Mintlify did not render it itself.
 */
(function () {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  var HTML =
    '<button class="size-6.5 flex items-center justify-center rounded-md group/code-snippet-feedback-button" id="code-snippet-feedback-button" aria-label="Report incorrect code" data-code-feedback-shim="">' +
    '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="size-4 shrink-0 text-gray-400 group-hover/code-snippet-feedback-button:text-gray-500 dark:text-white/40 dark:group-hover/code-snippet-feedback-button:text-white/60">' +
    '<path d="M9 5.431V9.569"></path>' +
    '<path d="M9 11.417C8.449 11.417 8 11.866 8 12.417C8 12.968 8.449 13.417 9 13.417C9.551 13.417 10 12.968 10 12.417C10 11.866 9.551 11.417 9 11.417Z" fill="currentColor" stroke="none"></path>' +
    '<path d="M10.968 2.25H7.03301C6.50301 2.25 5.99401 2.461 5.61901 2.836L2.83701 5.618C2.46201 5.993 2.25101 6.502 2.25101 7.032V10.967C2.25101 11.497 2.46201 12.006 2.83701 12.381L5.61901 15.163C5.99401 15.538 6.50301 15.749 7.03301 15.749H10.968C11.498 15.749 12.007 15.538 12.382 15.163L15.164 12.381C15.539 12.006 15.75 11.497 15.75 10.967V7.032C15.75 6.502 15.539 5.993 15.164 5.618L12.382 2.836C12.007 2.461 11.498 2.25 10.968 2.25Z"></path>' +
    "</svg></button>";

  function ensure() {
    var copies = document.querySelectorAll(".code-block-copy-button");
    for (var i = 0; i < copies.length; i++) {
      var copy = copies[i];
      var group = copy.parentElement;
      if (!group || group.querySelector("#code-snippet-feedback-button")) continue;
      var wrap = document.createElement("div");
      wrap.className = "z-10 select-none";
      wrap.innerHTML = HTML;
      group.insertBefore(wrap, copy);
    }
  }

  var scheduled = false;
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(function () {
      scheduled = false;
      ensure();
    });
  }

  function start() {
    ensure();
    new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();

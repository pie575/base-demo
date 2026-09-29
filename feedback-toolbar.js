/*
 * Feedback toolbar parity shim.
 *
 * Production docs.base.org renders Mintlify's "Was this page helpful?" toolbar
 * (thumbs + "Suggest edits" + "Raise issue") between the page content and the
 * prev/next pagination. That toolbar is driven by dashboard deployment metadata
 * (feedback settings + GitHub source), not docs.json, so it is absent when the
 * docs run anywhere other than the hosted deployment. This script recreates the
 * same markup (copied from production) when Mintlify did not render it itself.
 */
(function () {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  var REPO = "https://github.com/base/docs";
  var BRANCH = "master";
  var CONTENT_DIR = "docs";
  var ICON_UP = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"18\" height=\"18\" viewBox=\"0 0 18 18\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" class=\"size-4 shrink-0 text-current\"><path d=\"M5.25 7.494C5.25 7.014 5.423 6.55 5.736 6.187L10 1.25C10.854 1.677 11.25 2.678 10.92 3.574L9.75 6.75H14.152C15.465 6.75 16.421 7.993 16.085 9.262L14.894 13.762C14.662 14.639 13.868 15.25 12.961 15.25H7.25C6.145 15.25 5.25 14.355 5.25 13.25\" stroke=\"currentColor\" width=\"1.5\" linecap=\"round\" linejoin=\"round\"></path><path d=\"M4.25 6.75H2.75C2.19772 6.75 1.75 7.19772 1.75 7.75V14.25C1.75 14.8023 2.19772 15.25 2.75 15.25H4.25C4.80228 15.25 5.25 14.8023 5.25 14.25V7.75C5.25 7.19772 4.80228 6.75 4.25 6.75Z\" stroke=\"currentColor\" width=\"1.5\" linecap=\"round\" linejoin=\"round\"></path></svg>";
  var ICON_DOWN = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"18\" height=\"18\" viewBox=\"0 0 18 18\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" class=\"size-4 shrink-0 text-current\"><path d=\"M5.25 10.506C5.25 10.986 5.423 11.45 5.736 11.813L10 16.75C10.854 16.323 11.25 15.322 10.92 14.426L9.75 11.25H14.152C15.465 11.25 16.421 10.007 16.085 8.738L14.894 4.238C14.662 3.361 13.868 2.75 12.961 2.75H7.25C6.145 2.75 5.25 3.645 5.25 4.75\" stroke=\"currentColor\" width=\"1.5\" linecap=\"round\" linejoin=\"round\"></path><path d=\"M4.25 2.75H2.75C2.19772 2.75 1.75 3.19772 1.75 3.75V10.25C1.75 10.8023 2.19772 11.25 2.75 11.25H4.25C4.80228 11.25 5.25 10.8023 5.25 10.25V3.75C5.25 3.19772 4.80228 2.75 4.25 2.75Z\" stroke=\"currentColor\" width=\"1.5\" linecap=\"round\" linejoin=\"round\"></path></svg>";
  var ICON_EDIT = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"18\" height=\"18\" viewBox=\"0 0 18 18\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" class=\"size-3.5 block shrink-0 text-current\"><path d=\"M13.953 7.57801L15.062 6.46901C15.648 5.88301 15.648 4.93301 15.062 4.34801L13.653 2.93901C13.067 2.35301 12.117 2.35301 11.532 2.93901L10.423 4.04801L13.953 7.57801Z\" stroke=\"currentColor\" width=\"1.5\" linecap=\"round\" linejoin=\"round\"></path><path d=\"M8.922 5.547L4.147 10.322C3.897 10.572 3.718 10.884 3.627 11.226L2.5 15.499L6.773 14.372C7.115 14.282 7.427 14.102 7.677 13.852L12.452 9.077\" stroke=\"currentColor\" width=\"1.5\" linecap=\"round\" linejoin=\"round\"></path><path d=\"M10.672 7.297L6.26501 11.704\" stroke=\"currentColor\" width=\"1.5\" linecap=\"round\" linejoin=\"round\"></path></svg>" + "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"18\" height=\"18\" viewBox=\"0 0 18 18\" fill=\"currentColor\" stroke=\"none\" aria-hidden=\"true\" class=\"size-3.5 hidden group-hover:block text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 shrink-0\"><path d=\"M15.5921 3.817L14.1831 2.407C13.3051 1.531 11.8781 1.531 11.0011 2.407L9.89211 3.516C9.59911 3.809 9.59911 4.284 9.89211 4.577L13.4221 8.107C13.5681 8.253 13.7601 8.327 13.9521 8.327C14.1441 8.327 14.3361 8.254 14.4821 8.107L15.5921 6.998C16.4681 6.121 16.4681 4.694 15.5921 3.817Z\" fill=\"currentColor\"></path><path d=\"M11.6556 8.81359L7.14727 13.322C6.99127 13.478 6.79527 13.59 6.58227 13.647L3.55427 14.446L4.35327 11.418C4.41027 11.204 4.52227 11.009 4.67827 10.853L9.18662 6.34459C9.47962 6.05159 9.47962 5.57659 9.18662 5.28359C8.89362 4.99059 8.41862 4.99059 8.12562 5.28359L3.61727 9.79198C3.27427 10.135 3.02727 10.565 2.90327 11.035L1.77627 15.308C1.70827 15.566 1.78227 15.841 1.97127 16.03C2.11427 16.173 2.30527 16.25 2.50127 16.25C2.56527 16.25 2.62927 16.242 2.69227 16.225L6.96527 15.098C7.43527 14.974 7.86527 14.727 8.20827 14.384L12.7166 9.87559C13.0096 9.58259 13.0096 9.10759 12.7166 8.81459C12.4236 8.52159 11.9486 8.52059 11.6556 8.81359Z\" fill=\"currentColor\"></path><path d=\"M5.73539 12.2339C5.88139 12.3799 6.07339 12.4539 6.26539 12.4539C6.45739 12.4539 6.64939 12.3809 6.79539 12.2339L10.9399 8.08947C11.2329 7.79647 11.2329 7.32147 10.9399 7.02847C10.6469 6.73547 10.1719 6.73547 9.87889 7.02847L5.73439 11.1729C5.44139 11.4659 5.44239 11.9409 5.73539 12.2339Z\" fill=\"currentColor\"></path></svg>";
  var ICON_ISSUE = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"18\" height=\"18\" viewBox=\"0 0 18 18\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" class=\"size-3.5 block shrink-0 text-current\"><path d=\"M7.63801 3.49498L2.21301 12.891C1.60801 13.939 2.36401 15.25 3.57501 15.25H14.425C15.636 15.25 16.392 13.94 15.787 12.891L10.362 3.49498C9.75701 2.44698 8.24301 2.44698 7.63801 3.49498Z\" stroke=\"currentColor\" width=\"1.5\" linecap=\"round\" linejoin=\"round\"></path><path d=\"M9 6.5V10\" stroke=\"currentColor\" width=\"1.5\" linecap=\"round\" linejoin=\"round\"></path><path d=\"M9 13.569C8.448 13.569 8 13.12 8 12.569C8 12.018 8.448 11.569 9 11.569C9.552 11.569 10 12.018 10 12.569C10 13.12 9.552 13.569 9 13.569Z\" fill=\"currentColor\" stroke=\"none\"></path></svg>" + "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"18\" height=\"18\" viewBox=\"0 0 18 18\" fill=\"currentColor\" stroke=\"none\" aria-hidden=\"true\" class=\"size-3.5 hidden group-hover:block text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 shrink-0\"><path d=\"M16.4366 12.5151L11.0103 3.11316C10.5904 2.39096 9.83896 1.96045 9.00006 1.96045C8.16116 1.96045 7.40976 2.39106 6.98976 3.11316L6.98876 3.11523L1.56296 12.5156C1.14356 13.2436 1.14356 14.1128 1.56396 14.8398C1.98386 15.5664 2.73586 16 3.57516 16H14.4247C15.2641 16 16.016 15.5664 16.4359 14.8398C16.8563 14.1127 16.8565 13.2436 16.4366 12.5151ZM8.25016 6.75C8.25016 6.3359 8.58606 6 9.00016 6C9.41426 6 9.75016 6.3359 9.75016 6.75V9.75C9.75016 10.1641 9.41426 10.5 9.00016 10.5C8.58606 10.5 8.25016 10.1641 8.25016 9.75V6.75ZM9.00016 13.5C8.44816 13.5 8.00016 13.0498 8.00016 12.5C8.00016 11.9502 8.44816 11.5 9.00016 11.5C9.55216 11.5 10.0002 11.9502 10.0002 12.5C10.0002 13.0498 9.55216 13.5 9.00016 13.5Z\" fill=\"currentColor\"></path></svg>";
  var BTN = "px-3.5 py-2 flex flex-row gap-3 items-center rounded-xl hover:text-gray-700 dark:hover:text-gray-300 bg-white/50 dark:bg-codeblock/50 hover:border-gray-500 hover:dark:border-gray-500 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary dark:focus-visible:outline-primary-light ";
  var BTN_IDLE = BTN + "border-standard text-gray-600 dark:text-gray-400";
  var BTN_ACTIVE = BTN + "border border-gray-500 dark:border-gray-500 text-gray-700 dark:text-gray-300";
  var LINK = "h-fit whitespace-nowrap px-3.5 py-2 flex flex-row gap-3 items-center border-standard rounded-xl text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 bg-white/50 dark:bg-codeblock/50 hover:border-gray-500 hover:dark:border-gray-500";
  var OPTIONS = {
    Yes: {
      title: "Great! What worked best for you?",
      items: [
        ["worked-as-expected", "The guide worked as expected"],
        ["easy-to-find", "It was easy to find the information I needed"],
        ["easy-to-understand", "It was easy to understand the product and features"],
        ["up-to-date", "The documentation is up to date"],
        ["something-else-positive", "Something else"]
      ]
    },
    No: {
      title: "How can we improve our product?",
      items: [
        ["get-started-faster", "Help me get started faster"],
        ["easier-to-find", "Make it easier to find what I'm looking for"],
        ["easier-to-understand", "Make it easy to understand the product and features"],
        ["update-docs", "Update this documentation"],
        ["something-else-negative", "Something else"]
      ]
    }
  };

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function currentPath() {
    var p = window.location.pathname.replace(/\/+$/, "");
    return p || "/";
  }

  function toolbarHtml(path) {
    var slug = path.replace(/^\//, "") || "index";
    var edit = REPO + "/edit/" + BRANCH + "/" + (CONTENT_DIR ? CONTENT_DIR + "/" : "") + slug + ".mdx";
    var issue = REPO + "/issues/new?title=Issue on docs&body=Path: " + (path === "/" ? "index" : path);
    return (
      '<div class="flex flex-row flex-wrap gap-4 items-center justify-between">' +
      '<p class="inline-block text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">Was this page helpful?</p>' +
      '<div class="flex flex-wrap grow gap-3 items-center justify-between">' +
      '<div class="flex gap-3 items-center">' +
      '<button id="feedback-thumbs-up" type="button" data-vote="Yes" class="' + BTN_IDLE + '">' + ICON_UP + '<small class="text-sm font-normal leading-4">Yes</small></button>' +
      '<button id="feedback-thumbs-down" type="button" data-vote="No" class="' + BTN_IDLE + '">' + ICON_DOWN + '<small class="text-sm font-normal leading-4">No</small></button>' +
      "</div>" +
      '<div class="flex gap-3">' +
      '<a class="' + LINK + '" target="_blank" rel="noopener noreferrer" href="' + esc(edit) + '">' + ICON_EDIT + '<small class="text-sm leading-4">Suggest edits</small></a>' +
      '<a class="' + LINK + '" target="_blank" rel="noopener noreferrer" href="' + esc(issue) + '">' + ICON_ISSUE + '<small class="text-sm leading-4">Raise issue</small></a>' +
      "</div></div></div>"
    );
  }

  function radioDot(checked) {
    return checked
      ? '<div class="h-4 w-4 rounded-full bg-primary-dark dark:bg-primary-light ring-1 ring-primary-dark dark:ring-primary-light border-white dark:border-background-dark border-2"><div class="h-2 w-2 rounded-full bg-primary-dark dark:bg-primary-light absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div></div>'
      : '<div class="h-4 w-4 rounded-full border border-gray-400 dark:border-gray-600"></div>';
  }

  function formHtml(vote, selected, text) {
    var o = OPTIONS[vote];
    var items = o.items.map(function (it) {
      var on = it[0] === selected;
      return (
        '<label class="flex items-start cursor-pointer pl-0.5"><div class="relative">' +
        '<input class="peer sr-only" type="radio" name="feedback-option" value="' + it[0] + '"' + (on ? " checked" : "") + ">" +
        radioDot(on) + "</div>" +
        '<span class="ml-3 text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70' + (on ? " text-gray-800 dark:text-gray-200" : "") + '">' + esc(it[1]) + "</span></label>"
      );
    }).join("");
    var input = selected
      ? '<input id="feedback-form-input" placeholder="(Optional) Could you share more about your experience?" aria-label="Additional feedback (optional)" class="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-800 rounded-xl text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-600/70 dark:placeholder:text-gray-400/70 bg-black/0 focus:ring-0 focus:outline-0 focus:border-gray-300 dark:focus:border-gray-700 contextual-feedback-form-input" value="' + esc(text || "") + '">'
      : "";
    return (
      '<div class="pt-6 pb-4 border-t border-gray-200 dark:border-gray-700 contextual-feedback-container">' +
      '<form id="feedback-form" class="flex flex-col gap-y-6 contextual-feedback-form">' +
      '<h3 class="text-base font-medium text-gray-900 dark:text-gray-100 contextual-feedback-form-title">' + esc(o.title) + "</h3>" +
      '<div class="flex flex-col gap-y-3">' + items + "</div>" + input +
      '<div class="flex gap-2 mt-2">' +
      '<button id="feedback-form-cancel" type="button" class="px-4 py-2 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded-xl disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary dark:focus-visible:outline-primary-light contextual-feedback-button">Cancel</button>' +
      '<button id="feedback-form-submit" type="submit"' + (selected ? "" : " disabled") + ' class="px-4 py-2 bg-black dark:bg-white text-white dark:text-black text-sm font-medium rounded-xl disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary dark:focus-visible:outline-primary-light contextual-feedback-form-submit-button">Submit feedback</button>' +
      "</div></form></div>"
    );
  }

  function wire(root) {
    var state = { vote: null, selected: null, text: "" };
    function render() {
      var old = root.querySelector(".contextual-feedback-container");
      if (old) old.remove();
      root.querySelectorAll("button[data-vote]").forEach(function (b) {
        b.className = b.getAttribute("data-vote") === state.vote ? BTN_ACTIVE : BTN_IDLE;
      });
      if (state.vote === "thanks") {
        root.insertAdjacentHTML("beforeend", '<div class="pt-6 pb-4 border-t border-gray-200 dark:border-gray-700 contextual-feedback-container"><p class="text-base font-medium text-gray-900 dark:text-gray-100 h-16 contextual-feedback-form-title">Thank you!</p></div>');
      } else if (state.vote) {
        root.insertAdjacentHTML("beforeend", formHtml(state.vote, state.selected, state.text));
      }
    }
    root.addEventListener("click", function (e) {
      var vote = e.target.closest && e.target.closest("button[data-vote]");
      if (vote) {
        var v = vote.getAttribute("data-vote");
        state = { vote: state.vote === v ? null : v, selected: null, text: "" };
        render();
        return;
      }
      if (e.target.closest && e.target.closest("#feedback-form-cancel")) {
        state = { vote: null, selected: null, text: "" };
        render();
      }
    });
    root.addEventListener("change", function (e) {
      if (e.target && e.target.name === "feedback-option") {
        state.selected = e.target.value;
        render();
        var input = root.querySelector("#feedback-form-input");
        if (input) input.focus();
      }
    });
    root.addEventListener("input", function (e) {
      if (e.target && e.target.id === "feedback-form-input") state.text = e.target.value;
    });
    root.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!state.selected) return;
      state = { vote: "thanks", selected: null, text: "" };
      render();
      setTimeout(function () {
        state = { vote: null, selected: null, text: "" };
        render();
      }, 3000);
    });
  }

  function ensure() {
    var area = document.getElementById("content-area");
    var content = document.getElementById("content") || document.getElementById("api-playground-2-operation-page");
    if (!area || !content || content.parentElement !== area) return;
    var existing = area.querySelector(":scope > .feedback-toolbar");
    if (existing && !existing.hasAttribute("data-feedback-shim")) return; // Mintlify rendered its own
    var path = currentPath();
    if (existing) {
      if (existing.getAttribute("data-path") === path && existing.previousElementSibling === content) return;
      existing.remove();
    }
    var el = document.createElement("div");
    el.className = "feedback-toolbar pb-16 w-full flex flex-col gap-y-8";
    el.setAttribute("data-feedback-shim", "");
    el.setAttribute("data-path", path);
    el.innerHTML = toolbarHtml(path);
    wire(el);
    content.insertAdjacentElement("afterend", el);
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

  if (document.readyState === "complete") start();
  else window.addEventListener("load", start);
})();

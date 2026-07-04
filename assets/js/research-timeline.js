(function () {
  var section = document.getElementById("research-timeline-section");
  if (!section) return;

  var timeline = document.getElementById("research-timeline");
  var emptyState = document.getElementById("research-empty");
  var dialog = document.getElementById("research-dialog");
  var filterButtons = section.querySelectorAll(".research-filter-btn");
  var cards = section.querySelectorAll(".research-card");

  var dialogImage = document.getElementById("research-dialog-image");
  var dialogMeta = document.getElementById("research-dialog-meta");
  var dialogTitle = document.getElementById("research-dialog-title");
  var dialogTopics = document.getElementById("research-dialog-topics");
  var dialogSummary = document.getElementById("research-dialog-summary");
  var dialogLink = document.getElementById("research-dialog-link");

  function cardTopics(card) {
    return (card.getAttribute("data-topics") || "").split(",").map(function (t) {
      return t.trim();
    }).filter(Boolean);
  }

  function applyFilter(topicId) {
    var visibleCount = 0;

    filterButtons.forEach(function (btn) {
      var active = btn.getAttribute("data-topic") === topicId;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-selected", active ? "true" : "false");
    });

    cards.forEach(function (card) {
      var topics = cardTopics(card);
      var show = topicId === "all" || topics.indexOf(topicId) !== -1;
      card.hidden = !show;
      if (show) visibleCount += 1;
    });

    emptyState.hidden = visibleCount > 0;
  }

  function openDialog(card) {
    var date = card.getAttribute("data-date") || "";
    var displayDate = date ? date.slice(0, 7).replace("-", ".") : "";
    var org = card.getAttribute("data-org") || "";
    var topics = cardTopics(card);

    dialogImage.src = card.getAttribute("data-image") || "";
    dialogImage.alt = card.getAttribute("data-title") || "";
    dialogMeta.textContent = displayDate + (org ? " · " + org : "");
    dialogTitle.textContent = card.getAttribute("data-title") || "";
    dialogSummary.textContent = card.getAttribute("data-summary") || "";
    dialogLink.href = card.getAttribute("data-url") || "#";

    dialogTopics.innerHTML = "";
    topics.forEach(function (topic) {
      var tag = document.createElement("span");
      tag.className = "research-topic-tag research-topic-tag--" + topic.toLowerCase();
      tag.textContent = topic;
      dialogTopics.appendChild(tag);
    });

    dialog.hidden = false;
    dialog.setAttribute("aria-hidden", "false");
    document.body.classList.add("research-dialog-open");
    dialog.querySelector(".research-dialog__close").focus();
  }

  function closeDialog() {
    dialog.hidden = true;
    dialog.setAttribute("aria-hidden", "true");
    document.body.classList.remove("research-dialog-open");
  }

  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyFilter(btn.getAttribute("data-topic"));
    });
  });

  cards.forEach(function (card) {
    card.addEventListener("click", function (event) {
      if (event.target.closest("a.research-btn--primary")) return;
      event.preventDefault();
      openDialog(card);
    });

    card.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openDialog(card);
      }
    });

    var previewBtn = card.querySelector(".research-card__preview");
    if (previewBtn) {
      previewBtn.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        openDialog(card);
      });
    }
  });

  dialog.querySelectorAll("[data-close-dialog]").forEach(function (el) {
    el.addEventListener("click", closeDialog);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !dialog.hidden) closeDialog();
  });
})();

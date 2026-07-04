(function () {
  var section = document.getElementById("dialog-timeline-section");
  if (!section) return;

  var emptyState = document.getElementById("dialog-empty");
  var filterButtons = section.querySelectorAll(".dialog-filter-btn");
  var cards = section.querySelectorAll(".dialog-card");

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

    if (emptyState) emptyState.hidden = visibleCount > 0;
  }

  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyFilter(btn.getAttribute("data-topic"));
    });
  });

  cards.forEach(function (card) {
    // Whole card is clickable; anchor children still work naturally.
    card.addEventListener("click", function (event) {
      if (event.target.closest("a")) return;
      var url = card.getAttribute("data-url");
      if (url) window.location.href = url;
    });

    card.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        var url = card.getAttribute("data-url");
        if (url) window.location.href = url;
      }
    });
  });
})();

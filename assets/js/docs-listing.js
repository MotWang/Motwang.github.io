/* Simple topic filter for docs-style listings.
 * Applies to any .docs-listing that contains .docs-filter buttons and .docs-list__item rows.
 */
(function () {
  document.querySelectorAll(".docs-listing").forEach(function (listing) {
    var filters = listing.querySelectorAll(".docs-filter");
    var items = listing.querySelectorAll(".docs-list__item");
    var emptyMsg = listing.querySelector(".docs-list__empty");

    function itemTopics(el) {
      return (el.getAttribute("data-topics") || "")
        .split(",")
        .map(function (t) { return t.trim(); })
        .filter(Boolean);
    }

    function applyFilter(topicId) {
      var visible = 0;

      filters.forEach(function (btn) {
        var active = btn.getAttribute("data-topic") === topicId;
        btn.classList.toggle("is-active", active);
      });

      items.forEach(function (item) {
        var show = topicId === "all" || itemTopics(item).indexOf(topicId) !== -1;
        item.hidden = !show;
        if (show) visible += 1;
      });

      if (emptyMsg) emptyMsg.hidden = visible > 0;
    }

    filters.forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyFilter(btn.getAttribute("data-topic"));
      });
    });
  });
})();

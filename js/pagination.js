const pagination = (function () {
  return {
    getDomElements: function () {
      const paginationContainer = document.querySelector(
        "js-pagination-trigger"
      );
      const paginationElements = paginationContainer.childNodes();
      return paginationElements;
    },
  };
})();

module.exports = pagination;

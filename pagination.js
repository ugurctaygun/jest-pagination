const pagination = (function () {
  function sum(a, b) {
    return a + b;
  }

  return {
    getDomElements: function () {
      const paginationContainer = document.querySelector(
        "js-pagination-trigger"
      );
      const paginationElements = paginationContainer.childNodes();
      console.log(paginationElements);
    },
    testSum: function (a, b) {
      return a + b;
    },
  };
})();

console.log(pagination.testSum());

export default pagination;

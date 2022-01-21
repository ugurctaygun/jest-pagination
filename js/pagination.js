class domPagination {
  /**
   * Pagination
   * @constructor
   * @param {number} currentPage
   * @param {number} itemsPerPage
   * @param {number} itemsNumber
   * @param {number} range
   */
  constructor(paginationContainer, itemsPerPage, range) {
    this.itemsPerPage = Number.isInteger(itemsPerPage)
      ? Number(itemsPerPage)
      : this.itemsNumber;
    this.range = Number(range) || 10;
    this.itemsNumber = 0;
    this.itemsToPaginate;
    this.paginationContainer = paginationContainer;
    this.getItems = function () {
      let container = document.querySelector(this.paginationContainer);
      this.itemsNumber = container.children.length;
      this.itemsToPaginate = Array.from(container.children);
    };
    this.paginate = function () {
      this.itemsToPaginate
        .slice(0, itemsPerPage)
        .forEach((item) => (item.style.display = "none"));
      console.log(this.itemsToPaginate.slice(0, itemsPerPage));
    };
    this.init = function () {
      this.getElements();
    };
    this.init();
  }

  getElements() {
    let container = document.querySelector(this.paginationContainer);
    this.itemsNumber = container.children.length;
    this.itemsToPaginate = Array.from(container.children);
  }
}

module.exports = domPagination;

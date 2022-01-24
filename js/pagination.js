class domPagination {
  /**
   * Pagination
   * @constructor
   * @param {object} options
   * @param {number} currentPage
   * @param {number} itemsPerPage
   * @param {number} itemsNumber
   * @param {number} range
   */
  constructor(options) {
    this.options = options;
    const { paginationContainer, itemsPerPage, range } = options;
    this.itemsPerPage = Number.isInteger(itemsPerPage)
      ? Number(itemsPerPage)
      : this.itemsNumber;
    this.range = Number(range) || 10;
    this.itemsNumber = 0;
    this.itemsToPaginate;
    this.currentPage;
    this.paginationContainer = paginationContainer;
    this.paginate = function () {
      this.itemsToPaginate
        .slice(itemsPerPage)
        .forEach((item) => (item.style.display = "none"));
    };
    this.init = function () {
      this.getElements();
      this.createControls();
      this.paginate();
    };
    this.init();
  }

  getElements() {
    let container = document.querySelector(this.paginationContainer);
    this.itemsNumber = container.children.length;
    this.itemsToPaginate = Array.from(container.children);
  }

  createControls() {
    let container = document.querySelector(this.paginationContainer);
    let controlContainer =
      container.parentElement.querySelector(".c-pagination");
    let pageNumbers = controlContainer.querySelector(".pagination");
    for (
      let i = 0;
      i < Math.ceil(this.itemsNumber / this.itemsPerPage);
      i += 1
    ) {
      let numberBox = document.createElement("li");
      numberBox.innerHTML = i + 1;
      pageNumbers.appendChild(numberBox);
      numberBox.addEventListener("click", () => {
        this.controlPages(numberBox.innerHTML);
      });
    }
  }

  controlPages(pageNumber) {
    this.itemsToPaginate.forEach((element) => (element.style.display = "none"));
    let itemsToShow;
    if (pageNumber == 1) {
      this.currentPage = 0;
      itemsToShow = this.itemsToPaginate.slice(
        this.currentPage,
        this.itemsPerPage
      );
    } else {
      this.currentPage = pageNumber;
      itemsToShow = this.itemsToPaginate.slice(
        this.currentPage * this.itemsPerPage - this.itemsPerPage,
        this.currentPage * this.itemsPerPage
      );
    }

    itemsToShow.forEach((element) => (element.style.display = "block"));
    window.scrollTo({ top: 300, behavior: "smooth" });
  }
}

module.exports = domPagination;

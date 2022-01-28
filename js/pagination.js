class domPagination {
  /**
   * Pagination
   * @constructor
   * @param {object} options
   * @param {number} currentPage
   * @param {number} itemsPerPage
   * @param {number} itemsNumber
   */
  constructor(options) {
    this.options = options;
    const { paginationContainer, itemsPerPage, itemsPerPageOptions } = options;
    this.itemsPerPage = Number.isInteger(itemsPerPage)
      ? Number(itemsPerPage)
      : this.itemsNumber;
    this.itemsPerPageOptions = itemsPerPageOptions || false;
    this.itemsNumber = 0;
    this.itemsToPaginate;
    this.currentPage = 0;
    this.currentPageBoxElement;
    this.previousButton;
    this.nextButton;
    this.firstPageButton;
    this.lastPageButton;
    this.pageNumberBoxElements;
    this.selectOption;
    this.paginationContainer = paginationContainer;
    this.paginate = function () {
      this.itemsToPaginate
        .slice(itemsPerPage)
        .forEach((item) => (item.style.display = "none"));
    };
  }

  getElements() {
    let container = document.querySelector(this.paginationContainer);
    this.itemsNumber = container.children.length;
    this.itemsToPaginate = Array.from(container.children);
  }

  createNavigationTemplate() {
    let container = document.querySelector(
      this.paginationContainer
    ).parentElement;
    let navContainer = document.createElement("div");
    let navTemplate = `<div class="c-pagination">
    <div class="c-pagination__nav">
        <div class="c-pagination__first-page">
            <<
        </div>
        <div class="c-pagination__previous-page">
            <
        </div>
        <ul class="pagination">
        </ul>
        <div class="c-pagination__next-page">
            >
        </div>
        <div class="c-pagination__last-page">
            >>
        </div>
    </div>
    ${
      this.itemsPerPageOptions
        ? `
        <div class="c-pagination__select">
            <select id='change-option'>
              <option value="9">Show 9 per page</option>
              <option value="6">Show 6 per page</option>
              <option value="3">Show 3 per page</option>
            </select>
          </div>
          `
        : ``
    }
  </div>`;
    navContainer.innerHTML = navTemplate;
    container.appendChild(navContainer);
    this.previousButton = document.querySelector(
      ".c-pagination__previous-page"
    );
    this.firstPageButton = document.querySelector(".c-pagination__first-page");
    this.nextButton = document.querySelector(".c-pagination__next-page");
    this.lastPageButton = document.querySelector(".c-pagination__last-page");
    this.itemsPerPageOptions
      ? (this.selectOption = document.getElementById("change-option"))
      : false;
  }

  populateNavigation() {
    let container = document.querySelector(this.paginationContainer);
    let controlContainer =
      container.parentElement.querySelector(".c-pagination");
    let pageNumbers = controlContainer.querySelector(".pagination");

    if (this.itemsPerPage >= this.itemsNumber) {
      controlContainer.style.display = "none";
    }

    for (
      let i = 0;
      i < Math.ceil(this.itemsNumber / this.itemsPerPage);
      i += 1
    ) {
      let numberBox = document.createElement("li");
      numberBox.innerHTML = i + 1;
      pageNumbers.appendChild(numberBox);
      if (numberBox.innerHTML == 1) [numberBox.classList.add("active")];
    }

    this.pageNumberBoxElements = Array.from(
      pageNumbers.getElementsByTagName("li")
    );
    this.updateNavigation();
    this.pageNumberBoxElements.forEach((element) => {
      element.addEventListener("click", () => {
        let notCurrent = this.pageNumberBoxElements.filter(
          (item) => item !== element
        );
        notCurrent.forEach((item) => item.classList.remove("active"));
        element.classList.add("active");
        this.pageNumberControls(element.innerHTML);
        this.updateNavigation();
      });
    });
  }

  pageNumberControls(pageNumber) {
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

  nextPageAction() {
    this.pageNumberBoxElements[
      this.pageNumberBoxElements.indexOf(this.currentPageBoxElement) + 1
    ].click();
  }

  previousPageAction() {
    this.pageNumberBoxElements[
      this.pageNumberBoxElements.indexOf(this.currentPageBoxElement) - 1
    ].click();
  }

  firstPageAction() {
    this.pageNumberBoxElements[0].click();
  }

  lastPageAction() {
    this.pageNumberBoxElements[this.pageNumberBoxElements.length - 1].click();
  }

  changeItemPerPageAction() {
    let select = this.selectOption;
    select.addEventListener("change", (e) => {
      this.itemsPerPage = e.target.value;
      this.pageNumberBoxElements.forEach((element) => element.remove());
      this.paginate();
      this.populateNavigation();
      this.currentPageBoxElement.click();
    });
  }

  navigationControls() {
    let container = document.querySelector(this.paginationContainer);
    let controlContainer =
      container.parentElement.querySelector(".c-pagination");
    controlContainer.addEventListener("click", (e) => {
      switch (e.target) {
        case this.nextButton:
          this.nextPageAction();
          break;
        case this.previousButton:
          this.previousPageAction();
          break;
        case this.firstPageButton:
          this.firstPageAction();
          break;
        case this.lastPageButton:
          this.lastPageAction();
          break;
        case this.selectOption:
          this.changeItemPerPageAction(e.target.value);
          break;
        default:
          break;
      }
    });
  }

  updateNavigation() {
    let pageNumbers = this.pageNumberBoxElements;
    this.currentPageBoxElement = this.pageNumberBoxElements
      .filter((item) => item.classList.contains("active"))
      .shift();
    if (pageNumbers[0].classList.contains("active")) {
      this.previousButton.style.display = "none";
      this.firstPageButton.style.display = "none";
    } else {
      this.previousButton.style.display = "block";
      this.firstPageButton.style.display = "block";
    }

    if (pageNumbers[pageNumbers.length - 1].classList.contains("active")) {
      this.lastPageButton.style.display = "none";
      this.nextButton.style.display = "none";
    } else {
      this.lastPageButton.style.display = "block";
      this.nextButton.style.display = "block";
    }
    pageNumbers.forEach((element) => (element.style.display = "block"));
    for (let i = 0; i < pageNumbers.length; i++) {
      if (this.currentPage <= 2) {
        pageNumbers
          .slice(5)
          .forEach((element) => (element.style.display = "none"));
      } else if (this.currentPage > 2) {
        if (pageNumbers[i].classList.contains("active")) {
          let previousPages = pageNumbers.slice(
            pageNumbers.indexOf(pageNumbers[i]) - 2,
            pageNumbers.indexOf(pageNumbers[i])
          );
          let upcomingPages = pageNumbers.slice(
            pageNumbers.indexOf(pageNumbers[i]) + 1,
            pageNumbers.indexOf(pageNumbers[i]) + 3
          );
          let pageNumbersToShow = previousPages.concat(
            upcomingPages,
            pageNumbers[i]
          );
          let pagesToHide = pageNumbers.filter((item) => {
            return !pageNumbersToShow.includes(item);
          });
          pagesToHide.forEach((element) => (element.style.display = "none"));
        }
      }
    }
  }

  init() {
    this.getElements();
    this.createNavigationTemplate();
    this.populateNavigation();
    this.paginate();
    this.navigationControls();
  }
}

module.exports = domPagination;

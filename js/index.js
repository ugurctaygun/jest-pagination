import domPagination from "./pagination";

const paginate = new domPagination({
  paginationContainer: ".js-trigger-pagination",
  itemsPerPage: 3,
});

paginate.getElements();

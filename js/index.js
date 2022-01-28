import domPagination from "./pagination";

const paginate = new domPagination({
  paginationContainer: ".js-trigger-pagination",
  itemsPerPage: 6,
  itemsPerPageOptions: true,
});

paginate.init();

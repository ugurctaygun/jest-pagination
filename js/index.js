import * as $ from "jquery";

window.$ = $;

import domPagination from "./pagination";

const paginate = new domPagination({
  paginationContainer: ".js-trigger-pagination",
  itemsPerPage: 3,
  itemsPerPageOptions: true,
});

paginate.init();

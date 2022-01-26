/**
 * @jest-environment jsdom
 */

const domPagination = require("./pagination");
const $ = require("jquery");

document.body.innerHTML = `<div class="container">
<div class="js-trigger-pagination">'
  <div class="item"></div>
  <div class="item"></div>
  <div class="item"></div>
</div>
</div>`;

test("Pagination container should not be empty", () => {
  const paginate = new domPagination({
    paginationContainer: ".js-trigger-pagination",
  });
  paginate.getElements();
  expect(paginate.itemsNumber).not.toBe(0);
});

test("Add navigation controls to pagination container", () => {
  const paginate = new domPagination({
    paginationContainer: ".js-trigger-pagination",
  });
  paginate.createNavigationTemplate();
  expect($(".c-pagination")).not.toBe(null);
});

test("Add correct number of page links to the navigation", () => {
  const paginate = new domPagination({
    paginationContainer: ".js-trigger-pagination",
    itemsPerPage: 2,
  });
  paginate.init();
  expect($(".pagination li").length).toBe(2);
});

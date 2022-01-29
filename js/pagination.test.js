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

test("Hide navigation if there are less items to show than items per page", () => {
  const paginate = new domPagination({
    paginationContainer: ".js-trigger-pagination",
    itemsPerPage: 5,
  });
  paginate.init();
  expect($(".c-pagination").css("display") === "none").toBe(true);
});

test("Add correct number of page links to the navigation", () => {
  const paginate = new domPagination({
    paginationContainer: ".js-trigger-pagination",
    itemsPerPage: 2,
  });
  paginate.init();
  expect($(".pagination li").length).toBe(3);
});

test("Test next page action", () => {
  const paginate = new domPagination({
    paginationContainer: ".js-trigger-pagination",
    itemsPerPage: 1,
  });
  paginate.init();
  let nextPage = $(".pagination li.active").next();
  paginate.nextPageAction();

  expect($(nextPage).hasClass("active")).toBe(true);
});

test("Test previous page action", () => {
  const paginate = new domPagination({
    paginationContainer: ".js-trigger-pagination",
    itemsPerPage: 1,
  });
  paginate.init();
  let prevPage = $(".pagination li.active").prev();
  paginate.previousPageAction();

  expect($(prevPage).hasClass("active")).toBe(true);
});

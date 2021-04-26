"use strict";

/*___________Toggle The Post Edit Form_____________________*/

let count = $(".editPostBtn").length;

for (let i = 1; i < count + 1; i++) {
  $(`#${i}btnPost`).next().hide();

  $(`#${i}btnPost`).on("click", function () {
    $(`#${i}btnPost`).next().toggle();
  });
}

/*___________Toggle The Comment Edit Form_____________________*/

let count2 = $('.editCommentBtn').length;

for(let i = 1; i < count2 + 1; i++){
    $(`#${i}btnComment`).next().hide();
    $(`#${i}btnComment`).on("click", function () {
        $(`#${i}btnComment`).next().toggle();
      });
}
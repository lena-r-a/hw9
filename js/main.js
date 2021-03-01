$(function () {
  var index = 0;
  let div = this.querySelector("#date_today");
  const addButton = $("#save");

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();

  today = dd + "/" + mm + "/" + yyyy;
  div.append("Сегодня " + today);

  if (localStorage.getItem("number")) {
    index = localStorage.getItem("number");
  }

  if (localStorage.getItem("tasks")) {
    $("ul").append(localStorage.getItem("tasks"));
  }

  $("#newtask").on("shown.bs.modal", function () {
    $("#task__name").focus();
  });

  addButton.click(function () {
    let date = document.querySelector("#finish__date");
    let tn = $("#task__name").val();
    if (tn !== "") {
      index++;
      $(".list__task")
        .append(`<li class="row"><div class="left-cont col-6"><input type="checkbox" 
             id="check-${index}" name=""><label for="check-${index}"></label><span>${tn}</span></div>
             <span class="col date">${date.value}</span>
              <span class="remove col"><i class="far fa-trash-alt"></i></span></li>`);
    }
    if (date.value !== "") {
      $(".date").attr("data-tooltip", "Срок выполнения задачи");
    }
    $("#finish__date").val("YYYY-MM-DD");
    $("#task__name").val("");
    toLocal();
  });

  $(document).on("click", ".remove", function () {
    $(this).parent().remove();
    console.log($(this).parent());
    console.log(index);
    toLocal();
  });

  function toLocal() {
    let list = $("ul").html();
    localStorage.setItem("tasks", list);
    localStorage.setItem("number", index);
  }
  $(document).on("change", 'input[type="checkbox"]', function () {
    if ($(this).is(":checked")) {
      $(this).siblings("span").addClass("strikethrow");
      $(this).attr("checked", true);
      toLocal();
    } else {
      $(this).siblings("span").removeClass("strikethrow");
      $(this).attr("checked", false);
      toLocal();
    }
  });

  let list = document.querySelector("ul");
  list.addEventListener("click", function (e) {
    debugger;
    let current = e.target;
    let input = current.previousSibling.previousSibling;
    if (current.tagName === "SPAN") {
      current.classList.toggle("strikethrow");
      if (input.tagName == "INPUT" && input.type == "checkbox") input.click();
    }
    toLocal();
  });

  $("#clear").click(() => {
    localStorage.clear();
    $("ul li").remove();
    index = 0;
  });
});

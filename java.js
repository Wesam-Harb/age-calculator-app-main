let img = document.querySelector("img");
function error(msg) {
  document.documentElement.style.setProperty(
    "--borderColor",
    "hsl(0, 100%, 67%)"
  );
  document.documentElement.style.setProperty("--pColor", "hsl(0, 100%, 67%)");
  let errorMsg = document.createElement("p");
  errorMsg.classList.add("errorMsg");
  errorMsg.innerText = msg;
  return errorMsg;
}
img.onclick = function () {
  if (document.querySelectorAll(".errorMsg").length != 0)
    document.querySelectorAll(".errorMsg").forEach((el) => el.remove());
  let days = document.querySelector("input.day");
  let months = document.querySelector("input.month");
  let years = document.querySelector("input.year");
  let spanD = document.querySelector("p.days span");
  let spanM = document.querySelector("p.months span");
  let spanY = document.querySelector("p.years span");

  const date = new Date(years.value, months.value - 1, days.value);
  const currentDate = new Date();
  let valid = true;
  let inputs = document.querySelectorAll("input");

  inputs.forEach(function (el, ind) {
    if (el.value == ``) {
      el.after(error("This Field Is Required"));
      valid = false;
    } else if (ind == 0 && (el.value < 1 || el.value > 31)) {
      el.after(error(`Must Be A Valid ${el.getAttribute("class")}`));
      valid = false;
    } else if (date.getDate() != el.value && ind == 0) {
      el.after(error(`Must Be A Valid Date`));
      valid = false;
    } else if (ind == 1 && (el.value < 1 || el.value > 12)) {
      el.after(error(`Must Be A Valid ${el.getAttribute("class")}`));
      valid = false;
    } else if (el.value > currentDate.getFullYear() && ind == 2) {
      el.after(error("Must Be In The Past"));
      valid = false;
    }
  });
  if (valid) {
    let days = currentDate.getDate() - date.getDate();
    let months = currentDate.getMonth() - date.getMonth();
    let years = currentDate.getFullYear() - date.getFullYear();
    if (currentDate.getMonth() < date.getMonth()) {
      years--;
      months = currentDate.getMonth() - date.getMonth() + 12;
    }
    if (currentDate.getDate() < date.getDate()) {
      months--;
      const prevMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        0
      );
      days += prevMonth.getDate();
    }
    // let days = currentDate.getDate() - date.getDate();
    // let months = currentDate.getMonth() - date.getMonth() - 1;
    // let years = currentDate.getFullYear() - date.getFullYear();
    // console.log(months);
    // if (days < 0) {
    //   // Borrow days from previous month
    //   months--;
    //   const prevMonth = new Date(
    //     currentDate.getFullYear(),
    //     currentDate.getMonth(),
    //     0
    //   );
    //   days += prevMonth.getDate();
    // }

    // if (months < 0) {
    //   // Borrow months from previous year
    //   years--;
    //   months += 12;
    // }
    console.log(months);
    spanD.innerText = days;
    spanM.innerText = months;
    spanY.innerText = years;
    document.documentElement.style.setProperty("--borderColor", "#ccc");
    document.documentElement.style.setProperty("--pColor", "hsl(0, 0%, 26%)");
  }
};

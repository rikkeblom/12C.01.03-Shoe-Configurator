"use strict";
//using this color picker: https://iro.js.org/guide.html
document.addEventListener("DOMContentLoaded", start);

let elementToPaint;
let colorPicker;

async function start() {
  let resp = await fetch("shoe.svg");
  let svg = await resp.text();
  document.querySelector("#shoeBox").innerHTML = svg;
  document.querySelector("button").addEventListener("click", saveInLocalStorage);

  manipulateSVG();
}

function adjustPickerSize() {
  // let screenWidth = screen.width;
  let currentWidth = (window.innerWidth / 100) * 20;
  colorPicker.resize(currentWidth);
}

function manipulateSVG() {
  console.log("manipulative");
  window.addEventListener("resize", adjustPickerSize);

  selectGroups();
  noClickOnShadows();

  colorPicker = iro.ColorPicker("#picker", {
    // Set the size of the color picker
    width: (window.innerWidth / 100) * 20,
    // Set the initial color to pure red
    color: "#f00",
  });

  colorPicker.on("color:change", function (color) {
    // log the current color as a HEX string
    // console.log(color.hexString);

    if (elementToPaint === undefined) {
      document.querySelectorAll(".g_to_interact_with").forEach(colorEvent);
    } else {
      elementToPaint.style.fill = color.hexString;
      document.querySelectorAll(".g_to_interact_with").forEach(removeStroke);
    }
  });

  document.querySelectorAll(".g_to_interact_with").forEach(colorEvent);
  document.querySelector("#background path").style.fill = "grey";

  //colorPicker.color.hexString

  function colorEvent(area) {
    // console.log(area.id);
    // console.log(localStorage.getItem(area.id));
    if (localStorage.getItem(area.id) === "NUL") {
      area.style.fill = "#f2ecde";
    } else {
      area.style.fill = localStorage.getItem(area.id);
    }
    area.style.cursor = "pointer";

    area.querySelectorAll("path").forEach(removeFill);
    function removeFill(path) {
      path.removeAttribute("fill");
    }
    area.addEventListener("click", setElementToPaint);
  }

  //   colorButtons();
}

function colorButtons() {
  const buttons = document.querySelectorAll(".color_btn");
  buttons.forEach(addListener);
  function addListener(button) {
    button.style.cursor = "pointer";
    button.addEventListener("click", addColor);
  }
}

function addColor() {
  //   console.log("click color");
  //   console.log(this.getAttribute("fill"));
  elementToPaint.style.fill = this.getAttribute("fill");
  document.querySelectorAll(".g_to_interact_with").forEach(removeStroke);
}

function setElementToPaint() {
  elementToPaint = this;
  document.querySelectorAll(".g_to_interact_with").forEach(removeStroke);
  elementToPaint.style.stroke = "red";
  elementToPaint.style.strokeWidth = "2";
  //   console.log(this);
}

function removeStroke(area) {
  area.style.stroke = "none";
}

function noClickOnShadows() {
  console.log("noClickOnShadows");
  document.querySelector("#shadow_Image").style.pointerEvents = "none";
  document.querySelector("#shadow_Image-2").style.pointerEvents = "none";
  document.querySelector("#shadow_Image-3").style.pointerEvents = "none";
  document.querySelector("#shadow_Image-4").style.pointerEvents = "none";
}

function selectGroups() {
  document.querySelector("#main").classList.add("g_to_interact_with");
  document.querySelector("#flip").classList.add("g_to_interact_with");
  document.querySelector("#topheel").classList.add("g_to_interact_with");
  document.querySelector("#topfront").classList.add("g_to_interact_with");
  document.querySelector("#mainback").classList.add("g_to_interact_with");
  document.querySelector("#laces").classList.add("g_to_interact_with");
  document.querySelector("#snout").classList.add("g_to_interact_with");
  document.querySelector("#frontendbase").classList.add("g_to_interact_with");
  document.querySelector("#middlebase").classList.add("g_to_interact_with");
  document.querySelector("#basetop").classList.add("g_to_interact_with");
  document.querySelector("#seemfront").classList.add("g_to_interact_with");
}

function saveInLocalStorage() {
  console.log("save");

  //   console.log(document.querySelector("#topheel").style.fill);
  localStorage.setItem("topheel", document.querySelector("#topheel").style.fill);
  localStorage.setItem("mainback", document.querySelector("#mainback").style.fill);
  localStorage.setItem("main", document.querySelector("#main").style.fill);
  localStorage.setItem("flip", document.querySelector("#flip").style.fill);
  localStorage.setItem("laces", document.querySelector("#laces").style.fill);
  localStorage.setItem("snout", document.querySelector("#snout").style.fill);
  localStorage.setItem("frontendbase", document.querySelector("#frontendbase").style.fill);
  localStorage.setItem("middlebase", document.querySelector("#middlebase").style.fill);
  localStorage.setItem("basetop", document.querySelector("#basetop").style.fill);
  localStorage.setItem("seemfront", document.querySelector("#seemfront").style.fill);
  localStorage.setItem("topfront", document.querySelector("#topfront").style.fill);
}

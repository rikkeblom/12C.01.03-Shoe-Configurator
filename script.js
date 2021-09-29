"use strict";
//using this color picker: https://iro.js.org/guide.html
document.addEventListener("DOMContentLoaded", start);

let elementToPaint;
let colorPicker;

async function start() {
  let resp = await fetch("shoe.svg");
  let svg = await resp.text();
  document.querySelector("#shoeBox").innerHTML = svg;

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
    width: (screen.width / 100) * 20,
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
    area.style.cursor = "pointer";
    area.style.fill = "#f2ecde";
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

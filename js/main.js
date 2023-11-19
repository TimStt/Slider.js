import { slider } from "../moduls/slider_module.js";

const elements = {
  slider: document.querySelector(".slider__wrapper"),
  squere: document.querySelector(".slider__visible"),
  images: document.querySelectorAll(".slider__visible img"),
  pagination: document.querySelectorAll(".slider__pagination button"),

  // кнопки
  btns: document.querySelectorAll(".slider__btn"),
};

slider(elements, 1, true);

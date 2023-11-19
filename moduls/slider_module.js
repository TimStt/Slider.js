export function slider(nameObject, countVisibleImg, hasButton = false) {
  let isDragStart = false,
    isDragging = false,
    isMoving = false,
    countAbout = 0,
    widthImage = 0,
    valueDiff;

  let prevageX, prevScrollLeft, positionDiff;

  // ----- начало движения сажатой лкм -----
  const dragStart = (e) => {
    isDragStart = true;

    prevageX = e.pageX || e.touches[0].pageX; // начальная точка мыши
    prevScrollLeft = nameObject.squere.scrollLeft;
    console.log("гор скрол = " + prevScrollLeft);
  };
  // ----- начало движения сажатой лкм -----
  // ----- движение сажатой лкм -----
  const dragging = (e) => {
    if (!isDragStart || isMoving) return;
    // разница между начальной точкой мыши и конечной
    positionDiff = (e.pageX || e.touches[0].pageX) - prevageX;
    isDragging = true;

    nameObject.squere.scrollLeft = prevScrollLeft - positionDiff;
    nameObject.squere.classList.add("dragging");
    e.preventDefault();
  };
  // ----- движение сажатой лкм -----
  // ----- конец движения сажатой лкм -----
  const dragStop = () => {
    if (!isDragging) return;
    isDragging = false;
    nameObject.squere.classList.remove("dragging");
    isDragStart = false;

    autoSlide();
  };
  // ----- конец движения сажатой лкм -----
  // ------- высчитываем автоскрол  -------
  const autoSlide = () => {
    if (
      nameObject.squere.scrollLeft == 0 ||
      nameObject.squere.scrollLeft >=
        nameObject.squere.scrollWidth - nameObject.slider.offsetWidth - 3
    )
      return;
    widthImage =
      nameObject.images[0].clientWidth +
      parseInt(getComputedStyle(nameObject.images[1]).marginLeft || 0);
    positionDiff = Math.abs(positionDiff); // избавляемся от минуса
    valueDiff = widthImage - positionDiff; // вычисляем разницу между шириной изображения и пройденным расстоянием
    nameObject.squere.scrollLeft > prevScrollLeft
      ? movingDragging(1)
      : movingDragging(-1);
  };
  // ------- высчитываем автоскрол  -------
  // ------- перемещение с помощью мыши -------
  const movingDragging = (side) => {
    if (positionDiff > widthImage / 3) {
      /* прибавляем или убавляем в зависимости от направления мыши 
   к значению на которое уже проскролили слайдер 
   */
      nameObject.squere.scrollLeft +=
        (valueDiff + (countVisibleImg == 1 ? 0 : widthImage)) * side;
      pagActive(counter(side));
    } else {
      nameObject.squere.scrollLeft -= positionDiff * side;
    }
  };
  // ------- перемещение с помощью мыши -------
  // ------- счетчик -------
  const counter = (side) => {
    switch (side) {
      case 1:
        if (countAbout >= nameObject.images.length / countVisibleImg - 1) break;
        countAbout += 1;
        break;
      case -1:
        if (countAbout <= 0) break;
        countAbout = countAbout - 1;
        break;
    }
    console.log(countAbout);
    return countAbout;
  };
  // ------- счетчик -------
  // ------- активация кнопок пагинации -------
  const pagActive = (countAbout) => {
    nameObject.pagination.forEach((pag, indexPag) => {
      pag.classList.remove("slider__pagination__btn__active");
      switch (indexPag) {
        case countAbout:
          pag.classList.add("slider__pagination__btn__active");
          break;
        default:
          pag.classList.remove("slider__pagination__btn__active");
          break;
      }
    });
  };
  // ------- активация кнопок пагинации -------
  // ------- перемещение слайдера после нажатия на пагинацию или по кнопке (если hasButton true)  -------
  const movingSlide = (indexPag) => {
    pagActive(indexPag);
    widthImage =
      nameObject.images[0].clientWidth +
      parseInt(getComputedStyle(nameObject.images[1]).marginLeft || 0);
    countAbout = indexPag;

    nameObject.squere.scrollLeft = widthImage * countVisibleImg * indexPag;
  };
  // ------- перемещение слайдера после нажатия на пагинацию или по кнопке (если hasButton true)  -------
  // ------- вешаем событие клика на кнопку или пагинацию  -------
  const clickHendler = (elSlider) => {
    elSlider.forEach((pag, indexPag) => {
      pag.addEventListener("click", () => {
        if (elSlider === nameObject.btns) {
          movingSlide(counter(indexPag === 1 ? 1 : -1));
          // определяем направление движения слайдера по индексу нажатой кнопки (назад / вперед)
        } else {
          movingSlide(indexPag);
        }
      });
    });
  };

  clickHendler(nameObject.pagination);
  if (hasButton) clickHendler(nameObject.btns); // вызываем слушатель если есть кнопки

  // ------- вешаем функции к событиям   -------
  nameObject.squere.addEventListener("mousemove", dragging);
  nameObject.squere.addEventListener("touchmove", dragging);

  nameObject.squere.addEventListener("mousedown", dragStart);
  nameObject.squere.addEventListener("touchstart", dragStart);

  nameObject.squere.addEventListener("mouseup", dragStop);

  nameObject.squere.addEventListener("mouseleave", dragStop);
  nameObject.squere.addEventListener("touchend", dragStop);

  window.addEventListener("load", () => movingSlide(countAbout));
  window.addEventListener("resize", () => movingSlide(countAbout));
  // ------- вешаем функции к событиям   -------
}

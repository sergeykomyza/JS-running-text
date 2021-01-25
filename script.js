let wrapBox = document.querySelector('.running__box'),
    runningText = document.querySelector('.running__text'),
    wrapBoxWidth = wrapBox.offsetWidth, // ширина родительского блока
    runningTextWidth = runningText.scrollWidth; // ширина блока с текстом
    let intervalId = setInterval(() => {
        move();
    }, 10);

// функция работы бегущей строки
function move() {
    /* получаем стили свойства transform у runningText. Они представлены в формате - matrix(1, 0, 0, 1, 0, 0) 
    При помощи метода split разбиваем значения на массив*/
    let currentStyle = getComputedStyle(runningText).transform.split(',');
    // обращаемся к четвертому элементу массива(который отвечает за смещение по горизонтали). если он - undefined
    if (currentStyle[4] === undefined) {
        // то переменной currentStyle присваиваем единицу
        currentStyle = -0.5;
    } else {
        // иначе смещаем элемент на единицу
        currentStyle = currentStyle[4] - 0.5;
    }
    // если значение currentStyle станет больше чем ширина блока с текстом (т.е скрывается весь текст)
    if (-currentStyle >= runningTextWidth) {
        // то перебрасываем текст в начало
        runningText.style.transform = 'translateX(' + wrapBoxWidth + 'px)';
    } else {
        // иначе продолжаем смещение влево
        runningText.style.transform = 'translateX(' + currentStyle + 'px)';
    }
}

// по наведению на строку, останавливаем ее
wrapBox.addEventListener('mouseenter', () => {
    clearInterval(intervalId);
});

// при выведении курсора с строки, продолжаем работу
wrapBox.addEventListener('mouseleave', () => {
    intervalId = setInterval(() => {
        move();
    }, 10);
});



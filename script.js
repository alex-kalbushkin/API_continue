/*
addEventListener('DOMContentLoaded', () => {
  const mouseArea = document.getElementById('mouse-area');


  //события мыши
  //Event (базовое событие)
  //MouseEvent (класс, наследуемый от Event, и кроме этого содержит доп. инфо (координаты, и. др. мыши))

  //mousedown / mouseup
  mouseArea.addEventListener('mousedown', event => {  // сработает при нажатии кнопки мыши вниз (event - объект события)
    const {           //делаем деструктурирование (забираем свойства screenX, screenY из объекта event)
      screenX,        //положение мыши на экране по оси X
      screenY,        //положение мыши на экране по оси Y
      clientX,        //клиентские координаты X
      clientY,        //клиентские координаты Y
      altKey,         //состояние нажатых клавиш alt
      shiftKey,       //состояние нажатых клавиш shift
      ctrlKey,        //состояние нажатых клавиш ctrl
      button,         //номер кнопки мыши: 1 - колесо, 2 - правая, 0 - левая.
    } = event;

    console.log(`Screen: ${screenX} ${screenY}`);
    console.log(`Client: ${clientX} ${clientY}`);
    console.log(`Alt: ${altKey}`);
    console.log(`Shift: ${shiftKey}`);
    console.log(`Ctrl: ${ctrlKey}`);
    console.log(`Button: ${button}`);
  });

  mouseArea.addEventListener('mouseup', () => {   // сработает при нажатии кнопки мыши вверх
    console.log('Up!');
  });

  mouseArea.addEventListener('mouseenter', () => {    //при наведении мыши на блок
    mouseArea.classList.add('hover');
  });

  mouseArea.addEventListener('mouseleave', () => {    //при покидании мышью блока
    mouseArea.classList.remove('hover');
    mouseArea.innerHTML = '';                         //очищаем (при покидании блока, очищаем координаты мыши, которые появились при событии mousemove, которое внизу)
  });

  mouseArea.addEventListener('mousemove', event => {
    mouseArea.innerHTML = `${event.clientX} / ${event.clientY}`;    //движение мыши в области 
  });

  mouseArea.addEventListener('wheel', event => {
    mouseArea.innerHTML = `Scroll: ${event.deltaY}`;    //delta - на сколько отскролили по Y (есть deltaX, deltaZ), т.е. разница в скролле
  });

  mouseArea.addEventListener('contextmenu', event => {   //событие открытия контекстного меню
    event.preventDefault();                              //запрет открытия контекстного меню. (preventDefault - запрет действия по умолчанию)
   // console.log('Context menu!');
  });

  mouseArea.addEventListener('mouseover', () => {});      //это как событие mouseenter, только с баблингом(можно ловить на родителе)
  mouseArea.addEventListener('mouseout', () => {});       //это как событие mouseleave, только с баблингом(можно ловить на родителе)
});

//----------------------------------------------------
*/

/*
addEventListener('DOMContentLoaded', () => {
  const clipboardArea = document.getElementById('clipboardArea');

  //ClipboardEvent - событие буфера обмена

  clipboardArea.addEventListener('copy', event => {        //событие при копировании в буфер обмена
    console.log('Copy');
    console.log(event);                                    //выводим само событие ClipboardEvent
    //event.preventDefault();                              //запрет копирования  
  });

  clipboardArea.addEventListener('cut', event => {         //событие при вырезании в буфер обмена
    console.log('Cut');
    console.log(event);                                    //выводим само событие 
    //event.preventDefault();                              //запрет вырезания  
  });

  clipboardArea.addEventListener('paste', event => {       //событие при вставке из буфера обмена (часто используется в textarea)
    console.log('Paste');
    console.log(event);                                    //выводим само событие 
    //event.preventDefault();                              //запрет вставки
  });

  clipboardArea.addEventListener('select', event => {       //событие при выделении 
    console.log('Select');
    console.log(event);                                   
    //event.preventDefault();                             
  });
  
});

*/

//------------------------------------------------------------

//Типы приложений:

//Classic - (php, python, etc) - постоянный запрос на сервер, который строит страницы
//SPA - (single page application - frontend, шаблон страницы (index.html - маленький) и один js файл(bundle - большой, который отрабатывает на клиенте) в конце, 
//      после запуска делаются запросы на СЕРВЕР, строится станица на клиенте), for example - gmail.
//SSR - (server side rendering - код может быть отрендерен и на сервере и у пользователя, это как SPA, но с возможностью render частично на сервере).


//SPA:
//API история навигации:

addEventListener('DOMContentLoaded', () => {  
  // history.back(); - программно в истории назад
  // history.forward() - программно в истории вперед
  // history.go(2); - программно на несколько шагов
  // history.length - глубина истории (сколько записей в истории от нуля)
  // history.state - state-объект  - визуальное состояние приложения (первый параметр в history.pushState())
  const links = document.querySelectorAll('nav ul li a');     //получаем все ссылки массивом 



  const avatar = document.getElementById('avatar');               //ЛЕКЦИЯ 3
  const preview = document.getElementById('preview');

 
 
  setInitialState();                  //сбрасываем историю с помощью функции (функция ниже) (лекция 2)
  render();                           //вызываем функцию рендера первый раз, чтобы страница первый раз отрисовалась (лекция 2)




  avatar.addEventListener('change', () => {         //ЛЕКЦИЯ 3
    //console.log(avatar.files);                     //files - атрибут (в нем находится объект FILE), выбираем картинку и смотрим devtools console    ЛЕКЦИЯ 3
    const reader = new FileReader();                 //FileReader - объект, который читает файлы, у него есть свои методы чтения   
    const [file] = avatar.files; 

    if (file) {
      reader.addEventListener('load', () => {         //событие load - когда файл загружен в reader
      preview.src = reader.result;                    //reader.result - результат чтения reader (потом присваивается ссылка на выбранную картинку)
      });

      reader.readAsDataURL(file);                 //т.е. прочитать файл как dataURL
    }
  });




  addEventListener('popstate', event => {                //отрабатывает при изменении состояния (у нас сработает, если понажимать на ссылки, а потом нажать стрелки назад-вперед), popstate - отрабатывает при действии пользователя(стрелки вперед-назад в браузере)     
    render(event.state);                                 //перерендер (лекция 2)
  }); 

  //history.state - history - это объект хранящий массив объектов состояний, state - текущее состояние в истории
  //event.state - event - объект события, state - его текущее состояние

  links.forEach(link => {                               //перебераем элементы массива и запрещаем переход по ссылке (preventDefault())
    link.addEventListener('click', event => {
      event.preventDefault();  
      
      //console.log(link.dataset);                  //dataset - объект со свойствами элемента HTML(лекция 2)
      const newState = {url: link.dataset.name};    //лекция 2

      runProgress(() => setState(newState, link.href));                //ЛЕКЦИЯ 3 (запуск функции для прогресс бара)

                          
      history.pushState({}, link.href, link.href);        //записывает переход по ссылке, не переходя по ней (иммитация перехода), в скобках три параметра(state-объект, title-название состояния в истории, URL-адрес)
    });                                                   //link.href - это имя ссылки на которой событие произошло (оно появится в адресной строке: http://localhost:3000/home или http://localhost:3000/about или http://localhost:3000/contact)
  
    //history.replaceState({}, link.href, link.href);   //замена текущей истории, а не запись истории     

  });
});

//lecture 2: 

//state (формализованное состояние (в виде объекта), описывающее состояние приложения в определенный момент времени)
//render - превращение state в интерфейс(перерисовка интерфейса согласно state(state - входные данные)), т.е. визуализация
//routing - навигация внутри приложения на стороне клиента

function setInitialState() {
  const initialState = {
    url: 'home',              //начальное состояние (адрес первой страницы)
  };  
  history.replaceState(initialState, '', ''); //сброс истории и запись текущего состояния 
  updateView(initialState.url);
}

function setState(state, href) {              //установка состояния
  const newState = {
    ...history.state,   //через spread мержим
    ...state,
  };

  history.pushState(newState, href, href); //запись в историю
  render(newState);                        //перерендериваем, передавая состояние

  //localStorage.setItem('currentState', JSON.stringify(newState));   //localStorage - глобальный объект; setItem - функция записи; 'currentState' - ключ (как имя поля, сами придумали), JSON используем, чтобы работать со строкой, передать именно строку (иначе покажет нам object-object): смотреть в инструменте разработчика
  updateView(newState.url);  //просмотр в F12 -> aplication -> Local storage -> localhost:3000
}

function render(state = history.state) {      //в скобках параметр по умолчанию В ЛЕКЦИИ 3 изменили функцию RENDER

  const sections= document.querySelectorAll('main section'); 
  const sectionId = `${state.url}-page`;   //присваиваем переменной адресс текущей страницы

  sections.forEach(section => {
    if (section.id === sectionId) {
      section.classList.remove('hidden');
    } else {
      section.classList.add('hidden');
    }
  });
 
}

function updateView(url) {      //функция, которая обновляет количество просмотров конкретной страницы (home, about, contact)
  const key = `views.${url}`;

  const views = parseInt(localStorage.getItem(key) || '0', 10);     //(10 - основание системы исчисления) 

  localStorage.setItem(key, views + 1); //к начальному состоянию, равному 0 - добавляем по 1 за каждый просмотр
}




//URL
//адрес состоитиз: 'схема-(https)' ':-(двоеточие)' '//-(двойной слеш)' 'host-(ru.wikipedia.org)' 'дальше путь-/wiki/URL' со знака вопроса идет запрос (параметр=значение&параметр1=значение1, & - это разделитель параметров), # - это хеш(как якорь, не перезагружает страницу)
//https://ru.wikipedia.org/wiki/URL?name=value&name1=value1#test

//--------------

//объект location
//location - адресная строка (открыт для чтения и для записи)


/*
location.href - это поле - адрес целиком, т.е. весь путь
location.protocol - https
location.host - сам адрес + порт (например 3000)
location.hostname - только адрес
location.part
location.pathname - путь
location.search - querystring (запрос от вопроса ?)
location.hash
location.username
location.password
location.origin - 
*/

console.log(location);

//методы location

//location.assign('https://...'); //замена адреса с перезагрузкой страницы(assign делает запись в истории)
//location.replace('https://...'); //замена адреса с перезагрузкой страницы (replace не делает запись в истории)
//location.reload(); //перезагрузка страницы (осторожно)
//location.toString();   //возвращает URL (строковое представление)

//---

addEventListener('hashchange', () => {        //событие изменения хеша
  //...
});

location.hash = '123';    //все поля location доступны для записи (все поля при изменении перезагрузят страницу, кроме хеша)



//ХРАНЕНИЕ ДАННЫХ НА КЛИЕНТСКОЙ ЧАСТИ

//---

//Cookie (вкладка Aplication в инструментах рахработчика), старый способ
//document.cookie - (на js будет скрыто), читается сервером

//---

//Local Storage (в основном работаем с ним) - эта информация не стирается (если перезагрузить страницу, закрыть браузер -  информация ОСТАНЕТСЯ) - при очистке кеша браузера очистится
/*
localStorage.setItem();
localStorage.getItem();
localStorage.removeItem();
*/

//---

//Session storage - всемя жизни информации = время жизни вкладки (если перезагрузить вкладку, она останется; если закрыть вкладку - пропадет)
/*
sessionStorage.setItem();
sessionStorage.getItem();
sessionStorage.removeItem();
*/

//---

//Index DB - локальная база данных (не для нашего курса)



//ЛЕКЦИЯ 3  

function runProgress(callback) {                        //запускаем в строке 136 (функция создает заполняющийся прогресс-бар при клике на ссылку), заполнение от нуля до 100.
  const progress = document.getElementById('loading');
  progress.value = 0; //обнуляем прогресс-бар

  const intervalId = setInterval(() => {
    progress.value += 10;

    if (progress.value >= progress.max) {
      clearInterval(intervalId);
      callback();
    }
  }, 100);

}



//СТАНДАРТ MIME (MIME-типы): (пример: text/css)

// https://ru.wikipedia.org/wiki/%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA_MIME-%D1%82%D0%B8%D0%BF%D0%BE%D0%B2



















# Проектная работа. МБОУ АЛГОСОШ им. Фибоначчи

Проектная работы заключается в визуализации работы следующих алгоритмов:
 
- [Разворот строки](#Строка)
- [Генерация последовательности чисел Фибоначчи](#Последовательность-Фибоначчи)
- [Сортировки выбором и пузырьком](#Сортировка-массива)
- [Структура данных "Стек"](#Стек)
- [Структуру данных "Очередь"](#Очередь)
- [Структура данных "Связный список"](#Связный-список)

[дизайн проекта](https://www.figma.com/file/RIkypcTQN5d37g7RRTFid0/Algososh_external_link?node-id=0%3A1)


## Строка

Алгоритм разворота строки.

**Визуализация**

![Строка в исходном виде](README_static/Untitled%201.png)

Строка в исходном виде

На скриншоте показана строка, в которой поменяли местами крайние символы:

![Промежуточный этап разворота строки](README_static/Untitled%202.png)

Промежуточный этап разворота строки

## Последовательность Фибоначчи

Генерация `n` чисел последовательности Фибоначчи. 

**Визуализация**

![Сгенерированная последовательность](README_static/Untitled%204.png)

Сгенерированная последовательность

## Сортировка массива

Алгоритмы сортировки выбором и пузырьком

**Визуализация**

![Начальное состояние страницы](README_static/Untitled%205.png)

Когда вы нажмёте «По убыванию» или «По возрастанию», должен запуститься процесс сортировки в зависимости от выбранного способа: выбором или пузырьком.

---

## Стек

Визуализация удаление и добавление элементов в структуру данных стек

**Визуализация** 

![Начальное состояние страницы](README_static/Untitled%206.png)

---

## Очередь

Визуализация удаления и добавления элементов в структуру данных «очередь».

**Визуализация**

![Начальное состояние страницы](README_static/Untitled%207.png)

Начальное состояние страницы

Если ввести в инпут значение 2 и нажать «Добавить», элемент должен отобразиться под индексом 0.

![Очередь с одним элементом](README_static/Untitled%208.png)

Очередь с одним элементом

![Очередь из трёх элементов в момент добавления](README_static/Untitled%209.png)

Очередь из трёх элементов в момент добавления

Теперь если нажать «Удалить», из очереди должен извлечься элемент под индексом 0, a `head` будет перемещён на элемент с индексом 1.

![Очередь после `dequeue();`](README_static/Untitled%2010.png)

---

## Связный список

Реализация удаления и добавления элементов в связный список.

### Визуализация

![Начальное состояние страницы](README_static/Untitled%2011.png)

Начальное состояние страницы

**При добавлении в head** элемент должен появиться над первым элементом вместо надписи head.

![Добавление в head](README_static/Untitled%2012.png)

Добавление в head

Затем он занимает первое место в списке и на долю секунды выделяется зелёным цветом. Теперь над новым элементом написано head, и он указывает на предыдущий head-элемент.

![Отображение нового элемента в head](README_static/Untitled%2013.png)

Отображение нового элемента в head

![Добавление по индексу. Поиск индекса](README_static/Untitled%2014.png)

Добавление по индексу. Поиск индекса

![Добавление по индексу. Новый элемент в списке](README_static/Untitled%2015.png)

Добавление по индексу. Новый элемент в списке

**При удалении элемента по индексу** сначала необходимо выделять цветом элементы, пока не достигнем нужного индекса. Затем очистить значение в элементе и снизу отобразить маленький кружок с удаляемым значением.

Например, вы ввели индекс 2 и нажали «Удалить по индексу». Сначала цветом выделяется элемент с индексом 0, потом с индексом 1, и когда мы дошли до нужного индекса, то удаляем элемент из связного списка:

![Удаление элемента под индексом 2](README_static/Untitled%2016.png)

Удаление элемента под индексом 2

**При удалении элемента из tail** кружок замещает надпись tail.

![Удаление элемента из tail](README_static/Untitled%2017.png)

Удаление элемента из tail

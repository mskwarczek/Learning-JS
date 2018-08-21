/*
Połączenie dwóch stringów przy użyciu operatora + jest bardzo łatwym zadaniem. Innym sposobem jest użycie metody concat albo join, ale co jeśli nie moglibyśmy skorzystać z żadnej z tych opcji? Twoim zadaniem będzie stworzenie dwóch zmiennych z wartościami Hello oraz World, a następnie połączenie ich metodą inną niż wymienione powyżej.
*/

function connectTwoStrings() {
    const first = 'Hello';
    const second = 'World';
    const connected = `${first} ${second}`;
    return connected;
}

console.log(`Task 1: ${connectTwoStrings()}\n`);

/*
Stwórz funkcję multiply, która ma zwracać wynik działania operacji mnożenia dwóch wartości a i b. Przykładowo:

multiply(2, 5) // 10
multiply(6, 6) // 36
Zadanie wydaje się być proste, ale co jeśli użytkownik poda na wejściu tylko jedną wartość? Przykładowo:

multiply(5) // ?
Chcemy, aby wynik takiego wywołania był również prawidłowy - możesz założyć, że jeśli użytkownik nie poda któregoś z parametrów, ma on zostać zastąpiony 1. Nie wolno korzystać z instrukcji warunkowych! Funkcję stwórz za pomocą arrow function.
*/

const multiply = (a = 1, b = 1) => (a * b);

console.log(`Task 2: multiply(5, 6) = ${multiply(5, 6)}; multiply(5) = ${multiply(5)}\n`);

/*
Napisz funkcję average, która obliczy średnią arytmetyczną wszystkich argumentów, które zostaną do niej przekazane. Załóż, że argumenty zawsze będą liczbami:

average(1) // 1
average(1, 3) // 2
average(1, 3, 6, 6) // 4
Skorzystaj z rest parameters! Funkcję stwórz za pomocą arrow function.
*/

const average = (...args) => args.reduce(((suma, arg) => suma + arg), 0) / args.length;

console.log(`Task 3: average(1, 3, 6, 6) = ${average(1, 3, 6, 6)}; average(100, 50, 200, 10) = ${average(100, 50, 200, 10)}\n`);

/*
Stwórz tablicę z ocenami const grades = [1, 5, 5, 5, 4, 3, 3, 2, 1], a następnie w umiejętny sposób przekaż oceny do funkcji average tak, aby otrzymać wynik. Skorzystaj z operatora spread!
*/

const grades = [1, 5, 5, 5, 4, 3, 3, 2, 1]

console.log (`Task 4: average(...grades) = ${average(...grades).toFixed(2)}\n`);

/*
Podczas pracy nad projektem natknąłeś się na bardzo dziwną strukturę danych - [1, 4, 'Iwona', false, 'Nowak']. Twoim zadaniem jest skorzystanie z destrukturyzacji w celu wyciągnięcia z tablicy zmiennych firstname oraz lastname.
*/

const data = [1, 4, 'Iwona', false, 'Nowak'];
const [ , , firstname, , lastname] = data;

console.log (`Task 5: firstname: ${firstname}; lastname: ${lastname}\n`);

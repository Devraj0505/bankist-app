'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
// THIS IS THE DATA WE ARE GONNA USE FOR THE BANKIST APP
// ALTHOUGH WE USUALLY FETCH DATA FROM THE API API DATA ALWAYS COME IN THE FORM OF OBJECTS
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer'); //
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to'); //
const inputTransferAmount = document.querySelector('.form__input--amount'); //
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//! movements
const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = ` <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${mov}€</div>
        </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// displayMovements(account1.movements); // passing the movewments array of account1 object

// console.log(containerMovements.innerHTML); // it will print all the inner html part of container that is selected
// on the line 50 const containerMovements = document.querySelector('.movements');

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, curr) => {
    return acc + curr;
  }, 0);
  // acc.balance = balance;
  labelBalance.textContent = `${acc.balance}€`;
};
// calcDisplayBalance(account1.movements);

// summary of balance
// for incoming money
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov >= 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  //ougoing money
  const out = acc.movements
    .filter(mov => mov <= 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  //intererst
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, val) => acc + val, 0);
  labelSumInterest.textContent = `${interest}€`;
};
// calcDisplaySummary(account1.movements);

// Computing username
const CreateUserName = function (accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => {
        // in the callback fucntion the function always have to return a value
        return name[0];
      })
      .join('');
  });
};

CreateUserName(accounts);
console.log(accounts);

// const user = 'Steven Thomas Williams';

// .value = > works woth the form fields
// .textContent => works with the text element

const updateUI = function (acc) {
  //  display movements
  displayMovements(acc.movements); // choosing current account bcs we need to remember which account is currently active

  //  display balance
  calcDisplayBalance(acc);

  // display summary
  calcDisplaySummary(acc);
};

let currentAccount; // defining this here because we are gonna use it later in that code thats why didn't define this under the function
// the button is inside teh form element clikcking it triggers the form's submit action -> which reloads the page
btnLogin.addEventListener('click', function (e) {
  // stops the form from reloading the page // this is a method that's generally block the browser default action
  e.preventDefault();
  // console.log('LOGIN');
  // .value => holds the user input in at runtime
  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // display ui and welcome message
    labelWelcome.textContent = `Welcome Back ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 1;

    // clear the input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur(); // built in dom method in js is used on an input(or any focusable elements like buttons, textAreas, links )
    // it removes the focus from the element

    // Updatea ui
    updateUI(currentAccount);
  }
});

// IMPLEMENTING TRANSFERS

// const btnTransfer = document.querySelector('.form__btn--transfer');  //
// const inputTransferTo = document.querySelector('.form__input--to'); //
// const inputTransferAmount = document.querySelector('.form__input--amount');  //
// transfers
// this is also the form tthe form will behave in default by clicking or entering thats why we put the preventDefault
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.userName === inputTransferTo.value // what does it do? this will check with the input provided by the user and returns it to the recieverAcc
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.userName
  ) {
    // doing the transfers
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Updatea ui
    updateUI(currentAccount);
  }
});

// FindIndex
// closing an account using find index method
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  // the pin will be stores as a string '1111' input by the user
  if (
    inputCloseUsername.value == currentAccount.userName &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.userName === currentAccount.userName
    );
    console.log(index);
    // delete account
    accounts.splice(index, 1);
    // hide acc
    containerApp.style.opacity = 0;
  }
  //putting the value empty again after use
  inputCloseUsername = inputClosePin = '';
});

// REQUEST AMOUNT LOAN
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    //add movements
    currentAccount.movements.push(amount);

    //Update ui
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
//! Lectures
console.log('practice-----------------------------');

/* const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]); */

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// methods are simply function that we can call on objects
let arr = ['a', 'b', 'c', 'd', 'e'];

//SLICE : always returns an new array
console.log(arr.slice(2)); // this will not mutate the original array instead it will return a new whole array with slicing according the index
console.log(arr.slice(2, 4));
console.log(arr.slice(-2)); //last 2 element
console.log(arr.slice(1, -2));
//shallow copy of array
console.log(arr.slice());
//or we can do it with spread operator
console.log([...arr]);

// SPLICE
// splice mutate the actual array
console.log(arr.splice(2)); //['c' ,'d' ,'e']
console.log(arr);
arr.splice(-1);
console.log(arr); //['a', 'b'];
// arr.splice(1, 2);
// console.log(arr);

// REVERSE
// this also mutate the original array
const arr1 = [1, 2, 3, 4, 5, 6, 7];
console.log(arr1.reverse());
console.log(arr1); // same answer bcs reverse method has mutate the origianl  array

// CONCAT : doesnot mutate the original array
// this is used to concat the two methods
const con = arr.concat(arr1);
console.log(con);

// or we can also cancat the two arrays with spread operator
console.log([...arr, ...arr1]);

// JOIN: returns an new string
console.log(con.join('-'));

// THE NEW AT METHOD : to access specific element
const arra = [23, 11, 45];
console.log(arra[0]); // accessing an element

// accessing element with at
console.log(arra.at(0));

// accesing the last element
// lets suppose we didnt what the least element position is
console.log(arra[arra.length - 1]); //usual method
// or by slicing
console.log(arra.slice(-1)); // thsi will return an array of last element [45] but to access eleement we can acces from that array also by jut putting arra.slice(-1)[0] it will give the element of that array 45
console.log(arra.slice(-1)[0]);

// new method: at can acces any position
console.log(arra.at(-1));

// at method can also access the string
console.log('hello'.at(0));
console.log('hello'.at(-1));

const test = ['a', 'b', 'c'];
console.log(test.slice(-2)[0]);
console.log(test.at(-2)); // directly accessing the element

// LOOPS : FOR EACH
// WE ALSO KNOW HOW TO LOOP OVER AN ARRAY USING FOR OF LOOP

// FOR EACH
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
for (const movement of movements) {
  if (movement > 0) {
    console.log(`you deposited ${movement}`);
  } else {
    console.log(`you withdraw ${Math.abs(movement)}`); //math.abs give absolute value it removes the - + sign and give the abs value
  }
}
// mine idea = that i will push the positive elem to positive empty arrat and negative one to negative
// that is not working as a whole bcs the elem is pushef one by one and in the console itself is printing one by one elem like: 200 then 200,450, then 200,450,3000

// what i was doing
/* const positive = [];
const negative = [];

for (const movement of movements) {
  if (movement > 0) {
    positive.push(movement);
    console.log(positive);
  } else {
    negative.push(movement);
    console.log(negative);
  }
} */
/* 
  // what should have i done
  const positive = [];
const negative = [];

for (const movement of movements) {
  if (movement > 0) {
    positive.push(movement);
  } else {
    negative.push(movement);
  }
}

console.log('Deposits:', positive);   // [200, 450, 3000, 70, 1300]
console.log('Withdrawals:', negative); // [-400, -650, -130] */

// so to achieve the same thing we can use for each
// that uses callback function
console.log('----for each loop---');

movements.forEach(function (movement) {
  if (movement > 0) {
    console.log(`you deposited ${movement}`);
  } else {
    console.log(`you withdraw ${Math.abs(movement)}`);
  }
});
// 0: function (200)
// 1: function(450)
// 2: function(40O)

console.log('---wtih entries');

// by each entries on for of loop to get the index
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement${i + 1} :you deposited ${movement}`);
  } else {
    console.log(`Movement${i + 1} :you withdraw ${Math.abs(movement)}`);
  }
}
// using for each loop
console.log('---for each loop');

movements.forEach(function (mov, i, arr) {
  // here instead of using entries method we can use on arguments
  if (mov > 0) {
    console.log(`Movement ${i + 1} :you deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1} :you withdraw ${Math.abs(mov)}`);
  }
});

// the main difference between for of and forEach loop is we can't break through the forEach loop but we can break, continue in for of loop

// For each on maps and sets
console.log('--forEach on maps and sets---');

//MAP
const currencies = new Map([
  ['USD', 'United States dollar'], //USD IS KEY , AND United States dollar THIS SI THE VALUE
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// SETS
// in sets we dont have either any key or any index value
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, _, map) {
  /*we dont have any key or index thats why_ */ console.log(
    `${value}: ${value}`
  );
});

///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
const dogsJulia = [3, 5, 2, 12, 7];
const dogsKate = [4, 1, 15, 8, 3];

// console.log(dogsJulia.slice(-2));

// const dogJulia1 = dogsJulia.slice();
// console.log(dogJulia1);
// FIRST and the LAST TWO dogs actually have cats, not dogs!

// 2.

/* const correct = ([...newJulia] , [...dogsKate]);
console.log(correct); */

// 3.
const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCorrected = dogsJulia.slice();
  dogsJuliaCorrected.splice(0, 1); // we actuaaly didn't mutate the array
  dogsJuliaCorrected.splice(-2); // we actuaaly didn't mutate the array

  const dogs = dogsJuliaCorrected.concat(dogsKate);
  console.log(dogs);

  dogs.forEach((dog, i) => {
    if (dog >= 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy 🐶`);
    }
  });
};
checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

// map methods
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300]; //on line 167
console.log(movements);

const eurToUsd = 1.1;

// by map method in the array .Map will not mutate the new array instead it will return the whole new array
// map working is similar to the forEach method its just it returns the whole new array  // callback function
const movementsUSD = movements.map(function (mov) {
  return mov * eurToUsd;
});

console.log(movementsUSD);

// similar with the use of for of loop
// but here we are simply loop overing the array and in the map method we are doing that in the function
const movementsUSDfor = [];
for (const mov of movements) {
  movementsUSDfor.push(mov * eurToUsd); // pushing the element in an array
}
console.log(movementsUSDfor);

// just like forEach method map method also have the three parameters
/* movements.forEach(function(mov, i , arr){ // here instead of using entries method we can use on arguments
    if(mov>0){
    console.log(`Movement ${i+1} :you deposited ${mov}`);
  }else{
    console.log(`Movement ${i+1} :you withdraw ${Math.abs(mov)}`);
  }
}); */
// by map method
const movementsDescription = movements.map(
  (mov, i, arr) =>
    `movement ${i + 1} : you ${mov > 0 ? 'deposited' : 'withdraw'} ${Math.abs(
      mov
    )}`
);
console.log(movementsDescription);

//by filter method
const deposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log(movements);
console.log(deposits);

// by normal way
const depositFor = [];
for (const mov of movements) {
  if (mov > 0) {
    depositFor.push(mov);
  }
}
console.log(depositFor);

const withdrawls = movements.filter(function (mov) {
  return mov < 0;
});
console.log(withdrawls);

// reduce method: it is a method to boild down all the elements in an array to single value
// syntax
// accumalator => SNOWBALL
// Array.reduce(function(accumalator, current, current index, array ){})

console.log('reduce method in an array ');
console.log(movements);

// 0 is the initial value of the accumulator
// const balance = movements.reduce(function(acc, curr, i, arr){
//   console.log(`Iteration ${i}: ${acc}`);
//   return acc+curr;
// }, 0);
// console.log(balance);
const balance = movements.reduce((acc, curr) => {
  return acc + curr;
}, 0);
console.log(balance);

let sum = 0;
for (const mov of movements) {
  sum += mov;
}
console.log(sum);

// maximum  // reduce method go through the every element in the array
console.log(movements);
const newmov = [200, 450, -400, 3000, -650, -130, 70, 4000];

const max = newmov.reduce(function (acc, mov) {
  if (acc > mov) {
    return acc;
  } else {
    return mov;
  }
}, newmov[0]);
console.log(max);

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, 
they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. 
If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
/* const dogsJulia = [3, 5, 2, 12, 7];
const dogsKate = [4, 1, 15, 8, 3];
 */
/*  const calcAverageHumanAge = function(ages){
  const humanAges = ages.map(age=>{
    if(age<=2) return 2* age;
  else return 16 + age*4;
  });
  return humanAges;
}; 


*/
const calcAverageHumanAge = function (ages) {
  const humanAge = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  const adults = humanAge.filter(age => age >= 18);
  console.log(humanAge);
  console.log(adults);

  const average = adults.reduce(
    (acc, curr, i, arr) => acc + curr / arr.length,
    0
  );
  // return ages;
  return average;
};

const Age1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const Age2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(Age1, Age2);

// chaining
const eurtoUsd = 1.1;
//PIPELINE
const totalDepositsUSD = movements
  .filter(mov => mov > 0) // filter provides an array
  .map(mov => mov * eurtoUsd) // map provides an array
  .reduce((acc, mov) => acc + mov, 0); // reduce provide an value
console.log(totalDepositsUSD);

///////////////////////////////////////
// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

/* const calcAverageHumanAge = function (ages){
  const humanAge = ages.map(age =>(age <=2 ? 2 * age: 16 + age * 4));
  const adults = humanAge.filter(age => age>=18);
  console.log(humanAge);
  console.log(adults);
  
  const average = adults.reduce((acc, curr, i , arr)=> acc+curr/arr.length, 0);
  // return ages;
  return average;
}

const Age1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const Age2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(Age1, Age2);
 */

// rewriting in chaining method

const calcAverageHumanAge1 = ages => {
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, curr, i, arr) => acc + curr / arr.length, 0);
};

const Age3 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const Age4 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(Age3, Age4);

// the find method : find method is to retrieve one element of an array based on condition
// find method also accepts callback function
// find method is similar to the filter method but the major difference are:
//1. filter methods returns all the elements while a find method returns an first , second element that is found from the array
//2. filter method returns an new array and find methods returns an element itself

const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

// although movements have three negative elements but the find method only returns the first element
// using find we can basically find an object in the array based on some property of that object

console.log(accounts);
const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

//  using find method we can find an specific object from an array

// by for of loop
let account_o;
for (const acc of accounts) {
  if (acc.owner === 'Sarah Smith') {
    account_o = acc;
    break;
  }
}
console.log(account_o);

// findlast and findindex method

console.log(movements);
const lastWithdrawal = movements.findLast(mov => mov < 0);
console.log(lastWithdrawal);

const FindIndex = movements.findIndex(mov => mov < 0);
console.log(FindIndex);

// 'Your latest largest large movement was x movements ago
const largestLargeMovementIndex = movements.findLastIndex(
  mov => Math.abs(mov) > 1000
);
console.log(largestLargeMovementIndex);
console.log(
  `Your latest largest large movement was ${
    movements.length - largestLargeMovementIndex
  } movements ago`
);

// EQUALITY (.INCLUDES : EXACTLY THIS VALUE )
console.log(movements.includes(-130));

// CONDITION (.SOME: AT LEAST ONE )
const anyDeposits = movements.some(mov => mov > 1500);
console.log(anyDeposits);

// EVERY
console.log(movements);

console.log(movements.every(mov => mov > 0));

console.log(account4.movements);
console.log(account4.movements.every(mov => mov > 4));

// Seperate callback : storing the callback in the variable
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

// nested array
const array = [[1, 2, 3, 4], [5, 6, 7], 8, 9];
console.log(array.flat()); // creates na new array with all sub arrays elements concatenated into it
// but it does have some depth in it like how much you wanted to flatten the array

// ex.
const arr5 = [
  [1, 2],
  [3, [4, 5]],
];
console.log(arr5.flat()); // [1, 2, 3, [4, 5]]   (flattened 1 level)
console.log(arr5.flat(2)); // [1, 2, 3, 4, 5]     (flattened 2 levels)
// [1, 2, 3, 4, 5]     (flattened 2 levels)

///////////////////////////////////////
// Coding Challenge #4

/*
This time, Julia and Kate are studying the activity levels of different dog breeds.

YOUR TASKS:
1. Store the the average weight of a "Husky" in a variable "huskyWeight"
2. Find the name of the only breed that likes both "running" and "fetch" ("dogBothActivities" variable)
3. Create an array "allActivities" of all the activities of all the dog breeds
4. Create an array "uniqueActivities" that contains only the unique activities (no activity repetitions). HINT: Use a technique with a special data structure that we studied a few sections ago.
5. Many dog breeds like to swim. What other activities do these dogs like? Store all the OTHER activities these breeds like to do, in a unique array called "swimmingAdjacent".
6. Do all the breeds have an average weight of 10kg or more? Log to the console whether "true" or "false".
7. Are there any breeds that are "active"? "Active" means that the dog has 3 or more activities. Log to the console whether "true" or "false".

BONUS: What's the average weight of the heaviest breed that likes to fetch? HINT: Use the "Math.max" method along with the ... operator.

TEST DATA:
*/
const breeds = [
  {
    breed: 'German Shepherd',
    averageWeight: 32,
    activities: ['fetch', 'swimming'],
  },
  {
    breed: 'Dalmatian',
    averageWeight: 24,
    activities: ['running', 'fetch', 'agility'],
  },
  {
    breed: 'Labrador',
    averageWeight: 28,
    activities: ['swimming', 'fetch'],
  },
  {
    breed: 'Beagle',
    averageWeight: 12,
    activities: ['digging', 'fetch'],
  },
  {
    breed: 'Husky',
    averageWeight: 26,
    activities: ['running', 'agility', 'swimming'],
  },
  {
    breed: 'Bulldog',
    averageWeight: 36,
    activities: ['sleeping'],
  },
  {
    breed: 'Poodle',
    averageWeight: 18,
    activities: ['agility', 'fetch'],
  },
];

// 1. Store the the average weight of a "Husky" in a variable "huskyWeight"
const huskyWeight = breeds.find(breed => breed.breed === 'Husky').averageWeight;
console.log(huskyWeight);

// by normal fubnction (creating it an expression )
/* const huskyWeight1 = breeds.find(function(breed) {
  return breed.breed === "Husky"
}); */

// 2. Find the name of the only breed that likes both "running" and "fetch" ("dogBothActivities" variable)
// .includes returns an boolean value either true or false
const dogBothActivities = breeds.find(
  breed =>
    breed.activities.includes('fetch') && breed.activities.includes('running')
).breed;
console.log(dogBothActivities);

// 3. Create an array "allActivities" of all the activities of all the dog breeds
const allActivities = breeds.flatMap(breed => breed.activities);
console.log(allActivities);

// 4. Create an array "uniqueActivities" that contains only the unique activities (no activity repetitions).
// HINT: Use a technique with a special data structure that we studied a few sections ago.
const uniqueActivities = [...new Set(allActivities)];
console.log(uniqueActivities);

// 5. Many dog breeds like to swim. What other activities do these dogs like?
// Store all the OTHER activities these breeds like to do, in a unique array called "swimmingAdjacent".
// to store the unique array in a particular array from the multiple array
const swimmingAdjacent = [
  ...new Set(
    breeds
      .filter(breed => breed.activities.includes('swimming'))
      .flatMap(breed => breed.activities)
      .filter(activity => activity !== 'swimming')
  ),
];
console.log(swimmingAdjacent);

// 6. Do all the breeds have an average weight of 10kg or more? Log to the console whether "true" or "false".
//  every mehod => its check the array every element
// some method => its check the array and give boolean value if any one value is available then it will give true / this is like the or operator

console.log(breeds.every(breeds => breeds.averageWeight > 10));

// 7. Are there any breeds that are "active"? "Active" means that the dog has 3 or more activities. Log to the console whether "true" or "false".
// console.log(breeds.some(breeds => breeds.activities >= 3));  // this is wrong bcs the comparison happening here is in bwtween the string and numbers
console.log(breeds.some(breeds => breeds.activities.length >= 3));

// BONUS
// what is the average weight of the heaviest breed in activities fetch

const fetchBreed = breeds
  .filter(breed => breed.activities.includes('fetch'))
  .map(breed => breed.averageWeight);
const heaviestFetchBreed = Math.max(...fetchBreed);

console.log(heaviestFetchBreed);

// Sorting arrays
console.log('sorting Arrays');

const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort()); // this will sort the array in alphabetical order

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300]; //on line 167
console.log(movements);
console.log(movements.sort());
// without a compare function, JavaScript does not sort numbers numerically.
// Instead, it converts everything to strings and sorts them lexicographically (like dictionary order).
// js first convert them into string then sort them alphabetically from lett to right.
// js concerts numbers into strings
// then it compares characters from left to right // lexicographic comparison

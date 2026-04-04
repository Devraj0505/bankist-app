'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2025-10-20T11:12:45.123Z',
    '2025-11-05T08:45:12.456Z',
    '2025-11-28T16:22:33.789Z',
    '2025-12-15T10:05:55.234Z',
    '2026-01-10T14:18:20.567Z',
    '2026-02-02T09:30:10.890Z',
    '2026-02-25T17:40:05.321Z',
    '2026-03-20T12:15:30.654Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2025-10-20T11:12:45.123Z',
    '2025-11-05T08:45:12.456Z',
    '2025-11-28T16:22:33.789Z',
    '2025-12-15T10:05:55.234Z',
    '2026-01-10T14:18:20.567Z',
    '2026-02-02T09:30:10.890Z',
    '2026-02-25T17:40:05.321Z',
    '2026-03-20T12:15:30.654Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2025-10-20T11:12:45.123Z',
    '2025-11-05T08:45:12.456Z',
    '2025-11-28T16:22:33.789Z',
    '2025-12-15T10:05:55.234Z',
    '2026-01-10T14:18:20.567Z',
    '2026-02-02T09:30:10.890Z',
    '2026-02-25T17:40:05.321Z',
    '2026-03-20T12:15:30.654Z',
  ],
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2025-10-20T11:12:45.123Z',
    '2025-11-05T08:45:12.456Z',
    '2025-11-28T16:22:33.789Z',
    '2025-12-15T10:05:55.234Z',
    '2026-01-10T14:18:20.567Z',
    '2026-02-02T09:30:10.890Z',
    '2026-02-25T17:40:05.321Z',
    '2026-03-20T12:15:30.654Z',
  ],
  currency: 'USD',
  locale: 'en-US',
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
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// formating days
const formatMovementDates = function (date, local) {
  const calPassedDays = (date1, date2) => {
    return Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  };
  const days = calPassedDays(new Date(), date);
  // console.log(days);

  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days >= 2) return `${days} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(local).format(date);
};

// formatted numbers
const formattedCurr = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  // combining dates sort
  const combinedMovsDates = acc.movements.map((mov, i) => ({
    movements: mov,
    movementsDates: acc.movementsDates[i],
  }));
  // console.log(combinedMovsDates);

  // const movs = sort
  //   ? acc.movements.slice().sort((a, b) => a - b)
  //   : acc.movements;

  if (sort) combinedMovsDates.sort((a, b) => a.movements - b.movements);

  combinedMovsDates.forEach(function (obj, i) {
    const { movements, movementsDates } = obj;
    const type = movements > 0 ? 'deposit' : 'withdrawal';

    const date_1 = new Date(movementsDates);
    const displayDate = formatMovementDates(date_1, acc.locale);
    const formattedMov = formattedCurr(movements, acc.locale, acc.currency);

    const html = `       
     <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
          <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${formattedMov}</div>
        </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
// displayMovements(account1.movements);

// creating user.owner
// 'Jonas Schmedtmann' => js
const createUserName = function (account) {
  account.forEach(function (accs) {
    accs.userName = accs.owner
      .toLowerCase()
      .split(' ')
      .map(mov => mov[0])
      .join('');
  });
};

createUserName(accounts);
console.log(accounts);

// updating total balance using reduce method
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, curr) => (acc += curr), 0);
  const formattedMov = formattedCurr(acc.balance, acc.locale, acc.currency);
  labelBalance.textContent = `${formattedMov}`;
};
// calcDisplayBalance(account1.movements);

// updating in , out and interest using map, reduce, filter array method

// calculating the summary
const calcSummary = function (acc) {
  // in money
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumIn.textContent = `${formattedCurr(incomes, acc.locale, acc.currency)}`;

  // out money
  const debited = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov);

  // console.log(debited);
  labelSumOut.textContent = `${formattedCurr(debited, acc.locale, acc.currency)}`;

  // interest
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((val, i, arr) => {
      // console.log(arr);
      return val > 1;
    })
    .reduce((acc, int) => acc + int, 0);
  // console.log(interest);
  labelSumInterest.textContent = `${formattedCurr(interest, acc.locale, acc.currency)}`;
};
// calcSummary(account1.movements);

// update ui

const updateUI = function (acc) {
  //  display movements
  displayMovements(acc);
  // display balance
  calcDisplayBalance(acc);
  //  display summary
  calcSummary(acc);
};

// implementing login
// event handking
let currentAccount;

// fake login
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;

// coreecting the deafualt date
/* const now = new Date();
const day = `${now.getDate()}`.padStart(2, 0);
const month = `${now.getMonth() + 1}`.padStart(2, 0);
const year = `${now.getFullYear()}`.padStart(2, 0);
const hour = `${now.getHours()}`.padStart(2, 0);
const minutes = now.getMinutes();

labelDate.textContent = `${day}/${month}/${year}, ${hour}:${minutes}`; */

// login part
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value,
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // display ui and message
    // display welcome
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    // display ui
    containerApp.style.opacity = 1;

    // date time implementation
    const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = `${now.getFullYear()}`.padStart(2, 0);
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const minutes = `${now.getMinutes()}`.padStart(2, 0);

    const options = {
      hour: '2-digit',
      minute: '2-digit',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      // weekday: 'long',
      // hour12: false,
    };
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${minutes}`;
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options,
    ).format(now);
    // clear input fileds
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // updating ui
    updateUI(currentAccount);
  }
});

// implementing transfers

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.userName === inputTransferTo.value,
  );
  // console.log(amount, receiverAcc);

  inputTransferAmount.value = inputTransferTo.value = ' ';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc.userName !== currentAccount.userName
  ) {
    // doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // adding dates on transfer
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // updating ui
    updateUI(currentAccount);
  }
});

// close account funciton
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.userName &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.userName === currentAccount.userName,
    );
    console.log(index);
    // delete account
    accounts.splice(index, 1);
  }
  containerApp.style.opacity = 0;

  inputCloseUsername.value = inputClosePin.value = '';
  inputClosePin.blur();
});

// requesting loan

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // add movement
    currentAccount.movements.push(amount);

    // adding dates on loan
    currentAccount.movementsDates.push(new Date().toISOString());

    inputLoanAmount.value = '';
    inputLoanAmount.blur();
    // update ui
    updateUI(currentAccount);
  }
});

// sorting
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

// converting nodelist into array
// document.querySelectorAll('.movements__value') this is an object in array.form it has selected an div element

// array.from returning 2 nodelist value bcs inhtml there is only 2 value which css property is .movement__value

const movementsUI = Array.from(document.querySelectorAll('.movements__value'));
console.log(movementsUI);

// labelBalance.addEventListener('click', function () {
//   const movementsUI = Array.from(
//     document.querySelectorAll('.movements__value'), //go to the entire document and find .movemet__value
//   );
//   console.log(movementsUI);
// });

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'), //go to the entire document and find .movemet__value
    el => el.textContent.replace('€', ''),
  );
  console.log(movementsUI);
});

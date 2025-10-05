// methods are simply function that we can call on objects 
let arr = ['a', 'b', 'c', 'd', 'e'];

// slice 
// splice 
// reverse
// concat 
// join
// at

// slice 
console.log(arr.slice(2));// this will not mutate the original array instead it will return a new whole array with sliced array mentioned index 

console.log(arr.slice(1, -2));  // ['b', 'c'] // include the position 1 and -2 excluded

// shallow copy of array 
console.log(arr.slice());
// or we can do it with spread operator
console.log([...arr]);

// SPLICE 
// splice mutate the actual array 
console.log("splice");
console.log(arr.splice(2)); 
console.log(arr);  //['a', 'b']; 
arr.splice(-1);  //mutate the b 
console.log(arr);  //[a];

// REVERSE 
const arr1 = [1, 2, 3, 4, 5, 6, 7];
console.log(arr1.reverse());

// CONCAT : doesnt mutate the original array 
// this is used to concat the two methods c
console.log(arr.concat(arr1)); // memory flow => creates+ prints+ discards

const con = arr.concat(arr1); // memory flow => creates+ saves in con
console.log(con);  // prints
 
// we can also do this by the spread operator 
console.log([...arr, ...arr1]);

// JOIN: 
console.log(con.join('-')); 


// AT METHOD 
console.log("at method");

const arra = [23, 11, 45];
console.log(arra[0]);

// by at method
console.log(arra.at(0));

// accessing the last element 
console.log(arra[arra.length-1]);  //usual method
console.log(arra.slice(0, -1)[0]); //by slice method 

// by at method we can access it directly without any buff
console.log(arra.at(-1));

// wed can do it on string also 
console.log('hello'.at(0));
console.log('hello'.at(-1));

// LOOPS: FOR EACH 
// we also know how to loop over an array using for of loop 

// by for of loop 
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300]
for (const movement of movements){
    if(movement>0){
        console.log(`you deposited ${movement}`);
    }else{
        console.log(`you withdraw ${Math.abs(movement)}`);//.abs gives the absolute value it removes the - + sign and give the absolute value 
    }
}

console.log('---for loop---');

for(let i= 0; i<movements.length; i++){
    if(movements[i]>0){
        console.log(`you deposited ${movements[i]}`);
    }else{
        console.log(`you withdraw ${Math.abs(movements[i])}`);
        
    }
}

// for each loop 
console.log('---for each---');

movements.forEach(function(movement){
    if(movement>0){
        console.log(`you deposited ${movement}`);
    }else{
        console.log(`you withdraw ${Math.abs(movement)}`);
        
    }
});
// /how this will work 
// 0: function (200)
// 1: function(450)
// 2: function(40O)

console.log('woth index');

// by each entries  //.entries is the  iterator //this is also a for of loop but with the entries 
for(const [i, movement] of movements.entries()){
    if(movement>0){
        console.log(`Movement${i+1} : you deposited ${movement}`);
    }else{
        console.log(`Movement${i+1} : you withdraw ${Math.abs(movement)}`);
        
    }
}
// using for each loop 
// using for each loop with index 

console.log('---for each with index---');

movements.forEach(function(mov, i, arr){
    if(mov>0){
        console.log(`Movement${i+1} : you deposited ${mov}`);
    }else{
           console.log(`Movement${i+1} : you withdraw ${Math.abs(mov)}`);
    }
});
// the main difference between for of and forEach loop is we can't break or continue through the foreach loop , but if for of we can do 

// for each on maps and sets 
// using for each on maps and sets 

console.log('---for each on maps and sets---');
const currencies = new Map([
    ['USD', 'United States dallar'], //USD is Key, and United States dollar is the value 
    ['EURO', 'Euro'],
    ['GBP', 'Poundstarloing'],
]);

currencies.forEach(function(value, key, map){
    // console.log(map); // this will print the whole map 3 times bcs there is three values 
    console.log(`${key}: ${value}`);
});

// Sets 
// in sets we dont have either any key or any index value 
// sets remove the duplicate values 
const curreniesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(curreniesUnique);
// by for each 
curreniesUnique.forEach(function(value, _ , map){
    console.log(`${value}: ${value}`);
});


// function fizzBuzz(n) {
//     // Write your code here
//     for (var i = 1; i <= n; i++){
//         console.log(n % 3)
//         if(n % 3 === 0 && n % 5 === 0){
//             console.log("FizzBuzz")
//         }
//         else if (n % 3 === 0){
//             console.log("Fizz")
//         }
//         else if(n % 5 === 0){
//             console.log("Buzz")
//         }
//         else {
//             console.log(i)
//         }
//     }
// }

const { isEqual } = require("lodash");

// fizzBuzz(15);

// function getFixedCounter(k) {
//     // write your code here
//     let value = 0;
//     return {
//                  increment: function(k) {
//                      value += k;
//                  },
//                  getValue: function() {
//                      console.log(value);
//                  },
//                  decrement: function(k) {
//                      value += k;
//                  },
//                  getValue: function() {
//                      console.log(value);
//                  }
                 
//             }
//   }

//   getFixedCounter(2);

// async function getCountryName(code) {
//     // write your code here
//     // API endpoint: https://jsonmock.hackerrank.com/api/countries?page=<PAGE_NUMBER>
//     for (var i = 0; i <= 25; i++){
//         const country = fetch('https://jsonmock.hackerrank.com/api/countries' + `?page=${i}`)
//         .then(response => response.json())
//         .then(result => result.data.filter(res => res.alpha2Code === code).map(res => console.log(res.name)));
//     }
// }

// const countries = await getCountryName(AF);
// console.log(countries);
// (function (){
// let arr = Array(6);
//     console.log(...arr)
   
// })()

// function hourglassSum(arr) {
//     let max_sum = -9;
//     let sum = [];
//     for(let i = 0; i <= arr.length - 3; i++){
//         for(let j = 0; j <= arr.length - 3; j++){
            
//             sum = sum.concat(i);
//             // let sum = arr[i][j] + arr[i][j+1] + arr[i][j+2] + arr[i+1][j+1] + arr[i+2][j]+ arr[i+2][j+1] + arr[i+2][j+2];
//             // return Math.max(max_sum, sum)
//             return sum;
//         }
//     }


// };
// let minBribes = 0;
// a = [1,2,3,4,5];
// q = [2,1,5,3,4];

//     for (let i = q.length - 1; i >= 0; i--){
//         if(q[i] === a[i]){
//             continue;
//         }
//         else if(q[i] === a[i-1]){
//             let t = a[i];
//             a[i] = a[i-1];
//             a[i-1] = t;
//             minBribes += 1;
//             console.log(i + " 1")
//         }
//         else if(q[i] === a[i-2]){
//             let t = a[i];
//             a[i] = a[i-2];
//             a[i-2] = t;
//             minBribes += 2;
//             console.log(i + " 2")
//         }
//     }
// console.log(a, minBribes);

// a = [5, 8, 71, 69, 12, 7];
// n = a.length;

// a.sort((a,b) => a - b);

// let EO = a.map((ele) => {
//     if(ele % 2 === 0){
//         return "even";
//     }
//     else{
//         return "odd";
//     }
// })

// for (let i = 0; i < n; i++){
//     if (a[i] % 2 === 0 && a[i+1] % 2 === 1){
//         continue;
//     }
//     else if ( a[i] % 2 ===  1 && a[i+1] % 2 === 0){
//         continue;
//     }
//     else if (a[i+1] % 2 === 0){
//         let b = EO.indexOf('odd',i+1);
//         if(b > -1){
//             t = a[b];
//             a[b] = a[i+1];
//             a[i+1] = t;
//         }
//     }
//     else if (a[i+1] % 2 === 1) {
//         let b = EO.indexOf('even',i+1);
//         if(b > -1){
//             t = a[b];
//             a[b] = a[i+1];
//             a[i+1] = t;
//         }
//     }      
// }

// console.log(a);


// s = 'javascriptloops';
// for (let i = 0; i < s.length; i++){

//     if(s.charAt(i) != "S" && s.charAt(i) != "o"){
//     console.log(s[i], i);
//     }

// }


// const re = /ab+c/;
// console.log(re)
var s = "    HackerRank    ";
console.log("Original Length: " + s);
s = s.trim();
console.log("Trimmed Length: " + s);
import React, { useEffect } from "react";
import styles from "./FeaturesCards.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruck,
  faClock,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";

const FeaturesCards: React.FC = () => {




  // var array = [3, 2, 1, 7, 6, 5, 4, 9, 8, 10];

  // let smallest = array[0];
  // let sortedArray = [];

  // for (let i = 0; i < array.length; i++) {
  //   if (array[i] < smallest) {
  //     smallest = array[i];
  //   }
  // sortedArray.push(smallest);

  // }

  // // console.log("smallest------------smallest", sortedArray);




  var arr = [3, 2, 1, 7, 6, 5, 4, 9, 8, 10];
console.log("firsts un-sorted array", arr);

  for(let  i = 0; i < arr.length; i++) {
    for(let j = 0; j < arr.length; j++) {
      if (arr[j] > arr[j + 1]){

        let temp = arr[j];
        arr[j] =arr[j + 1];
        arr[ j + 1] = temp;
      }
    }
  };
  console.log("first---Sorting Array",  arr);






function Table(tableLimit , tableDigit ) {

for (let i = 1; i <= tableLimit; i++) {

 let result =  i * tableDigit ;

      console.log("table of users gige" , `${tableDigit} x ${i} = ${result}`);
}
}
Table(10, 5);


//  useEffect(() => {
//   console.log("coming check check")

//  }, []);




// let Arr = [] ; 
// let Index = 0 ;

// for ( let i = 0 ; i < duplicate.length; i++) {
//   let element_existed = false ; 

//   for (let j = 0; j < Arr.length ; j++) {

//     if ( Arr[j] === duplicate[i]) {
//       element_existed = true;
//       break;
//     }
//   }
  

//   if (!element_existed) {
//     Arr[Index] = duplicate[i];
//     Index++;
//   }

// };
// console.log("Remove Duplicate's:", Arr);

 const duplicate = [3,2,1,2,7,6,6,6,5,4,9,8,10];


let Arr = [] ;
let Index = 0;

for (let i = 0 ; i < duplicate.length; i++ ) {
  
  for ( var j = 0 ; j < Arr.length; j++ ) {

      if ( Arr[j] === duplicate[i]) {
        break;

      }
  
    }
if ( j === Arr.length) {
  Arr[Index] = duplicate[i] ;
  Index++
}


  }
  console.log("withOUT---TRU--FALSEduplicate removal" , Arr);



  let table = [ 1, 2, 3];


  for (let i = 0 ; i < table.length ; i++) {
    let i = table[0];
    console.log("table" , i);
    


  }

  // for(let i = 0; i < array.length ; i++) {
  //         if ()
  //         console.log("sorted-----sorted" , sorted)
  // }
  //         // var A = [];
  //         console.log("reult----array" , sorted);

  // Remove duplicates from this Array.

  // var duplicate = [3, 2, 2,1, 7, 6, 6, 6, 5, 4,4, 9, 8, 10] ;

  // let result = [] ;

  // for(let i = 0; i < duplicate.length ; i++) {

  //   if ( !result.includes(duplicate[i])) {

  //     result.push(duplicate[i]);
  //   }
  //   console.log(result);

  // };




  //  const ar = [1,1,1,2,3,4,5,6,6,7,7,8,8];
//  const unique = [];
//  let increaseIndex = 0;


// for (let i = 0; i < ar.length; i++) {

//  let existed = false ;

//   for(let j = 0 ; j < unique.length ; j++) {

//      if (unique[j] === ar[i]){
//       existed = true;
//           console.log("already existed ----do nothing ");
//           break;

//   }
//   }
//   if (!existed){
//      unique[ increaseIndex] = ar[i];
//     increaseIndex++;
//   }
// }
//  console.log("unique ==== array ",   unique  )


  

  return (
    <>
    <div className={styles.featureContainer}>
      <div className={styles.card}>
        <FontAwesomeIcon icon={faTruck} className={styles.icon} />
        <h4>FREE SHIPPING</h4>
        <p>For all order over 99$</p>
      </div>

      <div className={styles.card}>
        <FontAwesomeIcon icon={faClock} className={styles.icon} />
        <h4>DELIVERY ON TIME</h4>
        <p>If good have problems</p>
      </div>

      <div className={styles.card}>
        <FontAwesomeIcon icon={faShieldAlt} className={styles.icon} />
        <h4>SECURE PAYMENT</h4>
        <p>100% secure payment</p>
      </div>
    </div>
    </>
  );
};

export default FeaturesCards;

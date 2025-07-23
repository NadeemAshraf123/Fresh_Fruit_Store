import React, { useEffect } from "react";
import styles from "./FeaturesCards.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruck,
  faClock,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";

const FeaturesCards: React.FC = () => {

//   var arr = [3, 2, 1, 7, 6, 5, 4, 9, 8, 10];
// console.log("firsts un-sorted array", arr);

//   for(let  i = 0; i < arr.length; i++) {
//     for(let j = 0; j < arr.length; j++) {
//       if (arr[j] > arr[j + 1]){

//         let temp = arr[j];
//         arr[j] =arr[j + 1];
//         arr[ j + 1] = temp;
//       }
//     }
//   };
//   console.log("first---Sorting Array",  arr);


// function Table(tableLimit , tableDigit ) {

// for (let i = 1; i <= tableLimit; i++) {

//  let result =  i * tableDigit ;

//       console.log("table of users gige" , `${tableDigit} x ${i} = ${result}`);
// }
// }
// Table(10, 5);








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

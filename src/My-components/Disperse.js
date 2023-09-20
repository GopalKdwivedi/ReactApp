import React from 'react';
import '../disperse.css';
import { useState } from 'react';

export default function Disperse() {
const [wrongAmount,updateInput] = useState([])
const [duplicateArray,duplicateInput] = useState([])
const [splitArray,splitInput] = useState([])
const [duplicateExist,duplicasy] = useState(false)
const [outpuArray,output] = useState([])

    let [textareaValue] = useState('');
    const textarea = document.querySelector(".textarea");
    const numbers = document.querySelector(".numbers");


    const onKeyUp = (e) =>{
        
        const textarea = document.querySelector("textarea");
        const numbers = document.querySelector(".numbers");
        const num = e.target.value.split("\n").length;
        numbers.innerHTML = Array(num).fill("<span></span>").join("");
      }
      const onKeyDown=(event) =>{
        
        const textarea = document.querySelector("textarea");
        const numbers = document.querySelector(".numbers");
     
            if (event.key === "Tab") {
              const start = textarea.selectionStart;
              const end = textarea.selectionEnd;
              textarea.value =
                textarea.value.substring(0, start) +
                "\t" +
                textarea.value.substring(end);

              event.preventDefault();
            }
            if(event.key =="Enter"){
               let Array= textarea.value.split('\n')

              let arr1=[]
              let wrongAmount =[]
              Array.forEach((item,index)=>{


                  let objArr = item.split(' ')

            objArr= (objArr.length ==1)? (item.split(',').length >1) ?item.split(','):item.split('='):item.split(' ')
                 if(objArr.length !==2 ){
                  alert ("Only Two saperated value Allowed please check line number "+ (index+1))
                  event.preventDefault()
                  return
                 }
                    let obj= {
                      "Address":objArr[0],
                      "amount":objArr[1]
                  }
                  arr1.push(obj)
             
                })
            }
  
      }
      
      
    const onsubmit = () => {
        
        let testObj={}
        output([])
        const textarea = document.querySelector("textarea");
        var nameValue = document.getElementById("uniqueID").value;
        // divided string according to line
        let Array= nameValue.split('\n')
           let arr1=[]
        let wrongAmount =[]
        Array.forEach((item,index)=>{
            //split based on condition
            let objArr = item.split(' ')
            
            objArr= (objArr.length ==1)? (item.split(',').length >1) ?item.split(','):item.split('='):item.split(' ')
            
            if(objArr.length ==2 ){
              if(!Number(objArr[1])){
                wrongAmount.push(index)
            }
              let obj= {
                "Address":objArr[0],
                "amount":objArr[1]
            }
            arr1.push(obj)
            }
           
       
          })
          updateInput(wrongAmount)
          if(wrongAmount.length > 0){
            return 
          }
         
          // check Duplicates
          splitInput(arr1)

          arr1.forEach((item,index)=>{
           if(testObj[item["Address"]]){
            
             testObj[item["Address"]].count =testObj[item["Address"]].count + 1
             testObj[item["Address"]].lines.push(index+1)
          }else{
           testObj[item["Address"]] ={
            ...item,
            "count":1,
            "lines":[index+1]
           }
          }
         })
        
         let double=[]
         for(let key in testObj ){
      
           if(testObj[key].count > 1){
            double.push(testObj[key])
           
            
           }
         }

         if(double.length > 0){
          duplicateInput(double)
           duplicasy(true)
           return 
         } else{
          duplicateInput(double)
           duplicasy(false)
         }
         // show output

         output(arr1)
  
      }
      
      
      const setFirstName=(value)=> {
      
          textareaValue=value;
        
      }
      
      // Keep the First one
      const keepFirst = ()=>{
        let obj = {};
        let finalArr=''
        
        splitArray.forEach((item,index)=>{
            if(obj[item["Address"]]){
           
           }else{
           
            obj[item["Address"]] ={
             ...item,
        
            }
            finalArr =( finalArr? (finalArr+'\n'): finalArr ) +`${item["Address"]} ${item['amount']}`
           }
          })
          duplicateInput([])
           duplicasy(false)
          var nameValue = document.getElementById("uniqueID");
          nameValue.value = finalArr
      }
    
      // Combine all the Duplicates
      const Combine = ()=>{
        let obj = {};
        let finalArr=''
        splitArray.forEach((item,index)=>{
            if(obj[item["Address"]]){
            
              obj[item["Address"]].amount =Number(obj[item["Address"]]['amount']) + Number(item['amount']) 
            
           }else{
           
            obj[item["Address"]] =item
            obj[item["Address"]].amount =Number(item['amount'])
      
           }
          })

         let arr=[]
          for(let key in obj){
            arr.push(obj[key])
          }
          duplicateInput([])
          duplicasy(false)
          splitInput(arr)
          keepFirst()
            
      }
    
  return (
    <div className='back'>
      
  <h4>Address with Amounts</h4>
      <div className="editor">
      <div className="numbers">
        <span></span>
      </div>
      
      <div>
      <textarea className='textarea'     name="textareaValue" id="uniqueID"
                cols="50" rows="10" onKeyDown={(event) => onKeyDown(event)} onKeyUp={(event) => onKeyUp(event)}  onChange={(event) =>
                    setFirstName(event.target.value)
                  }></textarea>
      </div>
 

    </div>
    <div>
        <span>saperated by ',' or ' ' or '='</span>
      </div>
    <div><br></br>
    
    {wrongAmount.length > 0 
    ?
    <div className='errorBox'>
    {/* <ul> */}
    {wrongAmount.map(error => (
      <div className='errorList'><span className='error-circle'> !</span>  <span > {"Line "+ (error + 1)+" Wrong Amount "}</span></div>
    ))}

    {/* </ul> */}
    </div>
    :
    <div></div>
  }

 
  </div>
    <div>
    
    {duplicateExist
    ?
    <div className='errorBox'>
    {/* <ul> */}
     <div className='buttonDiv'><span>Duplicated</span> <div><span onClick={keepFirst}>keep the first One</span>  |<span onClick={Combine}> Combine Balance</span>  </div></div>
    
    {duplicateArray.map(error => (
      <div  className='errorList'><span className='error-circle'> !</span>  <span > Address {error.Address} encountered duplicate in line : {error.lines.map((num,index) => ((error.lines.length-1== index)?num: num +"," ))}</span></div>
    ))}

    {/* </ul> */}
    </div>
    :
    <div></div>
  }

 
  </div>
  <div >

  <button className='button' onClick={onsubmit}>Next</button>
  </div>
    
  
  <div>
    
    {outpuArray.length > 0
    ?
    <div className='outputBox'>
   
    Address:
    {outpuArray.map(error => (
      <div  className='errorList'><span >  {error.Address} </span></div>
    ))}

  
    </div>
    :
    <div></div>
  }

 
  </div>
    </div>
  )
  
}


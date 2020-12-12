import React, {useState,useEffect} from 'react'
// import './ListComponent.css'

//function for every function
const sendEmail = () => console.log('sending email')
const sendFax = () => console.log('sending fax')
const copyDetails = () => console.log('copying details')
//... add more here



const FUNCTIONALITIES = {
  Email : {func: sendEmail},
  Fax: {func: sendFax},
  Copy: {func: copyDetails}
  // ... add more functionality here
}

export default function ListComponent(){

    const [lastClickedButton, setLastClickedButton] = useState('')
    const [isSelected, setIsSelected] = useState([])  //state for download csv for every function


    /* component did mount, 
    ** get the number of ket in const FUNCTIONALITIES
    ** then push false to an array that will set into the isSelected state
    ** so on first Load all the checkboxes will be unchecked
    */
    useEffect(() => {
      let arr = []
      Object.keys(FUNCTIONALITIES).forEach(()=>arr.push(false))
      setIsSelected(arr)
    }, [])

    function renderList(title, sendFunction,checkboxIndex){

      /* 
        downloadCSV function, 
        maybe with params depends on the business requirement
      */
      function downloadCSV(){
          console.log('downloading CSV') 
      }
      return(
        <li>
        <p>download CSV</p>
        {/* checkbox that is rendered for every functionalities based on the index of Object.entries on line 76*/}
        <input
            name="isGoing"
            type="checkbox"
            checked={isSelected[checkboxIndex]}
            onChange={()=>{
              let tempIsSelected = [...isSelected] //declare temp var that will copy isSelected state
              tempIsSelected[checkboxIndex] = !tempIsSelected[checkboxIndex] //toggle the selected index
              setIsSelected(tempIsSelected) //setState
            }} />
        <button
          onClick={() => {
            setLastClickedButton(title)
            sendFunction()
            if(isSelected[checkboxIndex]) downloadCSV() //if the checkbox is selected then call downloadCSV
          }}
          className='my-button'>
          {title}
        </button>
      </li>
      )
    }

    return(
        <div>
        <h1>Selected action: {lastClickedButton}</h1>
        <ul>
          {/* going through the const FUNCTIONALITIES and render each item */}
          {Object.entries(FUNCTIONALITIES).forEach(([key,{func},idx])=>renderList(key,func,idx))}
        </ul>
      </div>
    )
}

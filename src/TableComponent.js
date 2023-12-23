import React,{useState,useEffect} from 'react';
import './table.css'
import { data, columns } from './Constants/Constants';

function TableComponent() {
  const[responseJson,setResponseJson]=useState([])
  // using useEffect to store the initial values of the table in list
  useEffect(()=>{
    let jsonList=[]
    
    for(let i=0;i<data.length;i++){
      let elementObj={}
      
      for(let j=0;j<columns.length;j++){
     //if the row doesnot have that column making it as null
        if (!data[i][columns[j]]) {
          elementObj[columns[j]]=null
        }
        else if(data[i][columns[j]].type=="plainText"){
          elementObj[columns[j]]=data[i][columns[j]].value
         }
         else if(data[i][columns[j]].type=="checkbox"){
          elementObj[columns[j]]=false
         }
         else{
          elementObj[columns[j]]=null
         }
      }
      jsonList.push(elementObj)
    }
    //setting the initial state
    setResponseJson(jsonList)

  },[])
  // handling the checkbox change and updating it in json
  const handleCheckedChange=(e,column,index)=>{
  
    setResponseJson(prevResponseJson => {
      const updatedJson = [...prevResponseJson];
      updatedJson[index][column] = e.target.checked;
      return updatedJson;
    });

  }
  // handling the dropdown change and updating it in json
  const handleDropDownChange=(e,column,index)=>{
    setResponseJson(prevResponseJson => {
      const updatedJson = [...prevResponseJson];
      updatedJson[index][column] = e.target.value;
      return updatedJson;
    });
  }
  // handling the input change and updating it in json
  const handleTextInputChange=(e,column,index)=>{
    setResponseJson(prevResponseJson => {
      const updatedJson = [...prevResponseJson];
      updatedJson[index][column] = e.target.value;
      return updatedJson;
    });
  }
  // rendering the table dynamically based on columns and row data
  const table = () => {
    return (
      <table>
        <thead>
          <tr>
            {columns.map((value) => (
              <th key={value}>{value}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column}>{cellRender(row, column,index)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
// rendering the cell bbased on column
  const cellRender = (row, column,index) => {
    if (!row[column]) {
        return null;
      }
    let type = row[column].type;
 
    if (type === "plainText") {
      return row[column].value;
    } else if (type === "dropdown") {
      return (
        <select id="country" onChange={(e)=>handleDropDownChange(e,column,index)} value={responseJson[index]?responseJson[index][column]:null}>
          {row[column].value.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>
      );
    } else if (type === "checkbox") {
      return (
        <label>
          <input type="checkbox" onChange={(e)=>handleCheckedChange(e,column,index)} checked={responseJson[index]?responseJson[index][column]:false}/> {row[column].value}
        </label>
      );

    } else {
      return <input type={type} onChange={(e)=>handleTextInputChange(e,column,index)}value={responseJson[index]?responseJson[index][column]:null} placeholder={row[column].placeholder} />;
    }
  };

  return <div>{table()}</div>;
}

export default TableComponent;

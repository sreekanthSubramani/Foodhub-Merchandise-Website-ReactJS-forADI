import {useState, useEffect} from 'react'

export default function TextTruncate({ para }) {

  const [Truncate, setTruncate] = useState("")
  const [toggle, setToggler] = useState(false)
  const [fullList, setFullList] = useState([])


  function handleToggler(){
    setToggler(prev=> !prev)
  }


  function truncator(str, num){
    if(str.length < num){
      return str
    }
    
    return str.slice(0, num) + "..."
  }

useEffect(()=>{
  setFullList(para)
},[para])


useEffect(()=>{
    setTruncate(truncator(para, 50))
},[para])


  
return (  
    <div>
      <div onClick={()=>handleToggler()}>
        {toggle ?
        <div>{fullList.map(elem=>{
          return <li>{elem}</li>
        })}</div>
        :
        <li>{Truncate}....</li>
      }
        </div>
    </div>
  );
}

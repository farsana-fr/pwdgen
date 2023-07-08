import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import './New.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {numbers,upper,lower,chars} from './Character.js'
import { toast,ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function New() {

  const [pwd,setPwd]=useState('')
  const [pwdLen,setPwdLen]=useState(8)
  const [includeUpper,setIncludeUpper]=useState(false)
  const [includeLower,setIncludeLower]=useState(false)
  const [includeChar,setIncludeChar]=useState(false)
  const [includeNum,setIncludeNum]=useState(false)
  
  const notify=(msg,error=false)=>{
    if(error)
    {
      toast.error(msg, {
        position: "top-center",
        autoClose: 200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
    else
    {
      toast.info(msg, {
        position: "top-center",
        autoClose: 200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  }
  const copyToClipboard=()=>{
    if(pwd!='')
    {
    const newTextArea=document.createElement('textarea');
    newTextArea.innerText=pwd;
     document.body.appendChild(newTextArea)
    newTextArea.select()
    document.execCommand('copy')
    newTextArea.remove()
    
      notify('Copied to Clipboard')
    }
    
  }
  const generatePwd=(e)=>{
    e.preventDefault()
    let characterList=''
    if(!(includeChar||includeLower||includeNum||includeUpper))
    {
      notify('Please choose any options',true)
    }
    if(includeLower)
    {
      characterList+=lower
    }
    if(includeUpper)
    {
      characterList+=upper
    }
    if(includeNum)
    {
      characterList+=numbers
    }
    if(includeChar)
    {
      characterList+=chars
    }
    setPwd(createPwd(characterList))
  }

  const createPwd=(charList)=>{
    let pwd='';
    const charListlen=charList.length
    for(let i=0;i<pwdLen;i++)
    {
      const charIndex=Math.round(Math.random()*charListlen)
      pwd+=charList.charAt(charIndex)
    }
    return pwd;
  }
  return (
    <div className='form mt-5' >
      <div className='main container w-75 p-3'>
      
        <h1 className='text-light text-center'><i class="fa-solid fa-lock"></i>Password Generator</h1>
        


          <Form className='container'>
              {/* <input type="text" placeholder="password" className='form-control'/> */}
              <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
          
          <div className='left'><Form.Control type="text" placeholder={pwd} readOnly className='rounded-3 pwd'/>
          
          <div className='right'><i className="clipboard text-dark fa-solid fa-clipboard fs-1" onClick={copyToClipboard}></i></div>
          </div>
          <div className=''>
            <Form.Label htmlFor="length" className='mt-3'>Enter Length</Form.Label>
          <div className='right'>
            <Form.Control
            defaultValue={pwdLen} onChange={(e)=>setPwdLen(e.target.value)}
              type="number"
              id="length"
              className='rounded-3' min={8} max={20} 
            />
          </div>
          </div>
          

          <div key={`checkbox`} className="mt-5 ">
            <Form.Check // prettier-ignore
              checked={includeUpper}
              onChange={(e)=>setIncludeUpper(e.target.checked)}
              id={`checkbox`}
              label={`Uppercase`}
            />
          </div>
  
          <div key={`checkbox1`} className="mt-2 ">
            <Form.Check // prettier-ignore
              checked={includeLower}
              onChange={(e)=>setIncludeLower(e.target.checked)}
              id={`checkbox1`}
              label={`Lowercase`}
            />
          </div>
          <div key={`checkbox2`} className="mt-2 ">
            <Form.Check // prettier-ignore
              checked={includeNum}
              onChange={(e)=>setIncludeNum(e.target.checked)}
              id={`checkbox2`}
              label={`Number`}
            />
          </div>
          <div key={`checkbox3`} className="mt-2 ">
            <Form.Check // prettier-ignore
              checked={includeChar}
              onChange={(e)=>setIncludeChar(e.target.checked)}
              id={`checkbox3`}
              label={`Special Character`}
            />
          </div>
          <button onClick={generatePwd} type="submit" className='mt-2 btn btn-success w-100 rounded-3'>Generate Password</button>
          
        </Form.Group>
          </Form>
          
      </div>
      <ToastContainer
position="top-center"
autoClose={100}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
    </div>

  )
}

export default New
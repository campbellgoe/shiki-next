"use client";
import { updateCode } from '@/actions/updateCode';
import { useState, useEffect } from 'react';

import { useFormState } from 'react-dom'
const initialState = {
  message: '',
  filename: '',
  code: ''
};
function EditableCode2({ initialCode = "//code goes here", initialFilename = 'code.js' }: any) {
  const [code, setCode] = useState(initialCode);
  const [filename, setFilename] = useState(initialFilename)
  const [value, setValue] = useState(code);
  const [state, formAction] = useFormState(updateCode, initialState)
  useEffect(() => {
    setCode(state.code)
  }, [state.code])
  return (
    <form action={formAction}>
      <label htmlFor="filename">Filename:
        <input onChange={(e: any) => setFilename(e.target.value)} type="text" id="filename" name="filename" value={filename}/>
      </label>
      <button type="button" onClick={async () => {
        const data = await fetch("/api/getCodeByKey?key="+encodeURIComponent(filename), {
          method: 'GET'
        })
        const text = await data.text()
        
        if (!data.ok) {
          throw new Error(`HTTP error! status: ${data.status}`);
        }
        setValue(text)
      }}>Load</button>
      <textarea name="code" className='text-black bg-white' onChange={(e: any) => setValue(e.target.value)} value={value}/>
      <pre className='whitespace-pre overflow-x-auto'>Value: {value}</pre>
      <pre className='whitespace-pre overflow-x-auto'>Code: {code}</pre>
      <button type="submit">Update</button>
      <div className="border border-yellow-500">{state.message}</div>
    </form>
  )
}

export default EditableCode2

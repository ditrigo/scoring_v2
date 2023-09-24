import { useState, useEffect } from 'react'

export default function App() {

  /* useEffect(()=>{
    console.log(import.meta.env.VITE_API_URL)
  }, []) */

  return (
    <>
      <h1>heello world</h1>
      <MyButton />
    </>
  )
}

function MyButton() {
  return (
    <button>I'm a button</button>
  );
}
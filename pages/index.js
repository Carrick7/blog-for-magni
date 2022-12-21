import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState } from 'react';

export default function Home() {
  
  //error
  const [ errorMessage, setErrorMessage ] = useState('noErrorResponse')

  const [ formData, setFormData ] = useState({
    name: '',
    email: ''
  });

    //set the form data
    const { name, email } = formData

 
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }

  const addData = async (e) => {

      e.preventDefault();

      console.log(errorMessage)

      const res = await fetch('/api/test/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
        }),
      });
      const data = await res.json();
      console.log(data)
      console.log(data.message)
      setErrorMessage(data.message)
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Input Fields */} 
      <main className={styles.main}>
        <div>
          <input type="text" name='name' value={name} placeholder='name' onChange={onChange}/>

          <input type="text" name='email' value={email} placeholder='email' onChange={onChange}/>
        </div>
        
        {/* Button to execute Fetch request*/} 
        <button onClick={addData}>
          Click Me To add
        </button>
      
      {/* Conditional Rendering Error Message.. Will Make a resuable Compnent to show this error*/} 
      {errorMessage !== 'noErrorResponse' &&
        <h2>
          Error Message: {errorMessage}
        </h2>
      }

      </main>


      <footer className={styles.footer}>

      </footer>
    </div>
  )
}

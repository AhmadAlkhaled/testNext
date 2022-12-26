import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.scss';
import axios from 'axios'
import { useEffect , useState } from 'react'

const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  const [ All , setAll ] = useState([]);
  const [ text , setText ] = useState('')

  const x = ()=>{
    axios.get('/api/addTask')
    .then((res)=>{
      setAll(res.data.data);
    })
  }

  useEffect(()=>{
      x();
  },[])

  const add = (event)=>{
    const inputText = text; 
    if(inputText != ''){
      setAll([...All,{taskText:text}])
      setText('')
      axios.post('/api/addTask',{ taskText:inputText })
      .then(()=>{
        x()
      })
    }
 
  }
  const Delete = (event)=>{
    
    axios.delete(`/api/${event._id}`)
      .then(()=>{
        x()
      })
  }

  return (
    <>
      <Head>
        <title>test  Next.js</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.form} >
          <input type="text" value={text} placeholder='enter your task' 
          onChange={(e)=>{ setText(e.target.value) }}
          onKeyDown={(event)=>{
            if(event.code === 'Enter')
            {
              add()
            }

          }} />
          <button onClick={add} > Add </button>
        </div>
        <div className={styles.container} >
          {
            All.map((task,i)=>{
              return (
                <div key={i} >
                  <i key={i} className="fa-solid fa-trash-can" onClick={()=>{ Delete(task) }} ></i>
                   {task.taskText} 
                </div>
              )
            })
          }
        </div>
      </main>
    </>
  )
}

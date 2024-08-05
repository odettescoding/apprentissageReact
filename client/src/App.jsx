import { BrowserRouter, Routes, Route } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import Nav from './composants/Nav'
import Books from "./Books"
import CreateBook from "./CreateBook"
import UpdateBook from "./UpdateBook"
import Compteur from "./Compteur"
import Post from "./composants/Post"
import { useState } from "react"

function App() {
  // const [posts,setPosts]=useState([
  //   {
  //     id:1,
  //     titre:"Amani Kaso",
  //     description:"voici un exemple de texte qui vient juste remplacer le texte ici ",
  //     liker:false
  //   },{
  //     id:2,
  //     titre:"Amani Kaso",
  //     description:"voici un exemple de texte qui vient juste remplacer le texte ici ",
  //     liker:false
  //   },
  //   {
  //     id:3,
  //     titre:"Amani Kaso",
  //     description:"voici un exemple de texte qui vient juste remplacer le texte ici ",
  //     liker:false
  //   },
  //   {
  //     id:4,
  //     titre:"Amani Kaso",
  //     description:"voici un exemple de texte qui vient juste remplacer le texte ici ",
  //     liker:false
  //   }

  // ])

  return (
    
    
    <BrowserRouter>
      {/* <Nav/>
      
    {
      // posts.map(p=><Post data={p} key={p.id}/>)
      posts.map(p=><Post data={p} key={p.id}/>)
    }   */}
      
      {/* <Post/> */}
      <Routes>
        <Route path="/" element={<Books/>}></Route>
        
        <Route path="/compteur" element={<Compteur/>}></Route>
        {/* <Route path="/post" element={<Post/>}></Route> */}
        <Route path="/create" element={<CreateBook/>}></Route>
        <Route path="/update/:id" element={<UpdateBook/>}></Route>
      </Routes>
     </BrowserRouter>
      
    
    
  )
}

export default App

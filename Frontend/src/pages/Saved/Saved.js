import React, { useContext, useEffect ,useState} from 'react'
import IdeaSaved from './IdeaSaved'
import ProjectSaved from './ProjectSaved'
import img from '../../assets/backImage.png';
import {firebaseApp} from '../ChatApp/firebase'
import {AuthContext} from '../../Context/Auth'

const data = [
    {
        id: '1',
        image: img,

    },
    {
        id: '2',
        video: 'https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/833be8b5-9db0-4e10-b89d-737d6394ade9/nature-wallpaper20.jpg',

    },
    
    {
        id: '3',
        video: 'https://img.freepik.com/free-photo/handsome-successful-businessman-pointing-fingers-right-showing-advertisement-with-pleased-face_1258-26415.jpg?size=626&ext=jpg',

    }
]
export default function Saved({history}) {
    const {user}=useContext(AuthContext)
    const saveRef=firebaseApp.database().ref("save")
    const [savedPost,setSavedPost]=useState([])
    useEffect(()=> {
        saveRef.child(user.id).on('value',snap=>setSavedPost(snap.val()))
    },[])

    const saveKeys=savedPost?Object.keys(savedPost):[]
    return (
        <div style={{ marginRight: '50px' }}>
            {saveKeys.reverse().map(item => (
                savedPost[item].type.includes("idea")? <IdeaSaved key={item} item={savedPost[item]} user={user} />
                : <ProjectSaved key={item} item={savedPost[item]} user={user} />
            ))}
            
        </div>
    )
}

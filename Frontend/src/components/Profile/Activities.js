import React from 'react';
import Card from '../../pages/dashboard/components/Card';
import ProjectCard from '../../pages/dashboard/components/ProjectCard';
import PostIdea from './PostIdea';
import ProfilePost from './ProfilePost';



export default function Activities({tooglePostBox,posts,User}) {
  console.log(User)
  return (
    <div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          marginBottom: '10px',
        }}
      >
        <h2 className='ml-3'>Activities</h2>
        <p
          style={{
            padding: '5px 15px ',
            backgroundColor: 'red',
            fontSize: '12px',
          }}
          type='submit'
          className='btn btn-danger btn-sm ml-auto'

          onClick={()=>tooglePostBox()}
        >
          Post
        </p>
      </div>
      {posts.length===0&&<h6 style={{textAlign: 'center'}}>No Posts yet</h6>}
      {posts.map(item =>
        item.type.includes('idea')?<Card key={item.id} Class={"profile-card-width"} item={item} user={User} rooms={[]} joinShow={false} />
        :<ProjectCard key={item.id} item={item} user={User} />
      )}
      
    </div>
  );
}

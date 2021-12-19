import React,{useContext, useState} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import MetaData from '../../components/Helmet/MetaData'
import { gql, useQuery,useMutation } from "@apollo/client";

import Loader from './ContentLoader';
import { AuthContext } from '../../Context/Auth';



export default function Friends({history}) {
  const {user}=useContext(AuthContext)
  const [keyword,setKeyword]=useState("")
  // const { loading, error, data: Users } = useQuery(FETCH_USER_QUERY);
  const { l, errors, data: Users } = useQuery(SEARCH,{variables:{keyword:keyword}});
  const { load, err, data: User } = useQuery(GET_USER,{
    variables:{username: user.username}
  });



  const [followUser, { er }] = useMutation(FOLLOW_USER, {
    refetchQueries:[
      { query: SEARCH,variables:{keyword:keyword}},
      {query:GET_USER,variables:{username: user.username}}
    ],
    onError(err) {
      console.log(err);
    },
  });
  const [unFollowUser, { e }] = useMutation(UNFOLLOW_USER, {
    refetchQueries:[
      { query: SEARCH,variables:{keyword:keyword}},
      {query:GET_USER,variables:{username: user.username}}
    ],
    onError(err) {
      console.log(err);
    },
  });
  


  const handleViewProfile=(id) => {
    history.push(`/profile/${id}`)
  }

 return (
    <div style={{ width: '100%' }}>
    <MetaData title={'Friends'} />
      <form onsubmit='event.preventDefault();' role='search' className="search_box">
        <label for='search' className="search_label">Search for stuff</label>
        <input
          id='search'
          type='search'
          placeholder='Search your friend by username...'
          className="search_bar"
          autoComplete="off"
          value={keyword}
          onChange={e=>setKeyword(e.target.value)}
        />
        <button type='submit' className="search_btn">{keyword&& l?"Searching....":"Found"}</button>
      </form>
      <Divider variant="middle" style={{width:'40rem',display:'block',marginLeft:'auto',marginRight:'auto',backgroundColor:'white'}} />
      {(!User||!Users)?<Loader />:
      <List
        style={{
          width: '65%',
          display: 'block',
          marginRight: 'auto',
          marginLeft: 'auto',
        }}
      >
        {/* {messages.length === 0 && <ContantLoader />} */}
        {Users.searchUser.map((person) => user.id!==person.id &&(
          <>
          <ListItem key={person.id} alignItems='center' style={{marginTop:'-7px',cursor:'pointer'}}  >
            <ListItemAvatar>
              <img
                className='rounded-circle'
                src={person.pic}
                alt='...'
                width='50'
                height='50'
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <h6 className='m-0 fw-bold mb-1' style={{ fontSize: '18px' }}>
                  {person.fName+" "+person.lName}
                </h6>
              }
              secondary={<p style={{ color: 'white' }}>{person.followers>0&&`${person.followers} followers`}</p>}
              style={{ alignItems: 'center', paddingTop: '15px' }}
            />

            <ButtonGroup
              variant='text'
              aria-label='text primary button group'
              color='secondary'
            >
            { User.getUserByUsername.following.includes(person.id)?
             <Button onClick={()=>unFollowUser({
                variables:{ 
                  followId:person.id,
                  userId:user.id
                }
              })}>Unfollow</Button>:
             <Button style={{ color: 'cyan' }} onClick={()=>followUser({
                variables:{ 
                  followId:person.id,
                  userId:user.id
                }
              })}>Follow</Button>
             }
              
              <Button style={{ color: 'white' }} onClick={()=>handleViewProfile(person.id)}>View Profile</Button>
            
            </ButtonGroup>
            </ListItem>
            <Divider variant="middle" style={{width:'40rem',display:'block',marginLeft:'auto',marginRight:'auto'}} />
            </>
        ))}
      </List>
      }
    </div>
  );
}

const FETCH_USER_QUERY= gql`
  {
    getUsers{
      id
      pic
      fName
      lName
      followers
    }
  }
`;

const FOLLOW_USER = gql`
  mutation followUser($followId:ID!,$userId:ID!){
    followUser(followId:$followId,userId:$userId){
      id
    }
  }
`;

const GET_USER = gql`
  query getUserByUsername($username: String!) {
    getUserByUsername(username: $username) {
      following
    }
  }
`;

const UNFOLLOW_USER=gql`
mutation unFollowUser($followId:ID!,$userId:ID!){
  unFollowUser(followId:$followId,userId:$userId){
    id
  }
}
`;

const SEARCH= gql`

query searchUser($keyword:String!){
  searchUser(keyword:$keyword) {
    id
      pic
      fName
      lName
      followers
  }
}


`;


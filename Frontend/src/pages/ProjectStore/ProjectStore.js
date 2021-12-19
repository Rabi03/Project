import React,{useEffect, useState} from 'react';
import MetaData from '../../components/Helmet/MetaData';
import Dialog from '@material-ui/core/Dialog';
import RecentApps from './RecentApps';
import RecommendedApps from './RecommendedApps';
import TodaysApps from './TodaysApps';
import { gql, useQuery } from "@apollo/client";
import gif from '../../assets/loading.gif';


export default function ProjectStore({history}) {
  const [keyword,setKeyword]=useState("")
  const { loading, error, data: Apps } = useQuery(GET_APPS,{
    onError(err) {
      console.log(err)
    },
    variables:{type: 'project',keyword:keyword}
  });

  const handleChange=e=>{
    const key=e.target.value
    setKeyword(key)
    if(key) history.push(`/store?keyword=${key}`)
    else history.push('/store')
  }



  return (
    <div>
    <MetaData title={keyword?`${keyword}`:"Project Store"} />
      <form
        onsubmit='event.preventDefault();'
        role='search'
        className='search_box'
        style={{ marginLeft: '0px', marginRight: '0px', marginTop: '10px' }}
      >
        <label for='search' className='search_label'>
          Search for stuff
        </label>
        <input
          id='search'
          type='search'
          placeholder='Search a project app....'
          className='search_bar'
          autoComplete='off'
          onChange={handleChange}
        />
        <button type='submit' className='search_btn'>
          {keyword&& loading?"Searching....":"Found"}
        </button>
      </form>
      {Apps&&(Apps.getApps.length>0?(
        <><RecommendedApps apps={Apps.getApps.length>0? Apps.getApps:[]} />
      <TodaysApps history={history} apps={Apps.getApps} />
      <RecentApps history={history} apps={Apps.getApps} /></>):(
        <h4 style={{ marginBottom: '15px' }}>No apps found.</h4>
      ))}
    </div>
  );
}

const GET_APPS = gql`
  query getApps($type:String!,$keyword:String!){

    getApps(type:$type,keyword:$keyword){
      id
      appName
      appType
      title
      body
      groupId
      groupName
      appLogo
      maxMember
      githubLink
      images
      videoLink
      Link
      username
      createdAt
      comments {
        id
        username
        name
        body
        avatar
        createdAt
        replies {
          id
          username
          name
          body
          avatar
          createdAt
        }
      }
      likes {
        id
        username
        image
        color
        createdAt
      }
      rates {
        id
        username
        value
        createdAt
      }
      commentCount
      likeCount
      rateCount
    }
  }

`;

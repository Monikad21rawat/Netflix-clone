
import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {
  const {id}=useParams();
  const navigate= useNavigate();

const [apiData,setApiData]=useState({
  name:"",
  key: "",
  published_at: "",
  typeof: "",
})
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODQzY2MzYzZhNTM1MTQ3NDAwNDYyYWIwNDEwMGYyNyIsIm5iZiI6MTcyMTA2MDI4OS42OTkzMSwic3ViIjoiNjY5Mzk0NzBkZTljNzEyNjZkYWQ0NjI0Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.hXB_gJh4kcjZ8WfM7TWe8u5YLtAbaPMvUR5OBtgMg2E'
    }
  };
  
 useEffect(()=>{
  fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
  .then(response => response.json())
  .then(response =>setApiData(response.results[0]))
  .catch(err => console.error(err));
 },[])

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={()=>{navigate(-2)}} />
      <iframe width='90%' height="90%" src={`https://www.youtube.com/embed/${apiData.key}`}
        title='trailer' frameBorder='0' allowFullScreen ></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player



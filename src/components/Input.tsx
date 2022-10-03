import React, {useState} from 'react';
import {useForm} from './useForm';


const Input = () => {
// define initial state for the form
const initialState = {
  date: '',
  distance: '',
  hh: '',
  mm: '',
  ss: '',
}

//API FUNCTION
const submitRun = async () => {
  console.log('VALUES', values);
  //clear the inputs after submitting
  for (let i=0; i<Object.keys(initialState).length; i++){
    document.querySelector('#input').elements[i].value = '';
  }
  console.log('VALUES', values);
}

//get event handlers from custom hook
const {onChange, onSubmit, values} = useForm(submitRun, initialState);

//return
return (
  <form id='input' onSubmit={onSubmit}>
    <input 
      name='date'
      id='date'
      type='date'
      onChange={onChange} 
      required
    />
    <div id='distance-div'>
      <label>Enter your distance</label>
      <input 
      name='distance'
      id='distance'
      type='text'
      placeholder='in miles'
      onChange={onChange} 
      required
    />
    </div>
    <div id='time-div'>
      <label>Enter your time</label>
      <input 
      name='hh'
      id='hh'
      type='text'
      placeholder='hh'
      onChange={onChange} 
      required
      />
      <input 
      name='mm'
      id='mm'
      type='text'
      placeholder='mm'
      onChange={onChange} 
      required
      />
      <input 
      name='ss'
      id='ss'
      type='text'
      placeholder='ss'
      onChange={onChange} 
      required
      />
    </div>
    <button id='submit' type='submit'>Submit</button>
  </form>


)};

export default Input;
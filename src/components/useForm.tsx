import {useState, ChangeEvent, FormEvent} from "react";

//custom form hook
export const useForm = (callback: any, initialState = {})  => {
  //set state
  const [values, setValues] = useState(initialState);
  //onChange
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues({...values, [event.target.name]: event.target.value});
  }
  //onSubmit
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await callback(); //callback being passed into useForm
  }
  //return values
  return { onChange, onSubmit, values};
};


import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { isAutheticated } from '../auth/helper';
import Base from '../core/Base';
import { getCategory, updateCategory } from './helper/adminapicall';

const UpdateCateogry = () => {

  const { categoryId } = useParams();

  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAutheticated();

  const preload = categoryId => {
    getCategory(categoryId).then((data) => {
      if (data && data.error) {
        setError("");
      } else {
        setName(data.name);
      }
    });
  };


  useEffect(() => {
    preload(categoryId);
  }, [])


  const handleChange = event => {
    setError("");
    setName(event.target.value)
  }

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    // console.log(name)
    // console.log(categoryId)
    //Backend Request fired
    updateCategory(categoryId, user._id, token, { name })
      .then(data => {
        if (data && data.error) {
          setError(false);
        } else {
          setError("");
          setSuccess(true);
          setName("");
        }
      });
  }

  const successMessage = () => {
    if (success) {
      return <div className="alert"><h3>Category updated successfully</h3></div>
    }
  }
  const warningMessage = () => {
    if (error) {
      return <div className="alert"><h3>Failed to update category</h3></div>
    }
  }
  const myCategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead">Enter the category</p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChange} // only one box that's why only method call no dynamic parameter
          value={name} // value to change empty after success
          autoFocus // for to focus -> to where to fill
          required  // this field is required
          placeholder="For Ex. Summer"  // for the expample
        />
        <button onClick={onSubmit} className="btn btn-outline-info">
          Update Category
        </button>
      </div>
    </form>
  );

  return (
    <Base title='Update Category' description='Update category here !'>
      <div className='container p-5'>
        {successMessage()}
        {warningMessage()}
        {myCategoryForm()}
      </div>
    </Base>
  )
}

export default UpdateCateogry;

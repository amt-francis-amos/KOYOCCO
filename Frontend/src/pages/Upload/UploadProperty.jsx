import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Validation schema for the form
const UploadPropertySchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.number().required('Price is required').positive(),
  location: Yup.string().required('Location is required'),
  images: Yup.mixed().test(
    'fileCount',
    'You can only upload a maximum of 10 images',
    (value) => value && value.length <= 10
  ).required('Images are required'),
  video: Yup.mixed()
});

const UploadProperty = () => {
  const [imageError, setImageError] = useState('');
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 shadow-md rounded-lg m-10">
      <h1 className="text-2xl font-semibold mb-6 text-center">Upload Property</h1>
      <Formik
        initialValues={{
          title: '',
          description: '',
          price: '',
          location: '',
          images: null,
          video: null
        }}
        validationSchema={UploadPropertySchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          const formData = new FormData();
          formData.append('title', values.title);
          formData.append('description', values.description);
          formData.append('price', values.price);
          formData.append('location', values.location);
          for (let i = 0; i < values.images.length; i++) {
            formData.append('images', values.images[i]);
          }
          formData.append('video', values.video);

          axios.post('https://koyocco.onrender.com/api/auth/properties', formData)
            .then(response => {
              alert('Property uploaded successfully!');
              resetForm();
              navigate('/propertyList'); 
            })
            .catch(error => {
              alert('An error occurred while uploading the property.');
            })
            .finally(() => {
              setSubmitting(false);
            });
        }}
      >
        {({ setFieldValue, values }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
              <Field
                name="title"
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              />
              <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <Field
                name="description"
                as="textarea"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              />
              <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
              <Field
                name="price"
                type="number"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              />
              <ErrorMessage name="price" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
              <Field
                name="location"
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              />
              <ErrorMessage name="location" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="images" className="block text-sm font-medium text-gray-700">Images (Max 10)</label>
              <input
                name="images"
                type="file"
                multiple
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                onChange={(event) => {
                  const files = event.currentTarget.files;
                  if (files.length > 10) {
                    setImageError('You can only upload a maximum of 10 images');
                  } else {
                    setImageError('');
                    setFieldValue("images", files);
                  }
                }}
              />
              {imageError && <div className="text-red-500 text-sm mt-1">{imageError}</div>}
              <ErrorMessage name="images" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="video" className="block text-sm font-medium text-gray-700">Video</label>
              <input
                name="video"
                type="file"
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                onChange={(event) => {
                  setFieldValue("video", event.currentTarget.files[0]);
                }}
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UploadProperty;

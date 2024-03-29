import React from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as yup from "yup";
import pb from './api/pocketbase';

const BlogForm = ({ onSubmit }: any) => {
  const initialValues = {
    title: '',
    content: [{ type: 'text', text: '' }],
  };

  const handleSubmit = async (values: any) => {
    // Perform any custom validation here
    // Call the onSubmit function if the form is valid

    const formData = new FormData();
    formData.append("formData", JSON.stringify(values));

    //alert(values);
    alert(JSON.stringify(values));
    try {
      await pb.collection("sampleblogposts").create(formData);
      alert("Article posted.");
    } catch (error) {
        alert("Error posting article: " + error);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values }) => (
        <Form className="max-w-xl mx-auto">
          <div className="mb-6">
            <Field
              type="text"
              id="title"
              name="title"
              className="block w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter title"
            />
            <ErrorMessage name="title" component="div" className="text-red-500" />
          </div>

          <FieldArray name="content">
            {({ push, remove }) => (
              <div>
                {values.content.map((item, index) => (
                  <div key={index} className="mb-6">
                    <label htmlFor={`content.${index}.type`} className="block mb-2 font-bold text-white">Type</label>
                    <Field
                      as="select"
                      name={`content.${index}.type`}
                      className="block w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                    >
                      <option value="text">Text</option>
                      <option value="image">Image</option>
                    </Field>

                    {item.type === 'text' && (
                      <div className="mt-4">
                        <label htmlFor={`content.${index}.text`} className="block mb-2 font-bold text-white">Text</label>
                        <Field
                          type="text"
                          name={`content.${index}.text`}
                          className="block w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                        />
                        <ErrorMessage
                          name={`content.${index}.text`}
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                    )}

                    {item.type === 'image' && (
                      <div className="mt-4">
                        <label htmlFor={'image'} className="block mb-2 font-bold text-white">Image</label>
                        {/* <Field
                          type="file"
                          name={`content.${index}.image`}
                          className="block w-full"
                    /> */}

                    <input id="images" name="images" type="file" onChange={(event) => {
                    setFieldValue(`context.${index}.image`, event.currentTarget.files[0]);
                  }} className="bg-white"/>

{/* Miguel Cunha */}
 {/* <div className="container">
        <Formik 
          initialValues={{ file: null }}
          onSubmit={(values) => {
            alert(
              JSON.stringify(
                { 
                  fileName: values.file.name, 
                  type: values.file.type,
                  size: `${values.file.size} bytes`
                },
                null,
                2
              )
            );
          }} 
          
          render={({ values, handleSubmit, setFieldValue }) => {
            return (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label for="file">File upload</label>
                  <input id="file" name="file" type="file" onChange={(event) => {
                    setFieldValue("file", event.currentTarget.files[0]);
                  }} className="form-control" />
                  <image file={values.file} />
                </div>
                <button type="submit" className="btn btn-primary">submit</button>
              </form>
            );
          }} />
      </div> */}
   {/* Miguel Cunha */}
                        <ErrorMessage
                          name={`content.${index}.image`}
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                    )}

                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="mt-2 px-4 py-2 text-sm text-white bg-red-600 rounded hover:bg-red-700 focus:outline-none focus:bg-red-700"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}

                <div>
                  <button
                    type="button"
                    onClick={() => push({ type: 'text', text: '' })}
                    className="mt-2 mr-2 px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                  >
                    Add Text
                  </button>
                  <button
                    type="button"
                    onClick={() => push({ type: 'image', image: '' })}
                    className="mt-2 px-4 py-2 text-sm text-white bg-green-600 rounded hover:bg-green-700 focus:outline-none focus:bg-green-700"
                  >
                    Add Image
                  </button>
                </div>
              </div>
            )}
          </FieldArray>

          <button
            type="submit"
            className="mt-6 px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default BlogForm;

import React, { useCallback } from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDropzone } from 'react-dropzone';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  content: Yup.array()
    .of(
      Yup.object().shape({
        type: Yup.string().oneOf(['text', 'image']),
        text: Yup.string().when('type', {
          is: 'text',
          then: Yup.string().required('Text is required'),
        }),
        image: Yup.mixed().when('type', {
          is: 'image',
          then: Yup.mixed().required('Image is required'),
        }),
      })
    )
    .required('Content is required'),
});

const BlogForm = ({ onSubmit }) => {
  const initialValues = {
    title: '',
    content: [{ type: 'text', text: '' }],
  };

  const handleDrop = useCallback(
    (acceptedFiles, index, setFieldValue) => {
      // Process the uploaded file
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setFieldValue(`content.${index}.image`, reader.result);
        };
        reader.readAsDataURL(file);
      }
    },
    []
  );

  const handleRemove = useCallback(
    (index, setFieldValue) => {
      setFieldValue(`content.${index}.image`, '');
    },
    []
  );

  const Dropzone = ({ onDrop }) => {
    const onDropCallback = useCallback(
      (acceptedFiles) => {
        if (onDrop) {
          onDrop(acceptedFiles);
        }
      },
      [onDrop]
    );

    const { getRootProps, getInputProps } = useDropzone({ onDrop: onDropCallback, accept: 'image/*' });

    return (
      <div {...getRootProps()} className="border border-dashed rounded p-4">
        <input {...getInputProps()} />
        <p className="text-center text-white">Drag and drop an image here, or click to select a file.</p>
      </div>
    );
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} /*onSubmit={onSubmit}*/
    onSubmit={(values, actions) => {
        // Call the onSubmit function and show success message
        onSubmit(values);
        alert("bamako");
       // setSuccessMessage('Blog post submitted successfully!');
       // actions.resetForm();
      }}
    >
      {({ values, setFieldValue }) => (
        <Form className="max-w-xl mx-auto">
          <div className="mb-6">
            <label htmlFor="title" className="block mb-2 font-bold text-white">Title</label>
            <Field
              type="text"
              id="title"
              name="title"onSubmit={(values, actions) => {
        // Call the onSubmit function and show success message
        onSubmit(values);
        setSuccessMessage('Blog post submitted successfully!');
        actions.resetForm();
      }}
              className="block w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
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
                        <label htmlFor={`content.${index}.image`} className="block mb-2 font-bold text-white">Image</label>
                        {item.image ? (
                          <div className="relative">
                            <img src={item.image} alt={`Image ${index + 1}`} className="max-w-full h-auto" />
                            <button
                              type="button"
                              onClick={() => handleRemove(index, setFieldValue)}
                              className="absolute top-0 right-0 mt-1 mr-1 px-2 py-1 text-xs text-white bg-red-500 rounded-full focus:outline-none focus:bg-red-600"
                            >
                              Remove
                            </button>
                          </div>
                        ) : (
                          <Dropzone
                            onDrop={(acceptedFiles) => handleDrop(acceptedFiles, index, setFieldValue)}
                          />
                        )}
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

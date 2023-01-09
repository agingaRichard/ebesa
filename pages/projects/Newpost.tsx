import ImageUpload from "../../components/ImageUpload";
import { useFormik } from "formik";
import { useState } from "react";
import PocketBase from "pocketbase";

const Newpost = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const updateState = (variable) => {
    setFiles(variable);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      text: "",
      images: [],
    },

    //validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const newPost = await JSON.stringify(values);
        alert(newPost);
        const pb = new PocketBase("http://127.0.0.1:8090");
        await pb.collection("projects").create(newPost);

        //await create(values);
      } catch (err) {
        alert(err);
      }
      //navigate("/");
      return;
    },
  });

  const updateFormik = (mydata) => {
    let initfiles = formik.values.files;
    return formik.setFieldValue("files", mydata);
  };

  const fileList = files ? [...files] : [];

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div class="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800 space-x-4 space-y-4">
          <input
            name="title"
            onChange={formik.handleChange}
            value={formik.values.title}
            id="title"
            type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Title"
            required
          />

          <textarea
            id="editor"
            name="text"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.text}
            rows="12"
            class="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
            placeholder="Write an article..."
            required
          ></textarea>

          <input
            id="images"
            name="images"
            //onChange={formik.handleChange}
            value={formik.values.images}
            accept="image/*"
            onChange={(e) => {
              formik.handleChange;
              let uploads = e.target.files;
              let myFiles = Array.from(uploads);
              //updateState(myFiles);
              //formik.setFieldValue("images", uploads);
            }}
            class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            type="file"
            multiple
          />
        </div>
        <img src="files" />
        <button
          type="submit"
          class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
        >
          Publish
        </button>
      </form>
    </div>
  );
};

export default Newpost;

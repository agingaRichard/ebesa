import ImageUpload from "../../components/ImageUpload";
import Image from "next/image";
import FileInput, { useFormik } from "formik";
import { useState, useContext } from "react";
import pb from "../api/pocketbase";
import { UserContext } from "../../context/user-context";
import { useRouter } from "next/router";

const Newpost = () => {
  const [state, dispatch] = useContext(UserContext);
  const router = useRouter();
  //const [files, setFiles] = useState<FileList | null>(null);
  const [files, setFiles] = useState([]);
  const updateState = (variable) => {
    setFiles(variable);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
      images: {},
      author: state.user,
    },

    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("body", values.body);
      formData.append("images", document.getElementById("images").files[0]);
      try {
        const newPost = await JSON.stringify(formData);
        console.log(values);
        await pb.collection("articles").create(formData);
      } catch (err) {
        alert("Formik error: " + err);
      }
      //navigate("/");
      return;
    },
  });

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
            id="body"
            name="body"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.body}
            rows="12"
            class="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
            placeholder="Write an article..."
            required
          ></textarea>

          <input
            id="images"
            name="images"
            type="file"
            // value={formik.values.images}
            // onChange={formik.handleChange}
            onChange={(e) => {
              console.log(e.currentTarget.files[0]);
              // setFiles(files.push(e.currentTarget.files[0]));
            }}
          />
          <textarea
            id="caption"
            name="caption"
            type="text"
            // onChange={formik.handleChange}
            // value={formik.values.body}
            rows="3"
            class="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
            placeholder="Write a caption..."
          ></textarea>
        </div>
        <Image
          class="rounded-full w-10 h-10"
          width={60}
          height={60}
          src={files[0]}
          type="submit"
          // alt="my"
        />
        <button class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
          Publish
        </button>
      </form>
    </div>
  );
};

export default Newpost;

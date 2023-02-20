import pb from "../api/pocketbase";
import { useFormik } from "formik";

const newGallery = () => {
  const userModel = pb.authStore.model;
  const formik = useFormik({
    initialValues: {
      title: "",
      text: "",
      images: {},
      author: userModel?.id,
    },

    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("text", values.text);
      formData.append("images", document.getElementById("images").files[0]);
      formData.append("author", values.author);
      try {
        await pb.collection("gallery").create(formData);
        await alert("Project posted.");
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
            id="text"
            name="text"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.text}
            rows="4"
            class="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
            placeholder="Write a description..."
            required
          ></textarea>

          <input id="images" name="images" type="file" multiple/>

          {/* <textarea
            id="caption"
            name="caption"
            type="text"
            rows="3"
            class="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
            placeholder="Write a caption..."
          ></textarea> */}
        </div>
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

export default newGallery;

import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useContext, useEffect } from "react";
import { createEmitAndSemanticDiagnosticsBuilderProgram } from "typescript";
import { UserContext } from "../../context/user-context";
import pb from "../api/pocketbase";

function ViewPost() {
  const router = useRouter();
  const [state, dispatch] = useContext(UserContext);
  const record = pb.collection("articles").getOne(router.query.id, {
    expand: "relField1,relField2.subRelField",
  });
  alert(record);

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
        await pb.collection("articles").update("RECORD_ID", data);

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

  return (
    <div>
      <form>
        <div>
          <label
            for="title"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Edit title
          </label>
          <input
            type="text"
            id="email"
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="enter title here"
          />
        </div>
        <div class="mb-6">
          <label
            for="body"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Edit body
          </label>
          <input
            type="text"
            id="body"
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="enter text here"
          />
        </div>
      </form>
    </div>
  );
}

export default ViewPost;

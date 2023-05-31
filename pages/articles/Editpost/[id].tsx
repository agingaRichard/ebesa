import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useContext, useEffect } from "react";
import { createEmitAndSemanticDiagnosticsBuilderProgram } from "typescript";
import { UserContext } from "../../../context/user-context";
import pb from "../../api/pocketbase";

function EditPost() {
  // const router = useRouter();
  // var myQuery = router.query.id?.toString() ?? "";
  // const [state, dispatch] = useContext(UserContext);
  // const record = pb.collection("articles").getOne(myQuery, {
  //   expand: "relField1,relField2.subRelField",
  // });
  // const record = "sample record";
  // alert(record);

  // const [files, setFiles] = useState<FileList | null>(null);
  // const updateState = (variable: any) => {
  //   setFiles(variable);
  // };

  // const formik = useFormik({
  //   initialValues: {
  //     title: "",
  //     text: "",
  //     images: [],
  //   },

  //validationSchema: validationSchema,
  //   onSubmit: async (values: any) => {
  //     try {
  //       const newPost = await JSON.stringify(values);
  //       alert(newPost);
  //       await pb.collection("articles").update("RECORD_ID", data);

  //       //await create(values);
  //     } catch (err) {
  //       alert(err);
  //     }
  //     //navigate("/");
  //     return;
  //   },
  // }

  // const updateFormik = (mydata: any) => {
  //   let initfiles = formik.values.files;
  //   return formik.setFieldValue("files", mydata);
  // };

  return (
    <div>
      <form>
        <div>
          <input
            type="text"
            id="email"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="enter title here"
          />
        </div>
        <div className="mb-6">
          <input
            type="text"
            id="body"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="enter text here"
          />
        </div>
      </form>
    </div>
  );
}

export default EditPost;

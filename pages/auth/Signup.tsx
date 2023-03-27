import { useFormik } from "formik";
import pb from "../api/pocketbase";
import { useRouter } from "next/router";

const Signup = () => {
  const router = useRouter();

  //Managing form data
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      noun: "",
      password: "",
      passwordConfirm: "",
      // avatar: "",
    },

    //validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      try {
        //Create a form with the user's data
        const formData = new FormData();
        formData.append("firstName", values.firstName);
        formData.append("lastName", values.lastName);
        formData.append("email", values.email);
        formData.append("noun", values.noun);
        formData.append("password", values.password);
        formData.append("passwordConfirm", values.passwordConfirm);
        formData.append(
          "avatar",
          (document.getElementById("avatar") as HTMLInputElement).files![0]
        );

        //Save the user on the server
        const record = await pb.collection("users").create(formData);
        alert("Account created.");
        await router.push("/auth/Signin");
      } catch {
        alert(JSON.stringify(values));
        // alert("Account creation failed.");
      }
      // navigate("/");
      return;
    },
  });

  return (
    <div className="space-y-6 w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <form onSubmit={formik.handleSubmit}>
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">
          Sign up!
        </h5>
        <div>
          <label
            htmlFor="firstName"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            First name
          </label>
          <input
            type="firstName"
            name="firstName"
            onChange={formik.handleChange}
            value={formik.values.firstName}
            id="firstName"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="John"
            required
          />
          <label
            htmlFor="lastName"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Last name
          </label>
          <input
            type="lastName"
            name="lastName"
            onChange={formik.handleChange}
            value={formik.values.lastName}
            id="lastName"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="Doe"
            required
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="name@company.com"
            onChange={formik.handleChange}
            value={formik.values.email}
            required
          />
        </div>

        <div>
          <label
            htmlFor="noun"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Role/noun
          </label>
          <input
            type="name"
            name="noun"
            id="noun"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="e.g LECTURER, STUDENT, ALUMNUS, etc..."
            onChange={formik.handleChange}
            value={formik.values.noun}
            required
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            onChange={formik.handleChange}
            value={formik.values.password}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>
        <div>
          <label
            htmlFor="passwordConfirm"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Confirm Password
          </label>
          <input
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
            placeholder="••••••••"
            onChange={formik.handleChange}
            value={formik.values.passwordConfirm}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>
        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="file_input"
          >
            Upload photo
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="avatar"
            name="avatar"
            type="file"
          />
        </div>
        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5"
        >
          Create account
        </button>
      </form>
    </div>
  );
};

export default Signup;

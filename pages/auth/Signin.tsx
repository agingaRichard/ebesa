// import { useContext } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import pb from "../api/pocketbase";
import { useRouter } from "next/router";

const Signin = () => {
  const router = useRouter();

  //Managing form data
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    //validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      const authData = await pb
        .collection("users")
        .authWithPassword(values.email, values.password);

      // console.log(pb.authStore.token);
      // console.log(pb.authStore.model.id);

      if (pb.authStore.isValid) {
        await alert("Welcome!");
        router.push("/");
      } else {
        alert("Authentication failed.");
      }
    },
  });

  return (
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={formik.handleSubmit}>
        <h5 className="text-xl font-medium text-white">Sign in</h5>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-white"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 text-white"
            placeholder="name@company.com"
            onChange={formik.handleChange}
            value={formik.values.email}
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-white">
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
        <div className="flex items-start p-5">
          <div className="text-sm text-white">
            New user?
            <Link
              href="/auth/Signup"
              className="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500 pl-2"
            >
              Sign up here
            </Link>
          </div>
        </div>
        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login to your account
        </button>
      </form>
    </div>
  );
};

export default Signin;

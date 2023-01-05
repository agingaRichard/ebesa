import { useContext } from "react";
import { useFormik } from "formik";

import { UserContext } from "../../context/user-context.js";

const login = async (data) => {
  const res = await fetch(
    "http://127.0.0.1:8090/api/collections/users/auth-with-password",
    {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const Signin = () => {
  const [state, dispatch] = useContext(UserContext);

  //Managing form data
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    //validationSchema: validationSchema,
    onSubmit: async (values) => {
      const profile = await JSON.stringify(values);
      alert(JSON.stringify(profile));
      /*const authData = await pb
        .collection("users")
        .authWithPassword(profile.email, profile.password);

      //Set user context
      /*await dispatch({
        type: "SET_USER",
        payload: {
          id: profile.id,
          firstName: profile.firstName,
          lastName: profile.lastName,
          email: profile.email,
        },
      });*/

      //navigate("/");
      return;
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <h5 class="text-xl font-medium text-gray-900 dark:text-white">
          Sign in
        </h5>
        <div>
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="name@company.com"
            onChange={formik.handleChange}
            value={formik.values.email}
            required
          />
        </div>
        <div>
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            label="password"
            placeholder="••••••••"
            onChange={formik.handleChange}
            value={formik.values.password}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>
        <div class="flex items-start">
          <div class="flex items-start pb-5">
            <a
              href="#"
              class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500 pt-5"
            >
              Lost Password?
            </a>
          </div>
        </div>
        <button
          type="submit"
          class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login to your account
        </button>
      </form>
    </div>
  );
};

export default Signin;

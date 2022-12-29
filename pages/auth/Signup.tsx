import { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

//import pb from "../api/pocketbase.js";
import register from "../api/pocketbase";
import { UserContext } from "../../context/user-context.js";

/*const register = (data) => {
  pb.Users.create(data)
    .then((result) => {
      console.log("Result:", result);
    })
    .catch((error) => {
      console.log("Error:", error);
    });
};*/

const Signup = () => {
  //Managing state
  const [state, dispatch] = useContext(UserContext);

  //Managing form data
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },

    //validationSchema: validationSchema,
    onSubmit: async (values) => {
      const profile = await JSON.stringify(values);
      alert(profile);
      await register(values);

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
    <div class="space-y-6 w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <form onSubmit={formik.handleSubmit}>
        <h5 class="text-xl font-medium text-gray-900 dark:text-white">
          Sign up!
        </h5>
        <div>
          <label
            for="firstName"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            First name
          </label>
          <input
            type="firstName"
            name="firstName"
            onChange={formik.handleChange}
            value={formik.values.firstName}
            id="firstName"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="John"
            required
          />
          <label
            for="lastName"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Last name
          </label>
          <input
            type="lastName"
            name="lastName"
            onChange={formik.handleChange}
            value={formik.values.lastName}
            id="lastName"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="Doe"
            required
          />
        </div>

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
        <button
          type="submit"
          class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5"
        >
          Create account
        </button>
      </form>
    </div>
  );
};

export default Signup;

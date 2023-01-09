import React, { useState, useEffect } from "react";

const ImageUpload = () => {
  const [currentFile, setCurrentFile] = useState();
  const [previewImage, setPreviewImage] = useState();
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  const [imageInfos, setImageInfos] = useState([]);

  const selectFile = (event) => {
    setCurrentFile(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
    setProgress(0);
    setMessage("");
  };

  return (
    <div>
      {/**Start Modal */}

      <button
        type="button"
        data-modal-target="crypto-modal"
        data-modal-toggle="crypto-modal"
        class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-blue-700 bg-white rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
      >
        <svg
          aria-hidden="true"
          class="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          ></path>
        </svg>
        Connect wallet
      </button>

      <div
        id="crypto-modal"
        tabindex="-1"
        aria-hidden="true"
        class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
      >
        <div class="relative w-full h-full max-w-md md:h-auto">
          {/*<!-- Modal content -->*/}
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-hide="crypto-modal"
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
            {/*<!-- Modal header -->*/}
            <div class="px-6 py-4 border-b rounded-t dark:border-gray-600">
              <h3 class="text-base font-semibold text-gray-900 lg:text-xl dark:text-white">
                Upload Image{" "}
              </h3>
            </div>
            {/*<!-- Modal body -->*/}
            <div class="p-6">
              <p class="text-sm font-normal text-gray-500 dark:text-gray-400">
                Connect with one of our available wallet providers or create a
                new one.
              </p>
              
<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="multiple_files">Upload files</label>
<input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="multiple_files" type="file" multiple>

            </div>
          </div>
        </div>
      </div>

      {/*Endmodal*/}

 
    </div>
  );
};

export default ImageUpload;

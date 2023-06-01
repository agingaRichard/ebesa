import Link from "next/link";
import Image from "next/image";
import pb from "../pages/api/pocketbase";

const GalleryCard = (props: any) => {
  let id = props.item.id;
  let title = props.item.title;
  let text = props.item.text;
  let images = props.item.images[0];
  let approval = props.item.approval;

  //Generate links to images
  const myCollectionId = pb.collection("gallery").collectionIdOrName;
  const mysrc =
    `https://sweet-optician.pockethost.io/api/files/${myCollectionId}/${id}/` + images;

  return (
    <div className="max-w-sm flex flex-col rounded-lg overflow-hidden bg-white shadow">
      {/* <!-- card cover --> */}
      <img
        className="h-56 w-full object-cover"
        src={mysrc}
        width={40}
        height={40}
        alt="Card Cover"
      />
      {/* <!-- end card cover --> */}

      {/* <!-- card content --> */}
      <div className="flex-1 px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        {pb.authStore.isValid ? (
          approval ? (
            <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
              Approved
            </span>
          ) : (
            <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
              Not Approved
            </span>
          )
        ) : (
          <></>
        )}
      </div>
      {/* <!-- end card content --> */}

      {/* <!-- card footer --> */}
      <div className="px-6 py-4 bg-gray-100">
        <Link href={`/galleries/${id}`}>
          <button
            type="button"
            className="bg-blue-600 hover:bg-blue-700 py-2 px-4 text-sm font-medium text-white border border-transparent rounded-lg focus:outline-none"
          >
            Read more...
          </button>
        </Link>
      </div>
      {/* <!-- end card footer --> */}
    </div>
  );
};

export default GalleryCard;

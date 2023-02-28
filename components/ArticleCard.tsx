import Link from "next/link";
import Image from "next/image";
import pb from "../pages/api/pocketbase";

const ArticleCard = (props) => {
  let id = props.item.id;
  let title = props.item.title;
  let text = props.item.text;
  let images = props.item.images;

  //Generate links to images
  const myCollectionId = pb.collection("articles").collectionIdOrName;
  const mysrc =
    `http://127.0.0.1:8090/api/files/${myCollectionId}/${id}/` + images;

  return (
    <div class="max-w-sm flex flex-col rounded-lg overflow-hidden bg-white shadow">
      {/* <!-- card cover --> */}
      <img
        class="h-56 w-full object-cover"
        src={mysrc}
        width={40}
        height={40}
        alt="Card Cover"
      />
      {/* <!-- end card cover --> */}

      {/* <!-- card content --> */}
      <div class="flex-1 px-6 py-4">
        <div class="font-bold text-xl mb-2">{title}</div>
        <p class="text-gray-700 text-base">{text?.slice(0, 80)}...</p>
      </div>
      {/* <!-- end card content --> */}

      {/* <!-- card footer --> */}
      <div class="px-6 py-4 bg-gray-100">
        <Link href={`/articles/Viewpost/${id}`}>
          <button
            type="button"
            class="bg-blue-600 hover:bg-blue-700 py-2 px-4 text-sm font-medium text-white border border-transparent rounded-lg focus:outline-none"
          >
            Read more...
          </button>
        </Link>
      </div>
      {/* <!-- end card footer --> */}
    </div>
  );
};

export default ArticleCard;

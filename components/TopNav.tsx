import Image from "next/image";
import pb from "../pages/api/pocketbase";
import Link from "next/link";

const TopNav = () => {
  const userModel = pb.authStore.model;
  const myAvatar = userModel?.avatar;
  const mysrc = `https://sweet-optician.pockethost.io/api/files/_pb_users_auth_/${userModel?.id}/${myAvatar}?thumb=100x100`;
  return (
    <div className="p-4 flex justify-between transparent">
      <Link href="/" className="">
        <Image
          src="/images/my-EBESA.png"
          width={120}
          height={40}
          alt="Ebesa icon"
        />
      </Link>
      {pb.authStore.isValid ? (
        <Link href="/Profile">
          <img
            src={mysrc}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
            alt="Myimg"
          />
          {/* <embed src={myAvatar} width="300" height="300"></embed> */}
        </Link>
      ) : (
        <Link href="/auth/Signin">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </Link>
      )}
    </div>
  );
};

export default TopNav;

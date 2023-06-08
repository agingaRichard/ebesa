import pb from "../pages/api/pocketbase";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

const DesktopNav = () => {

    const userModel = pb.authStore.model;
    const myAvatar = userModel?.avatar;
    const mysrc = `https://sweet-optician.pockethost.io/api/files/_pb_users_auth_/${userModel?.id}/${myAvatar}?thumb=100x100`;

    const router = useRouter();

    async function logout() {
        await pb.authStore.clear();
        router.push("/");
    }

    return (
        <div className="w-full md:flex justify-between hidden md:visible py-4 bg-white px-4">

            <Link href="/">
                <Image
                    src="/images/mobilelogo.jpg"
                    width={120}
                    height={40}
                    alt="Ebesa icon"
                />
            </Link>
            <div>
                <ul className="md:flex flex-wrap justify-center text-black">
                    {/* <li>
                        <Link href="/Articlespage" className="px-2 text-black">
                            Articles
                        </Link>
                    </li>
                    <li>
                        <Link href="/Projectspage" className="px-2">
                            Projects
                        </Link>
                    </li> */}
                    <li>
                        <Link href="/galleries/Galleries" className="px-2">
                            Gallery
                        </Link>
                    </li>
                    <li>
                        <Link href="events/Events" className="px-2">
                            Events
                        </Link>
                    </li>
                    <li>
                        <Link href="/Members" className="px-2">
                            Members
                        </Link>
                    </li>
                    <li>
                        <Link href="/Contacts" className="px-2">
                            Contacts
                        </Link>
                    </li>
                </ul>
            </div>
            <div>
                {pb.authStore.isValid ? (
                    <>
                        <Link href="/Profile">
                            <img
                                src={mysrc}
                                width={40}
                                height={40}
                                className="w-10 h-10 rounded-full"
                                alt="Myimg"
                            />
                        </Link>
                    </>
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
        </div>
    );
}

export default DesktopNav;
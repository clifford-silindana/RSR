import Link from "next/link";
import Image from "next/image";

const CustomHeader = () => {
    return (
        <>
            <header
                className="sticky top-0 z-999 flex w-full bg-darkblue drop-shadow-1 dark:bg-white dark:drop-shadow-none">
                <div className="justify-start align-middle px-4 py-4 shadow-2 md:px-6 2xl:px-11">
                    <Link className="block flex-shrink-0 " href="/">
                        <Image
                            width={100}
                            height={50}
                            src={"/images/logo/rsr-header-logo.png"}
                            alt="Logo"
                        />
                    </Link>
                </div>
                <div className="flex flex-grow items-center justify-end px-4 py-4 shadow-2 md:px-6 2xl:px-11">
                    <ol className="flex items-center gap-6">
                        <li>
                            <Link className="font-light text-white hover:underline" href="/">
                                Help
                            </Link>
                        </li>
                        <li>
                            <Link className="font-light text-white hover:underline" href="/">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link className="font-light text-white hover:underline" href="/">
                                Contact Us
                            </Link>
                        </li>
                    </ol>
                </div>
            </header>
            <header
                className="sticky top-0 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none border-b-1 border-gray">

                <div className="flex flex-grow items-center justify-start px-4 py-4 shadow-2 md:px-6 2xl:px-11">
                    <ol className="flex items-center gap-6">
                        <li>
                            <Link className="font-light text-black hover:underline" href="/">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link className="font-light text-black hover:underline" href="/">
                                Check SCG License
                            </Link>
                        </li>
                        <li>
                            <Link className="font-light text-black hover:underline" href="/auth/registration">
                                New Registration
                            </Link>
                        </li>
                        <li>
                            <Link className="font-light text-black hover:underline" href="/">
                                Private Individual user SCG Registration
                            </Link>
                        </li>
                    </ol>
                </div>
            </header>
        </>
    );
}
export default CustomHeader;
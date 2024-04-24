import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import Form from "./form";

export const metadata: Metadata = {
  title: "Sign In | Nims RSR ",
  description: "Sign In page",
  // other metadata
};

const SignIn: React.FC = () => {
  return (
    <>
      <Breadcrumb pageName="Sign In" enableBackButton />

      <div className="rounded-lg border border-stroke bg-boxdark-2 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2 ">
            <div className="py-17.5 px-26 text-center">
              <Link className="mb-5.5 inline-block" href="/">
                <Image
                  className="hidden dark:block"
                  src={"/images/logo/rsr-header-logo.png"}
                  alt="Logo"
                  width={176}
                  height={32}
                />
                <Image
                  className="dark:hidden"
                  src={"/images/logo/rsr-header-logo.png"}
                  alt="Logo"
                  width={176}
                  height={32}
                />
              </Link>
            </div>
          </div>
          <div className="w-full bg-white border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                <Link href="/auth/signin">
                  Sign in
                </Link>
              </h2>
              <Form />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;

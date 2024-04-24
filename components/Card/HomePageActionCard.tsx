import React from "react";
import Image from "next/image";
import Link from "next/link";
import imageSrc from "../../public/images/brand/Black and White Basic Presentation Template.png";
import iconSrc from "../../public/images/brand/icons8-id-card-96.png";
import iconSrcLogin from "../../public/images/brand/icons8-log-in-96.png";
// import iconSrcLogin from "../../public/images/brand/icons8-log-in-96.png";
import iconSrcdDash from "../../public/images/brand/dashboard.png";
import useSession from "@/hooks/useSession";

interface MyComponentProps {
  items: {
    href: string;
    imageSrc: string;
    alt: string;
    title: string;
    iconSrc: string;
  }[];
}

const HomePageActionCard: React.FC<MyComponentProps> = ({ items }) => {

  const { session } = useSession();
  return (

    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">

      {session?.user ? (
        <div className="w-full xl:w-1/2">
          <div className="h-70 rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="w-full h-full relative">
              <Image
                src={imageSrc}
                alt="presentation template"
                width={250}
                height={250}
                className="animate-fadeIn rounded-md"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Link
                  href="/safetypermit"
                  className="circle flex h-35 w-35 items-center justify-center rounded-full bg-gray cursor-pointer">
                  <div className="relative w-20 h-20">
                    <Image
                      src={iconSrcdDash}
                      alt="icons "
                      objectFit="cover"
                      width={250}
                      height={250}
                      className="animate-fadeIn rounded-md"
                    />
                  </div>
                </Link>
                <div className="text-center mt-6">
                  <p className="text-xl font-medium text-black">Dashboard</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="w-full xl:w-1/2">
            <div className="h-70 rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="w-full h-full relative">
                <Image
                  src={imageSrc}
                  alt="presentation template"
                  width={250}
                  height={250}
                  className="animate-fadeIn rounded-md"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Link
                    href="/auth/registration"
                    className="circle flex h-35 w-35 items-center justify-center rounded-full bg-gray cursor-pointer">
                    <div className="relative w-20 h-20">
                      <Image
                        src={iconSrc}
                        alt="icons "
                        objectFit="cover"
                        width={250}
                        height={250}
                        className="animate-fadeIn rounded-md"
                      />
                    </div>
                  </Link>
                  <div className="text-center mt-6">
                    <p className="text-xl font-medium text-black">
                      Operator Sign Up
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full xl:w-1/2">
            <div className="h-70 rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="w-full h-full relative">
                <Image
                  src={imageSrc}
                  alt="presentation template"
                  width={250}
                  height={250}
                  className="animate-fadeIn rounded-md"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Link
                    href="/auth/signin"
                    className="circle flex h-35 w-35 items-center justify-center rounded-full bg-gray cursor-pointer">
                    <div className="relative w-20 h-20">
                      <Image
                        src={iconSrcLogin}
                        alt="icons "
                        objectFit="cover"
                        width={250}
                        height={250}
                        className="animate-fadeIn rounded-md"
                      />
                    </div>
                  </Link>
                  <div className="text-center mt-6">
                    <p className="text-xl font-medium text-black">Log In</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {items.map((item, index) => (
        <div key={index} className="w-full xl:w-1/2">
          <div className="h-70 rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark hover:border-dotted">
            <div className="w-full h-full relative">
              <Image
                src={item.imageSrc}
                alt={item.alt}
                fill={true}
                style={{ objectFit: "cover" }}
                className="animate-fadeIn rounded-md"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Link
                  href={item.href}
                  className="circle flex h-35 w-35 items-center justify-center rounded-full bg-gray cursor-pointer">
                  <div className="relative w-20 h-20">
                    <Image
                      src={item.iconSrc}
                      alt={item.alt}
                      objectFit="cover"
                      layout="fill"
                      className="animate-fadeIn rounded-md"
                    />
                  </div>
                </Link>
                <div className="text-center mt-6">
                  <p className="text-xl font-medium text-black">{item.title}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePageActionCard;

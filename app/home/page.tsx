"use client";
import Carousel from "@/components/Carousel/Carousel";
import React from "react";
import { carouselImages, homeNavigationItems } from "@/common/data";
import HomePageActionCard from "@/components/Card/HomePageActionCard";
import Image from "next/image";
import Link from "next/link";
import useSession from "@/hooks/useSession";

const HomePage = () => {
  const { signIn, signOut, session, serverError } = useSession();
  return (
    <>
      <div className="flex flex-col items-center ">
        <p className="text-xl font-light text-black ">Welcome to NIIMS </p>
        <h2 className="mb-9 text-6xl  text-black mt-2">Get Started</h2>
        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row mt-8">
          {session?.user ? (
            <>
              {session?.user?.roleId == "75f5e745-ba42-4c25-8fc4-68051184ccfb" || session?.user?.roleId == "53de4378-f782-43f4-9f91-2be48bc535cc" ?
                < Link href="/admin" className="h-70 w-60 rounded-sm bg-white p-5 border border-stroke shadow-default flex flex-col items-center space-y-2 border-solid  cursor-pointer hover:border-primary">
                  <Image
                    src={"/images/icons8-dashboard-96.png"}
                    alt="presentation template"
                    width={60}
                    height={60}
                    className="animate-fadeIn rounded-md"
                  />
                  <p className="text-xl font-medium text-black text-center">
                    Permit Management Admin
                  </p>
                  <p className="text-base font-light text-black text-center">
                    View your all safety permits,registrations and admin features.
                  </p>
                </Link> :

                <div style={{flexDirection:'row',  flex:1, display:'flex', justifyContent:'space-between'}}>
                  <Link href="/safetypermit" className="h-70 w-60 rounded-sm bg-white p-5 border border-stroke shadow-default flex flex-col items-center space-y-2 border-solid  cursor-pointer hover:border-primary">
                    <Image
                      src={"/images/icons8-dashboard-96.png"}
                      alt="presentation template"
                      width={60}
                      height={60}
                      className="animate-fadeIn rounded-md"
                    />
                    <p className="text-xl font-medium text-black text-center">
                      Permit Management
                    </p>
                    <p className="text-base font-light text-black text-center">
                      View your existing safety permits; Apply,Amend, Renew or Track Safety Permits.
                    </p>
                  </Link>
                  <Link href="/occurence" className="h-70 w-60 rounded-sm bg-white p-5 border border-stroke shadow-default flex flex-col items-center space-y-2 border-solid  cursor-pointer hover:border-primary">
                    <Image
                      src={"/images/icons8-dashboard-100.png"}
                      alt="presentation template"
                      width={60}
                      height={60}
                      className="animate-fadeIn rounded-md"
                    />
                    <p className="text-xl font-medium text-black text-center">
                    Occurrences
                    </p>
                    <p className="text-base font-light text-black text-center">
                      View your existing occurrences. Create occurrences.
                    </p>
                  </Link>
                </div>
              }
            </>
          ) : (
            <>
              <Link href="/auth/registration" className="h-70 w-60 rounded-sm bg-white p-5 border border-stroke shadow-default flex flex-col items-center space-y-2 border-solid  cursor-pointer hover:border-primary">
                <Image
                  src={"/images/icons8-register-96.png"}
                  alt="presentation template"
                  width={60}
                  height={60}
                  className="animate-fadeIn rounded-md"
                />
                <p className="text-xl font-medium text-black text-center">
                  Operator Sign Up
                </p>
                <p className="text-base font-light text-black text-center">
                  Operators could be individuals or entities responsible for
                  managing or providing specific services
                </p>
              </Link>

              <Link href="/auth/signin" className="h-70 w-60 rounded-sm bg-white p-5 border border-stroke shadow-default flex flex-col items-center space-y-2 border-solid  cursor-pointer hover:border-primary">
                <Image
                  src={"/images/icons8-login-96.png"}
                  alt="presentation template"
                  width={60}
                  height={60}
                  className="animate-fadeIn rounded-md"
                />
                <p className="text-xl font-medium text-black text-center">
                  Log In
                </p>
                <p className="text-base font-light text-black text-center">
                  Sign in to your account to view personalized content and perform secure actions.
                </p>
              </Link>
            </>
          )}


          {/* <Link href="/" className="h-70 w-60 rounded-sm bg-white p-5 border border-stroke shadow-default flex flex-col items-center space-y-2 border-solid  cursor-pointer hover:border-primary">
            <Image
              src={"/images/icons8-registration-96.png"}
              alt="presentation template"
              width={60}
              height={60}
              className="animate-fadeIn rounded-md"
            />
            <p className="text-xl font-medium text-black text-center">
              Private Individual user SCG Registration
            </p>
            <p className="text-base font-light text-black text-center">
              Verifying or confirming the validity and status of a license
              associated with the SCG.
            </p>
          </Link> */}

          {/* <Link href="/" className="h-70 w-60 rounded-sm bg-white p-5 border border-stroke shadow-default flex flex-col items-center space-y-2 border-solid  cursor-pointer hover:border-primary">
            <Image
              src={"/images/icons8-search-120.png"}
              alt="presentation template"
              width={60}
              height={60}
              className="animate-fadeIn rounded-md"
            />
            <p className="text-xl font-medium text-black text-center">
              Check SCG License
            </p>
            <p className="text-base font-light text-black text-center">
              Verifying or confirming the validity and status of a license
              associated with the SCG.
            </p>
          </Link> */}
        </div>
      </div >
    </>
  );
};
export default HomePage;

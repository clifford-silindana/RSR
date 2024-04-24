"use client";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import CheckboxFour from "@/components/Checkboxes/CheckboxFour";
import CheckboxThree from "@/components/Checkboxes/CheckboxThree";
//import useSession from "@/hooks/useSession";
import useSession from "@/hooks/useSession";
import { useRouter, useSearchParams } from "next/navigation";
import config from "@/common/config.json";
import Loader from "@/components/common/Loader";
const form = () => {
  const { signIn, signOut, session, serverError, checkSession } = useSession();

  useEffect(() => {
    //MANUALLY FETCH TOKEN
    var verify = async () => {
      if (session?.user == null && location.href.indexOf("OAuthCallback") > 0) {
        try {
          const signInResponse = await signIn("openiddict", {
            username: "fake@fake.co.za",
            password: "dev1212123Qwe",
          });

          if (signInResponse?.user || session) {
            router.push("/admin");
          } else {
            const valid = await checkSession();
            if (valid) {
              router.push("/admin");
            } else {
              setError(
                "AD Login Failed, check if you have been assigned to a role."
              );
            }
          }
        } catch (e) {}
      }
    };
    if (serverError == null) {
      verify();
    }
  });

  const router = useRouter();
  const userName = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    const signInResponse = await signIn("credentials", {
      username: userName.current?.value,
      password: password.current?.value,
    });

    if (signInResponse?.user || session) {
      router.push("/safetypermit");
      setLoading(false);
    } else {
      debugger;
      const valid = await checkSession();
      setLoading(false);
      if (valid) {
        router.push("/safetypermit");
      } else {
        setError("Incorect email or password");
      }
    }
  };

  const handleSignInAD = async (e) => {
    setLoading(true);
    e.preventDefault();
    const signInResponse = await signIn("openiddict", {
      username: "Null",
      password: "Null",
    });

    if (signInResponse.userId || session) {
      setLoading(false);
      router.push("/admin");
    } else {
      const valid = await checkSession();
      setLoading(false);
      if (valid) {
        router.push("/admin");
      } else {
        setError("AD Login Failed, check if you have been assigned to a role.");
      }
    }
  };
  return (
    <form>
      {error && <span className="p-4 mb-2 text-white bg-danger">{error}</span>}
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="mb-4">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Email
            </label>
            <div className="relative">
              <input
                ref={userName}
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />

              <span className="absolute right-4 top-4">
                <svg
                  className="fill-current"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.5">
                    <path
                      d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                      fill=""
                    />
                  </g>
                </svg>
              </span>
            </div>
          </div>

          <div className="mb-6">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Password
            </label>
            <div className="relative">
              <input
                ref={password}
                type="password"
                placeholder="6+ Characters, 1 Capital letter"
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />

              <span className="absolute right-4 top-4">
                <svg
                  className="fill-current"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.5">
                    <path
                      d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                      fill=""
                    />
                    <path
                      d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                      fill=""
                    />
                  </g>
                </svg>
              </span>
            </div>
          </div>

          <div className="mb-5">
            <input
              type="submit"
              onClick={handleSignIn}
              value="Sign In (Operator)"
              className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
            />
          </div>
          <div className="mb-5">
            <Link
              href={`/account/loginwithad?redirect_uri=${config.PUBLIC_APP_URL}auth/signin?OAuthCallback`}
              passHref={true}
            >
              <div className="text-center w-full cursor-pointer rounded-lg border border-l-boxdark-2 bg-darkblue p-4 text-white transition hover:bg-opacity-90">
                {/* <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
              <path fill="#e65100" d="M36.883,7.341C38.726,7.85,40,9.508,40,11.397v25.162c0,1.906-1.301,3.57-3.168,4.065L25.29,43.863 L29,36V11l-3.148-6.885L36.883,7.341z"></path><path fill="#b71c1c" d="M29,35v3.927c0,3.803-3.824,6.249-7.019,4.491l-6.936-4.445c-0.802-0.466-1.236-1.462-0.964-2.457 C14.334,35.59,15.202,35,16.115,35L29,35z"></path><path fill="#b71c1c" d="M15.456,32.228l-3.4,1.502C10.694,34.532,9,33.518,9,31.901V14.904c0-1.536,0.811-2.95,2.116-3.691 l11.83-6.687C25.669,2.983,29,5.014,29,8.218v3.09l-10.037,3.486C17.78,15.263,17,16.436,17,17.743v11.742 C17,30.618,16.41,31.665,15.456,32.228z"></path>
            </svg> */}
                Sign In (RSR Staff)
              </div>
              {/* <input
            type="button"
            //onClick={handleSignInAD}
            value="Sign In as Officer"
            className="w-full cursor-pointer rounded-lg border border-l-boxdark-2 bg-darkblue p-4 text-white transition hover:bg-opacity-90"
          /> */}
            </Link>
          </div>
        </>
      )}
    </form>
  );
};

export default form;

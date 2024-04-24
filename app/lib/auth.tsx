import { Awaitable, NextAuthOptions, TokenSet, User, getServerSession } from "next-auth";
import useSession from "@/hooks/useSession";
import { redirect, useRouter } from "next/navigation";

import CredentialsProvider from "next-auth/providers/credentials";
import api from "@/common/api";
import config from "@/common/config.json";

export const authConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      id: "credentials",
      credentials: {
        email: {
          label: "Username",
          type: "email",
          placeholder: "example@mail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        
        try {
          const { data: user } = await api.post(
            config.LOGIN_URL,
            {
              username: credentials?.email,
              password: credentials?.password,
            },
            {
              headers: {
                accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          );

          if (user) {
           //console.error("A user has been found:", user);
            return {
              email: user.userName,
              userId: user.userId,
              operatorId: user.operatorId,
              name: "No Name given",
            };
          } else {
           //console.error("Authorization error:", error);
            return null;
          }
        } catch (error) {
         //console.error("Authorization error:", error);
          return null;
        }
      },
    }),
    {
      id: 'openiddict',
      name: 'openiddict',
      type: 'oauth',
      issuer: "https://niims-dev.azurewebsites.net",
      client: {
        token_endpoint_auth_method: 'none'
      },
      authorization: {
        url: "https://niims-dev.azurewebsites.net/account/loginwithAD",
      },
      httpOptions: {
        timeout: 40000,
      },
      profile: (
        profile: {
          sub: string;
          name: string;
          email: string;
        },
        token: TokenSet
      ): Awaitable<User> => ({
        id: profile.sub,
        name: profile.name,
        email: profile.email,
      }),
      clientId: "NIIMS_Web"
    },
    CredentialsProvider({
      name: "adcredentialsverify",
      id: "adcredentialsverify",
      async authorize(credentials) {
        
        try {

          const data = await fetch('https://niims-dev.azurewebsites.net/Account/Login', {
            method: 'POST',  
            headers: {            
              "Content-Type": "application/json",
            },     
            body: JSON.stringify({
              username: "someone@mailbox.co.za",
              password: "gwhMnCiXUlCcQ0?"
            })
          });
          var { data: user } = await data.json();

          if (user) {
            
           //console.error("A user has been found:", user);
            return {
              email: user.userName,
              userId: user.userId,
              operatorId: user.operatorId,
              name: "No Name given",
            };
          } else {
            
            return null;
          }
        } catch (error) {
         //console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn() {
      
      return true;
    },
    async jwt({ token, user, session }) {
      
      if (session) {
        
        return {
          ...token,
          userId: session.user.userId,
          operatorId: session.user.operatorId,
        };
      }
      return token;
    },
    async session({ session, token, user }) {
      
      return {
        ...session,
        user: {
          ...session.user,
          userId: token.userId,
          operatorId: token.operatorId,
        },
      };
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/auth/signin",
  },

};

export const loginRequiredServe = async () => {
  const session = await getServerSession(authConfig);
  if (!session) return redirect("/");
};

export const loginRequiredClient = async () => {
  //console.log("redirecting to");

  if (typeof window !== "undefined") {
    const session = useSession();
    const router = useRouter();
    if (!session) router.push("/");
  }
};

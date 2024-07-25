import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@repo/db/client";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "xyz@gmail.com", required:true},
                password: { label: "Password", type: "password", required: true}
            },
            async authorize(credentials: any) {

                const existingUser = await prisma.user.findFirst({
                    where:{
                        email:credentials?.email
                    }
                })

                if(existingUser){
                    if(credentials?.password == existingUser.password){
                        return {
                            id: existingUser.id.toString(),
                            name: existingUser.name,
                            email: existingUser.email
                        }
                    }
                    return Response.json({
                        msg: "Password is not correct, try again!!"
                    })
                }

                try {

                    const user = await prisma.user.create({
                        data: {
                            email: credentials?.email as string,
                            password: credentials?.password as string
                        }
                    })

                    return {
                        id: user.id.toString(),
                        email: user.email,

                    }
                } catch (error) {
                    console.error(error)
                }

                return null

            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_SECRET || ""
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        // TODO: can u fix the type here? Using any is bad
        async session({ token, session }: any) {
            session.user.id = token.sub

            return session
        }
    }
}
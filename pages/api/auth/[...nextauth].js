import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import axios from "axios"

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-*/';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
  charactersLength));
  }
  return result+"=";
}


export const authOptions = {
  

    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "username", type: "text"},
                password: { label: "password", type: "password" }
            },
            async authorize(credentials, req) {
                const res = await axios.post('http://localhost:8000/api/login', 
                {
                  'Username': credentials.username,
                  'Password': credentials.password
                  },
                credentials,
                  {
                    headers: {
                      'accept': 'application/json',
                      'Content-Type': 'application/json'
                    }
                  });
                  console.log(res.data.status)
                if (res.data.status == 'ok') {
                    return res.data.user
                }
                return null
            }
        })
    ],
    secret: makeid(43),
    callbacks: {
        async jwt({ token, user ,account }) {
          if (account) {
            token.accessToken = account.access_token
            token.user = user
          }
          return token
        },
        async session({ session, token, user }) {
          session.accessToken = token.accessToken
          session.user = token.user
          return session
        }
      }
}

export default NextAuth(authOptions)
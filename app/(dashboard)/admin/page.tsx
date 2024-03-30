"use client"
import { useSession } from "next-auth/react";
import React, { useState } from "react";


const Page = () => {
  const session = useSession();
  console.log(session);
  // const [inputValue, setInputValue] = useState("");
  const handleInput = (event: any) => {

  }
  if (session.data?.user) {
    return (
      <div>
        <h2 className="text-2xl">
          Admin page - welcome back {session.data.user.username}{" "}
        </h2>

        <div>
          <input type="text" onChange={handleInput}></input>
        </div>

      </div>

    );
  }
  return <h2 className="text-2xl">Please Log in to see Admin page</h2>;
};


// const Page = () => {
//   return (
//     <SessionProvider>
//       <InnerPage />
//     </SessionProvider>
//   )
// }

export default Page;

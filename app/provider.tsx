"use client";

import Header from '@/components/Header';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { useMutation } from 'convex/react';
import { userDetailContext as UserDetailContext } from '@/context/UserDetailContext';
import React, { useContext, useEffect, useState } from 'react'

const Provider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  const CreateUser = useMutation(api.user.CreateNewUser);
  const [userDetail, setUserDetail] = useState<any>(null);
  const {user} = useUser();

  const CreateNewUser = async () => {
    if(!user) return;
    const result = await CreateUser({
      email : user?.primaryEmailAddress?.emailAddress || "",
      name : user?.fullName || "",
      imageUrl : user?.imageUrl || "",
    })
    setUserDetail(result);
  }

  useEffect(() => {
    if(user) {
      CreateNewUser();
    }
  }, [user])

  return (
    <UserDetailContext.Provider value={{userDetail, setUserDetail}}>

       <div>
        <Header />
       {children}
    </div>
    </UserDetailContext.Provider>
  )
}

export default Provider

export const useUserDetail = () => {
  return useContext(UserDetailContext)
}
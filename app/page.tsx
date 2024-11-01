'use client';

import { useEffect, useState } from "react";

interface UserData {
  id:number;
  first_name:string;
  last_name:string;
  username:string;
  language_code:string;
  is_premium?:boolean
}

export default function Home() {
  const [userData,setUserData] = useState<UserData|null>(null)

  useEffect(()=>{
    const initializeWebApp = async () => {
      const WebApp = (await import('@twa-dev/sdk')).default;
      if(WebApp.initDataUnsafe.user){
        setUserData(WebApp.initDataUnsafe.user as UserData)
      }
    }

    initializeWebApp();
  },[])

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="space-y-4">
            <div className="text-center">
              <h1 className="text-xl font-bold">
                {userData?.first_name} {userData?.last_name} ID:{userData?.id}
              </h1>
              {userData?.username && (
                <p className="text-gray-500">@{userData.username}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">用户 ID</p>
                <p className="font-mono">{userData?.id}</p>
              </div>
              
              {userData?.language_code && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">语言</p>
                  <p>{userData.language_code.toUpperCase()}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

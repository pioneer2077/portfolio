import { Button } from "@/components/ui/button";
import { KeyRound } from "lucide-react";
import React from "react";

import OauthButton from "@/components/OauthButton";
import { Providers } from "@/model/provider";
import GithubOauthIcon from "@/components/icons/GithubOauthIcon";
import GoogleOauthIcon from "@/components/icons/GoogleOauthIcon";

export default async function page() {
  return (
    <div className=" flex items-center justify-center h-screen">
      <div className=" w-96 rounded-md border p-5 space-y-5 relative bg-slate-900">
        <div className="flex items-center gap-2">
          <KeyRound />
          <h1 className=" text-2xl font-bold">Next + Supabase</h1>
        </div>
        <p className=" text-sm text-gray-300">Register / SignIn Today</p>
        <OauthButton icon={<GithubOauthIcon />} provider={Providers.GITHUB} />
        <OauthButton icon={<GoogleOauthIcon />} provider={Providers.GOOGLE} />
      </div>
      <div className=" glowBox -z-10"></div>
    </div>
  );
}

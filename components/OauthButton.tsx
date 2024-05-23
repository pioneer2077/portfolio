"use client";
import React from "react";
import { Button } from "./ui/button";
import { Providers } from "@/model/provider";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useSearchParams } from "next/navigation";

type Props = {
  icon: React.ReactNode;
  provider: Providers;
};
export default function OauthButton({ icon, provider }: Props) {
  const param = useSearchParams();
  const next = param.get("next");
  const handleLoginWithOauth = async (provider: Providers) => {
    const supabase = supabaseBrowser();
    supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: "http://localhost:3000/auth/callback?next=" + next,
      },
    });
  };
  return (
    <Button
      className=" w-full justify-between items-center flex "
      variant="outline"
      onClick={() => handleLoginWithOauth(provider)}
    >
      {icon}
      {provider}
      <div className="h-5 w-5" />
    </Button>
  );
}

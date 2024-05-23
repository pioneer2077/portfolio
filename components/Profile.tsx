"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
import useUser from "@/app/hook/useUser";
import Image from "next/image";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useQueryClient } from "@tanstack/react-query";
import { protectedPaths } from "@/lib/constant";
export default function Profile() {
  const { isFetching, data: user } = useUser();
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();
  if (isFetching) {
    return <></>;
  }
  const handleLogout = async () => {
    const client = supabaseBrowser();
    queryClient.clear();
    await client.auth.signOut();
    router.refresh();
    if (protectedPaths.includes(pathname)) {
      router.replace("/auth/?next=" + pathname);
    }
  };
  return (
    <div>
      {user?.id != "" ? (
        <div className=" animate-fade flex items-center gap-2">
          {user?.image_url ? (
            <Image
              onClick={handleLogout}
              className="rounded-full cursor-pointer"
              width={30}
              height={30}
              src={user?.image_url || ""}
              alt={user?.display_name || ""}
            />
          ) : (
            <div
              onClick={handleLogout}
              className=" cursor-pointer h-[50px] w-[50px] flex items-center justify-center ring-2 rounded-full"
            >
              <h1 className="">{user?.email[0]}</h1>
            </div>
          )}
        </div>
      ) : (
        <Link href="/auth" className=" animate-fade">
          <Button variant="outline">SignIn</Button>
        </Link>
      )}
    </div>
  );
}

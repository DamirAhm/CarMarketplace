"use client";

import { PropsWithChildren, useEffect } from "react";
import { useAtom } from "@reatom/npm-react";
import { userAtom, userRequestedAtom } from "../../../atoms/user.atom";
import { usePathname, useRouter } from "next/navigation";
import { useSavedPage } from "../../../hooks/useSavedPage";

export default function WithUserLayout({ children }: PropsWithChildren) {
  const router = useRouter();
  const pathname = usePathname();
  const { setSavedPage } = useSavedPage();

  const [user] = useAtom(userAtom);
  const [userRequested] = useAtom(userRequestedAtom);

  useEffect(() => {
    if (userRequested && !user) {
      setSavedPage(pathname);
      router.push("/auth/login");
    }
  }, [user, userRequested, setSavedPage, pathname, router]);

  return user && children;
}
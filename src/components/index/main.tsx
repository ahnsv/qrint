"use client";

import { Card, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const IndexMain = () => {
  const router = useRouter();
  return (
    <Card className="h-full flex flex-col items-center justify-center">
      <Image src={`/icons/qrint.svg`} alt="qrint logo" width={64} height={64} />
      <h1 className="hero-title tracking-tight font-bold text-xl">
        Print quicker, Qrint
      </h1>
      <div className="hero-description mt-4 text-xs tracking-tight">
        빠르고 안전하게 내 파일들을 프린트하고 공유하세요.
      </div>

      <div className="my-2 rounded border border-slate-100">
        <Button variant={`ghost`} onClick={() => router.push("/new")}>
          <PlusIcon />
          <span className="text-xs">새 프린트할 것들 업로드하기</span>
        </Button>
      </div>
    </Card>
  );
};

export default IndexMain;

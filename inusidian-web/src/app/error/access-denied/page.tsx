"use client";

import { Button } from "@/components/ui/button";

export default function Error() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-2 p-2">
      <h1 className="text-2xl md:text-[34px]">
        アクセス権限がありません
      </h1>
      <p className="text-center">
        申し訳ございません。アクセス権限がないためサービスを利用できません。
      </p>
      <Button
        buttonDesign="secondary"
        onClick={() => (window.location.href = "/auth/logout")}
      >
        ログアウトしてホームに戻る
      </Button>
    </div>
  );
}

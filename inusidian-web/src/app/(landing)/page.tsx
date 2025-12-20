import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center max-w-[760px] mx-auto h-screen px-8">
      <h1 className="hidden md:block mb-6 text-[40px] leading-[1.4] font-bold text-center">
        Unleash your learning potential <br /> with{" "}
        <span className="bg-gradient-to-b from-[#40c4ff] to-[#2962ff] bg-clip-text text-transparent">
          INUSIDIAN
        </span>
      </h1>

      <h1 className="block md:hidden mb-6 text-[28px] font-bold text-center">
        Unleash your <br /> learning potential with <br />
        <span className="bg-gradient-to-b from-[#40c4ff] to-[#2962ff] bg-clip-text text-transparent">
          INUSIDIAN
        </span>
      </h1>

      <p className="mb-8 text-sm md:text-lg leading-[1.5] md:leading-[1.8] text-center">
        INUSIDIANは擬似的な間隔反復システム（SRS）を採用した単語カードアプリです。
        <br />
        忘却曲線の原理を活用して効率的に語彙を学習できるよう支援します。
      </p>

      <div className="flex gap-4">
        <Button
          className="w-40"
          variant="contained"
          component={Link}
          href="/auth/login?screen_hint=signup"
          buttonDesign="secondary"
        >
          新規登録
        </Button>
        <Button
          className="w-40"
          variant="outlined"
          component={Link}
          href="/auth/login"
          buttonDesign="secondary"
        >
          ログイン
        </Button>
      </div>
    </div>
  );
}

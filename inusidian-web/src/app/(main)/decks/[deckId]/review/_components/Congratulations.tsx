import React from "react";

export default function Congratulations() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <h3 className="text-3xl font-bold mb-2">Congratulations!</h3>
      <p className="text-muted-foreground">
        今日の課題は全て達成しました！
      </p>
    </div>
  );
}

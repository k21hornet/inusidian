"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState } from "react";

function generateCalendar(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDate = new Date(year, month + 1, 0).getDate();
  const startDay = firstDay.getDay(); // 日曜=0

  const days = [];

  for (let i = 0; i < startDay; i++) {
    days.push(null);
  }

  for (let d = 1; d <= lastDate; d++) {
    days.push(d);
  }

  return days;
}

export const Calendar = () => {
  const today = new Date();

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const studiedDays = [2, 5, 8, 12, 20]; // APIから取得想定

  const days = generateCalendar(year, month);

  const changeMonth = (diff: number) => {
    const date = new Date(year, month + diff);
    setYear(date.getFullYear());
    setMonth(date.getMonth());
  };

  return (
    <Card className="h-full gap-0">
      <CardContent>
        {/* ヘッダー */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => changeMonth(-1)}
            className="px-3 py-1 border rounded"
          >
            ←
          </button>

          <h2 className="font-semibold">
            {year}年 / {month + 1}月
          </h2>

          <button
            onClick={() => changeMonth(1)}
            className="px-3 py-1 border rounded"
          >
            →
          </button>
        </div>

        {/* 曜日 */}
        <div className="grid grid-cols-7 text-center text-sm font-medium mb-2">
          <div>日</div>
          <div>月</div>
          <div>火</div>
          <div>水</div>
          <div>木</div>
          <div>金</div>
          <div>土</div>
        </div>

        {/* 日付 */}
        <div className="grid grid-cols-7 gap-2 text-center">
          {days.map((day, i) => {
            const studied = studiedDays.includes(day ?? -1);

            return (
              <div
                key={i}
                className="h-8 flex items-center justify-center border rounded relative"
              >
                {day && (
                  <>
                    <span>{day}</span>

                    {studied && (
                      <span className="absolute top-1 right-1 text-green-500">
                        ✓
                      </span>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

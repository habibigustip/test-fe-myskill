"use client"

import { db } from "@/db";
import { useEffect } from "react";

export default function HomePage() {
  useEffect(() => {
    const init = async () => {
      const existingData = await db.profile.get(1);

      // If empty, seed with default
      if (!existingData) {
        await db.profile.add({
          bg_image_url: {name: "default bg image", blob: null},
          profile_image_url: {name: "default avatar image", blob: null},
          name: "Habibi Gusti Pangestu",
          title: "Frontend Engineer",
          description: "lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
          portofolio: [
            {
              title: "Frontend Engineer",
              company: "MySkill",
              start_date: "2023-01",
              end_date: "2023-12",
              description: "lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet"
            },
            {
              title: "Frontend Engineer",
              company: "MySkill",
              start_date: "2023-01",
              end_date: "2023-12",
              description: "lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet"
            }
          ]
        });
      }
    };

    init();
  }, []);

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="text-3xl">Home Page</div>
    </div>
  )
}

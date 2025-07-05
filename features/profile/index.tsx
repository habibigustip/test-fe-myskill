"use client"

import * as React from "react"

import PortofolioCard from "./components/PortofolioCard";
import { IPortofolio, IProfile } from "@/types/profile";
import ProfileCard from "./components/ProfileCard";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/db";

export default function Profile() {
  const profile = useLiveQuery(() => db.profile.get(1)) as IProfile
  const portofolios: IPortofolio[] = [
    {
      title: "Frontend Engineer",
      company: "MySkill",
      start_date: "01-2023",
      end_date: "12-2023",
      description: "Deskripsi, lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet"
    },
    {
      title: "Frontend Engineer",
      company: "MySkill",
      start_date: "01-2023",
      end_date: "12-2023",
      description: "Deskripsi, lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet"
    }
  ]

  // const profile: IProfile = {
  //   profile_image_url: "https://picsum.photos/id/64/4326/2884",
  //   bg_image_url: "https://picsum.photos/seed/picsum/700/300",
  //   name: "Habibi Gusti Pangestu",
  //   title: "Frontend Engineer",
  //   description: "Deskripsi, lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet"
  // }

  return ( 
    <div className="flex flex-col">
      <div className="mt-8 mb-2">
        {profile &&
          <ProfileCard
            widthCard="655px"
            profile={profile}
            isEditProfile={false}
          />
        }
      </div>
      <PortofolioCard
        widthCard="655px"
        portofolios={portofolios}
      />
    </div>
  )
}

"use client"

import * as React from "react"

import PortofolioCard from "./components/PortofolioCard";
import { IPortofolio, IProfile } from "@/types/profile";
import ProfileCard from "./components/ProfileCard";

export default function Profile() {
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

  const profile: IProfile = {
      image_url: "https://picsum.photos/seed/picsum/700/300",
      name: "Habibi Gusti Pangestu",
      title: "Frontend Engineer",
      description: "Deskripsi, lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet"
    }

  return ( 
    <div className="flex flex-col">
      <ProfileCard
        widthCard="655px"
        profile={profile}
      />
      <PortofolioCard
        widthCard="655px"
        portofolios={portofolios}
      />
    </div>
  )
}

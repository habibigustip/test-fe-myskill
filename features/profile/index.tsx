"use client"

import * as React from "react"

import PortofolioCard from "@/components/shared/PortofolioCard";
import { IProfile } from "@/types/profile";
import ProfileCard from "./components/ProfileCard";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/db";

export default function Profile() {
  const profile = useLiveQuery(() => db.profile.get(1)) as IProfile

  return ( 
    <div className="flex flex-col">
      <div className="mt-8 mb-2">
        {profile &&
          <ProfileCard
            profile={profile}
          />
        }
      </div>
      {profile?.portofolio &&
        <PortofolioCard
          portofolios={profile.portofolio}
        />
      }
    </div>
  )
}

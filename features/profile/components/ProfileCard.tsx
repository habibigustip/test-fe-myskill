import * as React from "react"

import { PencilIcon } from "lucide-react";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"

import { IProfile } from "@/types/profile";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

export default function ProfileCard({ profile, watchedProfile, isEditProfile = true }
  :{ profile: IProfile, watchedProfile?: IProfile, isEditProfile?: boolean }) {
    const router = useRouter()
    const imgPreviewBackground = profile.bg_image_url?.blob ? URL.createObjectURL(profile.bg_image_url.blob) : ""
    const imgPreviewProfile = profile.profile_image_url?.blob ? URL.createObjectURL(profile.profile_image_url.blob) : ""

    return (
      <Card className={`min-w-full md:min-w-[655px] h-fit py-0`}>
        <CardContent className="px-0">
          <div className="relative h-50 mb-20 rounded-lg bg-gray-100">
            {imgPreviewBackground &&
            <Image
                src={imgPreviewBackground}
                alt="Background Image"
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority

            />}
            <Avatar className="absolute size-[160px] left-[5%] bottom-[-40%]">
              {imgPreviewProfile &&
                <AvatarImage src={imgPreviewProfile} className="object-cover" alt="Avatar Image Feedback" />
              }
              <AvatarFallback className="text-center border">Avatar Image Feedback</AvatarFallback>
            </Avatar>
            <div className="absolute py-1 px-6 right-0 bottom-[-25%]">
              {isEditProfile &&
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => router.push("/profile/edit")}
                >
                  <PencilIcon className="size-6"/>
                </Button>
              }
            </div>
          </div>
          <div className="py-4 px-6">
            {isEditProfile && profile &&
              <>
                <div className="text-2xl">{ profile.name }</div>
                <div className="text-base">{ profile.title }</div>
                <div className="text-xs w-[70%]">{ profile.description }</div>
              </>
            }
            {!isEditProfile && watchedProfile &&
              <>
                <div className="text-2xl">{ watchedProfile.name }</div>
                <div className="text-base">{ watchedProfile.title }</div>
                <div className="text-xs w-[70%]">{ watchedProfile.description }</div>
              </>
            }
          </div>
        </CardContent>
      </Card>
    )
}
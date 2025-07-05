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

export default function ProfileCard({ widthCard, profile }: { widthCard: string, profile: IProfile }) {
    const router = useRouter()

    return (
      <Card className={`w-[${widthCard}] h-fit py-0 mt-8 mb-2`}>
        <CardContent className="px-0">
          <div className="relative h-50 mb-20 rounded-lg">
            <Image
                src={profile.image_url}
                alt="Car"
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
            />
            <Avatar className="absolute size-[160px] left-[5%] bottom-[-40%]">
              <AvatarImage src={"https://picsum.photos/id/64/4326/2884"} className="object-cover" alt="Avatar Image Feedback" />
              <AvatarFallback className="text-center">Avatar Image Feedback</AvatarFallback>
            </Avatar>
            <div className="absolute py-1 px-6 right-0 bottom-[-25%]">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push("/profile/edit")}
              >
                <PencilIcon className="size-6"/>
              </Button>
            </div>
          </div>
          <div className="py-4 px-6">
            <div className="text-2xl">{ profile.name }</div>
            <div className="text-base">{ profile.title }</div>
            <div className="text-xs w-[70%]">{ profile.description }</div>
          </div>
        </CardContent>
      </Card>
    )
}
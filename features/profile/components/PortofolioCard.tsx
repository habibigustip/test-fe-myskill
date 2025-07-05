import * as React from "react"

import { PencilIcon } from "lucide-react";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { IPortofolio } from "@/types/profile";
import { useRouter } from "next/navigation";

export default function PortofolioCard({ widthCard, portofolios }: { widthCard: string, portofolios: IPortofolio[] }) {
    const router = useRouter()

    return (
      <Card className={`w-[${widthCard}] h-fit mb-4 gap-4`}>
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="font-bold">Portofolio</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/portofolio/edit")}
          >
            <PencilIcon className="size-6"/>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {portofolios && portofolios.map((portofolio, index) => (
              <div key={`porto-${index}`} className="pt-2 pb-4">
                <div className="font-semibold">{portofolio.title}</div>
                <div className="text-xs text-gray-700 mb-1">{portofolio.company}</div>
                <div className="text-xs text-gray-700 mb-2">{portofolio.start_date} - {portofolio.end_date}</div>
                <div className="text-xs w-[70%]">{portofolio.description}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
}
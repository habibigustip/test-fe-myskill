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
import { formatMonthYear } from "@/lib/utils";

export default function PortofolioCard({ portofolios, watchedPortofolios, isEdit = true }
  :{ portofolios?: IPortofolio[], watchedPortofolios?: IPortofolio[], isEdit?: boolean }) {
  const router = useRouter()

  return (
    <Card className={`min-w-full md:min-w-[655px] h-fit mb-4 gap-4`}>
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="font-bold">Portofolio</CardTitle>
        {isEdit &&
          <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/portofolio/edit")}
          >
              <PencilIcon className="size-6"/>
          </Button>
        }
      </CardHeader>
      <CardContent>
        <div className="divide-y">
          {isEdit && portofolios && portofolios.map((portofolio, index) => (
            <div key={`porto-${index}`} className="pt-2 pb-4">
              <div className="font-semibold">{portofolio.title}</div>
              <div className="text-xs text-gray-700 mb-1">{portofolio.company}</div>
              <div className="text-xs text-gray-700 mb-2">{formatMonthYear(portofolio.start_date)} - {formatMonthYear(portofolio.end_date)}</div>
              <div className="text-xs w-[70%]">{portofolio.description}</div>
            </div>
          ))}
          {!isEdit && watchedPortofolios && watchedPortofolios.map((portofolio, index) => (
            <div key={`porto-${index}`} className="pt-2 pb-4">
              <div className="font-semibold">{portofolio.title}</div>
              <div className="text-xs text-gray-700 mb-1">{portofolio.company}</div>
              <div className="text-xs text-gray-700 mb-2">{formatMonthYear(portofolio.start_date)} - {formatMonthYear(portofolio.end_date)}</div>
              <div className="text-xs w-[70%]">{portofolio.description}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
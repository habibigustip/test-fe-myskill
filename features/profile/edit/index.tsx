"use client"

import React, { useState } from "react"

import ProfileCard from "../components/ProfileCard";
import ImageUploader from "@/components/shared/ImageUploader";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { z } from "zod"
import { Textarea } from "@/components/ui/textarea";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/db";
import { ArrowLeftCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EditProfile() {
  const router = useRouter()
  const profile = useLiveQuery(() => db.profile.get(1))
  // const profile: IProfile = {
  //   profile_image_url: "https://picsum.photos/id/64/4326/2884",
  //   bg_image_url: "https://picsum.photos/seed/picsum/700/300",
  //   name: "Habibi Gusti Pangestu",
  //   title: "Frontend Engineer",
  //   description: "Deskripsi, lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet"
  // }

  const [uploadedBackgroundImage, setUploadedBackgroundImage] = useState();
  const [uploadedProfileImage, setUploadedProfileImage] = useState(null);

  const handleBackgroundImageChange = (file) => {
    setUploadedBackgroundImage(file);
    if (file) {
      console.log('Image selected:', file.name, file.size);
    } else {
      console.log('Image removed');
    }
  }

  const handleProfileImageChange = (file) => {
    setUploadedProfileImage(file);
    if (file) {
      console.log('Image selected:', file.name, file.size);
    } else {
      console.log('Image removed');
    }
  }

  const FormSchema = z.object({
    name: z.string().max(100, { message: "Max 100 characters" }),
    title: z.string().max(100, { message: "Max 100 characters" }),
    description: z.string().max(300, { message: "Max 300 characters" })
  })

  const formProfile = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      title: "",
      description: ""
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const id = await db.profile.update(1, {
        bg_image_url: { name: uploadedBackgroundImage?.name, blob: uploadedBackgroundImage },
        profile_image_url: { name: uploadedProfileImage?.name, blob: uploadedProfileImage },
        name: data.name,
        title: data.title,
        description: data.description,
      });

      console.log(`Profile ${formProfile.getValues("name")} successfully added. Got id ${id}`);
    } catch (error) {
      console.log(`Profile ${formProfile.getValues("name")} successfully added. Got error ${error}`);
    }
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <>
      <div className="grid grid-cols-3 p-4">
        <div className="col-span-2 px-4 text-red">
          <div className="flex">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2"
              onClick={() => handleBack()}
            >
              <ArrowLeftCircleIcon className="size-6"/>
            </Button>
            <div className="text-3xl font-bold mb-4">Edit Profile</div>
          </div>
          <Accordion
            type="multiple"
            className="w-full"
            defaultValue={['item-1', 'item-2', 'item-3']}
          >
            <AccordionItem value="item-1" className="rounded-lg border px-4 mb-2">
              <AccordionTrigger>Background Image</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <ImageUploader onImageChange={handleBackgroundImageChange} />
                {uploadedBackgroundImage && (
                  <p className="mt-6 text-center text-sm text-gray-600">
                    Selected file: <strong>{uploadedBackgroundImage.name}</strong> ({(uploadedBackgroundImage.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                )}
                {/* {!isUploadedBackgroundImage && <p className="text-destructive text-sm">Background Image required</p>} */}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="rounded-lg border px-4 mb-2">
              <AccordionTrigger>Profile Image</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <ImageUploader onImageChange={handleProfileImageChange} />
                {uploadedProfileImage && (
                  <p className="mt-6 text-center text-sm text-gray-600">
                    Selected file: <strong>{uploadedProfileImage.name}</strong> ({(uploadedProfileImage.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                )}
                {/* {!isUploadedProfileImage && <p className="text-destructive text-sm">Profile Image required</p>} */}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="last:border-b-1 rounded-lg border px-4 mb-2">
              <AccordionTrigger>Profile</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <Form {...formProfile}>
                  <form className="space-y-6">
                    <FormField
                      control={formProfile.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={formProfile.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={formProfile.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Description" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="flex justify-end">
            <Button className="text-right" onClick={formProfile.handleSubmit(onSubmit)}>Submit</Button>
          </div>
        </div>
        <div className="px-4 border-l">
          {
          profile && <ProfileCard
              widthCard="655px"
              profile={profile}
            />
          }
        </div>
      </div>
    </>
  )
}

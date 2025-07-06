"use client"

import React, { useEffect } from "react"

import PortofolioCard from "@/components/shared/PortofolioCard";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFieldArray, useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/db";
import { ArrowLeftCircleIcon, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Portofolio = {
  title: string;
  company: string;
  start_date: string;
  end_date: string;
  description: string;
};

type FormValues = {
  portofolios: Portofolio[];
};

export default function EditProfile() {
  const router = useRouter()
  const portofolio = useLiveQuery(() => db.profile.get(1))

  const form = useForm<FormValues>();

  const { fields, append, remove, replace } = useFieldArray({
    control: form.control,
    name: "portofolios",
  });

  useEffect(() => {
    const loadData = async () => {
      if (portofolio?.portofolio && portofolio?.portofolio.length > 0) {
        replace(portofolio?.portofolio); // replace existing form state
      } else {
        append({
          title: "",
          company: "",
          start_date: "",
          end_date: "",
          description: ""
        });
      }
    };
    loadData();
  }, [portofolio?.portofolio, append, replace]);

  const onAppendPortofolio = () => {
    if (fields.length < 10) {
      append({
        title: "",
        company: "",
        start_date: "",
        end_date: "",
        description: ""
      })
    } else {
      toast("Maximum 10 portofolio allowed");
    }
  }

  const watchedPortofolios = form.watch("portofolios"); 

  async function onSubmit(values: FormValues) {
    try {
      await db.profile.update(1, {
        portofolio: values.portofolios
      });

      toast("Portofolio successfully edited.")
    } catch (error) {
      toast(`Portofolio failed edited. Error ${error}`)
    }
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <>
      <div className="grid row-span-full md:grid-cols-3 p-4">
        <div className="col-span-full md:col-span-2 px-4 text-red">
          <div className="flex">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2"
              onClick={() => handleBack()}
            >
              <ArrowLeftCircleIcon className="size-6"/>
            </Button>
            <div className="text-3xl font-bold mb-4">Edit Portofolio</div>
          </div>
          <Accordion
            type="multiple"
            className="w-full"
            defaultValue={['item-1']}
          >
            <AccordionItem value="item-1" className="last:border-b-1 rounded-lg border px-4 mb-2">
              <AccordionTrigger>Profile</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="flex items-start gap-4 border p-4 rounded-lg"
                    >
                      <div className="flex-1 space-y-2">
                        <FormField
                          control={form.control}
                          name={`portofolios.${index}.title`}
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
                          control={form.control}
                          name={`portofolios.${index}.company`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company</FormLabel>
                              <FormControl>
                                <Input placeholder="Company" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`portofolios.${index}.start_date`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Start Date</FormLabel>
                              <FormControl>
                                <Input type="month" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`portofolios.${index}.end_date`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>End Date</FormLabel>
                              <FormControl>
                                <Input type="month" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`portofolios.${index}.description`}
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
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => remove(index)}
                      >
                         <XCircle className="text-red-500 size-6"/>
                      </Button>
                    </div>
                  ))}

                  <div className="flex justify-center">
                    <Button
                      type="button"
                      className="bg-teal-500"
                      onClick={() => onAppendPortofolio()}
                    >
                      Add Portofolio
                    </Button>
                  </div>
                </form>
              </Form>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="flex justify-end">
            <Button className="text-right" onClick={form.handleSubmit(onSubmit)}>Submit</Button>
          </div>
        </div>
        <div className="col-span-full md:col-span-1 mt-4 md:mt-0 px-4 md:border-l">
          <div className="text-3xl font-bold mb-4">Preview</div>
          {
            portofolio?.portofolio && <PortofolioCard
              portofolios={portofolio?.portofolio}
              watchedPortofolios={watchedPortofolios}
              isEdit={false}
            />
          }
        </div>
      </div>
    </>
  )
}

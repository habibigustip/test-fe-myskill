import { forwardRef, ComponentRef, ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "@/services/services-categroies";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Url } from "next/dist/shared/lib/router/router";
import { MENU_TITLE } from "@/lib/types/constants";
import { MYSKILL_LOGO_IMAGE } from "@/lib/images/home";

const ListItem = forwardRef<
  ComponentRef<"a">,
  ComponentPropsWithoutRef<"a">
>(({ className, children, ...props }, ref) => {
  const href: Url = props.href as Url;
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
         {children}
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export default function NavigationMenuShop() {
  const { data: categories, isLoading , isError, error } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories
  })

  let content
  if (isLoading) {
    content = <div>Loading...</div>
  }
  if (isError) {
    content = <div>Error: {error.message}</div>
  }
  if (categories) {
    content = (
      <div className="flex flex-col">
        <ListItem
          href={`/profile`}
        >
          <div className="flex gap-2 items-center">
            <Avatar className="size-12">
              <AvatarImage src={MYSKILL_LOGO_IMAGE} alt="Avatar Image Feedback" />
              <AvatarFallback>Image Category</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <div className="text-base">Habibi Gusti Pangestu</div>
              <div>Frontend Engineer</div>
            </div>
          </div>
        </ListItem>
      </div>
    )
  }

  return (
    <NavigationMenu orientation="vertical" className="rigth-0">
      <NavigationMenuList>
        <NavigationMenuItem>
        <NavigationMenuTrigger>{MENU_TITLE.PROFILE}</NavigationMenuTrigger>
          <NavigationMenuContent className="p-4">
            <ul className="grid w-[250px] gap-y-1 gap-x-2">
              {content}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
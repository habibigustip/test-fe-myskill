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
import { Category } from "@/types/category";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Url } from "next/dist/shared/lib/router/router";
import { MENU_TITLE } from "@/lib/types/constants";
import { MYSKILL_LOGO_IMAGE } from "@/lib/images/home";
 
const components: { title: string; href: string; description: string }[] = [
  {
    title: "Lorem ipsum 1",
    href: "/",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Lorem ipsum 2",
    href: "/",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Lorem ipsum 3",
    href: "/",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Lorem ipsum 4",
    href: "/",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Lorem ipsum 5",
    href: "/",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Lorem ipsum 6",
    href: "/",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]

const ListItem = forwardRef<
  ComponentRef<"a">,
  ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
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
  const { data: categories, isLoading , isError, error } = useQuery<Category[]>({
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
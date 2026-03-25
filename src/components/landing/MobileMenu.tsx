"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

const SITE = 'https://craftshorts.ai';

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-purple-300 hover:text-purple-100 hover:bg-purple-500/10 p-2"
            aria-label="Open menu"
          />
        }
      >
        <Menu className="h-6 w-6" />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[280px] bg-black/95 border-purple-600/30 backdrop-blur-lg"
      >
        <SheetHeader>
          <SheetTitle className="text-purple-100 text-left">Menu</SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col gap-4 mt-8">
          {/* Blog Link */}
          <a
            href={SITE + '/blog'}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="text-purple-300 hover:text-purple-100 font-medium transition-colors py-2 px-4 rounded-lg hover:bg-purple-500/10"
          >
            Blog
          </a>

          {/* Pricing Link */}
          <a
            href={SITE + '/pricing'}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="text-purple-300 hover:text-purple-100 font-medium transition-colors py-2 px-4 rounded-lg hover:bg-purple-500/10"
          >
            Pricing
          </a>

          <Separator className="bg-purple-600/30" />

          {/* Login Link */}
          <a
            href={SITE + '/login'}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="text-purple-300 hover:text-purple-100 font-medium transition-colors py-2 px-4 rounded-lg hover:bg-purple-500/10"
          >
            Login
          </a>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

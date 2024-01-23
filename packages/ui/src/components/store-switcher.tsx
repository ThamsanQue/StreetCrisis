"use client";

import { useState } from "react";
import {
  Check,
  ChevronsUpDown,
  PlusCircle,
  Store as StoreIcon,
} from "lucide-react";

import { cn } from ".";
import { useStoreModal } from "../../../../apps/admin/hooks/use-store-modal";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export default function StoreSwitcher() {
  const storeModal = useStoreModal();
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          //   aria-expanded={open}
          aria-label="Select a store"
          className={cn("w-[200px] justify-between")}
        >
          <StoreIcon className="mr-2 h-4 w-4" />
          Store 1{/* {currentStore?.label} */}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search Store..." />
            <CommandEmpty>No Store found.</CommandEmpty>
            <CommandGroup heading="Stores">
              {/* {formattedItems.map((item) => ( */}
              <CommandItem
                //   key={item.value}
                //   onSelect={() => onStoreSelect(item)}
                className="text-sm"
              >
                <StoreIcon className="mr-2 h-4 w-4" />
                Store 1{/* {item.label} */}
                <Check
                  className={cn(
                    "ml-auto h-4 w-4",
                    //   currentStore?.value === item.value
                    // ?
                    "opacity-100",
                    // : "opacity-0"
                  )}
                />
              </CommandItem>
              {/* ))} */}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  storeModal.onOpen();
                }}
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Create Store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

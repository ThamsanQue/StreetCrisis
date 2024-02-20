"use client";

// import Button from "@/components/ui/button2";
import { Button } from "@/components/ui/button";

import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import useCheckoutModal from "@/hooks/use-checkout";
import useDrawer from "@/hooks/useDrawer";
import useMediaQuery from "@/hooks/useMediaQuery";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { MouseEventHandler, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { Copy } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DELIVERY_FEE, useTotalPrice } from "../utils/cart";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";

const phoneRegex = /^\d{10}$/;
export const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  zipCode: z.string().min(1, { message: "Zip code is required" }),
  phone: z.string().refine((value) => phoneRegex.test(value), {
    message: "Invalid phone number",
  }),
});
export type deliveryFormValues = z.infer<typeof formSchema>;
const Summary = () => {
  // const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const checkoutModal = useCheckoutModal();
  // const drawerTrigger = useDrawer();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const totalPrice = useTotalPrice();
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   if (searchParams.get("success")) {
  //     toast.success("Payment completed");
  //     removeAll();
  //   }

  //   if (searchParams.get("canceled")) {
  //     toast.error("Something went wrong");
  //   }
  // }, [searchParams, removeAll]);
  const onCheckout = async (data: deliveryFormValues) => {
    const address = `${data.address}, ${data.city}, ${data.zipCode}`;
    const phone = data.phone;
    const totalPriceString = JSON.stringify(totalPrice);
    try {
      setLoading(true);
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
        productIds: items.map((item) => item.id),
        totalPrice: totalPriceString,
        address,
        phone,
      });
      setLoading(false);
      removeAll();
      const ShippingDetails = {
        content: `New Order Received\n\nName: ${data.name}\nAddress: ${address}\nPhone: ${phone}`,
      };
      await axios.post(
        `https://discordapp.com/api/webhooks/${process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_ID}/${process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_TOKEN}`,
        ShippingDetails
      );
      toast.success(
        "Delivery Details received. Redirecting to Street Continental..."
      );
      window.location.href = "https://discord.gg/DfDhCzPdM6";
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    checkoutModal.onOpen();
  };
  const onCopy = (item: string, name: string) => {
    navigator.clipboard.writeText(item);
    toast.success(`${name} copied to clipboard.`);
  };

  const form = useForm<deliveryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
      city: "",
      zipCode: "",
      phone: "",
    },
  });
  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6  lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
      <div className="mt-6 space-y-4 ">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">Order</span>
            <span className="text-base font-medium text-gray-900">
              Delivery fee
            </span>
          </div>
          <div className="flex flex-col">
            <Currency value={totalPrice} />
            <Currency value={DELIVERY_FEE} />
          </div>
        </div>
      </div>
      {isDesktop ? (
        <Button
          onClick={onPreview}
          className="w-full mt-6 text-black"
          disabled={!items.length}
        >
          Checkout
        </Button>
      ) : (
        <Drawer>
          <DrawerTrigger className="w-full" disabled={!items.length}>
            <Button
              variant="default"
              size="lg"
              className="w-full mt-6 text-black"
              disabled={!items.length}
            >
              Checkout
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Checkout</DrawerTitle>
              <DrawerDescription>
                After payment, provide your delivery details and proceed to
                Street Continental, our Discord Community where you can send
                proof of payment and track your order.
              </DrawerDescription>
            </DrawerHeader>

            <div className="rounded-md shadow-sm -space-y-px mt-6 px-4">
              <h3 className="px-3 py-2 text-gray-900 border border-gray-300 rounded-t-md sm:text-sm">
                Shipping Details
              </h3>
              <Form {...form}>
                <form
                  className="mt-8 space-y-6"
                  onSubmit={form.handleSubmit(onCheckout)}
                  id="delivery-form"
                >
                  <div className="rounded-md shadow-sm -space-y-px">
                    <div>
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                disabled={loading}
                                placeholder="Full Name"
                                {...field}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-black-500 focus:border-black-500 focus:z-10 sm:text-sm"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                disabled={loading}
                                placeholder="Address"
                                {...field}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-black-500 focus:border-black-500 focus:z-10 sm:text-sm"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                disabled={loading}
                                placeholder="City"
                                {...field}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-black-500 focus:border-black-500 focus:z-10 sm:text-sm"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <FormField
                        control={form.control}
                        name="zipCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                disabled={loading}
                                placeholder="Postal Code"
                                {...field}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-black-500 focus:border-black-500 focus:z-10 sm:text-sm"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                disabled={loading}
                                placeholder="Phone Number"
                                {...field}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border rounded-b-md border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-black-500 focus:border-black-500 focus:z-10 sm:text-sm"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div></div>
                  </div>
                </form>
              </Form>
            </div>

            <DrawerFooter>
              <Link href="https://pay.yoco.com/streetcrisis" target="_blank">
                <Button
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-[#36A0DB]"
                  disabled={loading}
                >
                  Pay Now
                </Button>
              </Link>
              <Button
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black"
                type="submit"
                form="delivery-form"
                disabled={loading}
              >
                Continue to Street Continental
              </Button>
              <DrawerClose>
                <Button variant="outline" className="w-full">
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};

export default Summary;

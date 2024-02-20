"use client";

import Modal from "./ui/modal";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

import { Button } from "./ui/button";
import useCheckoutModal from "@/hooks/use-checkout";

import toast from "react-hot-toast";
import { Copy } from "lucide-react";
import { useTotalPrice } from "@/app/home/cart/utils/cart";
import {
  deliveryFormValues,
  formSchema,
} from "@/app/home/cart/components/summary";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { useState } from "react";
import axios from "axios";
import useCart from "@/hooks/use-cart";
import Link from "next/link";

const Checkout = () => {
  const checkoutModal = useCheckoutModal();
  const [loading, setLoading] = useState(false);
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);

  const onCopy = (item: string, name: string) => {
    navigator.clipboard.writeText(item);
    toast.success(`${name} copied to clipboard.`);
  };
  const totalPrice = useTotalPrice();
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
  return (
    <>
      <Modal open={checkoutModal.isOpen} onClose={checkoutModal.onClose}>
        <h3 className="text-lg font-medium">Checkout</h3>
        <p className="mt-1 text-sm text-gray-500 text-center">
          After payment, provide your delivery details and proceed to Street
          Continental, our Discord Community where you can send proof of payment
          and track your order.
        </p>
        <div className="rounded-md shadow-sm -space-y-px mt-6 ">
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

        <div className="mt-4">
          <Link href="https://pay.yoco.com/streetcrisis" target="_blank">
            <Button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black mb-4 bg-[#36A0DB]">
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
        </div>
      </Modal>
    </>
  );
};

export default Checkout;

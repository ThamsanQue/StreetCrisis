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
        <div className="rounded-md shadow-sm -space-y-px mt-6">
          <h3 className="px-3 py-2 text-gray-900 border border-gray-300 rounded-t-md sm:text-sm">
            Payment Details
          </h3>
          <div className="flex justify-between border border-gray-300 py-2">
            <Label className="sr-only" htmlFor="Bank Name">
              Bank Name
            </Label>
            <span className="block w-full px-3 py-2 text-gray-900  sm:text-sm ">
              Bank Name: Sasfin
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onCopy("Sasfin", "Bank Name")}
              className="mr-2"
            >
              <Copy className="h-4 w-4 " />
            </Button>
          </div>
          <div className="flex justify-between border border-gray-300 py-2">
            <Label className="sr-only" htmlFor="Account Name">
              Account Name
            </Label>
            <span className="block w-full px-3 py-2 text-gray-900  sm:text-sm">
              Account Name: Thamsanqa J Ncube
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onCopy("Thamsanqa J Ncube", "Account Name")}
              className="mr-2"
            >
              <Copy className="h-4 w-4 " />
            </Button>
          </div>
          <div className="flex justify-between border border-gray-300 py-2">
            <Label className="sr-only" htmlFor="Account number">
              Account Number
            </Label>
            <span className="block w-full px-3 py-2 text-gray-900  sm:text-sm">
              Account Number: 78602107414
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onCopy("78602107414", "Account number")}
              className="mr-2"
            >
              <Copy className="h-4 w-4 " />
            </Button>
          </div>
          <div className="flex justify-between border border-gray-300 py-2">
            <Label className="sr-only" htmlFor="branch-code">
              Branch Code
            </Label>
            <span className="block w-full px-3 py-2 text-gray-900  rounded-b-md sm:text-sm">
              Branch Code: 683000
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onCopy("683000", "Branch code")}
              className="mr-2"
            >
              <Copy className="h-4 w-4 " />
            </Button>
          </div>
          <div className="flex justify-between border border-gray-300 py-1">
            <Label className="sr-only" htmlFor="Total Code">
              Total Price
            </Label>
            <span className="block w-full px-3 py-2 text-gray-900 rounded-b-md sm:text-sm">
              Total Price: {totalPrice}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onCopy(`${totalPrice}`, "Total Price")}
              className="mr-2"
            >
              <Copy className="h-4 w-4 " />
            </Button>
          </div>
        </div>
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
          <Button
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black"
            type="submit"
            form="delivery-form"
            disabled={loading}
          >
            Mark as paid
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default Checkout;

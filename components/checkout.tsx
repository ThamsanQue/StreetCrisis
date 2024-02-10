"use client";

import Modal from "./ui/modal";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

import { Button } from "./ui/button";
import useCheckoutModal from "@/hooks/use-checkout";

import toast from "react-hot-toast";
import { Copy } from "lucide-react";
import { useTotalPrice } from "@/app/home/cart/utils/cart";

const Checkout = () => {
  const checkoutModal = useCheckoutModal();

  const onCopy = (item: string, name: string) => {
    navigator.clipboard.writeText(item);
    toast.success(`${name} copied to clipboard.`);
  };
  const totalPrice = useTotalPrice();
  return (
    <>
      <Modal open={checkoutModal.isOpen} onClose={checkoutModal.onClose}>
        <div className="rounded-md shadow-sm -space-y-px mt-6 ">
          <h3 className="px-3 py-2 text-gray-900 border border-gray-300 rounded-t-md sm:text-sm">
            Shipping Details
          </h3>
          <form className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <Label className="sr-only" htmlFor="name">
                  Full Name
                </Label>
                <Input
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  id="name"
                  name="name"
                  placeholder="Full Name"
                  required
                  type="text"
                />
              </div>
              <div>
                <Label className="sr-only" htmlFor="address">
                  Address
                </Label>
                <Input
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  id="address"
                  name="address"
                  placeholder="Address"
                  required
                  type="text"
                />
              </div>
              <div>
                <Label className="sr-only" htmlFor="city">
                  City
                </Label>
                <Input
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  id="city"
                  name="city"
                  placeholder="City"
                  required
                  type="text"
                />
              </div>
              <div>
                <Label className="sr-only" htmlFor="postal-code">
                  Postal Code
                </Label>
                <Input
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  id="postal-code"
                  name="postal-code"
                  placeholder="Postal Code"
                  required
                  type="text"
                />
              </div>
              <div>
                <Label className="sr-only" htmlFor="country">
                  Country
                </Label>
                <Input
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  id="country"
                  name="country"
                  placeholder="Country"
                  required
                  type="text"
                />
              </div>
              <div>
                <Label className="sr-only" htmlFor="contact">
                  Contact Information
                </Label>
                <Input
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  id="contact"
                  name="contact"
                  placeholder="Contact Information"
                  required
                  type="text"
                />
              </div>
            </div>
          </form>
        </div>
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
        <div className="mt-4">
          <Button
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black"
            type="submit"
          >
            Mark as paid
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default Checkout;

"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { useSession } from "next-auth/react";
import { updateUser } from "@/app/actions/updateUser";
import toast from "react-hot-toast";
import { Spinner } from "@/components/ui/spinner";

const SubmitBtn = () => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      type="submit"
      className="btn btn--filled-dark btn--icon-right !w-full !text-start !text-[1.2rem] lg:!text-[2rem] !h-[3.5rem] lg:!h-[4.5rem]"
    >
      {pending ? <Spinner className="size-6 lg:size-8" /> : "SAVE CHANGES"}
    </button>
  );
};

const ProfilePage = () => {
  const { data: session, update: updateSession } = useSession();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setEmail(session.user.email || "");
    }
  }, [session]);

  async function formAction(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;

    if (!email || !name) {
      toast.error("Name and email are required");
      return;
    }

    if (newPassword && !currentPassword) {
      toast.error("Enter current password to set a new password");
      return;
    }

    const payload = {
      name,
      email,
      currentPassword: currentPassword || null,
      newPassword: newPassword || null,
    };

    try {
      const updatedUser = await updateUser(session?.user.id as string, payload);
      await updateSession({ name: updatedUser.name, email: updatedUser.email });
      setName(updatedUser.name);
      setEmail(updatedUser.email);
      toast.success("Profile updated successfully");
    } catch (err: any) {
      toast.error(err.message || "Update failed");
    }
  }

  return (
    <section className="pt-[6rem] lg:pt-[7rem] pb-[4rem] px-[1rem] md:px-[1.5rem] lg:px-[2rem]">
      <div>
        <h1 className="text-[2.5rem] md:text-[3.5rem] lg:text-[5.5rem] font-extralight leading-[1.1] mb-[1.5rem] lg:mb-[3rem]">
          Profile
        </h1>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[2rem] lg:gap-[1rem]">

          {/* Account Settings */}
          <div className=" flex flex-col gap-[1.5rem] lg:gap-[2rem]">
            <h2 className="text-[.7rem] uppercase tracking-[.2em] font-[400] text-black/50">
              Account Settings
            </h2>
            <form
              className="flex items-start gap-[1rem] lg:gap-[1.25rem] flex-col w-full"
              action={formAction}
            >
              <div className="w-full">
                <Label htmlFor="name" className="text-[.8rem] lg:text-[.875rem]">Name</Label>
                <div className="mt-1.5">
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    className="h-[2.75rem] lg:h-[3rem] text-[.9rem]"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full">
                <Label htmlFor="email" className="text-[.8rem] lg:text-[.875rem]">Email address</Label>
                <div className="mt-1.5">
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    className="h-[2.75rem] lg:h-[3rem] text-[.9rem]"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full">
                <Label htmlFor="currentPassword" className="text-[.8rem] lg:text-[.875rem]">Current Password</Label>
                <div className="mt-1.5">
                  <Input
                    type="password"
                    name="currentPassword"
                    id="currentPassword"
                    className="h-[2.75rem] lg:h-[3rem] text-[.9rem]"
                  />
                </div>
              </div>

              <div className="w-full">
                <Label htmlFor="newPassword" className="text-[.8rem] lg:text-[.875rem]">New Password</Label>
                <div className="mt-1.5">
                  <Input
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    className="h-[2.75rem] lg:h-[3rem] text-[.9rem]"
                  />
                </div>
              </div>

              <div className="w-full mt-[.25rem]">
                <SubmitBtn />
              </div>
            </form>
          </div>

          {/* My Orders */}
          <div className=" p-[1.25rem] md:p-[2rem] lg:p-[3rem] flex flex-col gap-[1.5rem] lg:gap-[2rem]">
            <h2 className="text-[.7rem] uppercase tracking-[.2em] font-[400] text-black/50">
              My Orders
            </h2>
            <div className="flex items-center justify-between border-b border-black/10 pb-[1.5rem]">
              <div className="flex flex-col gap-[.3rem]">
                <p className="text-[.9rem] lg:text-[1rem] font-[300]">Order History</p>
                <p className="text-[.72rem] lg:text-[.75rem] text-black/40 font-[300]">
                  View and track your past orders
                </p>
              </div>
              <Link href="/orders" className="btn btn--dark btn--icon-right" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ExternalLink, FilePenLine, RefreshCcw, Trash2 } from "lucide-react";
import React from "react";
import { NavLink } from "react-router";
import { Separator } from "@/components/ui/separator";
import StoreCardSkeleton from "./StoreCardSkeleton";
import AboutForm from "./AboutForm";
import FaqForm from "./FaqForm";
import PrivacyPoliceForm from "./PrivacyPolicyForm";
import TermsConditionsForm from "./TermsConditionsForm";
import HelpCenterForm from "./HelpCenterForm";
import HowToBuyForm from "./HowToBuyForm";

export default function StoreCard() {
  const isActive = false;
  const loading = true;
  return (
    <>
      {loading ? (
        <StoreCardSkeleton />
      ) : (
        <div className="flex items-center gap-10">
          <Card
            className={`relative w-full max-w-xs px-6 py-4 ${isActive && "border border-black"}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="logo"
                  className="h-10 w-10 rounded-lg object-cover"
                />
                <div>
                  <h2 className="text-sm font-medium">Alice</h2>
                  <p className="text-muted-foreground text-xs">
                    alice-store.bfinit.con
                  </p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-end gap-2">
                <p className="text-xs">Active</p>
                <Switch id="airplane-mode" />
              </div>

              {isActive && (
                <div className="absolute -top-3 left-6 rounded border border-black bg-white px-1 py-0.5 text-[10px]">
                  Current
                </div>
              )}
            </div>

            <Separator />
            <div className="">
              <Button
                variant="outline"
                disabled={isActive}
                className="flex w-full items-center gap-1"
              >
                <RefreshCcw /> Switch
              </Button>
              <div className="mt-4 flex flex-1 items-center justify-between">
                <Button variant="outline" asChild>
                  <NavLink to="/">
                    <ExternalLink />
                  </NavLink>
                </Button>
                <Button variant="outline">
                  <FilePenLine />
                </Button>
                <Button variant="outline" className="text-red-600">
                  <Trash2 />
                </Button>
              </div>
            </div>
          </Card>

          <Card
            className={`relative w-full max-w-xs px-6 py-4 ${isActive && "border border-black"}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src="https://images.unsplash.com/photo-1612810806563-4cb8265db55f?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="logo"
                  className="h-10 w-10 rounded-lg object-cover"
                />
                <div>
                  <h2 className="text-sm font-medium">Bazaar</h2>
                  <p className="text-muted-foreground text-xs">
                    bazaar-store.bfinit.con
                  </p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-end gap-2">
                <p className="text-xs">Inactive</p>
                <Switch id="airplane-mode" />
              </div>

              {isActive && (
                <div className="absolute -top-3 left-6 rounded border border-black bg-white px-1 py-0.5 text-[10px]">
                  Current
                </div>
              )}
            </div>

            <Separator />
            <div className="">
              <Button
                variant="outline"
                disabled={isActive}
                className="flex w-full items-center gap-1"
              >
                <RefreshCcw /> Switch
              </Button>
              <div className="mt-4 flex flex-1 items-center justify-between">
                <Button variant="outline" asChild>
                  <NavLink to="/">
                    <ExternalLink />
                  </NavLink>
                </Button>
                <Button variant="outline">
                  <FilePenLine />
                </Button>
                <Button variant="outline" className="text-red-600">
                  <Trash2 />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
      <AboutForm />
      {/* <FaqForm /> */}
      {/* <PrivacyPoliceForm /> */}
      {/* <TermsConditionsForm /> */}
      {/* <HelpCenterForm /> */}
      {/* <HowToBuyForm /> */}
    </>
  );
}

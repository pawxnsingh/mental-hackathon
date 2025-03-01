import React from "react";
import { Button } from "@/components/ui/button";

import { conversation } from "../app/dashboard/page";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarProvider,
} from "@/components/ui/sidebar";

export function Chatsidebar({
  conversations,
}: {
  conversations: conversation[];
}) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="flex items-center justify-between p-3 border-b">
          <Button className="px-3 py-1 text-sm">Create New Chat</Button>
        </SidebarHeader>
        <SidebarContent>
        {conversations.length > 0 ? (
            conversations.map((chat) => (
              <div key={chat.id} className="p-3 hover:bg-gray-100 cursor-pointer ">
                {chat.content}
              </div>
            ))
          ) : (
            <p className="p-3 text-gray-500">No conversations yet.</p>
          )}
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    </SidebarProvider>
  );
}

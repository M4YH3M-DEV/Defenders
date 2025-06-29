'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bot, Book, Leaf, HeartPulse, PanelLeftClose } from 'lucide-react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/sidebar';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const navItems = [
  { href: '/', label: 'Chat', icon: Bot, tooltip: 'Chat' },
  { href: '/journal', label: 'Journal', icon: Book, tooltip: 'Journal' },
  { href: '/exercises', label: 'Exercises', icon: Leaf, tooltip: 'Exercises' },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { toggleSidebar } = useSidebar();
  const isMobile = useIsMobile();

  return (
    <Sidebar collapsible={isMobile ? 'offcanvas' : 'icon'} variant="sidebar">
      <SidebarHeader className="flex items-center justify-between p-2">
        <div className="flex items-center gap-2 overflow-hidden">
          <HeartPulse className="h-8 w-8 shrink-0 text-primary" />
          <span className="text-xl font-bold font-headline whitespace-nowrap">
            MindEase
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="group-data-[collapsible=icon]:hidden"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          <PanelLeftClose />
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={{ children: item.tooltip, side: 'right', className: 'font-body' }}
                className="justify-start"
              >
                <Link href={item.href}>
                  <item.icon className="size-5 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="flex flex-col items-center gap-2 p-2">
        <div className="rounded-lg bg-accent p-4 text-center text-sm text-accent-foreground group-data-[collapsible=icon]:hidden">
            All chats are anonymous. Your privacy is protected.
        </div>
        <ThemeToggle />
      </SidebarFooter>
    </Sidebar>
  );
}

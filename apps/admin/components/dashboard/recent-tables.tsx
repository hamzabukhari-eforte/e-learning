"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DOMAIN_STATUS_LABEL, type DomainStatus } from "@/data/domains/types";
import type { DashboardOverview } from "@/data/dashboard/types";
import {
  PLATFORM_USER_ROLE_LABEL,
  type PlatformUserRole,
} from "@/data/users/types";

type RecentTablesProps = {
  recentDomains: DashboardOverview["recentDomains"];
  recentUsers: DashboardOverview["recentUsers"];
};

export function RecentTables({
  recentDomains,
  recentUsers,
}: RecentTablesProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
        <div className="border-b border-zinc-200 px-4 py-3">
          <h2 className="text-base font-semibold text-[#042954]">
            Recent Domains
          </h2>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="border-0 bg-[#042954] hover:bg-[#042954]">
              <TableHead>Serial #</TableHead>
              <TableHead>Domain Name</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentDomains.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  {DOMAIN_STATUS_LABEL[row.status as DomainStatus] ?? row.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      <section className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
        <div className="border-b border-zinc-200 px-4 py-3">
          <h2 className="text-base font-semibold text-[#042954]">
            Recent Users
          </h2>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="border-0 bg-[#042954] hover:bg-[#042954]">
              <TableHead>Serial #</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentUsers.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>
                  {PLATFORM_USER_ROLE_LABEL[row.role as PlatformUserRole] ??
                    row.role}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
}

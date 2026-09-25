
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MoreHorizontal, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { DeleteConfirm } from "@/components/admin/delete-confirm";
import { deleteCertificateAction } from "@/actions/certificates";
import { formatDate } from "@/lib/utils";

export function CertificatesTable({
  certificates,
}: {
  certificates: any[];
}) {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [status, setStatus] = useState("all");

  const filtered = useMemo(() => {
    return certificates.filter((c) => {
      const matchesSearch =
        !search ||
        [c.studentName, c.studentId, c.certificateId, c.title]
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesType =
        type === "all" || c.certificateType === type;

      const matchesStatus =
        status === "all" || c.status === status;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [certificates, search, status, type]);

  return (
    <div className="space-y-4 rounded-xl border bg-card p-4">
      {/* Filters */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
            placeholder="Search certificate, student, or ID"
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="w-full sm:w-44">
              <SelectValue placeholder="Type" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="Achievement">Achievement</SelectItem>
              <SelectItem value="Completion">Completion</SelectItem>
              <SelectItem value="Participation">
                Participation
              </SelectItem>
              <SelectItem value="Excellence">Excellence</SelectItem>
              <SelectItem value="Appreciation">
                Appreciation
              </SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>

          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full sm:w-44">
              <SelectValue placeholder="Status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="issued">Issued</SelectItem>
              <SelectItem value="revoked">Revoked</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Certificate Table */}
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Certificate ID</TableHead>
              <TableHead>Student</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Program</TableHead>
              <TableHead>Issue Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="py-8 text-center text-sm text-muted-foreground"
                >
                  No certificates match your filters.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((certificate) => (
                <TableRow key={certificate._id}>
                  {/* Certificate ID */}
                  <TableCell className="font-medium">
                    {certificate.certificateId}
                  </TableCell>

                  {/* Student */}
                  <TableCell>
                    <div className="font-medium">
                      {certificate.studentName}
                    </div>

                    <div className="text-xs text-muted-foreground">
                      {certificate.studentId}
                    </div>
                  </TableCell>

                  {/* Type */}
                  <TableCell>
                    {certificate.certificateType}
                  </TableCell>

                  {/* Program */}
                  <TableCell>
                    {certificate.program || "—"}
                  </TableCell>

                  {/* Issue Date */}
                  <TableCell>
                    {formatDate(certificate.issueDate)}
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <span className="inline-flex rounded-full border px-2 py-1 text-xs font-medium capitalize">
                      {certificate.status}
                    </span>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-right">
                    <div className="flex justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            aria-label={`Actions for certificate ${certificate.certificateId}`}
                            title="Certificate actions"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                          align="end"
                          className="w-48 "
                        >
                          {/* View */}
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/admin/certificates/${certificate._id}`}
                              className="flex cursor-pointer items-center"
                            >
                              View
                            </Link>
                          </DropdownMenuItem>

                          {/* Edit */}
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/admin/certificates/${certificate._id}`}
                              className="flex cursor-pointer items-center"
                            >
                              Edit
                            </Link>
                          </DropdownMenuItem>

                          {/* Download PDF */}
                          <DropdownMenuItem asChild>
                            <a
                              href={`/api/certificates/${certificate.certificateId}/pdf`}
                              target="_blank"
                              rel="noreferrer"
                              className="flex cursor-pointer items-center"
                            >
                              Download PDF
                            </a>
                          </DropdownMenuItem>

                          {/* Verify */}
                          <DropdownMenuItem asChild>
                            <a
                              href={`/verify/${certificate.certificateId}`}
                              target="_blank"
                              rel="noreferrer"
                              className="flex cursor-pointer items-center"
                            >
                              Verify
                            </a>
                          </DropdownMenuItem>

                          {/* Delete */}
                          <DeleteConfirm
                            itemLabel="certificate"
                            onDelete={async () => {
                              await deleteCertificateAction(
                                certificate._id
                              );
                            }}
                          />
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}


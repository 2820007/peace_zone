"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Pencil, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { PublishToggle } from "@/components/admin/publish-toggle";
import { DeleteConfirm } from "@/components/admin/delete-confirm";
import { EmptyState } from "@/components/admin/empty-state";
import { StarRating } from "@/components/public/shared";
import { formatDate, initials } from "@/lib/utils";
import { deleteTestimonialAction, toggleTestimonialPublishedAction } from "@/actions/testimonials";

interface TestimonialRow {
  _id: string;
  name: string;
  role?: string;
  rating: number;
  image?: string;
  published: boolean;
  createdAt: string;
}

export function TestimonialsTable({ testimonials }: { testimonials: TestimonialRow[] }) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([{ id: "createdAt", desc: true }]);

  const columns = useMemo<ColumnDef<TestimonialRow>[]>(
    () => [
      {
        accessorKey: "image",
        header: "Avatar",
        enableSorting: false,
        cell: ({ row }) => (
          <div className="relative h-10 w-10 overflow-hidden rounded-full bg-secondary">
            {row.original.image ? (
              <Image src={row.original.image} alt={row.original.name} fill className="object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs font-medium text-muted-foreground">
                {initials(row.original.name)}
              </div>
            )}
          </div>
        ),
      },
      {
        accessorKey: "name",
        header: ({ column }) => (
          <Button variant="ghost" size="sm" className="-ml-3" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Name <ArrowUpDown className="h-3.5 w-3.5" />
          </Button>
        ),
        cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => row.original.role || <span className="text-muted-foreground">—</span>,
      },
      {
        accessorKey: "rating",
        header: "Rating",
        cell: ({ row }) => <StarRating rating={row.original.rating} />,
      },
      {
        accessorKey: "published",
        header: "Status",
        cell: ({ row }) => (
          <PublishToggle
            id={row.original._id}
            published={row.original.published}
            itemLabel={row.original.name}
            onToggle={toggleTestimonialPublishedAction}
          />
        ),
      },
      {
        accessorKey: "createdAt",
        header: ({ column }) => (
          <Button variant="ghost" size="sm" className="-ml-3" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Created <ArrowUpDown className="h-3.5 w-3.5" />
          </Button>
        ),
        cell: ({ row }) => formatDate(row.original.createdAt),
      },
      {
        id: "actions",
        header: () => <span className="sr-only">Actions</span>,
        enableSorting: false,
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Row actions">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/admin/testimonials/${row.original._id}/edit`}>
                  <Pencil className="h-4 w-4" /> Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/testimonials" target="_blank">
                  <ExternalLink className="h-4 w-4" /> View on site
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DeleteConfirm
                itemLabel="testimonial"
                asMenuItem
                onDelete={() => deleteTestimonialAction(row.original._id)}
              />
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: testimonials,
    columns,
    state: { globalFilter, sorting },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (testimonials.length === 0) {
    return (
      <EmptyState
        title="No testimonials found"
        actionLabel="Add your first testimonial"
        actionHref="/admin/testimonials/create"
      />
    );
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search testimonials..."
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="sm:max-w-xs"
      />

      <div className="rounded-lg border bg-background">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                  No testimonials match your search.
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { IDriver } from "@/types/driver";
import { PATHS } from "@/routers/paths";
import { EditIcon } from "lucide-react";
import { EditButton } from "../authorized-buttons";

export const driverColumns: ColumnDef<IDriver>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "mobile_number",
    header: "Mobile Number",
    cell: ({ row }) => row.getValue("mobile_number"),
  },
  {
    accessorKey: "father_name",
    header: "Father Name",
    cell: ({ row }) => row.getValue("father_name") || "N/A",
  },
  {
    accessorKey: "mother_name",
    header: "Mother Name",
    cell: ({ row }) => row.getValue("mother_name") || "N/A",
  },
  {
    accessorKey: "current_location",
    header: "Current Location",
    cell: ({ row }) => row.getValue("current_location") || "N/A",
  },
  {
    accessorKey: "origin_location",
    header: "Origin Location",
    cell: ({ row }) => row.getValue("origin_location") || "N/A",
  },
  {
    accessorKey: "father_contact",
    header: "Father Contact",
    cell: ({ row }) => row.getValue("father_contact") || "N/A",
  },
  {
    accessorKey: "mother_contact",
    header: "Mother Contact",
    cell: ({ row }) => row.getValue("mother_contact") || "N/A",
  },
  {
    accessorKey: "settling_home_details",
    header: "Home Details",
    cell: ({ row }) => row.getValue("settling_home_details") || "N/A",
  },
  {
    accessorKey: "fingerprint_data",
    header: "Fingerprint",
    cell: ({ row }) => row.getValue("fingerprint_data") || "N/A",
  },
  {
    accessorKey: "image_url",
    header: "Image",
    cell: ({ row }) => {
      const url = row.getValue("image_url") as string;
      return url ? (
        <img src={url} alt="Driver" className="w-16 h-16 object-cover" />
      ) : (
        "N/A"
      );
    },
  },
  {
    accessorKey: "documentType",
    header: "Document Type",
    cell: ({ row }) => {
      const type = row.getValue("documentType") as string;
      const labels = {
        driver_id: "Driver ID",
        national_id: "National ID",
        passport: "Passport",
      };
      return type ? labels[type as keyof typeof labels] || type : "N/A";
    },
  },
  {
    accessorKey: "documentNumber",
    header: "Document Number",
    cell: ({ row }) => row.getValue("documentNumber") || "N/A",
  },
  {
    accessorKey: "documentUpload",
    header: "Document",
    cell: ({ row }) => {
      const url = row.getValue("documentUpload") as string;
      return url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          View
        </a>
      ) : (
        "N/A"
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const driver = row.original;

      return (
        <div className="gap-2 flex items-center">
          <EditButton
            size={"xs"}
            to={PATHS.Overview.drivers.edit(driver.id)}
            variant={"outline"}
          >
            <EditIcon className="mr-2 h-3 w-3" />
            <span>Edit</span>
          </EditButton>
        </div>
      );
    },
  },
];

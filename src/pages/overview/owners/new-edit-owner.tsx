import { LayoutDashboard, User2Icon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Breadcrumb, FormWrapper } from "@/components/widgets";
import { PATHS } from "@/routers/paths";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useStores } from "@/models/helpers";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { get } from "lodash";
import { z } from "zod";

const ownerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  mobile_number: z.string().min(1, "Mobile number is required"),
});

type ZodOwner = z.infer<typeof ownerSchema>;

export const NewEditOwner = observer(function NewEditOwner() {
  const {
    ownersStore: { createOwner, status, owners, updateOwner, getOwners },
  } = useStores();

  const location = useLocation();
  const isEdit = location.pathname.includes("edit");
  const params = useParams();
  const navigate = useNavigate();
  const id = get(params, "id", "");

  const currentOwner = owners.data?.find((owner) => owner.id == Number(id));

  const form = useForm<ZodOwner>({
    resolver: zodResolver(ownerSchema),
    defaultValues: {
      name: currentOwner?.name || "",
      mobile_number: currentOwner?.mobile_number || "",
    },
  });

  const handleSubmit = async (values: ZodOwner) => {
    try {
      if (isEdit) {
        await updateOwner(Number(id), {
          name: values.name,
          mobile_number: values.mobile_number,
          motorcycles: [], // TODO: handle motorcycles
        });
        toast.success("Owner updated successfully");
        navigate(PATHS.Overview.owners.root);
        return;
      }

      await createOwner({
        name: values.name,
        mobile_number: values.mobile_number,
        motorcycles: [], // TODO: handle motorcycles
      });
      await getOwners({ page: 1, limit: 10 });
      toast.success("Owner created successfully");
      navigate(PATHS.Overview.owners.root);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to save owner");
    }
  };

  return (
    <>
      <Breadcrumb
        links={[
          {
            label: "Dashboard",
            href: PATHS.Overview.app,
            icon: <LayoutDashboard className="h-4 w-4" />,
          },
          {
            label: "Owners",
            href: PATHS.Overview.owners.root,
            icon: <User2Icon className="h-4 w-4" />,
          },
          {
            label: isEdit ? "Edit Owner" : "New Owner",
            disabled: true,
            icon: <User2Icon className="h-4 w-4" />,
          },
        ]}
      />

      <div className="my-8">
        <Card>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  {isEdit ? "Edit Owner" : "New Owner"}
                </CardTitle>
                <CardDescription className="text-sm">
                  {isEdit
                    ? "Edit owner details below."
                    : "Add a new owner by filling in the details below."}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormWrapper form={form} name={"name"} label="Name" />
                  <FormWrapper
                    form={form}
                    name={"mobile_number"}
                    label="Mobile Number"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  loading={status === "pending"}
                  type="submit"
                  className="flex items-center space-x-2"
                >
                  <span>{isEdit ? "Update Owner" : "Save Owner"}</span>
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </>
  );
});

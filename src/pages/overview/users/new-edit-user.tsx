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
import { userSchema, ZodUser } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useStores } from "@/models/helpers";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Role } from "@/types/user";
import { get } from "lodash";
import { Country } from "@/types/country";

export const NewEditUser = observer(function NewEditUser() {
  const {
    usersStore: { createUser, status, users, updateUser, getUsers },
    authStore: { getRoles },
    countryStore: { getCountries },
  } = useStores();

  const location = useLocation();
  const isEdit = location.pathname.includes("edit");
  const params = useParams();
  const navigate = useNavigate();
  const [roles, setRoles] = useState<Role[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const id = get(params, "id", "");

  const currentUser = users.data.find((user) => user.id == id);

  const form = useForm<ZodUser>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: currentUser?.username || "",
      email: currentUser?.email || "",
      password: currentUser?.password || "",
      countryId: currentUser?.countryId || "",
    },
  });

  const handleSubmit = async (values: ZodUser) => {
    try {
      if (isEdit) {
        await updateUser(id, {
          ...values,
          countryId: Number(values.countryId),
          roles: values?.roles.map((role) => ({ roleId: Number(role) })),
        });
        toast.success("User updated successfully");
        navigate(PATHS.Overview.users.root);
        return;
      }

      await createUser({
        ...values,
        countryId: Number(values.countryId),
        roles: values?.roles.map((role) => ({ roleId: Number(role) })),
      });
      await getUsers({ page: 1, limit: 10 });
      toast.success("User created successfully");
      navigate(PATHS.Overview.users.root);
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("Failed to create user");
    }
  };

  useEffect(() => {
    getCountries({ cachable: false }).then((data) => {
      setCountries(data);
    });
    getRoles().then((data) => {
      setRoles(data);
    });
  }, []);

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
            label: "Users",
            href: PATHS.Overview.users.root,
            icon: <User2Icon className="h-4 w-4" />,
          },
          {
            label: "New User",
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
                  {isEdit ? "Edit User" : "New User"}
                </CardTitle>
                <CardDescription className="text-sm">
                  {isEdit
                    ? "Edit user details below."
                    : "Add a new user by filling in the details below."}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormWrapper form={form} name={"username"} label="Username" />

                  <FormWrapper form={form} name={"email"} label="Email" />

                  <FormWrapper
                    form={form}
                    name={"roles"}
                    label="Role"
                    fieldType="multiselect"
                    data={roles.map((role) => ({
                      label: role.name,
                      value: role.id.toString(),
                    }))}
                  />

                  <FormWrapper
                    form={form}
                    name={"countryId"}
                    label="Country"
                    fieldType="command"
                    data={countries.map((country) => ({
                      label: country.name,
                      value: country.id.toString(),
                    }))}
                  />

                  <FormWrapper
                    form={form}
                    name={"password"}
                    label="Password"
                    fieldType="input"
                    type="password"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  loading={status === "pending"}
                  type="submit"
                  className="flex items-center space-x-2"
                >
                  <span>{isEdit ? "Update User" : "Save User"}</span>
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </>
  );
});

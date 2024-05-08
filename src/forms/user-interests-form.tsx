import Pagination from "@/components/pagination";
import { Checkbox } from "@/components/ui/checkbox";
import { Heading } from "@/components/ui/heading";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Text } from "@/components/ui/text";
import { api } from "@/trpc/react";
import { useState } from "react";

const limit = 6;

const UserInterestsForm = () => {
  const [page, setPage] = useState(1);

  const { data: categoriesData, isLoading } = api.categories.getAll.useQuery({
    limit: limit,
    page: page,
  });

  const ctx = api.useUtils();

  const toggleInterest = api.user.toggleInterestCategory.useMutation({
    onSuccess: (res) => {
      // ctx.categories.getAll.cancel();
      ctx.categories.getAll.invalidate();
    },
  });

  const renderCategories = () => {
    if (isLoading) {
      return (
        <ul className="flex flex-col gap-4">
          {Array.from({ length: limit }).map((_, index) => {
            return (
              <li key={index}>
                <Skeleton className="h-6 w-full" />
              </li>
            );
          })}
        </ul>
      );
    }

    return (
      <ul className="flex flex-col gap-4">
        {categoriesData?.categories.map((category) => {
          return (
            <li key={category.id} className="flex items-center gap-2">
              <Checkbox
                id={category.id.toString()}
                defaultChecked={category.isChecked}
                onCheckedChange={(checked) => {
                  toggleInterest.mutate({
                    id: category.id,
                  });
                }}
              />
              <Label
                htmlFor={category.id.toString()}
                className="cursor-pointer"
              >
                <Text size={"md"} className="text-foreground ">
                  {category.name}
                </Text>
              </Label>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div>
          <Heading className="text-xl">My saved interests!</Heading>
        </div>
        {renderCategories()}
      </div>
      <Pagination
        onChange={(v) => {
          setPage(v!);
        }}
        totalItems={categoriesData?.total ?? 0}
        perPageLimit={limit}
        currentPage={page}
      />
    </div>
  );
};

export default UserInterestsForm;

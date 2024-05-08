import React, { useMemo } from "react";
import { Button } from "./ui/button";
import {
  ArrowLeft,
  ArrowLeftToLine,
  ArrowRight,
  ArrowRightToLine,
} from "lucide-react";
import { PaginationEllipsis, PaginationItem } from "./ui/pagination";

type Props = {
  totalItems: number;
  currentPage: number;
  perPageLimit: number;
  onChange: (value: number | undefined) => void;
};

const Pagination = ({
  currentPage,
  perPageLimit,
  totalItems,
  onChange,
}: Props) => {
  const totalPages = useMemo(() => {
    return Math.ceil(totalItems / perPageLimit);
  }, [totalItems, perPageLimit]);

  const renderPaginationItems = () => {
    const paginationItems = [];

    // Show ellipsis before currentPage - 1 if currentPage is greater than 2
    if (currentPage > 2) {
      paginationItems.push(
        <PaginationItem key="startEllipsis">
          <PaginationEllipsis />
        </PaginationItem>,
      );
    }

    // Show currentPage - 1 if currentPage is greater than 1
    if (currentPage > 1) {
      paginationItems.push(
        <PaginationItem key={currentPage - 1}>
          <Button
            onClick={() => {
              onChange(currentPage - 1);
            }}
            variant={"ghost"}
            size={"icon-sm"}
          >
            {currentPage - 1}
          </Button>
        </PaginationItem>,
      );
    }

    // Show currentPage
    paginationItems.push(
      <PaginationItem key={currentPage}>
        <Button
          onClick={() => {
            onChange(currentPage);
          }}
          variant={"fancy"}
          size={"icon-sm"}
        >
          {currentPage}
        </Button>
      </PaginationItem>,
    );

    // Show currentPage + 1 if currentPage is less than totalPages
    if (currentPage < totalPages) {
      paginationItems.push(
        <PaginationItem key={currentPage + 1}>
          <Button
            onClick={() => {
              onChange(currentPage + 1);
            }}
            variant={"ghost"}
            size={"icon-sm"}
          >
            {currentPage + 1}
          </Button>
        </PaginationItem>,
      );
    }

    // Show ellipsis after currentPage + 1 if currentPage is less than totalPages - 1
    if (currentPage < totalPages - 1) {
      paginationItems.push(
        <PaginationItem key="endEllipsis">
          <PaginationEllipsis />
        </PaginationItem>,
      );
    }

    return paginationItems;
  };

  return (
    <ul className="flex items-center justify-center gap-2">
      <PaginationItem>
        <Button
          disabled={currentPage === 1 ? true : false}
          size={"icon-sm"}
          onClick={() => {
            onChange(1);
          }}
          variant={"ghost"}
        >
          <ArrowLeftToLine className="h-4 w-4" />
        </Button>
      </PaginationItem>
      <PaginationItem>
        <Button
          disabled={currentPage === 1 ? true : false}
          size={"icon-sm"}
          onClick={() => {
            onChange(currentPage - 1);
          }}
          variant={"ghost"}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
      </PaginationItem>

      {renderPaginationItems()}
      <PaginationItem>
        <Button
          disabled={currentPage >= totalPages}
          size={"icon-sm"}
          variant={"ghost"}
          onClick={() => {
            onChange(currentPage + 1);
          }}
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </PaginationItem>
      <PaginationItem>
        <Button
          disabled={currentPage >= totalPages}
          size={"icon-sm"}
          onClick={() => {
            onChange(totalPages);
          }}
          variant={"ghost"}
        >
          <ArrowRightToLine className="h-4 w-4" />
        </Button>
      </PaginationItem>
    </ul>
  );
};

export default Pagination;

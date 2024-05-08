import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Text } from "../ui/text";
import { Heading } from "../ui/heading";

const HEADER_LINKS = [
  {
    label: "Categories",
    href: "/",
  },
  {
    label: "Sale",
    href: "/",
  },
  {
    label: "Clearance",
    href: "/",
  },
  {
    label: "New stock",
    href: "/",
  },
  {
    label: "Trending",
    href: "/",
  },
];

const HEADER_LINKS_2 = [
  {
    label: "Help",
    href: "/",
  },
  {
    label: "Order & Returns",
    href: "/",
  },
];

const Header = () => {
  return (
    <>
      <header className="sticky top-0  flex w-full  flex-col ">
        <div className="wrapper flex h-8 items-center justify-end gap-4 text-xs">
          <ul className="flex items-center gap-4">
            {HEADER_LINKS_2.map((link) => {
              return <li key={link.label}>{link.label}</li>;
            })}
          </ul>
          <Text>Hi,John</Text>
        </div>
        <div className="wrapper flex  h-12 items-center justify-between">
          <Link href={"/"}>
            <Heading size={"lg"}>ECOMMERCE</Heading>
          </Link>
          <nav className="hidden md:block">
            <ul className="flex items-center gap-4 font-semibold">
              {HEADER_LINKS.map((link) => {
                return (
                  <li key={link.label}>
                    <Heading size={"sm"}>{link.label} </Heading>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="flex items-center gap-4 ">
            <Button size={"icon"} variant={"ghost"}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.5145 18.4587L14.8214 13.7656C16.1843 12.131 16.8646 10.0338 16.7206 7.91044C16.5767 5.78706 15.6197 3.8009 14.0486 2.36517C12.4776 0.929445 10.4135 0.154682 8.28578 0.202064C6.15804 0.249446 4.13049 1.11532 2.62492 2.61957C1.11935 4.12381 0.251676 6.15059 0.202413 8.27829C0.153151 10.406 0.926089 12.4707 2.36043 14.0431C3.79477 15.6154 5.78008 16.5742 7.90334 16.72C10.0266 16.8658 12.1243 16.1874 13.7601 14.8259L18.4533 19.5199C18.5229 19.5896 18.6057 19.6449 18.6967 19.6826C18.7878 19.7203 18.8853 19.7397 18.9839 19.7397C19.0824 19.7397 19.18 19.7203 19.2711 19.6826C19.3621 19.6449 19.4448 19.5896 19.5145 19.5199C19.5842 19.4503 19.6395 19.3675 19.6772 19.2765C19.7149 19.1854 19.7343 19.0879 19.7343 18.9893C19.7343 18.8908 19.7149 18.7932 19.6772 18.7021C19.6395 18.6111 19.5842 18.5284 19.5145 18.4587ZM1.73388 8.48932C1.73388 7.15429 2.12977 5.84925 2.87146 4.73922C3.61316 3.62919 4.66737 2.76402 5.90077 2.25313C7.13417 1.74224 8.49137 1.60857 9.80074 1.86902C11.1101 2.12947 12.3129 2.77234 13.2569 3.71635C14.2009 4.66035 14.8437 5.86309 15.1042 7.17246C15.3646 8.48183 15.231 9.83903 14.7201 11.0724C14.2092 12.3058 13.344 13.36 12.234 14.1017C11.124 14.8434 9.81891 15.2393 8.48388 15.2393C6.69428 15.2373 4.97855 14.5255 3.71311 13.2601C2.44767 11.9947 1.73587 10.2789 1.73388 8.48932Z"
                  fill="currentColor"
                />
              </svg>
            </Button>
            <Button size={"icon"} variant={"ghost"}>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 24.25C14 24.5467 13.912 24.8367 13.7472 25.0834C13.5824 25.33 13.3481 25.5223 13.074 25.6358C12.7999 25.7494 12.4983 25.7791 12.2074 25.7212C11.9164 25.6633 11.6491 25.5204 11.4393 25.3107C11.2296 25.1009 11.0867 24.8336 11.0288 24.5426C10.9709 24.2517 11.0006 23.9501 11.1142 23.676C11.2277 23.4019 11.42 23.1676 11.6666 23.0028C11.9133 22.838 12.2033 22.75 12.5 22.75C12.8978 22.75 13.2794 22.908 13.5607 23.1893C13.842 23.4706 14 23.8522 14 24.25ZM22.25 22.75C21.9533 22.75 21.6633 22.838 21.4166 23.0028C21.17 23.1676 20.9777 23.4019 20.8642 23.676C20.7506 23.9501 20.7209 24.2517 20.7788 24.5426C20.8367 24.8336 20.9796 25.1009 21.1893 25.3107C21.3991 25.5204 21.6664 25.6633 21.9574 25.7212C22.2483 25.7791 22.5499 25.7494 22.824 25.6358C23.0981 25.5223 23.3324 25.33 23.4972 25.0834C23.662 24.8367 23.75 24.5467 23.75 24.25C23.75 23.8522 23.592 23.4706 23.3107 23.1893C23.0294 22.908 22.6478 22.75 22.25 22.75ZM26.7172 10.9703L24.0425 19.6619C23.9024 20.1226 23.6175 20.5259 23.2301 20.812C22.8427 21.0981 22.3734 21.2517 21.8919 21.25H12.8816C12.3931 21.2482 11.9184 21.0882 11.5285 20.7939C11.1386 20.4997 10.8545 20.087 10.7188 19.6178L7.32687 7.75H5.75C5.55109 7.75 5.36032 7.67098 5.21967 7.53033C5.07902 7.38968 5 7.19891 5 7C5 6.80109 5.07902 6.61032 5.21967 6.46967C5.36032 6.32902 5.55109 6.25 5.75 6.25H7.32687C7.65257 6.25108 7.96916 6.35761 8.22925 6.55365C8.48934 6.74969 8.67895 7.0247 8.76969 7.3375L9.53 10H26C26.1174 9.99996 26.2331 10.0275 26.3379 10.0803C26.4427 10.1331 26.5336 10.2098 26.6034 10.3042C26.6732 10.3986 26.7198 10.508 26.7396 10.6237C26.7593 10.7394 26.7517 10.8581 26.7172 10.9703ZM24.9847 11.5H9.95844L12.1606 19.2062C12.2054 19.3629 12.3 19.5007 12.4301 19.5988C12.5602 19.6969 12.7186 19.75 12.8816 19.75H21.8919C22.0524 19.7501 22.2086 19.6986 22.3377 19.6033C22.4668 19.508 22.5619 19.3737 22.6091 19.2203L24.9847 11.5Z"
                  fill="currentColor"
                />
              </svg>
            </Button>
          </div>
        </div>{" "}
        <div className="flex h-8 items-center justify-center gap-4 bg-secondary text-xs">
          <Text className="font-semibold text-foreground">
            Get 10% off on business sign up
          </Text>
        </div>
      </header>
    </>
  );
};

export default Header;

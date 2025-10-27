"use client";
import Link from "next/link";
import { ReactNode } from "react";

export default function LinkComponent({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

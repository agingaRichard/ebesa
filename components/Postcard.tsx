import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function PostCard({ props }) {
  return (
    <div>
      <p>{props}</p>
    </div>
  );
}

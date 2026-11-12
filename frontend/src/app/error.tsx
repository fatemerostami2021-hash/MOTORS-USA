"use client";
import ErrorView from "@/components/ErrorView";
export default function Error({ reset }: { error: Error; reset: () => void }) { return <ErrorView kind="error" reset={reset} />; }

import InventoryView from "@/components/InventoryView";
export const metadata = { title: "Inventory" };
export default async function Inventory({ searchParams }: { searchParams: Promise<{ make?: string; status?: string }> }) {
  const q = await searchParams;
  return <InventoryView status={q.status === "sold" ? "sold" : "available"} make={q.make} />;
}

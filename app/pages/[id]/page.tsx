import RainbowSlot from "@/components/RainbowSlot";

interface PageProps {
    params: Promise<{ id: string }>
}

export default async function Page({ params, }: PageProps) {
    const slug = (await params).id;

    return (
        <>
            <div>Page is: {slug}</div>
            <RainbowSlot id={`slot_${slug}`} />
        </>
    );
}
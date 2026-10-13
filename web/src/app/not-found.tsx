import { Button, Container, TnMark } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="py-28">
      <Container className="text-center">
        <TnMark tone="red" className="mx-auto h-24 -rotate-[24deg]" />
        <p className="mt-8 text-[13px] font-bold uppercase tracking-[0.2em] text-red">Page Not Found</p>
        <h1 className="mt-4 text-[44px] font-extrabold tracking-[-0.03em] text-ink sm:text-[60px]">Off course.</h1>
        <p className="mx-auto mt-4 max-w-[480px] text-[17px] text-ink-2">This page does not exist, or it has moved. Let us point you back north.</p>
        <div className="mt-8 flex justify-center gap-3"><Button href="/" arrow>Go Home</Button><Button href="/contact/" tone="secondary">Contact Us</Button></div>
      </Container>
    </section>
  );
}

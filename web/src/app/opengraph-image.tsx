import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";

export const dynamic = "force-static";
export const alt = "True North IT Consulting: engineering that points true north.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  const mark = `data:image/png;base64,${fs.readFileSync(path.join(process.cwd(), "public/brand/tn-mark.png")).toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", gap: 70, padding: 80, background: "#fbfaf8", fontFamily: "sans-serif" }}>
        <img src={mark} width={220} height={390} alt="" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: 6, color: "#d30812" }}>TRUE NORTH IT CONSULTING</div>
          <div style={{ marginTop: 24, fontSize: 82, fontWeight: 800, letterSpacing: -3, color: "#141414", lineHeight: 1 }}>Engineering that</div>
          <div style={{ fontSize: 82, fontWeight: 800, letterSpacing: -3, color: "#d30812", lineHeight: 1.05 }}>points true north.</div>
          <div style={{ marginTop: 28, fontSize: 28, color: "#4a4a52" }}>Build. Test. Run. Advise. Makers of GRIT.</div>
        </div>
      </div>
    ),
    size,
  );
}

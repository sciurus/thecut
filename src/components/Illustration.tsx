import { useState } from "react";
import { assetManifest } from "../data/assetManifest";
export default function Illustration({ assetId }: { assetId: string }) {
  const [failedId, setFailedId] = useState<string>();
  const a = assetManifest[assetId];
  return (
    <img
      src={
        import.meta.env.BASE_URL + (failedId === assetId ? a.fallback : a.src)
      }
      alt={a.alt}
      onError={() => setFailedId(assetId)}
      width="640"
      height="640"
    />
  );
}

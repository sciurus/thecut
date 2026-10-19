import { it, expect, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import Illustration from "../components/Illustration";
import { assetManifest } from "../data/assetManifest";
afterEach(cleanup);
it("uses a local SVG when artwork fails and retries generated art on the next question", () => {
  const { rerender } = render(<Illustration assetId="buzz-cut" />);
  fireEvent.error(screen.getByRole("img"));
  expect(screen.getByRole("img")).toHaveAttribute(
    "src",
    "/" + assetManifest["buzz-cut"].fallback,
  );
  rerender(<Illustration assetId="crew-cut" />);
  expect(screen.getByRole("img")).toHaveAttribute(
    "src",
    "/" + assetManifest["crew-cut"].src,
  );
});
